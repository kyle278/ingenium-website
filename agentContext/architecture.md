# Global Architecture

## Runtime Layers
- Client layer: React components in `app/(website)` for page rendering, contact interaction, and tracking payload generation.
- Tracking script layer: `ingenium-tracker.js` loaded at runtime from Portal app and initialized in root layout.
- Server/API layer: Next.js route handlers in `app/api`.
- Data layer: Portal Supabase project (remote) accessed with anon key for read-only scenarios and service role key for secure form inserts.

## Integration Boundary
- Browser tracking events post directly to `${NEXT_PUBLIC_INGENIUM_PORTAL_APP_URL}/api/websites/tracking/events`.
- Contact form submits to internal API route `/api/portal-form-submit`.
- Internal API route validates payload, resolves form id, and inserts into `website_form_submissions`.
- Canonical form linkage IDs (`visitor_id`, `session_id`, `site_id`) are propagated via tracking payload and persisted in submission data/metadata.
- Attribution and CRM linkage occur in Portal DB triggers, not in website runtime.

## Change Impact Map
- Form UX changes impact conversion flow and visible success/error states.
- API route changes impact data integrity and attribution downstream.
- Tracking runtime changes impact event completeness and real-time analytics quality.
- Environment configuration impacts runtime reliability and security posture.
