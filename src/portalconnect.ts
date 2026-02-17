const DEFAULT_ACCOUNT_ID = "REPLACE_WITH_ACCOUNT_ID";
const DEFAULT_SITE_ID = "REPLACE_WITH_SITE_ID";

export const portalConnect = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  account_id: process.env.NEXT_PUBLIC_ACCOUNT_ID ?? process.env.ACCOUNT_ID ?? DEFAULT_ACCOUNT_ID,
  site_id: process.env.NEXT_PUBLIC_SITE_ID ?? process.env.SITE_ID ?? DEFAULT_SITE_ID,
};

export function hasPortalConnectConfig() {
  return (
    Boolean(portalConnect.supabaseUrl) &&
    Boolean(portalConnect.supabaseAnonKey) &&
    portalConnect.account_id !== DEFAULT_ACCOUNT_ID &&
    portalConnect.site_id !== DEFAULT_SITE_ID
  );
}
