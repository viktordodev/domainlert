import { type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

export async function proxy(request: NextRequest) {
  const { supabase, supabaseResponse } = createClient(request);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user && (request.nextUrl.pathname.startsWith("/dashboard") || request.nextUrl.pathname.startsWith("/profile"))) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return Response.redirect(loginUrl);
  }

  return supabaseResponse;
}

export const config = {
  // Only the routes that actually gate on auth need the cookie-refresh round-trip to Supabase.
  // Every other page (marketing, legal, auth forms) doesn't need it, and running it there
  // forced those pages into dynamic rendering for no reason — see app/components/Header.tsx
  // for the equivalent, request-scoped auth check those pages do need for the account menu.
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
