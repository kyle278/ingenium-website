import type { Metadata } from "next";

import {
  ORGANIZATION_ADDRESS,
  ORGANIZATION_PHONE,
  ORGANIZATION_SAME_AS,
  buildMetadata,
  pageSeo,
} from "@/lib/seo";

import PageReviewMeta from "../components/PageReviewMeta";
import ScrollReveal from "../components/ScrollReveal";
import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";

export const metadata: Metadata = buildMetadata(pageSeo["/about"]);

export default function AboutPage() {
  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <section className="grid items-start gap-10 pt-4 lg:grid-cols-[1fr,0.95fr]">
        <ScrollReveal>
          <div>
          <p className="type-page-kicker text-[var(--color-brand)]">
            About Ingenium
          </p>
          <h1 className="mt-6 max-w-4xl type-page-title text-[var(--color-text)]">
            We help startups and SMEs grow with intelligent digital systems.
          </h1>
          <p className="mt-6 max-w-[65ch] type-body-lead text-[var(--color-text-soft)]">
            Ingenium Consulting combines website design, CRM strategy, marketing automation, and AI execution so
            growing teams can run on one connected system instead of a patchwork of tools.
          </p>
          <PageReviewMeta />
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink action={{ label: "Talk to Our Team", href: "/contact" }} />
            <ButtonLink action={{ label: "Start a Project", href: "/demo" }} variant="secondary" />
          </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delayMs={80} direction="left">
          <SurfaceCard className="p-8">
          <p className="type-section-kicker text-[var(--color-brand)]">
            Core values
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {["Friendly", "Helpful", "Professional", "Connected", "Empowering"].map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--color-line)] bg-white/72 px-4 py-4 type-body-sm text-[var(--color-text-soft)]">
                {item}
              </div>
            ))}
          </div>
          </SurfaceCard>
        </ScrollReveal>
      </section>

      <section>
        <ScrollReveal>
          <SurfaceCard className="p-6 md:p-8">
            <p className="type-section-kicker text-[var(--color-brand)]">
              Source identity
            </p>
          <h2 className="mt-4 type-card-title text-[var(--color-text)]">
            Ingenium Digital Consulting is the company behind this website.
          </h2>
          <p className="mt-4 max-w-[68ch] type-body-base text-[var(--color-text-soft)]">
            Ingenium Consulting is the public brand for Ingenium Digital Consulting. The team builds connected
            websites, CRM systems, marketing automation, and AI-enabled workflows for startups, SMEs, and service
            businesses that need clearer operational follow-through.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--color-line)] bg-white/72 px-4 py-4 type-body-sm text-[var(--color-text-soft)]">
              Address: {ORGANIZATION_ADDRESS.streetAddress}, {ORGANIZATION_ADDRESS.addressLocality},{" "}
              {ORGANIZATION_ADDRESS.postalCode}, Ireland
            </div>
            <div className="rounded-2xl border border-[var(--color-line)] bg-white/72 px-4 py-4 type-body-sm text-[var(--color-text-soft)]">
              Phone: {ORGANIZATION_PHONE}
            </div>
            <a
              href={ORGANIZATION_SAME_AS[0]}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-[var(--color-line)] bg-white/72 px-4 py-4 type-body-sm text-[var(--color-text-soft)] transition hover:text-[var(--color-text)]"
            >
              Google Business Profile
            </a>
            <a
              href={ORGANIZATION_SAME_AS[1]}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-[var(--color-line)] bg-white/72 px-4 py-4 type-body-sm text-[var(--color-text-soft)] transition hover:text-[var(--color-text)]"
            >
              Company LinkedIn
            </a>
          </div>
        </SurfaceCard>
      </ScrollReveal>
    </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ScrollReveal>
          <SurfaceCard className="p-8">
          <SectionIntro eyebrow="Our Mission" title="Build digital systems that make growth easier to run." />
          <p className="mt-6 type-body-base text-[var(--color-text-soft)]">
            We make powerful digital systems feel friendly, useful, and easy to own. That means the site, CRM,
            campaigns, and AI support all move from the same business context.
          </p>
          </SurfaceCard>
        </ScrollReveal>

        <ScrollReveal delayMs={80} direction="left" blur>
          <SurfaceCard dark className="p-8">
          <p className="type-section-kicker text-cyan-300">
            Why Ingenium
          </p>
          <div className="mt-6 grid gap-3">
            {[
              "Custom systems, not one-size-fits-all templates.",
              "Integrated tools, not disconnected apps.",
              "Friendly support, professional delivery.",
              "Built for startups and small teams that need clarity.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 type-body-sm text-white/78">
                {item}
              </div>
            ))}
          </div>
          </SurfaceCard>
        </ScrollReveal>
      </section>

      <section>
        <ScrollReveal>
          <SectionIntro
            eyebrow="Our Approach"
            title="A practical model that connects strategy, build, and improvement."
            align="center"
          />
        </ScrollReveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["Design with purpose", "Every website is built for conversion, clarity, and connection."],
            ["Build the system", "We link your site, CRM, and marketing so data moves without friction."],
            ["Keep improving", "Automation and AI are tuned over time to help your business grow."],
          ].map(([title, body], index) => (
            <ScrollReveal key={title} delayMs={index * 45}>
              <SurfaceCard className="panel-hover p-6">
              <p className="type-card-title text-[var(--color-text)]">
                {title}
              </p>
              <p className="mt-4 type-body-sm text-[var(--color-text-soft)]">{body}</p>
              </SurfaceCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <ScrollReveal className="graphite-panel rounded-[36px] px-8 py-12 text-center md:px-12" blur>
        <h2 className="mx-auto max-w-4xl type-section-title text-white">
          Talk to a team that makes technical growth easier to understand and easier to run.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink action={{ label: "Talk to Us", href: "/contact" }} className="bg-white text-[var(--color-text)]" />
          <ButtonLink action={{ label: "View Projects", href: "/projects" }} variant="secondary" className="border-white/18 bg-white/8 text-white" />
        </div>
      </ScrollReveal>
    </div>
  );
}
