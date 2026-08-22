"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

const domainPattern = /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;

function result(message: string) {
  redirect(`/dashboard?import=${encodeURIComponent(message)}`);
}

function alertsResult(message: string): never {
  redirect(`/dashboard?alerts=${encodeURIComponent(message)}`);
}

function parseThresholds(raw: string): number[] {
  return [...new Set(
    raw.split(",").map((part) => Number.parseInt(part.trim(), 10)).filter((n) => Number.isInteger(n) && n > 0 && n <= 365)
  )].sort((a, b) => b - a);
}

export async function importDomains(formData: FormData) {
  const supabase = createClient(await cookies());
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const rawValue = formData.get("domains");
  const rawDomains = typeof rawValue === "string" ? rawValue.split(/[\s,;]+/) : [];
  const domains = [...new Set(rawDomains.map((domain) => domain.toLowerCase().replace(/^www\./, "")).filter(Boolean))];
  const invalid = domains.filter((domain) => !domainPattern.test(domain));
  const valid = domains.filter((domain) => domainPattern.test(domain));

  if (valid.length === 0) {
    result("Enter at least one valid domain.");
  }

  const { data: existing } = await supabase
    .from("domains")
    .select("domain_name")
    .in("domain_name", valid);
  const existingNames = new Set(existing?.map(({ domain_name }) => domain_name) ?? []);
  const newDomains = valid.filter((domain) => !existingNames.has(domain));

  if (newDomains.length > 0) {
    const { error } = await supabase.from("domains").insert(
      newDomains.map((domain_name) => ({ domain_name, user_id: user.id }))
    );

    if (error?.message.includes("DOMAIN_LIMIT_REACHED")) {
      result("Your account has reached the 1,000-domain cap. Contact support to add more.");
    }

    if (error) {
      result("We could not import those domains. Check your database setup and try again.");
    }
  }

  const skipped = existingNames.size + invalid.length;
  result(`Imported ${newDomains.length} domain${newDomains.length === 1 ? "" : "s"}${skipped ? `; skipped ${skipped}.` : "."}`);
}

export async function deleteDomain(formData: FormData) {
  const domainId = formData.get("domainId");

  if (typeof domainId !== "string" || !domainId) {
    result("We could not identify that domain.");
  }

  const supabase = createClient(await cookies());
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { error } = await supabase
    .from("domains")
    .delete()
    .eq("id", domainId)
    .eq("user_id", user.id);

  if (error) {
    result("We could not remove that domain. Please try again.");
  }

  result("Domain removed.");
}

export async function updateGlobalAlertThresholds(formData: FormData) {
  const rawValue = formData.get("alertThresholds");
  const thresholds = parseThresholds(typeof rawValue === "string" ? rawValue : "");

  if (thresholds.length === 0) {
    alertsResult("Enter at least one valid day threshold (1-365), separated by commas.");
  }

  if (thresholds.length > 10) {
    alertsResult("Use 10 or fewer thresholds.");
  }

  const supabase = createClient(await cookies());
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { error } = await supabase.auth.updateUser({ data: { alert_thresholds: thresholds } });

  if (error) {
    alertsResult("We could not update your default alert thresholds. Please try again.");
  }

  alertsResult("Your default alert thresholds have been updated.");
}

export async function updateDomainAlertThresholds(formData: FormData) {
  const domainId = formData.get("domainId");

  if (typeof domainId !== "string" || !domainId) {
    alertsResult("We could not identify that domain.");
  }

  const rawValue = formData.get("alertThresholds");
  const raw = typeof rawValue === "string" ? rawValue.trim() : "";
  const thresholds = raw.length === 0 ? null : parseThresholds(raw);

  if (thresholds !== null && thresholds.length === 0) {
    alertsResult("Enter valid day thresholds (1-365), separated by commas, or leave blank to use your default.");
  }

  if (thresholds !== null && thresholds.length > 10) {
    alertsResult("Use 10 or fewer thresholds.");
  }

  const supabase = createClient(await cookies());
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { error } = await supabase
    .from("domains")
    .update({ alert_thresholds: thresholds })
    .eq("id", domainId)
    .eq("user_id", user.id);

  if (error) {
    alertsResult("We could not update alerts for that domain. Please try again.");
  }

  alertsResult(thresholds === null ? "This domain now uses your default alert thresholds." : "Custom alert thresholds saved for this domain.");
}