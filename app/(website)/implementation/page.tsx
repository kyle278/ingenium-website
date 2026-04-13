import type { Metadata } from "next";

import { buildMetadata, pageSeo } from "@/lib/seo";

import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/implementation"]);

export default function ImplementationPage() {
  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <section className="pt-4">
        <div className="max-w-4xl">
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-brand)]">
            Implementation
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl">
            Roll out the platform without the usual drag.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            Ingenium combines the software with a practical implementation model, so teams can launch faster, stay aligned, and keep improving after go-live.
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
          title="A simple rollout that protects momentum."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["Week 1", "Audit the current stack, leakage points, and team workflow."],
            ["Weeks 2-4", "Configure the core platform, routing, approvals, and reporting."],
            ["Week 5+", "Launch, train the team, and improve the live system over time."],
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
            eyebrow="Who reviews what"
            title="Each stakeholder gets a clear part of the rollout."
          />
          <div className="mt-8 grid gap-3">
            {[
              "Founders review scope, sequencing, and commercial risk.",
              "Revenue leaders review routing, ownership, and forecast logic.",
              "Ops reviews workflows, data quality, and reporting setup.",
              "Technical stakeholders review permissions, approvals, and architecture.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--color-line)] bg-white/72 px-4 py-4 text-sm text-[var(--color-text-soft)]">
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>
        <SurfaceCard dark className="p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-cyan-300">
            Operating rhythm
          </p>
          <div className="mt-8 grid gap-3">
            {[
              "Weekly checkpoints during implementation",
              "Approval gates for key workflow changes",
              "Named owners for live operational updates",
              "Post-launch review and optimisation cadence",
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
          eyebrow="First 30 days"
          title="The first month should leave the team with a system it can actually run."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Website-to-CRM flow defined and live",
            "Core routing and approvals configured",
            "AI support attached to useful, bounded tasks",
            "Leadership reporting connected to the same system",
          ].map((item) => (
            <SurfaceCard key={item} className="panel-hover p-6 text-sm leading-7 text-[var(--color-text-soft)]">
              {item}
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="graphite-panel rounded-[36px] px-8 py-12 text-center md:px-12">
        <h2 className="mx-auto max-w-4xl font-[var(--font-display)] text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
          The rollout matters because the platform only works if the team adopts it cleanly.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink action={{ label: "Book Demo", href: "/contact?intent=book-demo" }} className="bg-white text-[var(--color-text)]" />
          <ButtonLink action={{ label: "Technical Review", href: "/contact?intent=technical-review" }} variant="secondary" className="border-white/18 bg-white/8 text-white" />
        </div>
      </section>
    </div>
  );
}
