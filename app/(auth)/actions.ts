"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

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