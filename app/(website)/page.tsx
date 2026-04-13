import type { Metadata } from "next";
import Link from "next/link";

import { buildMetadata, pageSeo } from "@/lib/seo";

import {
  ComparisonVisual,
  GovernanceStack,
  PortalPreview,
  SystemStackVisual,
  WorkflowStoryboard,
} from "./components/siteVisuals";
import { ButtonLink, SectionIntro, SurfaceCard } from "./components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/"]);

const trustItems = [
  "Governed workflows",
  "Audit-ready actions",
  "Human approval paths",
  "Website-to-delivery visibility",
];

const problemCards = [
  {
    title: "Marketing",
    body: "Campaigns run, but attribution and buyer context break.",
  },
  {
    title: "Sales",
    body: "Leads arrive late and reps work around the CRM.",
  },
  {
    title: "Operations",
    body: "Handoffs, ownership, and reporting drift under pressure.",
  },
  {
    title: "Leadership",
    body: "Forecasts look polished but cannot be trusted.",
  },
];

const moduleCards = [
  {
    title: "Websites",
    body: "Capture high-intent signals with forms, journeys, and proof-led pages.",
    href: "/websites",
  },
  {
    title: "CRM",
    body: "Route, enrich, track, and act from one reliable revenue workspace.",
    href: "/crm",
  },
  {
    title: "Automations",
    body: "Move critical actions instantly with real ownership and SLA control.",
    href: "/automations",
  },
  {
    title: "AI Agents",
    body: "Deploy AI inside governed workflows, not outside the business.",
    href: "/ai-agents",
  },
  {
    title: "Analytics",
    body: "See what is working, what is leaking, and what is likely to close.",
    href: "/platform",
  },
];

const switchReasons = [
  "Faster follow-up",
  "Cleaner handoffs",
  "Better forecasting",
  "Less tool sprawl",
  "More leverage without more headcount",
];

const proofCards = [
  "Website to CRM routing view",
  "AI brief approval flow",
  "Automation SLA panel",
  "Revenue dashboard",
  "Named case study outcome",
];

export default function HomePage() {
  return (
    <div className="space-y-24 pb-8 md:space-y-32">
      <section className="grid items-start gap-8 pt-4 lg:grid-cols-[1.02fr,0.98fr] lg:pt-6">
        <div className="max-w-3xl">
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-brand)]">
            Revenue Operating System
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl lg:text-[4.4rem]">
            One system for lead capture, sales, delivery, and AI execution.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            Ingenium gives lean service businesses one governed platform for website intent, CRM
            action, workflow automation, reporting, and AI-assisted execution.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "Book Demo", href: "/contact?intent=book-demo" }} />
            <ButtonLink action={{ label: "See the Platform", href: "/platform" }} variant="secondary" />
          </div>
          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
            {[
              "Website intent enters the system with source and service context.",
              "CRM ownership, SLA, and next action stay attached to the same record.",
              "AI support runs inside approvals instead of outside the workflow.",
              "Delivery visibility remains connected after the close.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--color-line)] bg-white/62 px-4 py-4 text-sm leading-6 text-[var(--color-text-soft)]">
                {item}
              </div>
            ))}
          </div>
        </div>
        <SystemStackVisual />
      </section>

      <section className="mineral-panel rounded-[32px] px-6 py-6 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.85fr,1.15fr] lg:items-center">
          <div>
            <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-[var(--color-brand)]">
              Trust strip
            </p>
            <h2 className="mt-4 font-[var(--font-display)] text-2xl font-semibold tracking-[-0.04em] text-[var(--color-text)]">
              Built for teams that need speed, control, and proof.
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">
              Replace disconnected tools with one accountable operating layer.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {trustItems.map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--color-line)] bg-white/72 px-4 py-4 text-sm text-[var(--color-text-soft)]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionIntro
          eyebrow="The problem"
          title="Most revenue teams are still working across systems that do not agree."
          align="center"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {problemCards.map((card) => (
            <SurfaceCard key={card.title} className="panel-hover p-6">
              <p className="font-[var(--font-display)] text-xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                {card.title}
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{card.body}</p>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section>
        <SectionIntro
          eyebrow="Product architecture"
          title="The platform that connects the whole journey."
          body="Ingenium links first touch, pipeline movement, delivery execution, and reporting in one shared system."
        />
        <div className="mt-10 grid gap-4 xl:grid-cols-[1.2fr,0.8fr]">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {moduleCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="mineral-panel panel-hover rounded-[28px] p-6"
              >
                <p className="font-[var(--font-display)] text-xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                  {card.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{card.body}</p>
              </Link>
            ))}
          </div>
          <PortalPreview
            eyebrow="Shared operating layer"
            title="Portal workflow snapshot"
            rows={[
              { label: "Buyer submits high-intent form", value: "Website signal with service context", state: "Captured" },
              { label: "Record enriched and routed", value: "Owner, SLA, and attribution set", state: "Assigned" },
              { label: "AI brief prepared", value: "Suggested action awaiting review", state: "Approval" },
              { label: "Delivery handoff created", value: "Commercial context retained after close", state: "Visible" },
            ]}
          />
        </div>
      </section>

      <section>
        <SectionIntro
          eyebrow="From website intent to revenue action"
          title="From website intent to revenue action."
          body="Each state answers one operational question: who owns this signal, what happens next, what gets approved, and what stays visible after the close."
        />
        <div className="mt-10">
          <WorkflowStoryboard />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.82fr,1.18fr]">
        <SurfaceCard className="p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-[var(--color-brand)]">
            Why Ingenium
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-[-0.04em] text-[var(--color-text)]">
            Why teams switch.
          </h2>
          <div className="mt-8 grid gap-3">
            {switchReasons.map((reason) => (
              <div key={reason} className="rounded-2xl border border-[var(--color-line)] bg-white/70 px-4 py-4 text-sm text-[var(--color-text-soft)]">
                {reason}
              </div>
            ))}
          </div>
        </SurfaceCard>
        <div>
          <SectionIntro
            eyebrow="Comparison"
            title="Not another CRM. Not another AI tool."
            body="Fragmented tools force teams to translate context by hand. Ingenium keeps the context attached."
          />
          <div className="mt-8">
            <ComparisonVisual />
          </div>
        </div>
      </section>

      <section>
        <SectionIntro
          eyebrow="Proof"
          title="Proof should look like workflow, not just words."
          body="Named screens, named reviews, and named rollout examples work harder than placeholder counters."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-[1.1fr,0.9fr]">
          <PortalPreview
            eyebrow="Revenue dashboard"
            title="Pipeline view connected to delivery and approvals"
            rows={[
              { label: "New business review", value: "Website source, owner, and AI brief visible", state: "Today" },
              { label: "Handoff risk", value: "Commercial scope missing onboarding note", state: "Flagged" },
              { label: "Forecast note", value: "Leadership sees stage confidence and delivery status", state: "Ready" },
            ]}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {proofCards.map((item) => (
              <SurfaceCard key={item} className="panel-hover p-5">
                <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                  Requested asset
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{item}</p>
              </SurfaceCard>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr,0.95fr]">
        <SurfaceCard className="p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-[var(--color-brand)]">
            Implementation
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-[-0.04em] text-[var(--color-text)]">
            Launch the system without replatforming chaos.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-text-soft)]">
            Ingenium combines platform software with a structured rollout model so teams can go
            live quickly and keep control.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["Week 1", "Audit the leakage points."],
              ["Weeks 2-4", "Configure the core system."],
              ["Week 5+", "Launch, train, optimize, and govern."],
            ].map(([phase, copy]) => (
              <div key={phase} className="rounded-2xl border border-[var(--color-line)] bg-white/72 p-5">
                <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-[var(--color-brand)]">
                  {phase}
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{copy}</p>
              </div>
            ))}
          </div>
        </SurfaceCard>
        <GovernanceStack />
      </section>

      <section className="graphite-panel rounded-[36px] px-8 py-12 text-center md:px-12">
        <h2 className="mx-auto max-w-4xl font-[var(--font-display)] text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
          If your stack is slowing revenue, the fix is not another isolated tool.
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/72">
          Book a demo or get a practical teardown of the shortest path from your current stack to
          a more accountable system.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/contact?intent=book-demo"
            className="cta-lift inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--color-text)] shadow-[0_18px_40px_rgba(255,255,255,0.08)]"
          >
            Book Demo
          </Link>
          <Link
            href="/contact?intent=revenue-systems-teardown"
            className="cta-lift inline-flex items-center justify-center rounded-full border border-white/18 bg-white/10 px-5 py-3 text-sm font-semibold text-white"
          >
            Get a Revenue Systems Teardown
          </Link>
        </div>
      </section>
    </div>
  );
}
