"use client";

import type {
  PortalPublicConfig,
  PortalTrackingEnvelope,
  PortalTrackingEvent,
  PortalTrackingSnapshot,
} from "@/lib/portalIntegration/types";

declare global {
  interface Window {
    IngeniumTracker?: IngeniumTrackerApi;
    __INGENIUM_TRACKER_STATE__?: TrackerState;
    __INGENIUM_HISTORY_PATCHED__?: boolean;
  }
}

type IngeniumTrackerApi = {
  init: (config: PortalPublicConfig & { endpoint: string; sessionTimeoutMs?: number }) => void;
  track: (
    eventType: string,
    context?: Record<string, unknown>,
    properties?: Record<string, unknown>,
  ) => Promise<void>;
  flush: () => Promise<void>;
  getVisitorId: () => string | null;
  getSessionId: () => string | null;
  getTrackingSnapshot: () => PortalTrackingSnapshot;
  handleNavigation: () => Promise<void>;
};

type TrackerState = {
  config: (PortalPublicConfig & { endpoint: string; sessionTimeoutMs: number }) | null;
  queue: PortalTrackingEvent[];
  flushPromise: Promise<void> | null;
  visitorId: string | null;
  sessionId: string | null;
  lastActivityAt: number | null;
  landingUrl: string | null;
  currentPageKey: string | null;
  seenFormViews: Set<string>;
  seenScrollDepths: Set<number>;
  formObserver: IntersectionObserver | null;
  mutationObserver: MutationObserver | null;
  scrollHandlerBound: boolean;
  navigationHandlerBound: boolean;
};

const VISITOR_COOKIE_KEY = "ingenium_visitor_id";
const VISITOR_STORAGE_KEY = "ingenium_visitor_id";
const SESSION_ID_KEY = "ingenium_session_id";
const SESSION_LAST_ACTIVITY_KEY = "ingenium_session_last_activity";
const SESSION_LANDING_URL_KEY = "ingenium_session_landing_url";
const ATTRIBUTION_STORAGE_KEY = "ingenium_portal_attribution";
const DEFAULT_SESSION_TIMEOUT_MS = 30 * 60 * 1000;
const SCROLL_THRESHOLDS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

function getState(): TrackerState {
  if (!window.__INGENIUM_TRACKER_STATE__) {
    window.__INGENIUM_TRACKER_STATE__ = {
      config: null,
      queue: [],
      flushPromise: null,
      visitorId: null,
      sessionId: null,
      lastActivityAt: null,
      landingUrl: null,
      currentPageKey: null,
      seenFormViews: new Set<string>(),
      seenScrollDepths: new Set<number>(),
      formObserver: null,
      mutationObserver: null,
      scrollHandlerBound: false,
      navigationHandlerBound: false,
    };
  }

  return window.__INGENIUM_TRACKER_STATE__;
}

function safeNow() {
  return Date.now();
}

function generateId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `ingenium_${Math.random().toString(16).slice(2)}_${safeNow()}`;
}

function getCurrentPageContext() {
  return {
    page_url: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
    page_title: document.title,
    referrer: document.referrer || null,
  };
}

function getPageKey() {
  return `${window.location.pathname}${window.location.search}`;
}

function parseJsonRecord(raw: string | null) {
  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : {};
  } catch {
    return {};
  }
}

function readCookie(name: string) {
  const cookiePrefix = `${name}=`;
  return document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(cookiePrefix))
    ?.slice(cookiePrefix.length) ?? null;
}

function isLocalHostname(hostname: string) {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    /^[0-9.]+$/.test(hostname)
  );
}

function computeCookieDomain(hostname: string) {
  if (isLocalHostname(hostname)) {
    return null;
  }

  const segments = hostname.split(".").filter(Boolean);
  if (segments.length < 2) {
    return null;
  }

  const commonSecondLevelDomains = new Set([
    "co.uk",
    "org.uk",
    "gov.uk",
    "ac.uk",
    "com.au",
    "net.au",
    "org.au",
    "co.nz",
  ]);

  const lastTwo = segments.slice(-2).join(".");
  const lastThree = segments.slice(-3).join(".");
  const useThree = segments.length >= 3 && commonSecondLevelDomains.has(lastTwo);

  return `.${useThree ? lastThree : lastTwo}`;
}

function writeVisitorCookie(value: string) {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 730);

  const parts = [
    `${VISITOR_COOKIE_KEY}=${value}`,
    "Path=/",
    `Expires=${expiresAt.toUTCString()}`,
    "SameSite=Lax",
  ];

  const domain = computeCookieDomain(window.location.hostname);
  if (domain) {
    parts.push(`Domain=${domain}`);
  }

  if (window.location.protocol === "https:") {
    parts.push("Secure");
  }

  document.cookie = parts.join("; ");
}

function readVisitorId() {
  const cookieValue = readCookie(VISITOR_COOKIE_KEY);
  const storageValue = window.localStorage.getItem(VISITOR_STORAGE_KEY);

  if (cookieValue && !storageValue) {
    window.localStorage.setItem(VISITOR_STORAGE_KEY, cookieValue);
    return cookieValue;
  }

  if (!cookieValue && storageValue) {
    writeVisitorCookie(storageValue);
    return storageValue;
  }

  if (cookieValue) {
    return cookieValue;
  }

  if (storageValue) {
    return storageValue;
  }

  const nextValue = generateId();
  writeVisitorCookie(nextValue);
  window.localStorage.setItem(VISITOR_STORAGE_KEY, nextValue);
  return nextValue;
}

function getAttributionSnapshot() {
  const url = new URL(window.location.href);
  const current = {
    utm_source: url.searchParams.get("utm_source"),
    utm_medium: url.searchParams.get("utm_medium"),
    utm_campaign: url.searchParams.get("utm_campaign"),
    utm_term: url.searchParams.get("utm_term"),
    utm_content: url.searchParams.get("utm_content"),
    cid: url.searchParams.get("cid"),
  };

  const stored = parseJsonRecord(window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY));
  const merged = {
    utm_source: typeof current.utm_source === "string" && current.utm_source ? current.utm_source : (stored.utm_source as string | null) ?? null,
    utm_medium: typeof current.utm_medium === "string" && current.utm_medium ? current.utm_medium : (stored.utm_medium as string | null) ?? null,
    utm_campaign: typeof current.utm_campaign === "string" && current.utm_campaign ? current.utm_campaign : (stored.utm_campaign as string | null) ?? null,
    utm_term: typeof current.utm_term === "string" && current.utm_term ? current.utm_term : (stored.utm_term as string | null) ?? null,
    utm_content: typeof current.utm_content === "string" && current.utm_content ? current.utm_content : (stored.utm_content as string | null) ?? null,
    cid: typeof current.cid === "string" && current.cid ? current.cid : (stored.cid as string | null) ?? null,
  };

  window.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(merged));
  return merged;
}

function ensureSession(state: TrackerState) {
  const timeoutMs = state.config?.sessionTimeoutMs ?? DEFAULT_SESSION_TIMEOUT_MS;
  const now = safeNow();
  const storedSessionId = window.sessionStorage.getItem(SESSION_ID_KEY);
  const storedLastActivity = Number(window.sessionStorage.getItem(SESSION_LAST_ACTIVITY_KEY) || "");
  const hasExpired =
    !storedLastActivity || Number.isNaN(storedLastActivity) || now - storedLastActivity > timeoutMs;

  const shouldCreateNewSession = !storedSessionId || hasExpired;
  if (shouldCreateNewSession) {
    const nextSessionId = generateId();
    window.sessionStorage.setItem(SESSION_ID_KEY, nextSessionId);
    window.sessionStorage.setItem(SESSION_LAST_ACTIVITY_KEY, String(now));
    window.sessionStorage.setItem(SESSION_LANDING_URL_KEY, window.location.href);
    state.sessionId = nextSessionId;
    state.lastActivityAt = now;
    state.landingUrl = window.location.href;
    return { sessionId: nextSessionId, isNewSession: true };
  }

  window.sessionStorage.setItem(SESSION_LAST_ACTIVITY_KEY, String(now));
  state.sessionId = storedSessionId;
  state.lastActivityAt = now;
  state.landingUrl = window.sessionStorage.getItem(SESSION_LANDING_URL_KEY);
  return { sessionId: storedSessionId, isNewSession: false };
}

function updateActivityTimestamp() {
  window.sessionStorage.setItem(SESSION_LAST_ACTIVITY_KEY, String(safeNow()));
}

function getTrackingSnapshot(): PortalTrackingSnapshot {
  const state = getState();
  const attribution = getAttributionSnapshot();

  return {
    site_id: state.config?.siteId ?? null,
    visitor_id: state.visitorId,
    session_id: state.sessionId,
    utm_source: attribution.utm_source,
    utm_medium: attribution.utm_medium,
    utm_campaign: attribution.utm_campaign,
    utm_term: attribution.utm_term,
    utm_content: attribution.utm_content,
    cid: attribution.cid,
    submission_url: window.location.href,
    landing_url: state.landingUrl ?? window.sessionStorage.getItem(SESSION_LANDING_URL_KEY),
    referrer: document.referrer || null,
  };
}

function setHiddenField(form: HTMLFormElement, name: string, value: string | null) {
  let input = form.querySelector(`input[type="hidden"][name="${name}"]`) as HTMLInputElement | null;
  if (!input) {
    input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    form.appendChild(input);
  }

  input.value = value ?? "";
}

function injectTrackingFields(form: HTMLFormElement) {
  const snapshot = getTrackingSnapshot();

  setHiddenField(form, "visitor_id", snapshot.visitor_id);
  setHiddenField(form, "session_id", snapshot.session_id);
  setHiddenField(form, "site_id", snapshot.site_id);
  setHiddenField(form, "utm_source", snapshot.utm_source);
  setHiddenField(form, "utm_medium", snapshot.utm_medium);
  setHiddenField(form, "utm_campaign", snapshot.utm_campaign);
  setHiddenField(form, "utm_term", snapshot.utm_term);
  setHiddenField(form, "utm_content", snapshot.utm_content);
  setHiddenField(form, "cid", snapshot.cid);
  setHiddenField(form, "submission_url", snapshot.submission_url);
}

async function flushQueue() {
  const state = getState();
  if (!state.config || state.queue.length === 0) {
    return;
  }

  if (state.flushPromise) {
    return state.flushPromise;
  }

  const events = state.queue.splice(0, state.queue.length);
  const payload: PortalTrackingEnvelope = {
    site_id: state.config.siteId,
    visitor_id: state.visitorId ?? readVisitorId(),
    session_id: state.sessionId ?? ensureSession(state).sessionId,
    events,
  };

  state.flushPromise = fetch(state.config.endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  })
    .catch(() => {
      state.queue.unshift(...events);
    })
    .finally(() => {
      state.flushPromise = null;
    });

  return state.flushPromise;
}

function buildTrackingEvent(
  eventType: string,
  context: Record<string, unknown>,
  properties: Record<string, unknown>,
) {
  const page = {
    ...getCurrentPageContext(),
    ...context,
  };

  return {
    client_event_id: generateId(),
    event_type: eventType,
    occurred_at: new Date().toISOString(),
    page_url: String(page.page_url),
    page_path: String(page.page_path),
    page_title: String(page.page_title),
    referrer:
      page.referrer === null || typeof page.referrer === "string" ? page.referrer : document.referrer || null,
    properties,
  } satisfies PortalTrackingEvent;
}

async function trackEvent(
  eventType: string,
  context: Record<string, unknown> = {},
  properties: Record<string, unknown> = {},
) {
  const state = getState();
  if (!state.config) {
    return;
  }

  const session = ensureSession(state);
  updateActivityTimestamp();
  if (session.isNewSession && eventType !== "session_start") {
    state.queue.push(buildTrackingEvent("session_start", {}, {}));
  }

  state.queue.push(buildTrackingEvent(eventType, context, properties));
  await flushQueue();
}

function getMaxScrollDepth() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
  const docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
  const scrollable = Math.max(docHeight - viewportHeight, 1);
  const percentage = Math.round((scrollTop / scrollable) * 100);
  return Math.min(100, Math.max(0, percentage));
}

async function emitScrollDepthEvents() {
  const state = getState();
  const maxDepth = getMaxScrollDepth();

  for (const threshold of SCROLL_THRESHOLDS) {
    if (maxDepth < threshold || state.seenScrollDepths.has(threshold)) {
      continue;
    }

    state.seenScrollDepths.add(threshold);
    await trackEvent("scroll_depth", {}, {
      scroll_depth: threshold,
      scroll_percent: threshold,
      max_scroll_depth: maxDepth,
    });
  }
}

function observeForms() {
  const state = getState();
  state.formObserver?.disconnect();

  state.formObserver = new IntersectionObserver(
    (entries) => {
      void Promise.all(
        entries.map(async (entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const form = entry.target as HTMLFormElement;
          injectTrackingFields(form);

          const formId = form.dataset.formId;
          if (!formId) {
            console.error("Tracked form is missing canonical data-form-id Portal UUID.", form);
            return;
          }

          if (state.seenFormViews.has(formId)) {
            return;
          }

          state.seenFormViews.add(formId);
          await trackEvent("form_view", {}, {
            form_id: formId,
            form_slug: form.dataset.formSlug ?? null,
            form_name: form.dataset.formName ?? null,
          });
        }),
      );
    },
    { threshold: 0.25 },
  );

  document.querySelectorAll("form").forEach((node) => {
    const form = node as HTMLFormElement;
    injectTrackingFields(form);
    state.formObserver?.observe(form);
  });

  if (!state.mutationObserver) {
    state.mutationObserver = new MutationObserver(() => {
      document.querySelectorAll("form").forEach((node) => {
        const form = node as HTMLFormElement;
        injectTrackingFields(form);
        state.formObserver?.observe(form);
      });
    });

    state.mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
}

async function resetPageStateAndTrackPageView() {
  const state = getState();
  state.currentPageKey = getPageKey();
  state.seenFormViews = new Set<string>();
  state.seenScrollDepths = new Set<number>();
  observeForms();
  await trackEvent("page_view", {}, {});
}

function patchHistoryOnce() {
  if (window.__INGENIUM_HISTORY_PATCHED__) {
    return;
  }

  window.__INGENIUM_HISTORY_PATCHED__ = true;

  const wrapHistoryMethod = (method: "pushState" | "replaceState") => {
    const original = window.history[method].bind(window.history);
    window.history[method] = function patchedHistoryState(
      data: unknown,
      unused: string,
      url?: string | URL | null,
    ) {
      const result = original(data, unused, url);
      window.dispatchEvent(new Event("ingenium:historychange"));
      return result;
    };
  };

  wrapHistoryMethod("pushState");
  wrapHistoryMethod("replaceState");
}

async function handleNavigation() {
  const state = getState();
  const nextPageKey = getPageKey();

  if (state.currentPageKey === nextPageKey) {
    observeForms();
    return;
  }

  ensureSession(state);
  await resetPageStateAndTrackPageView();
}

function bindGlobalListeners() {
  const state = getState();

  if (!state.scrollHandlerBound) {
    state.scrollHandlerBound = true;
    window.addEventListener(
      "scroll",
      () => {
        void emitScrollDepthEvents();
      },
      { passive: true },
    );
  }

  if (!state.navigationHandlerBound) {
    state.navigationHandlerBound = true;
    patchHistoryOnce();

    const onNavigation = () => {
      window.setTimeout(() => {
        void handleNavigation();
      }, 0);
    };

    window.addEventListener("ingenium:historychange", onNavigation);
    window.addEventListener("popstate", onNavigation);
  }
}

function createTrackerApi(): IngeniumTrackerApi {
  return {
    init(config) {
      const state = getState();
      state.config = {
        ...config,
        sessionTimeoutMs: config.sessionTimeoutMs ?? DEFAULT_SESSION_TIMEOUT_MS,
      };
      state.visitorId = readVisitorId();
      const session = ensureSession(state);
      bindGlobalListeners();
      observeForms();
      if (session.isNewSession) {
        void trackEvent("session_start", {}, {});
      }
      void resetPageStateAndTrackPageView();
    },
    async track(eventType, context = {}, properties = {}) {
      await trackEvent(eventType, context, properties);
    },
    async flush() {
      await flushQueue();
    },
    getVisitorId() {
      const state = getState();
      state.visitorId = state.visitorId ?? readVisitorId();
      return state.visitorId;
    },
    getSessionId() {
      const state = getState();
      state.sessionId = state.sessionId ?? ensureSession(state).sessionId;
      return state.sessionId;
    },
    getTrackingSnapshot() {
      const state = getState();
      state.visitorId = state.visitorId ?? readVisitorId();
      state.sessionId = state.sessionId ?? ensureSession(state).sessionId;
      return getTrackingSnapshot();
    },
    async handleNavigation() {
      await handleNavigation();
    },
  };
}

export function bootstrapIngeniumTracker(config: PortalPublicConfig) {
  const existingTracker = window.IngeniumTracker as
    | { init?: (config: { endpoint: string; siteId: string; sessionTimeoutMs?: number }) => void }
    | undefined;

  if (existingTracker?.init && !("getTrackingSnapshot" in existingTracker)) {
    existingTracker.init({
      endpoint: `${config.portalAppUrl}/api/websites/tracking/events`,
      siteId: config.siteId,
      sessionTimeoutMs: DEFAULT_SESSION_TIMEOUT_MS,
    });
  }

  const tracker = createTrackerApi();
  window.IngeniumTracker = tracker;
  tracker.init({
    ...config,
    endpoint: `${config.portalAppUrl}/api/websites/tracking/events`,
    sessionTimeoutMs: DEFAULT_SESSION_TIMEOUT_MS,
  });
  return tracker;
}

export function getPortalTrackingSnapshot() {
  return window.IngeniumTracker?.getTrackingSnapshot() ?? null;
}
