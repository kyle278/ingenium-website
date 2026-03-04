# Ingenium Website Tracking Integration Plan

- Task slug: `ingenium-website-tracking-integration`
- Complexity: `complex`
- Status: `completed`
- Touched areas:
  - `app` (global layout tracker mount)
  - `app/(website)` (form submit payload linkage)
  - `app/api/portal` (submission linkage persistence)

## Objective
Implement Ingenium website tracking so browser interactions are sent to the Ingenium Portal tracking ingestion endpoint immediately, while preserving secure server-side form submission and linking form submissions to canonical visitor/session/site IDs.

## Constraints
- Do not expose service-role Supabase keys in browser code.
- Browser tracking endpoint must be `${NEXT_PUBLIC_INGENIUM_PORTAL_APP_URL}/api/websites/tracking/events`.
- Tracker script source must be `${NEXT_PUBLIC_INGENIUM_PORTAL_APP_URL}/ingenium-tracker.js`.
- Canonical IDs must be used consistently: `visitor_id`, `session_id`, `site_id`.
- Immediate event delivery must call `window.IngeniumTracker.flush()` after `track(...)`.

## Risks
- Missing env values can silently disable tracking at runtime.
- Event bindings can double-fire if global binding guard is missing.
- Form linkage fields can be dropped if server payload mapping is incomplete.
- Tracker integration in root layout can regress hydration if client-only boundaries are incorrect.

## Acceptance Criteria
- Global tracker component loads script and initializes tracker with required endpoint/site ID.
- Interaction events are tracked and flushed immediately after each `track(...)`.
- Contact form submit includes canonical tracking payload with visitor/session/site linkage.
- Server submit handler preserves linkage values in stored submission payload/metadata.
- Lint and type checks pass for touched scope.

## Phase 1 - Setup and Baseline
- Objective: establish execution/traceability artifacts and confirm integration points.
- Dependencies: none
- Completion criteria: plan/comms created and target files identified.

### Tasks
- [x] T1 - Create task plan and communication file
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `none`
  - Subtasks:
    - [x] ST1.1 - Create plan in `Agents/Plans`
    - [x] ST1.2 - Create communication log in `Agents/agentCommunications`
- [x] T2 - Inspect root layout, contact form submit flow, and portal submit handler
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T1`
  - Subtasks:
    - [x] ST2.1 - Confirm global layout mount location
    - [x] ST2.2 - Confirm current form tracking payload shape
    - [x] ST2.3 - Confirm server payload mapping behavior

## Phase 2 - Tracking Runtime Integration
- Objective: add global tracking runtime with required script/init behavior.
- Dependencies: `T2`
- Completion criteria: tracker component exists and is mounted in root layout.

### Tasks
- [x] T3 - Create `app/components/IngeniumTracking.tsx` using required implementation
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T2`
  - Subtasks:
    - [x] ST3.1 - Add tracker globals, helpers, and event bindings
    - [x] ST3.2 - Initialize tracker with required endpoint and options
    - [x] ST3.3 - Ensure immediate `track + flush` behavior
- [x] T4 - Mount global tracking component in `app/layout.tsx`
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T3`
  - Subtasks:
    - [x] ST4.1 - Import tracker component
    - [x] ST4.2 - Render component inside `<body>`

## Phase 3 - Form Linkage Integration
- Objective: add canonical tracking payload helper and preserve linkage IDs through submission persistence.
- Dependencies: `T4`
- Completion criteria: form submits include canonical linkage IDs and server stores them in payload metadata.

### Tasks
- [x] T5 - Add reusable tracking payload helper
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T4`
  - Subtasks:
    - [x] ST5.1 - Create `lib/ingeniumTrackingPayload.ts`
    - [x] ST5.2 - Include `visitor_id`, `session_id`, and `site_id`
- [x] T6 - Update contact form submit flow to use helper
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T5`
  - Subtasks:
    - [x] ST6.1 - Remove duplicated inline tracking helper
    - [x] ST6.2 - Use shared helper in submit body
- [x] T7 - Preserve linkage IDs in portal submit handler payload/metadata
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T6`
  - Subtasks:
    - [x] ST7.1 - Read canonical `visitor_id`, `session_id`, `site_id`
    - [x] ST7.2 - Persist values into `data` and `metadata`

## Phase 4 - Verification and Documentation
- Objective: validate quality gates and reconcile mandatory docs.
- Dependencies: `T7`
- Completion criteria: lint/typecheck pass and all required logs/docs updated.

### Tasks
- [x] T8 - Run validation checks
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T7`
  - Subtasks:
    - [x] ST8.1 - Run lint
    - [x] ST8.2 - Run TypeScript no-emit check
    - [x] ST8.3 - Review diff for scope control
- [x] T9 - Update mandatory documentation
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T8`
  - Subtasks:
    - [x] ST9.1 - Update `Agents/changeLog.md`
    - [x] ST9.2 - Reconcile global `agentContext` files
    - [x] ST9.3 - Reconcile touched area `agentContext` files
    - [x] ST9.4 - Resolve communication log items

## Inter-Agent Communication
- Communication file: `Agents/agentCommunications/ingenium-website-tracking-integration-comms.md`
- Open items summary:
  - [x] Msg-001 - Implement tracking runtime + form linkage with immediate event flush.

## Outcome
- Tracking runtime integration completed and mounted globally.
- Canonical linkage payload helper implemented and wired into form submit flow.
- Server submit handling now preserves canonical linkage IDs for form correlation.
