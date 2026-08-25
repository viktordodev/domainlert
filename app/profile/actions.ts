"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { isEmail } from "@/utils/validation";
import { sendExpiryAlertEmail } from "@/utils/email";

function valueFrom(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function passwordFrom(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function result(message: string): never {
  redirect(`/profile?notice=${encodeURIComponent(message)}`);
}

async function getUser() {
  const supabase = createClient(await cookies());
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/profile");
  }

  return { supabase, user };
}

export async function updateProfile(formData: FormData) {
  const fullName = valueFrom(formData, "fullName");
  const jobTitle = valueFrom(formData, "jobTitle");
  const agencyName = valueFrom(formData, "agencyName");
  const phone = valueFrom(formData, "phone");
  const website = valueFrom(formData, "website");

  if (fullName.length > 120 || jobTitle.length > 120 || agencyName.length > 120) {
    result("Keep names, roles, and agency names to 120 characters or fewer.");
  }

  if (phone.length > 30) {
    result("Keep your phone number to 30 characters or fewer.");
  }

  if (website && (!URL.canParse(website) || !new URL(website).protocol.startsWith("http"))) {
    result("Enter a complete website address, including https://.");
  }

  const { supabase, user } = await getUser();
  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    full_name: fullName,
    job_title: jobTitle,
    agency_name: agencyName,
    phone,
    website,
  });

  if (error) {
    result("We could not update your profile. Please try again.");
  }

  result("Your profile has been updated.");
}

export async function updateEmail(formData: FormData) {
  const email = valueFrom(formData, "email").toLowerCase();
  const { supabase, user } = await getUser();

  if (!isEmail(email)) {
    result("Enter a valid email address.");
  }

  if (email === user.email?.toLowerCase()) {
    result("That is already your current email address.");
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const { error } = await supabase.auth.updateUser(
    { email },
    { emailRedirectTo: `${siteUrl}/auth/callback?next=/profile` },
  );

  if (error) {
    result(error.message);
  }

  result("Check your inbox to confirm your new email address.");
}

export async function updatePassword(formData: FormData) {
  const currentPassword = passwordFrom(formData, "currentPassword");
  const password = passwordFrom(formData, "password");
  const passwordConfirmation = passwordFrom(formData, "passwordConfirmation");
  const { supabase, user } = await getUser();

  if (!currentPassword) {
    result("Enter your current password.");
  }

  if (password.length < 8) {
    result("Use a password with at least 8 characters.");
  }

  if (password !== passwordConfirmation) {
    result("Your new passwords do not match.");
  }

  if (!user.email) {
    result("This account does not have a password email address.");
  }

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  });

  if (signInError) {
    result("Your current password was not accepted.");
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    result(error.message);
  }

  result("Your password has been changed.");
}

export async function sendTestEmail() {
  const { supabase, user } = await getUser();

  if (!user.email) {
    result("Your account does not have an email address to send to.");
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
    });
  } catch (err) {
    // Caught (rather than left to throw) so a bad SMTP config surfaces as a readable notice
    // here instead of an unhandled error — the whole point of this button is to debug that config.
    sendError = (err instanceof Error ? err.message : "Unknown error").slice(0, 300);
  }

  if (sendError) {
    result(`We could not send a test email: ${sendError}`);
  }

  result(`Test email sent to ${user.email}. Check your inbox (and spam folder).`);
}