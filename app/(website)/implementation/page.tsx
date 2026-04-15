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
            Roll out the operating system without losing control of the business.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            For service businesses replacing a fragmented stack, Ingenium combines software with rollout support so the new workflow can launch cleanly, survive stakeholder review, and remain usable after go-live.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "Book Demo", href: "/demo" }} />
            <ButtonLink action={{ label: "Revenue Systems Teardown", href: "/revenue-systems-teardown" }} variant="secondary" />
          </div>
        </div>
      </section>

      <section>
        <SectionIntro
          eyebrow="Rollout phases"
          title="Implementation should reduce uncertainty in stages, not dump complexity on the team."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["Week 1", "Map leakage, define the target workflow, and confirm the buying path."],
            ["Weeks 2 to 4", "Configure CRM logic, automation, approvals, reporting, and the handoff model."],
            ["Week 5 onward", "Launch, train owners, monitor adoption, and refine the live system."],
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
            title="Different stakeholders should get the right part of the rollout."
          />
          <div className="mt-8 grid gap-3">
            {[
              "Founders review sequencing, risk, and commercial priorities.",
              "Revenue leaders review routing, ownership, and reporting logic.",
              "Ops reviews handoff, workflow discipline, and live adoption.",
              "Technical stakeholders review permissions, approvals, and architecture boundaries.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--color-line)] bg-white/72 px-4 py-4 text-sm text-[var(--color-text-soft)]">
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>
        <SurfaceCard dark className="p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-cyan-300">
            Delivery model
          </p>
          <div className="mt-8 grid gap-3">
            {[
              "Weekly checkpoints during rollout.",
              "Approval gates for major workflow changes.",
              "Named owners for live operational updates.",
              "Post-launch review cadence so the system stays usable.",
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
          title="The first month should leave the team with a working system it can actually run."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Website-to-CRM lead flow defined and live.",
            "Core routing, approvals, and escalation configured.",
            "AI support attached only to bounded, reviewable tasks.",
            "Leadership reporting reading from the same live workflow.",
          ].map((item) => (
            <SurfaceCard key={item} className="panel-hover p-6 text-sm leading-7 text-[var(--color-text-soft)]">
              {item}
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="graphite-panel rounded-[36px] px-8 py-12 text-center md:px-12">
        <h2 className="mx-auto max-w-4xl font-[var(--font-display)] text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
          The platform only works if the rollout leaves the team with cleaner habits, not just new software.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink action={{ label: "Book Demo", href: "/demo" }} className="bg-white text-[var(--color-text)]" />
          <ButtonLink action={{ label: "Technical Review", href: "/technical-review" }} variant="secondary" className="border-white/18 bg-white/8 text-white" />
        </div>
      </section>
    </div>
  );
}
