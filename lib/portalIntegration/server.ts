import { createClient } from "@supabase/supabase-js";

import { readPortalServerConfig } from "@/lib/portalIntegration/config";
import type { PortalFormRecord } from "@/lib/portalIntegration/types";

function validateServiceRoleKey(serviceRoleKey: string) {
  if (serviceRoleKey.startsWith("sb_publishable_") || serviceRoleKey.startsWith("sb_anon_")) {
    throw new Error(
      "PORTAL_SUPABASE_SERVICE_ROLE_KEY is set to a publishable/anon key. Use a service-role secret key.",
    );
  }
}

export function createPortalServerClient() {
  const config = readPortalServerConfig();
  validateServiceRoleKey(config.serviceRoleKey);

  return {
    config,
    supabase: createClient(config.supabaseUrl, config.serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    }),
  };
}

export async function getPortalFormBySlug(slug: string): Promise<PortalFormRecord | null> {
  const { config, supabase } = createPortalServerClient();

  const { data, error } = await supabase
    .from("website_forms")
    .select("id, slug, name")
    .eq("organisation_id", config.organisationId)
    .eq("site_id", config.siteId)
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to resolve portal form for slug "${slug}": ${error.message}`);
  }

  if (!data?.id || !data.slug || !data.name) {
    return null;
  }

  return {
    id: data.id as string,
    slug: data.slug as string,
    name: data.name as string,
  };
}
