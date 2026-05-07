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
            The page has to earn the scroll with a believable rollout.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            Ingenium combines software with implementation so the operating model survives contact with the team.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "Book a Demo", href: "/demo" }} />
            <ButtonLink action={{ label: "Get Implementation Support", href: "/contact" }} variant="secondary" />
          </div>
        </div>
      </section>

      <section>
        <SectionIntro
          eyebrow="Implementation Steps"
          title="Implementation in three practical steps."
          align="center"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["01", "Map leakage", "Audit lead capture, routing, ownership, handoff, and reporting gaps."],
            ["02", "Rebuild the operating path", "Connect website, CRM, automation, approvals, and reporting around one process."],
            ["03", "Launch with control", "Roll out the workflow, train owners, and keep review paths visible."],
          ].map(([index, title, body]) => (
            <SurfaceCard key={index} className="panel-hover p-6">
              <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-[var(--color-brand)]">
                Step {index}
              </p>
              <p className="mt-3 font-[var(--font-display)] text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                {title}
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{body}</p>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <SurfaceCard className="p-8">
          <SectionIntro
            eyebrow="Rollout Focus"
            title="The rollout needs clear owners, visible changes, and time to bed in."
          />
          <div className="mt-8 grid gap-3">
            {[
              "Lead capture and routing are reviewed first.",
              "CRM records and lifecycle stages are configured for the real team workflow.",
              "Automation and AI support are introduced where review paths stay visible.",
              "Reporting is checked against the live process, not a separate spreadsheet story.",
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
          <div className="mt-6 grid gap-3">
            {[
              "Weekly checkpoints during rollout.",
              "Approval gates for major workflow changes.",
              "Named owners for live operational updates.",
              "A post-launch review cadence so the system stays usable.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-sm text-white/78">
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>
      </section>

      <section className="graphite-panel rounded-[36px] px-8 py-12 text-center md:px-12">
        <h2 className="mx-auto max-w-4xl font-[var(--font-display)] text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
          Launch with control and keep improving after go-live.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink action={{ label: "Book a Demo", href: "/demo" }} className="bg-white text-[var(--color-text)]" />
          <ButtonLink action={{ label: "Contact Us", href: "/contact" }} variant="secondary" className="border-white/18 bg-white/8 text-white" />
        </div>
      </section>
    </div>
  );
}
