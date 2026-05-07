import type { Metadata } from "next";

import { buildMetadata, pageSeo } from "@/lib/seo";

import PageReviewMeta from "../components/PageReviewMeta";
import ServiceFaqSection from "../components/ServiceFaqSection";
import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/ai-agents"]);

const aiQuestions = [
  {
    question: "How can AI agents help me?",
    answer:
      "AI agents are most useful when they assist repeatable work that already has clear inputs and clear review points. That usually means faster lead summaries, cleaner follow-up drafts, quicker research, and easier reporting rather than fully autonomous customer decisions.",
  },
  {
    question: "How does this help me?",
    answer:
      "The value is time and consistency. Good AI support reduces manual prep, helps the team respond faster, and keeps context attached to the workflow instead of asking staff to retype or reinterpret the same information every day.",
  },
  {
    question: "Do I need a CRM first?",
    answer:
      "Usually, yes. AI becomes more reliable when it is connected to structured business data. If there is no clear record of contacts, stages, ownership, or approvals, the AI layer will mostly sit on top of disorder rather than fixing it.",
  },
];

export default function AiAgentsPage() {
  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <section className="grid items-center gap-10 pt-4 lg:grid-cols-[0.96fr,1.04fr]">
        <div>
          <p className="type-page-kicker text-[var(--color-secondary)]">
            AI Workflows
          </p>
          <h1 className="mt-6 max-w-4xl type-page-title text-[var(--color-text)]">
            AI support that works with your data, not beside it.
          </h1>
          <p className="mt-6 max-w-[65ch] type-body-lead text-[var(--color-text-soft)]">
            Ingenium uses AI-enabled workflows to help with follow-up, summaries, recommendations, and reporting so
            your team moves faster while keeping the real business context in view.
          </p>
          <PageReviewMeta />
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "Book a Demo", href: "/demo" }} />
            <ButtonLink action={{ label: "Technical Review", href: "/technical-review" }} variant="secondary" />
          </div>
        </div>

        <SurfaceCard className="p-8">
          <p className="type-section-kicker text-[var(--color-secondary)]">
            AI-enabled workflows
          </p>
          <div className="mt-6 grid gap-3">
            {[
              "AI can draft next steps and prepare follow-up from the same CRM record.",
              "Campaign ideas and summaries start from your actual business data.",
              "Recommendations support the workflow instead of creating a parallel toolset.",
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
            What is an AI-enabled workflow?
          </h2>
          <p className="mt-4 max-w-[68ch] type-body-base text-[var(--color-text-soft)]">
            An AI-enabled workflow uses AI inside an existing business process, such as lead follow-up, account
            research, summaries, recommendations, and reporting. The useful part is the connection to CRM context,
            approvals, and human review rather than a standalone chatbot.
          </p>
        </SurfaceCard>
      </section>

      <section>
        <SectionIntro
          eyebrow="Why AI Matters"
          title="Useful AI starts with real context and clear boundaries."
          body="The goal is not generic automation. It is practical assistance that works with your website, CRM, and marketing data."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Prepare follow-up drafts and summaries.",
            "Spot opportunities, delays, and campaign improvements.",
            "Support marketing activation with clearer recommendations.",
            "Keep leadership reporting and next steps easier to review.",
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
          title="AI workflows work best when they assist repeatable decisions, not undefined work."
          body="They should have clear inputs, review points, and fallback paths before they are trusted with customer-facing actions."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {[
            [
              "Use it when",
              "The team repeats research, summaries, next-step drafting, routing, or reporting from known business data.",
            ],
            [
              "Avoid it when",
              "The workflow has no reliable source data, no approval owner, or would require unsupervised decisions.",
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
        title="The AI questions most businesses ask first."
        body="The useful conversation is not whether AI is impressive. It is whether it can save time without creating new risk, confusion, or oversight gaps."
        items={aiQuestions}
      />

      <section className="graphite-panel rounded-[18px] px-8 py-12 text-center md:px-12">
        <h2 className="mx-auto max-w-4xl type-section-title text-white">
          AI becomes more useful when it is connected to the same system your team already trusts.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink action={{ label: "Book a Demo", href: "/demo" }} className="bg-white text-[var(--color-text)]" />
          <ButtonLink action={{ label: "Contact Us", href: "/contact" }} variant="secondary" className="border-white/30 text-white" />
        </div>
      </section>
    </div>
  );
}
