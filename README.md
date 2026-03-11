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
- Contact flow: contact page resolves the canonical Portal form UUID server-side and the progressive client form posts to `app/api/portal-form-submit/route.ts`
- Tracking flow: root layout loads `${PORTAL_APP_URL}/ingenium-tracker.js`, then the website runtime guarantees durable `visitor_id`, rotating `session_id`, `page_view`, `form_view`, and `scroll_depth` delivery to `${PORTAL_APP_URL}/api/websites/tracking/events`, with a local bootstrap fallback if the external script fails

The website keeps page content static in code, while form submissions are forwarded to Ingenium Portal.

## Portal Form Integration Env

Set these values in `.env.local`:

```bash
PORTAL_APP_URL=https://<portal-app-host>
PORTAL_SUPABASE_URL=https://<portal-project>.supabase.co
PORTAL_SUPABASE_SERVICE_ROLE_KEY=<portal-service-role-key>
PORTAL_ORGANISATION_ID=<organisation-uuid>
PORTAL_SITE_ID=<website-site-uuid>
PORTAL_DEFAULT_FORM_SLUG=contact
```

The browser does not read these env vars directly. The shared Portal config module reads the public subset server-side and passes it into the client tracker bootstrap and website auth links.

## Canonical Form Setup

Before the contact form can render as a tracked, reportable Portal form, create or update the matching `website_forms` row:

- SQL upsert: `supabase/snippets/website_forms_contact_upsert.sql`
- Query result to retrieve UUID: included at the end of that SQL file

The website requires the real Portal `website_forms.id` UUID at runtime and stamps it into `data-form-id` on the rendered form. It does not fall back to DOM ids or slugs for reporting.

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
