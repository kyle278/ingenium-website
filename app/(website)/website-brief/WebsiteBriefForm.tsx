"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

import { getIngeniumTrackingPayload } from "@/lib/ingeniumTrackingPayload";

type WebsiteBriefFormProps = {
  formId: string;
  formSlug: string;
  formName: string;
};

type SubmitState = "idle" | "success";

const fieldClassName =
  "w-full rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30";

const checkboxClassName =
  "h-4 w-4 rounded border-slate-600 bg-slate-900 text-emerald-500 focus:ring-emerald-500/40";

const steps = [
  { title: "Contact", detail: "Who we are planning with" },
  { title: "Business", detail: "What the site needs to do" },
  { title: "Scope", detail: "Key pages and functionality" },
  { title: "Launch", detail: "Assets, timing, and notes" },
] as const;

const featureOptions = [
  "Lead capture forms",
  "Booking or consultation flow",
  "Blog or resources",
  "Case studies or portfolio",
  "Team profiles",
  "Client testimonials",
  "CMS editing access",
  "Analytics and tracking",
  "CRM integration",
  "Email marketing integration",
  "Payments or checkout",
  "Members-only area",
] as const;

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

  return {
    firstName: parts[0] ?? null,
    lastName: parts.slice(1).join(" "),
  };
}

function createIdempotencyKey() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `website_brief_${Date.now()}`;
}

export default function WebsiteBriefForm({
  formId,
  formSlug,
  formName,
}: WebsiteBriefFormProps) {
  const [step, setStep] = useState(0);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stepAnimationKey, setStepAnimationKey] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [businessSummary, setBusinessSummary] = useState("");
  const [audience, setAudience] = useState("");
  const [currentSiteStatus, setCurrentSiteStatus] = useState("");
  const [primaryGoal, setPrimaryGoal] = useState("");
  const [requiredPages, setRequiredPages] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [brandAssets, setBrandAssets] = useState("");
  const [copySupport, setCopySupport] = useState("");
  const [inspirationSites, setInspirationSites] = useState("");
  const [extraNotes, setExtraNotes] = useState("");

  const progressPercent = `${((step + 1) / steps.length) * 100}%`;
  const isLastStep = step === steps.length - 1;

  function toggleFeature(option: string) {
    setSelectedFeatures((current) =>
      current.includes(option) ? current.filter((item) => item !== option) : [...current, option],
    );
  }

  function validateStep(currentStep: number) {
    if (currentStep === 0) {
      if (!name.trim() || !email.trim() || !company.trim()) {
        return "Please complete name, work email, and company before continuing.";
      }
    }

    if (currentStep === 1) {
      if (!businessSummary.trim() || !currentSiteStatus || !primaryGoal) {
        return "Please share your business summary, current website status, and primary goal.";
      }
    }

    if (currentStep === 2 && !requiredPages.trim()) {
      return "Please tell us the key pages or sections you expect on the site.";
    }

    if (currentStep === 3 && !timeline) {
      return "Please choose an ideal timeline so we can plan the build properly.";
    }

    return null;
  }

  function goToNextStep() {
    const validationMessage = validateStep(step);
    if (validationMessage) {
      setErrorMessage(validationMessage);
      return;
    }

    setErrorMessage("");
    setStep((current) => Math.min(current + 1, steps.length - 1));
    setStepAnimationKey((current) => current + 1);
  }

  function goToPreviousStep() {
    setErrorMessage("");
    setStep((current) => Math.max(current - 1, 0));
    setStepAnimationKey((current) => current + 1);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isLastStep) {
      goToNextStep();
      return;
    }

    const validationMessage = validateStep(step);
    if (validationMessage) {
      setErrorMessage(validationMessage);
      return;
    }

    if (isSubmitting) {
      return;
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedCompany = company.trim();
    const trimmedWebsiteUrl = websiteUrl.trim();
    const trimmedBusinessSummary = businessSummary.trim();
    const trimmedAudience = audience.trim();
    const trimmedRequiredPages = requiredPages.trim();
    const trimmedInspirationSites = inspirationSites.trim();
    const trimmedExtraNotes = extraNotes.trim();
    const { firstName, lastName } = splitFullName(trimmedName);

    const fields: Record<string, unknown> = {
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone || null,
      company: trimmedCompany,
      website_url: trimmedWebsiteUrl || null,
      business_summary: trimmedBusinessSummary,
      target_audience: trimmedAudience || null,
      current_website_status: currentSiteStatus,
      primary_goal: primaryGoal,
      required_pages: trimmedRequiredPages,
      requested_features: selectedFeatures,
      feature_count: selectedFeatures.length,
      timeline,
      brand_assets_status: brandAssets || null,
      copy_support_needed: copySupport || null,
      inspiration_sites: trimmedInspirationSites || null,
      extra_notes: trimmedExtraNotes || null,
      first_name: firstName,
      last_name: lastName,
      pages_summary: trimmedRequiredPages,
      project_type: "website_build",
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
        let message = "Unable to submit your website brief. Please try again.";
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
          : "Unable to submit your website brief. Please try again.";
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
        <h3 className="mt-4 font-(--font-display) text-lg font-bold text-white">
          Brief received
        </h3>
        <p className="mt-2 text-sm text-slate-400">
          Thanks. We have the core details we need and will follow up with next steps shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-6"
      onSubmit={handleSubmit}
      aria-busy={isSubmitting}
      data-form-id={formId}
      data-form-slug={formSlug}
      data-form-name={formName}
    >
      <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2">
        <div>
          <p className="font-(--font-mono) text-[11px] uppercase tracking-widest text-slate-500">
            Step {step + 1} of {steps.length}
          </p>
          <p className="mt-1 text-xs text-slate-500">{steps[step]?.detail}</p>
        </div>
        <p className="text-xs font-medium text-emerald-300">{steps[step]?.title}</p>
      </div>

      <div className="h-1.5 rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-emerald-500 transition-[width] duration-300 ease-out"
          style={{ width: progressPercent }}
        />
      </div>

      {step === 0 ? (
        <div key={`step-0-${stepAnimationKey}`} className="form-step-enter grid gap-5 sm:grid-cols-2">
          <label className="block space-y-2 sm:col-span-2">
            <span className="text-sm font-medium text-slate-300">Full name *</span>
            <input
              className={fieldClassName}
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-300">Work email *</span>
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
            <span className="text-sm font-medium text-slate-300">Phone</span>
            <input
              className={fieldClassName}
              type="tel"
              placeholder="Optional"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-300">Company *</span>
            <input
              className={fieldClassName}
              type="text"
              placeholder="Company name"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-300">Current website</span>
            <input
              className={fieldClassName}
              type="url"
              placeholder="https://example.com"
              value={websiteUrl}
              onChange={(event) => setWebsiteUrl(event.target.value)}
            />
          </label>
        </div>
      ) : null}

      {step === 1 ? (
        <div key={`step-1-${stepAnimationKey}`} className="form-step-enter space-y-5">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-300">
              What does the business do, and what should the site help achieve? *
            </span>
            <textarea
              className={`min-h-[120px] ${fieldClassName}`}
              placeholder="A short summary is perfect."
              value={businessSummary}
              onChange={(event) => setBusinessSummary(event.target.value)}
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-300">Who is the site for?</span>
            <input
              className={fieldClassName}
              type="text"
              placeholder="Ideal customers, sectors, or decision-makers"
              value={audience}
              onChange={(event) => setAudience(event.target.value)}
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-300">Current website status *</span>
              <select
                className={fieldClassName}
                value={currentSiteStatus}
                onChange={(event) => setCurrentSiteStatus(event.target.value)}
                required
              >
                <option value="">Select status</option>
                <option value="Brand new website">Brand new website</option>
                <option value="Refresh existing site">Refresh existing site</option>
                <option value="Full rebuild of current site">Full rebuild of current site</option>
                <option value="Landing page first, full site later">Landing page first, full site later</option>
              </select>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-300">Primary goal *</span>
              <select
                className={fieldClassName}
                value={primaryGoal}
                onChange={(event) => setPrimaryGoal(event.target.value)}
                required
              >
                <option value="">Select goal</option>
                <option value="Generate more qualified leads">Generate more qualified leads</option>
                <option value="Improve credibility and positioning">Improve credibility and positioning</option>
                <option value="Support sales conversations">Support sales conversations</option>
                <option value="Launch a new offer or business">Launch a new offer or business</option>
                <option value="Recruit talent">Recruit talent</option>
              </select>
            </label>
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div key={`step-2-${stepAnimationKey}`} className="form-step-enter space-y-5">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-300">
              What pages or sections do you expect on the site? *
            </span>
            <textarea
              className={`min-h-[120px] ${fieldClassName}`}
              placeholder="Example: home, about, services, case studies, contact"
              value={requiredPages}
              onChange={(event) => setRequiredPages(event.target.value)}
              required
            />
          </label>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-slate-300">
              Which features feel important?
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {featureOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/55 px-4 py-3 text-sm text-slate-300"
                >
                  <input
                    className={checkboxClassName}
                    type="checkbox"
                    checked={selectedFeatures.includes(option)}
                    onChange={() => toggleFeature(option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      ) : null}

      {step === 3 ? (
        <div key={`step-3-${stepAnimationKey}`} className="form-step-enter space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-300">Ideal timeline *</span>
              <select
                className={fieldClassName}
                value={timeline}
                onChange={(event) => setTimeline(event.target.value)}
                required
              >
                <option value="">Select timeline</option>
                <option value="ASAP">ASAP</option>
                <option value="Within 2-4 weeks">Within 2-4 weeks</option>
                <option value="Within 1-2 months">Within 1-2 months</option>
                <option value="This quarter">This quarter</option>
                <option value="Just exploring">Just exploring</option>
              </select>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-300">Brand assets ready?</span>
              <select
                className={fieldClassName}
                value={brandAssets}
                onChange={(event) => setBrandAssets(event.target.value)}
              >
                <option value="">Select option</option>
                <option value="Yes, mostly ready">Yes, mostly ready</option>
                <option value="Partially ready">Partially ready</option>
                <option value="No, need support">No, need support</option>
              </select>
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-300">Do you need copy support?</span>
            <select
              className={fieldClassName}
              value={copySupport}
              onChange={(event) => setCopySupport(event.target.value)}
            >
              <option value="">Select option</option>
              <option value="No, we will provide copy">No, we will provide copy</option>
              <option value="Some support needed">Some support needed</option>
              <option value="Yes, full copy support needed">Yes, full copy support needed</option>
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-300">Reference or inspiration sites</span>
            <textarea
              className={`min-h-[96px] ${fieldClassName}`}
              placeholder="Share links or describe styles you like."
              value={inspirationSites}
              onChange={(event) => setInspirationSites(event.target.value)}
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-300">Anything else we should know?</span>
            <textarea
              className={`min-h-[120px] ${fieldClassName}`}
              placeholder="Stakeholders, approvals, integrations, constraints, or launch deadlines."
              value={extraNotes}
              onChange={(event) => setExtraNotes(event.target.value)}
            />
          </label>
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          className="cta-lift inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-7 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-slate-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          onClick={goToPreviousStep}
          disabled={step === 0 || isSubmitting}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <button
          className="cta-lift inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-70"
          type="submit"
          disabled={isSubmitting}
          data-track-cta={isLastStep ? "website_brief_submit" : "website_brief_continue"}
          data-track-label={isLastStep ? "Submit Website Brief" : "Continue Website Brief"}
        >
          {isSubmitting ? "Submitting..." : isLastStep ? "Submit brief" : "Continue"}
          {isSubmitting ? null : <ArrowRight className="h-4 w-4" />}
        </button>
      </div>

      {errorMessage ? <p className="text-sm text-rose-400">{errorMessage}</p> : null}

      <p className="text-center text-xs text-slate-600">
        This page is only used for project intake and is not listed publicly on the main site.
      </p>
    </form>
  );
}
