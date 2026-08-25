"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { DOMAIN_PATTERN, UUID_PATTERN, isEmail, parseRecipients, validateThresholds } from "@/utils/validation";

const DOMAIN_LIMIT_ERRCODE = "DL001";

function result(message: string): never {
  redirect(`/dashboard?import=${encodeURIComponent(message)}`);
}

function alertsResult(message: string): never {
  redirect(`/dashboard?alerts=${encodeURIComponent(message)}`);
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
  const invalid = domains.filter((domain) => !DOMAIN_PATTERN.test(domain));
  const valid = domains.filter((domain) => DOMAIN_PATTERN.test(domain));

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

    if (error?.code === DOMAIN_LIMIT_ERRCODE) {
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

  if (typeof domainId !== "string" || !UUID_PATTERN.test(domainId)) {
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
  const { thresholds, error: thresholdError } = validateThresholds(raw, { maxCount: 10, allowEmpty: false });

  if (thresholdError) {
    alertsResult(thresholdError);
  }

  const supabase = createClient(await cookies());
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { error } = await supabase.from("profiles").upsert({ id: user.id, alert_thresholds: thresholds });

  if (error) {
    alertsResult("We could not update your default alert thresholds. Please try again.");
  }

  alertsResult("Your default alert thresholds have been updated.");
}

export async function updateDomainAlertThresholds(formData: FormData) {
  const domainId = formData.get("domainId");

  if (typeof domainId !== "string" || !UUID_PATTERN.test(domainId)) {
    alertsResult("We could not identify that domain.");
  }

  const rawValue = formData.get("alertThresholds");
  const raw = typeof rawValue === "string" ? rawValue.trim() : "";
  if (raw.length > 1_000) {
    alertsResult("Keep alert thresholds to 1,000 characters or fewer.");
  }
  const { thresholds, error: thresholdError } = validateThresholds(raw, { maxCount: 5, allowEmpty: true });

  if (thresholdError) {
    alertsResult(thresholdError);
  }

  const recipientValue = formData.get("alertRecipients");
  const recipientRaw = typeof recipientValue === "string" ? recipientValue.trim() : "";
  if (recipientRaw.length > 2_000) {
    alertsResult("Keep email recipients to 2,000 characters or fewer.");
  }
  const recipientTokens = recipientRaw.length === 0 ? [] : parseRecipients(recipientRaw);
  const recipients = recipientRaw.length === 0 ? null : recipientTokens;

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
