import { CheckCircle2, FileText, Globe, Layers3, LockKeyhole } from "lucide-react";

import {
  WEBSITE_FORM_NAMES,
  WEBSITE_FORM_SLUGS,
} from "@/lib/portalIntegration/forms";
import { buildMetadata, pageSeo } from "@/lib/seo";

import WebsiteBriefForm from "./WebsiteBriefForm";

export const metadata = buildMetadata(pageSeo["/website-brief"]);

const sectionLabel = "type-meta-kicker text-[var(--color-brand)]";
const lightCard = "mineral-panel rounded-[28px] p-6";

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
    body: "This page is private, excluded from indexing, and intended only for approved project conversations.",
    icon: LockKeyhole,
  },
];

export default function WebsiteBriefPage() {
  return (
    <div className="space-y-20 md:space-y-24">
      <section className="grid items-start gap-8 lg:grid-cols-[1.05fr,0.95fr]">
        <div>
          <p className={sectionLabel}>Private Client Intake</p>
          <h1 className="mt-5 max-w-3xl type-page-title text-[var(--color-text)]">
            Share the essentials for your new website build.
          </h1>
          <p className="mt-5 max-w-[65ch] type-body-lead text-[var(--color-text-soft)]">
            This short project brief helps us understand your business, the shape of the site,
            and what needs to be ready for launch without dragging you through a heavy form.
          </p>

          <div className="mt-8 space-y-3">
            {valuePoints.map((item) => (
              <div key={item} className="flex items-center gap-3 type-body-sm text-[var(--color-text-soft)]">
                <CheckCircle2 className="h-4 w-4 text-[var(--color-accent)]" />
                {item}
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {intakeIncludes.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className={`${lightCard} min-h-[180px]`}>
                  <Icon className="h-5 w-5 text-[var(--color-accent)]" />
                  <h2 className="mt-4 type-card-title-sm text-[var(--color-text)]">
                    {item.title}
                  </h2>
                  <p className="mt-2 type-body-sm text-[var(--color-text-soft)]">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`${lightCard} grid-lines`}>
          <WebsiteBriefForm
            formName={WEBSITE_FORM_NAMES[WEBSITE_FORM_SLUGS.websiteProjectBrief]}
            formSlug={WEBSITE_FORM_SLUGS.websiteProjectBrief}
          />
        </div>
      </section>
    </div>
  );
}
