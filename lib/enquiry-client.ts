import { acceptedReceipt } from "./enquiry-contract";
import { PORTAL_SITE_ID, PORTAL_TRACKING_ENDPOINT } from "./portalIntegration/public";

export const CONSENT_KEY = "ingenium-analytics-choice-v1";
const TOUCH_KEY = "ingenium-attribution-v1";
const VISITOR_KEY = "ingenium-portal-visitor-v1";
const SESSION_KEY = "ingenium-portal-session-v1";
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
  try { const url = new URL(raw); return /^https?:$/.test(url.protocol) ? url.origin + url.pathname : ""; } catch { return ""; }
}
/** Identity is created only after analytics consent and shared by events and forms. */
export function portalIdentity() {
  if (!analyticsAllowed()) return {};
  try {
    let visitor = localStorage.getItem(VISITOR_KEY);
    if (!visitor || !/^[a-f0-9-]{36}$/i.test(visitor)) { visitor = crypto.randomUUID(); localStorage.setItem(VISITOR_KEY, visitor); }
    const stored = JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null");
    const now = Date.now();
    const session = stored && now - stored.at < 30 * 60 * 1000 && /^[a-f0-9-]{36}$/i.test(stored.id) ? stored.id : crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ id: session, at: now }));
    return { visitor_id: visitor, session_id: session };
  } catch { return {}; }
}
/** Sends only controlled properties and clean URLs, never form values or query strings. */
export function trackPortalEvent(event: string, properties: Record<string, string> = {}) {
  if (!analyticsAllowed()) return;
  const identity = portalIdentity();
  if (!identity.visitor_id || !identity.session_id) return;
  const tracking = enquiryTracking();
  const safeProperties: Record<string, string> = {};
  for (const key of [...ALLOWED, "cta_position", "lead_route", "enquiry_service"]) {
    const value = properties[key] ?? (tracking as Record<string, unknown>)[key];
    if (typeof value === "string" && /^[a-z0-9 _.-]{1,160}$/i.test(value)) safeProperties[key] = value;
  }
  void fetch(PORTAL_TRACKING_ENDPOINT, {
    method: "POST", headers: { "Content-Type": "application/json" }, keepalive: true,
    body: JSON.stringify({ site_id: PORTAL_SITE_ID, ...identity, events: [{ event_type: event, client_event_id: crypto.randomUUID(), occurred_at: new Date().toISOString(), page_url: cleanPageUrl(location.href), page_path: location.pathname, referrer: cleanPageUrl(document.referrer), properties: safeProperties }] }),
  }).catch(() => { /* Analytics never blocks an enquiry. */ });
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
  try { const context = JSON.parse(sessionStorage.getItem(TOUCH_KEY) || "null"); return { ...context?.latest, ...base, ...portalIdentity(), source_url: context?.latest?.landing_url || base.source_url, first_touch: context?.first, latest_touch: context?.latest }; } catch { return base; }
}
export function clearAttribution() {
  try { sessionStorage.removeItem(TOUCH_KEY); sessionStorage.removeItem(SESSION_KEY); localStorage.removeItem(VISITOR_KEY); } catch { /* No storage available. */ }
}
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
  trackPortalEvent("ingenium_lead_received", { enquiry_service: service });
}
