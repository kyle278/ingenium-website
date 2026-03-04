# Website Area Architecture

## UI Flow
- Contact page renders a progressive two-step client component.
- Step 1 collects required core fields.
- Step 2 collects qualification fields and submits payload.
- Root layout mounts a client tracking component that initializes Ingenium tracker script.

## Data Flow
- Browser tracker posts interaction events to `${NEXT_PUBLIC_INGENIUM_PORTAL_APP_URL}/api/websites/tracking/events`.
- Custom events are sent via `track(...)` followed by immediate `flush()`.
- Browser gathers form values and canonical tracking/linkage values (`utm_*`, `cid`, `visitor_id`, `session_id`, `site_id`, `submission_url`, `referrer`).
- Browser posts JSON payload to `/api/portal-form-submit`.
- UI shows loading, success, or error states based on API response.

## Risks
- Tracker script/load failure can reduce event coverage.
- Missing tracking normalization can break downstream attribution.
- Missing canonical linkage IDs can break event-to-form correlation.
- Unhandled submit failures can silently drop leads.
- Corrupted copy encoding can surface mojibake glyphs in visible marketing pages.
