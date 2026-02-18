import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock3, Globe, ShieldCheck, Users } from "lucide-react";

import { PAGE_KEYS, SECTION_KEYS } from "@/src/lib/content-map";
import { loadPortalPageContent } from "@/src/lib/portal-page-content";
import AnimatedMetric from "../components/AnimatedMetric";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Enterprise Website Consulting Team | Ingenium",
  description:
    "Meet the Ingenium team - enterprise web design, CRM, and AI operations specialists building conversion systems for growth companies.",
  openGraph: {
    title: "Enterprise Website Consulting Team | Ingenium",
    description:
      "See how Ingenium operates across strategy, delivery, governance, and global execution for enterprise buyers.",
    url: "/about",
  },
  alternates: { canonical: "/about" },
};

const sectionLabel = "font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400";
const darkCard = "rounded-2xl border border-slate-800 bg-slate-900/70 p-6";
const primaryButton =
  "inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500";
const secondaryButton =
  "inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-600 hover:text-white";

const fallbackHero = {
  label: "Enterprise Website Consulting Team",
  title: "A senior team that builds and operates revenue systems, not one-off projects.",
  body: "Ingenium combines enterprise web design, CRM operations, automation engineering, and AI governance in one accountable delivery team.",
  primary_cta: { label: "Book a Strategy Call", href: "/contact" },
  secondary_cta: { label: "View Enterprise Case Studies", href: "/case-studies" },
  proof: {
    metric: "4-6 weeks",
    label: "average timeline from kickoff to first measurable conversion improvements",
    client: "Mid-market B2B technology company",
    timeframe: "Q3 2025 rollout",
  },
};

const fallbackWork = {
  label: "How We Work",
  title: "Clear cadence, clear ownership, clear escalation.",
  body: "You get an operating rhythm designed for enterprise stakeholders: weekly execution, monthly strategy, and documented governance controls.",
  cadence: [
    { title: "Weekly Delivery Sync", detail: "Progress, blockers, and next sprint priorities" },
    { title: "Biweekly Performance Review", detail: "Conversion, pipeline, and workflow KPI analysis" },
    { title: "Monthly Leadership Update", detail: "Executive summary with decisions and risk tracking" },
  ],
  accountability: [
    { label: "Client success owner", detail: "Single point of accountability for outcomes" },
    { label: "Technical lead", detail: "Architecture oversight, QA, and deployment controls" },
    { label: "RevOps lead", detail: "Pipeline data quality, routing logic, attribution integrity" },
  ],
  escalation: [
    "Severity 1 incidents reviewed within 1 hour",
    "Decision logs maintained for all architecture changes",
    "Human approval gates for automation and AI releases",
  ],
};

const fallbackGlobal = {
  label: "Global Reach",
  title: "US and EU delivery coverage for distributed revenue teams.",
  body: "Our operating model supports cross-time-zone teams with overlap windows, dedicated documentation, and handoff protocols.",
  regions: [
    { name: "North America", coverage: "08:00-18:00 ET", focus: "Strategy, leadership alignment, go-to-market" },
    { name: "Europe", coverage: "08:00-18:00 CET", focus: "Build execution, QA, automation delivery" },
    { name: "Shared overlap", coverage: "10:00-13:00 ET", focus: "Cross-team reviews and handoffs" },
  ],
  capabilities: [
    "Enterprise website architecture and delivery",
    "CRM implementation and data governance",
    "Automation design with rollback controls",
    "Security and procurement support documentation",
  ],
};

const fallbackCta = {
  title: "Choose the right next step for your stakeholder group.",
  body: "Different buyers need different evidence. We run role-specific review calls so decisions move faster.",
  primary_cta: { label: "Book a Strategy Call", href: "/contact" },
  secondary_cta: { label: "Request a Technical Review", href: "/contact?intent=technical-review" },
  tertiary_cta: { label: "Request a Security Pack", href: "/contact?intent=security-pack" },
};

export default async function AboutPage() {
  const { sectionJson, sectionAttrs } = await loadPortalPageContent(PAGE_KEYS.ABOUT);

  const hero = sectionJson(SECTION_KEYS.ABOUT.HERO, fallbackHero);
  const work = sectionJson(SECTION_KEYS.ABOUT.WORK, fallbackWork);
  const globalSection = sectionJson(SECTION_KEYS.ABOUT.GLOBAL, fallbackGlobal);
  const cta = sectionJson(SECTION_KEYS.ABOUT.CTA, fallbackCta);

  return (
    <div className="space-y-24 pb-4 md:space-y-28">
      <section className="grid items-start gap-10 lg:grid-cols-[1.15fr,0.85fr]">
        <div>
          <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.ABOUT.HERO)}>
            {hero.label}
          </p>
          <h1
            className="mt-5 max-w-3xl font-(--font-display) text-4xl font-bold tracking-tight text-white sm:text-5xl"
            {...sectionAttrs(SECTION_KEYS.ABOUT.HERO)}
          >
            {hero.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400" {...sectionAttrs(SECTION_KEYS.ABOUT.HERO)}>
            {hero.body}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={hero.primary_cta?.href ?? "/contact"} className={primaryButton} {...sectionAttrs(SECTION_KEYS.ABOUT.HERO)}>
              {hero.primary_cta?.label ?? "Book a Strategy Call"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={hero.secondary_cta?.href ?? "/case-studies"} className={secondaryButton} {...sectionAttrs(SECTION_KEYS.ABOUT.HERO)}>
              {hero.secondary_cta?.label ?? "View Enterprise Case Studies"}
            </Link>
          </div>
        </div>

        <div className={`${darkCard} dot-grid`} {...sectionAttrs(SECTION_KEYS.ABOUT.HERO)}>
          <p className="font-(--font-mono) text-xs uppercase tracking-widest text-slate-500">
            Proof Snapshot
          </p>
          <AnimatedMetric
            as="p"
            className="metric-display mt-4 text-3xl font-semibold text-emerald-400"
            value={hero.proof?.metric ?? "4-6 weeks"}
          />
          <p className="mt-2 text-sm text-slate-300">{hero.proof?.label}</p>
          <div className="mt-5 space-y-2 text-xs text-slate-500">
            <p>Client: {hero.proof?.client ?? "Mid-market B2B technology company"}</p>
            <p>Timeframe: {hero.proof?.timeframe ?? "Q3 2025 rollout"}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className={darkCard}>
          <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.ABOUT.WORK)}>
            {work.label}
          </p>
          <h2 className="mt-4 font-(--font-display) text-3xl font-bold tracking-tight text-white" {...sectionAttrs(SECTION_KEYS.ABOUT.WORK)}>
            {work.title}
          </h2>
          <p className="mt-4 text-slate-400" {...sectionAttrs(SECTION_KEYS.ABOUT.WORK)}>
            {work.body}
          </p>
          <div className="mt-8 space-y-4">
            {(work.cadence ?? fallbackWork.cadence).map((item: { title: string; detail: string }) => (
              <div key={item.title} className="rounded-xl border border-slate-800 bg-slate-950/60 p-4" {...sectionAttrs(SECTION_KEYS.ABOUT.WORK)}>
                <p className="font-medium text-white">{item.title}</p>
                <p className="mt-1 text-sm text-slate-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className={darkCard}>
            <p className="font-(--font-mono) text-xs uppercase tracking-widest text-slate-500" {...sectionAttrs(SECTION_KEYS.ABOUT.WORK)}>
              Accountability Model
            </p>
            <div className="mt-4 space-y-4">
              {(work.accountability ?? fallbackWork.accountability).map((item: { label: string; detail: string }) => (
                <div key={item.label} className="flex gap-3" {...sectionAttrs(SECTION_KEYS.ABOUT.WORK)}>
                  <Users className="mt-0.5 h-4 w-4 text-emerald-400" />
                  <div>
                    <p className="text-sm font-medium text-white">{item.label}</p>
                    <p className="text-sm text-slate-400">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={darkCard}>
            <p className="font-(--font-mono) text-xs uppercase tracking-widest text-slate-500" {...sectionAttrs(SECTION_KEYS.ABOUT.WORK)}>
              Escalation Path
            </p>
            <div className="mt-4 space-y-3">
              {(work.escalation ?? fallbackWork.escalation).map((item: string) => (
                <div key={item} className="flex items-start gap-3 text-sm text-slate-300" {...sectionAttrs(SECTION_KEYS.ABOUT.WORK)}>
                  <Clock3 className="mt-0.5 h-4 w-4 text-cyan-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`${darkCard} grid-lines`}>
        <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.ABOUT.GLOBAL)}>
          {globalSection.label}
        </p>
        <h2 className="mt-4 font-(--font-display) text-3xl font-bold tracking-tight text-white" {...sectionAttrs(SECTION_KEYS.ABOUT.GLOBAL)}>
          {globalSection.title}
        </h2>
        <p className="mt-4 max-w-3xl text-slate-400" {...sectionAttrs(SECTION_KEYS.ABOUT.GLOBAL)}>
          {globalSection.body}
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {(globalSection.regions ?? fallbackGlobal.regions).map(
            (region: { name: string; coverage: string; focus: string }) => (
              <div key={region.name} className="rounded-xl border border-slate-800 bg-slate-950/60 p-4" {...sectionAttrs(SECTION_KEYS.ABOUT.GLOBAL)}>
                <div className="flex items-center gap-2 text-sm font-medium text-white">
                  <Globe className="h-4 w-4 text-cyan-400" />
                  {region.name}
                </div>
                <p className="mt-2 font-(--font-mono) text-xs text-emerald-400">{region.coverage}</p>
                <p className="mt-2 text-sm text-slate-400">{region.focus}</p>
              </div>
            ),
          )}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {(globalSection.capabilities ?? fallbackGlobal.capabilities).map((item: string) => (
            <div key={item} className="flex items-center gap-2 text-sm text-slate-300" {...sectionAttrs(SECTION_KEYS.ABOUT.GLOBAL)}>
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 px-8 py-12">
        <h2 className="font-(--font-display) text-3xl font-bold tracking-tight text-white" {...sectionAttrs(SECTION_KEYS.ABOUT.CTA)}>
          {cta.title}
        </h2>
        <p className="mt-4 max-w-3xl text-slate-300" {...sectionAttrs(SECTION_KEYS.ABOUT.CTA)}>
          {cta.body}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href={cta.primary_cta?.href ?? "/contact"} className={primaryButton} {...sectionAttrs(SECTION_KEYS.ABOUT.CTA)}>
            {cta.primary_cta?.label ?? "Book a Strategy Call"}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href={cta.secondary_cta?.href ?? "/contact?intent=technical-review"} className={secondaryButton} {...sectionAttrs(SECTION_KEYS.ABOUT.CTA)}>
            {cta.secondary_cta?.label ?? "Request a Technical Review"}
          </Link>
          <Link
            href={cta.tertiary_cta?.href ?? "/contact?intent=security-pack"}
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition hover:text-emerald-200"
            {...sectionAttrs(SECTION_KEYS.ABOUT.CTA)}
          >
            {cta.tertiary_cta?.label ?? "Request a Security Pack"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
