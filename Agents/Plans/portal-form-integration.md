# Portal Form Integration Plan

- Task slug: `portal-form-integration`
- Complexity: `complex`
- Status: `completed`
- Touched areas:
  - `app/(website)` (contact form client submit flow)
  - `app/api/portal` (server-side submit route)
  - global docs/context (`agentContext`, `Agents/changeLog.md`, `README.md`)

## Objective
Connect the website contact form to Ingenium Portal using a server-side submit route that inserts into `public.website_form_submissions` with canonical tracking keys and full form payload.

## Constraints
- Keep service-role credentials server-side only.
- Preserve existing two-step contact form UX.
- Match required canonical tracking keys: `utm_*`, `cid`, `submission_url`.
- Minimize blast radius to contact flow + portal form API path.

## Risks
- Mismatch between old `account_id` naming and new required `organisation_id`.
- Missing or invalid env vars causing runtime failures.
- Form slug lookup mismatch if portal form is inactive/misnamed.

## Acceptance Criteria
- Contact form submits to website API route successfully.
- Route resolves form by provided slug/id and inserts required fields into `website_form_submissions`.
- Submitted payload contains all form fields plus canonical tracking keys.
- UTM/CID/source/submission URL are written both top-level and in `data` payload.
- Error states are surfaced in the contact form without breaking current UX.

## Phase 1 - Foundation Setup
- Objective: satisfy workflow prerequisites and task traceability before implementation.
- Dependencies: none
- Completion criteria: required context + planning artifacts exist and are scoped to touched areas.

### Tasks
- [x] T1 - Read workflow orchestration and lessons/context prerequisites
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `none`
  - Subtasks:
    - [x] ST1.1 - Read `Agents/workflowOrchestration.md`
    - [x] ST1.2 - Read available lessons/context files and identify missing mandatory files
- [x] T2 - Create required plan and communication scaffolding
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T1`
  - Subtasks:
    - [x] ST2.1 - Create plan file
    - [x] ST2.2 - Create communication log file
- [x] T3 - Create required global and area `agentContext` files
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T1`
  - Subtasks:
    - [x] ST3.1 - Create global `agentContext/context.md` and `agentContext/architecture.md`
    - [x] ST3.2 - Create nested `agentContext` for touched areas

## Phase 2 - Backend Integration
- Objective: add secure server route for portal form submission writes.
- Dependencies: `Phase 1`
- Completion criteria: route validates payload, resolves form id, writes submission row with required fields.

### Tasks
- [x] T4 - Implement `app/api/portal/forms/[slug]/submit/route.ts`
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T3`
  - Subtasks:
    - [x] ST4.1 - Define request contract + tracking normalization
    - [x] ST4.2 - Resolve form via `website_forms` by slug or optional form id
    - [x] ST4.3 - Insert `website_form_submissions` row with canonical metadata + diagnostics
    - [x] ST4.4 - Add robust error handling for missing config/form and DB errors

## Phase 3 - Frontend Wiring
- Objective: submit contact form data + tracking from browser to backend route.
- Dependencies: `T4`
- Completion criteria: two-step form calls new route and handles loading/success/error states.

### Tasks
- [x] T5 - Update `app/(website)/contact/ContactForm.tsx` submit flow
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T4`
  - Subtasks:
    - [x] ST5.1 - Capture canonical tracking values from URL/referrer
    - [x] ST5.2 - Build payload with all form fields + route slug
    - [x] ST5.3 - Handle network loading and failure states without breaking current UX

## Phase 4 - Verification and Documentation
- Objective: validate behavior and reconcile documentation/context/changelog.
- Dependencies: `T5`
- Completion criteria: lint/type checks run, docs updated, changelog entry added.

### Tasks
- [x] T6 - Verify and document
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T5`
  - Subtasks:
    - [x] ST6.1 - Run lint/type checks for affected scope
    - [x] ST6.2 - Update `agentContext` files to current state
    - [x] ST6.3 - Add changelog entry with required categories
    - [x] ST6.4 - Update plan + communication log final statuses

## Inter-Agent Communication
- Communication file: `Agents/agentCommunications/portal-form-integration-comms.md`
- Open items summary:
  - [x] Msg-001 - Main agent implementation start acknowledged; no subagent dependencies.
