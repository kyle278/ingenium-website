"use client";

import Script from "next/script";
import { useCallback } from "react";

declare global {
  interface Window {
    IngeniumTracker?: {
      init: (config: {
        endpoint: string;
        siteId: string;
        debug?: boolean;
        autoTrackPageViews?: boolean;
        autoTrackForms?: boolean;
        flushIntervalMs?: number;
        sessionTimeoutMs?: number;
      }) => void;
      track: (
        eventType: string,
        context?: Record<string, unknown>,
        properties?: Record<string, unknown>,
      ) => void;
      flush: () => Promise<void>;
      getVisitorId: () => string | null;
      getSessionId: () => string | null;
    };
    __INGENIUM_TRACKING_BOUND__?: boolean;
    __INGENIUM_FORM_STARTED__?: WeakSet<HTMLFormElement>;
    __INGENIUM_FORM_SUBMITTED__?: WeakSet<HTMLFormElement>;
  }
}

function pageContext() {
  return {
    page_url: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
    page_title: document.title,
    referrer: document.referrer || null,
  };
}

function parseTrackProps(raw?: string) {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object"
      ? (parsed as Record<string, unknown>)
      : {};
  } catch {
    return {};
  }
}

function getFormId(form: HTMLFormElement) {
  return form.dataset.formId || form.id || form.getAttribute("name") || "form_unknown";
}

function trackNow(
  eventType: string,
  properties: Record<string, unknown> = {},
  contextExtra: Record<string, unknown> = {},
) {
  const tracker = window.IngeniumTracker;
  if (!tracker) return;
  tracker.track(eventType, { ...pageContext(), ...contextExtra }, properties);
  void tracker.flush(); // immediate send
}

function bindCustomEvents() {
  if (window.__INGENIUM_TRACKING_BOUND__) return;
  window.__INGENIUM_TRACKING_BOUND__ = true;

  window.__INGENIUM_FORM_STARTED__ = new WeakSet<HTMLFormElement>();
  window.__INGENIUM_FORM_SUBMITTED__ = new WeakSet<HTMLFormElement>();

  const downloadRegex = /\.(pdf|zip|docx?|xlsx?|csv|pptx?|txt|mp4|mp3)$/i;
  const scrollMilestones = [25, 50, 75, 100];
  const seenScrollMilestones = new Set<number>();
  let sessionEndSent = false;

  function emitFormAbandon() {
    const started = window.__INGENIUM_FORM_STARTED__;
    const submitted = window.__INGENIUM_FORM_SUBMITTED__;
    if (!started || !submitted) return;

    Array.from(document.forms).forEach((formNode) => {
      const form = formNode as HTMLFormElement;
      if (started.has(form) && !submitted.has(form)) {
        trackNow("form_abandon", { form_id: getFormId(form) });
      }
    });
  }

  function emitSessionEnd(reason: "page_hidden" | "beforeunload") {
    if (sessionEndSent) return;
    sessionEndSent = true;
    emitFormAbandon();
    trackNow("session_end", { reason });
  }

  document.addEventListener(
    "click",
    (event) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const node = target.closest("[data-track-event],[data-track-cta],a,button") as
        | HTMLElement
        | null;
      if (!node) return;

      const customType = node.getAttribute("data-track-event");
      if (customType) {
        trackNow(customType, parseTrackProps(node.getAttribute("data-track-props") || undefined));
      }

      const ctaId = node.getAttribute("data-track-cta");
      if (ctaId) {
        trackNow("cta_click", {
          cta_id: ctaId,
          label: node.getAttribute("data-track-label") || (node.textContent || "").trim() || null,
          destination: node instanceof HTMLAnchorElement ? node.href : null,
        });
      }

      if (node instanceof HTMLAnchorElement) {
        const href = node.href;
        if (!href) return;

        let parsed: URL | null = null;
        try {
          parsed = new URL(href, window.location.href);
        } catch {
          parsed = null;
        }
        if (!parsed) return;

        const isDownload = node.hasAttribute("download") || downloadRegex.test(parsed.pathname);
        if (isDownload) {
          const pathParts = parsed.pathname.split("/");
          const fileName = pathParts[pathParts.length - 1] || null;
          const ext = fileName?.includes(".") ? fileName.split(".").pop() : null;

          trackNow("download_click", {
            file_url: parsed.href,
            file_name: fileName,
            extension: ext,
          });
        }

        const isOutbound = parsed.host !== window.location.host;
        if (isOutbound) {
          trackNow("outbound_click", {
            destination: parsed.href,
            link_text: (node.textContent || "").trim() || null,
          });
        }
      }
    },
    true,
  );

  document.addEventListener("focusin", (event) => {
    const el = event.target as HTMLElement | null;
    if (!el) return;
    const form = el.closest("form") as HTMLFormElement | null;
    if (!form) return;

    const started = window.__INGENIUM_FORM_STARTED__;
    if (!started || started.has(form)) return;
    started.add(form);

    trackNow("form_start", { form_id: getFormId(form) });
  });

  document.addEventListener(
    "invalid",
    (event) => {
      const field = event.target as
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLSelectElement
        | null;
      if (!field || !field.form) return;

      trackNow("form_error", {
        form_id: getFormId(field.form),
        field_name: field.name || field.id || null,
        message: field.validationMessage || "invalid",
      });
    },
    true,
  );

  document.addEventListener(
    "submit",
    (event) => {
      const form = event.target as HTMLFormElement | null;
      if (!form) return;

      window.__INGENIUM_FORM_SUBMITTED__?.add(form);
      trackNow("form_submit", { form_id: getFormId(form) });
    },
    true,
  );

  window.addEventListener(
    "scroll",
    () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
      const scrollable = Math.max(docHeight - viewportHeight, 1);
      const percentage = Math.round((scrollTop / scrollable) * 100);

      scrollMilestones.forEach((milestone) => {
        if (percentage >= milestone && !seenScrollMilestones.has(milestone)) {
          seenScrollMilestones.add(milestone);
          trackNow("scroll_depth", { percentage: milestone });
        }
      });
    },
    { passive: true },
  );

  const boundVideos = new WeakSet<HTMLVideoElement>();
  const bindVideos = () => {
    document.querySelectorAll("video").forEach((node) => {
      const video = node as HTMLVideoElement;
      if (boundVideos.has(video)) return;
      boundVideos.add(video);

      const seen = new Set<number>();
      const videoId = video.id || video.dataset.videoId || video.currentSrc || "video_unknown";
      const marks = [25, 50, 75, 100];

      video.addEventListener("timeupdate", () => {
        if (!video.duration || Number.isNaN(video.duration)) return;
        const pct = Math.floor((video.currentTime / video.duration) * 100);

        marks.forEach((mark) => {
          if (pct >= mark && !seen.has(mark)) {
            seen.add(mark);
            trackNow("video_progress", {
              video_id: videoId,
              percentage: mark,
              current_time: Math.round(video.currentTime),
              duration: Math.round(video.duration),
            });
          }
        });
      });
    });
  };

  bindVideos();
  const videoMutationObserver = new MutationObserver(bindVideos);
  videoMutationObserver.observe(document.body, { childList: true, subtree: true });

  document.addEventListener(
    "toggle",
    (event) => {
      const details = event.target as HTMLDetailsElement | null;
      if (!(details instanceof HTMLDetailsElement)) return;
      if (!details.open) return;

      const summaryText = details.querySelector("summary")?.textContent?.trim() || null;
      trackNow("faq_expand", {
        faq_id: details.id || details.dataset.faqId || null,
        question: summaryText,
      });
    },
    true,
  );

  window.setInterval(() => {
    if (document.visibilityState !== "visible") return;
    trackNow("heartbeat", { seconds_active: 15 });
  }, 15000);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") emitSessionEnd("page_hidden");
  });

  window.addEventListener("beforeunload", () => {
    emitSessionEnd("beforeunload");
  });
}

function initializeIngeniumTracker(portalBaseUrl: string, siteId: string) {
  const tracker = window.IngeniumTracker;
  if (!tracker) return;

  tracker.init({
    endpoint: `${portalBaseUrl}/api/websites/tracking/events`,
    siteId,
    autoTrackPageViews: true,
    autoTrackForms: true,
    flushIntervalMs: 5000,
    sessionTimeoutMs: 30 * 60 * 1000,
    debug: process.env.NODE_ENV !== "production",
  });

  bindCustomEvents();
}

export default function IngeniumTracking() {
  const portalBaseUrl = (process.env.NEXT_PUBLIC_INGENIUM_PORTAL_APP_URL || "").replace(/\/$/, "");
  const siteId = process.env.NEXT_PUBLIC_INGENIUM_SITE_ID || "";

  const onScriptLoad = useCallback(() => {
    if (!portalBaseUrl || !siteId) return;
    initializeIngeniumTracker(portalBaseUrl, siteId);
  }, [portalBaseUrl, siteId]);

  if (!portalBaseUrl || !siteId) return null;

  return (
    <Script
      src={`${portalBaseUrl}/ingenium-tracker.js`}
      strategy="afterInteractive"
      onLoad={onScriptLoad}
    />
  );
}
