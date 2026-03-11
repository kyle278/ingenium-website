- Date: 2026-03-03
- Task: Mojibake copy cleanup and workflow compliance
- What went wrong: I resumed implementation before fully aligning with repository workflow expectations and also ran unquoted shell paths containing parentheses.
- Root cause: I did not enforce a strict pre-flight checklist for workflow-first execution and PowerShell path quoting.
- Prevention rule: Before any code edit, complete workflow pre-read steps and quote all paths containing special shell characters (for example `app/(website)`).
- Verification step added: Run a pre-edit command checklist (`workflow read`, `context read`, `quoted path scan`) and validate search commands execute without shell parsing errors.

- Date: 2026-03-11
- Task: Platform-led website rewrite build follow-up
- What went wrong: I closed and pushed the rewrite without catching a client-side syntax error that broke the production build.
- Root cause: I relied on static review in an environment without Node tooling and did not do a targeted operator-precedence scan for client files touched by the rewrite.
- Prevention rule: When build tooling is unavailable, run a focused syntax-risk scan on touched client files for patterns Turbopack commonly rejects, especially mixed `??` with `||` or `&&`.
- Verification step added: After UI/client rewrites, grep touched files for `??` mixed with logical operators and resolve precedence explicitly with parentheses.

- Date: 2026-03-11
- Task: Portal tracker build follow-up
- What went wrong: I fixed the first build regression but still missed a TypeScript promise-type mismatch in the tracker runtime.
- Root cause: I did not do a targeted review of async helper return types in touched client/runtime files after changing the tracker bootstrap flow.
- Prevention rule: When TypeScript cannot be run locally, inspect touched async helpers for declared promise types versus chained `fetch`/`then`/`catch` return values and normalize them explicitly.
- Verification step added: For touched async helpers, check whether the declared promise type matches the final chained expression type and add `then(() => undefined)` or explicit annotations where needed.
