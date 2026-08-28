"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDictionary, type Dictionary } from "@/dictionaries";
import { LOCALE_COOKIE, format, localizePath, normalizeLocale, plural, type Locale } from "@/utils/i18n";
import { createClient } from "@/utils/supabase/server";
import {
  DOMAIN_PATTERN,
  UUID_PATTERN,
  isEmail,
  parseRecipients,
  validateThresholds,
  type ThresholdError,
} from "@/utils/validation";

const DOMAIN_LIMIT_ERRCODE = "DL001";

async function getDashboardContext() {
  const cookieStore = await cookies();
  const locale = normalizeLocale(cookieStore.get(LOCALE_COOKIE)?.value);
  return { cookieStore, locale, dict: getDictionary(locale).dashboard };
}

function redirectWith(locale: Locale, param: "import" | "alerts", message: string): never {
  redirect(`${localizePath(locale, "/dashboard")}?${param}=${encodeURIComponent(message)}`);
}

function thresholdMessage(
  error: ThresholdError,
  allowEmpty: boolean,
  copy: Dictionary["dashboard"]["thresholdValidation"],
): string {
  switch (error.code) {
    case "atLeastOne":
      return copy.atLeastOne;
    case "wholeNumbers":
      return allowEmpty ? copy.wholeNumbersOrBlank : copy.wholeNumbers;
    case "tooMany":
      return format(allowEmpty ? copy.tooManyOrBlank : copy.tooMany, { max: error.max ?? 0 });
  }
}

export async function importDomains(formData: FormData) {
  const { cookieStore, locale, dict } = await getDashboardContext();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(localizePath(locale, "/login"));
  }

  const rawValue = formData.get("domains");
  if (typeof rawValue !== "string" || rawValue.length > 100_000) {
    redirectWith(locale, "import", dict.actions.listTooLong);
  }

  const rawDomains = rawValue.split(/[\s,;]+/);
  const domains = [
    ...new Set(rawDomains.map((domain) => domain.toLowerCase().replace(/^www\./, "")).filter(Boolean)),
  ];
  const invalid = domains.filter((domain) => !DOMAIN_PATTERN.test(domain));
  const valid = domains.filter((domain) => DOMAIN_PATTERN.test(domain));

  if (valid.length === 0) {
    redirectWith(locale, "import", dict.actions.enterOneValid);
  }

  const { data: existing } = await supabase
    .from("domains")
    .select("domain_name")
    .in("domain_name", valid);
  const existingNames = new Set(existing?.map(({ domain_name }) => domain_name) ?? []);
  const newDomains = valid.filter((domain) => !existingNames.has(domain));

  if (newDomains.length > 0) {
    const { error } = await supabase
      .from("domains")
      .insert(newDomains.map((domain_name) => ({ domain_name, user_id: user.id })));

    if (error?.code === DOMAIN_LIMIT_ERRCODE) {
      redirectWith(locale, "import", dict.actions.capReached);
    }

    if (error) {
      redirectWith(locale, "import", dict.actions.importFailed);
    }
  }

  const skipped = existingNames.size + invalid.length;
  const imported = plural(newDomains.length, dict.actions.imported, { count: newDomains.length });
  const tail = skipped
    ? format(dict.actions.importedSkipped, { skipped })
    : dict.actions.importedDone;
  redirectWith(locale, "import", `${imported}${tail}`);
}

export async function deleteDomain(formData: FormData) {
  const { cookieStore, locale, dict } = await getDashboardContext();
  const domainId = formData.get("domainId");

  if (typeof domainId !== "string" || !UUID_PATTERN.test(domainId)) {
    redirectWith(locale, "import", dict.actions.couldNotIdentify);
  }

  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(localizePath(locale, "/login"));
  }

  const { error } = await supabase
    .from("domains")
    .delete()
    .eq("id", domainId)
    .eq("user_id", user.id);

  if (error) {
    redirectWith(locale, "import", dict.actions.removeFailed);
  }

  redirectWith(locale, "import", dict.actions.removed);
}

export async function updateGlobalAlertThresholds(formData: FormData) {
  const { cookieStore, locale, dict } = await getDashboardContext();
  const rawValue = formData.get("alertThresholds");
  const raw = typeof rawValue === "string" ? rawValue.trim() : "";
  const { thresholds, error: thresholdError } = validateThresholds(raw, {
    maxCount: 10,
    allowEmpty: false,
  });

  if (thresholdError) {
    redirectWith(locale, "alerts", thresholdMessage(thresholdError, false, dict.thresholdValidation));
  }

  const recipientValue = formData.get("alertRecipients");
  const recipientRaw = typeof recipientValue === "string" ? recipientValue.trim() : "";
  if (recipientRaw.length > 2_000) {
    redirectWith(locale, "alerts", dict.actions.recipientsTooLong);
  }
  const recipientTokens = recipientRaw.length === 0 ? [] : parseRecipients(recipientRaw);
  const recipients = recipientRaw.length === 0 ? null : recipientTokens;

  if (recipientTokens.some((email) => !isEmail(email))) {
    redirectWith(locale, "alerts", dict.actions.invalidRecipients);
  }

  if (recipients !== null && recipients.length > 3) {
    redirectWith(locale, "alerts", dict.actions.tooManyDefaultRecipients);
  }

  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(localizePath(locale, "/login"));
  }

  const { error } = await supabase
    .from("profiles")
    .upsert({ id: user.id, alert_thresholds: thresholds, alert_recipients: recipients });

  if (error) {
    redirectWith(locale, "alerts", dict.actions.defaultThresholdsFailed);
  }

  redirectWith(locale, "alerts", dict.actions.defaultThresholdsUpdated);
}

export async function updateDomainAlertThresholds(formData: FormData) {
  const { cookieStore, locale, dict } = await getDashboardContext();
  const domainId = formData.get("domainId");

  if (typeof domainId !== "string" || !UUID_PATTERN.test(domainId)) {
    redirectWith(locale, "alerts", dict.actions.couldNotIdentify);
  }

  const rawValue = formData.get("alertThresholds");
  const raw = typeof rawValue === "string" ? rawValue.trim() : "";
  if (raw.length > 1_000) {
    redirectWith(locale, "alerts", dict.actions.thresholdsTooLong);
  }
  const { thresholds, error: thresholdError } = validateThresholds(raw, {
    maxCount: 5,
    allowEmpty: true,
  });

  if (thresholdError) {
    redirectWith(locale, "alerts", thresholdMessage(thresholdError, true, dict.thresholdValidation));
  }

  const recipientValue = formData.get("alertRecipients");
  const recipientRaw = typeof recipientValue === "string" ? recipientValue.trim() : "";
  if (recipientRaw.length > 2_000) {
    redirectWith(locale, "alerts", dict.actions.recipientsTooLong);
  }
  const recipientTokens = recipientRaw.length === 0 ? [] : parseRecipients(recipientRaw);
  const recipients = recipientRaw.length === 0 ? null : recipientTokens;

  if (recipientTokens.some((email) => !isEmail(email))) {
    redirectWith(locale, "alerts", dict.actions.invalidRecipients);
  }

  if (recipients !== null && recipients.length > 3) {
    redirectWith(locale, "alerts", dict.actions.tooManyRecipients);
  }

  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(localizePath(locale, "/login"));
  }

  const { data: updatedDomain, error } = await supabase
    .from("domains")
    .update({ alert_thresholds: thresholds, alert_recipients: recipients })
    .eq("id", domainId)
    .eq("user_id", user.id)
    .select("domain_name")
    .single();

  if (error || !updatedDomain) {
    redirectWith(locale, "alerts", dict.actions.domainAlertsFailed);
  }

  redirectWith(
    locale,
    "alerts",
    thresholds === null
      ? format(dict.actions.domainUsesDefault, { name: updatedDomain.domain_name })
      : format(dict.actions.domainCustomSaved, { name: updatedDomain.domain_name }),
  );
}
