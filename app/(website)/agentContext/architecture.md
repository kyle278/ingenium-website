# Website Area Architecture

## UI Flow
- Contact page renders a progressive two-step client component.
- Step 1 collects required core fields.
- Step 2 collects qualification fields and submits payload.

## Data Flow
- Browser gathers form values and URL/referrer tracking values.
- Browser posts JSON payload to `/api/portal-form-submit`.
- UI shows loading, success, or error states based on API response.

## Risks
- Missing tracking normalization can break downstream attribution.
- Unhandled submit failures can silently drop leads.
- Corrupted copy encoding can surface mojibake glyphs in visible marketing pages.
