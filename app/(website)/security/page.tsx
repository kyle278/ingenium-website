import type { Metadata } from "next";

import { buildMetadata, pageSeo } from "@/lib/seo";

import { PortalPreview } from "../components/siteVisuals";
import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/security"]);

export default function SecurityPage() {
  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <section className="grid items-center gap-10 pt-4 lg:grid-cols-[0.94fr,1.06fr]">
        <div>
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-brand)]">
            Security
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl">
            Built for teams that need speed and control.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            Ingenium is designed to help teams move quickly while keeping approvals, visibility, and review paths clear for technical stakeholders.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "Technical Review", href: "/contact?intent=technical-review" }} />
            <ButtonLink action={{ label: "Book Demo", href: "/contact?intent=book-demo" }} variant="secondary" />
          </div>
        </div>
        <PortalPreview
          eyebrow="Security snapshot"
          title="Sensitive actions stay inside the same review path"
          rows={[
            { label: "Access", value: "Teams see only the areas they should use", state: "Scoped" },
            { label: "Approvals", value: "Sensitive automations can pause for review", state: "Required" },
            { label: "History", value: "Changes and actions remain visible", state: "Tracked" },
          ]}
        />
      </section>

      <section>
        <SectionIntro
          eyebrow="What technical buyers need"
          title="A clear review path matters more than vague security language."
          body="Buyers want to know who can do what, where approvals happen, and how changes can be reviewed later."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            "Role-based access",
            "Approval paths for sensitive actions",
            "Execution history",
            "Clear data-handling boundaries",
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
            eyebrow="AI and workflow controls"
            title="AI and automation should run inside clear boundaries."
          />
          <div className="mt-8 grid gap-3">
            {[
              "Tasks can be scoped before AI runs.",
              "Approvals can be required before sensitive actions.",
              "Execution stays attached to the same business record.",
              "Leaders can review where automation and AI are active.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--color-line)] bg-white/72 px-4 py-4 text-sm text-[var(--color-text-soft)]">
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>
        <SurfaceCard dark className="p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-cyan-300">
            Review support
          </p>
          <div className="mt-8 grid gap-3">
            {[
              "Security overview for stakeholder review",
              "Architecture walkthrough for technical buyers",
              "Examples of approval and audit paths",
              "Clear explanation of how the Portal fits into the system",
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
