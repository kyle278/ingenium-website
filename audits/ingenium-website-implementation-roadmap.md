# Ingenium Audit Implementation Roadmap

## Objective
Turn the audit findings into a practical delivery sequence that improves crawlability, trust, answer-surface readiness, and conversion support without creating avoidable rework.

## Sequencing principles
- Fix crawl, canonical, and rendering issues before expanding content. There is no value in publishing more pages into a weak crawl graph.
- Fix proof architecture before adding more proof content. Otherwise the authority gets split again.
- Improve trust at the point of decision and submission, not only in policy pages.
- Keep server-rendered HTML authoritative. Client enhancement should decorate important facts, not create them.

## Phase 1: Quick wins
- Target window: 1 to 2 weeks
- Goal: remove the most damaging discoverability and presentation issues with low-to-moderate implementation cost

### 1. Expose key commercial child pages in server-rendered HTML
- Priority: P1
- Impact: `SEO`, `Crawl`, `UX`
- Routes affected: `/websites`, `/crm`, `/ai-agents`, `/automations`, `/team`
- Work:
  - Update the main nav and mobile nav so these links exist in the initial HTML, not only after client-open dropdown interaction.
  - Add at least one contextual body link from relevant hub pages where useful.
- Acceptance criteria:
  - A raw HTML fetch of the homepage and core hub pages contains anchor tags to all key child pages.
  - Internal-link checks no longer show zero inbound anchor links for those routes.

### 2. Add social preview images site-wide
- Priority: P1
- Impact: `SEO`, `AEO`
- Work:
  - Add a default Open Graph and Twitter image in shared metadata helpers.
  - Add page-type-specific images later if desired, but ship a clean default first.
- Acceptance criteria:
  - Sample pages expose `og:image` and `twitter:image`.
  - Link previews are no longer image-less.

### 3. Fix legacy redirect permanence
- Priority: P1
- Impact: `Crawl`, `SEO`
- Route affected: `/agents`
- Work:
  - Change the temporary redirect to a permanent redirect.
- Acceptance criteria:
  - `/agents` responds with a permanent redirect to `/ai-agents`.

### 4. Fix breadcrumb schema quality
- Priority: P1
- Impact: `SEO`, `Entity`
- Work:
  - Complete the route-label map for every public page.
  - Remove the bad home breadcrumb behavior that produces `/index`.
- Acceptance criteria:
  - Structured-data validation shows human-readable breadcrumb labels for all public routes.
  - The home breadcrumb no longer emits a spurious `index` item.

### 5. Add form trust cues beside submission
- Priority: P1
- Impact: `Trust`, `UX`
- Work:
  - Add a short note near submit buttons covering privacy, response time, and use of submitted data.
  - Link directly to the privacy or data-handling page.
- Acceptance criteria:
  - Every public intake form has visible reassurance next to the action, not only elsewhere on the site.

### 6. Remove public operational status messaging
- Priority: P1
- Impact: `Trust`, `UX`
- Route affected: `/contact`
- Work:
  - Remove public-facing “Portal form status” copy.
  - Keep operational checks internal or admin-only.
- Acceptance criteria:
  - The contact page no longer exposes internal system-health phrasing.

### 7. Stop server-rendering proof metrics as zero
- Priority: P1
- Impact: `AEO`, `Content`, `UX`
- Work:
  - Change `AnimatedMetric` usage so the real metric value is in the HTML from first render.
  - If animation remains, animate from the final visible value rather than publishing `0`.
- Acceptance criteria:
  - Raw HTML for proof pages contains the real metric values.

### 8. Improve sitemap signal fidelity
- Priority: P2
- Impact: `Crawl`, `SEO`
- Work:
  - Replace shared generic `lastmod` values with route-appropriate values where available.
  - Review priority settings for key commercial routes.
- Acceptance criteria:
  - The sitemap no longer looks mass-stamped with one low-signal value.

## Phase 2: Proof and content hardening
- Target window: 2 to 5 weeks
- Goal: improve ranking usefulness and commercial credibility once crawl basics are fixed

### 9. Resolve the proof architecture
- Priority: P1
- Impact: `SEO`, `Crawl`, `Entity`, `Trust`
- Work:
  - Choose the canonical proof surface: either project records or case-study records.
  - Align canonicals, redirects, sitemap entries, and internal links to that choice.
  - Do not leave an indexable proof detail layer linked only from a `noindex, nofollow` hub.
- Acceptance criteria:
  - Proof URLs follow one model consistently.
  - The chosen proof hub is indexable if it is intended to rank and pass value.
  - The non-canonical proof layer redirects or is otherwise clearly decommissioned.

### 10. Deepen the main service pages
- Priority: P1
- Impact: `SEO`, `AEO`, `Content`
- Routes affected: `/services`, `/websites`, `/crm`, `/ai-agents`, `/automations`, `/security`, `/platform`
- Work:
  - Expand each page with sections for fit, non-fit, process, requirements, common objections, proof, and next steps.
  - Add page-type-specific FAQs directly on the service pages, not only on intake pages.
- Acceptance criteria:
  - Each core service page becomes a serious evaluation asset, not just a short positioning page.
  - Answer coverage goes beyond a single “What is…” block.

### 11. Introduce semantic lists and comparison structures
- Priority: P2
- Impact: `AEO`, `UX`, `Content`
- Work:
  - Replace div-only pseudo lists with real lists where the content is list-shaped.
  - Add comparison tables where the buyer needs to distinguish service fit, process, or rollout options.
- Acceptance criteria:
  - Important enumerations and comparisons are semantically represented in HTML.

### 12. Strengthen proof evidence density
- Priority: P2
- Impact: `Content`, `Trust`, `SEO`
- Work:
  - Add stronger operational before/after detail.
  - Add more concrete outcomes where they can be defended.
  - Keep named client and implementation details visible.
- Acceptance criteria:
  - Proof pages carry more than descriptive narrative and soft counts.

### 13. Add social-proof and trust artifacts to decision pages
- Priority: P2
- Impact: `Trust`, `Content`
- Work:
  - Add clearer review deliverables, sample documentation descriptions, expectation-setting, or other visible trust artifacts where relevant.
  - Make security and governance claims more evidence-backed.
- Acceptance criteria:
  - Decision pages pair major trust claims with visible supporting material.

## Phase 3: Trust and entity reinforcement
- Target window: 4 to 8 weeks
- Goal: make the site more verifiable and more structurally legible as a business and source

### 14. Strengthen business identity signals
- Priority: P1
- Impact: `Trust`, `Entity`
- Work:
  - Add fuller business identity detail such as phone, address, legal/company detail, and clearer service-area context where appropriate.
  - Expand external identity links if legitimate profiles exist.
- Acceptance criteria:
  - The accountable business is easier to verify from key commercial and contact surfaces.

### 15. Build a proper organization and person graph
- Priority: P1
- Impact: `Entity`, `SEO`, `Trust`
- Work:
  - Add stable `@id` values.
  - Add `Person` markup for the team page.
  - Add real external `sameAs` targets where they exist.
- Acceptance criteria:
  - Organization, site, page, service, and person nodes form one consistent graph.

### 16. Add review ownership and freshness cues to key pages
- Priority: P2
- Impact: `Content`, `Trust`
- Work:
  - Extend visible review/update cues beyond policy pages onto critical commercial and governance pages.
- Acceptance criteria:
  - Trust-sensitive pages show clearer ownership or review context.

## Phase 4: Resilience and deployment discipline
- Target window: 1 to 3 weeks, can overlap with other phases
- Goal: stop production drift and reduce public-facing failure modes

### 17. Gracefully handle portal-form failures
- Priority: P1
- Impact: `UX`, `Trust`, `Resilience`
- Work:
  - Replace hard throws on form-resolution failure with user-safe fallback states.
  - Provide alternate contact routes if the portal-backed forms are unavailable.
- Acceptance criteria:
  - Demo, technical-review, and teardown pages degrade safely instead of failing hard.

### 18. Prevent raw config or environment leakage
- Priority: P1
- Impact: `Trust`, `Resilience`
- Work:
  - Ensure public routes never display raw environment or setup error strings.
- Acceptance criteria:
  - Failure states remain user-facing and safe.

### 19. Align production with workspace intent
- Priority: P1
- Impact: `Process`, `SEO`, `Crawl`, `Entity`
- Work:
  - Review the current workspace vs deployed site differences and close the gap deliberately.
  - Especially validate proof architecture and robot directives after deploy.
- Acceptance criteria:
  - Live output reflects the intended canonical and metadata model.

### 20. Add a post-deploy validation checklist
- Priority: P2
- Impact: `Process`
- Work:
  - Create a repeatable release checklist for metadata, redirects, schema, robots, sitemap, internal links, and form behavior.
- Acceptance criteria:
  - Future deploys are checked against the exact surfaces that failed this audit.

## Recommended execution order
1. Phase 1 items 1 through 7
2. Phase 2 item 9
3. Phase 2 items 10 through 13
4. Phase 3 items 14 through 16
5. Phase 4 items 17 through 20

## Suggested first sprint
- Expose key subpage links in server HTML.
- Add OG and Twitter images.
- Fix the `/agents` redirect.
- Fix breadcrumb schema labels and home breadcrumb output.
- Add form privacy and response cues.
- Remove public portal-status wording.
- Server-render real proof metrics.

## Suggested second sprint
- Resolve proof canonicals and hub indexation.
- Deepen the service pages.
- Add semantic list and comparison structures.
- Improve proof evidence density.

## Suggested third sprint
- Add organization and person graph improvements.
- Strengthen business identity and trust artifacts.
- Harden portal failure handling and deploy validation.

