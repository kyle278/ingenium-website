export const NOTICE_VERSION = "2026-09-26";
export const PRIVACY_NOTICE = "I have read the Privacy Policy and acknowledge that Ingenium will use these details to respond to my request.";
export const MARKETING_NOTICE = "I’d like to receive occasional email updates about Ingenium websites and CRM.";
export const SERVICES = ["website", "crm", "connected", "ecommerce", "not-sure"] as const;
export const BUDGETS = ["", "under-2000", "2000-5000", "5000-10000", "10000-plus", "guidance"];
export function validService(value: unknown) { return typeof value === "string" && (SERVICES as readonly string[]).includes(value); }
export function validateEnquiry(input: unknown): string | null {
  if (!input || typeof input !== "object") return "Please complete the enquiry form.";
  const body = input as Record<string, unknown>;
  if (typeof body.request_id !== "string" || !/^[a-f0-9-]{36}$/i.test(body.request_id)) return "Invalid request reference. Please reload the page.";
  if (body.form_slug !== "contact" && body.form_slug !== "website-project-brief" && body.form_slug !== "starter-website") return "This form is not supported.";
  const f = body.fields as Record<string, unknown> | undefined;
  if (!f || typeof f !== "object" || Array.isArray(f) || Object.keys(f).length > 100) return "Please complete the enquiry form.";
  if (Object.values(f).some(v => typeof v !== "string" || v.length > 12000)) return "Please shorten your response.";
  if (typeof f.name !== "string" || f.name.trim().length < 2 || f.name.length > 160) return "Please enter your name.";
  if (typeof f.email !== "string" || f.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) return "Please enter a valid email address.";
  // The starter form shows its privacy line as text, not a checkbox; its own checks live in lib/starter-website.ts.
  if (body.form_slug === "starter-website") return null;
  if (f.privacy_consent !== "true") return "Please acknowledge the Privacy Policy before sending.";
  if (f.marketing_consent !== "true" && f.marketing_consent !== "false") return "Please confirm your marketing preference.";
  if (body.form_slug === "contact") {
    if (!validService(f.service)) return "Please choose what you need help with.";
    if (typeof f.message !== "string" || f.message.trim().length < 10 || f.message.length > 5000) return "Please tell us a little about your project (10–5,000 characters).";
    if (!BUDGETS.includes(String(f.budget_range ?? ""))) return "Please choose a listed budget range.";
    if (f.consent_version !== NOTICE_VERSION || f.consent_text_snapshot !== PRIVACY_NOTICE) return "This form has changed. Reload the page before sending.";
  }
  if (body.form_slug === "website-project-brief") {
    for (const key of ["company", "business_summary", "current_website_status", "primary_goal", "required_pages", "timeline"]) {
      if (typeof f[key] !== "string" || !f[key].trim()) return "Please complete the required website brief details.";
    }
    if (f.accuracy_confirmation !== "true") return "Please confirm the brief is accurate enough for project scoping.";
  }
  return null;
}
export function acceptedReceipt(body: unknown): body is { submission_id: string } {
  if (!body || typeof body !== "object") return false;
  const value = body as Record<string, unknown>;
  return value.accepted !== false && value.ok === true && typeof value.submission_id === "string" && value.submission_id.length > 0;
}
export function sanitizeTracking(input: unknown): Record<string, string> {
  const output: Record<string, string> = {};
  if (!input || typeof input !== "object") return output;
  const values = input as Record<string, unknown>;
  for (const key of ["submission_url", "source_url", "landing_url"]) {
    try { if (typeof values[key] === "string") { const url = new URL(values[key]); if (url.protocol === "https:" || url.protocol === "http:") output[key] = url.origin + url.pathname; } } catch { /* Drop invalid URL. */ }
  }
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "cid"]) {
    const value = values[key];
    if (typeof value === "string" && /^[a-z0-9 _.-]{1,160}$/i.test(value)) output[key] = value;
  }
  return output;
}
