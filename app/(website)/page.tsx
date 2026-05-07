import type { Metadata } from "next";
import Link from "next/link";

import { HeroLanding } from "@/components/ui/hero-1";
import { buildMetadata, pageSeo } from "@/lib/seo";
import { caseStudies } from "@/src/lib/caseStudies";
import { getCanonicalProofPathForCaseStudy } from "@/src/lib/proofStories";

import PageReviewMeta from "./components/PageReviewMeta";
import ScrollReveal from "./components/ScrollReveal";
import { ButtonLink, SectionIntro, SurfaceCard } from "./components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/"]);

const benefits = [
  {
    title: "Connected data",
    body: "Every form, chat, and campaign updates your CRM in real time so leads stay in sync.",
  },
  {
    title: "AI-assisted workflows",
    body: "Smart agents act on your business data to automate follow-up and campaign actions.",
  },
  {
    title: "Built for growth",
    body: "Fast launches, easy campaigns, and clear measurement designed for startups and SMEs.",
  },
];

const steps = [
  ["01", "Capture leads", "Smart landing pages, forms, and chat tools gather the right prospects without friction."],
  ["02", "Store everything", "Every interaction flows into your custom CRM so your team stays aligned and informed."],
  ["03", "Activate marketing", "Automated campaigns launch from the same data, without manual handoffs or missing steps."],
  ["04", "Let AI help", "AI agents suggest follow-up, optimize campaigns, and keep growth moving forward."],
];

const capabilities = [
  "CRM-connected websites",
  "Automated campaigns",
  "Lead intelligence",
  "AI recommendations",
  "Custom reporting",
  "Ongoing optimization",
];

const audiences = [
  {
    title: "Startups",
    body: "Launch faster with a connected digital platform that supports growth from day one.",
  },
  {
    title: "SMEs",
    body: "Replace fragmented tools with a system that keeps your marketing and sales coordinated.",
  },
  {
    title: "Marketing teams",
    body: "Keep campaigns, funnels, and data in sync with one partner and one operating model.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <ScrollReveal offsetPx={22}>
        <>
          <HeroLanding
            showHeader={false}
            surface="seamless"
            className="relative left-1/2 right-1/2 -mt-10 min-h-[calc(100vh-7rem)] w-screen -translate-x-1/2 px-4 sm:-mt-12 sm:px-6 md:-mt-16 lg:px-8"
            title="Next-gen websites that connect your CRM, marketing and AI without the complexity."
            description="Ingenium Consulting builds websites that do more than launch. They become the center of your growth engine, connecting lead capture, CRM, campaigns, and AI support from day one."
            announcementBanner={{
              text: "Connected websites. Intelligent growth.",
              linkText: "See the implementation approach",
              linkHref: "/implementation",
            }}
            callToActions={[
              { text: "Book a Demo", href: "/demo", variant: "primary" },
              { text: "See How It Works", href: "/platform", variant: "secondary" },
            ]}
            gradientColors={{
              from: "rgba(23, 103, 195, 0.34)",
              to: "rgba(19, 183, 168, 0.34)",
            }}
          />
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1280px]">
              <PageReviewMeta />
            </div>
          </div>
        </>
      </ScrollReveal>

      <section id="why-ingenium">
        <ScrollReveal>
          <SectionIntro
            eyebrow="Why Ingenium"
            title="Website, CRM, marketing, and AI all working together."
            body="Your website should not be a separate tool. We connect your site, CRM, and marketing so every lead becomes part of a single growth system."
          />
        </ScrollReveal>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {benefits.map((item, index) => (
            <ScrollReveal key={item.title} delayMs={index * 55} blur>
              <SurfaceCard className="panel-hover p-6">
              <h3 className="font-[var(--font-display)] text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">{item.body}</p>
              </SurfaceCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section id="how-it-works">
        <ScrollReveal>
          <SectionIntro
            eyebrow="How It Works"
            title="A connected system makes every step faster and easier."
            body="Website, CRM, marketing, and AI all working together instead of pushing work between disconnected tools."
            align="center"
          />
        </ScrollReveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {steps.map(([index, title, body], stepIndex) => (
            <ScrollReveal key={index} delayMs={stepIndex * 45}>
              <SurfaceCard className="panel-hover p-6">
              <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-[var(--color-brand)]">
                Step {index}
              </p>
              <p className="mt-3 font-[var(--font-display)] text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                {title}
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{body}</p>
              </SurfaceCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.04fr,0.96fr]">
        <ScrollReveal>
          <SurfaceCard className="p-8">
          <SectionIntro
            eyebrow="Core Capabilities"
            title="The platform is built around connection, automation, and clarity."
            body="Everything is designed to keep your team working from the same information and the same momentum."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {capabilities.map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--color-line)] bg-white/72 px-4 py-4 text-sm text-[var(--color-text-soft)]">
                {item}
              </div>
            ))}
          </div>
          </SurfaceCard>
        </ScrollReveal>

        <ScrollReveal delayMs={80} direction="left">
          <SurfaceCard dark className="p-8">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-cyan-300">
            Built for startups and SMEs
          </p>
          <div className="mt-6 grid gap-3">
            {audiences.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4">
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-white/78">{item.body}</p>
              </div>
            ))}
          </div>
          </SurfaceCard>
        </ScrollReveal>
      </section>

      <section id="proof">
        <ScrollReveal>
          <SectionIntro
            eyebrow="Proof"
            title="Results that feel simple"
            body="Three proof blocks before the buyer has to trust the concept: operational depth, visible workflow change, and cleaner outcomes."
          />
        </ScrollReveal>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {caseStudies.slice(0, 3).map((study, index) => (
            <ScrollReveal key={study.id} delayMs={index * 55}>
              <Link href={getCanonicalProofPathForCaseStudy(study.id) ?? "/projects"} className="group block rounded-[28px]">
                <SurfaceCard className="panel-hover h-full p-6">
                <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-[var(--color-brand)]">
                  {study.client}
                </p>
                <h3 className="mt-4 font-[var(--font-display)] text-2xl font-semibold tracking-[-0.04em] text-[var(--color-text)]">
                  {study.projectName}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{study.intervention}</p>
                <p className="mt-4 text-sm font-medium text-[var(--color-brand)]">View project record</p>
                </SurfaceCard>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <ScrollReveal className="graphite-panel rounded-[36px] px-8 py-12 md:px-12" blur>
        <div className="grid gap-8 lg:grid-cols-[0.9fr,1.1fr] lg:items-center">
          <div>
            <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-cyan-300">
              Final CTA
            </p>
            <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
              Ready to build a smarter website system?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/72">
              Talk to an expert and see how your website can work with your CRM and marketing to drive growth.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <ButtonLink action={{ label: "Book a Demo", href: "/demo" }} className="bg-white text-[var(--color-text)]" />
            <ButtonLink action={{ label: "Contact Us", href: "/contact" }} variant="secondary" className="border-white/18 bg-white/8 text-white" />
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
