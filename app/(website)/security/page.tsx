import type { Metadata } from "next";

import { buildMetadata, pageSeo } from "@/lib/seo";

import { PortalPreview } from "../components/siteVisuals";
import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/security"]);

export default function SecurityPage() {
  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <section className="grid items-center gap-10 pt-4 lg:grid-cols-[0.92fr,1.08fr]">
        <div>
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-brand)]">
            Trust Center
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl">
            Clear controls for technical buyers and procurement reviewers.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            Ingenium explains what is true: access is role-based, sensitive actions can require approval, workflow history is reviewable, and technical stakeholders have a dedicated path for architecture and control questions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "Technical Review", href: "/technical-review" }} />
            <ButtonLink action={{ label: "Book Demo", href: "/demo" }} variant="secondary" />
          </div>
        </div>
        <PortalPreview
          eyebrow="Control snapshot"
          title="Sensitive workflow steps stay inside visible review paths"
          rows={[
            { label: "Access model", value: "Users see only the areas they need", state: "Scoped" },
            { label: "Approval model", value: "Sensitive actions can pause for review", state: "Required" },
            { label: "Audit history", value: "Changes and outputs remain reviewable", state: "Tracked" },
          ]}
        />
      </section>

      <section>
        <SectionIntro
          eyebrow="What this page now covers"
          title="Enough truth for commercial, technical, and founder buyers to keep moving."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            "Access model",
            "Approval model",
            "Audit trail examples",
            "Data-handling boundaries",
            "Technical review support",
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
            eyebrow="Operating controls"
            title="Current public controls"
          />
          <div className="mt-8 grid gap-3">
            {[
              "Role-based access boundaries by workflow area.",
              "Approval gates for sensitive automation and AI-assisted actions.",
              "Reviewable workflow and decision history attached to the record.",
              "Rollback-aware rollout process during implementation.",
              "Security and architecture review available before rollout.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--color-line)] bg-white/72 px-4 py-4 text-sm text-[var(--color-text-soft)]">
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>
        <SurfaceCard dark className="p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-cyan-300">
            Buyer note
          </p>
          <div className="mt-8 grid gap-3">
            {[
              "No certification is implied here unless explicitly stated elsewhere.",
              "This page is meant to answer review questions early, not after procurement stalls.",
              "The dedicated technical review path is the right place for deeper architecture material.",
              "Public copy stays specific to controls that are actually part of the operating model.",
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
          The fastest buying path is usually the clearest review path.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink action={{ label: "Technical Review", href: "/technical-review" }} className="bg-white text-[var(--color-text)]" />
          <ButtonLink action={{ label: "Book Demo", href: "/demo" }} variant="secondary" className="border-white/18 bg-white/8 text-white" />
        </div>
      </section>
    </div>
  );
}
