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
- Contact flow: in-site progressive form component in `app/(website)/contact/ContactForm.tsx`

The website no longer reads page content blocks from the Ingenium portal.

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
