"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MARKETING_NOTICE, NOTICE_VERSION, PRIVACY_NOTICE, validateEnquiry, validService } from "@/lib/enquiry-contract";
import { clearEnquiryRequestId, enquiryRequestId, enquiryTracking, recordAcceptedLead, sendEnquiry } from "@/lib/enquiry-client";

type ContactFormProps = { formName: string; formSlug: string; intent?: string; submitLabel?: string; successRedirect?: string };
export default function ContactForm({ formName, formSlug, intent = "project-enquiry", submitLabel = "Send enquiry", successRedirect }: ContactFormProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const requestId = useRef("");
  const pending = useRef(false);
  const [service, setService] = useState("not-sure");
  const [state, setState] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  useEffect(() => {
    const value = new URLSearchParams(location.search).get("service");
    if (validService(value)) setService(value!);
  }, []);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current || state === "success") return;
    const data = new FormData(event.currentTarget);
    const fields: Record<string, string> = {};
    data.forEach((value, key) => { if (typeof value === "string") fields[key] = value.trim(); });
    fields.privacy_consent = data.has("privacy_consent") ? "true" : "false";
    fields.marketing_consent = data.has("marketing_consent") ? "true" : "false";
    fields.consent_version = NOTICE_VERSION;
    fields.consent_text_snapshot = PRIVACY_NOTICE;
    fields.marketing_consent_text = MARKETING_NOTICE;
    fields.intent = intent;
    fields.first_name = fields.name.split(/\s+/)[0] || "";
    fields.last_name = fields.name.split(/\s+/).slice(1).join(" ");
    fields.biggest_growth_challenge = fields.message;
    requestId.current ||= enquiryRequestId(`${formSlug}:${intent}`);
    const payload = { request_id: requestId.current, form_slug: formSlug, fields, tracking: enquiryTracking() };
    const invalid = validateEnquiry(payload);
    if (invalid) { setError(invalid); setState("error"); setTimeout(() => errorRef.current?.focus(), 0); return; }
    pending.current = true; setState("pending"); setError("");
    try {
      const receipt = await sendEnquiry(payload);
      clearEnquiryRequestId(`${formSlug}:${intent}`);
      recordAcceptedLead(receipt.submission_id, service);
      setState("success");
      if (successRedirect?.startsWith("/") && !successRedirect.startsWith("//")) router.push(successRedirect);
    } catch (err) {
      setError(err instanceof Error ? err.message : "We could not confirm receipt. Please email us before sending again.");
      setState("error"); setTimeout(() => errorRef.current?.focus(), 0);
    } finally { pending.current = false; }
  }
  if (state === "success") return <div className="rebuild-form-receipt" role="status"><h2>Thanks. Your enquiry has been received.</h2><p>We’ll review your enquiry and get in touch about the next step. An appointment has not been booked.</p><a href="mailto:hello@ingeniumconsulting.net">hello@ingeniumconsulting.net</a></div>;
  return <form ref={formRef} name={formName} className="rebuild-form" onSubmit={submit} aria-busy={state === "pending"}>
    <div className="rebuild-field"><label htmlFor="enquiry-name">Your name <span>(required)</span></label><input id="enquiry-name" name="name" autoComplete="name" required minLength={2} maxLength={160} /></div>
    <div className="rebuild-field"><label htmlFor="enquiry-email">Email <span>(required)</span></label><input id="enquiry-email" name="email" type="email" autoComplete="email" required maxLength={254} /></div>
    <div className="rebuild-field"><label htmlFor="enquiry-company">Business name <span>(optional)</span></label><input id="enquiry-company" name="company" autoComplete="organization" maxLength={160} /></div>
    <div className="rebuild-field"><label htmlFor="enquiry-service">What do you need?</label><select id="enquiry-service" name="service" value={service} onChange={e => setService(e.target.value)}><option value="website">A website</option><option value="crm">A CRM</option><option value="connected">Website + CRM</option><option value="ecommerce">An online store</option><option value="not-sure">Help deciding</option></select></div>
    <div className="rebuild-field"><label htmlFor="enquiry-message">Tell us about your project <span>(required)</span></label><textarea id="enquiry-message" name="message" rows={5} required minLength={10} maxLength={5000} placeholder="What do you need to improve, and what would a good result look like?" /></div>
    <div className="rebuild-field"><label htmlFor="enquiry-budget">Implementation budget <span>(optional)</span></label><select id="enquiry-budget" name="budget_range" defaultValue=""><option value="">Choose a range</option><option value="under-2000">Under €2,000</option><option value="2000-5000">€2,000–€5,000</option><option value="5000-10000">€5,000–€10,000</option><option value="10000-plus">€10,000+</option><option value="guidance">I’d like guidance</option></select><small>For the initial build or setup. Ongoing services are quoted separately.</small></div>
    <div hidden aria-hidden="true"><label htmlFor="website-fax">Leave this empty</label><input id="website-fax" name="website_fax" tabIndex={-1} autoComplete="off" /></div>
    <div className="rebuild-check"><input id="enquiry-privacy" name="privacy_consent" type="checkbox" required /><label htmlFor="enquiry-privacy">{PRIVACY_NOTICE} <a href="/privacy" target="_blank" rel="noreferrer">Read the Privacy Policy</a> (required)</label></div>
    <div className="rebuild-check"><input id="enquiry-marketing" name="marketing_consent" type="checkbox" /><label htmlFor="enquiry-marketing">{MARKETING_NOTICE} (optional)</label></div>
    {error && <p ref={errorRef} tabIndex={-1} role="alert" className="rebuild-form-error">{error}</p>}
    <button type="submit" className="rebuild-button" disabled={state === "pending"}>{state === "pending" ? "Sending…" : submitLabel}</button>
    <p className="rebuild-form-help">We’ll review your enquiry and get in touch about the next step. Prefer email? <a href="mailto:hello@ingeniumconsulting.net">hello@ingeniumconsulting.net</a></p>
  </form>;
}
