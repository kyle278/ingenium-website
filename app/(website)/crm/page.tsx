import type { Metadata } from "next";

import { buildMetadata, pageSeo } from "@/lib/seo";

import { PortalPreview } from "../components/siteVisuals";
import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/crm"]);

export default function CrmPage() {
  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <section className="grid items-center gap-10 pt-4 lg:grid-cols-[0.92fr,1.08fr]">
        <div>
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-brand)]">
            CRM
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl">
            Record design and pipeline discipline your team can trust.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            For service businesses with messy follow-up and unreliable forecasting, Ingenium replaces ad hoc CRM use with one operating record so ownership, next steps, handoff, and reporting stay aligned.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "Book Demo", href: "/demo" }} />
            <ButtonLink action={{ label: "Get a Revenue Systems Teardown", href: "/revenue-systems-teardown" }} variant="secondary" />
          </div>
        </div>
        <PortalPreview
          eyebrow="CRM execution"
          title="A good record should explain what happened, who owns it, and what happens next"
          rows={[
            { label: "Ownership", value: "Rep, SLA, and next step attached immediately", state: "Assigned" },
            { label: "Stage logic", value: "Pipeline reflects the real commercial path", state: "Current" },
            { label: "Handoff", value: "Won work keeps scope and delivery context", state: "Connected" },
          ]}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <SurfaceCard className="p-8">
          <SectionIntro
            eyebrow="Why CRM trust leaks"
            title="Most CRM failure starts when the record no longer matches reality."
          />
          <div className="mt-8 grid gap-3">
            {[
              "Leads sit unassigned or move without a named owner.",
              "Stages exist for reporting but not for real workflow decisions.",
              "Follow-up happens in inboxes, not inside the record.",
              "Delivery inherits a deal without the commercial story attached.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--color-line)] bg-white/72 px-4 py-4 text-sm text-[var(--color-text-soft)]">
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>
        <SurfaceCard dark className="p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-cyan-300">
            What Ingenium changes
          </p>
          <div className="mt-8 grid gap-3">
            {[
              "Ownership rules become visible instead of assumed.",
              "Pipeline stages match the actual sales and handoff path.",
              "Forecasting improves because the record quality improves first.",
              "Sales-to-delivery continuity stops depending on memory.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-sm text-white/78">
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>
      </section>

      <section>
        <SectionIntro
          eyebrow="Record model"
          title="A useful CRM page should feel like operations design, not software description."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Website intent and source data enter with the lead.",
            "Routing, SLA, and next action stay attached to the record.",
            "Approvals and automations act on the same live workflow.",
            "Delivery inherits the same commercial and service context after close.",
          ].map((item) => (
            <SurfaceCard key={item} className="panel-hover p-6 text-sm leading-7 text-[var(--color-text-soft)]">
              {item}
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="graphite-panel rounded-[36px] px-8 py-12 text-center md:px-12">
        <h2 className="mx-auto max-w-4xl font-[var(--font-display)] text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
          A CRM becomes believable when the team sees the same truth inside it every day.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink action={{ label: "Book Demo", href: "/demo" }} className="bg-white text-[var(--color-text)]" />
          <ButtonLink action={{ label: "Revenue Systems Teardown", href: "/revenue-systems-teardown" }} variant="secondary" className="border-white/18 bg-white/8 text-white" />
        </div>
      </section>
    </div>
  );
}
