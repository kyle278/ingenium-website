"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

import { getIngeniumTrackingPayload } from "@/lib/ingeniumTrackingPayload";

type FormStep = 1 | 2;
type SubmitState = "idle" | "success";
type ContactFormProps = {
  formId: string;
  formSlug: string;
  formName: string;
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
    return { firstName: null, lastName: null };
  }

  if (parts.length === 1) {
    return { firstName: parts[0] ?? null, lastName: null };
  }

  return { firstName: parts[0] ?? null, lastName: parts.slice(1).join(" ") };
}

function getQueryParam(query: URLSearchParams, key: string) {
  const value = query.get(key);
  if (!value) return null;
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

function createIdempotencyKey() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `contact_submit_${Date.now()}`;
}

export default function ContactForm({
  formId,
  formSlug,
  formName,
  intent,
  submitLabel = "Submit Request",
  successRedirect,
}: ContactFormProps) {
  const router = useRouter();
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
  const [errorMessage, setErrorMessage] = useState("");

  function goToStepTwo() {
    if (!name.trim() || !email.trim() || !challenge.trim()) {
      setErrorMessage("Please complete name, email, and growth challenge before continuing.");
      return;
    }

    setErrorMessage("");
    setStep(2);
    setStepAnimationKey((prev) => prev + 1);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (step === 1) {
      goToStepTwo();
      return;
    }

    if (isSubmitting) return;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedStack = stack.trim();
    const trimmedGoals = goals.trim();
    const { firstName, lastName } = splitFullName(trimmedName);
    const resolvedIntent = intent ?? getQueryParam(new URLSearchParams(window.location.search), "intent");

    const fields: Record<string, unknown> = {
      name: trimmedName,
      email: trimmedEmail,
      challenge,
      companySize,
      stack: trimmedStack,
      timeline,
      budgetRange,
      goals: trimmedGoals,
      first_name: firstName,
      last_name: lastName,
      biggest_growth_challenge: challenge,
      company_size: companySize || null,
      current_stack: trimmedStack || null,
      budget_range: budgetRange || null,
      additional_goals: trimmedGoals || null,
      intent: resolvedIntent,
    };

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      const response = await fetch("/api/portal-form-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId,
          formSlug,
          formName,
          idempotencyKey: createIdempotencyKey(),
          fields,
          tracking: getIngeniumTrackingPayload(),
        }),
      });

      if (!response.ok) {
        let message = "Unable to submit your request. Please try again.";
        const payload = (await response.json().catch(() => null)) as { error?: unknown } | null;
        if (payload && typeof payload.error === "string" && payload.error.trim().length > 0) {
          message = payload.error;
        }
        throw new Error(message);
      }

      if (successRedirect) {
        router.push(successRedirect);
        return;
      }

      setSubmitState("success");
      setErrorMessage("");
    } catch (error) {
      const message =
        error instanceof Error && error.message.trim().length > 0
          ? error.message
          : "Unable to submit your request. Please try again.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
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
      className="space-y-5"
      onSubmit={handleSubmit}
      aria-busy={isSubmitting}
      data-form-id={formId}
      data-form-slug={formSlug}
      data-form-name={formName}
    >
      <div className="flex items-center justify-between rounded-2xl bg-[var(--color-panel-low)] px-4 py-3">
        <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
          Step {step} of 2
        </p>
        <p className="text-xs text-[var(--color-text-muted)]">
          {step === 1 ? "Core intent" : "Qualification details"}
        </p>
      </div>

      <div className="h-1.5 rounded-full bg-[var(--color-panel-mid)]">
        <div
          className="h-full rounded-full bg-[linear-gradient(135deg,var(--color-brand),var(--color-brand-strong))] transition-[width] duration-300"
          style={{ width: step === 1 ? "50%" : "100%" }}
        />
      </div>

      {step === 1 ? (
        <div key={`step-1-${stepAnimationKey}`} className="form-step-enter space-y-5">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-[var(--color-text)]">Name *</span>
            <input className={fieldClassName} type="text" value={name} onChange={(event) => setName(event.target.value)} required />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-[var(--color-text)]">Work Email *</span>
            <input className={fieldClassName} type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-[var(--color-text)]">Biggest Growth Challenge *</span>
            <select className={fieldClassName} value={challenge} onChange={(event) => setChallenge(event.target.value)} required>
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
      ) : (
        <div key={`step-2-${stepAnimationKey}`} className="form-step-enter space-y-5">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-[var(--color-text)]">Company Size</span>
            <select className={fieldClassName} value={companySize} onChange={(event) => setCompanySize(event.target.value)}>
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
            <input className={fieldClassName} type="text" value={stack} onChange={(event) => setStack(event.target.value)} />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-[var(--color-text)]">Timeline</span>
              <select className={fieldClassName} value={timeline} onChange={(event) => setTimeline(event.target.value)}>
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
              <select className={fieldClassName} value={budgetRange} onChange={(event) => setBudgetRange(event.target.value)}>
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
            <textarea className={`min-h-[120px] ${fieldClassName}`} value={goals} onChange={(event) => setGoals(event.target.value)} />
          </label>
        </div>
      )}

      {step === 2 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            className="cta-lift inline-flex items-center justify-center gap-2 rounded-md bg-[var(--color-panel-high)] px-5 py-3 text-sm font-semibold text-[var(--color-brand)]"
            onClick={() => setStep(1)}
            disabled={isSubmitting}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <button
            className="cta-lift inline-flex items-center justify-center gap-2 rounded-md bg-[linear-gradient(135deg,var(--color-brand),var(--color-brand-strong))] px-5 py-3 text-sm font-semibold text-white"
            type="submit"
            disabled={isSubmitting}
            data-track-cta="contact_submit"
            data-track-label="Submit Request"
          >
            {isSubmitting ? "Submitting..." : submitLabel}
            {isSubmitting ? null : <ArrowRight className="h-4 w-4" />}
          </button>
        </div>
      ) : (
        <button
          className="cta-lift inline-flex w-full items-center justify-center gap-2 rounded-md bg-[linear-gradient(135deg,var(--color-brand),var(--color-brand-strong))] px-5 py-3 text-sm font-semibold text-white"
          type="submit"
          disabled={isSubmitting}
          data-track-cta="contact_continue"
          data-track-label="Continue"
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </button>
      )}

      {errorMessage ? <p className="text-sm text-[var(--color-error)]">{errorMessage}</p> : null}

      <p className="text-center text-xs text-[var(--color-text-muted)]">
        Prefer email? Reach us at <span className="font-medium text-[var(--color-brand)]">hello@ingeniumconsulting.net</span>
      </p>
    </form>
  );
}
