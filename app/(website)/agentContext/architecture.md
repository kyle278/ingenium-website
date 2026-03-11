# Website Area Architecture

## UI Flow
- Shared navigation now emphasizes Platform, Acquisition Engine, CRM, AI Agents, Automation, Security, proof, and contact in the primary buyer path.
- Shared website header renders Portal-auth Login and Sign Up actions in the top nav on desktop and at the top of the mobile drawer.
- Contact page renders a progressive two-step client component.
- Contact page resolves active form metadata server-side and passes canonical Portal form identity into the client component.
- Step 1 collects required core fields.
- Step 2 collects qualification fields and submits payload.
- Root layout mounts a client tracking component that initializes Ingenium tracker script.

## Data Flow
- Browser tracker posts interaction events to `${PORTAL_APP_URL}/api/websites/tracking/events`.
- Browser runtime persists `visitor_id` in first-party cookie plus `localStorage`, rotates `session_id` in `sessionStorage`, and emits `session_start`, `page_view`, `form_view`, and `scroll_depth`.
- Browser gathers form values and canonical tracking/linkage values (`utm_*`, `cid`, `visitor_id`, `session_id`, `site_id`, `submission_url`, `landing_url`, `referrer`).
- Browser posts JSON payload to `/api/portal-form-submit`.
- UI shows loading, success, or error states based on API response.

## Risks
- Tracker script/load failure can reduce event coverage.
- Missing tracking normalization can break downstream attribution.
- Missing canonical linkage IDs can break event-to-form correlation.
- Missing canonical Portal form UUID can intentionally disable the form to prevent corrupted reporting.
- Unhandled submit failures can silently drop leads.
- Corrupted copy encoding can surface mojibake glyphs in visible marketing pages.
