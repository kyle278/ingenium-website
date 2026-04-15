import type { Metadata } from "next";

import { buildMetadata, pageSeo } from "@/lib/seo";

import { PortalPreview } from "../components/siteVisuals";
import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/ai-agents"]);

export default function AiAgentsPage() {
  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <section className="grid items-center gap-10 pt-4 lg:grid-cols-[0.92fr,1.08fr]">
        <div>
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-brand)]">
            AI Support
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl">
            AI support with approval, control, and audit history.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            For service businesses that want practical AI without governance drift, Ingenium replaces sidecar tools with workflow-bound AI so teams get useful prep, monitoring, and summaries while keeping sensitive actions inside clear approval rules.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "Book Demo", href: "/demo" }} />
            <ButtonLink action={{ label: "Technical Review", href: "/technical-review" }} variant="secondary" />
          </div>
        </div>
        <PortalPreview
          eyebrow="Governed AI"
          title="Useful AI starts with bounded tasks and visible review"
          rows={[
            { label: "Scope", value: "AI prepares work inside approved task boundaries", state: "Defined" },
            { label: "Approval", value: "Sensitive actions pause for review when needed", state: "Required" },
            { label: "History", value: "Output and operator decisions stay attached to the record", state: "Tracked" },
          ]}
        />
      </section>

      <section>
        <SectionIntro
          eyebrow="Good use cases"
          title="Keep AI close to the workflow and far from vague promises."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Draft account prep and follow-up suggestions.",
            "Flag hygiene, routing, or reporting issues for review.",
            "Prepare summaries for sales, ops, and leadership.",
            "Support approvals without hiding what was generated.",
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
            eyebrow="Control layer"
            title="The AI page should feel like governance, not theatre."
          />
          <div className="mt-8 grid gap-3">
            {[
              "Each AI task has a clear scope before it runs.",
              "Approvals can be required by risk, stage, or stakeholder role.",
              "Operators can review output before anything customer-facing happens.",
              "The audit trail shows what the AI prepared and what the human approved.",
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
              "Teams save time on prep and routine analysis.",
              "Buyers see that AI is governed instead of bolted on.",
              "Technical reviewers get a cleaner story around controls.",
              "Leaders gain leverage without creating a second shadow workflow.",
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
          AI becomes commercially useful when it stays inside the same approval and audit model as the rest of the workflow.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink action={{ label: "Book Demo", href: "/demo" }} className="bg-white text-[var(--color-text)]" />
          <ButtonLink action={{ label: "Technical Review", href: "/technical-review" }} variant="secondary" className="border-white/18 bg-white/8 text-white" />
        </div>
      </section>
    </div>
  );
}
