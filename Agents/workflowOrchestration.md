## Workflow Orchestration

This file is the mandatory operating workflow for every task in this repository.

## 1. Mandatory Task Start
Before doing implementation work:
1. Read this file.
2. Read `Agents/Tasks/lessons.md`.
3. For ANY AND ALL UI or UX updates, read `Agents/design-language.md` before implementation and keep it as an active reference while designing and coding.
4. Read global system context files:
   - `agentContext/context.md`
   - `agentContext/architecture.md`
5. If the global `agentContext` folder or either global file is missing, create both files before implementation.
6. Identify the system area(s) you will touch (for example CRM, Websites, Marketing, Billing).
7. For each touched area, locate that area's nested `agentContext` folder and read both files before coding:
   - `agentContext/context.md`
   - `agentContext/architecture.md`
8. If a touched area does not yet have a nested `agentContext` folder, create it with both required files before implementation in that area.
9. State task objective, constraints, risks, and acceptance criteria.
10. Classify task complexity using the rubric below.
11. If working as `subagent:<name>`, read the task communication file in `Agents/agentCommunications/` and acknowledge any open items related to your task before coding.

If this startup sequence is skipped, pause and do it immediately.

## 2. Complexity Rubric (Plan Mode Trigger)
Use plan mode when any of the following are true:
- More than 1 file changed.
- Any API, database, migration, auth, or permissions change.
- Any user-visible behavior or UI flow change.
- Any external integration or background processing change.
- Task has unclear requirements or non-trivial risk.

Simple mode is allowed only for isolated, low-risk, single-scope edits.

## 3. Planning and Execution
For medium/complex tasks:
1. Create a plan file in `Agents/Plans/` named after the task.
2. Create a communication file in `Agents/agentCommunications/` named `<task-slug>-comms.md`.
3. For `complex` tasks, build the plan as phase-by-phase execution:
   - Each phase must include: objective, dependencies, and completion criteria.
   - Each phase must include tasks and task-level subtasks in checklist format.
4. For each task in the plan, include explicit metadata:
   - `Status:` `pending`, `in_progress`, or `completed`
   - `Owner:` `main-agent` or `subagent:<name>`
   - `Dependencies:` task IDs and/or phase IDs, or `none`
5. Subagent assignment rule:
   - Use subagents when specialization or parallel work is useful.
   - One subagent can own one task only for that plan.
   - If more work is needed, create another task and assign a different subagent.
6. Add an `Inter-Agent Communication` section in the plan that references the communication file path and summarizes open items.
   - The communication file in `Agents/agentCommunications/` is the single source of truth for all blockers/handoffs/questions/approvals.
   - Every subagent must read the communication file before starting work and before marking their task `completed`.
   - Every request directed to a subagent must receive a log response from that subagent.
   - Approvals must be explicit log responses: `APPROVED` or `CHANGES REQUESTED` with brief rationale.
7. Validate the plan with domain personas before coding:
   - UI change: "Would a UI engineer sign this off?"
   - API/data change: "Would a backend engineer sign this off?"
   - Security-sensitive change: "Would a security engineer sign this off?"
8. Execute in small increments and keep plan checklists, communication file entries, and statuses updated as work progresses.

Required complex-plan skeleton:

```md
## Phase 1 - <name>
- Objective:
- Dependencies:
- Completion criteria:

### Tasks
- [ ] T1 - <task description>
  - Status: `pending`
  - Owner: `subagent:<name>` or `main-agent`
  - Dependencies: `<none | T# | Phase #>`
  - Subtasks:
    - [ ] ST1.1 - ...
    - [ ] ST1.2 - ...

## Inter-Agent Communication
- Communication file: `Agents/agentCommunications/<task-slug>-comms.md`
- Open items summary:
  - [ ] Msg-001 - `<short summary>`
  - [ ] Msg-002 - `<short summary>`
```

Required communication-file skeleton:

```md
# <Task Name> Inter-Agent Communication Log

- Task slug: `<task-slug>`
- Plan file: `Agents/Plans/<plan-file>.md`

## Messages
- [ ] Msg-001 | From: `<agent>` | To: `<agent>` | Related: `T#`
  - Type: `blocker | handoff | clarification | approval_request | approval_response`
  - State: `open | acknowledged | resolved`
  - Message:
  - Required action:
  - Response:
  - Approval: `APPROVED | CHANGES REQUESTED | N/A`
  - Resolution:
```

## 4. Research and Parallelization
Keep main context clean and focused.
- Offload research/exploration/parallel analysis to isolated sub-tasks.
- One sub-task per concern and one owner per sub-task.
- Aggregate results into clear decisions and tradeoffs.

## 5. Engineering Quality Rules
- Fix root cause, not symptoms.
- Prefer elegant and maintainable implementations over patchy fixes.
- Do not over-engineer simple tasks.
- Keep blast radius minimal: change only what is necessary.
- Preserve existing behavior unless change is explicitly required.

UI/UX enforcement:
- For ANY AND ALL UI or UX updates, `Agents/design-language.md` is mandatory pre-read before implementation.
- UI decisions (layout, typography, spacing, color, component behavior) must be referenced against `Agents/design-language.md` unless the user explicitly requests an exception.
- If an exception is requested, document the intentional deviation in plan/handoff notes.

For non-trivial work, always ask:
- "Is there a simpler and more elegant way?"
- "Would a staff engineer approve this implementation?"

## 6. Autonomous Bug Fixing
When given a bug:
- Reproduce it.
- Identify evidence (logs, traces, failing tests, behavior diffs).
- Implement fix and verify.
- Minimize user back-and-forth unless requirements are ambiguous.

## 7. Verification Before Sign-Off (Definition of Done)
Never mark complete without proof.

Required checks (as applicable):
1. Lint passes for touched files.
2. Type/build checks pass for affected scope.
3. Relevant tests pass (existing and new where needed).
4. Manual validation of changed behavior/UI flow.
5. Regression check for neighboring behavior.
6. Diff review confirms only intended changes.
7. `Agents/Changelog.md` includes a categorized entry for every implemented change in the task.
8. Communication file review confirms all directed requests were answered and required approvals were recorded.
9. For each touched system area, nested `agentContext/context.md` and `agentContext/architecture.md` were reviewed and updated to current state (not append-only).
10. Global `agentContext/context.md` and `agentContext/architecture.md` were reviewed and updated to current state (not append-only).
11. For UI/UX tasks, `Agents/design-language.md` was read before implementation and the delivered UI/UX changes were validated against it (or explicit user-requested exceptions were documented).

If any check cannot be run, explicitly state:
- what was skipped,
- why,
- residual risk.

## 8. Change Logging (Mandatory)
All changes must be logged in `Agents/Changelog.md`.

Scope rule:
- Log every change, including functional, UI, UX, API, data, docs, and process updates.
- No exceptions: every merged or shipped task must have a changelog entry.

Category rule:
- Each entry must include one or more explicit categories from this list:
  - `BUG FIX`
  - `IMPROVEMENT`
  - `UI CHANGE`
  - `UX CHANGE`
  - `FUNCTIONAL CHANGE`
  - `SECURITY`
  - `PERFORMANCE`
  - `DOCUMENTATION`
  - `PROCESS`

Entry quality rule:
- Describe what changed in plain language.
- Describe impact (user-visible and/or system behavior).
- Reference key files touched.

Review tracking rule (for changelog review mode):
- Update the original changelog task entry in-place after review; do not create a duplicate task entry.
- Add explicit review metadata to that entry:
  - `Review status:` `REVIEWED - FIX IMPLEMENTED` or `REVIEWED - PLAN ONLY` or `REVIEWED - NO ISSUE FOUND`
  - `Review date:` `YYYY-MM-DD`
  - `Review plan:` `Agents/Plans/<plan-file>.md`
  - `Review notes:` concise evidence-based outcome summary

## 9. Completion and Handoff
Before closing a task:
1. Provide a clear summary of what changed.
2. Explain user-visible and functional impact.
3. Report verification evidence.
4. Confirm all relevant communication file items are resolved, including any required approvals.
5. Confirm changelog entry was added with clear categories.
6. Confirm touched area nested `agentContext` files were reconciled to current state and stale content was removed.
7. Confirm global `agentContext` files were reconciled to current state and stale content was removed.
8. Ask whether to commit/push or make further amendments.

## 10. Self-Improvement Loop (Mandatory)
After any user correction, mistake, rollback, or missed requirement:
1. Add an entry to `Agents/Tasks/lessons.md`.
2. Convert the lesson into a concrete prevention rule.
3. Apply that rule on the next similar task.

Lesson entry format:
- Date:
- Task:
- What went wrong:
- Root cause:
- Prevention rule:
- Verification step added:

## 11. KPIs (Track Improvement)
Track and improve:
- First-pass success rate.
- Number of user corrections per task.
- Rework count after "done".
- Escaped defects/regressions.
- Verification completion rate.

Goal: correction and regression rates trend down over time.

## 12. Changelog Review Mode (User-Triggered, One Task Only)
This mode is used only when the user explicitly requests review of a specific task from `Agents/Changelog.md`.

Trigger rule:
- User must provide the exact task name from `Agents/Changelog.md`.
- Process exactly one task per run.
- If multiple entries match the same task name, require disambiguation by date or commit hash before implementation.

Scope rule:
- Investigation starts from the selected changelog entry but must validate against real code/tests/behavior.
- Changelog text alone is never treated as proof.

Mandatory outputs:
1. Create a dedicated plan file in `Agents/Plans/` before implementation.
2. Update the original changelog entry with review metadata after investigation.

## 13. Investigation Standard for Changelog Tasks
For the selected changelog task, evaluate potential issues with concrete evidence.

Potential issue definition (must be evidence-backed):
- Behavior in code does not match changelog claim.
- Reproducible bug/regression exists in changed flow.
- Security, permissions, data integrity, or performance risk is present in actual implementation.
- Test coverage is missing for critical behavior and creates material regression risk.

Required investigation steps:
1. Restate objective, constraints, risks, and acceptance criteria.
2. Build/update the task plan file using phase/task/subtask checklists for complex scope, with statuses (`pending`, `in_progress`, `completed`) and clear owner/dependency mapping.
3. Inspect key files referenced in changelog and adjacent behavior.
4. Reproduce issue or collect objective evidence (tests, logs, traces, behavior diffs).
5. Decide outcome:
   - fix now,
   - plan-only (if blocked/high-risk/deferred),
   - no issue found.
6. Update changelog review metadata and report verification evidence.

Stop rule:
- If no objective issue is found, do not manufacture changes.
- Mark entry as `REVIEWED - NO ISSUE FOUND` with brief rationale and evidence source.

## 14. Planning Requirement for Changelog Reviews
Even for small fixes, changelog review mode always requires a plan file.

Plan file rule:
- Location: `Agents/Plans/`
- Naming: `changelog-review-<task-slug>-YYYYMMDD.md`
- Minimum content:
  - task reference (exact changelog task name),
  - objective/constraints/risks/acceptance criteria,
  - phase/task/subtask checklist with status markers (`pending`, `in_progress`, `completed`) for complex scope,
  - explicit task owners and dependencies for complex scope,
  - communication file path in `Agents/agentCommunications/` and open-item summary in the plan when multiple agents are involved,
  - verification checklist,
  - final outcome (`FIX IMPLEMENTED`, `PLAN ONLY`, or `NO ISSUE FOUND`).

## 15. Anti-Rework and Traceability Rules
To prevent repeated review of the same task:
- Always check existing review metadata on the selected changelog entry before starting.
- If already reviewed, only re-open with explicit user instruction.
- Keep review notes concise and factual so future passes can determine prior decisions quickly.

## 16. Global and Area Agent Context Contract (Mandatory)
The repository must maintain:
- Global system folder: `agentContext/`
- Nested area folders: `app/app/<area>/agentContext/`

Global folder files:
- `context.md`: full-system operational context and cross-domain map.
- `architecture.md`: full-system architecture, boundaries, and impact map.

Each nested system area must maintain:
- `context.md`: operational context, scope, guardrails, and current working assumptions.
- `architecture.md`: current architecture, data/auth flow, and change-impact map.

Rules:
1. Always read both global files and both nested area files for every touched area before implementation.
2. After implementation, update both nested area files for each touched area and both global files.
3. Treat nested `agentContext` folders as mandatory even though they are inside area directories; they are not optional.
4. Do not treat these as append-only logs; integrate edits into existing sections, remove stale statements, and keep coherent current-state documents.
5. If a task touches multiple areas, perform this synchronization cycle for each touched area's nested folder plus the global folder.
