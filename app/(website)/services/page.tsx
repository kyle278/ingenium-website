import type { Metadata } from "next";

import { buildMetadata, pageSeo } from "@/lib/seo";

import PageReviewMeta from "../components/PageReviewMeta";
import ServiceFaqSection from "../components/ServiceFaqSection";
import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/services"]);

const services = [
  {
    title: "Custom website development",
    body: "High-performance websites designed to capture leads, support your brand, and feed your growth system.",
  },
  {
    title: "CRM setup, integrations, and migrations",
    body: "A CRM operating model tailored to your workflows, ownership rules, migration needs, and handoff continuity.",
  },
  {
    title: "Marketing automation",
    body: "Launch email, SMS, and nurture journeys from your data without manual handoffs.",
  },
  {
    title: "AI-enabled workflows",
    body: "AI assistants help draft next steps, prepare outreach, and keep follow-up moving through approvals.",
  },
];

const serviceQuestions = [
  {
    question: "How does this help me?",
    answer:
      "The practical value is cleaner lead handling and less guesswork. A stronger website explains the offer better, a CRM keeps ownership clear, and connected follow-up means new enquiries do not disappear between inboxes, spreadsheets, and call-backs.",
  },
  {
    question: "Do I need a CRM?",
    answer:
      "Not every business needs a heavy CRM, but most growing service businesses need one shared record of who enquired, what they wanted, who owns the next step, and what happened after the sale. If that context is currently split across email threads and memory, CRM work usually pays off quickly.",
  },
  {
    question: "But my website looks fine, we updated it years ago!",
    answer:
      "A site can still look acceptable and underperform commercially. The real question is whether it explains the offer fast enough, routes visitors into the right next step, and passes useful lead context into sales or delivery without extra admin.",
  },
  {
    question: "How can AI agents help me?",
    answer:
      "AI is most useful after the website and CRM foundations are in place. It can help with lead summaries, follow-up drafting, campaign recommendations, and reporting support, but only when it is connected to real business data and clear approval rules.",
  },
];

export default function ServicesPage() {
  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <section className="pt-4">
        <div className="max-w-4xl">
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-brand)]">
            Services
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl">
            Services for connected growth.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            We build websites and CRM systems first, then connect automation and AI where they make follow-up, reporting, and delivery cleaner.
          </p>
          <PageReviewMeta />
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "Start a Discovery Call", href: "/contact" }} />
            <ButtonLink action={{ label: "Book a Demo", href: "/demo" }} variant="secondary" />
          </div>
        </div>
      </section>

      <section>
        <SurfaceCard className="p-6 md:p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-[var(--color-brand)]">
            Direct answer
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
            What does Ingenium do?
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-text-soft)]">
            Ingenium builds connected digital systems for growing businesses: a website that captures intent, a CRM
            that stores and routes the lead, automation that moves follow-up forward, and AI-enabled workflows that
            support the team with summaries, recommendations, and reporting context.
          </p>
        </SurfaceCard>
      </section>

      <section>
        <SectionIntro
          eyebrow="What We Build"
          title="Each service is designed to work as part of the same operating model."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <SurfaceCard key={service.title} className="panel-hover p-6">
              <h2 className="font-[var(--font-display)] text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                {service.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">{service.body}</p>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <SurfaceCard className="p-8">
          <SectionIntro
            eyebrow="Our Process"
            title="A clear, practical implementation process."
            body="The goal is not to add complexity. It is to give your team a system it can actually use."
          />
          <div className="mt-8 grid gap-3">
            {[
              "Discovery: understand your business, audience, and growth goals.",
              "Build: design and develop your connected website, CRM workspace, and campaign flow.",
              "Connect: link your website, CRM, and marketing tools so data moves without friction.",
              "Optimize: review performance, refine automation, and improve conversion over time.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--color-line)] bg-white/72 px-4 py-4 text-sm text-[var(--color-text-soft)]">
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard dark className="p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-cyan-300">
            Why this matters
          </p>
          <div className="mt-6 grid gap-3">
            {[
              "No more data silos.",
              "Faster lead response with automation.",
              "A single source of truth for growth activity.",
              "Smarter decisions powered by AI and insights.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-sm text-white/78">
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>
      </section>

      <ServiceFaqSection
        title="Questions buyers usually ask before they commit."
        body="This is the commercial side of the decision: whether the website, CRM, and follow-up path are strong enough to support the next stage of growth."
        items={serviceQuestions}
      />

      <section className="graphite-panel rounded-[36px] px-8 py-12 text-center md:px-12">
        <h2 className="mx-auto max-w-4xl font-[var(--font-display)] text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
          Book a discovery call and scope the right connected system.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink action={{ label: "Book a Discovery Call", href: "/contact" }} className="bg-white text-[var(--color-text)]" />
          <ButtonLink action={{ label: "Get a Tailored Scope", href: "/demo" }} variant="secondary" className="border-white/18 bg-white/8 text-white" />
        </div>
      </section>
    </div>
  );
}
