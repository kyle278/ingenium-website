import type { Metadata } from "next";

import { buildMetadata, pageSeo } from "@/lib/seo";

import { PortalPreview } from "../components/siteVisuals";
import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/ai-agents"]);

export default function AiAgentsPage() {
  return (
    <div className="space-y-24 pb-8 md:space-y-32">
      <section className="grid items-center gap-10 pt-6 lg:grid-cols-[1fr,1fr]">
        <div>
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-brand)]">
            AI Agents
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl">
            AI agents your team can actually trust.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            Ingenium deploys AI inside governed workflows with visible approvals, task boundaries, audit history, and business outcomes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "Book Demo", href: "/contact?intent=book-demo" }} />
            <ButtonLink action={{ label: "See the Platform", href: "/platform" }} variant="secondary" />
          </div>
        </div>
        <PortalPreview
          eyebrow="Approval lifecycle"
          title="Agent work inside governed workflow"
          rows={[
            { label: "Marketing Ops", value: "Draft and QA campaign work", state: "Scoped" },
            { label: "Sales", value: "Prepare account briefs and next steps", state: "Visible" },
            { label: "RevOps", value: "Monitor hygiene, routing, and reporting", state: "Bounded" },
            { label: "Leadership", value: "Summaries, alerts, and visibility", state: "Reviewed" },
          ]}
        />
      </section>

      <section>
        <SectionIntro
          eyebrow="What AI should actually do"
          title="Assist the workflow. Do not float outside it."
          body="The productive use of AI is bounded execution attached to real ownership, review, and business context."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Draft and QA campaign work",
            "Prepare account briefs and next steps",
            "Monitor hygiene, routing, and reporting",
            "Summaries, alerts, and leadership visibility",
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
            eyebrow="Human in the loop"
            title="Approvals, task boundaries, and audit history are part of the product."
          />
          <div className="mt-8 grid gap-3">
            {[
              "Task scope is explicit before the agent runs.",
              "Approval states can be required before sensitive actions.",
              "Operators can see what the agent prepared and why.",
              "Execution history remains attached to the workflow record.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--color-line)] bg-white/72 px-4 py-4 text-sm text-[var(--color-text-soft)]">
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>
        <SurfaceCard dark className="p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-cyan-300">
            Outcomes
          </p>
          <div className="mt-8 grid gap-3">
            {[
              "Teams get faster preparation without giving up control.",
              "AI outputs stay anchored to real business records.",
              "Stakeholders can review how agent work enters the operating model.",
              "Leadership sees AI as governed execution, not sidecar tooling.",
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
          AI is only useful when the business can see where it fits, who approves it, and what it changed.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink action={{ label: "Book Demo", href: "/contact?intent=book-demo" }} className="bg-white text-[var(--color-text)]" />
          <ButtonLink action={{ label: "Technical Review", href: "/contact?intent=technical-review" }} variant="secondary" className="border-white/18 bg-white/8 text-white" />
        </div>
      </section>
    </div>
  );
}
