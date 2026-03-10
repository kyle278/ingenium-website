# Portal Production Website Integration Plan

- Task slug: `portal-production-website-integration`
- Complexity: `complex`
- Status: `in_progress`
- Touched areas:
  - `app` (global tracker bootstrap and runtime mount)
  - `app/(website)` (form wiring, canonical form IDs, browser tracking capture)
  - `app/api/portal` (server-side form resolution and submission persistence)
  - `lib` / `src` (shared config, typing, helper modules)
  - `supabase` (Portal form setup SQL artifacts)

## Objective
Replace the current partial Portal integration with a production-grade integration that preserves durable anonymous identity, emits the required analytics events, resolves canonical Portal form UUIDs, and writes form submissions to Portal Supabase with the exact required payload contract.

## Constraints
- Use canonical keys exactly: `organisation_id`, `site_id`, `form_id`, `visitor_id`, `session_id`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `cid`, `submission_url`.
- Do not expose `PORTAL_SUPABASE_SERVICE_ROLE_KEY` to browser code.
- Keep the browser submit path server-route-only.
- Do not use custom `form_submit` events as submission source of truth.
- Fail explicitly if a canonical Portal form UUID cannot be resolved.
- Keep changes reusable and centralized: one config module, one tracker helper, one form submit helper.

## Risks
- Existing runtime behavior may double-track if legacy tracker bindings are not removed fully.
- Incorrect cookie domain handling can fragment `visitor_id` across apex and `www`.
- Route-change tracking can duplicate `page_view` or fail to reset page-scoped form/scroll state if lifecycle hooks are incomplete.
- Portal insert payload mismatches can break Website > Reports form metrics or CRM identity backfill.
- Missing or placeholder form UUID configuration can block submissions by design.

## Acceptance Criteria
- `visitor_id` persists via first-party cookie plus `localStorage` restoration.
- `session_id` is session-scoped, stored in `sessionStorage`, and rotates after inactivity.
- `session_start`, `page_view`, `form_view`, and `scroll_depth` events emit with required triggers and canonical payload shape.
- Page-scoped tracking state resets on full loads and SPA route changes.
- Each website form uses the real Portal `website_forms.id` UUID in `data-form-id`.
- Server submit route resolves active form by `organisation_id`, `site_id`, and slug, then inserts exactly one `website_form_submissions` row with required columns and payload contents.
- Browser code never creates CRM entities directly and never exposes the service-role key.
- SQL upsert/query artifacts exist for each website form used.
- Lint, typecheck, and build pass.

## Phase 1 - Audit and Replacement Boundary
- Objective: identify legacy integration pieces and define the replacement surface cleanly.
- Dependencies: none
- Completion criteria: all old env names, tracker behaviors, and form ID mismatches are cataloged and targeted.

### Tasks
- [x] T1 - Read workflow prerequisites and inspect current integration
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `none`
  - Subtasks:
    - [x] ST1.1 - Read workflow, lessons, global context, area context, and design language
    - [x] ST1.2 - Inspect current tracker bootstrap, contact form, and portal submit handler
    - [x] ST1.3 - Identify mismatches against the required contract
- [x] T2 - Create plan and communication artifacts
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T1`
  - Subtasks:
    - [x] ST2.1 - Create plan file in `Agents/Plans`
    - [x] ST2.2 - Create communication log in `Agents/agentCommunications`

## Phase 2 - Core Config and Tracking Runtime
- Objective: centralize Portal configuration and replace the browser tracker/bootstrap implementation.
- Dependencies: `T1`
- Completion criteria: tracker uses centralized config, durable identity, required event triggers, and page-scoped reset logic.

### Tasks
- [ ] T3 - Create centralized Portal integration config/types
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T2`
  - Subtasks:
    - [x] ST3.1 - Add shared config module for required env values
    - [x] ST3.2 - Add tracker/submission type definitions with canonical keys
    - [x] ST3.3 - Remove legacy env-name coupling from existing integration files
- [ ] T4 - Replace browser tracking runtime with contract-compliant orchestration
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T3`
  - Subtasks:
    - [x] ST4.1 - Implement durable `visitor_id` cookie + `localStorage` sync
    - [x] ST4.2 - Implement `session_id` inactivity rotation in `sessionStorage`
    - [x] ST4.3 - Emit `session_start` and `page_view` for initial load and route changes
    - [x] ST4.4 - Emit `form_view` once per form per page view using canonical `data-form-id`
    - [x] ST4.5 - Emit `scroll_depth` at 10% increments and reset per page
    - [x] ST4.6 - Ensure event payloads include unique `client_event_id` and required page context

## Phase 3 - Form Contract and Server Submission Path
- Objective: enforce canonical Portal form identity and exact submission persistence contract.
- Dependencies: `T4`
- Completion criteria: browser form code is thin, canonical Portal form UUIDs are required, and server writes exact submission rows.

### Tasks
- [ ] T5 - Add reusable form metadata/form UUID mapping and browser submit helper
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T4`
  - Subtasks:
    - [x] ST5.1 - Define canonical website form mapping by slug and Portal UUID
    - [x] ST5.2 - Update contact form to use canonical `data-form-id`
    - [x] ST5.3 - Capture canonical tracking values and enforce pending-submit dedupe
- [ ] T6 - Rework server-side submit handler to exact Portal contract
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T5`
  - Subtasks:
    - [x] ST6.1 - Resolve active form by `organisation_id`, `site_id`, and slug
    - [x] ST6.2 - Insert required submission columns including tracking visitor/session IDs
    - [x] ST6.3 - Populate `data` and `metadata` JSON with exact canonical keys
    - [x] ST6.4 - Add duplicate submission protection strategy for rapid retries
    - [x] ST6.5 - Remove or adapt legacy routes/helpers that no longer match the contract

## Phase 4 - SQL, Docs, and Verification
- Objective: provide Portal setup artifacts, reconcile docs/context, and prove the implementation works.
- Dependencies: `T6`
- Completion criteria: SQL artifacts exist, contexts/changelog updated, and verification passes.

### Tasks
- [ ] T7 - Add idempotent Portal `website_forms` SQL artifacts
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T6`
  - Subtasks:
    - [x] ST7.1 - Add upsert SQL for each website form used
    - [x] ST7.2 - Add query to retrieve resulting form UUID
    - [x] ST7.3 - Record exact UUID/slug mapping used by website code
- [ ] T8 - Reconcile mandatory docs and context
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T7`
  - Subtasks:
    - [x] ST8.1 - Update `README.md`
    - [x] ST8.2 - Update global `agentContext` files
    - [x] ST8.3 - Update touched area `agentContext` files
    - [x] ST8.4 - Add categorized changelog entry
    - [x] ST8.5 - Resolve communication log items
- [ ] T9 - Run verification
  - Status: `in_progress`
  - Owner: `main-agent`
  - Dependencies: `T8`
  - Subtasks:
    - [ ] ST9.1 - Run lint
    - [ ] ST9.2 - Run typecheck/build
    - [x] ST9.3 - Review diffs and collect deliverable examples
  - Verification note:
    - `npm`, `npx`, and `node` are unavailable in the current shell, so automated lint/typecheck/build could not be executed in this environment.

## Inter-Agent Communication
- Communication file: `Agents/agentCommunications/portal-production-website-integration-comms.md`
- Open items summary:
  - [ ] Msg-001 - Legacy tracker/bootstrap and submission path need replacement with canonical Portal contract.
  - [ ] Msg-002 - Final implementation must include Portal form SQL and explicit UUID/slug mapping.

## Persona Validation
- UI engineer sign-off expectation: acceptable if contact form UX remains stable while hidden tracking attributes/state are added cleanly.
- Backend engineer sign-off expectation: acceptable if submit route uses centralized config, strict payload validation, and exact Portal column mapping.
- Security engineer sign-off expectation: acceptable if service-role key remains server-only and no direct CRM writes occur from browser code.
