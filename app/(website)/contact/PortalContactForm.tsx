"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

import type {
  WebsiteForm,
  WebsiteFormField,
  WebsiteFormFieldOption,
} from "@/src/lib/portal-types";

type FormValue = string | boolean;
type FormValues = Record<string, FormValue>;
type SubmitState = "idle" | "submitting" | "success" | "error";
type FormStep = 1 | 2;

const fieldClassName =
  "w-full rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30";

const LANDING_URL_STORAGE_KEY = "ingenium.portal.landing_url";

const priorityFieldHints = {
  name: ["full_name", "name", "first_name"],
  email: ["work_email", "email"],
  challenge: ["challenge", "goal", "growth", "priority", "message"],
};

function getFieldOptions(field: WebsiteFormField): WebsiteFormFieldOption[] {
  if (!Array.isArray(field.options)) {
    return [];
  }

  return field.options
    .map((option) => {
      if (typeof option === "string") {
        return { label: option, value: option };
      }

      if (option && typeof option === "object") {
        const normalizedOption = option as WebsiteFormFieldOption;
        return {
          label: normalizedOption.label ?? normalizedOption.value,
          value: normalizedOption.value ?? normalizedOption.label,
        };
      }

      return null;
    })
    .filter((option): option is WebsiteFormFieldOption => Boolean(option?.label && option?.value));
}

function isTextareaField(type: string) {
  return type === "textarea" || type === "richtext";
}

function isSelectField(field: WebsiteFormField) {
  return field.type === "select" || getFieldOptions(field).length > 0;
}

function isHiddenField(field: WebsiteFormField) {
  return field.type === "hidden";
}

function findMatchingField(
  fields: WebsiteFormField[],
  hints: string[],
  usedKeys: Set<string>,
) {
  return fields.find((field) => {
    if (usedKeys.has(field.key) || isHiddenField(field)) {
      return false;
    }

    const haystack = `${field.key} ${field.label ?? ""}`.toLowerCase();
    return hints.some((hint) => haystack.includes(hint));
  });
}

function buildProgressiveFields(fields: WebsiteFormField[]) {
  const usedKeys = new Set<string>();
  const firstStep: WebsiteFormField[] = [];

  const matchedNameField = findMatchingField(fields, priorityFieldHints.name, usedKeys);
  if (matchedNameField) {
    usedKeys.add(matchedNameField.key);
    firstStep.push(matchedNameField);
  }

  const matchedEmailField = findMatchingField(fields, priorityFieldHints.email, usedKeys);
  if (matchedEmailField) {
    usedKeys.add(matchedEmailField.key);
    firstStep.push(matchedEmailField);
  }

  const matchedChallengeField = findMatchingField(fields, priorityFieldHints.challenge, usedKeys);
  if (matchedChallengeField) {
    usedKeys.add(matchedChallengeField.key);
    firstStep.push(matchedChallengeField);
  }

  fields.forEach((field) => {
    if (firstStep.length >= 3 || usedKeys.has(field.key) || isHiddenField(field)) {
      return;
    }

    usedKeys.add(field.key);
    firstStep.push(field);
  });

  const secondStep = fields.filter((field) => !usedKeys.has(field.key) && !isHiddenField(field));
  const hiddenFields = fields.filter((field) => isHiddenField(field));

  return {
    firstStep,
    secondStep,
    hiddenFields,
  };
}

function readLandingUrl() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const existing = window.sessionStorage.getItem(LANDING_URL_STORAGE_KEY);

    if (existing) {
      return existing;
    }

    const current = window.location.href;
    window.sessionStorage.setItem(LANDING_URL_STORAGE_KEY, current);
    return current;
  } catch {
    return window.location.href;
  }
}

function buildTrackingMetadata(formSlug: string) {
  const searchParams = new URLSearchParams(window.location.search);
  const submittedAt = new Date().toISOString();

  return {
    utm_source: searchParams.get("utm_source"),
    utm_medium: searchParams.get("utm_medium"),
    utm_campaign: searchParams.get("utm_campaign"),
    utm_term: searchParams.get("utm_term"),
    utm_content: searchParams.get("utm_content"),
    referrer: document.referrer || null,
    landing_url: readLandingUrl(),
    form_slug: formSlug,
    submitted_at: submittedAt,
  };
}

interface PortalContactFormProps {
  form: WebsiteForm;
  description?: string;
}

function isFieldCompleted(field: WebsiteFormField, values: FormValues) {
  if (!field.required) {
    return true;
  }

  const value = values[field.key];
  if (typeof value === "boolean") {
    return value;
  }

  return typeof value === "string" && value.trim().length > 0;
}

export default function PortalContactForm({ form, description }: PortalContactFormProps) {
  const initialValues = useMemo<FormValues>(() => {
    return form.fields.reduce<FormValues>((accumulator, field) => {
      accumulator[field.key] = field.type === "checkbox" ? false : "";
      return accumulator;
    }, {});
  }, [form.fields]);

  const [values, setValues] = useState<FormValues>(initialValues);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [step, setStep] = useState<FormStep>(1);
  const [stepAnimationKey, setStepAnimationKey] = useState(0);

  const hasFields = form.fields.length > 0;
  const { firstStep, secondStep, hiddenFields } = useMemo(
    () => buildProgressiveFields(form.fields),
    [form.fields],
  );
  const hasSecondStep = secondStep.length > 0;

  useEffect(() => {
    setStepAnimationKey((previous) => previous + 1);
  }, [step]);

  function updateValue(fieldKey: string, nextValue: FormValue) {
    setValues((previousValues) => ({
      ...previousValues,
      [fieldKey]: nextValue,
    }));

    if (errorMessage) {
      setErrorMessage(null);
    }
  }

  function renderField(field: WebsiteFormField, requiredOverride?: boolean) {
    const value = values[field.key];
    const options = getFieldOptions(field);
    const required = typeof requiredOverride === "boolean" ? requiredOverride : Boolean(field.required);
    const label = field.label || field.key;
    const inputName = field.key;

    if (isHiddenField(field)) {
      return (
        <input
          key={field.key}
          type="hidden"
          name={inputName}
          value={typeof value === "string" ? value : ""}
        />
      );
    }

    if (field.type === "checkbox") {
      return (
        <label key={field.key} className="flex items-center gap-3 text-sm text-slate-300">
          <input
            checked={Boolean(value)}
            className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-emerald-500 focus:ring-emerald-500/30"
            name={inputName}
            onChange={(event) => updateValue(field.key, event.target.checked)}
            required={required}
            type="checkbox"
          />
          {label}
        </label>
      );
    }

    if (isSelectField(field)) {
      return (
        <label key={field.key} className="block space-y-2">
          <span className="text-sm font-medium text-slate-300">
            {label}
            {required ? " *" : ""}
          </span>
          <select
            className={fieldClassName}
            name={inputName}
            onChange={(event) => updateValue(field.key, event.target.value)}
            required={required}
            value={typeof value === "string" ? value : ""}
          >
            <option value="">
              {field.placeholder ?? `Select ${label.toLowerCase()}`}
            </option>
            {options.map((option) => (
              <option key={`${field.key}-${option.value}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      );
    }

    if (isTextareaField(field.type)) {
      return (
        <label key={field.key} className="block space-y-2">
          <span className="text-sm font-medium text-slate-300">
            {label}
            {required ? " *" : ""}
          </span>
          <textarea
            className={`min-h-[120px] ${fieldClassName}`}
            name={inputName}
            onChange={(event) => updateValue(field.key, event.target.value)}
            placeholder={field.placeholder ?? label}
            required={required}
            value={typeof value === "string" ? value : ""}
          />
        </label>
      );
    }

    const inputType = field.type || "text";

    return (
      <label key={field.key} className="block space-y-2">
        <span className="text-sm font-medium text-slate-300">
          {label}
          {required ? " *" : ""}
        </span>
        <input
          className={fieldClassName}
          name={inputName}
          onChange={(event) => updateValue(field.key, event.target.value)}
          placeholder={field.placeholder ?? label}
          required={required}
          type={inputType}
          value={typeof value === "string" ? value : ""}
        />
      </label>
    );
  }

  function continueToStepTwo() {
    const requiredIncomplete = firstStep.some((field) => !isFieldCompleted(field, values));
    if (requiredIncomplete) {
      setErrorMessage("Please complete required fields before continuing.");
      return;
    }

    setStep(2);
    setErrorMessage(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!hasFields || submitState === "submitting") {
      return;
    }

    if (hasSecondStep && step === 1) {
      continueToStepTwo();
      return;
    }

    setSubmitState("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch(`/api/portal/forms/${encodeURIComponent(form.slug)}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: values,
          source_url: window.location.href,
          metadata: buildTrackingMetadata(form.slug),
        }),
      });

      const responsePayload = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        throw new Error(responsePayload?.error ?? "Unable to submit your request.");
      }

      setSubmitState("success");
      setValues(initialValues);
      setStep(1);
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(error instanceof Error ? error.message : "Unable to submit your request.");
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
          We&apos;ll respond within 1 business day with a tailored conversion roadmap.
        </p>
      </div>
    );
  }

  const visibleFields = hasSecondStep && step === 2 ? secondStep : firstStep;

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {description || form.description ? (
        <p className="text-sm text-slate-400">{description ?? form.description}</p>
      ) : null}

      {hasFields ? (
        <>
          <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2">
            <p className="font-(--font-mono) text-[11px] uppercase tracking-widest text-slate-500">
              Step {hasSecondStep ? step : 1} of {hasSecondStep ? 2 : 1}
            </p>
            {hasSecondStep ? (
              <p className="text-xs text-slate-500">
                {step === 1 ? "Quick intake" : "Qualification details"}
              </p>
            ) : null}
          </div>
          <div className="h-1.5 rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-emerald-500 transition-[width] duration-300 ease-out"
              style={{ width: hasSecondStep ? `${step * 50}%` : "100%" }}
            />
          </div>

          {hiddenFields.map((field) => renderField(field, false))}

          <div key={stepAnimationKey} className="form-step-enter space-y-5">
            {visibleFields.map((field) => {
              const isStepTwoOptional = hasSecondStep && step === 2 && !field.required;
              return renderField(field, isStepTwoOptional ? false : undefined);
            })}
          </div>
        </>
      ) : (
        <p className="text-sm text-slate-500">
          This form is active in the portal but has no fields configured yet.
        </p>
      )}

      {hasSecondStep && step === 2 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            className="cta-lift inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-7 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-slate-600 hover:text-white"
            onClick={() => setStep(1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <button
            className="cta-lift inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={submitState === "submitting" || !hasFields}
            type="submit"
          >
            {submitState === "submitting" ? "Submitting..." : "Get Started"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          className="cta-lift inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={submitState === "submitting" || !hasFields}
          type="submit"
        >
          {hasSecondStep ? "Continue" : submitState === "submitting" ? "Submitting..." : "Get Started"}
          <ArrowRight className="h-4 w-4" />
        </button>
      )}

      {submitState === "error" || errorMessage ? (
        <p className="text-sm text-rose-400">{errorMessage ?? "Unable to submit your request."}</p>
      ) : null}

      <p className="text-center text-xs text-slate-600">
        Prefer email? Reach us at{" "}
        <span className="font-medium text-emerald-400">hello@ingeniumconsulting.net</span>
      </p>
    </form>
  );
}
