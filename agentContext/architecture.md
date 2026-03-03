# Global Architecture

## Runtime Layers
- Client layer: React components in `app/(website)` for page rendering and form interaction.
- Server/API layer: Next.js route handlers in `app/api`.
- Data layer: Portal Supabase project (remote) accessed with anon key for read-only scenarios and service role key for secure form inserts.

## Integration Boundary
- Contact form submits to internal API route.
- Internal API route validates payload, resolves form id, and inserts into `website_form_submissions`.
- Attribution and CRM linkage occur in Portal DB triggers, not in website runtime.

## Change Impact Map
- Form UX changes impact conversion flow and visible success/error states.
- API route changes impact data integrity and attribution downstream.
- Environment configuration impacts runtime reliability and security posture.
