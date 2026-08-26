"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDictionary } from "@/dictionaries";
import { LOCALE_COOKIE, format, localizePath, normalizeLocale, type Locale } from "@/utils/i18n";
import { createClient } from "@/utils/supabase/server";
import { isEmail } from "@/utils/validation";
import { sendExpiryAlertEmail } from "@/utils/email";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

function valueFrom(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function passwordFrom(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function result(locale: Locale, message: string): never {
  redirect(`${localizePath(locale, "/profile")}?notice=${encodeURIComponent(message)}`);
}

async function getContext() {
  const cookieStore = await cookies();
  const locale = normalizeLocale(cookieStore.get(LOCALE_COOKIE)?.value);
  const dict = getDictionary(locale);
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`${localizePath(locale, "/login")}?next=${encodeURIComponent(localizePath(locale, "/profile"))}`);
  }

  return { supabase, user, locale, dict, actions: dict.profile.actions };
}

export async function updateProfile(formData: FormData) {
  const { supabase, user, locale, actions } = await getContext();
  const fullName = valueFrom(formData, "fullName");
  const jobTitle = valueFrom(formData, "jobTitle");
  const agencyName = valueFrom(formData, "agencyName");
  const phone = valueFrom(formData, "phone");
  const website = valueFrom(formData, "website");

  if (fullName.length > 120 || jobTitle.length > 120 || agencyName.length > 120) {
    result(locale, actions.namesTooLong);
  }

  if (phone.length > 30) {
    result(locale, actions.phoneTooLong);
  }

  if (website && (!URL.canParse(website) || !new URL(website).protocol.startsWith("http"))) {
    result(locale, actions.invalidWebsite);
  }

  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    full_name: fullName,
    job_title: jobTitle,
    agency_name: agencyName,
    phone,
    website,
  });

  if (error) {
    result(locale, actions.profileFailed);
  }

  result(locale, actions.profileUpdated);
}

export async function updateEmail(formData: FormData) {
  const { supabase, user, locale, actions } = await getContext();
  const email = valueFrom(formData, "email").toLowerCase();

  if (!isEmail(email)) {
    result(locale, actions.enterValidEmail);
  }

  if (email === user.email?.toLowerCase()) {
    result(locale, actions.sameEmail);
  }

  const { error } = await supabase.auth.updateUser(
    { email },
    { emailRedirectTo: `${siteUrl}/auth/callback?next=${encodeURIComponent(localizePath(locale, "/profile"))}` },
  );

  if (error) {
    result(locale, error.message);
  }

  result(locale, actions.confirmNewEmail);
}

export async function updatePassword(formData: FormData) {
  const { supabase, user, locale, actions } = await getContext();
  const currentPassword = passwordFrom(formData, "currentPassword");
  const password = passwordFrom(formData, "password");
  const passwordConfirmation = passwordFrom(formData, "passwordConfirmation");

  if (!currentPassword) {
    result(locale, actions.enterCurrentPassword);
  }

  if (password.length < 8) {
    result(locale, actions.passwordTooShort);
  }

  if (password !== passwordConfirmation) {
    result(locale, actions.passwordsDoNotMatch);
  }

  if (!user.email) {
    result(locale, actions.noPasswordEmail);
  }

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  });

  if (signInError) {
    result(locale, actions.currentPasswordRejected);
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    result(locale, error.message);
  }

  result(locale, actions.passwordChanged);
}

export async function sendTestEmail() {
  const { supabase, user, locale, actions } = await getContext();

  if (!user.email) {
    result(locale, actions.noEmailToSend);
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, agency_name")
    .eq("id", user.id)
    .maybeSingle();
  const ownerName = profile?.agency_name || profile?.full_name || null;

  let sendError: string | null = null;

  try {
    await sendExpiryAlertEmail({
      to: user.email,
      domainName: "example.com",
      daysRemaining: 14,
      expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      ownerName,
      ownerEmail: user.email,
      locale,
    });
  } catch (err) {
    // Caught (rather than left to throw) so a bad SMTP config surfaces as a readable notice
    // here instead of an unhandled error — the whole point of this button is to debug that config.
    sendError = (err instanceof Error ? err.message : "Unknown error").slice(0, 300);
  }

  if (sendError) {
    result(locale, format(actions.testEmailFailed, { error: sendError }));
  }

  result(locale, format(actions.testEmailSent, { email: user.email }));
}
