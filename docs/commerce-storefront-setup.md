# Ingenium Portal catalogue connection

The public `/products` catalogue reads immutable product snapshots from the Portal's Cloudflare edge. It never reads Supabase or drafts. The Portal remains the source of truth for product data and media. The page shows products only after they have been published. Checkout is intentionally off for this first internal catalogue test.

## Website server environment

Add these server-side environment variables to the Ingenium Website Vercel project. Use the staging values in Preview and the production values only after the production Portal workspace and Cloudflare edge are deployed.

| Variable | Purpose |
| --- | --- |
| `INGENIUM_COMMERCE_SITE_KEY` | Public read-only key shown in Portal's E-Commerce connection settings |
| `INGENIUM_COMMERCE_EDGE_ORIGIN` | Preview: `https://edge-staging.ingeniumconsulting.net`; Production: `https://edge.ingeniumconsulting.net` |
| `INGENIUM_COMMERCE_PORTAL_ORIGIN` | Portal origin used to acknowledge signed publication events |
| `INGENIUM_COMMERCE_SERVER_CREDENTIAL` | Server-only Portal credential with the `revalidate` scope |
| `INGENIUM_COMMERCE_REVALIDATION_SECRET` | Server-only secret used to verify Portal's signed publication event |
| `VERCEL_AUTOMATION_BYPASS_SECRET` | Needed only when the Portal preview deployment is protected by Vercel Deployment Protection |

Never prefix credentials or the revalidation secret with `NEXT_PUBLIC_`. The site ID already configured in `lib/portalIntegration/public.ts` continues to power tracking and forms; the commerce key is separate.

## Portal store settings

For the Ingenium Website record (`13f9d31e-022c-4fd6-83bb-39cd1a51a85e`):

1. Open E-Commerce in the Portal preview and create the store for the Ingenium Website.
2. Keep checkout disabled while we test catalogue publishing and image delivery.
3. Register the exact stable Vercel preview origin and `https://www.ingeniumconsulting.net` as allowed site origins.
4. Set the publication callback to `https://<stable-preview-origin>/api/ingenium/revalidate` for the staging store. The production store will use `https://www.ingeniumconsulting.net/api/ingenium/revalidate` after its deployment.
5. Create a server credential with `revalidate` scope and create the refresh secret. Save both as protected server environment variables on the matching website environment.
6. Add products and images in the Portal, publish, then check `/products`, `/products/<slug>`, and the published image URLs.

Product pages use Portal's publication event to invalidate the Next.js catalogue cache and store routes. The read cache is also capped at ten seconds as a recovery path.
