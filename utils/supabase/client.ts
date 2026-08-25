import { createBrowserClient } from "@supabase/ssr";
import { requireEnv } from "@/utils/env";

const supabaseUrl = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
const supabaseKey = requireEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");

export const createClient = () =>
  createBrowserClient(
    supabaseUrl,
    supabaseKey,
  );
