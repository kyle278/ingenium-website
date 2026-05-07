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
- Content model: static in-code fallback objects per route page
- Form flow: standard lead forms are real HTML forms with `method="post"` and `data-ingenium-submit="portal"`, resolved by canonical Portal slugs
- Tracking flow: root layout loads the hosted production tracker from `https://portal.ingeniumconsulting.net/ingenium-tracker.js` and initializes it against the production event ingest path

The website keeps page content static in code, while the hosted tracker owns analytics delivery and standard form submission into Ingenium Portal.

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

## Design Standards

UI and UX implementation standards are defined in:

- `AGENTS/DesignLanguage.md`

Use that file as the source of truth for visual system, layout, motion, and component decisions.
