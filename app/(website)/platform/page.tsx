import type { Metadata } from "next";

import { buildMetadata, pageSeo } from "@/lib/seo";

import ScrollReveal from "../components/ScrollReveal";
import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/platform"]);

const workflowSteps = [
  ["01", "Lead captured", "A website form creates a real record with source and service context."],
  ["02", "Automatically routed", "The right owner, SLA, and lifecycle stage are set immediately."],
  ["03", "AI assists", "Ingenium prepares next steps, summaries, and draft outreach for review."],
  ["04", "Team executes", "Sales and ops work from the same record instead of bouncing between tools."],
  ["05", "Delivery tracked", "Handoff stays connected after the deal is won."],
  ["06", "Reports update", "Leadership sees cleaner pipeline, activity, and delivery signals."],
];

export default function PlatformPage() {
  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <section className="grid items-start gap-10 pt-4 lg:grid-cols-[0.96fr,1.04fr]">
        <ScrollReveal>
          <div>
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-brand)]">
            Platform
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl">
            One operating layer across acquisition, CRM execution, handoff, reporting, and AI support.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            Ingenium is most useful when the whole buyer and delivery path is connected instead of patched together.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "See the Platform", href: "/contact" }} />
            <ButtonLink action={{ label: "Book a Demo", href: "/demo" }} variant="secondary" />
          </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delayMs={80} direction="left" blur>
          <SurfaceCard className="p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-[var(--color-brand)]">
            Connection map
          </p>
          <div className="mt-6 grid gap-3">
            {[
              ["Website", "Landing pages, lead capture, forms, and chat."],
              ["CRM", "Contacts, pipelines, notes, routing, and lifecycle control."],
              ["Marketing", "Campaign builder, journeys, follow-up, and templates."],
              ["AI", "Recommendations, summaries, and operational assistance tied to your data."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-[var(--color-line)] bg-white/72 p-5">
                <p className="font-[var(--font-display)] text-xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                  {title}
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">{body}</p>
              </div>
            ))}
          </div>
          </SurfaceCard>
        </ScrollReveal>
      </section>

      <section>
        <ScrollReveal>
          <SurfaceCard className="p-6 md:p-8">
            <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-[var(--color-brand)]">
              Direct answer
            </p>
            <h2 className="mt-4 font-[var(--font-display)] text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
              What is the Ingenium platform?
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-text-soft)]">
              The Ingenium platform is an operating layer that connects website lead capture, CRM records, marketing
              automation, AI support, handoff workflows, and reporting. It is designed for teams that need fewer gaps
              between first enquiry, sales follow-up, delivery, and management visibility.
            </p>
          </SurfaceCard>
        </ScrollReveal>
      </section>

      <section>
        <ScrollReveal>
          <SectionIntro
            eyebrow="Workflow"
            title="One journey from first click to fulfilment."
            body="The platform is most useful when acquisition, sales, delivery, and reporting all read from the same operating story."
            align="center"
          />
        </ScrollReveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {workflowSteps.map(([index, title, body], stepIndex) => (
            <ScrollReveal key={index} delayMs={stepIndex * 45}>
              <SurfaceCard className="panel-hover p-6">
              <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-[var(--color-brand)]">
                {index}
              </p>
              <p className="mt-3 font-[var(--font-display)] text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                {title}
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{body}</p>
              </SurfaceCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ScrollReveal>
          <SurfaceCard className="p-8">
          <SectionIntro
            eyebrow="What This Replaces"
            title="The point is fewer gaps between teams, not more software to manage."
            body="Separate tools are usually hiding one operational problem. We replace patched-together workflows with one accountable operating model."
          />
          <div className="mt-8 grid gap-3">
            {[
              "A website that collects leads but does not help sales act.",
              "A CRM that looks populated but cannot be trusted.",
              "Automation glued together without a clear owner or audit trail.",
              "AI tools running beside the workflow instead of inside it.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--color-line)] bg-white/72 px-4 py-4 text-sm text-[var(--color-text-soft)]">
                {item}
              </div>
            ))}
          </div>
          </SurfaceCard>
        </ScrollReveal>

        <ScrollReveal delayMs={80} direction="left" blur>
          <SurfaceCard dark className="p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-cyan-300">
            Why AI matters
          </p>
          <div className="mt-6 grid gap-3">
            {[
              "AI works with your data, not in isolation.",
              "Follow-up and summaries start with real workflow context.",
              "Recommendations stay tied to approvals and review paths.",
              "Teams move faster without losing accountability.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-sm text-white/78">
                {item}
              </div>
            ))}
          </div>
          </SurfaceCard>
        </ScrollReveal>
      </section>

      <ScrollReveal className="graphite-panel rounded-[36px] px-8 py-12 text-center md:px-12" blur>
        <h2 className="mx-auto max-w-4xl font-[var(--font-display)] text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
          See the operating system that keeps every step connected.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink action={{ label: "Book a Demo", href: "/demo" }} className="bg-white text-[var(--color-text)]" />
          <ButtonLink action={{ label: "Revenue Systems Teardown", href: "/revenue-systems-teardown" }} variant="secondary" className="border-white/18 bg-white/8 text-white" />
        </div>
      </ScrollReveal>
    </div>
  );
}
