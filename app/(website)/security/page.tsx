import type { Metadata } from "next";

import { buildMetadata, pageSeo } from "@/lib/seo";

import { PortalPreview } from "../components/siteVisuals";
import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/security"]);

export default function SecurityPage() {
  return (
    <div className="space-y-24 pb-8 md:space-y-32">
      <section className="grid items-center gap-10 pt-6 lg:grid-cols-[1fr,1fr]">
        <div>
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-brand)]">
            Security
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl">
            Trust is built into the operating model.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            Ingenium is designed for teams that need speed and control at the same time, with clear governance, auditability, and review support.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "Book Demo", href: "/contact?intent=book-demo" }} />
            <ButtonLink action={{ label: "Technical Review", href: "/contact?intent=technical-review" }} variant="secondary" />
          </div>
        </div>
        <PortalPreview
          eyebrow="Governance snapshot"
          title="Sensitive action review in the same system"
          rows={[
            { label: "Role-based access", value: "Operators see only approved surfaces", state: "Scoped" },
            { label: "Approval path", value: "Sensitive automations paused for review", state: "Required" },
            { label: "Audit history", value: "Execution timeline preserved", state: "Ready" },
          ]}
        />
      </section>

      <section>
        <SectionIntro
          eyebrow="Security architecture"
          title="Controls that technical stakeholders can actually review."
          body="Governance matters most when AI, automation, and delivery operations are all attached to the same system."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            "Role-based access",
            "Approval paths for sensitive actions",
            "Audit trails and execution history",
            "Secure data handling boundaries",
            "Review materials for technical stakeholders",
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
            eyebrow="AI governance"
            title="AI should run inside approval, task, and audit boundaries."
          />
          <div className="mt-8 grid gap-3">
            {[
              "Agents operate inside defined task boundaries.",
              "Approval gates can be required before external or sensitive actions.",
              "Execution records remain attached to the commercial record.",
              "Leadership can review where AI is active and where it is not.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--color-line)] bg-white/72 px-4 py-4 text-sm text-[var(--color-text-soft)]">
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>
        <SurfaceCard dark className="p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-cyan-300">
            Procurement support
          </p>
          <div className="mt-8 grid gap-3">
            {[
              "Security overview for stakeholder review",
              "Architecture walkthrough for technical buyers",
              "Approval and audit examples from live workflows",
              "Data handling and environment boundary explanation",
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
          The fastest buying path is usually the clearest technical review path.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink action={{ label: "Technical Review", href: "/contact?intent=technical-review" }} className="bg-white text-[var(--color-text)]" />
          <ButtonLink action={{ label: "Book Demo", href: "/contact?intent=book-demo" }} variant="secondary" className="border-white/18 bg-white/8 text-white" />
        </div>
      </section>
    </div>
  );
}
