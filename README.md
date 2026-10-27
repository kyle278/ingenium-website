# Ingenium Website

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Current Architecture

- Framework: Next.js App Router
- Styling: Tailwind CSS + `app/globals.css`
- Content model: mostly static in-code route content, with `/projects` now read from the Portal published project feed
- Form flow: standard lead forms are real HTML forms with `method="post"` and `data-ingenium-submit="portal"`, resolved by canonical Portal slugs
- Tracking flow: root layout loads the hosted production tracker from `https://portal.ingeniumconsulting.net/ingenium-tracker.js` and initializes it against the production event ingest path

The website keeps most page content static in code, while the hosted tracker owns analytics delivery and standard form submission into Ingenium Portal. The `/projects` library is now portal-backed and resolves published project records from the configured site feed.

## Portal Tracker Config

The default production tracker config lives in `lib/portalIntegration/public.ts`:

```bash
PORTAL_ORIGIN=https://portal.ingeniumconsulting.net
PORTAL_SITE_ID=13f9d31e-022c-4fd6-83bb-39cd1a51a85e
```

If the website is reassigned to a different Portal site, update the `PORTAL_SITE_ID` string in that file before deployment.

## Canonical Form Setup

Before the tracked forms can resolve in Portal, create or update the matching `website_forms` rows:

- SQL upsert: `supabase/snippets/website_forms_contact_upsert.sql`
- SQL upsert: `supabase/snippets/website_forms_website_project_brief_upsert.sql`

The frontend now uses `data-form-slug` on the real `<form>` element, so the Portal `website_forms.slug` rows must exist and stay aligned with:

- `contact`
- `website-project-brief`

## Key Route Files

- Home: `app/(website)/page.tsx`
- Services: `app/(website)/*/page.tsx`
- Team: `app/(website)/team/page.tsx`
- Projects: `app/(website)/projects/page.tsx` and `app/(website)/projects/[slug]/page.tsx`
- Shared layout/nav/footer: `app/(website)/layout.tsx`

## Website Template Gallery

The industry gallery lives at `/projects#templates`. Add approved examples to
`lib/website-templates.ts` and their real website screenshots to
`public/template-previews/`. Each entry needs a stable ID, industry ID, title,
description, screenshot path and HTTPS website URL. Industries with no entries
show a coming-soon state. Three clearly labelled fictional demo mockups are
temporarily included for testing the two-free-preview flow: Cleaning,
Landscaping and Carpentry. Their noindex routes live at
`/template-previews/{industry}`. Replace them when approved links are supplied.

Visitors can open two distinct templates before the third prompts for their
name and email on step one, then privacy acknowledgement and optional marketing
consent on step two. Reopening either free preview does not
consume another view. Access is remembered in this browser, with an in-memory
fallback if browser storage is blocked. Browser access storage contains only
template IDs and an unlock flag, never contact details.

The dedicated Portal `template-gallery` form (Website Template Access) and the
existing `/api/enquiry` receipt flow handle access requests with intent
`template-gallery-access`. Its deployed configuration is saved in
`supabase/snippets/website_forms_template_gallery.json`. Explored industries and template titles
are included in enquiry notes (`message`, `biggest_growth_challenge` and
`additional_goals`) as well as dedicated interest fields. Marketing consent is
optional and unchecked. Access unlocks only after an accepted submission receipt. This is a
visitor interest prompt rather than authentication or protection of public URLs.

The gallery release was deployed on top of production commit `0436a684` to
preserve its managed SEO integration; the current local branch predates that
integration. Preserve production's managed metadata imports when moving the
gallery change to another branch. Automated gate, validation, failure and
attribution tests pass. A live browser test verified two free views, the third
preview gate after reload, no submission from step one, required privacy,
optional marketing declined, an accepted Portal receipt and the resulting
Ingenium CRM lead. Test submission: `cb10c02e-3ee7-4577-80ea-138ab7721a7a`;
form: `d81927e8-6a55-4f0c-91b6-ea25397a7ab8`. The clearly labelled TEST lead
is retained as verification evidence.

## Portal Project Feed

Published project pages now resolve from:

```bash
GET https://portal.ingeniumconsulting.net/api/websites/projects?site_id=13f9d31e-022c-4fd6-83bb-39cd1a51a85e
```

The detail route reads the same endpoint with `&slug=...`. Only fields explicitly allowlisted in the Portal project `Website` tab will render on this site.

## Design Standards

UI and UX implementation standards are defined in:

- `AGENTS/DesignLanguage.md`

Use that file as the source of truth for visual system, layout, motion, and component decisions.
