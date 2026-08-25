import net from "node:net";

const IANA_BOOTSTRAP_URL = "https://data.iana.org/rdap/dns.json";
const IANA_WHOIS_HOST = "whois.iana.org";
const WHOIS_PORT = 43;
const EXPIRING_SOON_THRESHOLD_DAYS = 30;
const REQUEST_TIMEOUT_MS = 8000;

export type DomainStatus = "active" | "expiring_soon" | "expired" | "check_failed" | "not_registered";

export type DomainCheckResult = {
  status: DomainStatus;
  expiryDate: string | null; // ISO date (YYYY-MM-DD)
  registrar: string | null;
};

type RdapEntity = {
  roles?: string[];
  vcardArray?: [string, unknown[]];
  entities?: RdapEntity[];
};

type RdapDomainResponse = {
  events?: { eventAction?: string; eventDate?: string }[];
  entities?: RdapEntity[];
};

const FAILED_RESULT: DomainCheckResult = { status: "check_failed", expiryDate: null, registrar: null };
const NOT_REGISTERED_RESULT: DomainCheckResult = { status: "not_registered", expiryDate: null, registrar: null };

let bootstrapCache: Map<string, string[]> | null = null;
const whoisServerCache = new Map<string, string | null>();

async function fetchWithTimeout(url: string, timeoutMs: number) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { signal: controller.signal, headers: { Accept: "application/rdap+json" } });
  } finally {
    clearTimeout(timeout);
  }
}

// Opens a raw TCP connection to a WHOIS server (port 43) and returns the plaintext response.
// There is no JSON equivalent of RDAP's bootstrap file for legacy WHOIS, so this is used both
// to ask whois.iana.org which server owns a TLD and to query that server directly.
async function queryWhois(host: string, query: string, timeoutMs: number): Promise<string> {
  return new Promise((resolve, reject) => {
    let settled = false;
    let data = "";

    const socket = net.createConnection({ host, port: WHOIS_PORT });

    const finish = (err: Error | null, result?: string) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      socket.destroy();
      if (err) reject(err);
      else resolve(result ?? "");
    };

    const timer = setTimeout(() => finish(new Error("WHOIS request timed out")), timeoutMs);

    socket.setEncoding("utf8");
    socket.once("connect", () => socket.write(`${query}\r\n`));
    socket.on("data", (chunk) => {
      data += chunk;
    });
    socket.once("close", () => finish(null, data));
    socket.once("error", (err) => finish(err));
  });
}

async function getRdapServers(tld: string): Promise<string[]> {
  if (!bootstrapCache) {
    const response = await fetchWithTimeout(IANA_BOOTSTRAP_URL, REQUEST_TIMEOUT_MS);

    if (!response.ok) {
      throw new Error(`IANA bootstrap request failed with status ${response.status}`);
    }

    const data: { services?: [string[], string[]][] } = await response.json();
    const map = new Map<string, string[]>();

    for (const [tlds, servers] of data.services ?? []) {
      for (const entry of tlds) {
        map.set(entry.toLowerCase(), servers);
      }
    }

    bootstrapCache = map;
  }

  return bootstrapCache.get(tld) ?? [];
}

// Not every registry participates in IANA's RDAP bootstrap (e.g. .se, .io, .dk, .de), so this
// is the fallback used whenever RDAP has no server for a TLD. whois.iana.org itself doesn't hold
// registration data — it just refers to the registry's own WHOIS server via a "whois:" field.
async function getWhoisServer(tld: string): Promise<string | null> {
  if (whoisServerCache.has(tld)) {
    return whoisServerCache.get(tld) ?? null;
  }

  const response = await queryWhois(IANA_WHOIS_HOST, tld, REQUEST_TIMEOUT_MS);
  const server = response.match(/^whois:\s*(\S+)/im)?.[1] ?? null;

  whoisServerCache.set(tld, server);
  return server;
}

function getTld(domainName: string): string {
  const parts = domainName.toLowerCase().split(".");
  return parts[parts.length - 1];
}

function deriveStatus(expiryDate: Date): DomainStatus {
  const daysRemaining = (expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24);

  if (daysRemaining < 0) return "expired";
  if (daysRemaining <= EXPIRING_SOON_THRESHOLD_DAYS) return "expiring_soon";
  return "active";
}

function extractRegistrar(entities: RdapEntity[] = []): string | null {
  for (const entity of entities) {
    if (!entity.roles?.includes("registrar")) continue;

    const vcard = entity.vcardArray?.[1] ?? [];
    const fnEntry = vcard.find((field): field is [string, ...unknown[]] => Array.isArray(field) && field[0] === "fn");
    const name = fnEntry?.[3];

    if (typeof name === "string" && name.length > 0) return name;
  }

  return null;
}

async function checkViaRdap(domainName: string, tld: string): Promise<DomainCheckResult | null> {
  const servers = await getRdapServers(tld);

  for (const server of servers) {
    const url = `${server.replace(/\/$/, "")}/domain/${domainName}`;
    const response = await fetchWithTimeout(url, REQUEST_TIMEOUT_MS);

    // A 404 from the registry's own RDAP server is authoritative: the domain isn't registered.
    if (response.status === 404) return NOT_REGISTERED_RESULT;
    if (!response.ok) continue;

    const data: RdapDomainResponse = await response.json();
    const expirationEvent = data.events?.find((event) => event.eventAction === "expiration");

    if (!expirationEvent?.eventDate) continue;

    const expiryDate = new Date(expirationEvent.eventDate);

    if (Number.isNaN(expiryDate.getTime())) continue;

    return {
      status: deriveStatus(expiryDate),
      expiryDate: expiryDate.toISOString().slice(0, 10),
      registrar: extractRegistrar(data.entities),
    };
  }

  return null;
}

// WHOIS has no standard response format, so this covers the field names common across registries
// (thin ICANN-style gTLD registries, and thick ccTLD registries like .se's "expires:"/"registrar:").
const WHOIS_EXPIRY_PATTERN =
  /^\s*(?:Registry Expiry Date|Registrar Registration Expiration Date|Domain Expiration Date|Expiration(?:\s+Date|\s+Time)?|Expiry Date|expires(?:\s+on)?|paid-till|renewal date)\s*:\s*(.+?)\s*$/im;
const WHOIS_REGISTRAR_PATTERN = /^\s*(?:Sponsoring Registrar|Registrar(?:\s+Name)?)\s*:\s*(.+?)\s*$/im;

// WHOIS has no equivalent of RDAP's 404, so a "not registered" answer has to be recognized from
// the free-text response. These phrasings are common across registries (Verisign, Nominet, IIS, ...).
const WHOIS_NOT_FOUND_PATTERN = /\b(?:no match for|not found|no data found|no entries found|no object found|status:\s*available|available for registration)\b/i;

function parseWhoisResponse(text: string): DomainCheckResult | null {
  if (WHOIS_NOT_FOUND_PATTERN.test(text)) return NOT_REGISTERED_RESULT;

  const expiryMatch = text.match(WHOIS_EXPIRY_PATTERN);
  if (!expiryMatch) return null;

  const expiryDate = new Date(expiryMatch[1]);
  if (Number.isNaN(expiryDate.getTime())) return null;

  const registrar = text.match(WHOIS_REGISTRAR_PATTERN)?.[1] || null;

  return {
    status: deriveStatus(expiryDate),
    expiryDate: expiryDate.toISOString().slice(0, 10),
    registrar,
  };
}

async function checkViaWhois(domainName: string, tld: string): Promise<DomainCheckResult> {
  const server = await getWhoisServer(tld);
  if (!server) return FAILED_RESULT;

  const response = await queryWhois(server, domainName, REQUEST_TIMEOUT_MS);
  return parseWhoisResponse(response) ?? FAILED_RESULT;
}

/**
 * Looks up a domain's expiry via RDAP (IANA bootstrap → registry RDAP server), falling back to
 * legacy WHOIS (via whois.iana.org's referral) for TLDs whose registry isn't in the RDAP
 * bootstrap file, and derives a status from the expiry date. Returns "not_registered" if the
 * registry reports the domain as unregistered, or "check_failed" if neither lookup can produce
 * an expiry date.
 */
export async function checkDomainExpiry(domainName: string): Promise<DomainCheckResult> {
  const tld = getTld(domainName);

  try {
    const rdapResult = await checkViaRdap(domainName, tld);
    if (rdapResult) return rdapResult;
  } catch {
    // Fall through to WHOIS.
  }

  try {
    return await checkViaWhois(domainName, tld);
  } catch {
    return FAILED_RESULT;
  }
}
