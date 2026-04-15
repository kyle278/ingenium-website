import type { Metadata } from "next";
import Link from "next/link";

import { buildMetadata, pageSeo } from "@/lib/seo";
import { caseStudies } from "@/src/lib/caseStudies";

import { PortalPreview, WorkflowStoryboard } from "./components/siteVisuals";
import { ButtonLink, SectionIntro, SurfaceCard } from "./components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/"]);

const proofCards = [
  {
    title: "Website leads arrive with better context",
    body: "Service path, source, urgency, and buyer intent are captured before the CRM handoff starts.",
  },
  {
    title: "CRM records stay usable after the sale",
    body: "Ownership, next step, commercial notes, and delivery handoff stay connected instead of being rebuilt in side tools.",
  },
  {
    title: "AI and automation stay inside approval rules",
    body: "Teams move faster without losing review paths, history, or accountability for sensitive steps.",
  },
];

const buyerFits = [
  "Founder-led service businesses",
  "Consultancies with multi-step sales cycles",
  "Revenue and ops teams cleaning up handoff and reporting",
  "Technical buyers who need visible controls before rollout",
];

const implementationSteps = [
  ["1", "Map leakage", "Audit lead capture, routing, ownership, handoff, and reporting gaps."],
  ["2", "Rebuild the operating path", "Connect website, CRM, automation, approvals, and reporting around one process."],
  ["3", "Launch with control", "Roll out the workflow, train owners, and keep review paths visible."],
];

export default function HomePage() {
  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <section className="grid items-start gap-10 pt-2 lg:grid-cols-[0.92fr,1.08fr] lg:pt-4">
        <div className="max-w-3xl pt-6">
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-brand)]">
            Revenue operating system
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl lg:text-[4.6rem]">
            Replace disconnected website, CRM, automation, and AI tools with one revenue operating system for service businesses.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            For service businesses that have outgrown a fragmented stack, Ingenium replaces scattered tools and handoffs with one operating model so teams respond faster, hand work over cleanly, and trust the numbers they are using.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "Book Demo", href: "/demo" }} />
            <ButtonLink action={{ label: "Get a Revenue Systems Teardown", href: "/revenue-systems-teardown" }} variant="secondary" />
          </div>
          <div className="mt-8 rounded-[28px] border border-[var(--color-line)] bg-white/72 px-5 py-5">
            <p className="text-sm font-semibold text-[var(--color-text)]">Who this is for</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {buyerFits.map((item) => (
                <div key={item} className="rounded-2xl border border-[var(--color-line)] bg-white/80 px-4 py-4 text-sm text-[var(--color-text-soft)]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <PortalPreview
            eyebrow="Product walkthrough"
            title="One record moving from lead capture to delivery continuity"
            rows={[
              { label: "Lead captured", value: "Website form records source, pain, and service context", state: "Live" },
              { label: "Owner assigned", value: "CRM sets owner, SLA, and next step", state: "Active" },
              { label: "Approvals held", value: "Automation and AI pause when review is required", state: "Scoped" },
              { label: "Handoff kept", value: "Delivery keeps the same commercial context", state: "Tracked" },
            ]}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {proofCards.map((card) => (
              <SurfaceCard key={card.title} className="p-5">
                <p className="font-[var(--font-display)] text-lg font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                  {card.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">{card.body}</p>
              </SurfaceCard>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionIntro
          eyebrow="Proof"
          title="Three proof blocks before the buyer has to trust the concept."
          body="The site should show operational depth early: named work, concrete workflow change, and visible controls."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {caseStudies.slice(0, 3).map((study) => (
            <Link key={study.id} href={`/case-studies/${study.id}`} className="group block rounded-[28px]">
              <SurfaceCard className="panel-hover h-full p-6">
                <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-[var(--color-brand)]">
                  {study.client}
                </p>
                <h3 className="mt-4 font-[var(--font-display)] text-2xl font-semibold tracking-[-0.04em] text-[var(--color-text)]">
                  {study.projectName}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">
                  {study.intervention}
                </p>
                <p className="mt-4 text-sm font-medium text-[var(--color-text)]">What changed</p>
                <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">
                  {study.deliveredAssets[0]}
                </p>
                <p className="mt-4 text-sm font-medium text-[var(--color-brand)]">View full case study</p>
              </SurfaceCard>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <SectionIntro
          eyebrow="Platform"
          title="One operating model across acquisition, CRM execution, handoff, reporting, and governed AI."
          body="Ingenium is most useful when the whole buyer and delivery path is connected instead of patched together."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-[1.08fr,0.92fr]">
          <SurfaceCard className="p-8">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["Website capture", "High-intent pages, better forms, and cleaner enquiry context."],
                ["CRM execution", "Record design, ownership rules, pipeline hygiene, and handoff continuity."],
                ["Workflow automation", "Trigger-owner-escalation logic with visible outcomes."],
                ["Governed AI support", "Approvals, task boundaries, audit history, and useful prep work."],
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

          <SurfaceCard dark className="p-6">
            <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-cyan-300">
              What this replaces
            </p>
            <div className="mt-4 grid gap-3">
              {[
                "A website that collects leads but does not help sales act.",
                "A CRM that looks populated but cannot be trusted.",
                "Automation glued together without a clear owner or audit trail.",
                "AI tools running beside the workflow instead of inside it.",
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
          eyebrow="Implementation"
          title="The page has to earn the scroll with a believable rollout."
          body="Ingenium combines software with implementation so the operating model survives contact with the team."
          align="center"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {implementationSteps.map(([step, title, body]) => (
            <SurfaceCard key={step} className="panel-hover p-6">
              <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-[var(--color-brand)]">
                Step {step}
              </p>
              <p className="mt-3 font-[var(--font-display)] text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                {title}
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{body}</p>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.96fr,1.04fr]">
        <SurfaceCard dark className="p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-cyan-300">
            Security and trust
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-[-0.04em] text-white">
            Technical buyers need visible controls, not implied maturity.
          </h2>
          <div className="mt-8 grid gap-3">
            {[
              "Role-based access and clear ownership boundaries.",
              "Approvals for sensitive actions and AI-assisted work.",
              "Audit history attached to the workflow record.",
              "A clean technical review path for architecture and procurement questions.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-sm text-white/78">
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>

        <div>
          <SectionIntro
            eyebrow="Workflow"
            title="One commercial story from first enquiry to fulfilment."
            body="The master narrative is acquisition, CRM execution, handoff, delivery continuity, reporting, and governed AI support."
          />
          <div className="mt-8">
            <WorkflowStoryboard />
          </div>
        </div>
      </section>

      <section className="graphite-panel rounded-[36px] px-8 py-12 text-center md:px-12">
        <h2 className="mx-auto max-w-4xl font-[var(--font-display)] text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
          Choose the path that matches how you buy.
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/72">
          Start with a demo, a teardown, or a technical review. Each path now has its own landing flow and confirmation step.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/demo"
            className="cta-lift inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--color-text)]"
          >
            Book Demo
          </Link>
          <Link
            href="/revenue-systems-teardown"
            className="cta-lift inline-flex items-center justify-center rounded-full border border-white/18 bg-white/10 px-5 py-3 text-sm font-semibold text-white"
          >
            Revenue Systems Teardown
          </Link>
          <Link
            href="/technical-review"
            className="cta-lift inline-flex items-center justify-center rounded-full border border-white/18 bg-white/10 px-5 py-3 text-sm font-semibold text-white"
          >
            Technical Review
          </Link>
        </div>
      </section>
    </div>
  );
}
