# Ingenium Website Design Language

- Version: 2.0
- Scope: UI and UX standards for all marketing pages in this repository.
- Goal: Keep agent-generated interfaces visually and structurally consistent with the live Ingenium website.

## 1. Product Aesthetic

This site is a dark, enterprise marketing system with technical credibility.

Core traits:
- Dark slate surfaces with emerald primary actions.
- Cyan as secondary signal color for data, flow, and technical accents.
- High-contrast type hierarchy with monospace data treatment.
- Modular card-based composition with strong borders and subtle glow, not heavy shadows.
- Conversion-first section flow: proof, system clarity, governance, then CTA.

This is not:
- Soft light SaaS dashboard UI.
- Minimal monochrome editorial style.
- Generic startup pastel landing pages.

## 2. Canonical Tokens

Source of truth: [`app/globals.css`](/c:/Users/kyler/Desktop/Projects/ingenium-website/app/globals.css)

```css
:root {
  --color-brand: #10B981;
  --color-brand-light: #34D399;
  --color-brand-dark: #059669;
  --color-accent: #06B6D4;
  --color-accent-light: #22D3EE;

  --color-surface-dark: #0F172A;
  --color-surface-darker: #020617;
  --color-surface-card: rgba(15, 23, 42, 0.6);
  --color-surface-light: #F8FAFC;
  --color-surface-white: #FFFFFF;

  --color-text-primary: #F8FAFC;
  --color-text-secondary: #94A3B8;
  --color-text-muted: #64748B;
  --color-text-dark: #0F172A;
  --color-text-dark-secondary: #475569;

  --motion-ease-out: cubic-bezier(0.22, 1, 0.36, 1);
}
```

Tailwind equivalents used across pages:
- Page canvas: `bg-slate-950`
- Primary dark card: `border-slate-800 bg-slate-900/40` to `bg-slate-900/80`
- Body text: `text-slate-400`
- Secondary text: `text-slate-500` or `text-slate-600`
- Primary action: `bg-emerald-600 hover:bg-emerald-500 text-white`
- Secondary action: `border-slate-700 text-slate-300`
- Data accent: `text-cyan-400`

## 3. Typography System

Source of truth: [`app/layout.tsx`](/c:/Users/kyler/Desktop/Projects/ingenium-website/app/layout.tsx)

Font stack roles:
- Display/headings: `Space Grotesk` via `--font-display`
- Body/UI copy: `Inter` via `--font-body`
- Data/meta/metrics: `JetBrains Mono` via `--font-mono`

Required hierarchy:
- Section label: `font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400`
- H1 hero: `font-(--font-display) text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight text-white`
- H2 section title: `font-(--font-display) text-2xl sm:text-3xl font-bold tracking-tight text-white`
- Body lead: `text-lg leading-relaxed text-slate-400`
- Regular body: `text-sm` to `text-base` in `text-slate-300` or `text-slate-400`
- Metrics: use `.metric-display` and tabular numerals

## 4. Layout and Spacing

Source of truth: [`app/(website)/layout.tsx`](/c:/Users/kyler/Desktop/Projects/ingenium-website/app/(website)/layout.tsx)

Global container:
- Main wrapper: `mx-auto max-w-7xl px-4 sm:px-6`
- Vertical shell spacing: `pt-12 md:pt-20 pb-24`

Page rhythm:
- Default page stack: `space-y-28 md:space-y-36` or `md:space-y-40`
- Smaller pages: `space-y-24 md:space-y-28`

Grid patterns used repeatedly:
- Split hero/content: `lg:grid-cols-[1.1fr,0.9fr]` or close variant
- Balanced two-column: `lg:grid-cols-2`
- Multi-card strip: `sm:grid-cols-2 lg:grid-cols-3` or `lg:grid-cols-4`

## 5. Surface, Borders, and Radius

Default dark card pattern:
- `rounded-2xl border border-slate-800 bg-slate-900/60 p-6`

Allowed radius scale in this project:
- `rounded-lg` for buttons and compact controls
- `rounded-xl` for dense cards
- `rounded-2xl` as default content card
- `rounded-3xl` for major CTA and hero callout blocks
- `rounded-full` only for pills/badges or deliberate button variant

Depth style:
- Prefer border + translucent surface over bright drop shadows.
- Use `shadow-emerald-600/20` only for primary CTA emphasis.
- Reuse utilities: `.glass-card`, `.brand-glow`, `.metric-card`.

## 6. Motion and Interaction

Source of truth: [`app/globals.css`](/c:/Users/kyler/Desktop/Projects/ingenium-website/app/globals.css), [`ScrollReveal.tsx`](/c:/Users/kyler/Desktop/Projects/ingenium-website/app/(website)/components/ScrollReveal.tsx), [`AnimatedMetric.tsx`](/c:/Users/kyler/Desktop/Projects/ingenium-website/app/(website)/components/AnimatedMetric.tsx)

Required interaction primitives:
- `.cta-lift` for primary and secondary interactive controls.
- `.metric-card` for hover-lifted proof/metric cards.
- `.faq-chevron` for accordion state affordance.
- `.timeline-step` + `.timeline-dot` + `.timeline-line` for process flows.
- `.data-flow-dot` pulse only where data flow is being visualized.

Motion defaults:
- Easing: `var(--motion-ease-out)` (`cubic-bezier(0.22, 1, 0.36, 1)`).
- Use 220-340ms transitions for micro-interactions.
- Stagger section child reveals with 40-80ms increments.

Accessibility and performance motion rules:
- Respect `prefers-reduced-motion`.
- Skip reveal/count-up animation on small screens and reduced-motion users.

## 7. Reusable Visual Motifs

Use these motifs intentionally (not everywhere):
- `.dot-grid` for dark data/proof sections and gradient CTA bands.
- `.grid-lines` for architecture, governance, and structured technical areas.
- Ambient blurred blobs from layout should remain background-only and non-interactive.

## 8. Component Patterns

### 8.1 Navigation
Source: [`SiteNav.tsx`](/c:/Users/kyler/Desktop/Projects/ingenium-website/app/(website)/components/SiteNav.tsx)

- Sticky top nav with translucent slate backdrop and border.
- Desktop active-item indicator bar behind active link.
- Mobile full-screen drawer with clear CTA.
- Always include a right-side conversion CTA to `/contact`.

### 8.2 CTA Buttons

Primary CTA baseline:
```html
<Link class="cta-lift inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 hover:bg-emerald-500">
```

Secondary CTA baseline:
```html
<Link class="cta-lift inline-flex items-center gap-2 rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 hover:border-slate-600 hover:text-white">
```

Tertiary CTA baseline:
```html
<Link class="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300">
```

### 8.3 Metric and Proof Blocks

- Metric number uses `.metric-display`.
- Supporting context in `text-[10px]` to `text-xs` monospace muted label.
- Proof cards must include context (client type, timeframe, or scope), not just a number.

### 8.4 Forms
Source: [`ContactForm.tsx`](/c:/Users/kyler/Desktop/Projects/ingenium-website/app/(website)/contact/ContactForm.tsx)

- Dark input surface: `border-slate-700 bg-slate-800/60`.
- Focus treatment: emerald border/ring.
- Progressive step pattern:
  - Step indicator bar.
  - Short first step (name/email/challenge).
  - Optional detailed second step.

### 8.5 FAQ
Source: [`FaqAccordion.tsx`](/c:/Users/kyler/Desktop/Projects/ingenium-website/app/(website)/components/FaqAccordion.tsx)

- Single-open accordion by default.
- Compact dark row cards with clear chevron state.
- Preserve readable answer line-height.

## 9. Page Composition Rules

When creating or revising pages, keep this section architecture:

1. Hero with explicit positioning statement + dual CTA.
2. Immediate proof (metric strip, proof chip, or dashboard card).
3. System/process clarity section (flow, timeline, lifecycle, architecture).
4. Role-based or function-based breakdown.
5. Governance/trust section where relevant.
6. Final high-contrast CTA band.

Additional mandatory behavior:
- Every page should feel distinct in layout composition, while using the same token system.
- Do not duplicate identical card-grid structure across all sections.
- Keep CTA ladder visible: primary, secondary, tertiary intent paths.

## 10. Content and Tone Rules for UI Copy

- Voice: precise, technical, outcome-first.
- Avoid vague design language like "beautiful", "modern", "innovative".
- Prefer measurable phrasing: time-to-action, conversion lift, response speed, governance coverage.
- Include stakeholder relevance: marketing, sales, technical/security.

## 11. Static Content Implementation Rules

For route pages in this codebase:
- Keep section copy in explicit local constants at the top of each route file.
- Do not introduce runtime CMS/content-block fetches for primary page copy.
- Keep route metadata (`title`, `description`, canonical, Open Graph) aligned with the visible page narrative.
- Keep nav/footer content centralized in [`app/(website)/layout.tsx`](/c:/Users/kyler/Desktop/Projects/ingenium-website/app/(website)/layout.tsx).
- When editing copy, update both section content and related CTA/link labels in the same pass.

## 12. Accessibility Requirements

- Minimum contrast: body text must remain readable on dark slate surfaces.
- Interactive controls require visible hover and keyboard focus states.
- Touch targets should be at least 40px high.
- Icons must not be the only signal for meaning (include text labels).
- Keep semantic heading order (`h1` once per page, then descending structure).

## 13. Deterministic Build Checklist for Agents

Before finalizing UI work, verify:

1. Uses existing fonts (`--font-display`, `--font-body`, `--font-mono`).
2. Uses project palette (emerald primary, cyan secondary, slate surfaces).
3. Uses dark card + border pattern (not light dashboard cards).
4. Includes at least one proof metric module with context.
5. Uses `cta-lift` on major CTA controls.
6. Preserves responsive behavior for mobile and desktop.
7. Respects reduced-motion behavior.
8. Keeps page copy and metadata static and synchronized after edits.

## 14. Do and Do Not

Do:
- Use emerald as primary action color.
- Use monospace for metrics, labels, and system-style metadata.
- Use borders and subtle translucency for depth.
- Use section labels with uppercase monospace treatment.

Do not:
- Reintroduce light "soft CRM" canvas/card styling.
- Use purple/pink gradient as primary brand direction.
- Use heavy drop shadows or glossy neumorphism.
- Create flat pages without proof, system clarity, or conversion paths.
