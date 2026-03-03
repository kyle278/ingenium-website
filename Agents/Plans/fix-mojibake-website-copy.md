# Fix Mojibake Website Copy Plan

- Task slug: `fix-mojibake-website-copy`
- Complexity: `complex`
- Status: `completed`
- Touched areas:
  - `app/(website)` (visible marketing copy rendering)
  - global docs (`Agents/changeLog.md`)

## Objective
Remove corrupted mojibake characters (for example broken dash and separator sequences) from website-rendered copy and replace them with clean, readable punctuation across all affected pages.

## Constraints
- Fix only text corruption; do not alter page structure or interaction behavior.
- Preserve copy meaning while normalizing punctuation.
- Keep blast radius limited to affected website content files.

## Risks
- Missing an occurrence leaves visible corruption in production.
- Over-aggressive replacement could alter intentional technical symbols.
- Encoding drift can reintroduce corruption if mixed punctuation styles remain.

## Acceptance Criteria
- No user-visible mojibake sequences remain in route copy.
- A global scan for known corruption patterns in `app/(website)` returns no matches.
- Build and lint pass after changes.

## Phase 1 - Setup and Detection
- Objective: establish traceability and identify exact corruption scope.
- Dependencies: none
- Completion criteria: plan/comms created and full scan results captured.

### Tasks
- [x] T1 - Initialize task artifacts
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `none`
  - Subtasks:
    - [x] ST1.1 - Create plan file
    - [x] ST1.2 - Create communication log
- [x] T2 - Scan all website files for mojibake patterns
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T1`
  - Subtasks:
    - [x] ST2.1 - Search for corrupted character and replacement-char occurrences
    - [x] ST2.2 - Build replacement strategy by pattern

## Phase 2 - Remediation
- Objective: patch all corrupted text sequences with clean punctuation.
- Dependencies: `T2`
- Completion criteria: affected files patched and rescanned clean.

### Tasks
- [x] T3 - Apply targeted replacements across `app/(website)` pages
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T2`
  - Subtasks:
    - [x] ST3.1 - Replace corrupted dash/bullet/arrow sequences in visible copy
    - [x] ST3.2 - Normalize corrupted decorative comment separators
    - [x] ST3.3 - Re-scan and patch residual outliers

## Phase 3 - Verification and Documentation
- Objective: validate behavior and update required logs.
- Dependencies: `T3`
- Completion criteria: checks pass and changelog entry added.

### Tasks
- [x] T4 - Verify + document
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T3`
  - Subtasks:
    - [x] ST4.1 - Run lint/build
    - [x] ST4.2 - Update changelog with this fix
    - [x] ST4.3 - Update plan/comms statuses

## Inter-Agent Communication
- Communication file: `Agents/agentCommunications/fix-mojibake-website-copy-comms.md`
- Open items summary:
  - [x] Msg-001 - Main-agent started mojibake detection and remediation workflow.
