"use client";

import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";

import type {
  WebsiteForm,
  WebsiteFormField,
  WebsiteFormFieldOption,
} from "@/lib/portal/types";

type FormValue = string | boolean;
type FormValues = Record<string, FormValue>;
type SubmitState = "idle" | "submitting" | "success" | "error";

const fieldClassName =
  "w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100";

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

interface PortalContactFormProps {
  form: WebsiteForm;
}

export default function PortalContactForm({ form }: PortalContactFormProps) {
  const initialValues = useMemo<FormValues>(() => {
    return form.fields.reduce<FormValues>((accumulator, field) => {
      accumulator[field.key] = field.type === "checkbox" ? false : "";
      return accumulator;
    }, {});
  }, [form.fields]);

  const [values, setValues] = useState<FormValues>(initialValues);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const hasFields = form.fields.length > 0;

  function updateValue(fieldKey: string, nextValue: FormValue) {
    setValues((previousValues) => ({
      ...previousValues,
      [fieldKey]: nextValue,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!hasFields || submitState === "submitting") {
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
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(error instanceof Error ? error.message : "Unable to submit your request.");
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {form.description ? <p className="text-sm text-slate-500">{form.description}</p> : null}
      {hasFields ? (
        form.fields.map((field) => {
          const value = values[field.key];
          const options = getFieldOptions(field);
          const required = Boolean(field.required);
          const label = field.label || field.key;
          const inputName = field.key;

          if (field.type === "checkbox") {
            return (
              <label key={field.key} className="flex items-center gap-3 text-sm text-slate-600">
                <input
                  checked={Boolean(value)}
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
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
                <span className="text-sm font-medium text-slate-700">
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
                <span className="text-sm font-medium text-slate-700">
                  {label}
                  {required ? " *" : ""}
                </span>
                <textarea
                  className={`min-h-[140px] ${fieldClassName}`}
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
              <span className="text-sm font-medium text-slate-700">
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
        })
      ) : (
        <p className="text-sm text-slate-500">
          This form is active in the portal but has no fields configured yet.
        </p>
      )}

      <button
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(5,150,105,0.3)] transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={submitState === "submitting" || !hasFields}
        type="submit"
      >
        {submitState === "submitting" ? "Submitting..." : "Submit Request"}
        <ArrowRight className="h-4 w-4" />
      </button>

      {submitState === "success" ? (
        <p className="text-sm text-emerald-700">Thanks. Your request has been submitted.</p>
      ) : null}
      {submitState === "error" ? (
        <p className="text-sm text-rose-600">{errorMessage ?? "Unable to submit your request."}</p>
      ) : null}

      <p className="text-center text-xs text-slate-400">
        Prefer email? Reach us at{" "}
        <span className="font-semibold text-emerald-600">hello@ingeniumconsulting.net</span>
      </p>
    </form>
  );
}
