# Global Architecture

## Runtime Layers
- Client layer: React components in `app/(website)` for page rendering, multi-step intake UX, and consent handling.
- Tracking script layer: `ingenium-tracker.js` loaded at runtime from Portal app and initialized in root layout.
- Server/API layer: Next.js route handlers in `app/api` for site content only; standard Portal form submission no longer uses local proxy routes.
- Data layer: Portal-managed tracking and form ingestion endpoints hosted at `https://portal.ingeniumconsulting.net`.

## Integration Boundary
- Browser tracking events post directly to `https://portal.ingeniumconsulting.net/api/websites/tracking/events`.
- Standard lead forms submit directly to `https://portal.ingeniumconsulting.net/api/websites/forms/submit` through the hosted tracker.
- The frontend identifies forms by canonical slug via `data-form-slug`.
- Canonical linkage IDs (`visitor_id`, `session_id`, `site_id`) are injected by the hosted tracker into the real form DOM before submit.
- Attribution, persistence in `website_form_submissions`, and downstream CRM linkage occur in Portal, not in website runtime.

## Change Impact Map
- Public marketing route copy, metadata, nav, and footer now carry a platform-first narrative modeled on unified-system selling patterns.
- Named client proof now lives in the `/projects` library and the `/case-studies` route, with shared structured-data support and static sitemap/robots generation in the App Router layer.
- Form UX changes impact conversion flow, consent capture, and visible success/error states.
- Tracking runtime changes impact event completeness, unique visitor/session quality, and Website > Reports form metrics.
- The editable `PORTAL_SITE_ID` constant impacts runtime form resolution and tracking destination accuracy.
