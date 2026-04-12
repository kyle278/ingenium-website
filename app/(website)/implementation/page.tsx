import type { Metadata } from "next";

import { buildMetadata, pageSeo } from "@/lib/seo";

import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/implementation"]);

export default function ImplementationPage() {
  return (
    <div className="space-y-24 pb-8 md:space-y-32">
      <section className="pt-6">
        <div className="max-w-4xl">
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-brand)]">
            Implementation
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl">
            Structured rollout without the usual drag.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            Ingenium pairs the platform with a disciplined implementation model so teams can launch quickly, govern confidently, and keep improving.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "Book Demo", href: "/contact?intent=book-demo" }} />
            <ButtonLink action={{ label: "Get a Revenue Systems Teardown", href: "/contact?intent=revenue-systems-teardown" }} variant="secondary" />
          </div>
        </div>
      </section>

      <section>
        <SectionIntro
          eyebrow="Rollout phases"
          title="A rollout model built to protect momentum and control."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["Week 1", "Audit the leakage points and align the operating model."],
            ["Weeks 2-4", "Configure the core system, workflows, and approvals."],
            ["Week 5+", "Launch, train, optimize, and govern the live model."],
          ].map(([phase, copy]) => (
            <SurfaceCard key={phase} className="panel-hover p-6">
              <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-[var(--color-brand)]">
                {phase}
              </p>
              <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">{copy}</p>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <SurfaceCard className="p-8">
          <SectionIntro
            eyebrow="Stakeholder view"
            title="The rollout gives each stakeholder a clear part to review."
          />
          <div className="mt-8 grid gap-3">
            {[
              "Founders review scope, sequencing, and commercial risk.",
              "Revenue leaders review routing, ownership, and forecasting logic.",
              "Ops reviews data quality, workflow rules, and reporting structure.",
              "Technical stakeholders review governance, approvals, and architecture.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--color-line)] bg-white/72 px-4 py-4 text-sm text-[var(--color-text-soft)]">
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>
        <SurfaceCard dark className="p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-cyan-300">
            Governance rhythm
          </p>
          <div className="mt-8 grid gap-3">
            {[
              "Weekly implementation checkpoints",
              "Approval gates for workflow and AI releases",
              "Named owners for live operational changes",
              "Post-launch operating review and optimization cadence",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-sm text-white/75">
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>
      </section>

      <section>
        <SectionIntro
          eyebrow="First 30 days"
          title="The first month should leave the team with a system it can actually run."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Website-to-CRM pathways defined and live",
            "Core routing and approval workflows configured",
            "AI support attached to bounded operational tasks",
            "Leadership reporting connected to the shared model",
          ].map((item) => (
            <SurfaceCard key={item} className="panel-hover p-6 text-sm leading-7 text-[var(--color-text-soft)]">
              {item}
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="graphite-panel rounded-[36px] px-8 py-12 text-center md:px-12">
        <h2 className="mx-auto max-w-4xl font-[var(--font-display)] text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
          The implementation plan matters because the operating model only works if the team adopts it cleanly.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink action={{ label: "Book Demo", href: "/contact?intent=book-demo" }} className="bg-white text-[var(--color-text)]" />
          <ButtonLink action={{ label: "Technical Review", href: "/contact?intent=technical-review" }} variant="secondary" className="border-white/18 bg-white/8 text-white" />
        </div>
      </section>
    </div>
  );
}
