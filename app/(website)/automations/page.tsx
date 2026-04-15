import type { Metadata } from "next";

import { buildMetadata, pageSeo } from "@/lib/seo";

import { PortalPreview } from "../components/siteVisuals";
import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/automations"]);

export default function AutomationsPage() {
  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <section className="grid items-center gap-10 pt-4 lg:grid-cols-[0.92fr,1.08fr]">
        <div>
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-brand)]">
            Automations
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl">
            Trigger, owner, escalation, outcome.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            For service businesses running too much by manual chase-up, Ingenium replaces fragile automations with one workflow logic so every important signal has a trigger, a named owner, an escalation path, and a visible result.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "Book Demo", href: "/demo" }} />
            <ButtonLink action={{ label: "Get a Revenue Systems Teardown", href: "/revenue-systems-teardown" }} variant="secondary" />
          </div>
        </div>
        <PortalPreview
          eyebrow="Workflow logic"
          title="Automation should make responsibility clearer, not fuzzier"
          rows={[
            { label: "Trigger", value: "Lead signal, stall event, or approval condition detected", state: "Live" },
            { label: "Owner", value: "Task routes to a named person or queue", state: "Assigned" },
            { label: "Escalation", value: "Missed SLA or blocked step raises the signal", state: "Visible" },
          ]}
        />
      </section>

      <section>
        <SectionIntro
          eyebrow="Workflow design"
          title="The page should feel like operational control logic."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Inbound lead routing with response expectations.",
            "Pipeline stall intervention before deals go quiet.",
            "Approval gates for sensitive actions or AI-assisted work.",
            "Escalation paths that surface risk before leadership gets surprised.",
          ].map((item) => (
            <SurfaceCard key={item} className="panel-hover p-6 text-sm leading-7 text-[var(--color-text-soft)]">
              {item}
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <SurfaceCard className="p-8">
          <SectionIntro
            eyebrow="Control model"
            title="Every workflow should answer four questions."
          />
          <div className="mt-8 grid gap-3">
            {[
              "What event starts the workflow?",
              "Who owns the next action?",
              "When does the workflow escalate or pause?",
              "Where can the team see what ran and what changed?",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--color-line)] bg-white/72 px-4 py-4 text-sm text-[var(--color-text-soft)]">
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>
        <SurfaceCard dark className="p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-cyan-300">
            Buyer outcome
          </p>
          <div className="mt-8 grid gap-3">
            {[
              "Fewer leads and tasks stall unnoticed.",
              "The team wastes less time on manual follow-up policing.",
              "Leadership gets cleaner visibility into blocked work.",
              "Automation is easier to trust because it is easier to inspect.",
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
          Automation should remove delay and surface risk before it becomes a management problem.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink action={{ label: "Book Demo", href: "/demo" }} className="bg-white text-[var(--color-text)]" />
          <ButtonLink action={{ label: "Revenue Systems Teardown", href: "/revenue-systems-teardown" }} variant="secondary" className="border-white/18 bg-white/8 text-white" />
        </div>
      </section>
    </div>
  );
}
