# Portal API Area Context

## Scope
`app/api/portal` exposes website-facing endpoints that proxy secure interactions with Portal Supabase.

## Current Task Relevance
- Add form submit route under `forms/[slug]/submit`.
- Route must resolve active form definition and insert canonical submission payload.
- Dedicated route `/api/portal-form-submit` is the primary browser submit target.

## Guardrails
- Use `PORTAL_SUPABASE_SERVICE_ROLE_KEY` server-side only.
- Validate required config (`PORTAL_ORGANISATION_ID`, `PORTAL_SITE_ID`, Supabase URL/key).
- Reject publishable/anon keys for `PORTAL_SUPABASE_SERVICE_ROLE_KEY` to prevent trigger-side RLS failures.
- Return clear 4xx/5xx responses for invalid input or portal-side write failures.

## Current External Blocker
- Portal DB trigger path currently returns `column reference "submission_url" is ambiguous` on `website_form_submissions` insert, which blocks successful submission completion even with correct service-role credentials.
