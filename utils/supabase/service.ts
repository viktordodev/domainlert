import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { requireEnv } from "@/utils/env";

const supabaseUrl = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");

// Service-role client bypasses RLS — server-only, never import from client components.
export const createServiceClient = () =>
  createSupabaseClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
