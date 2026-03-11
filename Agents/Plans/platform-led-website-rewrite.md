# Platform-Led Website Rewrite Plan

- Task slug: `platform-led-website-rewrite`
- Complexity: `complex`
- Status: `in_progress`
- Touched areas:
  - `app/(website)` (shared layout, navigation, footer, and core public routes)

## Objective
Rewrite the public website so it sells Ingenium as a unified revenue platform and implementation partner, using current Salesforce and HubSpot platform-selling patterns as reference while preserving the existing dark, animated, technical design language.

## Constraints
- Keep the design language anchored to the current emerald/cyan/slate visual system.
- Preserve a strong motion/technical feel; do not flatten the site.
- Keep the primary copy static in-route and metadata aligned to the visible narrative.
- Use a platform-first narrative with strong urgency, proof, trust, and governance.
- Keep existing Portal integration and contact flow intact while repositioning the public marketing narrative.

## Risks
- A broad route rewrite can leave the IA inconsistent if nav/footer and route metadata are not updated together.
- Reusing existing page structures without enough simplification can keep the old agency-heavy positioning alive.
- Over-rotating into product language without implementation credibility can weaken the “partner to help you grow” positioning.
- Environment limitations may block automated verification after the rewrite.

## Acceptance Criteria
- Home and primary product/service routes clearly sell Ingenium as a unified platform plus execution partner.
- Navigation and footer reflect a tighter public IA.
- Core pages maintain motion, proof modules, technical visuals, and strong CTA ladders.
- Trust/governance and urgency are visible across the site, not isolated to a single page.
- Metadata and visible copy are aligned on rewritten routes.

## Phase 1 - Research and IA Reset
- Objective: translate external platform-selling research into a concrete site narrative and route structure.
- Dependencies: none
- Completion criteria: plan/comms created and new public IA chosen.

### Tasks
- [x] T1 - Complete workflow pre-read and external research
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `none`
  - Subtasks:
    - [x] ST1.1 - Read workflow, lessons, design language, and context files
    - [x] ST1.2 - Review Salesforce and HubSpot platform-selling patterns on official sites
    - [x] ST1.3 - Inspect current route structure and shared components
- [x] T2 - Create plan and communication artifacts
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T1`
  - Subtasks:
    - [x] ST2.1 - Add plan file
    - [x] ST2.2 - Add communication log

## Phase 2 - Shared Shell and IA
- Objective: reset the shared navigation/footer and define the new visible route hierarchy.
- Dependencies: `T1`
- Completion criteria: site shell communicates the new platform-first story and de-emphasizes unnecessary pages.

### Tasks
- [ ] T3 - Rewrite shared nav/footer/layout content
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T2`
  - Subtasks:
    - [x] ST3.1 - Update primary nav items and CTA ladder
    - [x] ST3.2 - Update footer service/company link structure
    - [x] ST3.3 - Align shell copy with platform positioning

## Phase 3 - Core Route Rewrite
- Objective: rewrite the most important public routes around a unified platform story with proof and urgency.
- Dependencies: `T3`
- Completion criteria: home and core routes present a coherent, high-conviction platform narrative.

### Tasks
- [ ] T4 - Rewrite home and platform pages
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T3`
  - Subtasks:
    - [x] ST4.1 - Rewrite home hero, proof, architecture, trust, and CTA flow
    - [x] ST4.2 - Rewrite platform page around modules, role-based value, and governance
- [ ] T5 - Rewrite supporting platform module pages
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T4`
  - Subtasks:
    - [x] ST5.1 - Rewrite CRM, Agents, and Automations pages
    - [x] ST5.2 - Rewrite Websites and Security pages
    - [x] ST5.3 - Rewrite Case Studies, About, and Contact framing

## Phase 4 - Cleanup, Context, and Verification
- Objective: reconcile leftovers, docs, and verification evidence.
- Dependencies: `T5`
- Completion criteria: updated docs/context/changelog and reviewed diffs with explicit verification status.

### Tasks
- [ ] T6 - De-emphasize or reconcile lower-priority routes
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T5`
  - Subtasks:
    - [x] ST6.1 - Decide whether team/projects/departments remain visible in IA
    - [x] ST6.2 - Ensure remaining routes do not conflict with the new story
- [ ] T7 - Update mandatory docs and task logs
  - Status: `completed`
  - Owner: `main-agent`
  - Dependencies: `T6`
  - Subtasks:
    - [x] ST7.1 - Update changelog
    - [x] ST7.2 - Reconcile global and website `agentContext`
    - [x] ST7.3 - Resolve communication log items
- [ ] T8 - Review and verify
  - Status: `in_progress`
  - Owner: `main-agent`
  - Dependencies: `T7`
  - Subtasks:
    - [x] ST8.1 - Review diffs for IA/copy consistency
    - [ ] ST8.2 - Run lint/type/build if environment permits
    - [x] ST8.3 - Capture residual risks if automated checks are blocked

## Inter-Agent Communication
- Communication file: `Agents/agentCommunications/platform-led-website-rewrite-comms.md`
- Open items summary:
  - [x] Msg-001 - Translate Salesforce/HubSpot-style platform selling patterns into a tighter Ingenium public IA without flattening the existing design language.
  - [x] Msg-002 - Keep Portal integration/contact flow intact while rewriting the public marketing narrative.

## Persona Validation
- UI engineer sign-off expectation: acceptable if the rewrite preserves the existing motion-heavy visual system while improving hierarchy and CTA clarity.
- Backend engineer sign-off expectation: acceptable if the marketing rewrite does not disturb the current Portal integration contract.
- Security engineer sign-off expectation: acceptable if trust/governance claims stay aligned with actual implementation boundaries.
