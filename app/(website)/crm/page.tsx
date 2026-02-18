import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Database,
  GitMerge,
  Route,
  ShieldCheck,
  Zap,
} from "lucide-react";

import { PAGE_KEYS, SECTION_KEYS } from "@/src/lib/content-map";
import { loadPortalPageContent } from "@/src/lib/portal-page-content";
import AnimatedMetric from "../components/AnimatedMetric";
import ScrollReveal from "../components/ScrollReveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "CRM Implementation and RevOps Services | Ingenium",
  description:
    "CRM implementation, migration, and revenue operations consulting. Clean data, smart routing, and pipeline accuracy from day one.",
  openGraph: {
    title: "CRM Implementation and RevOps Services | Ingenium",
    description:
      "CRM implementation, migration, and RevOps services for clean data, smart lead routing, and forecast confidence.",
    url: "/crm",
  },
  alternates: { canonical: "/crm" },
};

/* ------------------------------------------------------------------ */
/*  Dark-theme design tokens                                          */
/* ------------------------------------------------------------------ */

const primaryButton =
  "cta-lift inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_12px_30px_rgba(16,185,129,0.25)] transition hover:bg-emerald-400";
const secondaryButton =
  "cta-lift inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800";
const sectionLabel =
  "text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400";
const darkCard =
  "rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.4)]";
const softCard =
  "rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-sm";

/* ------------------------------------------------------------------ */
/*  Fallback content (portal-overridable)                             */
/* ------------------------------------------------------------------ */

const fallbackHero = {
  label: "CRM Implementation Services",
  title: "Your pipeline starts with a CRM that actually works.",
  body: "We implement CRM systems built for pipeline accuracy, smart lead routing, and revenue forecasting you can trust. Clean data from day one means every decision is backed by signal, not guesswork.",
  primary_cta: { label: "Book a Strategy Call", href: "/contact" },
  secondary_cta: { label: "Request a Migration Assessment", href: "/contact" },
  dashboard: {
    label: "CRM Dashboard",
    badge: "Live pipeline",
    metrics: [
      { label: "Pipeline accuracy", value: "97.3%", trend: "+4.1%" },
      { label: "Avg. routing time", value: "<60s", trend: "-82%" },
      { label: "Data hygiene score", value: "94/100", trend: "+12" },
    ],
    stages: ["New lead", "Enriched", "Scored", "Routed", "Working"],
  },
  proof: {
    metric: "97%",
    label: "pipeline accuracy across active CRM implementations",
  },
};

const fallbackFoundation = {
  label: "CRM Foundation",
  title: "Lifecycle stages, routing rules, and attribution — built right.",
  body: "Every CRM implementation starts with the operational foundation: lifecycle stages that match your funnel, lead routing that eliminates manual handoffs, attribution that connects revenue to source, and data hygiene that keeps everything trustworthy.",
  flow: {
    label: "Lead lifecycle in action",
    description:
      "Lead arrives via form → enriched with firmographic data → scored against ICP → routed to the right rep in <60s → full context attached.",
    steps: [
      { phase: "Capture", detail: "Form submission triggers instant record creation" },
      { phase: "Enrich", detail: "Firmographic and intent data appended automatically" },
      { phase: "Score", detail: "Lead scored against your ICP model in real time" },
      { phase: "Route", detail: "Assigned to the right rep based on territory and segment" },
      { phase: "Context", detail: "Rep receives full activity history and engagement timeline" },
    ],
  },
  pillars: [
    {
      title: "Lifecycle stages",
      detail: "Custom stages mapped to your actual sales motion — not a generic template.",
      icon: "database",
    },
    {
      title: "Lead routing rules",
      detail: "Territory, segment, round-robin, and capacity-based routing with failover logic.",
      icon: "route",
    },
    {
      title: "Attribution model",
      detail: "Multi-touch attribution that connects pipeline dollars to marketing and sales signals.",
      icon: "zap",
    },
    {
      title: "Data hygiene",
      detail: "Deduplication, normalization, and validation rules that run on every record, every time.",
      icon: "shield",
    },
  ],
};

const fallbackMigration = {
  label: "CRM Migration",
  title: "Migration with risk controls at every gate.",
  body: "CRM migrations fail when teams rush. We build in data validation checkpoints, parallel running periods, and documented rollback plans so you never lose a record or break a workflow.",
  timeline: {
    label: "Migration timeline",
    gates: [
      {
        phase: "Discovery & mapping",
        week: "Weeks 1-2",
        detail: "Field mapping, custom object audit, and data dictionary documentation.",
        checkpoint: "Data map sign-off",
      },
      {
        phase: "Validation & testing",
        week: "Weeks 3-4",
        detail: "Sample migration, data integrity checks, and workflow validation in sandbox.",
        checkpoint: "Validation report approved",
      },
      {
        phase: "Parallel running",
        week: "Weeks 5-6",
        detail: "Both systems running simultaneously with data sync monitoring and discrepancy alerts.",
        checkpoint: "Parity confirmation",
      },
      {
        phase: "Cutover & verification",
        week: "Week 7",
        detail: "Full cutover with rollback plan, team enablement, and post-migration audit.",
        checkpoint: "Go-live approval",
      },
    ],
  },
  safeguards: [
    "Documented rollback plan at every gate",
    "Data validation checkpoints with automated integrity checks",
    "Parallel running period with real-time sync monitoring",
    "Field-level mapping documentation and custom object registry",
    "Team enablement and change management support",
  ],
  governance_card: {
    label: "Data governance",
    title: "Your data, protected throughout migration.",
    body: "Role-based access, encryption in transit, and audit trails on every record movement keep your data secure and your compliance team confident.",
    items: [
      "Encrypted data transfer pipelines",
      "Access-controlled staging environments",
      "Full audit trail of record movements",
    ],
  },
};

const fallbackCta = {
  title: "Ready to build a pipeline you can trust?",
  body: "Whether you're implementing from scratch or migrating from a system that's holding you back, we'll map the path to pipeline accuracy.",
  primary_cta: { label: "Book a Strategy Call", href: "/contact" },
  secondary_cta: {
    label: "Request a Migration Assessment",
    href: "/contact",
  },
};

/* ------------------------------------------------------------------ */
/*  Icon resolver                                                     */
/* ------------------------------------------------------------------ */

function PillarIcon({ icon, className }: { icon: string; className?: string }) {
  const cn = className ?? "h-5 w-5 text-emerald-400";
  switch (icon) {
    case "route":
      return <Route className={cn} />;
    case "zap":
      return <Zap className={cn} />;
    case "shield":
      return <ShieldCheck className={cn} />;
    default:
      return <Database className={cn} />;
  }
}

/* ------------------------------------------------------------------ */
/*  Page component                                                    */
/* ------------------------------------------------------------------ */

export default async function CrmPage() {
  const { sectionJson, sectionAttrs } = await loadPortalPageContent(
    PAGE_KEYS.CRM,
  );

  const hero = sectionJson(SECTION_KEYS.CRM.HERO, fallbackHero);
  const foundation = sectionJson(
    SECTION_KEYS.CRM.FOUNDATION,
    fallbackFoundation,
  );
  const migration = sectionJson(
    SECTION_KEYS.CRM.MIGRATION,
    fallbackMigration,
  );
  const cta = sectionJson(SECTION_KEYS.CRM.CTA, fallbackCta);

  /* ---- derived arrays (safe portal fallback) ---- */
  const dashboardMetrics =
    hero.dashboard?.metrics ?? fallbackHero.dashboard.metrics;
  const dashboardStages =
    hero.dashboard?.stages ?? fallbackHero.dashboard.stages;
  const flowSteps = foundation.flow?.steps ?? fallbackFoundation.flow.steps;
  const pillars = foundation.pillars ?? fallbackFoundation.pillars;
  const timelineGates =
    migration.timeline?.gates ?? fallbackMigration.timeline.gates;
  const safeguards = migration.safeguards ?? fallbackMigration.safeguards;
  const govItems =
    migration.governance_card?.items ??
    fallbackMigration.governance_card.items;

  return (
    <div className="space-y-28 md:space-y-36">
      {/* ======================================================== */}
      {/*  HERO                                                    */}
      {/* ======================================================== */}
      <section className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left — copy */}
        <div>
          <p
            className={sectionLabel}
            {...sectionAttrs(SECTION_KEYS.CRM.HERO)}
          >
            {hero.label}
          </p>

          <h1
            className="mt-6 max-w-2xl font-(--font-display) text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
            {...sectionAttrs(SECTION_KEYS.CRM.HERO)}
          >
            {hero.title}
          </h1>

          <p
            className="mt-5 max-w-xl text-lg leading-relaxed text-slate-400"
            {...sectionAttrs(SECTION_KEYS.CRM.HERO)}
          >
            {hero.body}
          </p>

          {/* Proof element */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
            <AnimatedMetric
              as="span"
              className="font-(--font-mono) text-2xl font-bold text-emerald-400"
              value={hero.proof?.metric ?? fallbackHero.proof.metric}
            />
            <span className="text-sm text-slate-400">
              {hero.proof?.label ?? fallbackHero.proof.label}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={hero.primary_cta?.href ?? "/contact"}
              className={primaryButton}
              {...sectionAttrs(SECTION_KEYS.CRM.HERO)}
            >
              {hero.primary_cta?.label ?? "Book a Strategy Call"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={hero.secondary_cta?.href ?? "/contact"}
              className={secondaryButton}
              {...sectionAttrs(SECTION_KEYS.CRM.HERO)}
            >
              {hero.secondary_cta?.label ?? "Request a Migration Assessment"}
            </Link>
          </div>
        </div>

        {/* Right — CRM dashboard wireframe */}
        <div className={darkCard}>
          <div className="flex items-center justify-between">
            <span
              className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500"
              {...sectionAttrs(SECTION_KEYS.CRM.HERO)}
            >
              {hero.dashboard?.label ?? fallbackHero.dashboard.label}
            </span>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              {hero.dashboard?.badge ?? fallbackHero.dashboard.badge}
            </span>
          </div>

          {/* Metric cards */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {dashboardMetrics.map(
              (
                m: { label: string; value: string; trend: string },
                idx: number,
              ) => (
                <div
                  key={`metric-${idx}`}
                  className="metric-card rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-center"
                >
                  <AnimatedMetric
                    as="p"
                    className="font-(--font-mono) text-lg font-bold text-cyan-400"
                    value={m.value}
                  />
                  <p className="mt-1 text-[11px] text-slate-500">{m.label}</p>
                  <p className="mt-1 text-xs font-medium text-emerald-400">
                    {m.trend}
                  </p>
                </div>
              ),
            )}
          </div>

          {/* Pipeline stages */}
          <div className="mt-5 flex items-center gap-1">
            {dashboardStages.map((stage: string, idx: number) => (
              <div key={`stage-${idx}`} className="flex flex-1 items-center">
                <div
                  className={`flex-1 rounded-lg px-2 py-2 text-center text-[10px] font-medium ${
                    idx === 0
                      ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                      : "border border-slate-800 bg-slate-950/40 text-slate-500"
                  }`}
                >
                  {stage}
                </div>
                {idx < dashboardStages.length - 1 && (
                  <ArrowRight className="mx-0.5 h-3 w-3 shrink-0 text-slate-700" />
                )}
              </div>
            ))}
          </div>

          {/* Skeleton rows */}
          <div className="mt-4 space-y-2">
            {[75, 60, 45].map((w) => (
              <div key={w} className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500/40" />
                <div
                  className="h-2 rounded-full bg-slate-800"
                  style={{ width: `${w}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/*  CRM FOUNDATION                                          */}
      {/* ======================================================== */}
      <section>
        <div className="max-w-3xl">
          <p
            className={sectionLabel}
            {...sectionAttrs(SECTION_KEYS.CRM.FOUNDATION)}
          >
            {foundation.label}
          </p>
          <h2
            className="mt-4 font-(--font-display) text-3xl font-semibold tracking-tight text-white md:text-4xl"
            {...sectionAttrs(SECTION_KEYS.CRM.FOUNDATION)}
          >
            {foundation.title}
          </h2>
          <p
            className="mt-4 text-lg leading-relaxed text-slate-400"
            {...sectionAttrs(SECTION_KEYS.CRM.FOUNDATION)}
          >
            {foundation.body}
          </p>
        </div>

        {/* Four pillars grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(
            (
              p: { title: string; detail: string; icon: string },
              idx: number,
            ) => (
              <div
                key={`pillar-${idx}`}
                className={softCard}
                {...sectionAttrs(SECTION_KEYS.CRM.FOUNDATION)}
              >
                <PillarIcon icon={p.icon} />
                <h3 className="mt-4 font-(--font-display) text-base font-semibold text-white">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {p.detail}
                </p>
              </div>
            ),
          )}
        </div>

        {/* Lead lifecycle flow — concrete example */}
        <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p
              className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400"
              {...sectionAttrs(SECTION_KEYS.CRM.FOUNDATION)}
            >
              {foundation.flow?.label ?? fallbackFoundation.flow.label}
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Clock className="h-3.5 w-3.5" />
              End-to-end in under 60 seconds
            </div>
          </div>

          <p
            className="mt-3 max-w-3xl font-(--font-mono) text-sm leading-relaxed text-slate-400"
            {...sectionAttrs(SECTION_KEYS.CRM.FOUNDATION)}
          >
            {foundation.flow?.description ??
              fallbackFoundation.flow.description}
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-5">
            {flowSteps.map(
              (
                step: { phase: string; detail: string },
                idx: number,
              ) => (
                <ScrollReveal key={`flow-${idx}`} delayMs={idx * 55}>
                  <div
                    className="metric-card relative rounded-xl border border-slate-800 bg-slate-950/50 p-4"
                  >
                    <div className="flex items-center gap-2">
                      <span className="data-flow-dot flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 font-(--font-mono) text-xs font-bold text-emerald-400">
                        {idx + 1}
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {step.phase}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500">
                      {step.detail}
                    </p>
                    {idx < flowSteps.length - 1 && (
                      <div className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 md:block">
                        <ArrowRight className="h-3.5 w-3.5 text-emerald-500/40" />
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/*  MIGRATION                                                */}
      {/* ======================================================== */}
      <section className="rounded-[2.5rem] border border-slate-800 bg-slate-900/60 px-8 py-16 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left — copy + safeguards */}
          <div>
            <p
              className={sectionLabel}
              {...sectionAttrs(SECTION_KEYS.CRM.MIGRATION)}
            >
              {migration.label}
            </p>
            <h2
              className="mt-4 font-(--font-display) text-3xl font-semibold tracking-tight text-white md:text-4xl"
              {...sectionAttrs(SECTION_KEYS.CRM.MIGRATION)}
            >
              {migration.title}
            </h2>
            <p
              className="mt-4 text-lg leading-relaxed text-slate-400"
              {...sectionAttrs(SECTION_KEYS.CRM.MIGRATION)}
            >
              {migration.body}
            </p>

            <div className="mt-8 space-y-3">
              {safeguards.map((item: string, idx: number) => (
                <div
                  key={`safeguard-${idx}`}
                  className="flex items-start gap-3 text-sm text-slate-300"
                  {...sectionAttrs(SECTION_KEYS.CRM.MIGRATION)}
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  {item}
                </div>
              ))}
            </div>

            {/* Governance sub-card */}
            <div
              className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6"
              {...sectionAttrs(SECTION_KEYS.CRM.MIGRATION)}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
                {migration.governance_card?.label ??
                  fallbackMigration.governance_card.label}
              </p>
              <h3 className="mt-3 font-(--font-display) text-lg font-semibold text-white">
                {migration.governance_card?.title ??
                  fallbackMigration.governance_card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {migration.governance_card?.body ??
                  fallbackMigration.governance_card.body}
              </p>
              <div className="mt-4 space-y-2">
                {govItems.map((item: string, idx: number) => (
                  <div
                    key={`gov-${idx}`}
                    className="flex items-center gap-3 text-sm text-slate-300"
                  >
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — timeline visual with gates */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
              {migration.timeline?.label ??
                fallbackMigration.timeline.label}
            </p>
            <div className="relative mt-6 space-y-0">
              {/* Vertical connector line */}
              <div className="absolute left-[15px] top-4 bottom-4 w-px bg-gradient-to-b from-emerald-500/60 via-emerald-500/30 to-slate-800" />

              {timelineGates.map(
                (
                  gate: {
                    phase: string;
                    week: string;
                    detail: string;
                    checkpoint: string;
                  },
                  idx: number,
                ) => (
                  <ScrollReveal key={`gate-${idx}`} className="timeline-step" delayMs={idx * 70}>
                    <div className="relative flex gap-5 pb-8 last:pb-0">
                      {/* Node */}
                      <div className="timeline-dot relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-500/40 bg-slate-950">
                        <GitMerge className="h-4 w-4 text-emerald-400" />
                      </div>

                      {/* Content */}
                      <div className="metric-card rounded-xl border border-slate-800 bg-slate-950/60 p-4 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm font-semibold text-white">
                            {gate.phase}
                          </h4>
                          <span className="font-(--font-mono) text-xs text-slate-500">
                            {gate.week}
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                          {gate.detail}
                        </p>
                        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[11px] font-medium text-cyan-400">
                          <CheckCircle2 className="h-3 w-3" />
                          Gate: {gate.checkpoint}
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/*  CTA                                                      */}
      {/* ======================================================== */}
      <section className="rounded-[2.5rem] border border-emerald-500/20 bg-gradient-to-br from-emerald-600 to-emerald-700 px-8 py-16 text-center shadow-[0_25px_60px_rgba(16,185,129,0.2)]">
        <h2
          className="mx-auto max-w-3xl font-(--font-display) text-3xl font-semibold tracking-tight text-white md:text-4xl"
          {...sectionAttrs(SECTION_KEYS.CRM.CTA)}
        >
          {cta.title}
        </h2>
        <p
          className="mx-auto mt-4 max-w-xl text-emerald-100/80"
          {...sectionAttrs(SECTION_KEYS.CRM.CTA)}
        >
          {cta.body}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href={cta.primary_cta?.href ?? "/contact"}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            {...sectionAttrs(SECTION_KEYS.CRM.CTA)}
          >
            {cta.primary_cta?.label ?? "Book a Strategy Call"}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href={cta.secondary_cta?.href ?? "/contact"}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            {...sectionAttrs(SECTION_KEYS.CRM.CTA)}
          >
            {cta.secondary_cta?.label ?? "Request a Migration Assessment"}
          </Link>
        </div>
      </section>
    </div>
  );
}
