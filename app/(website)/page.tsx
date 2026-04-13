import type { Metadata } from "next";
import Link from "next/link";

import { buildMetadata, pageSeo } from "@/lib/seo";
import { caseStudies } from "@/src/lib/caseStudies";

import {
  ComparisonVisual,
  GovernanceStack,
  PortalPreview,
  SystemStackVisual,
  WorkflowStoryboard,
} from "./components/siteVisuals";
import { ButtonLink, SectionIntro, SurfaceCard } from "./components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/"]);

const painCards = [
  {
    title: "Leads fall through cracks",
    body: "Website enquiries come in, but follow-up depends on manual checks and personal memory.",
  },
  {
    title: "CRM goes out of date",
    body: "Teams work outside the CRM because it feels slower than the real work happening around it.",
  },
  {
    title: "Automation breaks between systems",
    body: "Triggers fail, context gets lost, and nobody is quite sure what actually ran.",
  },
  {
    title: "Leadership lacks real visibility",
    body: "Reports look clean, but they do not reflect what is happening across pipeline and delivery.",
  },
];

const solutionCards = [
  {
    title: "Websites that feed your CRM",
    body: "Capture better leads and send them straight into the right workflow with the right context.",
    href: "/websites",
  },
  {
    title: "CRM built for real operations",
    body: "Keep ownership, pipeline, follow-up, and handoff in a system your team can actually use.",
    href: "/crm",
  },
  {
    title: "Automations that run the business",
    body: "Move work forward with routing, reminders, approvals, and escalation that do not rely on duct tape.",
    href: "/automations",
  },
  {
    title: "AI agents inside the workflow",
    body: "Use AI where it helps most: prep work, summaries, monitoring, and next-step recommendations.",
    href: "/ai-agents",
  },
  {
    title: "Reporting you can trust",
    body: "See pipeline, activity, and delivery signals in one place instead of stitching reports together by hand.",
    href: "/platform",
  },
];

const outcomes = [
  "Faster lead response",
  "Better follow-up discipline",
  "Cleaner handoffs",
  "More accurate forecasting",
  "Less admin work",
  "Fewer tools to manage",
];

export default function HomePage() {
  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <section className="grid items-start gap-10 pt-2 lg:grid-cols-[0.88fr,1.12fr] lg:pt-4">
        <div className="max-w-3xl pt-6">
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-brand)]">
            All-in-one revenue and operations platform
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl lg:text-[4.65rem]">
            Run your entire revenue operation in one platform.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            Ingenium combines your website, CRM, automation, AI tools, and reporting into one connected system so your team moves faster, closes more deals, and never loses context.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "Book Demo", href: "/contact?intent=book-demo" }} />
            <ButtonLink action={{ label: "See Platform", href: "/platform" }} variant="secondary" />
          </div>
          <div className="mt-6 rounded-[28px] border border-[var(--color-line)] bg-white/72 px-5 py-4">
            <p className="text-sm font-semibold text-[var(--color-text)]">
              Website + CRM + Automation + AI + Reporting. Fully connected in one platform.
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">
              Built for founder-led agencies, consultancies, and B2B service businesses that have outgrown disconnected tools.
            </p>
          </div>
          <div className="mt-6 grid max-w-2xl gap-3 sm:grid-cols-3">
            {[
              ["Software + rollout", "Platform software with phased implementation support."],
              ["Portal-linked tracking", "Lead capture and attribution stay attached to the workflow."],
              ["Technical review path", "Security and architecture questions can be reviewed early."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-[var(--color-line)] bg-white/70 px-4 py-4">
                <p className="text-sm font-semibold text-[var(--color-text)]">{title}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">{body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <SystemStackVisual />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Response speed", "Leads are routed and queued faster."],
              ["Cleaner pipeline", "Sales and ops work from the same context."],
              ["Better visibility", "Leadership sees what changed and why."],
            ].map(([title, body]) => (
              <SurfaceCard key={title} className="p-5">
                <p className="font-[var(--font-display)] text-lg font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                  {title}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">{body}</p>
              </SurfaceCard>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[34px] border border-[var(--color-line)] bg-white/62 px-6 py-6 shadow-[0_22px_55px_rgba(22,32,51,0.06)] sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-[var(--color-brand)]">Built for growing service businesses</p>
            <p className="mt-3 text-lg leading-8 text-[var(--color-text-soft)]">
              Replace disconnected tools with one platform that handles lead capture, CRM work, automations, AI support, and reporting.
            </p>
          </div>
          <div className="grid flex-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {["Founder-led agencies", "Consultancies", "B2B service businesses", "Revenue and ops leaders"].map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--color-line)] bg-white/78 px-4 py-4 text-sm font-medium text-[var(--color-text)]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionIntro
          eyebrow="The problem"
          title="Most growing businesses are held back by disconnected tools."
          body="When the website, CRM, automations, AI tools, and reporting all live in different places, the work slows down and the numbers get harder to trust."
          align="center"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {painCards.map((card) => (
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
          eyebrow="The solution"
          title="Everything connected in one platform."
          body="This is the part buyers need to understand quickly: Ingenium gives you website, CRM, automation, AI, and reporting in one connected platform."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-[1.08fr,0.92fr]">
          <SurfaceCard className="p-8">
            <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-[var(--color-brand)]">
              Platform pillars
            </p>
            <h3 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-[-0.04em] text-[var(--color-text)]">
              One place for the work that creates revenue and keeps delivery on track.
            </h3>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {solutionCards.map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className="rounded-2xl border border-[var(--color-line)] bg-white/74 p-5 transition hover:border-[rgba(18,121,255,0.22)] hover:shadow-[0_18px_40px_rgba(22,32,51,0.08)]"
                >
                  <p className="font-[var(--font-display)] text-xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                    {card.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{card.body}</p>
                </Link>
              ))}
            </div>
          </SurfaceCard>

          <div className="grid gap-4">
            <PortalPreview
              eyebrow="Platform snapshot"
              title="How Ingenium behaves when a lead turns into revenue work"
              rows={[
                { label: "Lead captured", value: "Website form with source and service context", state: "Live" },
                { label: "Ownership set", value: "Rep, SLA, and next step assigned", state: "Active" },
                { label: "AI assist ready", value: "Suggested response and account brief prepared", state: "Review" },
                { label: "Delivery connected", value: "Handoff remains visible after close", state: "Tracked" },
              ]}
            />
            <SurfaceCard dark className="p-6">
              <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-cyan-300">
                Why it matters
              </p>
              <div className="mt-4 grid gap-3">
                {[
                  "Less context switching across teams",
                  "Better follow-up discipline",
                  "Clearer handoffs from sales to delivery",
                  "Reporting that reflects the real workflow",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-sm text-white/78">
                    {item}
                  </div>
                ))}
              </div>
            </SurfaceCard>
          </div>
        </div>
      </section>

      <section>
        <SectionIntro
          eyebrow="How it works"
          title="From first click to fulfilment."
          body="Ingenium connects the full journey, so your team can move from lead capture to delivery without rebuilding the customer story at every step."
          align="center"
        />
        <div className="mt-10">
          <WorkflowStoryboard />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
        <SurfaceCard className="p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-[var(--color-brand)]">
            Outcomes
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-[-0.04em] text-[var(--color-text)]">
            What changes after switching.
          </h2>
          <div className="mt-8 grid gap-3">
            {outcomes.map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--color-line)] bg-white/72 px-4 py-4 text-sm font-medium text-[var(--color-text)]">
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>
        <div>
          <SectionIntro
            eyebrow="Comparison"
            title="Replace your fragmented stack."
            body="Most teams are paying for separate tools, then paying again in delay, admin, and messy handoffs. Ingenium replaces that sprawl with one connected platform."
          />
          <div className="mt-8">
            <ComparisonVisual />
          </div>
        </div>
      </section>

      <section>
        <SectionIntro
          eyebrow="Proof"
          title="Trust has to be visible."
          body="Use named examples, product screenshots, and rollout evidence to show that Ingenium solves real commercial problems."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-[0.95fr,1.05fr]">
          <SurfaceCard className="p-8">
            <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-[var(--color-brand)]">Implementation evidence</p>
            <h3 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-[-0.04em] text-[var(--color-text)]">
              Show buyers the kinds of workflow improvements Ingenium already delivers.
            </h3>
            <div className="mt-8 grid gap-3">
              {caseStudies.slice(0, 3).map((study) => (
                <div key={study.id} className="rounded-2xl border border-[var(--color-line)] bg-white/74 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-[var(--font-display)] text-lg font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                      {study.client}
                    </p>
                    <span className="tech-pill inline-flex rounded-full px-3 py-1 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-soft)]">
                      {study.industry}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{study.intervention}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-3xl border border-[var(--color-line)] bg-[rgba(18,121,255,0.06)] px-5 py-5">
              <p className="text-sm font-semibold text-[var(--color-text)]">Why this helps conversion</p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">
                Named examples reduce the risk that Ingenium feels like a concept. They show buyers the kind of rollout, clarity, and workflow improvement they can expect.
              </p>
            </div>
          </SurfaceCard>

          <PortalPreview
            eyebrow="Portal view"
            title="Revenue dashboard connected to sales and delivery"
            rows={[
              { label: "Lead response queue", value: "Urgent enquiries visible by owner and SLA", state: "Today" },
              { label: "Pipeline hygiene", value: "Missing next steps and stale records flagged", state: "Review" },
              { label: "Delivery continuity", value: "Won deals still carry scope and handoff notes", state: "Tracked" },
              { label: "Leadership summary", value: "Cleaner reporting across the whole workflow", state: "Ready" },
            ]}
          />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.04fr,0.96fr]">
        <SurfaceCard className="p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-[var(--color-brand)]">
            Implementation
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-[-0.04em] text-[var(--color-text)]">
            Implemented with you, not dumped on you.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-text-soft)]">
            Ingenium combines software with a practical rollout. We help teams clean up the stack, configure the platform, launch with confidence, and keep improving over time.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-5">
            {[
              ["1", "Audit current stack"],
              ["2", "Configure platform"],
              ["3", "Migrate and launch"],
              ["4", "Train team"],
              ["5", "Optimise over time"],
            ].map(([step, copy]) => (
              <div key={step} className="rounded-2xl border border-[var(--color-line)] bg-white/72 p-5">
                <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-[var(--color-brand)]">
                  Step {step}
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
          If your team is drowning in disconnected tools, start here.
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/72">
          Book a demo and see how Ingenium can unify your website, CRM, automation, and AI into one scalable operating system.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/contact?intent=book-demo"
            className="cta-lift inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--color-text)] shadow-[0_18px_40px_rgba(255,255,255,0.08)]"
          >
            Book Demo
          </Link>
          <Link
            href="/platform"
            className="cta-lift inline-flex items-center justify-center rounded-full border border-white/18 bg-white/10 px-5 py-3 text-sm font-semibold text-white"
          >
            See Platform
          </Link>
        </div>
      </section>
    </div>
  );
}
