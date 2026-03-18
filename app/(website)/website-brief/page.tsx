import type { Metadata } from "next";
import { CheckCircle2, FileText, Globe, Layers3, LockKeyhole } from "lucide-react";

import {
  WEBSITE_FORM_NAMES,
  WEBSITE_FORM_SLUGS,
} from "@/lib/portalIntegration/forms";
import { getPortalFormBySlug } from "@/lib/portalIntegration/server";

import WebsiteBriefForm from "./WebsiteBriefForm";

export const metadata: Metadata = {
  title: "Website Project Brief | Ingenium",
  description:
    "Private client intake form for collecting the details needed to plan a new website build with Ingenium.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  alternates: { canonical: "/website-brief" },
};

export const dynamic = "force-dynamic";

const sectionLabel = "font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400";
const darkCard = "rounded-2xl border border-slate-800 bg-slate-900/70 p-6";

const valuePoints = [
  "Takes around 3 to 5 minutes",
  "Captures only the essentials we need to plan well",
  "Lets us start scope and rollout conversations faster",
];

const intakeIncludes = [
  {
    title: "Business context",
    body: "What the business does, who the site is for, and what success should look like.",
    icon: Globe,
  },
  {
    title: "Core scope",
    body: "Pages, functionality, and any systems the website needs to support.",
    icon: Layers3,
  },
  {
    title: "Launch inputs",
    body: "Timeline, brand readiness, copy needs, and anything that could affect delivery.",
    icon: FileText,
  },
  {
    title: "Private submission",
    body: "This page is intentionally unlisted and marked noindex for client sharing only.",
    icon: LockKeyhole,
  },
];

export default async function WebsiteBriefPage() {
  let websiteBriefForm = null;
  let formResolutionError: string | null = null;

  try {
    websiteBriefForm = await getPortalFormBySlug(WEBSITE_FORM_SLUGS.websiteProjectBrief);
  } catch (error) {
    formResolutionError =
      error instanceof Error ? error.message : "Unknown Portal form resolution error.";
  }

  return (
    <div className="space-y-20 md:space-y-24">
      <section className="grid items-start gap-8 lg:grid-cols-[1.05fr,0.95fr]">
        <div>
          <p className={sectionLabel}>Private Client Intake</p>
          <h1 className="mt-5 max-w-3xl font-(--font-display) text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Share the essentials for your new website build.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">
            This short project brief helps us understand your business, the shape of the site,
            and what needs to be ready for launch without dragging you through a heavy form.
          </p>

          <div className="mt-8 space-y-3">
            {valuePoints.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                {item}
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {intakeIncludes.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className={`${darkCard} min-h-[180px]`}>
                  <Icon className="h-5 w-5 text-emerald-400" />
                  <h2 className="mt-4 font-(--font-display) text-lg font-semibold text-white">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`${darkCard} grid-lines`}>
          {websiteBriefForm ? (
            <WebsiteBriefForm
              formId={websiteBriefForm.id}
              formSlug={websiteBriefForm.slug}
              formName={websiteBriefForm.name}
            />
          ) : (
            <div className="space-y-4 rounded-xl border border-rose-500/40 bg-rose-500/10 p-5">
              <p className="font-(--font-mono) text-xs uppercase tracking-widest text-rose-300">
                Form Configuration Required
              </p>
              <h2 className="font-(--font-display) text-xl font-semibold text-white">
                Website brief form is not configured in Ingenium Portal.
              </h2>
              <p className="text-sm leading-relaxed text-slate-300">
                Upsert the form row named{" "}
                <span className="font-medium text-white">
                  {WEBSITE_FORM_NAMES.websiteProjectBrief}
                </span>{" "}
                with slug{" "}
                <span className="font-medium text-white">
                  {WEBSITE_FORM_SLUGS.websiteProjectBrief}
                </span>{" "}
                in Portal, then reload this page.
              </p>
              {formResolutionError ? (
                <p className="text-xs text-rose-200/80">{formResolutionError}</p>
              ) : null}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
