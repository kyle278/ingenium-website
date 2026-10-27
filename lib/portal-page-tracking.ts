import { analyticsAllowed, captureAttribution, portalIdentity, trackPortalEvent } from "./enquiry-client";
import { PORTAL_FORM_IDS } from "./portalIntegration/public";

// Maintain the existing V1 connection and identity. Installing another SDK here
// would create competing identities and duplicate page/form submissions.
let lastPage = "";
const startedSessions = new Set<string>();
export function startPortalPageTracking() {
  if (!analyticsAllowed() || location.pathname.startsWith("/blog/preview/") || new URL(location.href).searchParams.has("__ingenium_editor")) return () => {};
  const identity = portalIdentity();
  if (!identity.session_id) return () => {};
  captureAttribution();
  const sessionKey = `ingenium-session-start:${identity.session_id}`;
  let started = startedSessions.has(identity.session_id);
  try { started ||= sessionStorage.getItem(sessionKey) === "sent"; } catch { /* Memory dedupe remains available. */ }
  if (!started) {
    startedSessions.add(identity.session_id);
    try { sessionStorage.setItem(sessionKey, "sent"); } catch { /* No personal details stored. */ }
    trackPortalEvent("session_start");
  }
  const page = identity.session_id + ":" + location.pathname;
  if (lastPage !== page) { lastPage = page; trackPortalEvent("page_view"); }
  const seenForms = new WeakSet<Element>(), depths = new Set<number>();
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const slug = entry.target.getAttribute("data-portal-form-slug");
      if (entry.isIntersecting && slug && !seenForms.has(entry.target)) {
        seenForms.add(entry.target); trackPortalEvent("form_view", { form_slug: slug, form_id: PORTAL_FORM_IDS[slug] || "" });
      }
    }
  }, { threshold: 0.1 });
  function observeForms() { document.querySelectorAll("form[data-portal-form-slug]").forEach(form => observer.observe(form)); }
  observeForms();
  const mutations = new MutationObserver(observeForms);
  mutations.observe(document.body, { childList: true, subtree: true });
  function scroll() {
    const height = document.documentElement.scrollHeight - innerHeight;
    if (height <= 0) return;
    const percentage = Math.min(100, Math.round(scrollY / height * 100));
    for (const depth of [25, 50, 75, 100]) if (percentage >= depth && !depths.has(depth)) {
      depths.add(depth); trackPortalEvent("scroll_depth", { scroll_depth: String(depth) });
    }
  }
  function click(event: MouseEvent) {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest("a[href]");
    const href = link?.getAttribute("href") || "";
    if (/^(tel:|mailto:)/i.test(href)) trackPortalEvent("contact_click", { contact_method: href.toLowerCase().startsWith("tel:") ? "phone" : "email" });
    else if (link) {
      try {
        const url = new URL(href, location.href);
        if (url.origin === location.origin && ["/book-a-call", "/visibility-check"].includes(url.pathname)) trackPortalEvent("cta_click", { enquiry_service: url.pathname === "/book-a-call" ? "free-call" : "visibility-check" });
      } catch { /* Ignore non-navigation links. */ }
    }
  }
  window.addEventListener("scroll", scroll, { passive: true });
  document.addEventListener("click", click);
  return () => { observer.disconnect(); mutations.disconnect(); window.removeEventListener("scroll", scroll); document.removeEventListener("click", click); };
}
