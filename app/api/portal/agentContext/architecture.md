# Portal API Area Architecture

## Endpoint Contract
- Accept POST JSON containing:
  - `fields` (all submitted form values)
  - `tracking` (canonical UTM/CID/linkage/submission values)
- `formId` or slug path parameter for form resolution
- Primary endpoint: `/api/portal-form-submit` (Node runtime).
- Compatibility endpoint: `/api/portal/forms/[slug]/submit` delegates to shared submit handler.

## Processing Pipeline
1. Validate environment configuration.
   - Verify `PORTAL_SUPABASE_SERVICE_ROLE_KEY` is present and not publishable/anon.
2. Validate request payload.
3. Resolve `form_id` from `website_forms` by `organisation_id`, `site_id`, and slug.
4. Insert into `website_form_submissions` with:
   - top-level attribution fields
   - merged `data` payload including `visitor_id`, `session_id`, and tracking `site_id`
   - metadata diagnostics
   - server-derived ip/user-agent where available
5. Return success/error response.

## Responsibility Boundary
- Endpoint writes raw submission data only.
- Portal database triggers own CRM object lifecycle and attribution propagation.
