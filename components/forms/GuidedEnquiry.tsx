"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Building2, CalendarDays, ChartNoAxesCombined, Check, CheckCircle2, CircleHelp, FileText, Globe2, Layers3, LockKeyhole, Mail, MessagesSquare, Pencil, RefreshCw, Rocket, Search, ShieldCheck, ShoppingBag, Users } from "lucide-react";
import { applicableQuestions, answer, buildJourneyFields, updateAnswer, type Answers, type JourneyField, type JourneyKind } from "@/lib/form-journeys";
import { MARKETING_NOTICE, PRIVACY_NOTICE, validateEnquiry, validService } from "@/lib/enquiry-contract";
import { MIN_FILL_MS } from "@/lib/starter-website";
import { clearEnquiryRequestId, enquiryRequestId, enquiryTracking, recordAcceptedLead, sendEnquiry } from "@/lib/enquiry-client";

const icons = { website: Globe2, chat: MessagesSquare, layers: Layers3, shop: ShoppingBag, help: CircleHelp, refresh: RefreshCw, page: FileText, shield: ShieldCheck, chart: ChartNoAxesCombined, rocket: Rocket, people: Users, calendar: CalendarDays, edit: Pencil, mail: Mail, lock: LockKeyhole, business: Building2, search: Search };
type Receipt = { submission_id: string; lead_route?: string };
type Props = { kind: JourneyKind; formName: string; formSlug: string; intent?: string; submitLabel?: string; successRedirect?: string; initialService?: string; extraFields?: Record<string, string>; onAccepted?: (receipt: Receipt) => void; onPendingChange?: (pending: boolean) => void };

export function ConsentCards({ id, privacy, marketing, onPrivacy, onMarketing }: { id: string; privacy: boolean; marketing: boolean; onPrivacy: (checked: boolean) => void; onMarketing: (checked: boolean) => void }) {
  return <div className="guided-consent-cards">
    <div className={`guided-consent-card ${privacy ? "is-selected" : ""}`}><label htmlFor={`${id}-privacy`}><input id={`${id}-privacy`} name="privacy_consent" type="checkbox" required checked={privacy} onChange={e => onPrivacy(e.target.checked)} /><span><strong><ShieldCheck size={19} aria-hidden="true" />Privacy Policy <small>Required</small></strong><span>{PRIVACY_NOTICE}</span></span></label><a href="/privacy" target="_blank" rel="noopener noreferrer">Read the Privacy Policy<ArrowRight size={14} aria-hidden="true" /></a></div>
    <div className={`guided-consent-card ${marketing ? "is-selected" : ""}`}><label htmlFor={`${id}-marketing`}><input id={`${id}-marketing`} name="marketing_consent" type="checkbox" checked={marketing} onChange={e => onMarketing(e.target.checked)} /><span><strong><Mail size={19} aria-hidden="true" />Marketing consent <small>Optional</small></strong><span>{MARKETING_NOTICE}</span></span></label></div>
  </div>;
}

export default function GuidedEnquiry({ kind, formName, formSlug, intent = "project-enquiry", submitLabel = "Send enquiry", successRedirect, initialService = "", extraFields = {}, onAccepted, onPendingChange }: Props) {
  const router = useRouter(), uid = useId();
  const [answers, setAnswers] = useState<Answers>({ service: initialService });
  const [step, setStep] = useState(() => applicableQuestions(kind, {})[0].id);
  const [status, setStatus] = useState<"idle" | "pending" | "error" | "success">("idle");
  const [error, setError] = useState("");
  const [direction, setDirection] = useState("forward");
  const formRef = useRef<HTMLFormElement>(null), headingRef = useRef<HTMLHeadingElement>(null), errorRef = useRef<HTMLParagraphElement>(null), successRef = useRef<HTMLDivElement>(null);
  const currentStep = useRef(step), navigating = useRef(false), sending = useRef(false), requestId = useRef(""), originalTitle = useRef(""), moved = useRef(false), openedAt = useRef(0);
  const capturedFillMs = useRef("");
  const questions = applicableQuestions(kind, answers), index = questions.findIndex(q => q.id === step), question = questions[index];
  const update = (key: string, value: string | string[]) => setAnswers(current => updateAnswer(current, key, value));
  useEffect(() => {
    originalTitle.current = document.title; openedAt.current = Date.now();
    if (kind === "enquiry") { const value = new URLSearchParams(location.search).get("service"); if (validService(value)) setAnswers(a => ({ ...a, service: value! })); }
    let cancelled = false;
    if (window.matchMedia("(max-width: 600px)").matches && !formRef.current?.closest("[role=dialog],dialog")) void document.fonts.ready.then(() => requestAnimationFrame(() => { if (!cancelled && !moved.current) formRef.current?.scrollIntoView({ behavior: "instant", block: "start" }); }));
    return () => { cancelled = true; document.title = originalTitle.current; };
  }, [kind]);
  useEffect(() => {
    document.title = `${question.title} | Ingenium`;
    if (moved.current) { headingRef.current?.focus({ preventScroll: true }); const modal = formRef.current?.closest("[role=dialog],dialog"); if (modal) modal.scrollTo({ top: 0, behavior: "instant" }); else formRef.current?.scrollIntoView({ behavior: "instant", block: "start" }); }
    navigating.current = false;
  }, [step, question.title]);
  useEffect(() => { if (status === "error") errorRef.current?.focus(); if (status === "success") successRef.current?.focus(); }, [status]);

  function move(from: string, to: string, backwards = false) {
    if (currentStep.current !== from || navigating.current || sending.current) return;
    navigating.current = true; currentStep.current = to; moved.current = true;
    setDirection(backwards ? "back" : "forward"); setError(""); setStatus("idle"); setStep(to);
  }
  function choose(value: string, detail: number) {
    if (detail > 1 || currentStep.current !== question.id || navigating.current || sending.current) return;
    const next = updateAnswer(answers, question.key!, value), route = applicableQuestions(kind, next), nextStep = route[route.findIndex(q => q.id === question.id) + 1];
    setAnswers(next); if (nextStep) move(question.id, nextStep.id);
  }
  function problem(message: string) { setError(message); setStatus("error"); }
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current || status === "success" || navigating.current || currentStep.current !== step || !event.currentTarget.reportValidity()) return;
    if (question.type === "choice" && !answer(answers, question.key!)) { problem("Choose an option to continue."); return; }
    for (const field of question.fields || []) {
      const value = answer(answers, field.name).trim();
      if (field.required && value.length < (field.min || 1)) { problem(`Please enter ${field.label.toLowerCase()}.`); return; }
      if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) { problem("Please enter a valid email address."); return; }
    }
    if (question.type !== "consent") { const next = questions[index + 1]; if (next) move(step, next.id); return; }
    const elapsed = String(Date.now() - openedAt.current);
    if (kind === "starter" && !capturedFillMs.current && Number(elapsed) >= MIN_FILL_MS) capturedFillMs.current = elapsed;
    const fields = buildJourneyFields(kind, answers, { ...extraFields, ...(kind === "enquiry" ? { intent } : {}), ...(kind === "starter" ? { fill_ms: capturedFillMs.current || elapsed } : {}) });
    const key = kind === "enquiry" ? `${formSlug}:${intent}` : kind === "visibility" ? "visibility-check" : kind === "brief" ? "website-project-brief" : kind === "template" ? "template-gallery" : "starter-website";
    requestId.current ||= enquiryRequestId(key);
    const payload = { request_id: requestId.current, form_slug: formSlug, fields, tracking: enquiryTracking() }, invalid = validateEnquiry(payload);
    if (invalid) { problem(invalid); return; }
    sending.current = true; setStatus("pending"); setError(""); onPendingChange?.(true);
    try {
      const receipt = await sendEnquiry(payload);
      clearEnquiryRequestId(key); recordAcceptedLead(receipt.submission_id, fields.service || "website"); setStatus("success");
      onAccepted?.(receipt);
      if (successRedirect?.startsWith("/") && !successRedirect.startsWith("//")) router.push(successRedirect);
    } catch (err) { problem(err instanceof Error ? err.message : "We couldn’t confirm receipt. Your answers have been kept. Please email us before changing and resending an uncertain request."); }
    finally { sending.current = false; onPendingChange?.(false); }
  }
  if (status === "success") return <div ref={successRef} tabIndex={-1} className="guided-receipt" role="status"><CheckCircle2 size={32} aria-hidden="true" /><h2>{kind === "visibility" ? "Your visibility check is requested." : kind === "brief" ? "Your brief is in." : kind === "template" ? "Your gallery access is ready." : "Your enquiry has been received."}</h2><p>{kind === "visibility" ? "We’ll review your business, service and town, then email your check. This is a human review, so there’s no instant score." : kind === "brief" ? "We’ll review your brief and email you to discuss the scope and next steps. No project or launch date is confirmed by this request." : "We’ll review your request and reply by email. An appointment has not been booked."}</p><Link href="/" className="rebuild-text-link">Back to the homepage<ArrowRight size={16} aria-hidden="true" /></Link></div>;

  function field(item: JourneyField) {
    const id = `${uid}-${item.name}`, help = item.help ? `${id}-help` : undefined;
    const props = { id, name: item.name, value: answer(answers, item.name), required: item.required, minLength: item.min, maxLength: item.max || 500, autoComplete: item.autoComplete, "aria-describedby": help, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => update(item.name, e.target.value) };
    return <div className={`guided-field ${item.name === "first_name" || item.name === "last_name" ? "guided-name" : ""}`} key={item.name}><label htmlFor={id}>{item.label}<span>({item.required ? "required" : "optional"})</span></label>{item.type === "textarea" ? <textarea {...props} rows={3} /> : <input {...props} type={item.type || "text"} inputMode={item.type === "email" ? "email" : item.type === "tel" ? "tel" : undefined} />}{item.help && <small id={help}>{item.help}</small>}</div>;
  }
  return <form ref={formRef} name={formName} data-portal-form-slug={formSlug} className="guided-enquiry" data-journey={kind} data-step={step} onSubmit={submit} noValidate aria-labelledby={`${uid}-question`} aria-busy={status === "pending"} onKeyDown={e => { if (e.repeat && ["Enter", " "].includes(e.key) && (e.target as HTMLElement).closest("button")) e.preventDefault(); }}>
    <div className="guided-progress"><span>{question.type === "consent" ? "Privacy & send" : step === "contact" ? "Your details" : kind === "template" ? "Gallery access" : "Your request"}</span><span>{kind === "brief" ? "Scope → details → send" : kind === "starter" ? "Needs → details → send" : `Step ${index + 1} of ${questions.length}`}</span></div>
    <div key={step} className="guided-screen" data-direction={direction}>
      <h2 id={`${uid}-question`} ref={headingRef} tabIndex={-1}>{question.title}</h2><p className="guided-help">{question.help}</p>
      <fieldset disabled={status === "pending"} className="guided-fields" aria-labelledby={`${uid}-question`}>
        {question.type === "choice" && <><p className="guided-cue">Choose one to continue<ArrowRight size={14} aria-hidden="true" /></p><div className="guided-options">{question.choices?.map(option => { const Icon = icons[option.icon as keyof typeof icons] || CircleHelp; return <button type="button" className={`guided-option ${answer(answers, question.key!) === option.value ? "is-saved" : ""}`} key={option.value} onClick={e => choose(option.value, e.detail)}><Icon size={21} aria-hidden="true" /><strong>{option.title}</strong><ArrowRight size={16} aria-hidden="true" /></button>; })}</div></>}
        {question.type === "multi" && <div className="guided-options guided-multi">{question.choices?.map(option => { const selected = Array.isArray(answers[question.key!]) ? answers[question.key!] as string[] : [], checked = selected.includes(option.value), Icon = icons[option.icon as keyof typeof icons] || CircleHelp; return <label className={`guided-option ${checked ? "is-saved" : ""}`} key={option.value}><input name={question.key} type="checkbox" value={option.value} checked={checked} onChange={() => update(question.key!, checked ? selected.filter(v => v !== option.value) : [...selected, option.value])} /><Icon size={19} aria-hidden="true" /><strong>{option.title}</strong><Check size={16} className="guided-multi-check" aria-hidden="true" /></label>; })}</div>}
        {question.type === "fields" && <div className="guided-field-grid">{question.fields?.map(field)}</div>}
        {question.type === "consent" && <><ConsentCards id={uid} privacy={answer(answers, "privacy_consent") === "true"} marketing={answer(answers, "marketing_consent") === "true"} onPrivacy={checked => update("privacy_consent", String(checked))} onMarketing={checked => update("marketing_consent", String(checked))} />{kind === "brief" && <label className="guided-accuracy"><input name="accuracy_confirmation" type="checkbox" required checked={answer(answers, "accuracy_confirmation") === "true"} onChange={e => update("accuracy_confirmation", String(e.target.checked))} /><span>I confirm these details are accurate enough for planning and scoping. <strong>(Required)</strong></span></label>}</>}
      </fieldset>
    </div>
    <div hidden aria-hidden="true"><label htmlFor={`${uid}-fax`}>Leave this empty</label><input id={`${uid}-fax`} name="website_fax" tabIndex={-1} autoComplete="off" value={answer(answers, "website_fax")} onChange={e => update("website_fax", e.target.value)} /></div>
    {error && <p ref={errorRef} tabIndex={-1} role="alert" className="rebuild-form-error">{error}</p>}
    <div className="guided-actions">{index > 0 && <button type="button" className="guided-back" disabled={status === "pending"} onClick={() => move(step, questions[index - 1].id, true)}><ArrowLeft size={17} aria-hidden="true" />Back</button>}{(question.type !== "choice" || answer(answers, question.key!)) && <button className="rebuild-button" type="submit" disabled={status === "pending"}>{status === "pending" ? "Sending your request…" : question.type === "consent" ? submitLabel : question.type === "choice" ? "Continue with this choice" : "Continue"}<ArrowRight size={17} aria-hidden="true" /></button>}</div>
    <p className="guided-footnote">Refreshing clears your answers. <a href="mailto:hello@ingeniumconsulting.net">Prefer email?</a>{kind !== "template" && kind !== "starter" && <> · <a href="#cookie-settings">Privacy settings</a></>}</p>
  </form>;
}


