# Portal API Area Context

## Scope
`app/api/portal` exposes website-facing endpoints that proxy secure interactions with Portal Supabase.

## Current Task Relevance
- Add form submit route under `forms/[slug]/submit`.
- Route must resolve active form definition and insert canonical submission payload.

## Guardrails
- Use `PORTAL_SUPABASE_SERVICE_ROLE_KEY` server-side only.
- Validate required config (`PORTAL_ORGANISATION_ID`, `PORTAL_SITE_ID`, Supabase URL/key).
- Return clear 4xx/5xx responses for invalid input or portal-side write failures.
