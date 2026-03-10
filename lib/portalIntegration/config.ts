import type { PortalPublicConfig, PortalServerConfig } from "@/lib/portalIntegration/types";

function readEnvValue(key: string) {
  const raw = process.env[key];
  if (typeof raw !== "string") {
    return null;
  }

  const normalized = raw.trim();
  return normalized.length > 0 ? normalized : null;
}

function sanitizeSecretValue(value: string) {
  return value.replace(/\\r\\n|\\n|\\r/g, "").trim();
}

function requireEnvValue(key: string) {
  const value = readEnvValue(key);
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

export function readPortalPublicConfig(): PortalPublicConfig {
  return {
    portalAppUrl: requireEnvValue("PORTAL_APP_URL").replace(/\/$/, ""),
    siteId: requireEnvValue("PORTAL_SITE_ID"),
  };
}

export function readPortalServerConfig(): PortalServerConfig {
  return {
    ...readPortalPublicConfig(),
    supabaseUrl: requireEnvValue("PORTAL_SUPABASE_URL"),
    serviceRoleKey: sanitizeSecretValue(requireEnvValue("PORTAL_SUPABASE_SERVICE_ROLE_KEY")),
    organisationId: requireEnvValue("PORTAL_ORGANISATION_ID"),
    defaultFormSlug: readEnvValue("PORTAL_DEFAULT_FORM_SLUG"),
  };
}

export function getPortalPublicConfigOrNull() {
  try {
    return readPortalPublicConfig();
  } catch {
    return null;
  }
}
