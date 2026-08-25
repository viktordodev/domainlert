import { createServerClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { cache } from "react";
import { requireEnv } from "@/utils/env";

const supabaseUrl = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
const supabaseKey = requireEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");

export const createClient = (cookieStore: Awaited<ReturnType<typeof cookies>>) => {
  return createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};

// Deduplicated per request with React's cache(): every Server Component that calls this
// during the same render (Header, a page, etc.) shares one Supabase auth round-trip instead
// of each triggering its own. Swallows errors so an auth-dependent UI fragment (e.g. the
// header's account menu) can degrade to "signed out" instead of throwing during render.
export const getCurrentUser = cache(async (): Promise<User | null> => {
  try {
    const supabase = createClient(await cookies());
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch {
    return null;
  }
});
