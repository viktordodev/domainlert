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

// Swallows errors so an auth-dependent UI fragment (e.g. the header's account menu) can
// degrade to "signed out" instead of throwing during render.
export async function getUser(): Promise<User | null> {
  try {
    const supabase = createClient(await cookies());
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch {
    return null;
  }
}

// Deduplicated per request with React's cache() — for use ONLY inside components that are
// always rendered behind their own <Suspense> boundary (Header's account menu, AuthCta). Do
// NOT call this directly at the top of a page/layout component: sharing one cache()-memoized
// promise between a Suspense-wrapped consumer and a plain top-level `await` in the same render
// trips a React invariant ("cleaning up async info that was not on the parent Suspense
// boundary") under Cache Components. Pages that need the user directly (to gate access with
// redirect(), for example) should call getUser() above instead.
export const getCurrentUser = cache(getUser);
