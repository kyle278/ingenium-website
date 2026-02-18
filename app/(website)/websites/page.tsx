import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  PenTool,
  Target,
  Rocket,
  ChevronRight,
} from "lucide-react";

import { PAGE_KEYS, SECTION_KEYS } from "@/src/lib/content-map";
import { loadPortalPageContent } from "@/src/lib/portal-page-content";
import ScrollReveal from "../components/ScrollReveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Enterprise Website Redesign Services | Ingenium",
  description:
    "Enterprise website redesign built for conversion. Strategy, design, CRO, and a 30-day launch path. See how Ingenium builds sites that sell.",
  openGraph: {
    title: "Enterprise Website Redesign Services | Ingenium",
    description:
      "Enterprise website redesign built for conversion. Strategy, design, CRO, and a 30-day launch path.",
  },
  alternates: { canonical: "/websites" },
};

/* ── Fallback Content ──────────────────────────────────────────────── */

const fallbackHero = {
  label: "Enterprise Website Redesign",
  title: "Enterprise website redesign that turns traffic into qualified pipeline.",
  body: "Your website is your first sales conversation. Ingenium builds enterprise website redesign systems — not design projects — that connect directly to your CRM, AI agents, and automation stack so every visitor becomes a measurable opportunity.",
  primary_cta: { label: "Book a Strategy Call", href: "/contact" },
  secondary_cta: { label: "See Our Process", href: "#implementation" },
  proof_metric: "+38%",
  proof_label: "qualified demo requests for a Series B SaaS company after full website redesign",
};

const fallbackEngine = {
  label: "The Conversion Architecture",
  title: "How an Ingenium enterprise website redesign converts.",
  body: "Every page is engineered to a conversion blueprint — from messaging architecture to CTA psychology to real-time lead routing.",
  flow: [
    "Visitor lands on a service page built around a specific conversion hypothesis",
    "Problem framing and proof elements build confidence and urgency",
    "Contextual CTA triggers a progressive form — low friction, high intent",
    "Lead enriched with firmographic data, scored, and routed to the right rep in under 60 seconds",
    "Automated follow-up sequence triggered, with full engagement context attached in CRM",
  ],
};

const fallbackComparison = {
  label: "Why This Approach",
  title: "Enterprise website redesign: system vs. project.",
  columns: [
    {
      title: "Ingenium System",
      emphasis: true,
      items: [
        { label: "Conversion rate", value: "Optimised continuously with AI-assisted testing" },
        { label: "Time to value", value: "Measurable pipeline impact within 30 days" },
        { label: "CRM integration", value: "Forms, routing, and attribution wired at build" },
        { label: "Post-launch", value: "Ongoing operation with weekly experimentation" },
        { label: "Attribution", value: "End-to-end pipeline attribution from first touch" },
      ],
    },
    {
      title: "Traditional Agency",
      items: [
        { label: "Conversion rate", value: "Set at launch, rarely iterated" },
        { label: "Time to value", value: "Impact unmeasured beyond design metrics" },
        { label: "CRM integration", value: "Basic form submission, no routing or scoring" },
        { label: "Post-launch", value: "Handoff to internal team after go-live" },
        { label: "Attribution", value: "GA4 traffic metrics, no pipeline connection" },
      ],
    },
    {
      title: "DIY / Template",
      items: [
        { label: "Conversion rate", value: "Generic layout, no conversion architecture" },
        { label: "Time to value", value: "Faster launch, no strategic foundation" },
        { label: "CRM integration", value: "Manual or Zapier-level connections" },
        { label: "Post-launch", value: "Competes with internal priorities" },
        { label: "Attribution", value: "Minimal visibility into lead quality" },
      ],
    },
  ],
};

const fallbackPillars = {
  items: [
    {
      title: "Messaging Architecture",
      description: "Positioning, narrative flow, and CTA copy engineered to each buyer persona.",
      output: "Messaging architecture document with 12+ page-level conversion hypotheses",
      icon: "pen",
    },
    {
      title: "Conversion-Grade Design",
      description: "Enterprise UI that guides decision-makers through proof to action.",
      output: "Full design system with responsive components and interaction specifications",
      icon: "target",
    },
    {
      title: "Launch + Growth System",
      description: "SEO, analytics, CRM integration, AI workflows, and experimentation cadence built in.",
      output: "Complete technical deployment with attribution dashboards and A/B test framework",
      icon: "rocket",
    },
  ],
};

const fallbackImplementation = {
  label: "Implementation Path",
  title: "Enterprise website redesign in weeks, not months.",
  phases: [
    {
      week: "Week 1–2",
      title: "Discovery & Strategy",
      deliverables: "Conversion audit, messaging architecture, KPI framework, technical requirements",
      owner: "Ingenium leads discovery; your team validates direction and priorities",
    },
    {
      week: "Week 3–4",
      title: "Design & Build",
      deliverables: "Design system, page builds, CRM integration, analytics instrumentation",
      owner: "Ingenium builds; your team reviews at design and content gates",
    },
    {
      week: "Week 5–6",
      title: "Launch & Optimise",
      deliverables: "Staged go-live, AI agent deployment, automation workflows, first optimisation cycle",
      owner: "Joint ownership with weekly performance reporting",
    },
  ],
};

const fallbackFirst30 = {
  title: "Your first 30 days after engagement starts",
  body: "By day 30, you will have a conversion-optimised website live, attribution dashboards reporting, and your first A/B test generating data.",
  items: [
    "Conversion blueprint with page-level hypotheses baselined",
    "Design system and key templates deployed",
    "CRM integration with lead routing active",
    "Analytics instrumentation with attribution dashboards live",
    "First experiment live and generating data",
  ],
};

const fallbackProof = {
  label: "Results",
  title: "Enterprise website redesign results with measurable outcomes.",
  case: {
    client_type: "Series B SaaS Company (Fintech)",
    challenge: "Website generating 50K+ monthly visits but less than 0.8% converting to demo requests. Marketing couldn't prove which campaigns drove revenue. Sales received leads without context.",
    approach: "Full enterprise website redesign: conversion architecture, role-based messaging, progressive forms, CRM integration with automated routing, and AI-assisted follow-up sequences.",
    changes: [
      "Rebuilt 14 pages with buyer-persona messaging architecture",
      "Implemented progressive lead capture reducing form abandonment by 62%",
      "Wired lead routing delivering qualified context to reps in under 45 seconds",
      "Deployed automated follow-up triggering within 2 hours of form submission",
    ],
    results: [
      { metric: "+38%", label: "Qualified demo requests" },
      { metric: "2.1x", label: "Marketing-attributed pipeline" },
      { metric: "<45s", label: "Lead-to-rep routing time" },
      { metric: "62%", label: "Reduction in form abandonment" },
    ],
    timeframe: "Results measured at 90 days post-launch",
  },
  link: { label: "View all enterprise website case studies", href: "/case-studies" },
};

const fallbackFaq = {
  title: "Enterprise website redesign FAQ",
  items: [
    {
      question: "How long does an enterprise website redesign take?",
      answer: "Most enterprise website redesigns launch in 4–6 weeks with staged rollouts. Discovery and strategy take 1–2 weeks, design and build take 2–3 weeks, and launch with initial optimisation completes the cycle.",
    },
    {
      question: "What does an enterprise website redesign cost?",
      answer: "Enterprise website redesign pricing depends on scope — number of pages, CRM integration complexity, and ongoing optimisation requirements. We provide a scoped estimate after a strategy call. Typical engagements range from growth-stage to enterprise-scale packages.",
    },
    {
      question: "How do you handle migration from our existing site?",
      answer: "We audit your current site for content, SEO equity, and technical dependencies. High-value pages are migrated with proper redirects. Content that converts stays; everything else is rebuilt around your new conversion architecture.",
    },
    {
      question: "What about change management and team adoption?",
      answer: "We train your team on the CMS, provide documentation for content updates, and establish an approval workflow. Most teams are self-sufficient for content changes within the first week post-launch.",
    },
    {
      question: "How do you integrate with our existing CRM and marketing stack?",
      answer: "We build native integrations with HubSpot, Salesforce, and major CRM platforms. Forms, lead routing, attribution tracking, and automation triggers are wired during the build phase — not bolted on after launch.",
    },
    {
      question: "What happens if we need changes after launch?",
      answer: "Ongoing optimisation is part of the system. We run weekly experimentation cycles, monitor conversion metrics, and iterate based on data. You're never left to maintain the system alone.",
    },
  ],
  enterprise_card: {
    label: "Enterprise Ready",
    title: "Security and governance baked into every redesign.",
    body: "Your enterprise website redesign includes approval workflows, audit trails, and compliance-ready infrastructure from day one.",
    items: [
      "SOC 2 readiness framework and documentation",
      "Role-based access controls and approval workflows",
      "Audit trails with complete activity logging",
    ],
    link: { label: "Review enterprise security and AI governance", href: "/security" },
  },
};

const fallbackCta = {
  title: "Ready to start your enterprise website redesign?",
  body: "Book a strategy call to map your conversion plan, timeline, and rollout options. Get a tailored roadmap within 48 hours.",
  primary_cta: { label: "Book a Strategy Call", href: "/contact" },
  secondary_cta: { label: "Download Website Redesign Scope Template", href: "/contact" },
  reassurance: "30-minute call · Tailored roadmap · No obligation · Typical launch in 4–6 weeks",
};

/* ── Helpers ────────────────────────────────────────────────────────── */

function getPillarIcon(iconName: string | undefined) {
  switch (iconName) {
    case "pen": return PenTool;
    case "rocket": return Rocket;
    default: return Target;
  }
}

/* ── Page Component ─────────────────────────────────────────────────── */

export default async function WebsitesPage() {
  const { sectionJson, sectionAttrs } = await loadPortalPageContent(PAGE_KEYS.WEBSITES);
  const hero = sectionJson(SECTION_KEYS.WEBSITES.HERO, fallbackHero);
  const engine = sectionJson(SECTION_KEYS.WEBSITES.ENGINE, fallbackEngine);
  const comparison = sectionJson(SECTION_KEYS.WEBSITES.DIFFERENTIATORS, fallbackComparison);
  const pillars = sectionJson(SECTION_KEYS.WEBSITES.DELIVERABLES, fallbackPillars);
  const implementation = sectionJson(SECTION_KEYS.WEBSITES.PROCESS, fallbackImplementation);
  const first30 = sectionJson(SECTION_KEYS.WEBSITES.READINESS, fallbackFirst30);
  const proof = sectionJson(SECTION_KEYS.WEBSITES.PROOF, fallbackProof);
  const faq = sectionJson(SECTION_KEYS.WEBSITES.FAQ, fallbackFaq);
  const cta = sectionJson(SECTION_KEYS.WEBSITES.CTA, fallbackCta);

  return (
    <div className="space-y-28 md:space-y-40">
      {/* ═══════ HERO ═══════ */}
      <section className="pt-8">
        <div className="mx-auto max-w-4xl text-center">
          <p
            className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400"
            {...sectionAttrs(SECTION_KEYS.WEBSITES.HERO)}
          >
            {hero.label}
          </p>
          <h1
            className="mt-6 font-(--font-display) text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl"
            {...sectionAttrs(SECTION_KEYS.WEBSITES.HERO)}
          >
            {hero.title}
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400"
            {...sectionAttrs(SECTION_KEYS.WEBSITES.HERO)}
          >
            {hero.body}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={hero.primary_cta?.href ?? "/contact"}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-500"
              {...sectionAttrs(SECTION_KEYS.WEBSITES.HERO)}
            >
              {hero.primary_cta?.label ?? "Book a Strategy Call"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={hero.secondary_cta?.href ?? "#implementation"}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-600 hover:text-white"
              {...sectionAttrs(SECTION_KEYS.WEBSITES.HERO)}
            >
              {hero.secondary_cta?.label ?? "See Our Process"}
            </Link>
          </div>

          {/* Proof indicator */}
          <div className="mt-10 inline-flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-5 py-3">
            <span className="metric-display text-3xl font-bold text-emerald-400">
              {hero.proof_metric ?? fallbackHero.proof_metric}
            </span>
            <span className="text-left text-sm text-slate-400">
              {hero.proof_label ?? fallbackHero.proof_label}
            </span>
          </div>
        </div>
      </section>

      {/* ═══════ CONVERSION ENGINE DETAIL ═══════ */}
      <section className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950 p-8 md:p-12">
        <p
          className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400"
          {...sectionAttrs(SECTION_KEYS.WEBSITES.ENGINE)}
        >
          {engine.label}
        </p>
        <h2
          className="mt-4 max-w-2xl font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl"
          {...sectionAttrs(SECTION_KEYS.WEBSITES.ENGINE)}
        >
          {engine.title}
        </h2>
        <p className="mt-4 max-w-2xl text-slate-400" {...sectionAttrs(SECTION_KEYS.WEBSITES.ENGINE)}>
          {engine.body}
        </p>

        {/* Flow visualization */}
        <div className="mt-10 space-y-0">
          {(engine.flow ?? fallbackEngine.flow).map((step: string, i: number) => (
            <ScrollReveal key={step} delayMs={i * 55}>
              <div className="relative pl-10" {...sectionAttrs(SECTION_KEYS.WEBSITES.ENGINE)}>
                {i < (engine.flow ?? fallbackEngine.flow).length - 1 && (
                  <div className="absolute left-[15px] top-8 h-full w-px bg-emerald-800/40" />
                )}
                <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/20 bg-slate-900">
                  <span className="font-(--font-mono) text-xs text-emerald-400">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="pb-6">
                  <p className="text-sm leading-relaxed text-slate-300">{step}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══════ COMPARISON ═══════ */}
      <section>
        <p className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400">
          {comparison.label ?? fallbackComparison.label}
        </p>
        <h2 className="mt-4 max-w-2xl font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {comparison.title ?? fallbackComparison.title}
        </h2>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {(comparison.columns ?? fallbackComparison.columns).map((col: { title: string; emphasis?: boolean; items: { label: string; value: string }[] }) => (
            <div
              key={col.title}
              className={`rounded-xl border p-6 ${
                col.emphasis
                  ? "border-emerald-500/30 bg-emerald-950/30"
                  : "border-slate-800 bg-slate-900/40"
              }`}
            >
              <h3 className={`text-sm font-semibold ${col.emphasis ? "text-emerald-400" : "text-slate-400"}`}>
                {col.title}
              </h3>
              <div className="mt-5 space-y-4">
                {col.items.map((item: { label: string; value: string }) => (
                  <div key={item.label}>
                    <p className="font-(--font-mono) text-[10px] uppercase tracking-wider text-slate-600">{item.label}</p>
                    <p className={`mt-1 text-sm ${col.emphasis ? "text-slate-200" : "text-slate-500"}`}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ CAPABILITY PILLARS ═══════ */}
      <section className="grid gap-6 lg:grid-cols-3">
        {(pillars.items ?? fallbackPillars.items).map((item: { title: string; description: string; output: string; icon?: string }, i: number) => {
          const Icon = getPillarIcon(item.icon);
          const bgVariants = ["dot-grid", "grid-lines", ""];
          return (
            <div
              key={item.title}
              className={`relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-6 ${bgVariants[i] ?? ""}`}
              {...sectionAttrs(SECTION_KEYS.WEBSITES.DELIVERABLES)}
            >
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                  <Icon className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="mt-4 font-(--font-display) text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
                <div className="mt-4 rounded-lg border border-slate-800 bg-slate-900/60 p-3">
                  <p className="font-(--font-mono) text-[10px] uppercase tracking-wider text-slate-600">Concrete output</p>
                  <p className="mt-1 text-xs text-slate-300">{item.output}</p>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ═══════ IMPLEMENTATION PATH ═══════ */}
      <section id="implementation" className="grid gap-12 lg:grid-cols-2">
        <div>
          <p
            className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400"
            {...sectionAttrs(SECTION_KEYS.WEBSITES.PROCESS)}
          >
            {implementation.label}
          </p>
          <h2
            className="mt-4 max-w-lg font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl"
            {...sectionAttrs(SECTION_KEYS.WEBSITES.PROCESS)}
          >
            {implementation.title}
          </h2>

          <div className="mt-10 space-y-0">
            {(implementation.phases ?? fallbackImplementation.phases).map((phase: { week: string; title: string; deliverables: string; owner: string }, i: number) => (
              <ScrollReveal key={phase.week} delayMs={i * 70}>
                <div className="relative pl-8" {...sectionAttrs(SECTION_KEYS.WEBSITES.PROCESS)}>
                  {i < (implementation.phases ?? fallbackImplementation.phases).length - 1 && (
                    <div className="absolute left-[11px] top-8 h-full w-px bg-slate-800" />
                  )}
                  <div className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-emerald-500/30 bg-slate-900">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  </div>
                  <div className="pb-8">
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-semibold text-white">{phase.title}</h3>
                      <span className="font-(--font-mono) text-[11px] text-emerald-400">{phase.week}</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-400">{phase.deliverables}</p>
                    <p className="mt-1 font-(--font-mono) text-[11px] text-slate-600">{phase.owner}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* First 30 days */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8" {...sectionAttrs(SECTION_KEYS.WEBSITES.READINESS)}>
          <p className="font-(--font-mono) text-xs uppercase tracking-widest text-cyan-400">First 30 Days</p>
          <h3 className="mt-4 font-(--font-display) text-xl font-bold text-white">
            {first30.title ?? fallbackFirst30.title}
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            {first30.body ?? fallbackFirst30.body}
          </p>
          <div className="mt-6 space-y-4">
            {(first30.items ?? fallbackFirst30.items).map((item: string, i: number) => (
              <ScrollReveal key={item} delayMs={i * 55}>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span className="text-sm text-slate-300">{item}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PROOF — FULL MINI CASE ═══════ */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400" {...sectionAttrs(SECTION_KEYS.WEBSITES.PROOF)}>
              {proof.label}
            </p>
            <h2 className="mt-4 font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl" {...sectionAttrs(SECTION_KEYS.WEBSITES.PROOF)}>
              {proof.title}
            </h2>
          </div>
          <Link
            href={proof.link?.href ?? "/case-studies"}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white"
            {...sectionAttrs(SECTION_KEYS.WEBSITES.PROOF)}
          >
            {proof.link?.label ?? "View all enterprise website case studies"}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/40 p-8 md:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-md bg-slate-800 px-2.5 py-1 font-(--font-mono) text-[10px] uppercase tracking-wider text-slate-400">
              {(proof.case ?? fallbackProof.case).client_type}
            </span>
            <span className="font-(--font-mono) text-[11px] text-slate-600">
              {(proof.case ?? fallbackProof.case).timeframe}
            </span>
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Challenge</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{(proof.case ?? fallbackProof.case).challenge}</p>
              <p className="mt-4 text-xs font-medium uppercase tracking-wider text-slate-500">Approach</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{(proof.case ?? fallbackProof.case).approach}</p>
              <p className="mt-4 text-xs font-medium uppercase tracking-wider text-slate-500">What changed</p>
              <div className="mt-2 space-y-2">
                {(proof.case ?? fallbackProof.case).changes.map((change: string) => (
                  <div key={change} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    <span className="text-sm text-slate-400">{change}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {(proof.case ?? fallbackProof.case).results.map((r: { metric: string; label: string }) => (
                <div key={r.label} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                  <p className="metric-display text-2xl font-bold text-emerald-400">{r.metric}</p>
                  <p className="mt-1 text-xs text-slate-400">{r.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
        <div>
          <h2 className="font-(--font-display) text-2xl font-bold text-white" {...sectionAttrs(SECTION_KEYS.WEBSITES.FAQ)}>
            {faq.title}
          </h2>
          <div className="mt-8 space-y-6">
            {(faq.items ?? fallbackFaq.items).map((item: { question: string; answer: string }) => (
              <div key={item.question} className="border-b border-slate-800/60 pb-6">
                <h3 className="text-sm font-semibold text-white">{item.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-8" {...sectionAttrs(SECTION_KEYS.WEBSITES.FAQ)}>
          <span className="inline-flex items-center rounded-md border border-emerald-500/20 bg-emerald-950/40 px-2.5 py-1 font-(--font-mono) text-[10px] uppercase tracking-wider text-emerald-400">
            {faq.enterprise_card?.label ?? fallbackFaq.enterprise_card.label}
          </span>
          <h3 className="mt-4 font-(--font-display) text-xl font-bold text-white">
            {faq.enterprise_card?.title ?? fallbackFaq.enterprise_card.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            {faq.enterprise_card?.body ?? fallbackFaq.enterprise_card.body}
          </p>
          <div className="mt-6 space-y-3">
            {(faq.enterprise_card?.items ?? fallbackFaq.enterprise_card.items).map((item: string) => (
              <div key={item} className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
                <span className="text-sm text-slate-300">{item}</span>
              </div>
            ))}
          </div>
          <Link
            href={faq.enterprise_card?.link?.href ?? "/security"}
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300"
          >
            {faq.enterprise_card?.link?.label ?? "Review enterprise security and AI governance"}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ═══════ FINAL CTA ═══════ */}
      <section className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/40 to-slate-900 p-10 text-center md:p-16">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-30" />
        <div className="relative">
          <h2 className="mx-auto max-w-3xl font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl" {...sectionAttrs(SECTION_KEYS.WEBSITES.CTA)}>
            {cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400" {...sectionAttrs(SECTION_KEYS.WEBSITES.CTA)}>
            {cta.body}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={cta.primary_cta?.href ?? "/contact"}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-500"
              {...sectionAttrs(SECTION_KEYS.WEBSITES.CTA)}
            >
              {cta.primary_cta?.label ?? "Book a Strategy Call"}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href={cta.secondary_cta?.href ?? "/contact"}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-6 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:text-white"
              {...sectionAttrs(SECTION_KEYS.WEBSITES.CTA)}
            >
              {cta.secondary_cta?.label ?? "Download Website Redesign Scope Template"}
            </Link>
          </div>
          <p className="mt-6 flex items-center justify-center gap-2 font-(--font-mono) text-xs text-slate-600">
            <Clock className="h-3.5 w-3.5" />
            {cta.reassurance ?? fallbackCta.reassurance}
          </p>
        </div>
      </section>
    </div>
  );
}
