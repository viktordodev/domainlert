const IANA_BOOTSTRAP_URL = "https://data.iana.org/rdap/dns.json";
const EXPIRING_SOON_THRESHOLD_DAYS = 30;
const REQUEST_TIMEOUT_MS = 8000;

export type DomainStatus = "active" | "expiring_soon" | "expired" | "check_failed";

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

let bootstrapCache: Map<string, string[]> | null = null;

async function fetchWithTimeout(url: string, timeoutMs: number) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { signal: controller.signal, headers: { Accept: "application/rdap+json" } });
  } finally {
    clearTimeout(timeout);
  }
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

/**
 * Looks up a domain's expiry via RDAP (IANA bootstrap → registry RDAP server)
 * and derives a status from the expiry date. Returns "check_failed" if the
 * TLD has no RDAP support or the lookup/parse fails.
 */
export async function checkDomainExpiry(domainName: string): Promise<DomainCheckResult> {
  try {
    const servers = await getRdapServers(getTld(domainName));

    if (servers.length === 0) {
      return FAILED_RESULT;
    }

    for (const server of servers) {
      const url = `${server.replace(/\/$/, "")}/domain/${domainName}`;
      const response = await fetchWithTimeout(url, REQUEST_TIMEOUT_MS);

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

    return FAILED_RESULT;
  } catch {
    return FAILED_RESULT;
  }
}
