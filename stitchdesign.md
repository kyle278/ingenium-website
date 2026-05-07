# Design System Specification: Editorial Precision

 

## 1. Overview & Creative North Star

### The Digital Curator

This design system is built on the philosophy of **The Digital Curator**. In a world of cluttered B2B dashboards, we represent the calm, authoritative voice of high-level consulting and elite SaaS. We move beyond "standard" enterprise UI by treating every layout like a premium editorial spread.

 

The system breaks the "template" look through **intentional asymmetry** and **tonal depth**. Rather than rigid grids, we use breathing room as a functional element to guide the eye. We prioritize sophisticated, layered surfaces over flat containers, ensuring the interface feels like a bespoke architectural space designed for efficiency and growth.

 

---

 

## 2. Colors

Our palette is a study in restrained power. It utilizes a deep navy foundation punctuated by electric accents and a sophisticated neutral scale.

 

### The "No-Line" Rule

**Borders are a failure of hierarchy.** 1px solid borders for sectioning are strictly prohibited. Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section sitting on a `surface` background provides all the definition a professional eye needs.

 

### Surface Hierarchy & Nesting

Treat the UI as physical layers of fine paper or frosted glass.

*   **Base:** `surface` (#f7fafe)

*   **Depth Level 1:** `surface-container-low` (#f1f4f8) – used for large background content blocks.

*   **Depth Level 2:** `surface-container` (#ebeef2) – used for standard card backgrounds.

*   **Depth Level 3:** `surface-container-highest` (#e0e3e7) – used for interactive elements or emphasized information.

*   **Elevation:** `surface-container-lowest` (#ffffff) – used for primary interactive cards to create a "lifted" feel against the tinted background.

 

### The Glass & Gradient Rule

To achieve "soul" in a digital environment:

*   **Glassmorphism:** Use `surface` colors at 70-80% opacity with a `backdrop-blur` of 12px-20px for floating navigation or modal overlays.

*   **Signature Gradients:** For primary CTAs, use a subtle linear gradient from `primary` (#0057bf) to `primary_container` (#006fef). This adds a tactile, three-dimensional quality that flat hex codes cannot replicate.

 

---

 

## 3. Typography

We utilize **Inter** as our typographic backbone, chosen for its architectural precision and superior readability at all scales.

 

*   **Display (lg/md/sm):** High-impact, low-kerning headlines. Use `on_surface` (#181c1f) with a slight letter-spacing of -0.02em to create an authoritative "Editorial" look.

*   **Headlines & Titles:** These are the anchors. Use `headline-lg` (2rem) for section intros. Always ensure generous line-height (1.4 - 1.5) to maintain the feeling of "Modern Luxury."

*   **Body (lg/md/sm):** Our workhorse. `body-lg` (1rem) is the default for readability. For secondary information, `body-md` (#414755) provides necessary tonal contrast.

*   **Labels:** Use sparingly. These should be `label-md` or `label-sm` in all-caps with +0.05em tracking to denote technical data or small metadata chips.

 

---

 

## 4. Elevation & Depth

Depth in this system is achieved through **Tonal Layering**, not structural lines.

 

### The Layering Principle

Stacking tiers is the primary method of organization. Place a `surface-container-lowest` card on a `surface-container-low` section. The change in hex value creates a soft, natural lift.

 

### Ambient Shadows

Shadows must be "Ambient," mimicking natural light.

*   **X: 0, Y: 4px, Blur: 24px, Spread: 0**

*   **Color:** Use the `on_surface` color at 4% to 6% opacity. Never use pure black or dark grey; the shadow should feel like a soft tint of the background it sits on.

 

### The "Ghost Border" Fallback

If accessibility requirements demand a border, use the **Ghost Border**: `outline-variant` (#c1c6d7) at 15% opacity. High-contrast, 100% opaque borders are strictly forbidden as they break the editorial flow.

 

---

 

## 5. Components

 

### Buttons

*   **Primary:** Solid `primary` gradient, `on_primary` text. Roundedness: `md` (0.375rem).

*   **Secondary:** `surface-container-highest` background with `primary` text. No border.

*   **Tertiary:** Transparent background, `primary` text, underlined only on hover.

 

### Cards

*   **Style:** No borders. Use `surface-container-lowest` (#ffffff) on a `surface` background.

*   **Spacing:** Minimum 32px (2rem) internal padding.

*   **Interaction:** On hover, shift background to `surface-container-high` or increase Ambient Shadow opacity from 4% to 8%.

 

### Input Fields

*   **Base:** `surface-container-low` background. 

*   **Focus:** Transition background to `surface-container-lowest` and apply a 2px `surface_tint` Ghost Border.

*   **Error:** Use `error` (#ba1a1a) text for helper messages, but keep the input box subtle to avoid "shouting" at the user.

 

### Strategic Components

*   **The Tonal Section:** Use a full-width `on_secondary_fixed` (#111b2e) block for high-authority "Trust" sections (e.g., testimonials or global stats), using `on_primary_fixed` for typography.

*   **Process Steppers:** Use `tertiary` (#006766) and `tertiary_fixed` (#7df5f4) to denote progress, utilizing horizontal "breathing room" rather than connecting lines.

 

---

 

## 6. Do's and Don'ts

 

### Do

*   **Do** use asymmetrical layouts where text is offset from imagery to create visual interest.

*   **Do** prioritize vertical whitespace. If you think there is enough space, add 16px more.

*   **Do** use `primary` and `tertiary` accents to draw the eye to "Growth" metrics.

*   **Do** use high-quality, professional photography with a cool-toned color grade to match the Navy palette.

 

### Don't

*   **Don't** use 1px solid borders to separate list items. Use 16px of vertical space or a 4% tint shift.

*   **Don't** use "Standard Blue" for shadows. Always tint the shadow with the surface it's cast upon.

*   **Don't** crowd the interface. If a screen feels "busy," move secondary information into a "Glassmorphic" slide-over panel.

*   **Don't** use sharp 90-degree corners. Stick to the `md` (0.375rem) or `lg` (0.5rem) roundedness scale to keep the brand feeling "Accessible."