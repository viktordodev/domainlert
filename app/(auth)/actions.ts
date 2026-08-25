"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { isEmail } from "@/utils/validation";

function valueFrom(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function authError(path: string, message: string): never {
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

export async function signIn(formData: FormData) {
  const email = valueFrom(formData, "email");
  const password = valueFrom(formData, "password");

  if (!email || !password) {
    authError("/login", "Enter your email and password.");
  }

  const supabase = createClient(await cookies());
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    authError("/login", "That email and password combination was not accepted.");
  }

  redirect("/dashboard");
}

export async function requestPasswordReset(formData: FormData) {
  const email = valueFrom(formData, "email").toLowerCase();

  if (!isEmail(email)) {
    authError("/forgot-password", "Enter a valid email address.");
  }

  const supabase = createClient(await cookies());
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/auth/callback?next=/reset-password`,
  });

  if (error) {
    authError("/forgot-password", "We could not send the reset email. Please try again.");
  }

  redirect("/forgot-password?message=Check your inbox for a password reset link.");
}

export async function resetPassword(formData: FormData) {
  const passwordValue = formData.get("password");
  const confirmationValue = formData.get("confirmation");
  const password = typeof passwordValue === "string" ? passwordValue : "";
  const confirmation = typeof confirmationValue === "string" ? confirmationValue : "";

  if (password.length < 8) {
    authError("/reset-password", "Use a password with at least 8 characters.");
  }

  if (password !== confirmation) {
    authError("/reset-password", "Your passwords do not match.");
  }

  const supabase = createClient(await cookies());
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    authError("/login", "That reset link has expired. Request a new one to continue.");
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    authError("/reset-password", "We could not update your password. Please try again.");
  }

  redirect("/login?message=Your password has been updated. You can now log in.");
}

export async function signUp(formData: FormData) {
  const email = valueFrom(formData, "email");
  const password = valueFrom(formData, "password");

  if (!email || password.length < 8) {
    authError("/signup", "Use an email address and a password with at least 8 characters.");
  }

  const supabase = createClient(await cookies());
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/auth/callback`,
    },
  });

  if (error) {
    authError("/signup", error.message);
  }

  if (data.session) {
    redirect("/dashboard");
  }

  redirect("/login?message=Check your email to confirm your account.");
}

export async function signOut() {
  const supabase = createClient(await cookies());
  await supabase.auth.signOut();
  redirect("/");
}