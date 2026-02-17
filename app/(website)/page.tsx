import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  LayoutPanelTop,
  LineChart,
  Lock,
  Sparkles,
  Workflow,
  Layers,
} from "lucide-react";

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
  label: "Enterprise Website Systems",
  title: "Enterprise websites built to convert, backed by AI operations.",
  body:
    "Ingenium builds conversion-first websites and operates the system behind them, including AI agents, CRM, automations, and analytics that keep performance compounding.",
  primary_cta: { label: "Book a Website Strategy Call", href: "/contact" },
  secondary_cta: { label: "View Case Studies", href: "/case-studies" },
  badges: ["4-6 week launch", "Up to 28% conversion lift", "100% pipeline attribution"],
  preview: {
    eyebrow: "Live Conversion View",
    badge: "+28% lift",
    subtitle: "Website experience preview",
    stats: ["Pipeline: $4.6M", "Demo conversion: +31%", "Response SLA: 2 hours"],
  },
};

const fallbackOutcomes = {
  label: "Typical outcomes from recent enterprise launches",
  items: [
    { metric: "Up to 28%", label: "Conversion lift" },
    { metric: "4-6 weeks", label: "Launch timeline" },
    { metric: "100%", label: "Attribution coverage" },
    { metric: "24/7", label: "AI operations" },
  ],
};

const fallbackIndustries = {
  label: "Trusted by enterprise teams across",
  items: [
    "Fintech",
    "Healthcare",
    "B2B SaaS",
    "Enterprise Services",
    "Logistics",
    "Professional Services",
  ],
};

const fallbackProblem = {
  label: "The problem",
  title: "Most enterprise websites stall after launch.",
  body: "Without a system to capture, qualify, and act on intent, conversion gains fade fast.",
  link: { label: "Explore the website system", href: "/websites" },
  cards: [
    {
      title: "Fragmented stack",
      description: "Your website, CRM, and automations live in silos, so wins never compound.",
    },
    {
      title: "Slow iteration",
      description: "Conversion tests wait on dev queues, and revenue experiments die in backlog.",
    },
    {
      title: "No ownership",
      description: "Multiple vendors means inconsistent results and no accountable operator.",
    },
  ],
};

const fallbackSystem = {
  label: "The system",
  title: "The conversion engine behind every launch.",
  body: "Your website is the front door. The Ingenium platform keeps it converting week after week.",
  steps: [
    {
      title: "Website",
      detail: "Conversion-first experience built for enterprise teams.",
      icon: "layout",
    },
    { title: "CRM", detail: "Unified pipeline data, routing, and attribution.", icon: "layers" },
    {
      title: "AI Agents",
      detail: "Specialized agents execute research, content, and QA.",
      icon: "sparkles",
    },
    { title: "Automations", detail: "Workflows that keep momentum compounding.", icon: "workflow" },
    {
      title: "Analytics",
      detail: "Performance dashboards across the funnel.",
      icon: "line_chart",
    },
  ],
};

const fallbackProcess = {
  label: "How it works",
  title: "A proven path from strategy to scale.",
  body: "We align strategy, design, and execution so you see measurable wins quickly.",
  steps: [
    {
      num: "01",
      title: "Diagnose",
      detail: "Audit your funnel, align stakeholders, and map conversion priorities.",
    },
    {
      num: "02",
      title: "Build",
      detail: "Launch a custom website with integrated CRM and analytics foundations.",
    },
    {
      num: "03",
      title: "Operate",
      detail: "Deploy AI agents and automations that keep improving performance.",
    },
  ],
  first_30_days: {
    label: "First 30 days",
    title: "What you receive early",
    items: [
      "Conversion blueprint + messaging hierarchy",
      "Design system + component library",
      "Analytics instrumentation + dashboards",
      "AI operations roadmap for the next 90 days",
    ],
  },
};

const fallbackProof = {
  label: "Proof",
  title: "Outcomes from enterprise teams.",
  link: { label: "View all case studies", href: "/case-studies" },
  items: [
    {
      label: "Fintech",
      metric: "+32%",
      title: "Pipeline growth in 90 days",
      detail: "Rebuilt enterprise site, unified CRM data, launched weekly conversion tests.",
    },
    {
      label: "Healthcare SaaS",
      metric: "2x",
      title: "Demo conversions",
      detail: "Role-based pages with automated follow-up and AI-assisted SDR briefs.",
    },
    {
      label: "Enterprise Services",
      metric: "6 wks",
      title: "Strategy to launch",
      detail: "Localized pages with governance workflows across four regions.",
    },
  ],
};

const fallbackSecurity = {
  label: "Security",
  title: "Enterprise governance built in.",
  body: "Approvals, audit trails, and role-based controls keep every update accountable.",
  link: { label: "Review security posture", href: "/security" },
  items: [
    "SSO / SAML access controls",
    "Role-based approvals",
    "Audit trails and activity logs",
    "Data residency options",
    "Vendor risk documentation",
    "Security review support",
  ],
};

const fallbackCta = {
  title: "Ready for a website system that drives pipeline?",
  body: "Book a strategy call to map your conversion plan, timeline, and rollout options.",
  primary_cta: { label: "Book a Strategy Call", href: "/contact" },
  secondary_cta: { label: "Explore the Website Offer", href: "/websites" },
};

function getSystemIcon(iconName: string | undefined) {
  switch (iconName) {
    case "layers":
      return Layers;
    case "sparkles":
      return Sparkles;
    case "workflow":
      return Workflow;
    case "line_chart":
      return LineChart;
    default:
      return LayoutPanelTop;
  }
}

export default async function HomePage() {
  const { sectionJson, sectionAttrs } = await loadPortalPageContent(PAGE_KEYS.HOME);
  const hero = sectionJson(SECTION_KEYS.HOME.HERO, fallbackHero);
  const outcomes = sectionJson(SECTION_KEYS.HOME.OUTCOMES, fallbackOutcomes);
  const industries = sectionJson(SECTION_KEYS.HOME.INDUSTRIES, fallbackIndustries);
  const problem = sectionJson(SECTION_KEYS.HOME.PROBLEM, fallbackProblem);
  const system = sectionJson(SECTION_KEYS.HOME.SYSTEM, fallbackSystem);
  const process = sectionJson(SECTION_KEYS.HOME.PROCESS, fallbackProcess);
  const proof = sectionJson(SECTION_KEYS.HOME.PROOF, fallbackProof);
  const security = sectionJson(SECTION_KEYS.HOME.SECURITY, fallbackSecurity);
  const cta = sectionJson(SECTION_KEYS.HOME.CTA, fallbackCta);

  return (
    <div className="space-y-24 md:space-y-32">
      <section className="grid items-center gap-12 lg:grid-cols-[1.1fr,0.9fr]">
        <div>
          <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.HOME.HERO)}>
            {hero.label}
          </p>
          <h1
            className="mt-6 max-w-2xl font-[var(--font-display)] text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
            {...sectionAttrs(SECTION_KEYS.HOME.HERO)}
          >
            {hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600" {...sectionAttrs(SECTION_KEYS.HOME.HERO)}>
            {hero.body}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={hero.primary_cta?.href ?? "/contact"} className={primaryButton} {...sectionAttrs(SECTION_KEYS.HOME.HERO)}>
              {hero.primary_cta?.label ?? "Book a Website Strategy Call"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={hero.secondary_cta?.href ?? "/case-studies"} className={secondaryButton} {...sectionAttrs(SECTION_KEYS.HOME.HERO)}>
              {hero.secondary_cta?.label ?? "View Case Studies"}
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-4 text-sm text-slate-500">
            {(hero.badges ?? fallbackHero.badges).map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5"
                {...sectionAttrs(SECTION_KEYS.HOME.HERO)}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-[2.25rem] border border-slate-200/70 bg-white/80 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.15)]">
          <div className="rounded-3xl border border-slate-200/60 bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400" {...sectionAttrs(SECTION_KEYS.HOME.HERO)}>
                {hero.preview?.eyebrow ?? fallbackHero.preview.eyebrow}
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700" {...sectionAttrs(SECTION_KEYS.HOME.HERO)}>
                {hero.preview?.badge ?? fallbackHero.preview.badge}
              </span>
            </div>
            <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-medium text-slate-500" {...sectionAttrs(SECTION_KEYS.HOME.HERO)}>
                {hero.preview?.subtitle ?? fallbackHero.preview.subtitle}
              </p>
              <div className="mt-4 space-y-3">
                <div className="h-3 w-3/4 rounded-full bg-slate-200" />
                <div className="h-3 w-2/3 rounded-full bg-slate-200" />
                <div className="h-3 w-1/2 rounded-full bg-slate-200" />
              </div>
            </div>
          </div>
          <div className="mt-6 grid gap-3">
            {(hero.preview?.stats ?? fallbackHero.preview.stats).map((stat) => (
              <div
                key={stat}
                className="rounded-2xl border border-slate-200/60 bg-white px-4 py-3 text-sm text-slate-600"
                {...sectionAttrs(SECTION_KEYS.HOME.HERO)}
              >
                {stat}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/70 bg-white/70 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
        <div className="grid gap-6 md:grid-cols-4">
          {(outcomes.items ?? fallbackOutcomes.items).map((item) => (
            <div key={item.label} className="rounded-2xl bg-white/80 p-5" {...sectionAttrs(SECTION_KEYS.HOME.OUTCOMES)}>
              <p className="text-2xl font-[var(--font-display)] font-semibold text-slate-900">{item.metric}</p>
              <p className="mt-2 text-sm text-slate-500">{item.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-slate-400" {...sectionAttrs(SECTION_KEYS.HOME.OUTCOMES)}>
          {outcomes.label}
        </p>
      </section>

      <section className="space-y-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400" {...sectionAttrs(SECTION_KEYS.HOME.INDUSTRIES)}>
          {industries.label}
        </p>
        <div className="flex flex-wrap gap-3">
          {(industries.items ?? fallbackIndustries.items).map((industry) => (
            <span
              key={industry}
              className="rounded-full border border-slate-200/60 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
              {...sectionAttrs(SECTION_KEYS.HOME.INDUSTRIES)}
            >
              {industry}
            </span>
          ))}
        </div>
      </section>

      <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr]">
        <div>
          <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.HOME.PROBLEM)}>
            {problem.label}
          </p>
          <h2 className="mt-4 max-w-xl font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl" {...sectionAttrs(SECTION_KEYS.HOME.PROBLEM)}>
            {problem.title}
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600" {...sectionAttrs(SECTION_KEYS.HOME.PROBLEM)}>
            {problem.body}
          </p>
          <Link href={problem.link?.href ?? "/websites"} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700" {...sectionAttrs(SECTION_KEYS.HOME.PROBLEM)}>
            {problem.link?.label ?? "Explore the website system"}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="space-y-4">
          {(problem.cards ?? fallbackProblem.cards).map((item) => (
            <div key={item.title} className={softCard} {...sectionAttrs(SECTION_KEYS.HOME.PROBLEM)}>
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-slate-200/70 bg-white/80 px-8 py-16 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
        <div className="mx-auto max-w-2xl text-center">
          <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.HOME.SYSTEM)}>
            {system.label}
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl" {...sectionAttrs(SECTION_KEYS.HOME.SYSTEM)}>
            {system.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600" {...sectionAttrs(SECTION_KEYS.HOME.SYSTEM)}>
            {system.body}
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-5">
          {(system.steps ?? fallbackSystem.steps).map((item) => {
            const Icon = getSystemIcon(item.icon);
            return (
              <div key={item.title} className="rounded-2xl bg-white p-4" {...sectionAttrs(SECTION_KEYS.HOME.SYSTEM)}>
                <Icon className="h-5 w-5 text-emerald-600" />
                <h3 className="mt-3 text-sm font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">{item.detail}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-12 lg:grid-cols-[1fr,1fr]">
        <div>
          <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.HOME.PROCESS)}>
            {process.label}
          </p>
          <h2 className="mt-4 max-w-xl font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl" {...sectionAttrs(SECTION_KEYS.HOME.PROCESS)}>
            {process.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600" {...sectionAttrs(SECTION_KEYS.HOME.PROCESS)}>
            {process.body}
          </p>
          <div className="mt-8 space-y-4">
            {(process.steps ?? fallbackProcess.steps).map((step) => (
              <div key={step.num} className="flex gap-4 rounded-2xl bg-white/70 p-5" {...sectionAttrs(SECTION_KEYS.HOME.PROCESS)}>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
                  {step.num}
                </div>
                <div>
                  <p className="text-base font-semibold text-slate-900">{step.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={card}>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400" {...sectionAttrs(SECTION_KEYS.HOME.PROCESS)}>
            {process.first_30_days?.label ?? fallbackProcess.first_30_days.label}
          </p>
          <h3 className="mt-4 font-[var(--font-display)] text-2xl font-semibold text-slate-900" {...sectionAttrs(SECTION_KEYS.HOME.PROCESS)}>
            {process.first_30_days?.title ?? fallbackProcess.first_30_days.title}
          </h3>
          <div className="mt-6 space-y-4">
            {(process.first_30_days?.items ?? fallbackProcess.first_30_days.items).map((item) => (
              <div key={item} className="flex items-start gap-3" {...sectionAttrs(SECTION_KEYS.HOME.PROCESS)}>
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                <span className="text-sm text-slate-600">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.HOME.PROOF)}>
              {proof.label}
            </p>
            <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl" {...sectionAttrs(SECTION_KEYS.HOME.PROOF)}>
              {proof.title}
            </h2>
          </div>
          <Link href={proof.link?.href ?? "/case-studies"} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900" {...sectionAttrs(SECTION_KEYS.HOME.PROOF)}>
            {proof.link?.label ?? "View all case studies"}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {(proof.items ?? fallbackProof.items).map((item) => (
            <div key={item.label} className={card} {...sectionAttrs(SECTION_KEYS.HOME.PROOF)}>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{item.label}</p>
              <p className="mt-4 text-4xl font-[var(--font-display)] font-semibold text-emerald-600">{item.metric}</p>
              <p className="mt-2 text-base font-semibold text-slate-900">{item.title}</p>
              <p className="mt-3 text-sm text-slate-600">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-12 lg:grid-cols-[1fr,1fr]">
        <div>
          <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.HOME.SECURITY)}>
            {security.label}
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl" {...sectionAttrs(SECTION_KEYS.HOME.SECURITY)}>
            {security.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600" {...sectionAttrs(SECTION_KEYS.HOME.SECURITY)}>
            {security.body}
          </p>
          <Link href={security.link?.href ?? "/security"} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700" {...sectionAttrs(SECTION_KEYS.HOME.SECURITY)}>
            {security.link?.label ?? "Review security posture"}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {(security.items ?? fallbackSecurity.items).map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-600"
              {...sectionAttrs(SECTION_KEYS.HOME.SECURITY)}
            >
              <Lock className="h-4 w-4 text-emerald-600" />
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-emerald-600 px-8 py-16 text-center text-white shadow-[0_25px_60px_rgba(5,150,105,0.35)]">
        <h2 className="mx-auto max-w-3xl font-[var(--font-display)] text-3xl font-semibold tracking-tight md:text-4xl" {...sectionAttrs(SECTION_KEYS.HOME.CTA)}>
          {cta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-emerald-50" {...sectionAttrs(SECTION_KEYS.HOME.CTA)}>
          {cta.body}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href={cta.primary_cta?.href ?? "/contact"} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50" {...sectionAttrs(SECTION_KEYS.HOME.CTA)}>
            {cta.primary_cta?.label ?? "Book a Strategy Call"}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href={cta.secondary_cta?.href ?? "/websites"} className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10" {...sectionAttrs(SECTION_KEYS.HOME.CTA)}>
            {cta.secondary_cta?.label ?? "Explore the Website Offer"}
          </Link>
        </div>
      </section>
    </div>
  );
}
