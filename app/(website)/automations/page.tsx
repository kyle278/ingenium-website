import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  GitBranch,
  Gauge,
  RotateCcw,
  ShieldCheck,
  Timer,
  TrendingUp,
  Workflow,
  Zap,
} from "lucide-react";

import { PAGE_KEYS, SECTION_KEYS } from "@/src/lib/content-map";
import { loadPortalPageContent } from "@/src/lib/portal-page-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Marketing and Lead Routing Automation Services | Ingenium",
  description:
    "Marketing automation and lead routing built for speed and governance. Trigger-to-action workflows with SLA tracking and rollback controls.",
  openGraph: {
    title: "Marketing and Lead Routing Automation Services | Ingenium",
    description:
      "Marketing automation and lead routing built for speed, governance, and measurable pipeline impact.",
    url: "/automations",
  },
  alternates: { canonical: "/automations" },
};

/* ---------- shared dark-theme utility classes ---------- */

const primaryButton =
  "inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(16,185,129,0.25)] transition hover:bg-emerald-500";
const secondaryButton =
  "inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800";
const sectionLabel =
  "text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400";
const card =
  "rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-sm";
const softCard =
  "rounded-3xl border border-slate-800/60 bg-slate-900/50 p-6 shadow-[0_12px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm";

/* ---------- fallback content ---------- */

const fallbackHero = {
  label: "Marketing Automation",
  title: "Marketing automation and lead routing built for speed.",
  body: "Trigger-to-action workflows with SLA tracking, governance checkpoints, and rollback controls. Every automation connects to your CRM, website signals, and AI agents.",
  primary_cta: { label: "Book a Strategy Call", href: "/contact" },
  secondary_cta: { label: "Request a Workflow Audit", href: "/contact?intent=workflow-audit" },
  workflow_diagram: {
    label: "Workflow example",
    badge: "< 45s trigger-to-action",
    steps: [
      { action: "High-intent form submitted", timing: "0s", type: "trigger" },
      { action: "Enriched + lead scored", timing: "8s", type: "process" },
      { action: "Governance checkpoint passed", timing: "12s", type: "governance" },
      { action: "SDR notified in Slack", timing: "< 45s", type: "action" },
      { action: "Follow-up email if no response", timing: "2hr", type: "escalation" },
    ],
  },
};

const fallbackWorkflows = {
  label: "Workflow Capabilities",
  title: "Trigger-action workflows with timing guarantees.",
  body: "Each automation maps a trigger to a measurable action with SLA tracking, escalation paths, and failure handling built in.",
  workflows: [
    {
      title: "High-intent lead response",
      trigger: "Form submission with intent score > 80",
      action: "Enriched, scored, routed to SDR Slack in < 45s",
      escalation: "Follow-up email at 2hr if no SDR response",
      sla: "< 45 seconds",
    },
    {
      title: "Pipeline stall intervention",
      trigger: "Deal stalled > 7 days in stage",
      action: "AI generates re-engagement sequence + alerts owner",
      escalation: "Manager notified at 48hr if still stalled",
      sla: "Same-day action",
    },
    {
      title: "MQL-to-SQL handoff",
      trigger: "MQL threshold met via behavior scoring",
      action: "Auto-assign to territory owner, create task, enrich record",
      escalation: "Re-queue and notify ops if unaccepted in 4hr",
      sla: "< 2 minutes",
    },
    {
      title: "Customer lifecycle alerts",
      trigger: "Contract renewal within 90 days",
      action: "Generate health report, notify CS owner, schedule review",
      escalation: "Escalate to VP if NPS below threshold",
      sla: "24hr from trigger",
    },
  ],
  proof: {
    metric: "3.2x",
    label: "faster lead response time for enterprise clients using Ingenium workflows",
  },
};

const fallbackGovernance = {
  label: "Governance & Reliability",
  title: "Automations you can trust in production.",
  body: "Every workflow ships with rollback controls, monitoring, and an approval path. Nothing runs in production without testing and sign-off.",
  lifecycle: [
    {
      stage: "Build",
      detail: "Workflows built in staging with test data and simulated triggers.",
    },
    {
      stage: "Test",
      detail: "End-to-end validation with failure injection and edge case coverage.",
    },
    {
      stage: "Approve",
      detail: "Role-based approval gates before any production deployment.",
    },
    {
      stage: "Monitor",
      detail: "Real-time execution logs, SLA dashboards, and failure alerts.",
    },
    {
      stage: "Rollback",
      detail: "One-click rollback to previous version with audit trail preserved.",
    },
  ],
  controls: [
    "Version-controlled workflow definitions",
    "Staging environment with production parity",
    "Automated failure detection and circuit breakers",
    "Role-based deployment approvals",
    "Full audit trail on every execution",
    "SLA breach alerting with escalation paths",
  ],
};

const fallbackConnected = {
  label: "Conversion Tie-Back",
  title: "Every workflow maps to a revenue metric.",
  body: "Automations are not task runners. Each one connects to a KPI so you can measure the impact on pipeline velocity, response time, and conversion rate.",
  dashboard: [
    {
      workflow: "High-intent lead response",
      metric: "Lead response time",
      before: "4.2 hours avg",
      after: "38 seconds avg",
      impact: "-99% response time",
    },
    {
      workflow: "MQL-to-SQL handoff",
      metric: "SQL conversion rate",
      before: "12% conversion",
      after: "28% conversion",
      impact: "+133% improvement",
    },
    {
      workflow: "Pipeline stall intervention",
      metric: "Deal velocity",
      before: "34 day avg cycle",
      after: "21 day avg cycle",
      impact: "-38% cycle time",
    },
    {
      workflow: "Lifecycle alerts",
      metric: "Renewal rate",
      before: "78% renewal",
      after: "91% renewal",
      impact: "+17% retention",
    },
  ],
  note: "Metrics shown are representative of client outcomes. Actual results vary by implementation.",
};

const fallbackCta = {
  title: "Ready to automate with speed and governance?",
  body: "Book a strategy call to map your automation priorities, or request a workflow audit to identify your highest-impact opportunities.",
  primary_cta: { label: "Book a Strategy Call", href: "/contact" },
  secondary_cta: { label: "Request a Workflow Audit", href: "/contact?intent=workflow-audit" },
};

/* ---------- page component ---------- */

export default async function AutomationsPage() {
  const { sectionJson, sectionAttrs } = await loadPortalPageContent(
    PAGE_KEYS.AUTOMATIONS,
  );

  const hero = sectionJson(SECTION_KEYS.AUTOMATIONS.HERO, fallbackHero);
  const workflows = sectionJson(SECTION_KEYS.AUTOMATIONS.WORKFLOWS, fallbackWorkflows);
  const governance = sectionJson(SECTION_KEYS.AUTOMATIONS.GOVERNANCE, fallbackGovernance);
  const connected = sectionJson(SECTION_KEYS.AUTOMATIONS.CONNECTED, fallbackConnected);
  const cta = sectionJson(SECTION_KEYS.AUTOMATIONS.CTA, fallbackCta);

  const stepTypeStyles: Record<string, string> = {
    trigger: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
    process: "border-cyan-500/40 bg-cyan-500/10 text-cyan-400",
    governance: "border-amber-500/40 bg-amber-500/10 text-amber-400",
    action: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
    escalation: "border-slate-600 bg-slate-800 text-slate-400",
  };

  return (
    <div className="space-y-28 md:space-y-36">
      {/* ========== 1 · HERO / WORKFLOW DIAGRAM ========== */}
      <section className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p
            className={sectionLabel}
            {...sectionAttrs(SECTION_KEYS.AUTOMATIONS.HERO)}
          >
            {hero.label}
          </p>
          <h1
            className="mt-6 max-w-2xl font-(--font-display) text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]"
            {...sectionAttrs(SECTION_KEYS.AUTOMATIONS.HERO)}
          >
            {hero.title}
          </h1>
          <p
            className="mt-5 max-w-xl text-lg leading-relaxed text-slate-400"
            {...sectionAttrs(SECTION_KEYS.AUTOMATIONS.HERO)}
          >
            {hero.body}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={hero.primary_cta?.href ?? "/contact"}
              className={primaryButton}
              {...sectionAttrs(SECTION_KEYS.AUTOMATIONS.HERO)}
            >
              {hero.primary_cta?.label ?? "Book a Strategy Call"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={hero.secondary_cta?.href ?? "/contact?intent=workflow-audit"}
              className={secondaryButton}
              {...sectionAttrs(SECTION_KEYS.AUTOMATIONS.HERO)}
            >
              {hero.secondary_cta?.label ?? "Request a Workflow Audit"}
            </Link>
          </div>
        </div>

        {/* Workflow diagram card */}
        <div className={card}>
          <div className="flex items-center justify-between">
            <span
              className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500"
              {...sectionAttrs(SECTION_KEYS.AUTOMATIONS.HERO)}
            >
              {hero.workflow_diagram?.label ?? fallbackHero.workflow_diagram.label}
            </span>
            <span
              className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-(--font-mono) text-xs font-semibold text-emerald-400"
              {...sectionAttrs(SECTION_KEYS.AUTOMATIONS.HERO)}
            >
              {hero.workflow_diagram?.badge ?? fallbackHero.workflow_diagram.badge}
            </span>
          </div>

          <div className="relative mt-6 space-y-0">
            {(hero.workflow_diagram?.steps ?? fallbackHero.workflow_diagram.steps).map(
              (step: { action: string; timing: string; type: string }, idx: number) => {
                const styles = stepTypeStyles[step.type] ?? stepTypeStyles.process;
                const isLast =
                  idx ===
                  (hero.workflow_diagram?.steps ?? fallbackHero.workflow_diagram.steps).length - 1;

                return (
                  <div key={step.action} className="relative flex items-stretch gap-4">
                    {/* Vertical connector line */}
                    <div className="flex w-10 flex-col items-center">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${styles}`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      {!isLast && (
                        <div className="w-px grow bg-gradient-to-b from-slate-700 to-slate-800" />
                      )}
                    </div>

                    {/* Step content */}
                    <div className="pb-5">
                      <p
                        className="text-sm font-medium text-slate-200"
                        {...sectionAttrs(SECTION_KEYS.AUTOMATIONS.HERO)}
                      >
                        {step.action}
                      </p>
                      <p className="mt-0.5 font-(--font-mono) text-xs text-slate-500">
                        {step.type === "escalation" ? `Escalation @ ${step.timing}` : `T+ ${step.timing}`}
                      </p>
                    </div>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* ========== 2 · WORKFLOW CAPABILITIES ========== */}
      <section>
        <div className="mb-12 max-w-2xl">
          <p
            className={sectionLabel}
            {...sectionAttrs(SECTION_KEYS.AUTOMATIONS.WORKFLOWS)}
          >
            {workflows.label}
          </p>
          <h2
            className="mt-4 font-(--font-display) text-3xl font-semibold tracking-tight text-white md:text-4xl"
            {...sectionAttrs(SECTION_KEYS.AUTOMATIONS.WORKFLOWS)}
          >
            {workflows.title}
          </h2>
          <p
            className="mt-4 text-lg leading-relaxed text-slate-400"
            {...sectionAttrs(SECTION_KEYS.AUTOMATIONS.WORKFLOWS)}
          >
            {workflows.body}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {(workflows.workflows ?? fallbackWorkflows.workflows).map(
            (wf: {
              title: string;
              trigger: string;
              action: string;
              escalation: string;
              sla: string;
            }) => (
              <div
                key={wf.title}
                className={`${softCard} group transition hover:border-slate-700`}
                {...sectionAttrs(SECTION_KEYS.AUTOMATIONS.WORKFLOWS)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10">
                    <Workflow className="h-4 w-4 text-emerald-400" />
                  </div>
                  <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 font-(--font-mono) text-[11px] font-semibold text-cyan-400">
                    SLA {wf.sla}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">
                  {wf.title}
                </h3>

                <div className="mt-4 space-y-2.5">
                  <div className="flex items-start gap-2.5 text-sm">
                    <Zap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    <span className="text-slate-400">
                      <span className="font-medium text-slate-300">Trigger:</span> {wf.trigger}
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm">
                    <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-400" />
                    <span className="text-slate-400">
                      <span className="font-medium text-slate-300">Action:</span> {wf.action}
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm">
                    <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                    <span className="text-slate-400">
                      <span className="font-medium text-slate-300">Escalation:</span>{" "}
                      {wf.escalation}
                    </span>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>

        {/* Proof element */}
        <div
          className="mt-8 flex items-center gap-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-6 py-5"
          {...sectionAttrs(SECTION_KEYS.AUTOMATIONS.WORKFLOWS)}
        >
          <TrendingUp className="h-6 w-6 shrink-0 text-emerald-400" />
          <p className="text-sm text-slate-300">
            <span className="font-(--font-mono) text-2xl font-bold text-emerald-400">
              {workflows.proof?.metric ?? fallbackWorkflows.proof.metric}
            </span>{" "}
            {workflows.proof?.label ?? fallbackWorkflows.proof.label}
          </p>
        </div>
      </section>

      {/* ========== 3 · GOVERNANCE ========== */}
      <section className="rounded-[2.5rem] border border-slate-800 bg-slate-900/60 px-8 py-16 shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-sm">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr]">
          {/* Left: lifecycle pipeline */}
          <div>
            <p
              className={sectionLabel}
              {...sectionAttrs(SECTION_KEYS.AUTOMATIONS.GOVERNANCE)}
            >
              {governance.label}
            </p>
            <h2
              className="mt-4 font-(--font-display) text-3xl font-semibold tracking-tight text-white md:text-4xl"
              {...sectionAttrs(SECTION_KEYS.AUTOMATIONS.GOVERNANCE)}
            >
              {governance.title}
            </h2>
            <p
              className="mt-4 text-lg leading-relaxed text-slate-400"
              {...sectionAttrs(SECTION_KEYS.AUTOMATIONS.GOVERNANCE)}
            >
              {governance.body}
            </p>

            {/* Lifecycle stages */}
            <div className="mt-8 space-y-0">
              {(governance.lifecycle ?? fallbackGovernance.lifecycle).map(
                (item: { stage: string; detail: string }, idx: number) => {
                  const isLast =
                    idx ===
                    (governance.lifecycle ?? fallbackGovernance.lifecycle).length - 1;

                  return (
                    <div key={item.stage} className="relative flex items-stretch gap-4">
                      <div className="flex w-8 flex-col items-center">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10">
                          {idx === 0 && <GitBranch className="h-3.5 w-3.5 text-emerald-400" />}
                          {idx === 1 && <Gauge className="h-3.5 w-3.5 text-emerald-400" />}
                          {idx === 2 && <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />}
                          {idx === 3 && <Timer className="h-3.5 w-3.5 text-emerald-400" />}
                          {idx === 4 && <RotateCcw className="h-3.5 w-3.5 text-emerald-400" />}
                        </div>
                        {!isLast && (
                          <div className="w-px grow bg-gradient-to-b from-slate-700 to-slate-800" />
                        )}
                      </div>
                      <div className="pb-5">
                        <p
                          className="text-sm font-semibold text-white"
                          {...sectionAttrs(SECTION_KEYS.AUTOMATIONS.GOVERNANCE)}
                        >
                          {item.stage}
                        </p>
                        <p className="mt-0.5 text-sm text-slate-400">{item.detail}</p>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>

          {/* Right: controls list */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Production Controls
            </p>
            <div className="mt-6 space-y-4">
              {(governance.controls ?? fallbackGovernance.controls).map(
                (item: string) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-slate-300"
                    {...sectionAttrs(SECTION_KEYS.AUTOMATIONS.GOVERNANCE)}
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                    {item}
                  </div>
                ),
              )}
            </div>
            <div className="mt-8 rounded-xl border border-dashed border-slate-700 bg-slate-900/60 p-4">
              <p className="text-xs text-slate-500">
                Every workflow includes a rollback path. If a deployment introduces a regression, revert to the previous version in one click while preserving the full execution audit trail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 4 · CONVERSION TIE-BACK / KPI DASHBOARD ========== */}
      <section>
        <div className="mb-12 max-w-2xl">
          <p
            className={sectionLabel}
            {...sectionAttrs(SECTION_KEYS.AUTOMATIONS.CONNECTED)}
          >
            {connected.label}
          </p>
          <h2
            className="mt-4 font-(--font-display) text-3xl font-semibold tracking-tight text-white md:text-4xl"
            {...sectionAttrs(SECTION_KEYS.AUTOMATIONS.CONNECTED)}
          >
            {connected.title}
          </h2>
          <p
            className="mt-4 text-lg leading-relaxed text-slate-400"
            {...sectionAttrs(SECTION_KEYS.AUTOMATIONS.CONNECTED)}
          >
            {connected.body}
          </p>
        </div>

        {/* Dashboard-style KPI grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {(connected.dashboard ?? fallbackConnected.dashboard).map(
            (row: {
              workflow: string;
              metric: string;
              before: string;
              after: string;
              impact: string;
            }) => (
              <div
                key={row.workflow}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm transition hover:border-slate-700"
                {...sectionAttrs(SECTION_KEYS.AUTOMATIONS.CONNECTED)}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {row.metric}
                  </p>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-(--font-mono) text-[11px] font-bold text-emerald-400">
                    {row.impact}
                  </span>
                </div>
                <p className="mt-3 text-sm font-medium text-white">{row.workflow}</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                      Before
                    </p>
                    <p className="mt-1 font-(--font-mono) text-sm text-slate-400">{row.before}</p>
                  </div>
                  <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-3 py-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-cyan-600">
                      After
                    </p>
                    <p className="mt-1 font-(--font-mono) text-sm font-semibold text-cyan-400">
                      {row.after}
                    </p>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>

        {/* Disclaimer note */}
        <p
          className="mt-4 text-center text-xs text-slate-600"
          {...sectionAttrs(SECTION_KEYS.AUTOMATIONS.CONNECTED)}
        >
          {connected.note ?? fallbackConnected.note}
        </p>
      </section>

      {/* ========== 5 · FINAL CTA ========== */}
      <section className="rounded-[2.5rem] border border-emerald-500/20 bg-gradient-to-br from-emerald-600 to-emerald-700 px-8 py-16 text-center shadow-[0_25px_60px_rgba(16,185,129,0.2)]">
        <h2
          className="mx-auto max-w-3xl font-(--font-display) text-3xl font-semibold tracking-tight text-white md:text-4xl"
          {...sectionAttrs(SECTION_KEYS.AUTOMATIONS.CTA)}
        >
          {cta.title}
        </h2>
        <p
          className="mx-auto mt-4 max-w-xl text-emerald-100/80"
          {...sectionAttrs(SECTION_KEYS.AUTOMATIONS.CTA)}
        >
          {cta.body}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href={cta.primary_cta?.href ?? "/contact"}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            {...sectionAttrs(SECTION_KEYS.AUTOMATIONS.CTA)}
          >
            {cta.primary_cta?.label ?? "Book a Strategy Call"}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href={cta.secondary_cta?.href ?? "/contact?intent=workflow-audit"}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            {...sectionAttrs(SECTION_KEYS.AUTOMATIONS.CTA)}
          >
            {cta.secondary_cta?.label ?? "Request a Workflow Audit"}
          </Link>
        </div>
      </section>
    </div>
  );
}
