# Production Form Submit RLS Fix Plan

- Task slug: `production-form-submit-rls-fix`
- Complexity: `complex`
- Status: `completed_with_external_blocker`
- Touched areas:
  - `app/api/portal` (server submit endpoint and Supabase credential guards)
  - `app/(website)` (client submit route target)
  - deployment configuration (`vercel` env vars)

## Objective
Fix production form submit failures caused by non-privileged Supabase credentials so website form submissions insert successfully and portal triggers can write downstream automation/attribution rows.

## Constraints
- Keep service-role credentials server-side only.
- Do not apply DB policy changes from this repo.
- Keep change minimal and production-safe.

## Risks
- Incomplete endpoint migration could leave clients posting to legacy route.
- Missing/mis-set deploy env vars can keep production broken despite code changes.
- Schema drift (`organisation_id` vs legacy naming) could affect inserts.

## Acceptance Criteria
- Browser submits only to local API form-submit route.
- API route enforces service-role key usage and rejects publishable/anon keys.
- Insert payload includes canonical tracking fields in both top-level columns and `data`.
- Submit no longer fails with `automation_events` RLS error when env is correct.

## Phase 1 - Investigation
- Objective: verify runtime write path, key usage, env state, and payload contract.
- Dependencies: none
- Completion criteria: evidence-backed pre-check findings produced.

### Tasks
- [x] T1 - Run mandatory pre-checks
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `none`
  - Subtasks:
    - [x] ST1.1 - Locate all write paths to `website_form_submissions`
    - [x] ST1.2 - Confirm browser network target is local API route
    - [x] ST1.3 - Validate local + deployment env variable presence/value class
    - [x] ST1.4 - Confirm payload field coverage and canonical tracking mapping

## Phase 2 - Remediation
- Objective: normalize route pattern and enforce privileged server-side insert execution.
- Dependencies: `T1`
- Completion criteria: dedicated route in place, client targeting updated, strict env guards added.

### Tasks
- [x] T2 - Add dedicated `/api/portal-form-submit` Node runtime route
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T1`
  - Subtasks:
    - [x] ST2.1 - Extract/shared submit handler logic
    - [x] ST2.2 - Add runtime + guardrails for missing/invalid service key
    - [x] ST2.3 - Keep compatibility for existing route path if needed
- [x] T3 - Update client submit target and ensure no direct Supabase client writes
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T2`
  - Subtasks:
    - [x] ST3.1 - Point contact form submit to `/api/portal-form-submit`
    - [x] ST3.2 - Re-scan for any direct browser Supabase writes

## Phase 3 - Verification and Closure
- Objective: produce reproducible verification evidence for route flow + DB effects.
- Dependencies: `T3`
- Completion criteria: test submit executed and evidence captured; docs/logs updated.

### Tasks
- [x] T4 - Run verification checks and collect evidence
  - Status: `completed_with_external_blocker`
  - Owner: `main-agent`
  - Dependencies: `T3`
  - Subtasks:
    - [x] ST4.1 - Submit test form against route and capture request/response
    - [x] ST4.2 - Confirm insertion in `website_form_submissions` (blocked by upstream trigger SQL error)
    - [x] ST4.3 - Confirm downstream `automation_events`/`crm_utm_touches` if accessible
    - [x] ST4.4 - Run lint/build
- [x] T5 - Update changelog/context/plan and summarize root cause + fix
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T4`
  - Subtasks:
    - [x] ST5.1 - Add categorized changelog entry
    - [x] ST5.2 - Reconcile touched `agentContext` files
    - [x] ST5.3 - Mark communication items resolved

## Inter-Agent Communication
- Communication file: `Agents/agentCommunications/production-form-submit-rls-fix-comms.md`
- Open items summary:
  - [x] Msg-001 - Root cause evidence indicates production service key misconfigured as publishable key.

## Outcome
- Website-side remediation completed.
- Original RLS failure path resolved by correcting key usage/validation.
- External blocker remains in portal DB trigger logic: `column reference "submission_url" is ambiguous`.
