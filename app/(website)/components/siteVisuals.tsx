import { ArrowRight, Bot, ChartColumn, CheckCircle2, LayoutTemplate, Shield, Workflow } from "lucide-react";

import ScrollReveal from "./ScrollReveal";
import { MonoTag, SurfaceCard } from "./sitePrimitives";

export function SystemStackVisual() {
  const lanes = [
    {
      title: "Website intent",
      copy: "High-intent submission with source, service path, and buyer context.",
      state: "Captured",
    },
    {
      title: "CRM action",
      copy: "Owner assigned, SLA set, enrichment complete, next step prepared.",
      state: "Routed",
    },
    {
      title: "Governed execution",
      copy: "AI assist, approvals, handoff, and reporting stay attached to the same record.",
      state: "Visible",
    },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <div className="absolute inset-x-10 top-10 h-28 rounded-full bg-[rgba(18,121,255,0.10)] blur-3xl" />
      <SurfaceCard className="relative overflow-hidden p-0">
        <div className="grid-lines absolute inset-0 opacity-55" />
        <div className="relative border-b border-[var(--color-line)] px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-[var(--color-brand)]">
                Product snapshot
              </p>
              <h3 className="mt-3 font-[var(--font-display)] text-2xl font-semibold tracking-[-0.04em] text-[var(--color-text)]">
                One governed path from website signal to team action.
              </h3>
            </div>
            <MonoTag className="shrink-0 bg-white/80 text-[var(--color-brand)]">Portal-linked</MonoTag>
          </div>
          <p className="mt-4 max-w-[420px] text-sm leading-7 text-[var(--color-text-soft)]">
            Capture intent, route ownership, prepare the next step, and preserve delivery visibility inside one operating model.
          </p>
        </div>
        <div className="relative space-y-3 px-4 py-4 sm:px-5 sm:py-5">
          {lanes.map((lane, index) => (
            <div
              key={lane.title}
              className="rounded-[24px] border border-[var(--color-line)] bg-white/76 px-4 py-4 shadow-[0_18px_40px_rgba(22,32,51,0.06)]"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="data-flow-dot flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(18,121,255,0.18)] bg-[rgba(18,121,255,0.08)] font-[var(--font-mono)] text-[11px] font-semibold text-[var(--color-brand)]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <p className="text-sm font-semibold text-[var(--color-text)]">{lane.title}</p>
                </div>
                <MonoTag className="bg-slate-50/80 text-[var(--color-brand)]">{lane.state}</MonoTag>
              </div>
              <p className="mt-3 pl-11 text-sm leading-6 text-[var(--color-text-soft)]">{lane.copy}</p>
            </div>
          ))}
        </div>
        <div className="relative border-t border-[var(--color-line)] bg-[rgba(22,32,51,0.94)] px-6 py-5 text-white">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-white/55">
                Operating layer
              </p>
              <p className="mt-2 text-base font-semibold leading-6">Shared context across website, CRM, automation, AI, and reporting.</p>
            </div>
            <p className="max-w-[210px] text-sm leading-6 text-white/68 sm:text-right">
              Faster action without losing approval, ownership, or delivery continuity.
            </p>
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
    {
      title: "Website lead",
      copy: "High-intent form captured with service context, source, and buyer urgency.",
      icon: LayoutTemplate,
    },
    {
      title: "CRM routing",
      copy: "Lead is enriched, scored, assigned, and timestamped against follow-up SLA.",
      icon: ArrowRight,
    },
    {
      title: "AI action",
      copy: "Agent drafts account brief, next-step recommendation, and owner summary.",
      icon: Bot,
    },
    {
      title: "Delivery handoff",
      copy: "Commercial context carries into onboarding, kickoff, and scoped execution.",
      icon: Workflow,
    },
    {
      title: "Reporting",
      copy: "Pipeline, handoff, and delivery status stay visible inside one revenue view.",
      icon: ChartColumn,
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
      <div className="lg:sticky lg:top-24 lg:h-fit">
        <SurfaceCard className="grid-lines p-7">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-[var(--color-brand)]">
            Continuous workflow
          </p>
          <h3 className="mt-4 font-[var(--font-display)] text-2xl font-semibold tracking-[-0.04em] text-[var(--color-text)]">
            One route from buyer signal to operational action.
          </h3>
          <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">
            The workflow stays pinned while each state resolves beneath it: signal, assignment,
            AI assist, execution, governance.
          </p>
          <div className="mt-8 space-y-3">
            {["Intent captured", "Owner assigned", "Approval held", "Handoff preserved"].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-[var(--color-text-soft)]">
                <CheckCircle2 className="h-4 w-4 text-[var(--color-brand)]" />
                {item}
              </div>
            ))}
          </div>
        </SurfaceCard>
      </div>
      <div className="space-y-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <ScrollReveal key={step.title} className="timeline-step" delayMs={index * 50}>
              <SurfaceCard className="panel-hover relative overflow-hidden p-7">
                <div className="absolute right-5 top-5 rounded-full border border-[var(--color-line)] bg-white/70 p-2">
                  <Icon className="h-4 w-4 text-[var(--color-brand)]" />
                </div>
                <div className="flex items-start gap-4">
                  <div className="timeline-dot data-flow-dot mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(18,121,255,0.18)] bg-[rgba(18,121,255,0.08)] font-[var(--font-mono)] text-[11px] font-semibold text-[var(--color-brand)]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="max-w-xl">
                    <p className="font-[var(--font-display)] text-xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                      {step.title}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{step.copy}</p>
                  </div>
                </div>
              </SurfaceCard>
            </ScrollReveal>
          );
        })}
      </div>
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
            Controls underneath every automated or AI-assisted action.
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
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SurfaceCard className="p-7">
        <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
          Fragmented stack
        </p>
        <div className="mt-6 grid gap-3">
          {[
            "Website tool",
            "CRM",
            "Automation tool",
            "AI tool",
            "Spreadsheet reporting",
          ].map((item, index) => (
            <div
              key={item}
              className="flex items-center justify-between rounded-2xl border border-[var(--color-line)] bg-white/70 px-4 py-3 text-sm text-[var(--color-text-soft)]"
              style={{ transform: `translateX(${index % 2 === 0 ? "-6px" : "8px"}) rotate(${index % 2 === 0 ? "-1.2deg" : "1deg"})` }}
            >
              <span>{item}</span>
              <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                Disconnected
              </span>
            </div>
          ))}
        </div>
      </SurfaceCard>

      <SurfaceCard dark className="p-7">
        <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-cyan-300">
          Ingenium
        </p>
        <div className="mt-6 rounded-[28px] border border-white/10 bg-white/6 p-5">
          {[
            "Website intent in the same record as owner action",
            "Automations tied to SLA and approval rules",
            "AI agents working inside workflow boundaries",
            "Delivery status visible alongside pipeline",
            "Shared reporting model for leadership",
          ].map((item) => (
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
