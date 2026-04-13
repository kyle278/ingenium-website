import type { Metadata } from "next";

import { buildMetadata, pageSeo } from "@/lib/seo";

import { PortalPreview, WorkflowStoryboard } from "../components/siteVisuals";
import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/platform"]);

const modules = [
  ["Websites", "Capture leads and send them into the right workflow from the start."],
  ["CRM", "Keep pipeline, ownership, follow-up, and handoff in one working system."],
  ["Automations", "Move work forward with rules, alerts, escalations, and approvals."],
  ["AI Agents", "Use AI for prep work, summaries, monitoring, and next-step recommendations."],
  ["Reporting", "See pipeline, activity, and delivery signals in one place."],
];

const roles = [
  ["Marketing", "See what is creating demand and what is actually turning into pipeline."],
  ["Sales", "Respond faster with better context and cleaner next steps."],
  ["Operations", "Control routing, workflow quality, and cross-team handoffs."],
  ["Leadership", "Trust the numbers because they come from the same system the team is using."],
];

export default function PlatformPage() {
  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <section className="grid items-center gap-10 pt-4 lg:grid-cols-[0.92fr,1.08fr]">
        <div>
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-brand)]">
            Platform
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl">
            One platform for the work that drives revenue.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            Ingenium brings your website, CRM, automation, AI tools, and reporting into one connected system, so teams can move faster without losing context.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "Book Demo", href: "/contact?intent=book-demo" }} />
            <ButtonLink action={{ label: "See Solutions", href: "#suite" }} variant="secondary" />
          </div>
        </div>
        <PortalPreview
          eyebrow="Platform snapshot"
          title="The same lead stays connected from first enquiry to delivery"
          rows={[
            { label: "Website lead", value: "Source, service interest, and urgency captured", state: "Live" },
            { label: "CRM update", value: "Owner, stage, and next action set", state: "Active" },
            { label: "Automation", value: "Follow-up and escalation running", state: "On" },
            { label: "Reporting", value: "Pipeline and delivery visibility updated", state: "Ready" },
          ]}
        />
      </section>

      <section id="suite">
        <SectionIntro
          eyebrow="Platform suite"
          title="Everything connected in one operating system."
          body="Most teams buy separate tools, then spend time translating between them. Ingenium removes that gap."
        />
        <div className="mt-10 grid gap-4 xl:grid-cols-[1.08fr,0.92fr]">
          <SurfaceCard className="p-8">
            <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-[var(--color-brand)]">
              Core products
            </p>
            <h3 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-[-0.04em] text-[var(--color-text)]">
              Each part works on its own. The value comes from how they work together.
            </h3>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {modules.map(([title, body]) => (
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
              Why buyers care
            </p>
            <div className="mt-6 grid gap-3">
              {[
                "Leads do not disappear between the website and the CRM.",
                "Teams stop rebuilding the same customer story in different tools.",
                "Automation supports the workflow instead of hiding it.",
                "Reporting reflects what is actually happening across pipeline and delivery.",
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
          eyebrow="How it works"
          title="One journey from first click to fulfilment."
          body="Ingenium keeps the same record moving through marketing, sales, operations, and delivery."
          align="center"
        />
        <div className="mt-10">
          <WorkflowStoryboard />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.04fr,0.96fr]">
        <SurfaceCard className="p-8">
          <SectionIntro
            eyebrow="Different teams, one system"
            title="Different operators. One platform."
            body="Each team gets what it needs without losing the shared context underneath the work."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {roles.map(([role, body]) => (
              <div key={role} className="rounded-2xl border border-[var(--color-line)] bg-white/72 p-5">
                <p className="font-[var(--font-display)] text-xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                  {role}
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{body}</p>
              </div>
            ))}
          </div>
        </SurfaceCard>
        <SurfaceCard dark className="p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-cyan-300">
            Trust and control
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-[-0.04em] text-white">
            Fast enough for operators. Clear enough for stakeholders.
          </h2>
          <div className="mt-8 grid gap-3">
            {[
              "Approval paths for sensitive actions",
              "Execution history attached to the record",
              "Clear review path for technical buyers",
              "Delivery continuity visible after the sale",
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
          The point is not more software. The point is fewer gaps between teams.
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/72">
          Start with a demo or a teardown and see where your current stack is creating drag.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink action={{ label: "Book Demo", href: "/contact?intent=book-demo" }} className="bg-white text-[var(--color-text)]" />
          <ButtonLink action={{ label: "Get a Revenue Systems Teardown", href: "/contact?intent=revenue-systems-teardown" }} variant="secondary" className="border-white/18 bg-white/8 text-white" />
        </div>
      </section>
    </div>
  );
}
