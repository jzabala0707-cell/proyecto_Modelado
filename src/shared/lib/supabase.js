import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const hasConfig = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const supabase = hasConfig
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true },
      db: { schema: "artetours" },
    })
  : null;

export const isSupabaseConfigured = hasConfig;

export async function withMockDelay(data, ms = 1200) {
  await new Promise((resolve) => setTimeout(resolve, ms));
  return data;
}

