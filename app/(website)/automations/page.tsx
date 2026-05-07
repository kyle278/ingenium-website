import type { Metadata } from "next";

import { buildMetadata, pageSeo } from "@/lib/seo";

import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/automations"]);

export default function AutomationsPage() {
  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <section className="grid items-center gap-10 pt-4 lg:grid-cols-[0.96fr,1.04fr]">
        <div>
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-secondary)]">
            Marketing Automation
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl">
            Automated campaigns built around your business data.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            Ingenium connects email, SMS, nurture journeys, and follow-up flows to your CRM so campaigns launch from
            the same customer context instead of disconnected tools.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "Book a Demo", href: "/demo" }} />
            <ButtonLink action={{ label: "See the Platform", href: "/platform" }} variant="secondary" />
          </div>
        </div>

        <SurfaceCard className="p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-[var(--color-secondary)]">
            Marketing activation
          </p>
          <div className="mt-6 grid gap-3">
            {[
              "Lead capture from the website can trigger the right follow-up journey immediately.",
              "Campaigns run from live CRM data rather than exported lists and manual handoffs.",
              "Teams can see what launched, who entered, and what happened next in one system.",
            ].map((item) => (
              <div key={item} className="rounded-[18px] border border-[var(--color-line)] bg-white/80 px-4 py-4 text-sm text-[var(--color-text-soft)]">
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>
      </section>

      <section>
        <SurfaceCard className="p-6 md:p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-[var(--color-secondary)]">
            Direct answer
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
            What does marketing automation do?
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-text-soft)]">
            Marketing automation turns CRM and website signals into follow-up actions: email, SMS, nurture journeys,
            alerts, routing, and campaign reporting. Ingenium connects those actions to live customer context so the
            team does not rely on exports or manual handoffs.
          </p>
        </SurfaceCard>
      </section>

      <section>
        <SectionIntro
          eyebrow="Automation Value"
          title="Automation should remove delay, not add another layer to manage."
          body="The point is faster follow-up, cleaner journeys, and more reliable campaign execution."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Email and SMS journeys connected to CRM stages.",
            "Automated follow-up without manual re-entry.",
            "Lead routing and prioritization for faster response.",
            "Campaign reporting tied back to the same contact history.",
          ].map((item) => (
            <SurfaceCard key={item} className="panel-hover p-6 text-sm leading-7 text-[var(--color-text-soft)]">
              {item}
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section>
        <SectionIntro
          eyebrow="Fit Check"
          title="Marketing automation is useful when triggers, consent, and ownership are clear."
          body="It is usually risky when lists are messy, customer permissions are unclear, or nobody owns journey review."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {[
            [
              "Use it when",
              "CRM stages, website forms, lead scores, and campaign events can trigger specific next actions.",
            ],
            [
              "Avoid it when",
              "The team cannot define consent, suppression rules, journey exits, or responsibility for failed sends.",
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

      <section className="graphite-panel rounded-[18px] px-8 py-12 text-center md:px-12">
        <h2 className="mx-auto max-w-4xl font-[var(--font-display)] text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
          Launch campaigns from connected data instead of disconnected handoffs.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink action={{ label: "Book a Demo", href: "/demo" }} className="bg-white text-[var(--color-text)]" />
          <ButtonLink action={{ label: "Contact Us", href: "/contact" }} variant="secondary" className="border-white/30 text-white" />
        </div>
      </section>
    </div>
  );
}
