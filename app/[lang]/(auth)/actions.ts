"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDictionary } from "@/dictionaries";
import { LOCALE_COOKIE, localizePath, normalizeLocale, type Locale } from "@/utils/i18n";
import { createClient } from "@/utils/supabase/server";
import { isEmail } from "@/utils/validation";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Server Actions can't read the [lang] root param, so the locale comes from the NEXT_LOCALE
// cookie the proxy sets on every request.
async function getAuthContext() {
  const cookieStore = await cookies();
  const locale = normalizeLocale(cookieStore.get(LOCALE_COOKIE)?.value);
  return { cookieStore, locale, errors: getDictionary(locale).auth.errors };
}

function valueFrom(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function redirectWith(locale: Locale, path: string, param: "error" | "message", value: string): never {
  redirect(`${localizePath(locale, path)}?${param}=${encodeURIComponent(value)}`);
}

function callbackUrl(locale: Locale, next: string) {
  return `${siteUrl}/auth/callback?next=${encodeURIComponent(localizePath(locale, next))}`;
}

export async function signIn(formData: FormData) {
  const { cookieStore, locale, errors } = await getAuthContext();
  const email = valueFrom(formData, "email");
  const password = valueFrom(formData, "password");

  if (!email || !password) {
    redirectWith(locale, "/login", "error", errors.enterEmailAndPassword);
  }

  const supabase = createClient(cookieStore);
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirectWith(locale, "/login", "error", errors.credentialsRejected);
  }

  redirect(localizePath(locale, "/dashboard"));
}

export async function requestPasswordReset(formData: FormData) {
  const { cookieStore, locale, errors } = await getAuthContext();
  const email = valueFrom(formData, "email").toLowerCase();

  if (!isEmail(email)) {
    redirectWith(locale, "/forgot-password", "error", errors.enterValidEmail);
  }

  const supabase = createClient(cookieStore);
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: callbackUrl(locale, "/reset-password"),
  });

  if (error) {
    redirectWith(locale, "/forgot-password", "error", errors.resetSendFailed);
  }

  redirectWith(locale, "/forgot-password", "message", errors.resetEmailSent);
}

export async function resetPassword(formData: FormData) {
  const { cookieStore, locale, errors } = await getAuthContext();
  const passwordValue = formData.get("password");
  const confirmationValue = formData.get("confirmation");
  const password = typeof passwordValue === "string" ? passwordValue : "";
  const confirmation = typeof confirmationValue === "string" ? confirmationValue : "";

  if (password.length < 8) {
    redirectWith(locale, "/reset-password", "error", errors.passwordTooShort);
  }

  if (password !== confirmation) {
    redirectWith(locale, "/reset-password", "error", errors.passwordsDoNotMatch);
  }

  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirectWith(locale, "/login", "error", errors.resetLinkExpired);
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    redirectWith(locale, "/reset-password", "error", errors.passwordUpdateFailed);
  }

  redirectWith(locale, "/login", "message", errors.passwordUpdated);
}

export async function signUp(formData: FormData) {
  const { cookieStore, locale, errors } = await getAuthContext();
  const email = valueFrom(formData, "email");
  const password = valueFrom(formData, "password");

  if (!email || password.length < 8) {
    redirectWith(locale, "/signup", "error", errors.signupInvalid);
  }

  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: callbackUrl(locale, "/dashboard") },
  });

  if (error) {
    // Supabase's own message (e.g. "User already registered") is passed through untranslated.
    redirectWith(locale, "/signup", "error", error.message);
  }

  if (data.session) {
    redirect(localizePath(locale, "/dashboard"));
  }

  redirectWith(locale, "/login", "message", errors.confirmEmail);
}

export async function signOut() {
  const { cookieStore, locale } = await getAuthContext();
  const supabase = createClient(cookieStore);
  await supabase.auth.signOut();
  redirect(localizePath(locale, "/"));
}
