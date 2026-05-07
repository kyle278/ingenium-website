import type { Metadata } from "next";

import { buildMetadata, pageSeo } from "@/lib/seo";

import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/security"]);

export default function SecurityPage() {
  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <section className="pt-4">
        <div className="max-w-4xl">
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-brand)]">
            Security
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl">
            Technical buyers need visible controls, not implied maturity.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            Permissions, approvals, audit history, and operational governance are built into the operating model.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "Request a Technical Review", href: "/technical-review" }} />
            <ButtonLink action={{ label: "Book a Demo", href: "/demo" }} variant="secondary" />
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <SurfaceCard className="p-8">
          <SectionIntro
            eyebrow="Trust Messaging"
            title="Security and trust mean clear boundaries and accountable workflows."
          />
          <div className="mt-8 grid gap-3">
            {[
              "Role-based access controls who can act and who can approve sensitive work.",
              "Approval gates pause AI and automation when review is required.",
              "Audit history keeps actions traceable inside the workflow record.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--color-line)] bg-white/72 px-4 py-4 text-sm text-[var(--color-text-soft)]">
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard dark className="p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-cyan-300">
            Technical review path
          </p>
          <div className="mt-6 grid gap-3">
            {[
              "Permissions and approvals.",
              "Audit history and data boundaries.",
              "Deployment and recovery assumptions.",
              "Review materials for stakeholder conversations.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-sm text-white/78">
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>
      </section>

      <section>
        <SectionIntro
          eyebrow="Data Handling"
          title="Ingenium keeps sensitive workflow changes reviewable and bounded."
          body="The practical security model is built around least-needed access, visible approval points, and traceable changes inside the operating workflow."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            [
              "Access boundaries",
              "CRM, automation, and reporting work should expose only the records and actions a user needs for their role.",
            ],
            [
              "Human review",
              "AI-assisted drafts, campaign changes, and sensitive routing logic should pass through an accountable approval step.",
            ],
            [
              "Operational traceability",
              "Important changes need a clear record of what changed, who reviewed it, and which workflow was affected.",
            ],
          ].map(([title, body]) => (
            <SurfaceCard key={title} className="panel-hover p-6">
              <p className="font-[var(--font-display)] text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                {title}
              </p>
              <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">{body}</p>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section>
        <SectionIntro
          eyebrow="Trust Pages"
          title="Review the supporting policy and process pages."
          body="These pages make the public operating position easier to inspect before a technical review or project conversation."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            ["Data Handling", "/data-handling"],
            ["Privacy", "/privacy"],
            ["Security Review", "/security-review"],
            ["Support", "/support"],
            ["Methodology", "/implementation-methodology"],
          ].map(([label, href]) => (
            <ButtonLink key={href} action={{ label, href }} variant="secondary" />
          ))}
        </div>
      </section>

      <section className="graphite-panel rounded-[36px] px-8 py-12 text-center md:px-12">
        <h2 className="mx-auto max-w-4xl font-[var(--font-display)] text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
          The fastest buying path is usually the clearest review path.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink action={{ label: "Request a Technical Review", href: "/technical-review" }} className="bg-white text-[var(--color-text)]" />
          <ButtonLink action={{ label: "Book a Demo", href: "/demo" }} variant="secondary" className="border-white/18 bg-white/8 text-white" />
        </div>
      </section>
    </div>
  );
}
