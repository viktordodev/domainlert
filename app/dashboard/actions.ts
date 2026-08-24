"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

const domainPattern = /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function result(message: string) {
  redirect(`/dashboard?import=${encodeURIComponent(message)}`);
}

function alertsResult(message: string): never {
  redirect(`/dashboard?alerts=${encodeURIComponent(message)}`);
}

function parseThresholds(raw: string): number[] {
  return [...new Set(
    raw.split(",").map((part) => part.trim()).filter((part) => /^\d{1,3}$/.test(part)).map(Number).filter((n) => n > 0 && n <= 365)
  )].sort((a, b) => b - a);
}

function hasInvalidThreshold(raw: string): boolean {
  return raw.split(",").some((part) => {
    const value = part.trim();
    return value.length === 0 || !/^\d{1,3}$/.test(value) || Number(value) < 1 || Number(value) > 365;
  });
}

function parseRecipients(raw: string): string[] {
  return [...new Set(raw.split(/[\s,;]+/).map((email) => email.trim().toLowerCase()).filter(Boolean))];
}

function isEmail(value: string): boolean {
  return value.length <= 254 && /^\S+@\S+\.\S+$/.test(value);
}

export async function importDomains(formData: FormData) {
  const supabase = createClient(await cookies());
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const rawValue = formData.get("domains");
  if (typeof rawValue !== "string" || rawValue.length > 100_000) {
    result("Enter a domain list of 100,000 characters or fewer.");
  }

  const rawDomains = rawValue.split(/[\s,;]+/);
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

  if (typeof domainId !== "string" || !uuidPattern.test(domainId)) {
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
  const raw = typeof rawValue === "string" ? rawValue.trim() : "";
  const thresholds = parseThresholds(raw);

  if (thresholds.length === 0) {
    alertsResult("Enter at least one valid day threshold (1-365), separated by commas.");
  }

  if (hasInvalidThreshold(raw)) {
    alertsResult("Use whole-number thresholds from 1 to 365, separated by commas.");
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

  if (typeof domainId !== "string" || !uuidPattern.test(domainId)) {
    alertsResult("We could not identify that domain.");
  }

  const rawValue = formData.get("alertThresholds");
  const raw = typeof rawValue === "string" ? rawValue.trim() : "";
  if (raw.length > 1_000) {
    alertsResult("Keep alert thresholds to 1,000 characters or fewer.");
  }
  const thresholds = raw.length === 0 ? null : parseThresholds(raw);
  const recipientValue = formData.get("alertRecipients");
  const recipientRaw = typeof recipientValue === "string" ? recipientValue.trim() : "";
  if (recipientRaw.length > 2_000) {
    alertsResult("Keep email recipients to 2,000 characters or fewer.");
  }
  const recipientTokens = recipientRaw.length === 0 ? [] : parseRecipients(recipientRaw);
  const recipients = recipientRaw.length === 0 ? null : recipientTokens;

  if (thresholds !== null && thresholds.length === 0) {
    alertsResult("Enter valid day thresholds (1-365), separated by commas, or leave blank to use your default.");
  }

  if (thresholds !== null && hasInvalidThreshold(raw)) {
    alertsResult("Use whole-number thresholds from 1 to 365, separated by commas, or leave blank to use your default.");
  }

  if (thresholds !== null && thresholds.length > 5) {
    alertsResult("Use 5 or fewer custom thresholds.");
  }

  if (recipientTokens.some((email) => !isEmail(email))) {
    alertsResult("Enter valid email addresses, separated by commas.");
  }

  if (recipients !== null && recipients.length > 3) {
    alertsResult("Use 3 or fewer email addresses per domain.");
  }

  const supabase = createClient(await cookies());
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: updatedDomain, error } = await supabase
    .from("domains")
    .update({ alert_thresholds: thresholds, alert_recipients: recipients })
    .eq("id", domainId)
    .eq("user_id", user.id)
    .select("domain_name")
    .single();

  if (error || !updatedDomain) {
    alertsResult("We could not update alerts for that domain. Please try again.");
  }

  alertsResult(thresholds === null
    ? `${updatedDomain.domain_name} now uses your default alert thresholds.`
    : `Custom alert thresholds saved for ${updatedDomain.domain_name}.`);
}