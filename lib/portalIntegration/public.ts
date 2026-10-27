export const PORTAL_ORIGIN = "https://portal.ingeniumconsulting.net";

// Update this string if the website is reassigned to a different Portal site.
export const PORTAL_SITE_ID = "13f9d31e-022c-4fd6-83bb-39cd1a51a85e";
// Existing public Portal registrations keep reporting stable across form edits.
export const PORTAL_FORM_IDS: Record<string, string> = {
  contact: "7fecbdb3-b9b6-4470-b454-b43cfec65214",
  "starter-website": "47970b3e-9210-44ed-8fb4-0aebf6b5bcaa",
  "template-gallery": "d81927e8-6a55-4f0c-91b6-ea25397a7ab8",
  "website-project-brief": "b8c5be61-a58e-4c0f-93fb-5f3f63ecf63a",
};

export const PORTAL_TRACKING_ENDPOINT = `${PORTAL_ORIGIN}/api/websites/tracking/events`;
export const PORTAL_FORM_SUBMIT_ENDPOINT = `${PORTAL_ORIGIN}/api/websites/forms/submit`;
export const PORTAL_PROJECTS_ENDPOINT = `${PORTAL_ORIGIN}/api/websites/projects`;

export const PORTAL_CONSENT_VERSION = "2026-05-07";
