import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { createServiceClient } from "@/utils/supabase/service";
import { checkDomainExpiry } from "@/utils/domain-check";
import { sendExpiryAlertEmail } from "@/utils/email";
import { DEFAULT_ALERT_THRESHOLDS } from "@/utils/alert-thresholds";

export const maxDuration = 300;

const CONCURRENCY = 10;

// Bounds each run instead of sweeping every domain unconditionally: combined with ordering by
// last_checked_at ascending below, a run that can't fit everyone in maxDuration always makes
// forward progress (oldest-checked domains first) rather than dropping an arbitrary tail.
const BATCH_SIZE = Number(process.env.CRON_BATCH_SIZE ?? 500);

function isAuthorized(request: Request): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return false;

  const expected = Buffer.from(`Bearer ${cronSecret}`);
  const actual = Buffer.from(request.headers.get("authorization") ?? "");

  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

function daysUntil(dateStr: string): number {
  const target = new Date(`${dateStr}T00:00:00Z`).getTime();
  return Math.ceil((target - Date.now()) / (1000 * 60 * 60 * 24));
}

async function runWithConcurrency<T>(items: T[], limit: number, task: (item: T) => Promise<void>) {
  const queue = [...items];

  await Promise.all(
    Array.from({ length: limit }, async () => {
      while (queue.length > 0) {
        const item = queue.shift();
        if (item) await task(item);
      }
    })
  );
}

type SupabaseServiceClient = ReturnType<typeof createServiceClient>;

// One paginated pass over all users maps id -> email, instead of an Admin API call per
// distinct domain owner (which used to run once per user, every cron invocation).
async function loadUserEmails(supabase: SupabaseServiceClient): Promise<Map<string, string>> {
  const emailByUserId = new Map<string, string>();
  const perPage = 1000;

  for (let page = 1; ; page += 1) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage });
    if (error || !data) break;

    for (const user of data.users) {
      if (user.email) emailByUserId.set(user.id, user.email);
    }

    if (data.users.length < perPage) break;
  }

  return emailByUserId;
}

type OwnerProfile = { thresholds: number[] | null; ownerName: string | null };

async function loadOwnerProfiles(supabase: SupabaseServiceClient, userIds: string[]): Promise<Map<string, OwnerProfile>> {
  const uniqueIds = [...new Set(userIds)];
  if (uniqueIds.length === 0) return new Map();

  const { data } = await supabase.from("profiles").select("id, alert_thresholds, full_name, agency_name").in("id", uniqueIds);
  const profileByUserId = new Map<string, OwnerProfile>();

  for (const profile of data ?? []) {
    profileByUserId.set(profile.id, {
      thresholds: profile.alert_thresholds?.length ? profile.alert_thresholds : null,
      ownerName: profile.agency_name || profile.full_name || null,
    });
  }

  return profileByUserId;
}

async function sendPendingAlerts(
  supabase: SupabaseServiceClient,
  domain: { id: string; domain_name: string; user_id: string; alert_thresholds: number[] | null; alert_recipients: string[] | null },
  expiryDate: string,
  emailByUserId: Map<string, string>,
  ownerProfilesByUserId: Map<string, OwnerProfile>
) {
  const daysRemaining = daysUntil(expiryDate);
  const ownerEmail = emailByUserId.get(domain.user_id) ?? null;
  const ownerProfile = ownerProfilesByUserId.get(domain.user_id);
  const recipients = domain.alert_recipients?.length ? domain.alert_recipients : ownerEmail ? [ownerEmail] : [];
  const thresholds = domain.alert_thresholds?.length ? domain.alert_thresholds : ownerProfile?.thresholds ?? DEFAULT_ALERT_THRESHOLDS;

  if (recipients.length === 0) return;

  for (const threshold of thresholds) {
    if (daysRemaining > threshold) continue;

    const { error: insertError } = await supabase
      .from("alerts_sent")
      .insert({ domain_id: domain.id, threshold });

    // A unique constraint violation means this threshold was already alerted on — skip silently.
    if (insertError) continue;

    await sendExpiryAlertEmail({
      to: recipients.join(", "),
      domainName: domain.domain_name,
      daysRemaining,
      expiryDate,
      ownerName: ownerProfile?.ownerName ?? null,
      ownerEmail,
    });
  }
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createServiceClient();
    const { data: domains, error } = await supabase
      .from("domains")
      .select("id, domain_name, user_id, alert_thresholds, alert_recipients")
      .neq("status", "not_registered")
      .order("last_checked_at", { ascending: true, nullsFirst: true })
      .limit(BATCH_SIZE);

    if (error) {
      return NextResponse.json({ error: "Could not load domains", detail: error.message }, { status: 500 });
    }

    const [emailByUserId, ownerProfilesByUserId] = await Promise.all([
      loadUserEmails(supabase),
      loadOwnerProfiles(supabase, (domains ?? []).map((domain) => domain.user_id)),
    ]);

    let checked = 0;
    let failed = 0;
    let notRegistered = 0;

    await runWithConcurrency(domains ?? [], CONCURRENCY, async (domain) => {
      const result = await checkDomainExpiry(domain.domain_name);

      checked += 1;

      // A failed lookup or a "not registered" result only updates last_checked_at, preserving
      // any previously known expiry/registrar (relevant mainly for check_failed, where the
      // domain likely still holds its old registration).
      const update =
        result.status === "check_failed" || result.status === "not_registered"
          ? { status: result.status, last_checked_at: new Date().toISOString() }
          : {
              status: result.status,
              expiry_date: result.expiryDate,
              registrar: result.registrar,
              last_checked_at: new Date().toISOString(),
            };

      if (result.status === "check_failed") {
        failed += 1;
      } else if (result.status === "not_registered") {
        notRegistered += 1;
      } else if (result.expiryDate) {
        await sendPendingAlerts(supabase, domain, result.expiryDate, emailByUserId, ownerProfilesByUserId);
      }

      await supabase.from("domains").update(update).eq("id", domain.id);
    });

    // If this run filled the whole batch, there may be older-unchecked domains left over —
    // the next invocation picks them up first since they now sort oldest-last_checked_at-first.
    const truncated = (domains ?? []).length === BATCH_SIZE;

    return NextResponse.json({ checked, failed, notRegistered, truncated });
  } catch (err) {
    return NextResponse.json(
      { error: "Unhandled exception", detail: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
