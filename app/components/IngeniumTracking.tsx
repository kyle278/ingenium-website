"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { analyticsAllowed, captureAttribution, clearAttribution, clearEnquiryRequestId, CONSENT_KEY, enquiryRequestId, enquiryTracking, sendEnquiry } from "@/lib/enquiry-client";
import "./consent.css";

const GTM_ID = "GTM-KWCQSXC7";
// Opt in only after the live GTM/GA4 conversion and consent configuration is verified.
const TAGS_ENABLED = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true";
let memoryChoice: string | null = null;
function saveChoice(value: string) { memoryChoice = value; try { localStorage.setItem(CONSENT_KEY, value); } catch { /* Enquiries never depend on storage. */ } }
function subscribeChoice(listener: () => void) {
  window.addEventListener("storage", listener); window.addEventListener("ingenium-consent-change", listener);
  return () => { window.removeEventListener("storage", listener); window.removeEventListener("ingenium-consent-change", listener); };
}
function readChoice() { try { return localStorage.getItem(CONSENT_KEY) || memoryChoice; } catch { return memoryChoice; } }
function consentCommand(command: string, action: string, values: Record<string, string>) {
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  // GTM/gtag's command queue expects an Arguments object, not an event array.
  // eslint-disable-next-line prefer-rest-params
  w.dataLayer.push(arguments);
  void command; void action; void values;
}
function revokeAnalytics() {
  clearAttribution();
  const w = window as unknown as Record<string, unknown>;
  w["ga-disable-G-NQ1RH94GDN"] = true;
  consentCommand("consent", "update", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (!/^(_ga|_gid|_gat|_gcl)/.test(name)) continue;
    for (const domain of ["", location.hostname, ".ingeniumconsulting.net"]) document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ""}`;
  }
}
function loadAnalytics() {
  if (!TAGS_ENABLED || !analyticsAllowed() || document.getElementById("ingenium-optional-gtm")) return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  consentCommand("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  consentCommand("consent", "update", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  w.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const script = document.createElement("script");
  script.id = "ingenium-optional-gtm"; script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
}

/** Essential adapter for the existing private website brief only; never an analytics dependency. */
function LegacyBriefTransport() {
  useEffect(() => {
    const pending = new WeakSet<HTMLFormElement>();
    const ids = new WeakMap<HTMLFormElement, string>();
    function notify(form: HTMLFormElement, name: string, detail: object) { form.dispatchEvent(new CustomEvent(name, { bubbles: true, detail })); }
    async function onSubmit(event: Event) {
      const form = event.target;
      if (!(form instanceof HTMLFormElement) || form.dataset.formSlug !== "website-project-brief" || event.defaultPrevented) return;
      event.preventDefault();
      if (pending.has(form)) return;
      if (!form.reportValidity()) return;
      const fields: Record<string, string> = {};
      for (const [key, value] of new FormData(form)) {
        if (typeof value !== "string") continue;
        fields[key] = fields[key] ? `${fields[key]}, ${value}` : value;
      }
      const id = ids.get(form) || enquiryRequestId("website-project-brief"); ids.set(form, id);
      pending.add(form); notify(form, "ingenium:form-submitting", {});
      try {
        const receipt = await sendEnquiry({ request_id: id, form_slug: "website-project-brief", fields, tracking: enquiryTracking() });
        clearEnquiryRequestId("website-project-brief");
        notify(form, "ingenium:form-success", { response: receipt }); ids.delete(form);
      } catch (err) { notify(form, "ingenium:form-error", { message: err instanceof Error ? err.message : "We could not confirm receipt. Please email us." }); }
      finally { pending.delete(form); }
    }
    document.addEventListener("submit", onSubmit);
    return () => document.removeEventListener("submit", onSubmit);
  }, []);
  return null;
}
export default function IngeniumTracking() {
  const pathname = usePathname();
  const choice = useSyncExternalStore(subscribeChoice, readChoice, () => "loading");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (choice === "accepted" && analyticsAllowed()) { captureAttribution(); loadAnalytics(); }
    if (choice === "rejected") { revokeAnalytics(); if (document.getElementById("ingenium-optional-gtm")) location.reload(); }
  }, [choice]);
  useEffect(() => { if (analyticsAllowed()) captureAttribution(); }, [pathname]);
  useEffect(() => {
    function openSettings() { if (location.hash === "#cookie-settings") setOpen(true); }
    function onSettingsLink(event: MouseEvent) {
      const target = event.target;
      if (target instanceof Element && target.closest('a[href="#cookie-settings"]')) { event.preventDefault(); setOpen(true); }
    }
    window.addEventListener("hashchange", openSettings);
    document.addEventListener("click", onSettingsLink);
    const timer = window.setTimeout(openSettings, 0);
    return () => { clearTimeout(timer); window.removeEventListener("hashchange", openSettings); document.removeEventListener("click", onSettingsLink); };
  }, []);
  function choose(value: "accepted" | "rejected") {
    const wasAccepted = analyticsAllowed();
    saveChoice(value); window.dispatchEvent(new Event("ingenium-consent-change")); setOpen(false);
    if (value === "accepted") { captureAttribution(); loadAnalytics(); }
    else { revokeAnalytics(); if (wasAccepted && document.getElementById("ingenium-optional-gtm")) location.reload(); }
  }
  return <><LegacyBriefTransport />
    <button className="consent-settings" type="button" onClick={() => setOpen(true)}>Privacy settings</button>
    {(open || choice === null) && choice !== "loading" && <section className="consent-panel" aria-label="Analytics preferences"><h2>Your privacy choices</h2><p>Essential features let you send an enquiry. Optional analytics help us understand which pages are useful. Your choice won’t affect the form. <a href="/privacy">Privacy Policy</a></p><div><button type="button" onClick={() => choose("rejected")}>Reject optional</button><button type="button" onClick={() => choose("accepted")}>Accept analytics</button>{choice && <button type="button" onClick={() => setOpen(false)}>Close</button>}</div></section>}
  </>;
}
