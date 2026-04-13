import type { Metadata } from "next";

import { buildMetadata, pageSeo } from "@/lib/seo";

import { PortalPreview } from "../components/siteVisuals";
import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/ai-agents"]);

export default function AiAgentsPage() {
  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <section className="grid items-center gap-10 pt-4 lg:grid-cols-[0.94fr,1.06fr]">
        <div>
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-brand)]">
            AI Agents
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl">
            AI agents your team can actually trust.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            Ingenium uses AI inside real business workflows, so teams get useful support without losing control, visibility, or accountability.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "See AI in the Platform", href: "/platform" }} />
            <ButtonLink action={{ label: "Book Demo", href: "/contact?intent=book-demo" }} variant="secondary" />
          </div>
        </div>
        <PortalPreview
          eyebrow="AI workflow"
          title="AI helps where it saves time and still leaves the team in control"
          rows={[
            { label: "Sales prep", value: "Briefs and next-step suggestions generated", state: "Ready" },
            { label: "Ops support", value: "Routing and hygiene issues flagged", state: "Visible" },
            { label: "Leadership", value: "Summaries and alerts prepared", state: "Review" },
          ]}
        />
      </section>

      <section>
        <SectionIntro
          eyebrow="What AI should actually do"
          title="Use AI for useful work, not vague promises."
          body="The best AI use cases are practical: preparing work, surfacing risk, summarising information, and helping the team move faster."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Draft follow-up and account prep",
            "QA marketing and campaign work",
            "Monitor hygiene, routing, and reporting issues",
            "Create summaries and alerts for leadership",
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
            eyebrow="Control"
            title="The team should know what the AI did, where it fits, and what happens next."
          />
          <div className="mt-8 grid gap-3">
            {[
              "Each task has a clear scope before the agent runs.",
              "Sensitive actions can require approval.",
              "Operators can review what the AI prepared.",
              "Execution history stays attached to the record.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--color-line)] bg-white/72 px-4 py-4 text-sm text-[var(--color-text-soft)]">
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>
        <SurfaceCard dark className="p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-cyan-300">
            Business outcome
          </p>
          <div className="mt-8 grid gap-3">
            {[
              "Teams save time on prep work and routine analysis.",
              "AI output stays tied to the actual customer record.",
              "Leaders get more visibility without more manual reporting.",
              "The business gets leverage without creating a sidecar AI mess.",
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
          AI is valuable when it helps the workflow instead of sitting beside it.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink action={{ label: "Book Demo", href: "/contact?intent=book-demo" }} className="bg-white text-[var(--color-text)]" />
          <ButtonLink action={{ label: "Technical Review", href: "/contact?intent=technical-review" }} variant="secondary" className="border-white/18 bg-white/8 text-white" />
        </div>
      </section>
    </div>
  );
}
