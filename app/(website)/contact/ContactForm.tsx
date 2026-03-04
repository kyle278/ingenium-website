"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

import { getIngeniumTrackingPayload } from "@/lib/ingeniumTrackingPayload";

type FormStep = 1 | 2;
type SubmitState = "idle" | "success";

const fieldClassName =
  "w-full rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30";

function splitFullName(fullName: string) {
  const parts = fullName
    .split(/\s+/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length === 0) {
    return {
      firstName: null,
      lastName: null,
    };
  }

  if (parts.length === 1) {
    return {
      firstName: parts[0] ?? null,
      lastName: null,
    };
  }

  return {
    firstName: parts[0] ?? null,
    lastName: parts.slice(1).join(" "),
  };
}

function getQueryParam(query: URLSearchParams, key: string) {
  const value = query.get(key);
  if (!value) {
    return null;
  }

  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

export default function ContactForm() {
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

    if (isSubmitting) {
      return;
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedStack = stack.trim();
    const trimmedGoals = goals.trim();
    const { firstName, lastName } = splitFullName(trimmedName);
    const intent = getQueryParam(new URLSearchParams(window.location.search), "intent");

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
      intent,
    };

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      const response = await fetch("/api/portal-form-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formSlug: "contact",
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
      <div className="py-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
          <CheckCircle2 className="h-6 w-6 text-emerald-400" />
        </div>
        <h3 className="mt-4 font-(--font-display) text-lg font-bold text-white">Request submitted</h3>
        <p className="mt-2 text-sm text-slate-400">
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
      data-form-id="contact"
    >
      <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2">
        <p className="font-(--font-mono) text-[11px] uppercase tracking-widest text-slate-500">
          Step {step} of 2
        </p>
        <p className="text-xs text-slate-500">
          {step === 1 ? "Quick intake" : "Qualification details"}
        </p>
      </div>

      <div className="h-1.5 rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-emerald-500 transition-[width] duration-300 ease-out"
          style={{ width: step === 1 ? "50%" : "100%" }}
        />
      </div>

      {step === 1 ? (
        <div key={`step-1-${stepAnimationKey}`} className="form-step-enter space-y-5">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-300">Name *</span>
            <input
              className={fieldClassName}
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-300">Work Email *</span>
            <input
              className={fieldClassName}
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-300">Biggest Growth Challenge *</span>
            <select
              className={fieldClassName}
              value={challenge}
              onChange={(event) => setChallenge(event.target.value)}
              required
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
      ) : (
        <div key={`step-2-${stepAnimationKey}`} className="form-step-enter space-y-5">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-300">Company Size</span>
            <select
              className={fieldClassName}
              value={companySize}
              onChange={(event) => setCompanySize(event.target.value)}
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
            <span className="text-sm font-medium text-slate-300">Current Stack</span>
            <input
              className={fieldClassName}
              type="text"
              placeholder="Example: Next.js, HubSpot, Salesforce"
              value={stack}
              onChange={(event) => setStack(event.target.value)}
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-300">Timeline</span>
              <select
                className={fieldClassName}
                value={timeline}
                onChange={(event) => setTimeline(event.target.value)}
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
              <span className="text-sm font-medium text-slate-300">Budget Range</span>
              <select
                className={fieldClassName}
                value={budgetRange}
                onChange={(event) => setBudgetRange(event.target.value)}
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
            <span className="text-sm font-medium text-slate-300">Additional Goals</span>
            <textarea
              className={`min-h-[120px] ${fieldClassName}`}
              placeholder="Share goals, constraints, or stakeholder requirements."
              value={goals}
              onChange={(event) => setGoals(event.target.value)}
            />
          </label>
        </div>
      )}

      {step === 2 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            className="cta-lift inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-7 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-slate-600 hover:text-white"
            onClick={() => setStep(1)}
            disabled={isSubmitting}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <button
            className="cta-lift inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500"
            type="submit"
            disabled={isSubmitting}
            data-track-cta="contact_submit"
            data-track-label="Get Started"
          >
            {isSubmitting ? "Submitting..." : "Get Started"}
            {isSubmitting ? null : <ArrowRight className="h-4 w-4" />}
          </button>
        </div>
      ) : (
        <button
          className="cta-lift inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500"
          type="submit"
          disabled={isSubmitting}
          data-track-cta="contact_continue"
          data-track-label="Continue"
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </button>
      )}

      {errorMessage ? <p className="text-sm text-rose-400">{errorMessage}</p> : null}

      <p className="text-center text-xs text-slate-600">
        Prefer email? Reach us at{" "}
        <span className="font-medium text-emerald-400">hello@ingeniumconsulting.net</span>
      </p>
    </form>
  );
}
