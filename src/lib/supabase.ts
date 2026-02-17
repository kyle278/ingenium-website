import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { portalConnect } from "@/src/portalconnect";

let browserClient: SupabaseClient | null = null;

function createConfiguredClient() {
  return createClient(portalConnect.supabaseUrl, portalConnect.supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

export function getBrowserSupabaseClient() {
  if (typeof window === "undefined") {
    throw new Error("getBrowserSupabaseClient can only be used in the browser.");
  }

  if (!browserClient) {
    browserClient = createConfiguredClient();
  }

  return browserClient;
}

export function createSupabaseAnonClient() {
  return createConfiguredClient();
}
