"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, CircleHelp, Globe2, Layers3, MessageCircle, ShoppingBag, ShieldCheck, Mail } from "lucide-react";
import { businessPackages, getBusinessPackage } from "@/lib/business-packages";
import { clearEnquiryRequestId, enquiryRequestId, enquiryTracking, recordAcceptedLead, sendEnquiry } from "@/lib/enquiry-client";
import { MARKETING_NOTICE, NOTICE_VERSION, PRIVACY_NOTICE, validService, validContactPhone, validateEnquiry } from "@/lib/enquiry-contract";

import { PackagePrice } from "./PackagePricing";

type Step = "need" | "timing" | "details" | "consent";
const topics = [
  { value: "website", title: "Starter Website", icon: Globe2 },
  { value: "crm", title: "CRM & Automation", icon: MessageCircle },
  { value: "connected", title: "Business Growth", icon: Layers3 },
  { value: "ecommerce", title: "An online shop", icon: ShoppingBag },
  { value: "not-sure", title: "Help deciding", icon: CircleHelp },
] as const;
const headings: Record<Step, string> = { need: "What can we help with?", timing: "When suits you?", details: "Where can we reach you?", consent: "A quick privacy check." };
const windows = [{ value: "", title: "Flexible", detail: "Any time" }, { value: "morning", title: "Morning", detail: "9am–12pm" }, { value: "afternoon", title: "Afternoon", detail: "12pm–5pm" }];

export default function CallRequestJourney({ initialService = "not-sure", initialPackage, initialNow = 0 }: { initialService?: string; initialPackage?: string; initialNow?: number }) {
  const initialOffer = getBusinessPackage(initialPackage);
  const prefilledService = initialOffer?.service || (validService(initialService) ? initialService : "not-sure");
  const initialStep = initialOffer || prefilledService !== "not-sure" ? "timing" : "need";
  const [step, setStep] = useState<Step>(initialStep);
  const [service, setService] = useState(prefilledService);
  const [selectedPackage, setSelectedPackage] = useState(initialOffer);
  const [answers, setAnswers] = useState({ preferred_date: "", preferred_time: "", first_name: "", last_name: "", email: "", company: "", phone: "", notes: "", website_fax: "" });
  const [privacy, setPrivacy] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [marketingEmail, setMarketingEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [today, setToday] = useState("");
  const [direction, setDirection] = useState("forward");
  const activeStep = useRef<Step>(initialStep);
  const pointerStep = useRef<Step>(initialStep);
  const sending = useRef(false);
  const requestId = useRef("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const shellRef = useRef<HTMLFormElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const hasNavigated = useRef(false);
  const originalTitle = useRef("");

  useEffect(() => {
    originalTitle.current = document.title;
    setToday(new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Dublin", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()));
    return () => { document.title = originalTitle.current; };
  }, []);
  useEffect(() => {
    if (initialStep === "timing" && window.matchMedia("(max-width: 600px)").matches) shellRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
  }, [initialStep]);
  useEffect(() => {
    document.title = `${headings[step]} | Ingenium`;
    if (hasNavigated.current) {
      headingRef.current?.focus({ preventScroll: true });
      shellRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
    }
  }, [step]);
  useEffect(() => {
    if (status === "success") { document.title = "Call request received | Ingenium"; successRef.current?.focus(); }
  }, [status]);
  useEffect(() => { if (error) errorRef.current?.focus(); }, [error]);

  function move(from: Step, to: Step, backwards = false) {
    // Reject a second activation from a screen that has already committed.
    if (activeStep.current !== from || sending.current || status === "success") return;
    activeStep.current = to;
    hasNavigated.current = true;
    setDirection(backwards ? "back" : "forward");
    setError(""); setStatus("idle"); setStep(to);
  }
  function choose(value: typeof prefilledService, detail: number) {
    if (detail > 1 || activeStep.current !== "need") return;
    setService(value);
    setSelectedPackage(businessPackages.find(item => item.service === value));
    move("need", "timing");
  }
  function update(key: keyof typeof answers, value: string) { setAnswers(current => ({ ...current, [key]: value })); }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (activeStep.current !== step || sending.current || status === "success" || !event.currentTarget.reportValidity()) return;
    if (activeStep.current === "timing") { move("timing", "details"); return; }
    if (activeStep.current === "details") {
      if (!answers.first_name.trim() || !answers.last_name.trim()) { setError("Please enter your first name and last name."); return; }
      if (!validContactPhone(answers.phone)) { setError("Please enter a phone number with 7–15 digits so we can call you."); return; }
      move("details", "consent"); return;
    }
    if (activeStep.current !== "consent") return;
    const fields: Record<string, string> = Object.fromEntries(Object.entries(answers).map(([key, value]) => [key, value.trim()]));
    if (marketing) fields.email = marketingEmail.trim();
    Object.assign(fields, {
      intent: "free-call", service, budget_range: "", timezone: "Europe/Dublin",
      privacy_consent: privacy ? "true" : "false", marketing_consent: marketing ? "true" : "false",
      consent_version: NOTICE_VERSION, consent_text_snapshot: PRIVACY_NOTICE, marketing_consent_text: MARKETING_NOTICE,
      name: `${fields.first_name} ${fields.last_name}`,
    });
    if (selectedPackage && selectedPackage.service === service) { fields.package_interest = selectedPackage.name; fields.package_id = selectedPackage.id; }
    fields.message = `Free 15-minute call request. Please call ${fields.phone}. Help with: ${service}. Package interest: ${fields.package_interest || "help deciding"}. Preferred date: ${fields.preferred_date || "flexible"}; time: ${fields.preferred_time || "flexible"} (Europe/Dublin). ${fields.notes || ""}`;
    requestId.current ||= enquiryRequestId("free-call");
    const payload = { request_id: requestId.current, form_slug: "contact", fields, tracking: enquiryTracking() };
    const invalid = validateEnquiry(payload);
    if (invalid) { setError(invalid); setStatus("error"); return; }
    sending.current = true; setStatus("pending"); setError("");
    try {
      const receipt = await sendEnquiry(payload);
      clearEnquiryRequestId("free-call");
      recordAcceptedLead(receipt.submission_id, service);
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn’t confirm receipt. Please email hello@ingeniumconsulting.net before sending again.");
      setStatus("error");
    } finally { sending.current = false; }
  }

  const topic = topics.find(item => item.value === service)!;
  const stage = step === "details" ? 1 : step === "consent" ? 2 : 0;

  if (status === "success") return <div ref={successRef} tabIndex={-1} className="local-receipt call-receipt" role="status"><CheckCircle2 size={32} aria-hidden="true" /><h2>Your call request is in.</h2><p>We’ll contact you on <strong>{answers.phone}</strong> to agree a time for your free 15-minute call. Your preference is a request; the appointment is confirmed once we agree it together.</p><Link href="/">Back to the homepage ↗</Link></div>;

  return <form ref={shellRef} className="call-journey" data-portal-form-slug="contact" onSubmit={submit} aria-labelledby="call-question" aria-busy={status === "pending"} onKeyDown={event => { if (event.repeat && (event.key === "Enter" || event.key === " ") && (event.target as HTMLElement).closest("button")) event.preventDefault(); }} onMouseDownCapture={event => {
    if (event.detail > 1 && pointerStep.current !== activeStep.current) { event.preventDefault(); event.stopPropagation(); }
    else pointerStep.current = activeStep.current;
  }} onClickCapture={event => { if (event.detail > 1 && (pointerStep.current !== activeStep.current || (event.target as HTMLElement).closest("button"))) { event.preventDefault(); event.stopPropagation(); } }}>
    <ol className="call-progress" aria-label="Call request progress">{["Your call", "Your details", "Privacy & send"].map((label, i) => <li key={label} aria-current={stage === i ? "step" : undefined} className={stage > i ? "is-complete" : ""}><span aria-hidden="true">{stage > i ? <Check size={12} /> : i + 1}</span>{label}</li>)}</ol>
    <fieldset disabled={status === "pending"} className="call-fields">
      <legend className="sr-only">Free 15-minute call request</legend>
      <div key={step} className={`call-screen call-screen-${direction}`}>
        <div className="call-heading"><h2 id="call-question" ref={headingRef} tabIndex={-1}>{headings[step]}</h2><p>{step === "need" ? "Choose one to continue. Your phone number lets us arrange the call." : step === "timing" ? "Optional. We’ll agree a time with you." : step === "details" ? "Leave your number so we can arrange your free 15-minute call." : "Choose your preferences, then send your request."}</p></div>

        {step === "need" && <><div className="call-topics" role="group" aria-labelledby="call-question">{topics.map(({ value, title, icon: Icon }) => <button type="button" className="call-topic" key={value} onClick={event => choose(value, event.detail)}><Icon size={21} aria-hidden="true" /><span>{title}</span><ArrowRight size={17} aria-hidden="true" /></button>)}</div>{hasNavigated.current && <div className="call-saved"><span>Saved: {topic.title}</span><button type="button" onClick={() => move("need", "timing")}>Continue with this <ArrowRight size={16} aria-hidden="true" /></button></div>}</>}

        {step === "timing" && <>
          <div className="call-topic-summary"><div><span>Your call is about</span><strong>{selectedPackage?.name || topic.title}</strong></div><button type="button" className="call-edit" onClick={() => move("timing", "need", true)}>Change<span className="sr-only"> topic</span></button></div>
          <div className="call-field"><label htmlFor="call-date">Preferred day <span>(optional)</span></label><input id="call-date" name="preferred_date" type="date" min={today || undefined} value={answers.preferred_date} onChange={event => update("preferred_date", event.target.value)} /><small>Leave blank if any day works.</small></div>
          <fieldset className="call-windows"><legend>Best time <span>(optional)</span></legend><div>{windows.map(({ value, title, detail }) => <label key={title} className={answers.preferred_time === value ? "is-selected" : ""}><input name="preferred_time" type="radio" value={value} checked={answers.preferred_time === value} onChange={event => update("preferred_time", event.target.value)} /><strong>{title}</strong><span>{detail}</span></label>)}</div></fieldset>
          <p className="call-help">Times are in Ireland (Europe/Dublin).</p>
        </>}

        {step === "details" && <div className="call-contact-fields">
          <div className="call-name-row"><div className="call-field"><label htmlFor="call-first-name">First name <span>(required)</span></label><input id="call-first-name" name="first_name" autoComplete="given-name" required minLength={1} maxLength={80} value={answers.first_name} onChange={event => update("first_name", event.target.value)} /></div>
          <div className="call-field"><label htmlFor="call-last-name">Last name <span>(required)</span></label><input id="call-last-name" name="last_name" autoComplete="family-name" required minLength={1} maxLength={80} value={answers.last_name} onChange={event => update("last_name", event.target.value)} /></div></div>
          <div className="call-field"><label htmlFor="call-phone">Phone number <span>(required)</span></label><input id="call-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required minLength={7} maxLength={50} aria-describedby="call-phone-help" value={answers.phone} onChange={event => update("phone", event.target.value)} /><small id="call-phone-help">Required so we can call you.</small></div>
          <details className="call-extras"><summary>Email or extra details <span>(optional)</span></summary><div className="call-contact-fields">
            <div className="call-field"><label htmlFor="call-email">Email <span>(optional)</span></label><input id="call-email" name="email" type="email" inputMode="email" autoComplete="email" maxLength={254} value={answers.email} onChange={event => update("email", event.target.value)} /></div>
            <div className="call-field"><label htmlFor="call-company">Business name <span>(optional)</span></label><input id="call-company" name="company" autoComplete="organization" maxLength={160} value={answers.company} onChange={event => update("company", event.target.value)} /><small>Helps us learn about your business before the call.</small></div>
            <div className="call-field"><label htmlFor="call-notes">Anything to discuss? <span>(optional)</span></label><textarea id="call-notes" name="notes" rows={2} maxLength={2000} value={answers.notes} onChange={event => update("notes", event.target.value)} /></div>
          </div></details>
          {selectedPackage && <details className="call-extras call-offer"><summary>Selected offer &amp; pricing</summary><p><strong>{selectedPackage.name}</strong></p><PackagePrice packageId={selectedPackage.id} initialNow={initialNow} /><p className="call-help">No VAT charged. Scope and total are confirmed in writing.</p></details>}
        </div>}

        {step === "consent" && <div className="call-consents">
          <div><label className={`call-consent-card${privacy ? " is-selected" : ""}`} htmlFor="call-privacy">
            <ShieldCheck size={23} aria-hidden="true" /><span className="call-consent-copy"><strong>Privacy Policy <span>Required</span></strong><span>{PRIVACY_NOTICE}</span></span>
            <input id="call-privacy" name="privacy_consent" type="checkbox" required checked={privacy} onChange={event => setPrivacy(event.target.checked)} />
          </label><Link className="call-policy-link" href="/privacy" target="_blank" rel="noopener noreferrer">Read the Privacy Policy ↗</Link></div>
          <label className={`call-consent-card${marketing ? " is-selected" : ""}`} htmlFor="call-marketing">
            <Mail size={23} aria-hidden="true" /><span className="call-consent-copy"><strong>Marketing consent <span>Optional</span></strong><span>{MARKETING_NOTICE}</span></span>
            <input id="call-marketing" name="marketing_consent" type="checkbox" checked={marketing} onChange={event => { setMarketing(event.target.checked); if (event.target.checked) setMarketingEmail(current => current || answers.email); }} />
          </label>
          {marketing && <div className="call-field"><label htmlFor="call-marketing-email">Email for updates <span>(required for this opt-in)</span></label><input id="call-marketing-email" name="marketing_email" type="email" inputMode="email" autoComplete="email" required maxLength={254} value={marketingEmail} onChange={event => setMarketingEmail(event.target.value)} /><small>Only needed if you choose email updates.</small></div>}
        </div>}

        <div hidden aria-hidden="true"><label htmlFor="call-fax">Leave this empty</label><input id="call-fax" name="website_fax" tabIndex={-1} autoComplete="off" value={answers.website_fax} onChange={event => update("website_fax", event.target.value)} /></div>
        {error && <p ref={errorRef} tabIndex={-1} className="rebuild-form-error" role="alert">{error} <a href="mailto:hello@ingeniumconsulting.net">Email us</a></p>}
        {step !== "need" && <div className="call-actions">{step !== "timing" && <button type="button" className="call-back" onClick={() => { move(step, step === "consent" ? "details" : "timing", true); }}><ArrowLeft size={17} aria-hidden="true" />Back</button>}<button type="submit" className="rebuild-button">{status === "pending" ? "Sending your request…" : step === "consent" ? "Request my free call" : "Continue"}<ArrowRight size={17} aria-hidden="true" /></button></div>}
        {step === "consent" && <p className="call-help">Your call is booked once we confirm a time together.</p>}
      </div>
    </fieldset>
    <p className="guided-footnote">Refreshing clears your answers. <a href="#cookie-settings">Privacy settings</a></p>
  </form>;
}
