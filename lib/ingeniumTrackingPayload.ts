export type IngeniumTrackingPayload = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  cid: string | null;
  visitor_id: string | null;
  session_id: string | null;
  submission_url: string;
  referrer: string | null;
  site_id: string | null;
};

export function getIngeniumTrackingPayload(): IngeniumTrackingPayload {
  const url = new URL(window.location.href);
  const q = url.searchParams;

  return {
    utm_source: q.get("utm_source"),
    utm_medium: q.get("utm_medium"),
    utm_campaign: q.get("utm_campaign"),
    utm_term: q.get("utm_term"),
    utm_content: q.get("utm_content"),
    cid: q.get("cid"),
    visitor_id: window.IngeniumTracker?.getVisitorId() ?? q.get("visitor_id"),
    session_id: window.IngeniumTracker?.getSessionId() ?? q.get("session_id"),
    submission_url: window.location.href,
    referrer: document.referrer || null,
    site_id: process.env.NEXT_PUBLIC_INGENIUM_SITE_ID || null,
  };
}
