"use client";

import { useEffect, useEffectEvent, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

import ConsentCardField from "../components/ConsentCardField";

import { PORTAL_CONSENT_VERSION } from "@/lib/portalIntegration/public";

type WebsiteBriefFormProps = {
  formName: string;
  formSlug: string;
};

type SubmitState = "idle" | "success";
type PortalFormEventDetail = {
  message?: string;
};

const fieldClassName =
  "w-full rounded-lg bg-[var(--color-panel-low)] px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] outline-none transition focus:bg-white focus:ring-2 focus:ring-[rgba(0,87,191,0.18)]";

const checkboxClassName =
  "h-4 w-4 rounded border-[var(--color-ghost)] bg-white text-[var(--color-brand)] focus:ring-[rgba(0,87,191,0.2)]";

const steps = [
  { title: "Contact", detail: "Who we are planning with" },
  { title: "Business", detail: "What the site needs to do" },
  { title: "Scope", detail: "Key pages and functionality" },
  { title: "Launch", detail: "Assets, timing, and notes" },
  { title: "Consent", detail: "Privacy and optional updates" },
] as const;

const featureOptions = [
  "Lead capture forms",
  "Booking or consultation flow",
  "Blog or resources",
  "Projects or portfolio",
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
    return { firstName: "", lastName: "" };
  }

  if (parts.length === 1) {
    return { firstName: parts[0] ?? "", lastName: "" };
  }

  return {
    firstName: parts[0] ?? "",
    lastName: parts.slice(1).join(" "),
  };
}

export default function WebsiteBriefForm({
  formName,
  formSlug,
}: WebsiteBriefFormProps) {
  const privacyConsentId = useId();
  const marketingConsentId = useId();
  const accuracyConfirmationId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const consentCapturedAtRef = useRef<HTMLInputElement>(null);

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
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [accuracyConfirmation, setAccuracyConfirmation] = useState(false);

  const progressPercent = `${((step + 1) / steps.length) * 100}%`;
  const isLastStep = step === steps.length - 1;
  const { firstName, lastName } = splitFullName(name.trim());

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

    if (currentStep === 4) {
      if (!privacyConsent) {
        return "Please confirm the privacy acknowledgment before submitting.";
      }

      if (!accuracyConfirmation) {
        return "Please confirm the planning details are accurate enough for project scoping.";
      }
    }

    return null;
  }

  function resetFormState() {
    setStep(0);
    setSubmitState("idle");
    setIsSubmitting(false);
    setErrorMessage("");
    setStepAnimationKey((current) => current + 1);
    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setWebsiteUrl("");
    setBusinessSummary("");
    setAudience("");
    setCurrentSiteStatus("");
    setPrimaryGoal("");
    setRequiredPages("");
    setSelectedFeatures([]);
    setTimeline("");
    setBrandAssets("");
    setCopySupport("");
    setInspirationSites("");
    setExtraNotes("");
    setPrivacyConsent(false);
    setMarketingConsent(false);
    setAccuracyConfirmation(false);
  }

  const handlePortalSubmitting = useEffectEvent(() => {
    setIsSubmitting(true);
    setErrorMessage("");
  });

  const handlePortalSuccess = useEffectEvent(() => {
    resetFormState();
    setSubmitState("success");
  });

  const handlePortalError = useEffectEvent((detail: PortalFormEventDetail) => {
    setIsSubmitting(false);
    setErrorMessage(
      detail.message?.trim() || "Unable to submit your website brief. Please try again.",
    );
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

      const detail = "detail" in event ? (event as CustomEvent<PortalFormEventDetail>).detail : {};
      handlePortalError(detail ?? {});
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

  function handleSubmitCapture(event: React.FormEvent<HTMLFormElement>) {
    if (!isLastStep) {
      event.preventDefault();
      return;
    }

    const validationMessage = validateStep(step);
    if (validationMessage) {
      event.preventDefault();
      setErrorMessage(validationMessage);
      return;
    }

    if (consentCapturedAtRef.current) {
      consentCapturedAtRef.current.value = new Date().toISOString();
    }

    setIsSubmitting(true);
    setErrorMessage("");
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLFormElement>) {
    if (isLastStep || event.key !== "Enter" || event.target instanceof HTMLTextAreaElement) {
      return;
    }

    event.preventDefault();
  }

  if (submitState === "success") {
    return (
      <div className="py-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(0,87,191,0.10)]">
          <CheckCircle2 className="h-6 w-6 text-[var(--color-brand)]" />
        </div>
        <h3 className="mt-4 font-[var(--font-display)] text-lg font-semibold text-[var(--color-text)]">
          Brief received
        </h3>
        <p className="mt-2 text-sm text-[var(--color-text-soft)]">
          Thanks. We have the core details we need and will follow up with next steps shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      aria-busy={isSubmitting}
      className="space-y-6"
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
      <input name="feature_count" type="hidden" value={String(selectedFeatures.length)} />
      <input name="pages_summary" type="hidden" value={requiredPages.trim()} />
      <input name="project_type" type="hidden" value="website_build" />
      <input name="privacy_consent" type="hidden" value={privacyConsent ? "true" : "false"} />
      <input name="marketing_consent" type="hidden" value={marketingConsent ? "true" : "false"} />
      <input name="accuracy_confirmation" type="hidden" value={accuracyConfirmation ? "true" : "false"} />
      <input name="consent_version" type="hidden" value={PORTAL_CONSENT_VERSION} />
      <input
        name="consent_text_snapshot"
        type="hidden"
        value="I confirm Ingenium may use this project intake for scoping and follow-up under the Privacy Policy."
      />
      <input ref={consentCapturedAtRef} name="consent_captured_at" type="hidden" value="" />

      <div className="flex items-center justify-between rounded-lg bg-[var(--color-panel-low)] px-3 py-2">
        <div>
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
            Step {step + 1} of {steps.length}
          </p>
          <p className="mt-1 text-xs text-[var(--color-text-muted)]">{steps[step]?.detail}</p>
        </div>
        <p className="text-xs font-medium text-[var(--color-brand)]">{steps[step]?.title}</p>
      </div>

      <div className="h-1.5 rounded-full bg-[var(--color-panel-mid)]">
        <div
          className="h-full rounded-full bg-[linear-gradient(135deg,var(--color-brand),var(--color-brand-strong))] transition-[width] duration-300 ease-out"
          style={{ width: progressPercent }}
        />
      </div>

      <div hidden={step !== 0} key={`step-0-${stepAnimationKey}`} className="form-step-enter grid gap-5 sm:grid-cols-2">
        <label className="block space-y-2 sm:col-span-2">
          <span className="text-sm font-medium text-[var(--color-text)]">Full name *</span>
          <input
            className={fieldClassName}
            name="name"
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            required
            type="text"
            value={name}
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-[var(--color-text)]">Work email *</span>
          <input
            className={fieldClassName}
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@company.com"
            required
            type="email"
            value={email}
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-[var(--color-text)]">Phone</span>
          <input
            className={fieldClassName}
            name="phone"
            onChange={(event) => setPhone(event.target.value)}
            placeholder="Optional"
            type="tel"
            value={phone}
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-[var(--color-text)]">Company *</span>
          <input
            className={fieldClassName}
            name="company"
            onChange={(event) => setCompany(event.target.value)}
            placeholder="Company name"
            required
            type="text"
            value={company}
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-[var(--color-text)]">Current website</span>
          <input
            className={fieldClassName}
            name="website_url"
            onChange={(event) => setWebsiteUrl(event.target.value)}
            placeholder="https://example.com"
            type="url"
            value={websiteUrl}
          />
        </label>
      </div>

      <div hidden={step !== 1} key={`step-1-${stepAnimationKey}`} className="form-step-enter space-y-5">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[var(--color-text)]">
            What does the business do, and what should the site help achieve? *
          </span>
          <textarea
            className={`min-h-[120px] ${fieldClassName}`}
            name="business_summary"
            onChange={(event) => setBusinessSummary(event.target.value)}
            placeholder="A short summary is perfect."
            required
            value={businessSummary}
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-[var(--color-text)]">Who is the site for?</span>
          <input
            className={fieldClassName}
            name="target_audience"
            onChange={(event) => setAudience(event.target.value)}
            placeholder="Ideal customers, sectors, or decision-makers"
            type="text"
            value={audience}
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-[var(--color-text)]">Current website status *</span>
            <select
              className={fieldClassName}
              name="current_website_status"
              onChange={(event) => setCurrentSiteStatus(event.target.value)}
              required
              value={currentSiteStatus}
            >
              <option value="">Select status</option>
              <option value="Brand new website">Brand new website</option>
              <option value="Refresh existing site">Refresh existing site</option>
              <option value="Full rebuild of current site">Full rebuild of current site</option>
              <option value="Landing page first, full site later">Landing page first, full site later</option>
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-[var(--color-text)]">Primary goal *</span>
            <select
              className={fieldClassName}
              name="primary_goal"
              onChange={(event) => setPrimaryGoal(event.target.value)}
              required
              value={primaryGoal}
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

      <div hidden={step !== 2} key={`step-2-${stepAnimationKey}`} className="form-step-enter space-y-5">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[var(--color-text)]">
            What pages or sections do you expect on the site? *
          </span>
          <textarea
            className={`min-h-[120px] ${fieldClassName}`}
            name="required_pages"
            onChange={(event) => setRequiredPages(event.target.value)}
            placeholder="Example: home, about, services, projects, contact"
            required
            value={requiredPages}
          />
        </label>

        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-[var(--color-text)]">
            Which features feel important?
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {featureOptions.map((option) => (
              <label
                key={option}
                className="flex items-center gap-3 rounded-lg bg-[var(--color-panel-low)] px-4 py-3 text-sm text-[var(--color-text-soft)]"
              >
                <input
                  checked={selectedFeatures.includes(option)}
                  className={checkboxClassName}
                  name="requested_features"
                  onChange={() => toggleFeature(option)}
                  type="checkbox"
                  value={option}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div hidden={step !== 3} key={`step-3-${stepAnimationKey}`} className="form-step-enter space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-[var(--color-text)]">Ideal timeline *</span>
            <select
              className={fieldClassName}
              name="timeline"
              onChange={(event) => setTimeline(event.target.value)}
              required
              value={timeline}
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
            <span className="text-sm font-medium text-[var(--color-text)]">Brand assets ready?</span>
            <select
              className={fieldClassName}
              name="brand_assets_status"
              onChange={(event) => setBrandAssets(event.target.value)}
              value={brandAssets}
            >
              <option value="">Select option</option>
              <option value="Yes, mostly ready">Yes, mostly ready</option>
              <option value="Partially ready">Partially ready</option>
              <option value="No, need support">No, need support</option>
            </select>
          </label>
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-[var(--color-text)]">Do you need copy support?</span>
          <select
            className={fieldClassName}
            name="copy_support_needed"
            onChange={(event) => setCopySupport(event.target.value)}
            value={copySupport}
          >
            <option value="">Select option</option>
            <option value="No, we will provide copy">No, we will provide copy</option>
            <option value="Some support needed">Some support needed</option>
            <option value="Yes, full copy support needed">Yes, full copy support needed</option>
          </select>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-[var(--color-text)]">Reference or inspiration sites</span>
          <textarea
            className={`min-h-[96px] ${fieldClassName}`}
            name="inspiration_sites"
            onChange={(event) => setInspirationSites(event.target.value)}
            placeholder="Share links or describe styles you like."
            value={inspirationSites}
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-[var(--color-text)]">Anything else we should know?</span>
          <textarea
            className={`min-h-[120px] ${fieldClassName}`}
            name="extra_notes"
            onChange={(event) => setExtraNotes(event.target.value)}
            placeholder="Stakeholders, approvals, integrations, constraints, or launch deadlines."
            value={extraNotes}
          />
        </label>
      </div>

      <div hidden={step !== 4} key={`step-4-${stepAnimationKey}`} className="form-step-enter space-y-5">
        <div className="rounded-2xl bg-[var(--color-panel-low)] px-4 py-4 text-sm leading-7 text-[var(--color-text-soft)]">
          We use this intake to scope the project, confirm the right next step, and keep an internal record of the
          consent choices attached to the submission.
        </div>

        <ConsentCardField
          checked={privacyConsent}
          description="I have read the Privacy Policy and I consent to Ingenium using this brief to scope the project and reply to me."
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
          checked={accuracyConfirmation}
          description="I confirm the information above is accurate enough for planning, scoping, and follow-up."
          error={
            errorMessage === "Please confirm the planning details are accurate enough for project scoping."
              ? errorMessage
              : undefined
          }
          id={accuracyConfirmationId}
          label="Planning accuracy confirmation"
          onCheckedChange={setAccuracyConfirmation}
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

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          className="cta-lift inline-flex items-center justify-center gap-2 rounded-md bg-[var(--color-panel-high)] px-7 py-3.5 text-sm font-semibold text-[var(--color-brand)] transition disabled:cursor-not-allowed disabled:opacity-60"
          disabled={step === 0 || isSubmitting}
          onClick={goToPreviousStep}
          type="button"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {isLastStep ? (
          <button
            className="cta-lift inline-flex items-center justify-center gap-2 rounded-md bg-[linear-gradient(135deg,var(--color-brand),var(--color-brand-strong))] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(24,28,31,0.08)] transition disabled:cursor-not-allowed disabled:opacity-70"
            data-track-cta="website_brief_submit"
            data-track-label="Submit Website Brief"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Submitting..." : "Submit brief"}
            {isSubmitting ? null : <ArrowRight className="h-4 w-4" />}
          </button>
        ) : (
          <button
            className="cta-lift inline-flex items-center justify-center gap-2 rounded-md bg-[linear-gradient(135deg,var(--color-brand),var(--color-brand-strong))] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(24,28,31,0.08)] transition disabled:cursor-not-allowed disabled:opacity-70"
            data-track-cta="website_brief_continue"
            data-track-label="Continue Website Brief"
            disabled={isSubmitting}
            onClick={goToNextStep}
            type="button"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {errorMessage &&
      errorMessage !== "Please confirm the privacy acknowledgment before submitting." &&
      errorMessage !== "Please confirm the planning details are accurate enough for project scoping." ? (
        <p className="text-sm text-[var(--color-error)]">{errorMessage}</p>
      ) : null}

      <p className="text-center text-xs text-[var(--color-text-muted)]">
        This private intake link is only used for approved project conversations.
      </p>
    </form>
  );
}
