"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// De keys komen van de Vercel↔Supabase-integratie (NEXT_PUBLIC_* worden bij de
// build ingebakken). Staan ze er niet, dan blijft de app puur local-first werken.
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function isSupabaseConfigured(): boolean {
  return Boolean(URL && ANON);
}

let cached: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (cached !== undefined) return cached;
  cached = isSupabaseConfigured()
    ? createClient(URL as string, ANON as string, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
      })
    : null;
  return cached;
}
