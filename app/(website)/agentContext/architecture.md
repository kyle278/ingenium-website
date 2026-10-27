# Website Area Architecture

## Portal-managed Blog

- `/blog` and its article, archive, search, preview and RSS routes consume Portal Blog v1 through `lib/blog/client.ts`. Server-rendered articles and metadata use the same immutable revision. Website credentials are site-scoped server-only Blog credentials; no Portal service-role/encryption/storage key is installed here.
- `app/api/ingenium/blog` verifies signed refresh identities against the current durable Portal generation. Portal independently probes actual live HTML. Dynamic no-store reads avoid stale activation pointers; backend outages return 503. Static/offline delivery is outside this adapter.
- Blog owns its path namespace before generic managed SEO redirects. Existing managed SEO routing/schema integration is preserved for other routes. Public site sitemap/RSS include current eligible articles; preview sessions use single-use exchange, HttpOnly cookies and private/noindex/no-store output, and optional analytics skips previews.
- The reference Portal site is `13f9d31e-022c-4fd6-83bb-39cd1a51a85e`. Maintain the actual API and signing contract in Portal `website-setup/blog-portal-integration.md` and use `$websiteconnect-blog` for new client installations.


## UI Flow
- Shared navigation now emphasizes Platform, Acquisition Engine, CRM, AI Agents, Automation, Security, proof, and contact in the primary buyer path.
- Shared website header renders Portal-auth Login and Sign Up actions in the top nav on desktop and at the top of the mobile drawer.
- Contact intake routes render a progressive three-step client component.
- Website brief renders a progressive five-step client component with a dedicated consent step.
- Step 1 collects required core fields.
- Later steps collect qualification and planning fields while keeping earlier step inputs mounted in the real form.
- Root layout mounts the hosted tracker script plus the retry-based production init snippet once globally.

## Data Flow
- Browser tracker posts interaction events to `https://portal.ingeniumconsulting.net/api/websites/tracking/events`.
- Hosted tracker persists `visitor_id` and `session_id`, injects canonical tracking fields into the form DOM, and emits `session_start`, `page_view`, `form_view`, and `scroll_depth`.
- Browser submits the real HTML form through the hosted tracker to `https://portal.ingeniumconsulting.net/api/websites/forms/submit`.
- UI shows loading, success, redirect, or error states based on hosted tracker form events.

## Risks
- Cross-origin/domain fragmentation can still split `visitor_id` across apex/www mismatches, preview/staging domains, or unrelated subdomains.
- Missing tracking normalization can break downstream attribution.
- Missing canonical linkage IDs can break event-to-form correlation.
- Missing or incorrect `site_id` or `data-form-slug` can disable Portal form resolution.
- Unhandled submit failures can silently drop leads.
- Corrupted copy encoding can surface mojibake glyphs in visible marketing pages.
