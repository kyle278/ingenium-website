import {
  ArrowRight,
  Bot,
  ChartColumn,
  CheckCircle2,
  LayoutTemplate,
  Shield,
  Sparkles,
  Workflow,
} from "lucide-react";

import ScrollReveal from "./ScrollReveal";
import { MonoTag, SurfaceCard } from "./sitePrimitives";

export function SystemStackVisual() {
  const stages = [
    { label: "Website lead", value: "12 new form submissions", tone: "bg-emerald-100 text-emerald-700" },
    { label: "Pipeline updated", value: "4 deals moved today", tone: "bg-blue-100 text-blue-700" },
    { label: "AI suggestions", value: "7 next steps prepared", tone: "bg-cyan-100 text-cyan-700" },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[620px]">
      <div className="absolute inset-x-10 top-10 h-40 rounded-full bg-[rgba(18,121,255,0.10)] blur-3xl" />
      <SurfaceCard className="relative overflow-hidden p-0">
        <div className="grid-lines absolute inset-0 opacity-40" />
        <div className="relative border-b border-[var(--color-line)] px-6 py-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-[var(--color-brand)]">
                Product overview
              </p>
              <h3 className="mt-3 font-[var(--font-display)] text-2xl font-semibold tracking-[-0.04em] text-[var(--color-text)]">
                Website, CRM, automation, AI, and reporting in one view.
              </h3>
            </div>
            <MonoTag className="bg-white/80 text-[var(--color-brand)]">Portal-linked</MonoTag>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {stages.map((stage) => (
              <div key={stage.label} className="rounded-2xl border border-[var(--color-line)] bg-white/76 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">{stage.label}</p>
                <p className="mt-2 text-base font-semibold text-[var(--color-text)]">{stage.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative grid gap-4 px-5 py-5 lg:grid-cols-[1.05fr,0.95fr]">
          <div className="rounded-[28px] border border-[var(--color-line)] bg-white/82 p-5 shadow-[0_18px_40px_rgba(22,32,51,0.05)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[var(--color-text)]">Lead capture</p>
                <p className="mt-1 text-sm text-[var(--color-text-soft)]">Form, source, service, urgency</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                Live
              </span>
            </div>
            <div className="mt-5 grid gap-3">
              {[
                ["Request", "Revenue systems teardown"],
                ["Source", "Paid search / operations page"],
                ["Next action", "Assign to AE and draft reply"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-[auto,1fr] items-center gap-3 rounded-2xl border border-[var(--color-line)] bg-[rgba(245,248,252,0.9)] px-4 py-3"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]">{label}</p>
                  <p className="text-sm font-medium text-[var(--color-text)]">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[28px] border border-[var(--color-line)] bg-white/78 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[var(--color-text)]">Pipeline</p>
                <ChartColumn className="h-4 w-4 text-[var(--color-brand)]" />
              </div>
              <div className="mt-4 space-y-3">
                {[
                  ["Qualified", "18"],
                  ["Proposal", "7"],
                  ["Handoff ready", "3"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between rounded-2xl bg-[rgba(245,248,252,0.9)] px-4 py-3">
                    <span className="text-sm text-[var(--color-text-soft)]">{label}</span>
                    <span className="text-sm font-semibold text-[var(--color-text)]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-[rgba(18,121,255,0.14)] bg-[linear-gradient(180deg,rgba(18,121,255,0.08),rgba(255,255,255,0.9))] p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[var(--color-text)]">AI suggestion</p>
                  <p className="mt-1 text-sm text-[var(--color-text-soft)]">
                    Draft follow-up and prepare account brief.
                  </p>
                </div>
                <Bot className="h-4 w-4 text-[var(--color-brand)]" />
              </div>
              <div className="mt-4 rounded-2xl border border-white/70 bg-white/82 px-4 py-4 text-sm leading-6 text-[var(--color-text-soft)]">
                Buyer is asking for CRM cleanup, response speed, and clearer reporting. Recommend 30-minute demo with operations lead present.
              </div>
            </div>
          </div>
        </div>
      </SurfaceCard>
    </div>
  );
}

export function PortalPreview({
  eyebrow,
  title,
  rows,
}: {
  eyebrow: string;
  title: string;
  rows: Array<{ label: string; value: string; state?: string }>;
}) {
  return (
    <SurfaceCard className="overflow-hidden p-0">
      <div className="border-b border-[var(--color-line)] px-5 py-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-[var(--color-brand)]">
              {eyebrow}
            </p>
            <p className="mt-2 text-sm font-semibold text-[var(--color-text)]">{title}</p>
          </div>
          <div className="flex gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          </div>
        </div>
      </div>
      <div className="space-y-3 px-5 py-5">
        {rows.map((row) => (
          <div
            key={`${row.label}-${row.value}`}
            className="grid grid-cols-[1.1fr,1fr,auto] items-center gap-3 rounded-2xl border border-[var(--color-line)] bg-white/68 px-4 py-3"
          >
            <p className="text-sm font-medium text-[var(--color-text)]">{row.label}</p>
            <p className="text-sm text-[var(--color-text-soft)]">{row.value}</p>
            {row.state ? (
              <MonoTag className="bg-slate-50/80 text-[var(--color-brand)]">{row.state}</MonoTag>
            ) : null}
          </div>
        ))}
      </div>
    </SurfaceCard>
  );
}

export function WorkflowStoryboard() {
  const steps = [
    { title: "Lead captured", copy: "A website form creates a real record with source and service context.", icon: LayoutTemplate },
    { title: "Automatically routed", copy: "The right owner, SLA, and lifecycle stage are set immediately.", icon: ArrowRight },
    { title: "AI assists", copy: "Ingenium prepares next steps, summaries, and draft outreach for review.", icon: Bot },
    { title: "Team executes", copy: "Sales and ops work from the same record instead of bouncing between tools.", icon: Workflow },
    { title: "Delivery tracked", copy: "Handoff stays connected after the deal is won.", icon: CheckCircle2 },
    { title: "Reports update", copy: "Leadership sees cleaner pipeline, activity, and delivery signals.", icon: ChartColumn },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <ScrollReveal key={step.title} className="timeline-step" delayMs={index * 40}>
            <SurfaceCard className="panel-hover h-full p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="data-flow-dot flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(18,121,255,0.18)] bg-[rgba(18,121,255,0.08)] font-[var(--font-mono)] text-[11px] font-semibold text-[var(--color-brand)]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <Icon className="h-4 w-4 text-[var(--color-brand)]" />
              </div>
              <p className="mt-5 font-[var(--font-display)] text-xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                {step.title}
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{step.copy}</p>
            </SurfaceCard>
          </ScrollReveal>
        );
      })}
    </div>
  );
}

export function GovernanceStack() {
  const items = [
    "Role-based permissions",
    "Approval checkpoints",
    "Execution history",
    "Environment boundaries",
    "Audit-ready review path",
  ];

  return (
    <SurfaceCard dark className="overflow-hidden p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-white/55">
            Governance layer
          </p>
          <h3 className="mt-4 font-[var(--font-display)] text-2xl font-semibold tracking-[-0.04em] text-white">
            Control the parts of automation and AI that buyers actually worry about.
          </h3>
        </div>
        <Shield className="h-8 w-8 text-cyan-300" />
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-sm text-white/78"
          >
            {item}
          </div>
        ))}
      </div>
    </SurfaceCard>
  );
}

export function ComparisonVisual() {
  const oldStack = [
    "Website builder",
    "CRM",
    "Automation tool",
    "AI subscription tools",
    "Reporting sheets",
    "Manual handoffs",
  ];

  const ingenium = [
    "One connected platform",
    "Shared customer context",
    "Built-in routing and follow-up rules",
    "AI inside real workflow",
    "Pipeline and delivery visibility",
    "Reporting leadership can trust",
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.92fr,1.08fr]">
      <SurfaceCard className="p-7">
        <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
          Old stack
        </p>
        <div className="mt-6 grid gap-3">
          {oldStack.map((item) => (
            <div
              key={item}
              className="flex items-center justify-between rounded-2xl border border-[var(--color-line)] bg-white/70 px-4 py-3 text-sm text-[var(--color-text-soft)]"
            >
              <span>{item}</span>
              <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                Separate
              </span>
            </div>
          ))}
        </div>
      </SurfaceCard>

      <SurfaceCard dark className="p-7">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-cyan-300">
              Ingenium
            </p>
            <h3 className="mt-4 font-[var(--font-display)] text-2xl font-semibold tracking-[-0.04em] text-white">
              Replace the fragmented stack with one operating system.
            </h3>
          </div>
          <Sparkles className="h-5 w-5 text-cyan-300" />
        </div>
        <div className="mt-6 rounded-[28px] border border-white/10 bg-white/6 p-5">
          {ingenium.map((item) => (
            <div key={item} className="flex items-start gap-3 border-b border-white/8 py-3 last:border-b-0">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
              <p className="text-sm text-white/78">{item}</p>
            </div>
          ))}
        </div>
      </SurfaceCard>
    </div>
  );
}
