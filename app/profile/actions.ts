"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

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

  const { supabase } = await getUser();
  const { error } = await supabase.auth.updateUser({
    data: {
      full_name: fullName,
      job_title: jobTitle,
      agency_name: agencyName,
      phone,
      website,
    },
  });

  if (error) {
    result("We could not update your profile. Please try again.");
  }

  result("Your profile has been updated.");
}

export async function updateAlertThresholds(formData: FormData) {
  const raw = valueFrom(formData, "alertThresholds");
  const thresholds = [...new Set(
    raw.split(",").map((part) => Number.parseInt(part.trim(), 10)).filter((n) => Number.isInteger(n) && n > 0 && n <= 365)
  )].sort((a, b) => b - a);

  if (thresholds.length === 0) {
    result("Enter at least one valid day threshold (1-365), separated by commas.");
  }

  if (thresholds.length > 10) {
    result("Use 10 or fewer thresholds.");
  }

  const { supabase } = await getUser();
  const { error } = await supabase.auth.updateUser({
    data: { alert_thresholds: thresholds },
  });

  if (error) {
    result("We could not update your alert thresholds. Please try again.");
  }

  result("Your alert thresholds have been updated.");
}

export async function updateEmail(formData: FormData) {
  const email = valueFrom(formData, "email").toLowerCase();
  const { supabase, user } = await getUser();

  if (!/^\S+@\S+\.\S+$/.test(email)) {
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