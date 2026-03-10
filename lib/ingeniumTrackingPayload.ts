import { getPortalTrackingSnapshot } from "@/lib/portalIntegration/browserTracker";

export type IngeniumTrackingPayload = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  cid: string | null;
  visitor_id: string | null;
  session_id: string | null;
  submission_url: string | null;
  landing_url: string | null;
  referrer: string | null;
  site_id: string | null;
};

export function getIngeniumTrackingPayload(): IngeniumTrackingPayload {
  const snapshot = getPortalTrackingSnapshot();

  return {
    utm_source: snapshot?.utm_source ?? null,
    utm_medium: snapshot?.utm_medium ?? null,
    utm_campaign: snapshot?.utm_campaign ?? null,
    utm_term: snapshot?.utm_term ?? null,
    utm_content: snapshot?.utm_content ?? null,
    cid: snapshot?.cid ?? null,
    visitor_id: snapshot?.visitor_id ?? null,
    session_id: snapshot?.session_id ?? null,
    submission_url: snapshot?.submission_url ?? window.location.href,
    landing_url: snapshot?.landing_url ?? null,
    referrer: snapshot?.referrer ?? document.referrer || null,
    site_id: snapshot?.site_id ?? null,
  };
}
