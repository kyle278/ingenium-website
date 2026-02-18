import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  FileText,
  LineChart,
  Lock,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

import { PAGE_KEYS, SECTION_KEYS } from "@/src/lib/content-map";
import { loadPortalPageContent } from "@/src/lib/portal-page-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "AI Agents for Marketing and Sales Teams | Ingenium",
  description:
    "Deploy governed AI agents across marketing and sales workflows. Human-approved, measurable, and integrated into your revenue stack.",
  openGraph: {
    title: "AI Agents for Marketing and Sales Teams | Ingenium",
    description:
      "Deploy governed AI agents across marketing and sales workflows with human approvals and measurable outcomes.",
    url: "/agents",
  },
  alternates: { canonical: "/agents" },
};

/* ------------------------------------------------------------------ */
/*  Reusable style tokens                                             */
/* ------------------------------------------------------------------ */

const sectionLabel =
  "font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400";

const darkCard =
  "rounded-xl border border-slate-800 bg-slate-900/40 p-6";

const primaryButton =
  "inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(16,185,129,0.25)] transition hover:bg-emerald-500";

const secondaryButton =
  "inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-600 hover:text-white";

const ghostButton =
  "inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 transition hover:text-emerald-300";

/* ------------------------------------------------------------------ */
/*  Fallback content (portal-overridable)                             */
/* ------------------------------------------------------------------ */

const fallbackHero = {
  label: "AI Agents for Revenue Teams",
  title: "AI agents that close gaps in your marketing and sales workflows.",
  body: "Deploy governed, human-approved agents across marketing ops, sales development, and RevOps. Every action is measurable, every output auditable.",
  primary_cta: { label: "Book a Strategy Call", href: "/contact" },
  secondary_cta: { label: "Explore Agent Departments", href: "/departments" },
  workflow: {
    label: "Agent workflow",
    badge: "Human-approved",
    steps: [
      { phase: "Trigger", detail: "High-intent signal detected on website" },
      { phase: "Execute", detail: "Agent researches account and drafts brief" },
      { phase: "Review", detail: "Human approves or edits the output" },
      { phase: "Output", detail: "Brief delivered to SDR with full context" },
    ],
  },
  proof: {
    metric: "90s",
    context: "Average time from trigger to SDR-ready brief",
    client_type: "B2B SaaS, 50-person sales team",
    timeframe: "First 30 days",
  },
};

const fallbackCapabilities = {
  label: "Capabilities",
  title: "Role-specific agents for every revenue function.",
  body: "Each agent is scoped to a workflow, produces concrete outputs, and reports to your governance model.",
  roles: [
    {
      role: "Marketing Ops",
      icon: "sparkles",
      outputs: [
        "Content briefs from competitor and keyword signals",
        "Campaign QA checks before launch",
        "Audience segmentation based on behavioral data",
        "Performance summaries with attribution",
      ],
    },
    {
      role: "SDR / Sales",
      icon: "target",
      outputs: [
        "Pre-call research briefs in 90 seconds",
        "Lead qualification scoring from intent data",
        "Next-best-action recommendations per deal",
        "Personalized outreach drafts per account",
      ],
    },
    {
      role: "RevOps",
      icon: "chart",
      outputs: [
        "CRM data hygiene and deduplication",
        "Attribution model validation",
        "Pipeline health alerts and stall detection",
        "Executive reporting summaries",
      ],
    },
  ],
  mid_cta: { label: "See how agents are organized", href: "/departments" },
};

const fallbackGovernance = {
  label: "Governance",
  title: "Every agent action passes through a human approval gate.",
  body: "No black-box outputs. Every agent follows an explicit approval lifecycle with full audit trails.",
  lifecycle: [
    { step: "Trigger", description: "Signal or schedule initiates the agent", icon: "zap" },
    { step: "Agent Action", description: "Agent executes scoped task", icon: "bot" },
    { step: "Human Review", description: "Designated approver reviews output", icon: "users" },
    { step: "Approved Output", description: "Output delivered to workflow", icon: "check" },
    { step: "Audit Log", description: "Full record stored for compliance", icon: "lock" },
  ],
  controls: [
    "Role-based approval permissions",
    "Escalation paths for sensitive actions",
    "Version control on every output",
    "Security and compliance documentation",
  ],
};

const fallbackImpact = {
  label: "Impact",
  title: "Before and after: measurable workflow improvements.",
  body: "Real KPI changes from governed agent deployments across marketing and sales teams.",
  cases: [
    {
      before: "SDR spends 45 min researching each prospect",
      after: "Agent delivers complete brief in 90 seconds",
      metric: "30x",
      metric_label: "faster research",
    },
    {
      before: "Marketing team produces 4 content briefs per week",
      after: "Agent generates 20+ briefs with human QA",
      metric: "5x",
      metric_label: "content velocity",
    },
    {
      before: "RevOps runs manual data hygiene quarterly",
      after: "Agent flags and fixes data issues continuously",
      metric: "92%",
      metric_label: "cleaner pipeline data",
    },
  ],
  dashboard: {
    label: "Agent performance dashboard",
    metrics: [
      { value: "2,847", label: "Tasks completed", trend: "+34% MoM" },
      { value: "99.2%", label: "Approval rate" },
      { value: "< 2 min", label: "Avg. execution time" },
      { value: "0", label: "Unreviewed outputs" },
    ],
  },
};

const fallbackCta = {
  title: "Deploy AI agents that your team actually trusts.",
  body: "Map your agent strategy, define governance rules, and see a sample playbook tailored to your revenue workflow.",
  primary_cta: { label: "Book a Strategy Call", href: "/contact" },
  secondary_cta: { label: "View a Sample Agent Playbook", href: "/contact?intent=playbook" },
};

/* ------------------------------------------------------------------ */
/*  Icon resolver                                                     */
/* ------------------------------------------------------------------ */

function getCapabilityIcon(name: string | undefined) {
  switch (name) {
    case "sparkles":
      return Sparkles;
    case "target":
      return Target;
    case "chart":
      return LineChart;
    default:
      return Bot;
  }
}

function getLifecycleIcon(name: string | undefined) {
  switch (name) {
    case "zap":
      return Zap;
    case "bot":
      return Bot;
    case "users":
      return Users;
    case "check":
      return CheckCircle2;
    case "lock":
      return Lock;
    default:
      return Bot;
  }
}

/* ================================================================== */
/*  Page component                                                    */
/* ================================================================== */

export default async function AgentsPage() {
  const { sectionJson, sectionAttrs } = await loadPortalPageContent(PAGE_KEYS.AGENTS);

  const hero = sectionJson(SECTION_KEYS.AGENTS.HERO, fallbackHero);
  const capabilities = sectionJson(SECTION_KEYS.AGENTS.CAPABILITIES, fallbackCapabilities);
  const governance = sectionJson(SECTION_KEYS.AGENTS.GOVERNANCE, fallbackGovernance);
  const impact = sectionJson(SECTION_KEYS.AGENTS.IMPACT, fallbackImpact);
  const cta = sectionJson(SECTION_KEYS.AGENTS.CTA, fallbackCta);

  const workflowSteps = hero.workflow?.steps ?? fallbackHero.workflow.steps;
  const proof = hero.proof ?? fallbackHero.proof;
  const roles = capabilities.roles ?? fallbackCapabilities.roles;
  const lifecycle = governance.lifecycle ?? fallbackGovernance.lifecycle;
  const controls = governance.controls ?? fallbackGovernance.controls;
  const cases = impact.cases ?? fallbackImpact.cases;
  const dashboard = impact.dashboard ?? fallbackImpact.dashboard;

  return (
    <div className="space-y-28 md:space-y-36">
      {/* ============================================================ */}
      {/*  1. HERO / WORKFLOW                                          */}
      {/* ============================================================ */}
      <section className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left: copy */}
        <div>
          <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.AGENTS.HERO)}>
            {hero.label}
          </p>
          <h1
            className="mt-5 max-w-2xl font-(--font-display) text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]"
            {...sectionAttrs(SECTION_KEYS.AGENTS.HERO)}
          >
            {hero.title}
          </h1>
          <p
            className="mt-5 max-w-xl font-(--font-body) text-lg leading-relaxed text-slate-400"
            {...sectionAttrs(SECTION_KEYS.AGENTS.HERO)}
          >
            {hero.body}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={hero.primary_cta?.href ?? "/contact"}
              className={primaryButton}
              {...sectionAttrs(SECTION_KEYS.AGENTS.HERO)}
            >
              {hero.primary_cta?.label ?? "Book a Strategy Call"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={hero.secondary_cta?.href ?? "/departments"}
              className={secondaryButton}
              {...sectionAttrs(SECTION_KEYS.AGENTS.HERO)}
            >
              {hero.secondary_cta?.label ?? "Explore Agent Departments"}
            </Link>
          </div>

          {/* Proof element */}
          <div className="mt-10 flex items-center gap-4 rounded-lg border border-slate-800/60 bg-slate-900/30 px-5 py-4">
            <span className="font-(--font-display) text-3xl font-bold text-emerald-400">
              {proof.metric}
            </span>
            <div className="text-sm leading-snug">
              <p className="text-slate-300" {...sectionAttrs(SECTION_KEYS.AGENTS.HERO)}>
                {proof.context}
              </p>
              <p className="mt-0.5 text-slate-500" {...sectionAttrs(SECTION_KEYS.AGENTS.HERO)}>
                {proof.client_type} &middot; {proof.timeframe}
              </p>
            </div>
          </div>
        </div>

        {/* Right: workflow diagram */}
        <div className={darkCard}>
          <div className="flex items-center justify-between">
            <span
              className="font-(--font-mono) text-xs uppercase tracking-widest text-slate-500"
              {...sectionAttrs(SECTION_KEYS.AGENTS.HERO)}
            >
              {hero.workflow?.label ?? fallbackHero.workflow.label}
            </span>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              {hero.workflow?.badge ?? fallbackHero.workflow.badge}
            </span>
          </div>

          <div className="relative mt-8 space-y-0">
            {workflowSteps.map(
              (step: { phase: string; detail: string }, idx: number) => (
                <div key={step.phase} className="relative flex gap-4 pb-6 last:pb-0">
                  {/* Vertical connector line */}
                  {idx < workflowSteps.length - 1 && (
                    <div className="absolute top-8 left-[15px] h-[calc(100%-2rem)] w-px bg-gradient-to-b from-emerald-500/40 to-slate-800" />
                  )}
                  {/* Step marker */}
                  <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
                    <span className="font-(--font-mono) text-xs font-bold text-emerald-400">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  {/* Step content */}
                  <div className="pt-1">
                    <p className="text-sm font-semibold text-white">{step.phase}</p>
                    <p className="mt-0.5 text-sm text-slate-500">{step.detail}</p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. CAPABILITIES                                             */}
      {/* ============================================================ */}
      <section>
        <div className="max-w-2xl">
          <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.AGENTS.CAPABILITIES)}>
            {capabilities.label}
          </p>
          <h2
            className="mt-4 font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl"
            {...sectionAttrs(SECTION_KEYS.AGENTS.CAPABILITIES)}
          >
            {capabilities.title}
          </h2>
          <p
            className="mt-4 text-lg leading-relaxed text-slate-400"
            {...sectionAttrs(SECTION_KEYS.AGENTS.CAPABILITIES)}
          >
            {capabilities.body}
          </p>
        </div>

        {/* Role cards -- stacked full-width rows, not a uniform grid */}
        <div className="mt-12 space-y-6">
          {roles.map(
            (
              role: { role: string; icon: string; outputs: string[] },
              idx: number,
            ) => {
              const Icon = getCapabilityIcon(role.icon);
              // Alternate layout: text left / outputs right on even, flipped on odd
              const reversed = idx % 2 !== 0;
              return (
                <div
                  key={role.role}
                  className={`${darkCard} grid items-start gap-6 lg:grid-cols-[1fr_1.5fr] ${reversed ? "lg:direction-rtl" : ""}`}
                  {...sectionAttrs(SECTION_KEYS.AGENTS.CAPABILITIES)}
                >
                  <div className={reversed ? "lg:direction-ltr" : ""}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
                        <Icon className="h-5 w-5 text-emerald-400" />
                      </div>
                      <h3 className="font-(--font-display) text-lg font-bold text-white">
                        {role.role}
                      </h3>
                    </div>
                  </div>
                  <div className={`grid gap-3 sm:grid-cols-2 ${reversed ? "lg:direction-ltr" : ""}`}>
                    {role.outputs.map((output: string) => (
                      <div
                        key={output}
                        className="flex items-start gap-2.5 rounded-lg border border-slate-800/60 bg-slate-950/50 px-4 py-3 text-sm text-slate-300"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500/70" />
                        <span>{output}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            },
          )}
        </div>

        {/* Mid-page CTA */}
        <div className="mt-8 flex justify-center">
          <Link
            href={capabilities.mid_cta?.href ?? "/departments"}
            className={ghostButton}
            {...sectionAttrs(SECTION_KEYS.AGENTS.CAPABILITIES)}
          >
            {capabilities.mid_cta?.label ?? "See how agents are organized"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  3. GOVERNANCE                                               */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/30 px-6 py-16 sm:px-10 lg:px-16">
        {/* Dot grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgb(148 163 184) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          {/* Left: copy + controls */}
          <div>
            <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.AGENTS.GOVERNANCE)}>
              {governance.label}
            </p>
            <h2
              className="mt-4 font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl"
              {...sectionAttrs(SECTION_KEYS.AGENTS.GOVERNANCE)}
            >
              {governance.title}
            </h2>
            <p
              className="mt-4 text-base leading-relaxed text-slate-400"
              {...sectionAttrs(SECTION_KEYS.AGENTS.GOVERNANCE)}
            >
              {governance.body}
            </p>
            <div className="mt-8 space-y-3">
              {controls.map((item: string) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-slate-300"
                  {...sectionAttrs(SECTION_KEYS.AGENTS.GOVERNANCE)}
                >
                  <ShieldCheck className="h-4 w-4 text-emerald-500/70" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right: approval lifecycle diagram */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6">
            <p className="font-(--font-mono) text-xs uppercase tracking-widest text-slate-500">
              Approval lifecycle
            </p>
            <div className="relative mt-6 space-y-0">
              {lifecycle.map(
                (
                  item: { step: string; description: string; icon: string },
                  idx: number,
                ) => {
                  const Icon = getLifecycleIcon(item.icon);
                  return (
                    <div key={item.step} className="relative flex gap-4 pb-6 last:pb-0">
                      {idx < lifecycle.length - 1 && (
                        <div className="absolute top-10 left-[17px] h-[calc(100%-2.5rem)] w-px bg-gradient-to-b from-emerald-500/30 to-slate-800/50" />
                      )}
                      <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-900">
                        <Icon className="h-4 w-4 text-emerald-400" />
                      </div>
                      <div className="pt-1">
                        <p className="text-sm font-semibold text-white">{item.step}</p>
                        <p className="mt-0.5 text-sm text-slate-500">{item.description}</p>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  4. IMPACT / USE CASES                                       */}
      {/* ============================================================ */}
      <section>
        <div className="max-w-2xl">
          <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.AGENTS.IMPACT)}>
            {impact.label}
          </p>
          <h2
            className="mt-4 font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl"
            {...sectionAttrs(SECTION_KEYS.AGENTS.IMPACT)}
          >
            {impact.title}
          </h2>
          <p
            className="mt-4 text-lg leading-relaxed text-slate-400"
            {...sectionAttrs(SECTION_KEYS.AGENTS.IMPACT)}
          >
            {impact.body}
          </p>
        </div>

        {/* Before/After cards -- horizontal layout, not card grid */}
        <div className="mt-12 space-y-5">
          {cases.map(
            (c: {
              before: string;
              after: string;
              metric: string;
              metric_label: string;
            }) => (
              <div
                key={c.metric_label}
                className="grid items-center gap-6 rounded-xl border border-slate-800 bg-slate-900/40 p-6 md:grid-cols-[1fr_auto_1fr]"
                {...sectionAttrs(SECTION_KEYS.AGENTS.IMPACT)}
              >
                {/* Before */}
                <div>
                  <span className="font-(--font-mono) text-[11px] uppercase tracking-widest text-slate-600">
                    Before
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {c.before}
                  </p>
                </div>

                {/* Metric */}
                <div className="flex flex-col items-center justify-center">
                  <ArrowRight className="mb-1 hidden h-5 w-5 text-emerald-500/50 md:block" />
                  <span className="font-(--font-display) text-3xl font-bold text-emerald-400">
                    {c.metric}
                  </span>
                  <span className="mt-1 font-(--font-mono) text-xs text-emerald-400/70">
                    {c.metric_label}
                  </span>
                </div>

                {/* After */}
                <div>
                  <span className="font-(--font-mono) text-[11px] uppercase tracking-widest text-emerald-500/60">
                    After
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-white">
                    {c.after}
                  </p>
                </div>
              </div>
            ),
          )}
        </div>

        {/* Dashboard-style metrics */}
        <div className="relative mt-12 overflow-hidden rounded-xl border border-slate-800 bg-slate-900/30 p-6">
          {/* Grid-lines background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgb(148 163 184) 1px, transparent 1px), linear-gradient(to bottom, rgb(148 163 184) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="relative">
            <p
              className="font-(--font-mono) text-xs uppercase tracking-widest text-slate-500"
              {...sectionAttrs(SECTION_KEYS.AGENTS.IMPACT)}
            >
              {dashboard.label}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {dashboard.metrics.map(
                (m: { value: string; label: string; trend?: string }) => (
                  <div
                    key={m.label}
                    className="rounded-lg border border-slate-800/60 bg-slate-950/50 p-4"
                  >
                    <p className="font-(--font-display) text-2xl font-bold text-cyan-400">
                      {m.value}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">{m.label}</p>
                    {m.trend && (
                      <p className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-400">
                        <TrendingUp className="h-3 w-3" />
                        {m.trend}
                      </p>
                    )}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  5. FINAL CTA                                                */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-600/10 via-slate-900/80 to-slate-950 px-6 py-16 text-center sm:px-12">
        {/* Subtle dot-grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgb(52 211 153) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative">
          <h2
            className="mx-auto max-w-3xl font-(--font-display) text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl"
            {...sectionAttrs(SECTION_KEYS.AGENTS.CTA)}
          >
            {cta.title}
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-400"
            {...sectionAttrs(SECTION_KEYS.AGENTS.CTA)}
          >
            {cta.body}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={cta.primary_cta?.href ?? "/contact"}
              className={primaryButton}
              {...sectionAttrs(SECTION_KEYS.AGENTS.CTA)}
            >
              {cta.primary_cta?.label ?? "Book a Strategy Call"}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href={cta.secondary_cta?.href ?? "/contact?intent=playbook"}
              className={secondaryButton}
              {...sectionAttrs(SECTION_KEYS.AGENTS.CTA)}
            >
              {cta.secondary_cta?.label ?? "View a Sample Agent Playbook"}
              <FileText className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
