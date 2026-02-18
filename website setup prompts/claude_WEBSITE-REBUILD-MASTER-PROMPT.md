# Ingenium Website Rebuild — Master Implementation Prompt

> Generated from: WEBSITE-CONVERSION-PERSONA-AUDIT.md
> Date: 2026-02-18
> Purpose: Single structured prompt for a complete, conversion-optimised, SEO-first website rebuild.

---

## DIRECTIVE

You are rebuilding the Ingenium enterprise marketing website from the ground up. This is not a tweak — it is a full rebuild designed to position Ingenium as the dominant enterprise web design and revenue operations partner. Every page must earn its place. Every section must convert. Every word must serve the visitor and the search engine simultaneously.

The website must communicate one thing above all else: **Ingenium builds websites that generate pipeline, and then wraps CRM, AI agents, and automation around them so that pipeline compounds.** Website builds are the primary hook — everything else extends from that core.

---

## BRAND DIRECTION: CLEAN, TECHY, PREMIUM

### Color Scheme
- **Primary palette:** Deep slate/charcoal backgrounds (#0F172A range) with electric emerald (#10B981 / #34D399) as the action color. This signals enterprise seriousness with modern technical energy.
- **Secondary accents:** Cool blue-grays for secondary text and borders. Subtle gradient shifts (slate-to-dark) to create depth without visual noise.
- **Proof and highlight color:** A restrained cyan or teal accent (#06B6D4) for data visualisations, metric callouts, and interactive hover states — gives a "dashboard" feel.
- **Backgrounds:** Alternate between deep dark sections and clean off-white/light gray (#F8FAFC) sections to break monotony. No page should use the same background pattern for more than two consecutive sections.
- **Cards and surfaces:** Use subtle glassmorphism or soft border treatments on dark backgrounds. On light backgrounds, use clean white cards with minimal shadow.
- **IMPORTANT:** Every page must feel visually distinct. Do NOT repeat the same card-grid-CTA-band layout on every page. Each page gets its own visual signature while staying within the system.

### Typography
- **Display / Headings:** Switch to a sharper, more technical display font. Consider **Inter Tight**, **Space Grotesk**, or **JetBrains Mono for accent/code elements**. The headings should feel precise, engineered, and confident — not rounded or soft.
- **Body text:** **Inter** or **Geist** for body copy — highly legible, modern, and techy without being cold. Clean x-height, excellent at small sizes.
- **Monospace accent:** Use a monospace font (JetBrains Mono, Fira Code) for metric callouts, technical specifications, code-like elements, and data points. This reinforces the "we build systems" narrative visually.
- **Hierarchy rules:**
  - H1: Bold, large, tight letter-spacing (-0.02em). One per page.
  - H2: Semi-bold, clear section breaks. Must mirror SEO intent modifiers.
  - H3: Medium weight, used for card titles and sub-sections.
  - Body: Regular weight, 16-18px, 1.6-1.7 line height for readability.
  - Metric/data callouts: Monospace, oversized, with the emerald or cyan accent color.
- **No visual repetition:** Vary section compositions — use alternating layouts (text-left/visual-right, full-width data strips, asymmetric grids, timeline layouts) so no two sections on the same page feel identical.

### Visual Proof System
- Every proof element should look like a real dashboard snippet, not a marketing card.
- Use subtle grid/dot-matrix background patterns on dark sections to reinforce the "tech platform" feel.
- Case study metrics should be displayed in a monospace, dashboard-style format with clear before/after states.
- Replace generic iconography with purposeful visuals: workflow diagrams, system architecture snippets, annotated screenshots, data visualisation components.

---

## GLOBAL REQUIREMENTS (Apply to Every Page)

### Conversion Architecture
Every page must implement a **three-tier CTA ladder:**
1. **Primary CTA:** "Book a Strategy Call" — high intent, prominent placement in hero and final CTA band.
2. **Secondary CTA:** Contextual mid-funnel offer per page (download checklist, view framework, request case pack). Placed after proof/capability sections.
3. **Tertiary CTA:** Lightweight engagement (view case study, explore platform, read the guide). Placed inline within content sections.

Do NOT use the same CTA copy on every page. Tailor the CTA language to the page's narrative job and the visitor's likely intent stage.

### Proof Density Standard
Every page (except Contact) must include at least one proof element with:
- A named client type (e.g., "Series B SaaS company" or "Enterprise financial services firm") — anonymised is fine, but specific.
- A baseline metric, the intervention, and the outcome with a timeframe.
- Visual treatment: dashboard-style metric display, not a plain text testimonial.

### Role-Based Conversion Paths
Across the site, provide clear paths for three buyer types:
- **Marketing leadership:** Emphasise pipeline attribution, conversion lift, campaign operations impact.
- **Sales leadership:** Emphasise lead routing speed, CRM pipeline accuracy, deal velocity, win rate.
- **CTO / Security / Procurement:** Emphasise architecture, integrations, compliance, governance, data controls.

Use contextual internal links with descriptive anchor text (never "learn more") to guide each persona to their highest-relevance pages.

### Progressive Contact Model
Replace the current high-friction contact form with a two-step progressive model:
- **Step 1 (visible):** Name, email, "What's your biggest growth challenge?" (short dropdown or free text). Submit button: "Get Started."
- **Step 2 (post-submit or follow-up):** Extended qualification — company size, current stack, timeline, budget range. This can be a follow-up form, email sequence, or scheduling flow.

This reduces first-touch friction while preserving lead quality through progressive profiling.

---

## SEO FRAMEWORK (Baked Into Every Page)

### Metadata Rules — CRITICAL
The current site has duplicated titles and meta descriptions across all pages. This MUST be fixed. Every page requires:
- **Unique `<title>` tag** (50-60 characters) containing the primary keyword.
- **Unique meta description** (140-160 characters) with primary keyword and a clear value proposition / call to action.
- **Canonical tag** — self-referencing on every indexable page.
- **Unique OG title + OG description** for social sharing (can differ slightly from meta for engagement).

### On-Page Keyword Rules (Apply to ALL Pages)
For every page:
1. Place the **primary keyword** in: title tag, H1, first 120 words of body copy, at least one H2, and the URL slug (for new pages).
2. Use **semantic H2s** that mirror search intent modifiers: `services`, `process`, `pricing`, `case studies`, `security`, `faq`, `how it works`.
3. Write **FAQ sections** using natural question phrasing to support featured snippet eligibility.
4. Strengthen evidence blocks with: named client type, baseline metric, intervention summary, outcome + timeframe.
5. Add **descriptive alt text** to all meaningful images — non-spammy, naturally phrased.
6. Avoid keyword stuffing. Prioritise relevance, proof density, and intent match over repetition.

### Page-Level Keyword Targets

| Page | Primary Keyword | Secondary Keywords |
|---|---|---|
| `/` (Home) | `enterprise web design agency` | `enterprise website systems`, `conversion-focused web design`, `website crm ai integration` |
| `/websites` | `enterprise website redesign` | `enterprise web design services`, `b2b website redesign`, `website conversion optimization services` |
| `/platform` | `website crm ai platform` | `revenue operations platform`, `website crm integration`, `pipeline attribution` |
| `/agents` | `ai agents for marketing and sales` | `enterprise ai agents`, `ai workflow automation`, `ai governance` |
| `/departments` | `ai departments for revenue teams` | `ai team workflows`, `human approval workflows`, `ai operations governance` |
| `/crm` | `crm implementation services` | `crm implementation consulting`, `crm migration services`, `revops consulting` |
| `/automations` | `marketing automation consulting services` | `lead routing automation`, `sales automation workflows`, `pipeline automation` |
| `/case-studies` | `enterprise website case studies` | `website redesign results`, `conversion lift case study`, `b2b website examples` |
| `/security` | `enterprise website security and governance` | `ai governance`, `soc 2 readiness`, `vendor security review` |
| `/about` | `enterprise website consulting team` | `revops consulting company`, `website growth partner`, `conversion strategy consulting` |
| `/contact` | `website strategy consultation` | `book website strategy call`, `conversion strategy call`, `request security packet` |

### Metadata Templates Per Page

| Page | Title Tag | Meta Description |
|---|---|---|
| `/` | `Enterprise Web Design Agency \| Ingenium` | `Ingenium is the enterprise web design agency that builds conversion systems — website, CRM, AI agents, and automation — to grow your pipeline.` |
| `/websites` | `Enterprise Website Redesign Services \| Ingenium` | `Enterprise website redesign built for conversion. Strategy, design, CRO, and a 30-day launch path. See how Ingenium builds sites that sell.` |
| `/platform` | `Website + CRM + AI Platform for Revenue Teams \| Ingenium` | `One platform connecting your website, CRM, AI agents, and automations. Built for revenue teams who need pipeline visibility and control.` |
| `/agents` | `AI Agents for Marketing and Sales Teams \| Ingenium` | `Deploy governed AI agents across marketing and sales workflows. Human-approved, measurable, and integrated into your revenue stack.` |
| `/departments` | `AI Departments for Revenue Teams \| Ingenium` | `Structure AI operations into governed departments with human oversight. Scale automation without losing control of quality or compliance.` |
| `/crm` | `CRM Implementation and RevOps Services \| Ingenium` | `CRM implementation, migration, and revenue operations consulting. Clean data, smart routing, and pipeline accuracy from day one.` |
| `/automations` | `Marketing and Lead Routing Automation Services \| Ingenium` | `Marketing automation and lead routing built for speed and governance. Trigger-to-action workflows with SLA tracking and rollback controls.` |
| `/case-studies` | `Enterprise Website Case Studies \| Ingenium` | `Real results from enterprise website rebuilds — conversion lift, pipeline growth, and system integration outcomes with measurable timelines.` |
| `/security` | `Enterprise Security and AI Governance \| Ingenium` | `Enterprise-grade security controls, AI governance frameworks, and compliance readiness. Built for regulated industries and procurement teams.` |
| `/about` | `Enterprise Website Consulting Team \| Ingenium` | `Meet the Ingenium team — enterprise web design, CRM, and AI operations specialists building conversion systems for growth companies.` |
| `/contact` | `Book a Website Strategy Consultation \| Ingenium` | `Start with a strategy call. Tell us your biggest growth challenge and get a tailored conversion roadmap within 48 hours.` |

### Internal Linking Anchor Plan
Use contextual, keyword-rich anchor text — never "learn more" or "click here":
- Home → `/websites`: anchor `enterprise website redesign services`
- Home → `/crm`: anchor `crm implementation services`
- Home → `/automations`: anchor `lead routing automation`
- `/websites` → `/case-studies`: anchor `enterprise website case studies`
- `/crm` → `/automations`: anchor `marketing and sales automation workflows`
- `/security` → `/contact`: anchor `request security review`
- Case studies → service pages with anchors tied to service terms (e.g., `enterprise website redesign` linking to `/websites`).

### Structured Data Requirements
- **Home:** `Organization` + `WebSite` schema.
- **All pages:** `BreadcrumbList` schema.
- **Service pages** (`/websites`, `/crm`, `/automations`, `/agents`, `/departments`, `/platform`): `Service` schema.
- **Case studies:** Individual case entries with structured outcome data.
- **FAQ sections:** `FAQPage` schema ONLY where FAQ content is fully visible on page (not behind accordions that hide content from crawlers on initial load).

### Technical SEO Checklist (Must Ship With Rebuild)
- XML sitemap includes all indexable pages — submitted to Google Search Console.
- `robots.txt` present, not blocking core pages.
- Canonical tags valid and self-referencing.
- Core Web Vitals targets at p75: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1.
- Mobile rendering parity for all key content and metadata.
- All images use next-gen formats (WebP/AVIF) with proper sizing and lazy loading.

---

## PAGE-BY-PAGE REBUILD SPECIFICATION

---

### PAGE: HOME (`/`)
**Narrative job:** First impression. Establish Ingenium as the enterprise web design agency that builds conversion systems. Create immediate credibility and route visitors to their highest-intent page.

**Primary keyword:** `enterprise web design agency`

**SECTION: Hero**
- Headline: Bold, outcome-led statement. Must include "enterprise web design" naturally. Communicate the core promise: websites that generate pipeline.
- Sub-headline: One sentence expanding on the system — website + CRM + AI + automation = compounding pipeline.
- Primary CTA: "Book a Strategy Call" — prominent, emerald accent button.
- Secondary CTA: "See How It Works" — ghost/outline button linking to the process section or `/websites`.
- Proof indicator: One concrete attributed result near the CTA (e.g., "47% conversion lift for a Series B SaaS company in 90 days"). Dashboard-style metric display, monospace font.
- **Persona notes:**
  - *Marketing Director:* Hero must be outcome-led, not feature-led. Pipeline language resonates.
  - *Sales Director:* Revenue and pipeline framing validates relevance immediately.
  - *CEO (SaaS):* Speed indicators (timelines) signal execution confidence.
  - *CEO (Enterprise):* Enterprise tone and governance mention reduce risk perception.
  - *CTO:* Mention of integrated systems (website + CRM + AI) signals architectural maturity.

**SECTION: Metrics Strip**
- 3-5 headline metrics displayed in monospace/dashboard style on a dark background strip.
- Each metric MUST include context: timeframe, sample basis, or methodology note (e.g., "Average across 12 enterprise engagements, 2025").
- Metrics should cover: conversion lift percentage, pipeline impact, implementation speed, system uptime or reliability.
- **Persona notes:**
  - *Marketing Director:* Metrics are attractive but must be verifiable — add context.
  - *Sales Director:* Needs pipeline-quality metrics, not just traffic numbers.
  - *CEO (Regulated):* Unverifiable claims reduce trust — always annotate.
  - *Product Manager:* Wants to see methodology behind numbers.

**SECTION: Industry Trust Strip**
- Replace generic industry labels with stronger trust elements: named client types with industry and scale indicators (e.g., "Trusted by Series B-D SaaS companies, enterprise financial services, and regulated healthcare platforms").
- If named logos are available, use them. If not, use specific anonymised descriptors with visual credibility markers.
- **Persona notes:**
  - *Marketing Director:* Generic trust strips lack persuasion — specificity matters.
  - *Sales Director:* Named logos or industry-specific proof accelerate internal selling.
  - *CEO (Enterprise):* Trust strip should signal peer companies of similar scale and complexity.

**SECTION: Problem Statement**
- Frame the core problem: disconnected tools, leaking pipeline, no attribution, marketing and sales misalignment.
- Tighten copy to address role-specific pain:
  - Marketing: "Your website generates traffic but you can't prove which campaigns drive revenue."
  - Sales: "Leads arrive late, unqualified, and without context."
  - Technical: "Your stack is duct-taped together and no one owns the data model."
- Use a visual treatment that differs from the hero — perhaps a split layout or annotated diagram showing the "broken state."
- **Persona notes:**
  - *Marketing Executive:* Problem must resonate with day-to-day operational pain, not just strategic language.
  - *Sales Executive:* "What changes in my week" clarity is essential.
  - *UI/UX Designer:* Problem section needs interaction-level proof, not just statements.

**SECTION: Conversion Engine Overview**
- Visual system flow showing: Website → Leads → CRM → AI Agents → Automation → Pipeline.
- This should look like a real system diagram — not a marketing illustration. Use connecting lines, node labels, and data flow indicators.
- Each node should have a one-line outcome statement.
- Link each node to its respective page using keyword-rich anchor text.
- **Persona notes:**
  - *Marketing Executive:* Needs to see how campaign operations map to this flow.
  - *CTO:* System diagram must look architecturally credible, not cartoon.
  - *Web Designer:* This is the most important visual on the page — make it distinct and memorable.
  - *Product Manager:* Should imply iteration and feedback loops, not a one-way pipeline.

**SECTION: Process (How We Work)**
- Phased delivery path: Discovery → Strategy → Build → Launch → Optimise.
- Each phase must include: expected deliverable, timeline indicator, and owner responsibilities (what Ingenium does vs. what the client does).
- Use a timeline or stepped visual treatment — NOT cards.
- **Persona notes:**
  - *Marketing Director:* Process section builds confidence but needs deliverable specifics.
  - *Sales Director:* Wants to see commitment points and SLA indicators.
  - *CEO (Enterprise):* Phased language reduces transformation anxiety — keep and strengthen.
  - *Product Manager:* Needs to understand the experimentation/iteration cadence within each phase.

**SECTION: Proof / Case Snapshots**
- 2-3 expandable case snapshots (not full case studies — those live on `/case-studies`).
- Each snapshot: Client type, challenge (1 sentence), intervention (1 sentence), outcome (metric + timeframe).
- Dashboard-style metric display. Expandable to reveal more detail or link to full case study.
- **Persona notes:**
  - *Marketing Director:* Proof needs deeper campaign-level detail, not just summary numbers.
  - *Sales Director:* Include pipeline-quality metrics: cycle time, win rate, deal velocity.
  - *CEO (SaaS):* Board-level outcomes: CAC payback, velocity, retention impact.
  - *CEO (Enterprise):* Org-level change and adoption metrics matter.
  - *CEO (Regulated):* Show regulated industry examples with risk controls mentioned.
  - *Product Manager:* Before/after journey maps and KPI trees add credibility.

**SECTION: Governance Strip**
- Concise governance statement: human oversight, approval workflows, audit trails, security controls.
- Direct link to `/security` using anchor: "enterprise security and AI governance."
- Direct link to downloadable security/technical pack (secondary CTA).
- **Persona notes:**
  - *CTO:* Governance must appear integrated, not bolted on. Link to architecture detail.
  - *CEO (Regulated):* Compliance language must go deeper than surface — reference specific frameworks.
  - *Sales Director:* Governance supports procurement conversations — make it easy to share.

**SECTION: Final CTA Band**
- Primary CTA: "Book a Strategy Call" — clear, prominent.
- Secondary CTA: "Download Our Enterprise Website Checklist" or "View Case Studies."
- Reassurance text: Expected response time, what happens on the call, no commitment language.
- **Persona notes:**
  - *UI/UX Designer:* Repeated primary CTA across pages reduces click intent — vary the copy.
  - *Marketing Executive:* CTA jumps from top-funnel to bottom-funnel too fast — secondary CTA bridges the gap.
  - *Sales Executive:* Needs lightweight proof asset option, not just a call booking.

---

### PAGE: WEBSITES (`/websites`)
**Narrative job:** This is the primary money page. It must position Ingenium as the definitive enterprise website redesign partner, demonstrate the conversion methodology, and drive high-intent leads. This page carries the most commercial weight.

**Primary keyword:** `enterprise website redesign`

**SECTION: Hero**
- Headline: Must include "enterprise website redesign" naturally. Focus on the outcome: websites that convert traffic into qualified pipeline.
- Sub-headline: Differentiate from generic web agencies — this is a conversion system, not a design project.
- Primary CTA: "Book a Strategy Call."
- Secondary CTA: "See Our Process" (anchor link to implementation path section).
- Hero visual: A before/after website conversion metric or a stylised browser frame showing a high-converting page layout.
- **Persona notes:**
  - *Marketing Director:* Hero is clear — keep outcome focus.
  - *Web Designer:* Hero needs a strong, distinct visual that sets this page apart from other pages.

**SECTION: Conversion Engine Detail**
- Expand on how Ingenium websites are built for conversion: messaging architecture, layout psychology, CTA engineering, attribution integration.
- Include one real example flow: "Visitor lands on service page → reads problem framing → views proof → clicks CTA → enters progressive form → lead routed to sales in <60 seconds with full context."
- Visual: Annotated wireframe or flow diagram showing the conversion path.
- **Persona notes:**
  - *Marketing Executive:* Needs examples of landing page architecture, messaging matrix, experimentation loops.
  - *Sales Executive:* Show the lead handoff — what data does the rep get, how fast, in what format.
  - *Product Manager:* Expose the iteration loop — how does the system learn and improve.

**SECTION: System Comparison / Why This Approach**
- Compare the Ingenium system approach vs. traditional web agency vs. DIY/template approach.
- Use a clear comparison format — NOT a feature checklist. Frame around outcomes: conversion rate, time to value, ongoing optimisation, attribution capability, scalability.
- Visual: Clean comparison table or side-by-side with clear visual contrast showing Ingenium's advantage.
- **Persona notes:**
  - *Sales Director:* Comparison section is persuasive — strengthen revenue governance specifics.
  - *CEO (SaaS):* Should include scoped package options or engagement model transparency.

**SECTION: Capability Pillars**
- Three core pillars of the website service. For each pillar, include:
  - A clear label and one-sentence description.
  - A concrete output example (e.g., "Messaging architecture document with 12 page-level conversion hypotheses").
  - A visual or icon that is unique to this pillar — do NOT use the same card style for all three.
- **Persona notes:**
  - *Marketing Director:* Pillars are good but abstract without examples — add concrete outputs.
  - *Web Designer:* Pillars need differentiated visual signatures, not identical cards.

**SECTION: Implementation Path**
- Timeline visual: Week 1-2 (Discovery + Strategy) → Week 3-4 (Design + Build) → Week 5-6 (Launch + Optimise).
- Each phase: deliverables, owner responsibilities (Ingenium vs. client), and expected outcomes.
- **Persona notes:**
  - *CEO (Enterprise):* Include governance model by phase — who approves what, when.
  - *Product Manager:* Expose iteration loop details and release governance within the timeline.
  - *CTO:* Add technical milestones: integration points, data validation, QA gates.

**SECTION: First 30 Days**
- What happens in the first 30 days after engagement starts.
- Explicit outcomes: "By day 30, you will have [specific deliverables] live and [specific metrics] baselined."
- This section builds confidence for cautious buyers.
- **Persona notes:**
  - *Marketing Executive:* Sharpen with explicit tactical outputs and day-30 actions.
  - *Sales Director:* Include commitment points and what the client should expect to invest (time, resources).

**SECTION: Proof**
- One full mini-case narrative for a website engagement: challenge, approach, specific changes made, results with metrics and timeframe.
- Dashboard-style metric display.
- Link to `/case-studies` with anchor: `enterprise website case studies`.
- **Persona notes:**
  - *All personas:* This is where credibility is won or lost. Named client type, specific numbers, clear intervention summary.

**SECTION: FAQ**
- Must answer real objections and search-style questions:
  - "How long does an enterprise website redesign take?"
  - "What does an enterprise website redesign cost?" (framework, not exact pricing)
  - "How do you handle migration from our existing site?"
  - "What about change management and team adoption?"
  - "How do you integrate with our existing CRM and marketing stack?"
  - "What happens if we need changes after launch?"
- Implement `FAQPage` structured data.
- **Persona notes:**
  - *Sales Director:* FAQ should address integration risk and ownership questions.
  - *CEO (Enterprise):* Change management and cross-regional rollout governance questions matter.
  - *CTO:* Integration risk, data migration, and rollback process questions are expected.

**SECTION: Final CTA Band**
- Primary: "Book a Strategy Call."
- Secondary: "Download Our Website Redesign Scope Template" — a tangible mid-funnel asset.
- Reassurance text about what happens next.

---

### PAGE: PLATFORM (`/platform`)
**Narrative job:** Demonstrate the integrated system — website + CRM + AI + automation — as a unified platform, not a collection of tools. This page serves technical evaluators and operations leaders.

**Primary keyword:** `website crm ai platform`

**SECTION: Hero**
- Headline: Position the platform as the connective layer across website, CRM, AI, and automation. Include "platform" and "revenue teams" naturally.
- Visual: System architecture overview — show how modules connect. This should look like a real platform diagram.

**SECTION: Modules**
- Present each platform module (Website, CRM, Agents, Automations, Analytics) as a distinct component.
- Each module card must link to a concrete proof artifact or its dedicated page.
- Vary the visual treatment — do NOT use identical cards for every module.
- **Persona notes:**
  - *Marketing Executive:* Module views should include screenshot snippets tied to marketing tasks.
  - *Product Manager:* Outcomes by module should be tight and measurable.
  - *CTO:* Integration patterns need to be specific, not generic.

**SECTION: Role-Based Views**
- Add persona tabs or segmented views showing the platform from different perspectives:
  - Marketing: campaign attribution, conversion tracking, content performance.
  - Sales: pipeline view, lead routing, deal velocity, forecast accuracy.
  - Technical: integrations, data model, API access, governance controls.
- Each tab should show a tailored screenshot or wireframe with role-specific outcomes.
- **Persona notes:**
  - *Sales Executive:* Show "rep view" — what does the platform look like for an AE on a Tuesday morning.
  - *UI/UX Designer:* Role-based section should offer quick paths by persona with clear interaction patterns.

**SECTION: Integrations**
- Replace generic "we integrate with everything" language with specific integration patterns:
  - CRM systems: name them (HubSpot, Salesforce, etc.) with specific data flow descriptions.
  - Marketing tools: specific connection types and sync cadences.
  - Analytics: attribution model and data pipeline details.
- Include trust signals: certification badges, partner status, integration uptime.
- **Persona notes:**
  - *CTO:* This section currently too generic — needs architecture-level specificity.
  - *Sales Director:* Sales ops needs confidence in data accuracy across integrations.

**SECTION: Final CTA Band**
- Primary: "Book a Strategy Call."
- Secondary: "Request an Architecture Review" — for technical buyers.

---

### PAGE: AGENTS (`/agents`)
**Narrative job:** Position AI agents as governed, measurable, and integrated into existing revenue workflows — not experimental or risky.

**Primary keyword:** `ai agents for marketing and sales`

**SECTION: Hero / Workflow Preview**
- Headline: Must include "AI agents" and tie to marketing/sales outcomes. Focus on governed automation, not AI hype.
- Visual: An animated or static workflow showing an agent receiving a trigger, executing a task, requesting human approval, and delivering an output.

**SECTION: Capabilities**
- Present agent capabilities with role-specific examples:
  - Marketing ops: content brief generation, campaign QA, performance analysis.
  - SDR/Sales: call prep, lead qualification scoring, next-best-action recommendations, follow-up sequence generation.
  - RevOps: data hygiene, attribution reconciliation, forecast modelling.
- Each capability must show a concrete output (e.g., "Agent generates a qualified lead brief with company context, engagement history, and recommended talk track — delivered to Slack and CRM before the call").
- **Persona notes:**
  - *Marketing Executive:* Show concrete outputs: briefs, variants, QA reports.
  - *Sales Executive:* Tie to call prep, qualification, and next-best actions.
  - *Product Manager:* Show operational boundaries and handoff details.

**SECTION: Governance**
- Visual: Approval lifecycle diagram showing trigger → agent action → human review gate → approved output → audit log.
- Explicit approval model: who approves, what thresholds trigger review, how overrides work.
- **Persona notes:**
  - *CTO:* Policy model specifics needed — not just "human in the loop" claims.
  - *CEO (Regulated):* Compliance constraints need explicit treatment — audit trails, data handling, retention.

**SECTION: Impact / Use Cases**
- Convert to measurable "before → after" examples:
  - "Before: SDR spends 45 minutes researching each prospect. After: Agent delivers a complete prospect brief in 90 seconds."
  - Include KPI deltas by function: response time, qualification rate, content output volume, accuracy.
- Dashboard-style metric display for each use case.
- **Persona notes:**
  - *Sales Director:* Needs explicit SDR/AE workflow metrics — response time, qualification accuracy.
  - *Marketing Director:* Needs KPI deltas by marketing function.

**SECTION: Final CTA Band**
- Primary: "Book a Strategy Call."
- Secondary: "View a Sample Agent Playbook" — mid-funnel asset.

---

### PAGE: DEPARTMENTS (`/departments`)
**Narrative job:** Explain how AI operations are structured into governed departments with human oversight — this is the operational model page, not a product feature page.

**Primary keyword:** `ai departments for revenue teams`

**SECTION: Hero**
- Headline: Frame AI departments as the operating model for scaling automation safely.
- Visual: Org-chart style diagram showing department structure with human oversight nodes.

**SECTION: Outcomes Framing**
- Tighten with departmental KPIs: each department must show what it measures and what improvement looks like.
- Use specific metrics, not vague promises.
- **Persona notes:**
  - *Sales Director:* Include measurable ownership outcomes per department.
  - *Marketing Executive:* Needs ownership matrix by team role.

**SECTION: Human Control**
- Strongest trust-building section — keep and expand.
- Add escalation and override examples: what happens when an agent makes a mistake, how is it caught, who intervenes, what's the rollback path.
- Visual: Escalation flow diagram.
- **Persona notes:**
  - *CEO (Enterprise):* Needs clearer accountability model and executive steering cadence.
  - *CEO (Regulated):* Compliance constraints and audit trail visibility are critical here.

**SECTION: Department Structure**
- Convert to a clearer org-chart style visual with:
  - Department name, purpose, key workflows, human oversight role, output metrics.
  - Show how departments interact and hand off work to each other.
- **Persona notes:**
  - *Web Designer:* Org-chart visual treatment is the right approach — execute well.
  - *UI/UX Designer:* Interaction-led explanation of hierarchy and approvals.
  - *Sales Executive:* Needs explicit seller-facing outputs from each department.

**SECTION: Final CTA Band**
- Primary: "Book a Strategy Call."
- Secondary: "See the Implementation Blueprint" — mid-funnel asset.

---

### PAGE: CRM (`/crm`)
**Narrative job:** Position CRM implementation as the pipeline foundation — clean data, smart routing, accurate forecasting. This page has the strongest direct relevance for sales leadership.

**Primary keyword:** `crm implementation services`

**SECTION: Hero**
- Headline: Must include "CRM implementation." Focus on pipeline accuracy and revenue operations.
- Visual: CRM dashboard wireframe showing pipeline stages, lead routing, and attribution data.

**SECTION: CRM Foundation**
- Detail the CRM architecture: lifecycle stages, lead routing rules, attribution model, data hygiene standards.
- Add concrete examples: "Lead arrives via website form → enriched with firmographic data → scored → routed to the right rep in <60 seconds → full engagement context attached."
- **Persona notes:**
  - *Sales Director:* Strongest sales relevance page — needs stage conversion and forecast accuracy examples.
  - *Marketing Executive:* Needs mapping to campaign attribution model examples.

**SECTION: Migration**
- Keep this section — it's a strong trust signal for risk reduction.
- Add explicit risk controls: data validation checkpoints, parallel running period, rollback plan, data mapping documentation.
- Include a migration timeline visual with gates and checkpoints.
- **Persona notes:**
  - *CTO:* Data model and interoperability details needed — not just "we migrate your data."
  - *CEO (Enterprise):* Adoption/change management plan details matter.

**SECTION: Final CTA Band**
- Primary: "Book a Strategy Call."
- Secondary: "Request a Migration Assessment" — high-intent, low-friction.

---

### PAGE: AUTOMATIONS (`/automations`)
**Narrative job:** Show how automation workflows drive speed, consistency, and governance across marketing and sales operations.

**Primary keyword:** `marketing automation consulting services`

**SECTION: Hero / Workflow Preview**
- Headline: Must include "marketing automation" and "lead routing." Focus on speed-to-lead and governed execution.
- Visual: Workflow diagram showing a trigger-to-action sequence with timing indicators and governance checkpoints.

**SECTION: Workflow Capabilities**
- Present trigger-action examples with specific timing expectations:
  - "High-intent form submission → lead enriched and scored → routed to SDR Slack channel in <45 seconds → follow-up email sequence triggered at 2-hour mark if no response."
- Include SLA and escalation examples: what happens when an SLA is breached, who gets notified, what's the fallback.
- **Persona notes:**
  - *Sales Director:* SLA and escalation examples are critical for sales confidence.
  - *Marketing Executive:* Sample trigger-to-action maps with timelines resonate.
  - *CTO:* Runtime and failure-handling details needed — rollback, monitoring, alerting.

**SECTION: Governance**
- Show rollback and monitoring path: how automations are tested, how failures are caught, how changes are approved.
- Visual: Governance lifecycle for automation deployment.

**SECTION: Conversion Tie-Back**
- Add KPI mapping by workflow: each automation should show its measurable impact on pipeline metrics.
- Dashboard-style display showing workflow → metric impact.

**SECTION: Final CTA Band**
- Primary: "Book a Strategy Call."
- Secondary: "Request a Workflow Audit" — for companies with existing automation that needs improvement.

---

### PAGE: CASE STUDIES (`/case-studies`)
**Narrative job:** Provide deep, credible proof that drives purchase confidence. This is the evidence library.

**Primary keyword:** `enterprise website case studies`

**SECTION: Hero with Outcomes**
- Headline: Must include "case studies." Lead with aggregate impact metrics.
- Sub-text: Frame the case library as evidence of repeatable results, not one-off wins.

**SECTION: Filters**
- Keep and improve: filter by industry, service type, company size, or outcome metric.
- Ensure filters are discoverable and the default view shows the strongest cases first.

**SECTION: Case Cards (Expanded)**
- Each case MUST use a structured format — no more thin summary cards:
  - **Client type:** Industry, company size, stage (anonymised is fine but specific).
  - **Challenge:** 2-3 sentences on the business problem.
  - **Intervention:** What Ingenium did — specific services, systems deployed, approach.
  - **Metrics:** Before and after, with timeframe. Dashboard-style display. Include:
    - Conversion metrics (for marketing personas).
    - Pipeline/revenue metrics (for sales personas).
    - Cycle time, deal velocity, win rate (for sales directors).
    - CAC payback, retention, velocity (for CEOs).
    - Stack context and deployment model (for CTOs).
  - **Timeframe:** How long the engagement lasted, when results materialised.
  - **Stack:** Technologies involved (for CTO confidence).
- Offer downloadable full case study PDF for each (secondary CTA).
- **Persona notes:**
  - *Marketing Director:* Needs campaign-level detail on what was changed.
  - *Sales Director:* Must include cycle-time, win-rate, and deal-velocity data.
  - *CEO (SaaS):* Needs board-level outcomes: CAC payback, velocity, retention.
  - *CEO (Enterprise):* Org-level change and adoption metrics.
  - *CEO (Regulated):* Regulated examples with risk controls mentioned.
  - *CTO:* Stack context and deployment model.
  - *Product Manager:* Before/after journey maps, iteration mechanics.

**SECTION: Final CTA Band**
- Primary: "Book a Strategy Call."
- Secondary: "Download the Full Case Pack" — all cases in one PDF.

---

### PAGE: SECURITY (`/security`)
**Narrative job:** Provide enterprise-grade security and compliance assurance. This page must satisfy CTOs, procurement teams, and regulated industry decision-makers.

**Primary keyword:** `enterprise website security and governance`

**SECTION: Hero / Compliance Overview**
- Headline: Must include "security" and "governance." Position as enterprise-ready with specific compliance frameworks referenced.
- Visual: Compliance badge cluster — SOC 2, GDPR, ISO references, and any relevant certifications. Use visual tiles, not a text list.

**SECTION: Security Controls**
- Go deeper than surface claims. Include:
  - Data encryption standards (at rest and in transit).
  - Access control model (RBAC, SSO, MFA).
  - Infrastructure architecture summary (hosting, isolation, redundancy).
  - Incident response posture summary.
  - Data residency and sovereignty statement.
- **Persona notes:**
  - *CTO:* Currently too high-level — needs architecture diagrams, identity model specifics, operational SLAs, observability model.
  - *CEO (Regulated):* Needs deep compliance artifacts: control mappings, architecture diagrams, residency statements.

**SECTION: AI Governance**
- Policy and approval lifecycle diagram: how AI outputs are governed, who approves, audit trail mechanics, data handling controls.
- Address regulated industry concerns: data retention, model training data policies, output monitoring.
- **Persona notes:**
  - *CEO (Regulated):* This section is critical — insufficient depth loses this buyer completely.

**SECTION: Final CTA Band**
- Primary: "Book a Strategy Call."
- Secondary: "Request a Security Review Pack" — dedicated procurement/security CTA.
- Tertiary: "Book a Technical Architecture Call" — for CTOs who want to evaluate before procurement.

---

### PAGE: ABOUT (`/about`)
**Narrative job:** Build human trust and partner credibility. Show how Ingenium operates, not just what it sells.

**Primary keyword:** `enterprise website consulting team`

**SECTION: Hero**
- Headline: Position the team as enterprise specialists with operational depth.
- Visual: Team or office imagery (if available) with a techy, professional treatment.

**SECTION: How We Work**
- Add operating cadence: communication rhythm, reporting frequency, escalation paths, accountability model.
- Frame as "this is what it's like to work with us" — reduce uncertainty for first-time buyers.
- **Persona notes:**
  - *CEO (Enterprise):* Needs engagement governance details and executive steering cadence.
  - *Product Manager:* Wants to see prioritisation framework and iteration methodology.

**SECTION: Global Reach**
- Keep and add delivery model specifics: time zones covered, team structure, onshore/offshore mix if relevant.
- **Persona notes:**
  - *CEO (Enterprise):* Cross-regional rollout governance matters for global companies.

**SECTION: Final CTA Band**
- Segment by buyer type:
  - "Book a Strategy Call" — for marketing/sales leadership.
  - "Request a Technical Review" — for CTOs.
  - "Request a Security Pack" — for procurement/compliance.

---

### PAGE: CONTACT (`/contact`)
**Narrative job:** Convert intent into conversation with minimum friction. This page must serve high-intent visitors AND curious first-timers.

**Primary keyword:** `website strategy consultation`

**SECTION: Hero + Expectations**
- Headline: Clear call to action. "Let's Talk About Your Growth."
- Expectations block: What happens after you submit (response time SLA, what the first call covers, no commitment language). This reduces anxiety and increases form completion.
- **Persona notes:**
  - *UI/UX Designer:* Expectations reduce uncertainty — this is good UX. Keep and strengthen.

**SECTION: Progressive Form**
- **Step 1 (always visible):** Name, email, "What's your biggest growth challenge?" (dropdown: Website conversion, CRM/pipeline, Automation, AI operations, Security review, Other).
  - Submit button: "Get Started" — low commitment language.
- **Step 2 (post-submit or follow-up):** Company size, current tech stack, timeline, budget range, specific goals.
  - This step can be inline (expanding after step 1 submit), a follow-up email, or a scheduling page.
- Form design: Clean, spacious, with visual confidence markers (security badge, response time promise).
- **Persona notes:**
  - *Marketing Director:* High-friction forms lose first-touch visitors — step 1 must be effortless.
  - *Sales Executive:* Too many fields for a curious rep — short form first.
  - *UI/UX Designer:* Split into short qualification + detailed follow-up. Progressive disclosure is essential.
  - *CEO (Enterprise):* Provide enterprise procurement path option (separate from strategy call).
  - *CEO (Regulated):* Add security/procurement-specific route option.
  - *CTO:* Include option for technical architecture call.

**SECTION: Contact Details**
- Keep standard contact details: email, phone (if applicable), office locations.
- Add response SLA: "We respond within [X] business hours."

**SECTION: Final CTA Band**
- Alternative paths for visitors not ready to fill out the form:
  - "View Our Case Studies" — link to `/case-studies`.
  - "Download Our Security Pack" — for procurement.
  - "Explore Our Platform" — for technical evaluators.

---

## NET-NEW SEO PAGES TO BUILD

These pages capture high-intent search queries currently missing from the site architecture. Each page is a dedicated landing page optimised for one keyword cluster:

1. **`/enterprise-web-design-agency`** — Money page. Highly commercial. Duplicate and expand the `/websites` conversion narrative with a focus on "enterprise web design agency" as the primary keyword. Include pricing framework, comparison to alternatives, and strong proof.

2. **`/b2b-website-redesign-cost`** — Decision-stage content. Build a pricing framework or interactive calculator. Target: "website redesign cost," "average cost of website redesign," "enterprise website redesign cost." Include scope tiers, what affects pricing, and ROI framework.

3. **`/conversion-rate-optimization-services`** — CRO authority page. Target: "conversion rate optimization agency," "cro agency for b2b," "conversion optimization consulting." Detail methodology, case evidence, and offer page structure.

4. **`/revops-consulting-services`** — RevOps demand capture. Target: "revops consulting," "revenue operations consulting." Detail the RevOps methodology, CRM + automation integration, and pipeline attribution approach.

5. **`/crm-migration-services`** — Migration-specific intent. Target: "crm migration services," "crm implementation consulting." Detail the migration process, risk controls, timeline, and proof.

6. **`/lead-routing-automation`** — Workflow-specific intent. Target: "lead routing automation," "lead routing automation software." Show routing logic, speed benchmarks, integration with CRM, and governance.

7. **`/ai-agents-for-sales-and-marketing`** — AI ops demand capture. Target: "ai agents for marketing," "ai agents for sales." Detailed use cases, governance model, and measurable outcomes.

8. **`/resources/website-redesign-checklist-enterprise`** — Linkable MOFU asset. Target: "enterprise website redesign checklist." Downloadable PDF + on-page summary. Designed to earn links and capture mid-funnel leads.

---

## 90-DAY SEO EXECUTION SEQUENCE

### Week 1-2: Foundation
- Fix metadata uniqueness and canonicalization across all core pages.
- Implement structured data baseline: Organization, WebSite, BreadcrumbList, Service, FAQPage.
- Validate sitemap and robots.txt.
- Rework page copy for primary keywords and intent alignment using the keyword map above.

### Week 3-6: Commercial Expansion
- Publish net-new BOFU pages: `/enterprise-web-design-agency`, `/revops-consulting-services`, `/crm-migration-services`.
- Expand case studies with structured outcome narratives (challenge → intervention → metrics → timeframe → stack).
- Implement internal linking according to the anchor plan.

### Week 7-12: Content Depth and Iteration
- Publish MOFU resources: `/resources/website-redesign-checklist-enterprise`, `/b2b-website-redesign-cost`.
- Publish remaining net-new pages.
- Track Search Console query movement and refine titles/H2s based on CTR and impressions.
- Iterate pages with high impressions but low CTR first.

### KPI Targets
- +40% non-brand impressions on BOFU service keywords in 90 days.
- +20% average CTR uplift on priority commercial pages.
- Top-20 ranking entry for at least 8 P1/P2 target terms in 120 days.
- Contact page organic conversion rate improvement via reduced form friction and better intent match.

---

## CROSS-PAGE FLOW REQUIREMENTS

1. **Every page has a unique narrative job.** No two pages should feel like the same template with swapped nouns. Vary layouts, visual treatments, and section compositions.
2. **Internal handoff links guide users by intent.** Marketing visitors flow: Home → Websites → Case Studies → Contact. Sales visitors flow: Home → CRM → Automations → Contact. Technical visitors flow: Home → Platform → Security → Contact.
3. **CTA hierarchy is consistent but copy varies by page intent.** The three-tier CTA model applies everywhere, but the specific language changes per page.
4. **Proof compounds across the journey.** Each page adds NEW evidence — no repeating the same proof snippets across multiple pages.

---

## ACCEPTANCE CRITERIA

The rebuild is complete when:
1. Every page has a visually distinct layout — no repetitive near-duplicate templates.
2. Every page has unique metadata (title, description, OG tags, canonical).
3. Every page has a clear primary keyword target with on-page optimisation executed.
4. Proof depth is measurable: every proof element includes client type, metric, timeframe, and intervention.
5. Contact friction is reduced: two-step progressive form is implemented.
6. Three-tier CTA ladder is present on every page with page-specific copy.
7. Role-based conversion paths exist for marketing, sales, and technical buyers.
8. Structured data is implemented on all applicable pages.
9. Core Web Vitals targets are met: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1.
10. Internal linking follows the keyword-rich anchor plan.
11. Net-new SEO pages are built and indexed.
12. Typography and color scheme reflect the clean, techy, premium direction specified above.
