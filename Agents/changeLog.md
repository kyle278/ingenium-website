# Changelog

This file is mandatory for all tasks.

## Entry Template
- Date:
- Task:
- Categories: `BUG FIX`, `IMPROVEMENT`, `UI CHANGE`, `UX CHANGE`, `FUNCTIONAL CHANGE`, `SECURITY`, `PERFORMANCE`, `DOCUMENTATION`, `PROCESS`
- Summary:
- Impact:
- Key files:
- Review status (only for changelog review mode): `REVIEWED - FIX IMPLEMENTED` | `REVIEWED - PLAN ONLY` | `REVIEWED - NO ISSUE FOUND`
- Review date (only for changelog review mode):
- Review plan (only for changelog review mode): `Agents/Plans/<plan-file>.md`
- Review notes (only for changelog review mode):

---

- Date: 2026-03-03
- Task: Remove portal-driven content wiring, restore static live copy, and add team page
- Categories: `IMPROVEMENT`, `UI CHANGE`, `UX CHANGE`, `FUNCTIONAL CHANGE`, `DOCUMENTATION`
- Summary:
  - Removed website runtime dependencies on Ingenium portal content blocks/forms.
  - Converted marketing routes and layout to static in-repo content values.
  - Added a new `/team` page with member cards, email links, and image placeholders.
  - Replaced portal-based contact flow with a static progressive contact form.
  - Updated design and project docs to match the new static architecture.
- Impact:
  - Website copy now renders directly from code with no portal fetch dependency.
  - Navigation/footer include the new Team route.
  - Contact page remains usable and aligned to the design language without portal configuration.
- Key files:
  - `app/(website)/layout.tsx`
  - `app/(website)/*/page.tsx`
  - `app/(website)/contact/ContactForm.tsx`
  - `app/(website)/team/page.tsx`
  - `app/(website)/components/SiteNav.tsx`
  - `app/(website)/components/SiteFooter.tsx`
  - `app/(website)/components/RouteStructuredData.tsx`
  - `AGENTS/DesignLanguage.md`
  - `README.md`
  - Removed portal files under `src/lib/` and `src/portalconnect.ts`

---

- Date: 2026-03-03
- Task: Reconnect contact form submissions to Ingenium Portal via server-side route
- Categories: `FUNCTIONAL CHANGE`, `SECURITY`, `IMPROVEMENT`, `DOCUMENTATION`, `PROCESS`
- Summary:
  - Added a secure portal submission endpoint at `app/api/portal/forms/[slug]/submit/route.ts`.
  - Updated contact form submission flow to post all fields plus canonical tracking data (`utm_*`, `cid`, `submission_url`) to the new endpoint.
  - Added required workflow artifacts: plan file, communication log, and global/area `agentContext` files.
  - Updated project documentation and local env template values for portal form integration.
- Impact:
  - Contact form submissions now create portal-ingest rows through the website server, keeping service-role access off the client.
  - Payload shape now aligns with portal trigger expectations for attribution and downstream CRM processing.
  - Team has explicit configuration/docs/context files for maintaining this integration path.
- Key files:
  - `app/api/portal/forms/[slug]/submit/route.ts`
  - `app/(website)/contact/ContactForm.tsx`
  - `.env.local`
  - `README.md`
  - `agentContext/context.md`
  - `agentContext/architecture.md`
  - `app/(website)/agentContext/context.md`
  - `app/(website)/agentContext/architecture.md`
  - `app/api/portal/agentContext/context.md`
  - `app/api/portal/agentContext/architecture.md`
  - `Agents/Plans/portal-form-integration.md`
  - `Agents/agentCommunications/portal-form-integration-comms.md`

---

- Date: 2026-03-03
- Task: Correct invalid file path references in workflow orchestration
- Categories: `DOCUMENTATION`, `PROCESS`
- Summary:
  - Updated `Agents/workflowOrchestration.md` to use existing repository paths.
  - Corrected lessons, design language, changelog, and nested area `agentContext` path references.
- Impact:
  - Mandatory workflow setup and sign-off steps now reference valid files and folders.
  - Reduced risk of agent setup failures caused by broken path instructions.
- Key files:
  - `Agents/workflowOrchestration.md`

---

- Date: 2026-03-03
- Task: Fix mojibake characters across website copy
- Categories: `BUG FIX`, `UI CHANGE`, `UX CHANGE`, `IMPROVEMENT`, `PROCESS`
- Summary:
  - Scanned website route files for mojibake corruption patterns shown in screenshots.
  - Replaced corrupted character sequences across marketing copy (for example broken dash, separator, and arrow text).
  - Normalized impacted comment separators and reassurances to clean ASCII-safe punctuation.
- Impact:
  - Website text now renders cleanly without random replacement glyphs in hero metrics, timelines, CTA reassurance rows, and FAQ copy.
  - Content is now consistent and robust against the specific encoding artifacts that previously leaked into the UI.
- Key files:
  - `app/(website)/page.tsx`
  - `app/(website)/websites/page.tsx`
  - `app/(website)/case-studies/page.tsx`
  - `app/(website)/departments/page.tsx`
  - `app/(website)/platform/page.tsx`
  - `app/(website)/crm/page.tsx`
  - `app/(website)/security/page.tsx`
  - `app/(website)/automations/page.tsx`
  - `Agents/Plans/fix-mojibake-website-copy.md`

---

- Date: 2026-03-03
- Task: Harden portal form submit routing and service-key validation for production incident
- Categories: `BUG FIX`, `SECURITY`, `FUNCTIONAL CHANGE`, `IMPROVEMENT`, `PROCESS`
- Summary:
  - Added dedicated Node API route `/api/portal-form-submit` for website form submissions.
  - Refactored portal submit logic into shared server-only handler with strict env validation.
  - Added guard that rejects publishable/anon credentials in `PORTAL_SUPABASE_SERVICE_ROLE_KEY`.
  - Updated contact form client submit target to only call local API route.
  - Updated production/preview/development Vercel env var `PORTAL_SUPABASE_SERVICE_ROLE_KEY` away from publishable key.
- Impact:
  - Browser submit flow is now server-route-only and no longer depends on route-specific slug path.
  - Misconfigured service keys now fail fast with clear config error instead of portal trigger RLS failures.
  - Production incident moved past original RLS failure; current blocker is an upstream portal trigger SQL ambiguity (`submission_url`) outside this repo.
- Key files:
  - `app/api/portal-form-submit/route.ts`
  - `app/api/portal/_lib/formSubmit.ts`
  - `app/api/portal/forms/[slug]/submit/route.ts`
  - `app/(website)/contact/ContactForm.tsx`
  - `app/api/portal/agentContext/context.md`
  - `app/api/portal/agentContext/architecture.md`
  - `Agents/Plans/production-form-submit-rls-fix.md`
