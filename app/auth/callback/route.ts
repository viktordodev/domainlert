import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { LOCALE_COOKIE, localizePath, normalizeLocale } from "@/utils/i18n";
import { createClient } from "@/utils/supabase/server";

// Reverse-proxied request.url can resolve to the container's internal origin, so use the trusted site URL instead.
const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const authError = url.searchParams.get("error_description") ?? url.searchParams.get("error");
  const cookieStore = await cookies();
  const locale = normalizeLocale(cookieStore.get(LOCALE_COOKIE)?.value);

  const next = url.searchParams.get("next") ?? localizePath(locale, "/dashboard");
  const nextPath = next.startsWith("/") && !next.startsWith("//") ? next : localizePath(locale, "/dashboard");

  if (code) {
    const supabase = createClient(cookieStore);
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(new URL(nextPath, siteOrigin));
    }
  }

  const message = authError ?? "Unable to confirm your account";
  return NextResponse.redirect(
    new URL(`${localizePath(locale, "/login")}?error=${encodeURIComponent(message)}`, siteOrigin),
  );
}
