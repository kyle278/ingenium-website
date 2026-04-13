import type { Metadata } from "next";

import { buildMetadata, pageSeo } from "@/lib/seo";

import { PortalPreview } from "../components/siteVisuals";
import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/crm"]);

export default function CrmPage() {
  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <section className="grid items-center gap-10 pt-4 lg:grid-cols-[0.94fr,1.06fr]">
        <div>
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-brand)]">
            CRM
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl">
            Turn your CRM into the system your team actually uses.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            Ingenium keeps pipeline, ownership, follow-up, handoff, and reporting in one working CRM instead of scattered across inboxes, docs, and side tools.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "Book Demo", href: "/contact?intent=book-demo" }} />
            <ButtonLink action={{ label: "See CRM Workflows", href: "/platform" }} variant="secondary" />
          </div>
        </div>
        <PortalPreview
          eyebrow="CRM snapshot"
          title="A clean record should tell the team what happened and what comes next"
          rows={[
            { label: "Lead routing", value: "Owner assigned quickly and clearly", state: "Fast" },
            { label: "Pipeline stage", value: "Stage reflects the real sales process", state: "Current" },
            { label: "Delivery handoff", value: "Won deal keeps its commercial context", state: "Tracked" },
          ]}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <SurfaceCard className="p-8">
          <SectionIntro
            eyebrow="Why CRM breaks"
            title="Most CRM problems are really workflow problems."
            body="The CRM stops being trusted when owners, stages, next steps, and delivery handoff stop matching how the team actually works."
          />
          <div className="mt-8 grid gap-3">
            {[
              "Leads sit unassigned or get picked up too late.",
              "Stages look tidy but do not reflect real deal progress.",
              "Follow-up happens outside the system.",
              "Delivery starts without the full commercial picture.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--color-line)] bg-white/72 px-4 py-4 text-sm text-[var(--color-text-soft)]">
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>
        <SurfaceCard dark className="p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-cyan-300">
            What Ingenium fixes
          </p>
          <div className="mt-8 grid gap-3">
            {[
              "Routing, ownership, and lifecycle rules stay clear.",
              "Sales and ops work from the same record.",
              "Follow-up discipline becomes visible instead of assumed.",
              "Forecasting improves because the underlying workflow is cleaner.",
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
          eyebrow="What good CRM looks like"
          title="The record should move through the business without losing its story."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Website lead enters with source and service context",
            "Owner and response expectations are attached immediately",
            "AI and automations act on the same live record",
            "Delivery continues the same customer story after close",
          ].map((item) => (
            <SurfaceCard key={item} className="panel-hover p-6 text-sm leading-7 text-[var(--color-text-soft)]">
              {item}
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="graphite-panel rounded-[36px] px-8 py-12 text-center md:px-12">
        <h2 className="mx-auto max-w-4xl font-[var(--font-display)] text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
          A CRM becomes useful when the team believes it reflects reality.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink action={{ label: "Book Demo", href: "/contact?intent=book-demo" }} className="bg-white text-[var(--color-text)]" />
          <ButtonLink action={{ label: "Get a Revenue Systems Teardown", href: "/contact?intent=revenue-systems-teardown" }} variant="secondary" className="border-white/18 bg-white/8 text-white" />
        </div>
      </section>
    </div>
  );
}
