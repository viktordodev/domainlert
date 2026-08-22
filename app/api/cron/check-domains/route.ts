import { NextResponse } from "next/server";
import { createServiceClient } from "@/utils/supabase/service";
import { checkDomainExpiry } from "@/utils/domain-check";

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
      .select("id, domain_name");

    if (error) {
      return NextResponse.json({ error: "Could not load domains", detail: error.message }, { status: 500 });
    }

    let checked = 0;
    let failed = 0;

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

      if (result.status === "check_failed") failed += 1;

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
