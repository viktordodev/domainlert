import { NextResponse } from "next/server";
import { createServiceClient } from "@/utils/supabase/service";
import { checkDomainExpiry } from "@/utils/domain-check";
import { sendExpiryAlertEmail } from "@/utils/email";
import { DEFAULT_ALERT_THRESHOLDS } from "@/utils/alert-thresholds";

export const maxDuration = 300;

const CONCURRENCY = 10;

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

function daysUntil(dateStr: string): number {
  const target = new Date(`${dateStr}T00:00:00Z`).getTime();
  return Math.ceil((target - Date.now()) / (1000 * 60 * 60 * 24));
}

type SupabaseServiceClient = ReturnType<typeof createServiceClient>;
type UserAlertSettings = { email: string | null; thresholds: number[] };

async function getUserAlertSettings(
  supabase: SupabaseServiceClient,
  userId: string,
  cache: Map<string, UserAlertSettings>
): Promise<UserAlertSettings> {
  const cached = cache.get(userId);
  if (cached) return cached;

  const { data } = await supabase.auth.admin.getUserById(userId);
  const thresholdsRaw = data.user?.user_metadata?.alert_thresholds;
  const settings: UserAlertSettings = {
    email: data.user?.email ?? null,
    thresholds: Array.isArray(thresholdsRaw) && thresholdsRaw.length > 0 ? thresholdsRaw : DEFAULT_ALERT_THRESHOLDS,
  };

  cache.set(userId, settings);
  return settings;
}

async function sendPendingAlerts(
  supabase: SupabaseServiceClient,
  domain: { id: string; domain_name: string; user_id: string; alert_thresholds: number[] | null; alert_recipients: string[] | null },
  expiryDate: string,
  userCache: Map<string, UserAlertSettings>
) {
  const daysRemaining = daysUntil(expiryDate);
  const { email, thresholds: defaultThresholds } = await getUserAlertSettings(supabase, domain.user_id, userCache);
  const recipients = domain.alert_recipients?.length ? domain.alert_recipients : email ? [email] : [];
  const thresholds = domain.alert_thresholds && domain.alert_thresholds.length > 0 ? domain.alert_thresholds : defaultThresholds;

  if (recipients.length === 0) return;

  for (const threshold of thresholds) {
    if (daysRemaining > threshold) continue;

    const { error: insertError } = await supabase
      .from("alerts_sent")
      .insert({ domain_id: domain.id, threshold });

    // A unique constraint violation means this threshold was already alerted on — skip silently.
    if (insertError) continue;

    await sendExpiryAlertEmail({ to: recipients.join(", "), domainName: domain.domain_name, daysRemaining, expiryDate });
  }
}

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createServiceClient();
    const { data: domains, error } = await supabase
      .from("domains")
      .select("id, domain_name, user_id, alert_thresholds, alert_recipients");

    if (error) {
      return NextResponse.json({ error: "Could not load domains", detail: error.message }, { status: 500 });
    }

    let checked = 0;
    let failed = 0;
    const userCache = new Map<string, UserAlertSettings>();

    await runWithConcurrency(domains ?? [], CONCURRENCY, async (domain) => {
      const result = await checkDomainExpiry(domain.domain_name);

      checked += 1;

      // A failed lookup only updates last_checked_at, preserving any previously known expiry/registrar.
      const update =
        result.status === "check_failed"
          ? { status: result.status, last_checked_at: new Date().toISOString() }
          : {
              status: result.status,
              expiry_date: result.expiryDate,
              registrar: result.registrar,
              last_checked_at: new Date().toISOString(),
            };

      if (result.status === "check_failed") {
        failed += 1;
      } else if (result.expiryDate) {
        await sendPendingAlerts(supabase, domain, result.expiryDate, userCache);
      }

      await supabase.from("domains").update(update).eq("id", domain.id);
    });

    return NextResponse.json({ checked, failed });
  } catch (err) {
    return NextResponse.json(
      { error: "Unhandled exception", detail: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
