# Changelog

This file is mandatory for all tasks.

## Entry Template
- Date:
- Task:
- Categories: `BUG FIX`, `IMPROVEMENT`, `UI CHANGE`, `UX CHANGE`, `FUNCTIONAL CHANGE`, `SECURITY`, `PERFORMANCE`, `DOCUMENTATION`, `PROCESS`
- Summary:
- Impact:
- Key files:
- Review status (only for changelog review mode): `REVIEWED - FIX IMPLEMENTED` | `REVIEWED - PLAN ONLY` | `REVIEWED - NO ISSUE FOUND`
- Review date (only for changelog review mode):
- Review plan (only for changelog review mode): `Agents/Plans/<plan-file>.md`
- Review notes (only for changelog review mode):

---

- Date: 2026-03-03
- Task: Remove portal-driven content wiring, restore static live copy, and add team page
- Categories: `IMPROVEMENT`, `UI CHANGE`, `UX CHANGE`, `FUNCTIONAL CHANGE`, `DOCUMENTATION`
- Summary:
  - Removed website runtime dependencies on Ingenium portal content blocks/forms.
  - Converted marketing routes and layout to static in-repo content values.
  - Added a new `/team` page with member cards, email links, and image placeholders.
  - Replaced portal-based contact flow with a static progressive contact form.
  - Updated design and project docs to match the new static architecture.
- Impact:
  - Website copy now renders directly from code with no portal fetch dependency.
  - Navigation/footer include the new Team route.
  - Contact page remains usable and aligned to the design language without portal configuration.
- Key files:
  - `app/(website)/layout.tsx`
  - `app/(website)/*/page.tsx`
  - `app/(website)/contact/ContactForm.tsx`
  - `app/(website)/team/page.tsx`
  - `app/(website)/components/SiteNav.tsx`
  - `app/(website)/components/SiteFooter.tsx`
  - `app/(website)/components/RouteStructuredData.tsx`
  - `AGENTS/DesignLanguage.md`
  - `README.md`
  - Removed portal files under `src/lib/` and `src/portalconnect.ts`
