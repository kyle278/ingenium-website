# Global Context

## System Purpose
Ingenium website is a Next.js App Router project that sells Ingenium as a unified revenue platform and implementation partner, guarantees durable anonymous analytics identity for Portal reporting, and submits contact intake data into Ingenium Portal through a server-owned integration path.

## Active Domains
- Marketing website pages under `app/(website)`
- Browser tracking runtime via Ingenium tracker script loaded from Portal app
- Browser event ingestion to `${PORTAL_APP_URL}/api/websites/tracking/events`
- Portal submission API under `app/api/portal`
- Portal-backed Supabase data model for form submissions
- Portal auth entrypoints exposed from website navigation via `${PORTAL_APP_URL}/login` and `${PORTAL_APP_URL}/signup`

## Guardrails
- Do not expose service-role Supabase keys in client code.
- Keep browser event tracking delivery pointed to Portal tracking ingestion endpoint.
- Use canonical tracking/linkage IDs consistently: `visitor_id`, `session_id`, `site_id`.
- Use canonical ownership IDs consistently: `organisation_id`, `site_id`, `form_id`.
- Keep contact form UX stable while evolving backend integration.
- Keep canonical tracking payload keys (`utm_*`, `cid`, `submission_url`, `visitor_id`, `session_id`, `site_id`) consistent.
- Keep marketing copy encoding clean and ASCII-safe where possible to prevent mojibake in production UI.
- Do not fall back to DOM ids or slugs as the primary form reporting key when a Portal form UUID is unavailable.

## Current Operational Assumptions
- Tracker script initializes from `PORTAL_APP_URL` and `PORTAL_SITE_ID` passed server-side into the root client bootstrap.
- Website shell auth links and tracker bootstrap both read Portal host configuration through the shared config module rather than direct env access in scattered files.
- Website runtime owns `visitor_id` cookie + `localStorage` sync and `session_id` rotation via `sessionStorage`.
- Browser tracking runtime emits `session_start`, `page_view`, `form_view`, and `scroll_depth` using canonical payload shape and page-scoped resets.
- Public IA now prioritizes platform, acquisition, CRM, AI agents, automation, security, proof, and contact over secondary brochure-style pages.
- Public proof surfaces now use named client work sourced from sibling project folders instead of anonymous placeholder brands.
- Portal form definitions are stored in `public.website_forms`.
- Submissions are written to `public.website_form_submissions`.
- Portal-side trigger handles downstream CRM attribution logic and event processing.
- Contact page resolves the active Portal form by slug and fails explicitly when the canonical Portal form UUID is unavailable.
