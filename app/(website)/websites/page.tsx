import type { Metadata } from "next";

import { buildMetadata, pageSeo } from "@/lib/seo";

import PageReviewMeta from "../components/PageReviewMeta";
import ServiceFaqSection from "../components/ServiceFaqSection";
import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/websites"]);

const websiteQuestions = [
  {
    question: "How does this help me?",
    answer:
      "A better website helps by turning vague interest into clearer enquiries. It explains the offer faster, surfaces trust earlier, and captures enough context that your next step is not starting from scratch every time someone gets in touch.",
  },
  {
    question: "But my website looks fine, we updated it years ago!",
    answer:
      "Looking fine is not the same as doing the job well. If the site still makes visitors hunt for proof, hides the best service route, or sends weak enquiries into a generic inbox, it is probably costing you even if the design still feels acceptable.",
  },
  {
    question: "Do I need a CRM as well?",
    answer:
      "If your website is meant to win real business, the answer is often yes. The site should not stop at a contact form. It should pass lead source, service interest, and next-step context into a CRM so follow-up is faster and cleaner.",
  },
];

export default function WebsitesPage() {
  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <section className="grid items-center gap-10 pt-4 lg:grid-cols-[0.96fr,1.04fr]">
        <div>
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-secondary)]">
            Websites
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl">
            Websites that do more than launch.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            Ingenium builds high-performance websites designed to capture leads, support your brand, and feed your CRM
            and marketing system with better context from the first interaction.
          </p>
          <PageReviewMeta />
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "Book a Demo", href: "/demo" }} />
            <ButtonLink action={{ label: "See the Platform", href: "/platform" }} variant="secondary" />
          </div>
        </div>

        <SurfaceCard className="p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-[var(--color-secondary)]">
            What a connected website changes
          </p>
          <div className="mt-6 grid gap-3">
            {[
              "Landing pages, forms, and chat capture the right information without friction.",
              "Every lead reaches the CRM with source and service context attached.",
              "Campaigns and follow-up start from the same record instead of a separate handoff.",
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
            What is a CRM-connected website?
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-text-soft)]">
            A CRM-connected website captures visitor intent and sends the right context into the CRM immediately:
            source, service interest, contact details, and next-step signals. That makes follow-up faster and gives
            marketing, sales, and delivery the same starting point.
          </p>
        </SurfaceCard>
      </section>

      <section>
        <SectionIntro
          eyebrow="Website Focus"
          title="The site should explain the offer, show proof, and route the lead cleanly."
          body="The website is not a brochure. It is the front end of a connected growth system."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["Offer clarity", "State the business value quickly and make the next step obvious."],
            ["Proof", "Use outcomes, screenshots, and examples to build trust before the form."],
            ["Routing", "Capture enough detail so the CRM and marketing workflows can act immediately."],
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
          eyebrow="Fit Check"
          title="A connected website is strongest when lead context matters after the form."
          body="It is less useful when the site is only a static brochure and the business has no follow-up process for captured enquiries."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {[
            [
              "Use it when",
              "Forms, calls, campaign traffic, and service pages need to feed CRM records and follow-up workflows.",
            ],
            [
              "Avoid it when",
              "The immediate need is a temporary one-page presence with no reporting, routing, or campaign handoff.",
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

      <ServiceFaqSection
        title="What businesses usually ask before rebuilding a site."
        body="These are the questions behind most website conversations, especially when the existing site is still live but no longer helping the business move cleanly."
        items={websiteQuestions}
      />

      <section className="graphite-panel rounded-[18px] px-8 py-12 text-center md:px-12">
        <h2 className="mx-auto max-w-4xl font-[var(--font-display)] text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
          Build a website that works with the rest of your system from day one.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink action={{ label: "Book a Demo", href: "/demo" }} className="bg-white text-[var(--color-text)]" />
          <ButtonLink action={{ label: "Contact Us", href: "/contact" }} variant="secondary" className="border-white/30 text-white" />
        </div>
      </section>
    </div>
  );
}
