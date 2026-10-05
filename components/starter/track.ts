import { analyticsAllowed, trackPortalEvent } from "@/lib/enquiry-client";

export type StarterEvent =
  | "starter_cta_click"
  | "starter_form_open"
  | "starter_form_start"
  | "starter_form_submit"
  | "starter_form_close_unsubmitted"
  | "starter_video_play"
  | "starter_video_unmute"
  | "starter_video_50"
  | "starter_video_complete"
  | "starter_example_open";

/** Pushes a campaign event to GTM, only after the visitor has accepted analytics. */
export function trackStarter(event: StarterEvent, params: Record<string, string> = {}) {
  if (!analyticsAllowed()) return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
  trackPortalEvent(event, params);
}
