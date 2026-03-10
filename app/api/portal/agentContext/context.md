# Portal API Area Context

## Scope
`app/api/portal` exposes website-facing endpoints that proxy secure interactions with Portal Supabase.

## Current Task Relevance
- Form submit routes must resolve active form definitions and insert canonical submission payloads.
- Dedicated route `/api/portal-form-submit` is the primary browser submit target.
- Form submit payload now includes canonical linkage values (`visitor_id`, `session_id`, `site_id`) and attribution values from website tracking runtime.

## Guardrails
- Use `PORTAL_SUPABASE_SERVICE_ROLE_KEY` server-side only.
- Validate required config (`PORTAL_APP_URL`, `PORTAL_SUPABASE_URL`, `PORTAL_ORGANISATION_ID`, `PORTAL_SITE_ID`, service-role key).
- Reject publishable/anon keys for `PORTAL_SUPABASE_SERVICE_ROLE_KEY` to prevent trigger-side RLS failures.
- Return clear 4xx/5xx responses for invalid input or portal-side write failures.
- Preserve canonical tracking/linkage values in stored submission payload for downstream correlation.
- Fail explicitly if a canonical Portal form UUID cannot be resolved for the requested slug.
