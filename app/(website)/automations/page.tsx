import type { Metadata } from "next";

import { buildMetadata, pageSeo } from "@/lib/seo";

import { PortalPreview } from "../components/siteVisuals";
import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/automations"]);

export default function AutomationsPage() {
  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <section className="grid items-center gap-10 pt-4 lg:grid-cols-[0.94fr,1.06fr]">
        <div>
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-brand)]">
            Automations
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl">
            Automations that move the work forward.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            Ingenium turns important signals into real action with routing, reminders, escalation, and visibility built into the workflow.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "Book Demo", href: "/contact?intent=book-demo" }} />
            <ButtonLink action={{ label: "See Workflow Examples", href: "/platform" }} variant="secondary" />
          </div>
        </div>
        <PortalPreview
          eyebrow="Automation flow"
          title="Important signals should trigger the right next step quickly"
          rows={[
            { label: "Trigger", value: "High-intent form submitted", state: "0s" },
            { label: "Action", value: "Lead routed and owner notified", state: "<60s" },
            { label: "Escalation", value: "Manager alerted if follow-up slips", state: "SLA" },
          ]}
        />
      </section>

      <section>
        <SectionIntro
          eyebrow="Common workflows"
          title="Automate the moments that usually create delay."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "High-intent lead response",
            "Pipeline stall intervention",
            "Marketing to sales handoff",
            "Customer lifecycle alerts",
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
            eyebrow="What good automation looks like"
            title="Every workflow needs a trigger, an owner, and a visible outcome."
          />
          <div className="mt-8 grid gap-3">
            {[
              "Signals route against clear response expectations.",
              "Escalation happens when work stalls.",
              "Approvals can pause sensitive steps.",
              "The team can see what ran and what changed.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--color-line)] bg-white/72 px-4 py-4 text-sm text-[var(--color-text-soft)]">
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>
        <SurfaceCard dark className="p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-cyan-300">
            What buyers get
          </p>
          <div className="mt-8 grid gap-3">
            {[
              "Faster response to important leads and signals.",
              "Less admin work chasing handoffs and reminders.",
              "Better discipline across the team.",
              "Less risk than fragile, hard-to-audit automation stacks.",
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
          Automation should remove delay, not create a new layer of confusion.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink action={{ label: "Book Demo", href: "/contact?intent=book-demo" }} className="bg-white text-[var(--color-text)]" />
          <ButtonLink action={{ label: "Get a Revenue Systems Teardown", href: "/contact?intent=revenue-systems-teardown" }} variant="secondary" className="border-white/18 bg-white/8 text-white" />
        </div>
      </section>
    </div>
  );
}
