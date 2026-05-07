import type { Metadata } from "next";

import { buildMetadata, pageSeo } from "@/lib/seo";

import PageReviewMeta from "../components/PageReviewMeta";
import ServiceFaqSection from "../components/ServiceFaqSection";
import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/automations"]);

const automationQuestions = [
  {
    question: "How does this help me?",
    answer:
      "Automation helps by removing delay after the enquiry arrives. It can route leads, trigger follow-up, update stages, and keep campaign activity moving without someone re-entering the same details by hand.",
  },
  {
    question: "Do I need a CRM first?",
    answer:
      "In most cases, yes. Automation is strongest when it runs from clean customer records, clear ownership, and defined pipeline stages. Without that, the business usually ends up automating confusion instead of removing it.",
  },
  {
    question: "Will this just create more software to manage?",
    answer:
      "It should do the opposite. The point is to reduce manual work and disconnected tools, not add another dashboard. Good automation makes the existing operating path easier to run and easier to review.",
  },
];

export default function AutomationsPage() {
  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <section className="grid items-center gap-10 pt-4 lg:grid-cols-[0.96fr,1.04fr]">
        <div>
          <p className="type-page-kicker text-[var(--color-secondary)]">
            Marketing Automation
          </p>
          <h1 className="mt-6 max-w-4xl type-page-title text-[var(--color-text)]">
            Automated campaigns built around your business data.
          </h1>
          <p className="mt-6 max-w-[65ch] type-body-lead text-[var(--color-text-soft)]">
            Ingenium connects email, SMS, nurture journeys, and follow-up flows to your CRM so campaigns launch from
            the same customer context instead of disconnected tools.
          </p>
          <PageReviewMeta />
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "Book a Demo", href: "/demo" }} />
            <ButtonLink action={{ label: "See the Platform", href: "/platform" }} variant="secondary" />
          </div>
        </div>

        <SurfaceCard className="p-8">
          <p className="type-section-kicker text-[var(--color-secondary)]">
            Marketing activation
          </p>
          <div className="mt-6 grid gap-3">
            {[
              "Lead capture from the website can trigger the right follow-up journey immediately.",
              "Campaigns run from live CRM data rather than exported lists and manual handoffs.",
              "Teams can see what launched, who entered, and what happened next in one system.",
            ].map((item) => (
              <div key={item} className="rounded-[18px] border border-[var(--color-line)] bg-white/80 px-4 py-4 type-body-sm text-[var(--color-text-soft)]">
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>
      </section>

      <section>
        <SurfaceCard className="p-6 md:p-8">
          <p className="type-section-kicker text-[var(--color-secondary)]">
            Direct answer
          </p>
          <h2 className="mt-4 type-card-title text-[var(--color-text)]">
            What does marketing automation do?
          </h2>
          <p className="mt-4 max-w-[68ch] type-body-base text-[var(--color-text-soft)]">
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
            <SurfaceCard key={item} className="panel-hover p-6 type-body-sm text-[var(--color-text-soft)]">
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
              <p className="type-card-title text-[var(--color-text)]">
                {title}
              </p>
              <p className="mt-4 type-body-sm text-[var(--color-text-soft)]">{body}</p>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <ServiceFaqSection
        title="The follow-up questions behind most automation projects."
        body="The point is not to launch more messages. It is to make sure the right message, alert, or task happens at the right time without manual chasing."
        items={automationQuestions}
      />

      <section className="graphite-panel rounded-[18px] px-8 py-12 text-center md:px-12">
        <h2 className="mx-auto max-w-4xl type-section-title text-white">
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
