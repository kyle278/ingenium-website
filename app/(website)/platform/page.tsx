import type { Metadata } from "next";

import { buildMetadata, pageSeo } from "@/lib/seo";

import { PortalPreview, WorkflowStoryboard } from "../components/siteVisuals";
import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/platform"]);

const modules = [
  ["Websites", "High-intent capture, proof-led journeys, and CRM-connected forms."],
  ["CRM", "Routing, lifecycle logic, follow-up visibility, and cleaner ownership."],
  ["Automations", "Execution paths with timing, escalation, and rollback control."],
  ["AI Agents", "Assistive operators inside bounded tasks, approvals, and audit trails."],
  ["Analytics", "Shared reporting across acquisition, pipeline, and delivery."],
];

const roles = [
  ["Marketing", "See intent and attribution clearly."],
  ["Sales", "Act faster with better context."],
  ["Ops", "Control routing, workflows, and data quality."],
  ["Leadership", "Trust the pipeline and the reporting."],
];

export default function PlatformPage() {
  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <section className="grid items-center gap-8 pt-6 lg:grid-cols-[0.95fr,1.05fr]">
        <div>
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-brand)]">
            Platform
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl">
            The revenue operating system for lean service teams.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            Ingenium connects websites, CRM, automation, AI agents, and reporting in one governed platform.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "Book Demo", href: "/contact?intent=book-demo" }} />
            <ButtonLink action={{ label: "See the Platform", href: "#overview" }} variant="secondary" />
          </div>
        </div>
        <PortalPreview
          eyebrow="Shared data model"
          title="Every module writing into the same operating context"
          rows={[
            { label: "Website submission", value: "Source, service path, and urgency captured", state: "Signal" },
            { label: "CRM routing", value: "Owner, SLA, and stage logic aligned", state: "Action" },
            { label: "Automation run", value: "Escalation and rollback state preserved", state: "Governed" },
            { label: "AI agent support", value: "Approval and execution history attached", state: "Bounded" },
          ]}
        />
      </section>

      <section id="overview">
        <SectionIntro
          eyebrow="Platform overview"
          title="Every module is useful alone. The leverage comes from how they work together."
          body="Ingenium removes the translation layer between acquisition, commercial action, delivery visibility, and reporting."
        />
        <div className="mt-10 grid gap-4 xl:grid-cols-[1.1fr,0.9fr]">
          <SurfaceCard className="p-8">
            <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-[var(--color-brand)]">
              Product suite
            </p>
            <h3 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-[-0.04em] text-[var(--color-text)]">
              One product suite for the work that drives revenue and delivery.
            </h3>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {modules.map(([title, body]) => (
                <div key={title} className="rounded-2xl border border-[var(--color-line)] bg-white/72 p-5">
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
              Why it works
            </p>
            <div className="mt-6 grid gap-3">
              {[
                "Website intent, CRM action, and automation state stay attached.",
                "AI works inside operational context instead of beside it.",
                "Leadership sees the same model that operators are working from.",
                "Delivery continuity stays visible after the deal is won.",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-sm text-white/75">
                  {item}
                </div>
              ))}
            </div>
          </SurfaceCard>
        </div>
      </section>

      <section>
        <SectionIntro
          eyebrow="Workflow continuity"
          title="One model across the whole revenue journey."
          body="The point is not having five products. The point is preserving the same context from website intent through delivery execution."
        />
        <div className="mt-10">
          <WorkflowStoryboard />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr,0.95fr]">
        <SurfaceCard className="p-8">
          <SectionIntro
            eyebrow="Different operators. One system."
            title="Different operators. One system."
            body="Each team sees the part of the platform they need without losing the shared context underneath it."
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
            Trust and governance
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-[-0.04em] text-white">
            Speed and control in the same operating model.
          </h2>
          <div className="mt-8 grid gap-3">
            {[
              "Governed workflows across every module",
              "Approval paths for sensitive actions",
              "Execution history attached to the record",
              "Review-ready materials for technical buyers",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-sm text-white/75">
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>
      </section>

      <section className="graphite-panel rounded-[36px] px-8 py-12 text-center md:px-12">
        <h2 className="mx-auto max-w-4xl font-[var(--font-display)] text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
          The value is not one more tool. It is one more layer of agreement across the system.
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/72">
          Start with the platform view, then decide where to roll out first.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink action={{ label: "Book Demo", href: "/contact?intent=book-demo" }} className="bg-white text-[var(--color-text)]" />
          <ButtonLink action={{ label: "Get a Revenue Systems Teardown", href: "/contact?intent=revenue-systems-teardown" }} variant="secondary" className="border-white/18 bg-white/8 text-white" />
        </div>
      </section>
    </div>
  );
}
