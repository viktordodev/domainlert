import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";
import { DEFAULT_LOCALE, LOCALE_COOKIE, type Locale } from "@/utils/i18n";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function isProtected(appPath: string): boolean {
  return (
    appPath === "/dashboard" ||
    appPath.startsWith("/dashboard/") ||
    appPath === "/profile" ||
    appPath.startsWith("/profile/")
  );
}

// Records the resolved locale so Server Actions (which can't read the [lang] root param) and the
// bare-root redirect can tell which language the visitor is on. Only rewrites the cookie when it
// would actually change, so most responses stay Set-Cookie-free.
function withLocaleCookie(response: NextResponse, locale: Locale, request: NextRequest): NextResponse {
  if (request.cookies.get(LOCALE_COOKIE)?.value !== locale) {
    response.cookies.set(LOCALE_COOKIE, locale, {
      path: "/",
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
    });
  }
  return response;
}

export async function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const { pathname } = url;

  // The internal Swedish tree (/sv/*) is an implementation detail — never expose it. The language
  // switcher links here deliberately: stamping NEXT_LOCALE=sv on this redirect is what stops the
  // returning-visitor rule below from bouncing the follow-up request to `/` back to `/en`.
  if (pathname === "/sv" || pathname.startsWith("/sv/")) {
    return withLocaleCookie(
      NextResponse.redirect(new URL(pathname.slice(3) || "/", url)),
      "sv",
      request,
    );
  }

  const hasEnPrefix = pathname === "/en" || pathname.startsWith("/en/");
  const locale: Locale = hasEnPrefix ? "en" : DEFAULT_LOCALE;
  const appPath = hasEnPrefix ? pathname.slice(3) || "/" : pathname;

  // Returning English visitors who land on the bare root are sent to /en.
  if (pathname === "/" && request.cookies.get(LOCALE_COOKIE)?.value === "en") {
    return withLocaleCookie(NextResponse.redirect(new URL("/en", url)), "en", request);
  }

  // Swedish pages are served from /sv/* without changing the visible URL; English needs no rewrite.
  const rewriteUrl = hasEnPrefix
    ? null
    : new URL(`/sv${pathname === "/" ? "" : pathname}`, url);

  if (isProtected(appPath)) {
    const { supabase, supabaseResponse } = createClient(request);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const loginUrl = new URL(hasEnPrefix ? "/en/login" : "/login", url);
      loginUrl.searchParams.set("next", appPath);
      return withLocaleCookie(NextResponse.redirect(loginUrl), locale, request);
    }

    if (!rewriteUrl) return withLocaleCookie(supabaseResponse, locale, request);

    // Carry the refreshed Supabase auth cookies onto the rewrite response.
    const rewritten = NextResponse.rewrite(rewriteUrl, { request });
    for (const cookie of supabaseResponse.cookies.getAll()) {
      rewritten.cookies.set(cookie);
    }
    return withLocaleCookie(rewritten, locale, request);
  }

  return withLocaleCookie(
    rewriteUrl ? NextResponse.rewrite(rewriteUrl, { request }) : NextResponse.next(),
    locale,
    request,
  );
}

export const config = {
  // Every navigable route runs through the proxy for locale routing. Skip API routes, the Supabase
  // auth callback, the OG image, Next internals, and any path with a file extension
  // (favicon.ico, sitemap.xml, robots.txt, *.png, …).
  matcher: ["/((?!api|auth|opengraph-image|_next/static|_next/image|.*\\.).*)"],
};
