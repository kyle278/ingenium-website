const DEFAULT_SITE_ID = "YOUR_SITE_UUID";
const DEFAULT_ACCOUNT_ID = "YOUR_ACCOUNT_UUID";

export const SITE_ID = process.env.SITE_ID ?? DEFAULT_SITE_ID;
export const ACCOUNT_ID = process.env.ACCOUNT_ID ?? DEFAULT_ACCOUNT_ID;

export function hasPortalConnectionConfig() {
  return SITE_ID !== DEFAULT_SITE_ID && ACCOUNT_ID !== DEFAULT_ACCOUNT_ID;
}
