import type { Metadata } from "next";

import { buildMetadata, pageSeo } from "@/lib/seo";

import { PortalPreview, WorkflowStoryboard } from "../components/siteVisuals";
import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/platform"]);

export default function PlatformPage() {
  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <section className="grid items-center gap-10 pt-4 lg:grid-cols-[0.92fr,1.08fr]">
        <div>
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-brand)]">
            Platform
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl">
            One operating layer across acquisition, CRM execution, handoff, reporting, and governed AI support.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            Ingenium is designed for service businesses that want one process instead of disconnected tools and hidden handoffs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "Book Demo", href: "/demo" }} />
            <ButtonLink action={{ label: "Revenue Systems Teardown", href: "/revenue-systems-teardown" }} variant="secondary" />
          </div>
        </div>
        <PortalPreview
          eyebrow="Platform walkthrough"
          title="The same lead stays connected from first enquiry to delivery continuity"
          rows={[
            { label: "Website lead", value: "Source, pain, and service context captured", state: "Live" },
            { label: "CRM action", value: "Owner, SLA, and next step assigned", state: "Current" },
            { label: "Automation and AI", value: "Signals act inside visible controls", state: "Scoped" },
            { label: "Reporting", value: "Leadership sees the same workflow the team is using", state: "Ready" },
          ]}
        />
      </section>

      <section>
        <SectionIntro
          eyebrow="What the platform replaces"
          title="Separate tools are usually hiding one operational problem."
        />
        <div className="mt-10 grid gap-4 xl:grid-cols-[1.08fr,0.92fr]">
          <SurfaceCard className="p-8">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["Website capture", "High-intent paths and proof-led conversion tied to CRM routing."],
                ["CRM execution", "Ownership, pipeline discipline, and delivery continuity in one record."],
                ["Workflow automation", "Escalation, approvals, and visible workflow outcomes."],
                ["Governed AI support", "Practical AI inside the same control model as the rest of the business."],
              ].map(([title, body]) => (
                <div key={title} className="rounded-2xl border border-[var(--color-line)] bg-white/74 p-5">
                  <p className="font-[var(--font-display)] text-xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                    {title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{body}</p>
                </div>
              ))}
            </div>
          </SurfaceCard>
          <SurfaceCard dark className="p-8">
            <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-cyan-300">
              Buyer value
            </p>
            <div className="mt-6 grid gap-3">
              {[
                "Leads stop disappearing between systems.",
                "Teams stop rebuilding the same story in multiple tools.",
                "Controls stay visible to operators and reviewers.",
                "Reporting becomes more believable because it reads from the real workflow.",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-sm text-white/78">
                  {item}
                </div>
              ))}
            </div>
          </SurfaceCard>
        </div>
      </section>

      <section>
        <SectionIntro
          eyebrow="Workflow"
          title="One journey from first click to fulfilment."
          body="The platform is most useful when acquisition, sales, delivery, and reporting all read from the same operating story."
          align="center"
        />
        <div className="mt-10">
          <WorkflowStoryboard />
        </div>
      </section>

      <section className="graphite-panel rounded-[36px] px-8 py-12 text-center md:px-12">
        <h2 className="mx-auto max-w-4xl font-[var(--font-display)] text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
          The point is fewer gaps between teams, not more software to manage.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink action={{ label: "Book Demo", href: "/demo" }} className="bg-white text-[var(--color-text)]" />
          <ButtonLink action={{ label: "Revenue Systems Teardown", href: "/revenue-systems-teardown" }} variant="secondary" className="border-white/18 bg-white/8 text-white" />
        </div>
      </section>
    </div>
  );
}
