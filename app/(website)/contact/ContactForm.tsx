"use client";

import { useEffect, useEffectEvent, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

import ConsentCardField from "../components/ConsentCardField";

import { PORTAL_CONSENT_VERSION } from "@/lib/portalIntegration/public";

type FormStep = 1 | 2 | 3;
type SubmitState = "idle" | "success";
const FORM_ERROR_MESSAGE =
  "Unable to submit your request right now. Email hello@ingeniumconsulting.net and we will reply within 1 business day.";

type ContactFormProps = {
  formName: string;
  formSlug: string;
  intent?: string;
  submitLabel?: string;
  successRedirect?: string;
};

const fieldClassName =
  "w-full rounded-lg bg-[var(--color-panel-low)] px-4 py-3 text-sm text-[var(--color-text)] outline-none transition focus:bg-white focus:ring-2 focus:ring-[rgba(0,87,191,0.18)]";

function splitFullName(fullName: string) {
  const parts = fullName
    .split(/\s+/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length === 0) {
    return { firstName: "", lastName: "" };
  }

  if (parts.length === 1) {
    return { firstName: parts[0] ?? "", lastName: "" };
  }

  return { firstName: parts[0] ?? "", lastName: parts.slice(1).join(" ") };
}

export default function ContactForm({
  formName,
  formSlug,
  intent,
  submitLabel = "Submit Request",
  successRedirect,
}: ContactFormProps) {
  const router = useRouter();
  const privacyConsentId = useId();
  const marketingConsentId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const consentCapturedAtRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<FormStep>(1);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [stepAnimationKey, setStepAnimationKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [challenge, setChallenge] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [stack, setStack] = useState("");
  const [timeline, setTimeline] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [goals, setGoals] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { firstName, lastName } = splitFullName(name.trim());
  const canonicalCompanySize = companySize.trim();
  const canonicalStack = stack.trim();
  const canonicalBudgetRange = budgetRange.trim();
  const canonicalGoals = goals.trim();

  function goToStep(nextStep: FormStep) {
    setErrorMessage("");
    setStep(nextStep);
    setStepAnimationKey((current) => current + 1);
  }

  function handleContinueFromStepOne() {
    if (!name.trim() || !email.trim() || !challenge.trim()) {
      setErrorMessage("Please complete name, email, and growth challenge before continuing.");
      return;
    }

    goToStep(2);
  }

  function handleContinueFromStepTwo() {
    goToStep(3);
  }

  function resetFormState() {
    setStep(1);
    setSubmitState("idle");
    setIsSubmitting(false);
    setName("");
    setEmail("");
    setChallenge("");
    setCompanySize("");
    setStack("");
    setTimeline("");
    setBudgetRange("");
    setGoals("");
    setPrivacyConsent(false);
    setMarketingConsent(false);
    setErrorMessage("");
    setStepAnimationKey((current) => current + 1);
  }

  const handlePortalSuccess = useEffectEvent(() => {
    if (successRedirect) {
      router.push(successRedirect);
      return;
    }

    resetFormState();
    setSubmitState("success");
  });

  const handlePortalSubmitting = useEffectEvent(() => {
    setIsSubmitting(true);
    setErrorMessage("");
  });

  const handlePortalError = useEffectEvent(() => {
    setIsSubmitting(false);
    setErrorMessage(FORM_ERROR_MESSAGE);
  });

  useEffect(() => {
    const form = formRef.current;
    if (!form) {
      return;
    }

    function onSubmitting(event: Event) {
      if (event.target !== form) {
        return;
      }

      handlePortalSubmitting();
    }

    function onSuccess(event: Event) {
      if (event.target !== form) {
        return;
      }

      handlePortalSuccess();
    }

    function onError(event: Event) {
      if (event.target !== form) {
        return;
      }

      handlePortalError();
    }

    form.addEventListener("ingenium:form-submitting", onSubmitting);
    form.addEventListener("ingenium:form-success", onSuccess);
    form.addEventListener("ingenium:form-error", onError);

    return () => {
      form.removeEventListener("ingenium:form-submitting", onSubmitting);
      form.removeEventListener("ingenium:form-success", onSuccess);
      form.removeEventListener("ingenium:form-error", onError);
    };
  }, []);

  function handleSubmitCapture(event: React.FormEvent<HTMLFormElement>) {
    if (step !== 3) {
      event.preventDefault();
      return;
    }

    if (!privacyConsent) {
      event.preventDefault();
      setErrorMessage("Please confirm the privacy acknowledgment before submitting.");
      return;
    }

    if (consentCapturedAtRef.current) {
      consentCapturedAtRef.current.value = new Date().toISOString();
    }

    setIsSubmitting(true);
    setErrorMessage("");
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLFormElement>) {
    if (step === 3 || event.key !== "Enter" || event.target instanceof HTMLTextAreaElement) {
      return;
    }

    event.preventDefault();
  }

  if (submitState === "success") {
    return (
      <div className="rounded-[28px] bg-white px-6 py-10 text-center shadow-[0_4px_24px_rgba(24,28,31,0.06)]">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(0,87,191,0.10)]">
          <CheckCircle2 className="h-6 w-6 text-[var(--color-brand)]" />
        </div>
        <h3 className="mt-4 font-[var(--font-display)] text-2xl font-semibold tracking-[-0.04em] text-[var(--color-text)]">
          Request submitted
        </h3>
        <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">
          Thanks. We will reply from hello@ingeniumconsulting.net within 1 business day.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      aria-busy={isSubmitting}
      className="space-y-5"
      data-form-slug={formSlug}
      data-ingenium-form-label={formName}
      data-ingenium-reset-on-success="false"
      data-ingenium-submit="portal"
      id={`${formSlug}-form`}
      method="post"
      name={formName}
      onKeyDown={handleKeyDown}
      onSubmitCapture={handleSubmitCapture}
    >
      <input name="first_name" type="hidden" value={firstName} />
      <input name="last_name" type="hidden" value={lastName} />
      <input name="biggest_growth_challenge" type="hidden" value={challenge} />
      <input name="company_size" type="hidden" value={canonicalCompanySize} />
      <input name="current_stack" type="hidden" value={canonicalStack} />
      <input name="budget_range" type="hidden" value={canonicalBudgetRange} />
      <input name="additional_goals" type="hidden" value={canonicalGoals} />
      <input name="intent" type="hidden" value={intent ?? ""} />
      <input name="privacy_consent" type="hidden" value={privacyConsent ? "true" : "false"} />
      <input name="marketing_consent" type="hidden" value={marketingConsent ? "true" : "false"} />
      <input name="consent_version" type="hidden" value={PORTAL_CONSENT_VERSION} />
      <input
        name="consent_text_snapshot"
        type="hidden"
        value="I confirm Ingenium may use my details to reply to this request under the Privacy Policy."
      />
      <input ref={consentCapturedAtRef} name="consent_captured_at" type="hidden" value="" />

      <div className="flex items-center justify-between rounded-2xl bg-[var(--color-panel-low)] px-4 py-3">
        <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
          Step {step} of 3
        </p>
        <p className="text-xs text-[var(--color-text-muted)]">
          {step === 1 ? "Core intent" : step === 2 ? "Qualification details" : "Consent and submit"}
        </p>
      </div>

      <div className="h-1.5 rounded-full bg-[var(--color-panel-mid)]">
        <div
          className="h-full rounded-full bg-[linear-gradient(135deg,var(--color-brand),var(--color-brand-strong))] transition-[width] duration-300"
          style={{ width: step === 1 ? "33.33%" : step === 2 ? "66.66%" : "100%" }}
        />
      </div>

      <div hidden={step !== 1} key={`step-1-${stepAnimationKey}`} className="form-step-enter space-y-5">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[var(--color-text)]">Name *</span>
          <input
            className={fieldClassName}
            name="name"
            onChange={(event) => setName(event.target.value)}
            required
            type="text"
            value={name}
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[var(--color-text)]">Work Email *</span>
          <input
            className={fieldClassName}
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
            value={email}
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[var(--color-text)]">Biggest Growth Challenge *</span>
          <select
            className={fieldClassName}
            name="challenge"
            onChange={(event) => setChallenge(event.target.value)}
            required
            value={challenge}
          >
            <option value="">Select your challenge</option>
            <option value="Website conversion">Website conversion</option>
            <option value="CRM and pipeline">CRM and pipeline</option>
            <option value="Automation and workflows">Automation and workflows</option>
            <option value="AI operations">AI operations</option>
            <option value="Security and governance">Security and governance</option>
            <option value="Other">Other</option>
          </select>
        </label>
      </div>

      <div hidden={step !== 2} key={`step-2-${stepAnimationKey}`} className="form-step-enter space-y-5">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[var(--color-text)]">Company Size</span>
          <select
            className={fieldClassName}
            name="companySize"
            onChange={(event) => setCompanySize(event.target.value)}
            value={companySize}
          >
            <option value="">Select company size</option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-200">51-200</option>
            <option value="201-1000">201-1000</option>
            <option value="1000+">1000+</option>
          </select>
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[var(--color-text)]">Current Stack</span>
          <input
            className={fieldClassName}
            name="stack"
            onChange={(event) => setStack(event.target.value)}
            type="text"
            value={stack}
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-[var(--color-text)]">Timeline</span>
            <select
              className={fieldClassName}
              name="timeline"
              onChange={(event) => setTimeline(event.target.value)}
              value={timeline}
            >
              <option value="">Select timeline</option>
              <option value="Immediately">Immediately</option>
              <option value="Within 30 days">Within 30 days</option>
              <option value="Within 90 days">Within 90 days</option>
              <option value="This quarter">This quarter</option>
              <option value="Exploring options">Exploring options</option>
            </select>
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-[var(--color-text)]">Budget Range</span>
            <select
              className={fieldClassName}
              name="budgetRange"
              onChange={(event) => setBudgetRange(event.target.value)}
              value={budgetRange}
            >
              <option value="">Select budget range</option>
              <option value="Under 25k">Under 25k</option>
              <option value="25k-50k">25k-50k</option>
              <option value="50k-100k">50k-100k</option>
              <option value="100k+">100k+</option>
            </select>
          </label>
        </div>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[var(--color-text)]">Additional Goals</span>
          <textarea
            className={`min-h-[120px] ${fieldClassName}`}
            name="goals"
            onChange={(event) => setGoals(event.target.value)}
            value={goals}
          />
        </label>
      </div>

      <div hidden={step !== 3} key={`step-3-${stepAnimationKey}`} className="form-step-enter space-y-5">
        <div className="rounded-2xl bg-[var(--color-panel-low)] px-4 py-4 text-sm leading-7 text-[var(--color-text-soft)]">
          We use these details only to reply to this request and scope the right next step. Marketing updates stay
          optional and separate.
        </div>

        <ConsentCardField
          checked={privacyConsent}
          description="I have read the Privacy Policy and I consent to Ingenium using the information above to respond to this request."
          error={
            errorMessage === "Please confirm the privacy acknowledgment before submitting."
              ? errorMessage
              : undefined
          }
          id={privacyConsentId}
          label="Privacy acknowledgment"
          onCheckedChange={setPrivacyConsent}
          required
        />

        <ConsentCardField
          checked={marketingConsent}
          description="Send occasional email updates about websites, CRM, automation, and AI workflow improvements. This is optional."
          id={marketingConsentId}
          label="Marketing email updates"
          onCheckedChange={setMarketingConsent}
        />
      </div>

      {step === 1 ? (
        <button
          className="cta-lift inline-flex w-full items-center justify-center gap-2 rounded-md bg-[linear-gradient(135deg,var(--color-brand),var(--color-brand-strong))] px-5 py-3 text-sm font-semibold text-white"
          disabled={isSubmitting}
          onClick={handleContinueFromStepOne}
          type="button"
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </button>
      ) : null}

      {step === 2 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            className="cta-lift inline-flex items-center justify-center gap-2 rounded-md bg-[var(--color-panel-high)] px-5 py-3 text-sm font-semibold text-[var(--color-brand)]"
            disabled={isSubmitting}
            onClick={() => goToStep(1)}
            type="button"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <button
            className="cta-lift inline-flex items-center justify-center gap-2 rounded-md bg-[linear-gradient(135deg,var(--color-brand),var(--color-brand-strong))] px-5 py-3 text-sm font-semibold text-white"
            disabled={isSubmitting}
            onClick={handleContinueFromStepTwo}
            type="button"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            className="cta-lift inline-flex items-center justify-center gap-2 rounded-md bg-[var(--color-panel-high)] px-5 py-3 text-sm font-semibold text-[var(--color-brand)]"
            disabled={isSubmitting}
            onClick={() => goToStep(2)}
            type="button"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <button
            className="cta-lift inline-flex items-center justify-center gap-2 rounded-md bg-[linear-gradient(135deg,var(--color-brand),var(--color-brand-strong))] px-5 py-3 text-sm font-semibold text-white"
            data-track-cta="contact_submit"
            data-track-label="Submit Request"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Submitting..." : submitLabel}
            {isSubmitting ? null : <ArrowRight className="h-4 w-4" />}
          </button>
        </div>
      ) : null}

      <div className="rounded-2xl bg-[var(--color-panel-low)] px-4 py-3 text-xs leading-6 text-[var(--color-text-muted)]">
        We reply from hello@ingeniumconsulting.net within 1 business day. This form is used only to route your enquiry
        and scope the right next step.
      </div>

      {errorMessage && errorMessage !== "Please confirm the privacy acknowledgment before submitting." ? (
        <p className="text-sm text-[var(--color-error)]">{errorMessage}</p>
      ) : null}

      <p className="text-center text-xs text-[var(--color-text-muted)]">
        Prefer email? Reach us at <span className="font-medium text-[var(--color-brand)]">hello@ingeniumconsulting.net</span>
      </p>
    </form>
  );
}
