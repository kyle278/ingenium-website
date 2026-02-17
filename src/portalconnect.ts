const DEFAULT_ACCOUNT_ID = "d253b486-faa4-47b9-b10f-67a7c6da3374";
const DEFAULT_SITE_ID = "13f9d31e-022c-4fd6-83bb-39cd1a51a85e";
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function readEnvValue(...keys: string[]) {
  for (const key of keys) {
    const value = process.env[key];

    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }

  return null;
}

function hasValue(value: string | null | undefined) {
  return typeof value === "string" && value.trim().length > 0;
}

export const portalConnect = {
  supabaseUrl: readEnvValue("NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_URL") ?? "",
  supabaseAnonKey:
    readEnvValue("NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_ANON_KEY") ?? "",
  account_id:
    readEnvValue("NEXT_PUBLIC_ACCOUNT_ID", "ACCOUNT_ID") ?? DEFAULT_ACCOUNT_ID,
  site_id: readEnvValue("NEXT_PUBLIC_SITE_ID", "SITE_ID") ?? DEFAULT_SITE_ID,
};

export function hasPortalConnectConfig() {
  return (
    hasValue(portalConnect.supabaseUrl) &&
    hasValue(portalConnect.supabaseAnonKey) &&
    UUID_PATTERN.test(portalConnect.account_id) &&
    UUID_PATTERN.test(portalConnect.site_id)
  );
}
