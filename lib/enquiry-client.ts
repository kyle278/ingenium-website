import { acceptedReceipt } from "./enquiry-contract";

export const CONSENT_KEY = "ingenium-analytics-choice-v1";
const TOUCH_KEY = "ingenium-attribution-v1";
const ALLOWED = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "cid"];
export function enquiryRequestId(form: string) {
  const key = `ingenium-pending-request:${form}`;
  try { const existing = sessionStorage.getItem(key); if (existing && /^[a-f0-9-]{36}$/i.test(existing)) return existing; } catch { /* Use an in-memory reference in the caller. */ }
  const id = crypto.randomUUID();
  try { sessionStorage.setItem(key, id); } catch { /* Storage unavailable. */ }
  return id;
}
export function clearEnquiryRequestId(form: string) { try { sessionStorage.removeItem(`ingenium-pending-request:${form}`); } catch { /* Storage unavailable. */ } }
export function analyticsAllowed() { try { return localStorage.getItem(CONSENT_KEY) === "accepted"; } catch { return false; } }
export function cleanPageUrl(raw: string) {
  try { const url = new URL(raw); return url.origin + url.pathname; } catch { return ""; }
}
export function captureAttribution() {
  if (!analyticsAllowed()) return;
  try {
    const url = new URL(location.href);
    const values: Record<string, string> = {};
    for (const key of ALLOWED) { const v = url.searchParams.get(key); if (v && /^[a-z0-9 _.-]{1,160}$/i.test(v)) values[key] = v; }
    const now = Date.now();
    const stored = JSON.parse(sessionStorage.getItem(TOUCH_KEY) || "null");
    const previous = stored && now - stored.at < 30 * 60 * 1000 ? stored : null;
    const touch = { ...values, landing_url: cleanPageUrl(location.href) };
    sessionStorage.setItem(TOUCH_KEY, JSON.stringify({ at: now, first: previous?.first || touch, latest: Object.keys(values).length ? touch : previous?.latest || touch }));
  } catch { /* Attribution is optional; enquiries remain usable. */ }
}
export function enquiryTracking() {
  const base = { submission_url: cleanPageUrl(location.href), source_url: cleanPageUrl(location.href) };
  if (!analyticsAllowed()) return base;
  captureAttribution();
  try { const context = JSON.parse(sessionStorage.getItem(TOUCH_KEY) || "null"); return { ...context?.latest, ...base, source_url: context?.latest?.landing_url || base.source_url, first_touch: context?.first, latest_touch: context?.latest }; } catch { return base; }
}
export function clearAttribution() { try { sessionStorage.removeItem(TOUCH_KEY); } catch { /* No storage available. */ } }
export async function sendEnquiry(payload: unknown) {
  const response = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), signal: AbortSignal.timeout(25000) });
  const body = await response.json().catch(() => null);
  if (!response.ok || !acceptedReceipt(body)) throw new Error(body?.error || "We could not confirm receipt. Please email hello@ingeniumconsulting.net before sending again.");
  return body;
}
export function recordAcceptedLead(id: string, service: string) {
  if (!analyticsAllowed()) return;
  // This prevents duplicate browser dispatches, not GA4/server-wide deduplication.
  try { const key = `ingenium-receipt:${id}`; if (sessionStorage.getItem(key)) return; sessionStorage.setItem(key, "sent"); } catch { return; }
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: "ingenium_lead_received", enquiry_service: service });
}
