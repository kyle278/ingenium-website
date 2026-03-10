# Navigation Auth Actions Top Placement Plan

- Task slug: `nav-auth-actions-top`
- Complexity: `medium`
- Status: `in_progress`
- Touched areas:
  - `app/(website)` (global navigation UI and top-of-page actions)

## Objective
Move Login and Sign Up to the top of the page on all devices by updating the shared website navigation so those auth actions are visible in the header on desktop and at the top of the mobile menu.

## Constraints
- Preserve the existing dark navigation style and overall design language.
- Use the Portal app as the auth destination rather than inventing local auth pages.
- Keep current navigation items intact unless they conflict with the new auth placement.

## Risks
- Incorrect auth target URLs could create broken top-level actions.
- Mobile menu ordering could bury auth actions if they are not placed before the link list.
- Nav changes affect every public route in `app/(website)`.

## Acceptance Criteria
- Desktop header shows Login and Sign Up in the top nav area.
- Mobile menu shows Login and Sign Up at the top of the menu.
- Auth links point to the Portal app.
- Existing nav remains functional across breakpoints.

## Tasks
- [x] T1 - Inspect existing nav component and workflow prerequisites
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `none`
  - Subtasks:
    - [x] ST1.1 - Read nav component and layout wiring
    - [x] ST1.2 - Confirm a Portal-based auth destination is the reasonable target
- [ ] T2 - Implement auth actions in desktop and mobile nav
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T1`
  - Subtasks:
    - [x] ST2.1 - Add auth action config to shared nav content
    - [x] ST2.2 - Render Login and Sign Up in desktop header
    - [x] ST2.3 - Render Login and Sign Up at the top of the mobile menu
- [ ] T3 - Reconcile docs and task logs
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T2`
  - Subtasks:
    - [x] ST3.1 - Update changelog
    - [x] ST3.2 - Update website/global context if needed
    - [x] ST3.3 - Resolve communication log item
- [ ] T4 - Review diff and commit/push
  - Status: `in_progress`
  - Owner: `main-agent`
  - Dependencies: `T3`
  - Subtasks:
    - [x] ST4.1 - Review git diff/status
    - [ ] ST4.2 - Create commit
    - [ ] ST4.3 - Push branch

## Inter-Agent Communication
- Communication file: `Agents/agentCommunications/nav-auth-actions-top-comms.md`
- Open items summary:
  - [ ] Msg-001 - Add Portal-backed Login and Sign Up actions to the shared top navigation on desktop and mobile.
