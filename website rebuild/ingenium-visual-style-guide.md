# Ingenium Consulting — Visual Style Guide

> This guide translates Ingenium Consulting’s brand identity into website design, interface patterns, and visual system rules.

## 1. Design Principles

- Friendly, approachable, and polished
- Connected systems made simple
- Data-driven clarity with human-first language
- Confident technical quality without cold complexity
- Fast, modern SaaS presentation with warm accents

## 2. Brand Color System

### Core Palette
| Purpose | Color | Hex | Usage |
|---------|-------|-----|-------|
| Primary | Ingenium Blue | #1767C3 | Primary CTA buttons, links, headings |
| Secondary | Teal Connect | #13B7A8 | Secondary actions, badges, highlights |
| Accent | Warm Amber | #F5A623 | Micro-interactions, notifications, emphasis |
| Background | Paper | #FAFBFD | Page backgrounds |
| Surface | Surface | #F1F5F9 | Cards, panels, sections |
| Text Primary | Text Primary | #14243D | Headings, body text |
| Text Secondary | Text Secondary | #55647B | Captions, meta text |
| Border | Divider | #D9E2EC | Dividers, form borders |

### Usage Guidelines
- Use `#1767C3` for primary CTAs, active links, and important headings.
- Reserve `#13B7A8` for supportive actions, status badges, and success confirmations.
- Use `#F5A623` sparingly as a friendly accent to draw attention to key actions and highlights.
- Keep backgrounds light and open; use `#FAFBFD` and `#F1F5F9` to create layered sections.
- Use `#14243D` for primary text and `#55647B` for secondary or muted copy.

### Contrast / Accessibility
- Primary buttons on white should meet at least AA contrast.
- Always use dark text on light backgrounds for readability.
- Use colored badges and inputs with strong contrast and clear states.

## 3. Typography System

### Font Family
- Heading / Body: `Inter`, `system-ui`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif`

### Scale
| Element | Desktop | Mobile | Weight | Line Height |
|---------|---------|--------|--------|-------------|
| H1 | 52px | 38px | 700 | 1.1 |
| H2 | 36px | 30px | 700 | 1.2 |
| H3 | 28px | 24px | 600 | 1.3 |
| H4 | 22px | 20px | 600 | 1.35 |
| Body | 16px | 16px | 400 | 1.6 |
| Body Large | 18px | 18px | 500 | 1.6 |
| Caption | 14px | 14px | 400 | 1.5 |

### Copy Tone
- Use short, direct headlines.
- Keep paragraph copy concise and outcome-focused.
- Use friendly phrasing: `you`, `your team`, `grow faster`, `stay connected`.
- Avoid jargon unless it helps explain the product clearly.

## 4. Layout & Spacing

### Grid
- Use a 12-column responsive grid for desktop layouts.
- Keep content centered with generous side padding on desktop.
- Use full-width sections for hero, feature callouts, and visuals.

### Spacing Scale
| Token | Value | Usage |
|-------|-------|-------|
| xs | 8px | Tight spacing, inline elements |
| sm | 16px | Form fields, small gaps |
| md | 24px | Standard card padding, section spacing |
| lg | 40px | Major section spacing |
| xl | 64px | Full section separation |

### Layout Patterns
- Hero panels with strong left-aligned headline + right-side product preview or illustration.
- Feature cards in 2–3 columns on desktop, single column on mobile.
- Use alternating surface tones for content sections.
- Keep navigation simple, sticky, and unobtrusive.

## 5. UI Components

### Buttons
| Variant | Background | Text | Border | Radius | Use case |
|---------|------------|------|--------|--------|----------|
| Primary | #1767C3 | #FFFFFF | none | 10px | Main CTA, submit action |
| Secondary | transparent | #1767C3 | 1px solid #1767C3 | 10px | Secondary actions |
| Accent | #F5A623 | #14243D | none | 10px | Preferred action, friendly prompt |
| Ghost | transparent | #55647B | 1px solid #D9E2EC | 10px | Low-priority links |

### Cards
- Background: #FFFFFF
- Border: 1px solid #D9E2EC
- Shadow: subtle drop shadow for depth
- Radius: 18px
- Padding: `md` / `lg`

### Forms
- Input background: #FFFFFF
- Border: 1px solid #D9E2EC
- Radius: 12px
- Focus ring: 2px solid #13B7A8 or shadow
- Label color: #14243D
- Helper text: #55647B

### Navigation
- Transparent header on hero; solid surface after scroll.
- Primary nav links: #14243D
- Callout button in nav: #1767C3
- Mobile menu: clean stacked items with generous touch spacing.

### Status & Badges
- Success: #22C55E on white
- Info: #3B82F6 on white
- Accent badge: #13B7A8 background with white text

### Iconography
- Style: outlined stroke icons, rounded corners, 24px grid.
- Stroke weight: 1.5px to 2px.
- Use brand colors for interactive icons; otherwise use `#55647B`.

## 6. Visual Patterns

### Hero Section
- Large headline on the left, supportive description underneath.
- Right side: product UI preview or connection diagram.
- Primary CTA + secondary ghost CTA.
- Trust statement or mini stat line below.

### Feature Section
- 3–4 horizontal cards with icon, title, short benefit.
- Use subtle surface backgrounds and brand accent highlights.
- Keep copy outcome-oriented: `Capture leads instantly`, `Automate follow-up`, `Measure growth with AI`.

### Workflow / Connection Diagram
- Show `Website → CRM → Marketing → AI` as a connected flow.
- Use node lines, circles, or cards to display system handoff.
- Keep visuals light and easy to understand.

### Dashboard Preview
- Use a realistic dashboard card with metric highlights.
- Include sample charts, lead counts, campaign stats.
- Use `#13B7A8` and `#F5A623` for important values.

### Testimonials / Social Proof
- Card-based quotes with customer name and role.
- Use subtle shadows and `#F1F5F9` surfaces.
- Add small logos or results callouts when possible.

## 7. Imagery & Illustration

### Photography
- Use natural light, collaborative scenes, business teams, digital work.
- Prefer images with warm, trustworthy tones.
- Avoid moody or overly abstract high-tech imagery.

### Illustrations
- Use clean line or simple flat illustrations.
- Keep brand palette limited to two or three core colors.
- Include connection motifs like nodes, links, and flow paths.

### UI Screenshots
- Present real system screens with data-focused dashboards.
- Use consistent border radius and spacing around screenshots.
- Pair screenshots with short benefit captions.

## 8. Motion & Interaction

- Use gentle transitions on hover: `transition: all 180ms ease-out`.
- Button hover states: slightly darker background or shadow lift.
- Card hover states: subtle elevation and border tone change.
- Focus states: clear ring in `#13B7A8` or `#1767C3`.
- Avoid heavy animations; prefer subtle motion that feels professional.

## 9. Accessibility Notes

- Maintain a minimum 4.5:1 contrast for text and active controls.
- Provide visible focus styles on all interactive elements.
- Use semantic HTML for headings, buttons, form controls, and navigation.
- Ensure mobile tap targets are at least 44x44px.
- Keep copy simple and avoid overloaded UI with too many simultaneous actions.

## 10. Implementation Tokens

### Recommended CSS variables
```css
:root {
  --color-primary: #1767C3;
  --color-secondary: #13B7A8;
  --color-accent: #F5A623;
  --color-bg: #FAFBFD;
  --color-surface: #F1F5F9;
  --color-text: #14243D;
  --color-muted: #55647B;
  --color-border: #D9E2EC;
  --radius-sm: 10px;
  --radius-md: 12px;
  --radius-lg: 18px;
  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 24px;
  --space-lg: 40px;
  --space-xl: 64px;
  --font-heading: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```

### Tailwind theme suggestions
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#1767C3',
        secondary: '#13B7A8',
        accent: '#F5A623',
        surface: '#F1F5F9',
        bg: '#FAFBFD',
        text: '#14243D',
        muted: '#55647B',
      },
      borderRadius: {
        sm: '10px',
        md: '12px',
        lg: '18px',
      },
      spacing: {
        xs: '8px',
        sm: '16px',
        md: '24px',
        lg: '40px',
        xl: '64px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
}
```

## 11. Example Page Guidelines

### Homepage
- Hero with clear value message and CTA
- Connected workflow section
- Feature summary cards
- Dashboard preview section
- Testimonials and outcomes
- Final CTA with contact form or demo booking

### Services / Product Page
- Explain `Website + CRM + AI` in simple blocks
- Show capabilities with icons and short descriptions
- Highlight outcomes: faster lead capture, smarter automation, better reporting
- Use supporting visuals of the platform flow

### Contact / Demo Page
- Simple form with friendly copy
- Reinforce the connected CRM advantage
- Use trust and next-step messaging: `Schedule a demo`, `See how it connects`

## 12. Why this system works
- The palette balances confident blue with friendly teal and bright amber.
- The type scale supports strong hierarchy and easy readability.
- The layout system keeps content clean while emphasizing product flow.
- The UI components create a modern, approachable SaaS look.
- The motion guidance keeps the experience polished, not distracting.

> Use this guide as the visual implementation layer for `docs/ingenium-brand-guidelines.md`. The brand guide defines the identity; this document turns it into the website experience.
