import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, Globe, ShieldCheck, Users } from "lucide-react";

import { PAGE_KEYS, SECTION_KEYS } from "@/src/lib/content-map";
import { loadPortalPageContent } from "@/src/lib/portal-page-content";

export const dynamic = "force-dynamic";

const primaryButton =
  "inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(5,150,105,0.3)] transition hover:bg-emerald-700";
const secondaryButton =
  "inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50";
const sectionLabel = "text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700";
const card =
  "rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]";
const softCard =
  "rounded-3xl border border-white/60 bg-white/60 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)]";

const fallbackHero = {
  label: "About Ingenium",
  title: "We build enterprise websites that drive measurable growth.",
  body:
    "Ingenium Digital Consulting partners with enterprise teams to design conversion-first websites and the AI-powered systems behind them. We deliver strategy, build, and ongoing optimization in one accountable engagement.",
  primary_cta: { label: "Book a Strategy Call", href: "/contact" },
  secondary_cta: { label: "View Case Studies", href: "/case-studies" },
  card: {
    label: "What we deliver",
    items: [
      "Website strategy, design, and build",
      "AI agent departments with approvals",
      "CRM and automation integration",
      "Analytics and experimentation systems",
    ],
    note: "End-to-end delivery: strategy, build, and ongoing optimization.",
  },
};

const fallbackWork = {
  label: "How we work",
  title: "A single accountable team for the full system.",
  body: "We act as the operating team for your website, CRM, AI agents, and automation stack.",
  values: [
    "Outcome-first delivery",
    "Enterprise-grade governance",
    "Clarity over complexity",
    "Long-term partnership",
  ],
  leadership: {
    label: "Leadership partnership",
    title: "Built with executive alignment.",
    body: "We align marketing, RevOps, and IT stakeholders early to keep execution fast and predictable.",
    items: [
      "Stakeholder workshops and KPI alignment",
      "Clear milestone planning",
      "Ongoing optimization and reporting",
    ],
  },
  enterprise: {
    label: "Enterprise-ready",
    title: "Governance and security aligned.",
    body: "Documentation, audit trails, and approval workflows are part of every engagement.",
    link: { label: "View security details", href: "/security" },
  },
};

const fallbackGlobal = {
  label: "Global reach",
  title: "Global delivery, enterprise focus.",
  body:
    "We operate across the US and EU, supporting global teams with security and governance baked in.",
  bullet: "US and EU delivery teams",
  card: {
    label: "Enterprise partnership",
    items: [
      "Multi-region delivery support",
      "Security review ready documentation",
      "Dedicated lifecycle optimization",
    ],
  },
};

const fallbackCta = {
  title: "Ready to build a conversion-first website system?",
  body: "Book a strategy call to align stakeholders and map your rollout.",
  primary_cta: { label: "Book a Strategy Call", href: "/contact" },
  secondary_cta: { label: "Explore the Website Offer", href: "/websites" },
};

export default async function AboutPage() {
  const { sectionJson, sectionAttrs } = await loadPortalPageContent(PAGE_KEYS.ABOUT);
  const hero = sectionJson(SECTION_KEYS.ABOUT.HERO, fallbackHero);
  const work = sectionJson(SECTION_KEYS.ABOUT.WORK, fallbackWork);
  const globalSection = sectionJson(SECTION_KEYS.ABOUT.GLOBAL, fallbackGlobal);
  const cta = sectionJson(SECTION_KEYS.ABOUT.CTA, fallbackCta);

  return (
    <div className="space-y-24 md:space-y-32">
      <section className="grid items-center gap-12 lg:grid-cols-[1.05fr,0.95fr]">
        <div>
          <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.ABOUT.HERO)}>
            {hero.label}
          </p>
          <h1
            className="mt-6 max-w-2xl font-[var(--font-display)] text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
            {...sectionAttrs(SECTION_KEYS.ABOUT.HERO)}
          >
            {hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600" {...sectionAttrs(SECTION_KEYS.ABOUT.HERO)}>
            {hero.body}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={hero.primary_cta?.href ?? "/contact"} className={primaryButton} {...sectionAttrs(SECTION_KEYS.ABOUT.HERO)}>
              {hero.primary_cta?.label ?? "Book a Strategy Call"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={hero.secondary_cta?.href ?? "/case-studies"}
              className={secondaryButton}
              {...sectionAttrs(SECTION_KEYS.ABOUT.HERO)}
            >
              {hero.secondary_cta?.label ?? "View Case Studies"}
            </Link>
          </div>
        </div>
        <div className={card}>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400" {...sectionAttrs(SECTION_KEYS.ABOUT.HERO)}>
            {hero.card?.label ?? "What we deliver"}
          </p>
          <div className="mt-6 space-y-3">
            {(hero.card?.items ?? fallbackHero.card.items).map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-600" {...sectionAttrs(SECTION_KEYS.ABOUT.HERO)}>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                {item}
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500" {...sectionAttrs(SECTION_KEYS.ABOUT.HERO)}>
            {hero.card?.note ?? fallbackHero.card.note}
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1fr,1.1fr]">
        <div>
          <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.ABOUT.WORK)}>
            {work.label}
          </p>
          <h2
            className="mt-4 max-w-xl font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl"
            {...sectionAttrs(SECTION_KEYS.ABOUT.WORK)}
          >
            {work.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600" {...sectionAttrs(SECTION_KEYS.ABOUT.WORK)}>
            {work.body}
          </p>
          <div className="mt-6 space-y-3">
            {(work.values ?? fallbackWork.values).map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-600" {...sectionAttrs(SECTION_KEYS.ABOUT.WORK)}>
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className={softCard}>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400" {...sectionAttrs(SECTION_KEYS.ABOUT.WORK)}>
              {work.leadership?.label ?? fallbackWork.leadership.label}
            </p>
            <h3 className="mt-3 font-[var(--font-display)] text-xl font-semibold text-slate-900" {...sectionAttrs(SECTION_KEYS.ABOUT.WORK)}>
              {work.leadership?.title ?? fallbackWork.leadership.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600" {...sectionAttrs(SECTION_KEYS.ABOUT.WORK)}>
              {work.leadership?.body ?? fallbackWork.leadership.body}
            </p>
            <div className="mt-4 space-y-3">
              {(work.leadership?.items ?? fallbackWork.leadership.items).map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-600" {...sectionAttrs(SECTION_KEYS.ABOUT.WORK)}>
                  <Users className="h-4 w-4 text-emerald-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-emerald-200/60 bg-emerald-50/60 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700" {...sectionAttrs(SECTION_KEYS.ABOUT.WORK)}>
              {work.enterprise?.label ?? fallbackWork.enterprise.label}
            </p>
            <h3 className="mt-3 font-[var(--font-display)] text-xl font-semibold text-slate-900" {...sectionAttrs(SECTION_KEYS.ABOUT.WORK)}>
              {work.enterprise?.title ?? fallbackWork.enterprise.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600" {...sectionAttrs(SECTION_KEYS.ABOUT.WORK)}>
              {work.enterprise?.body ?? fallbackWork.enterprise.body}
            </p>
            <Link
              href={work.enterprise?.link?.href ?? fallbackWork.enterprise.link.href}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700"
              {...sectionAttrs(SECTION_KEYS.ABOUT.WORK)}
            >
              {work.enterprise?.link?.label ?? fallbackWork.enterprise.link.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-slate-200/70 bg-white/80 px-8 py-16 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.ABOUT.GLOBAL)}>
              {globalSection.label}
            </p>
            <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl" {...sectionAttrs(SECTION_KEYS.ABOUT.GLOBAL)}>
              {globalSection.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600" {...sectionAttrs(SECTION_KEYS.ABOUT.GLOBAL)}>
              {globalSection.body}
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm text-slate-600" {...sectionAttrs(SECTION_KEYS.ABOUT.GLOBAL)}>
              <Globe className="h-4 w-4 text-emerald-600" />
              {globalSection.bullet}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200/70 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400" {...sectionAttrs(SECTION_KEYS.ABOUT.GLOBAL)}>
              {globalSection.card?.label ?? fallbackGlobal.card.label}
            </p>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              {(globalSection.card?.items ?? fallbackGlobal.card.items).map((item) => (
                <p key={item} {...sectionAttrs(SECTION_KEYS.ABOUT.GLOBAL)}>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-emerald-600 px-8 py-16 text-center text-white shadow-[0_25px_60px_rgba(5,150,105,0.35)]">
        <h2 className="mx-auto max-w-3xl font-[var(--font-display)] text-3xl font-semibold tracking-tight md:text-4xl" {...sectionAttrs(SECTION_KEYS.ABOUT.CTA)}>
          {cta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-emerald-50" {...sectionAttrs(SECTION_KEYS.ABOUT.CTA)}>
          {cta.body}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href={cta.primary_cta?.href ?? "/contact"}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            {...sectionAttrs(SECTION_KEYS.ABOUT.CTA)}
          >
            {cta.primary_cta?.label ?? "Book a Strategy Call"}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href={cta.secondary_cta?.href ?? "/websites"}
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            {...sectionAttrs(SECTION_KEYS.ABOUT.CTA)}
          >
            {cta.secondary_cta?.label ?? "Explore the Website Offer"}
          </Link>
        </div>
      </section>
    </div>
  );
}
