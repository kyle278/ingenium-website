import { ArrowRight, Bot, ChartColumn, CheckCircle2, LayoutTemplate, Shield, Workflow } from "lucide-react";

import ScrollReveal from "./ScrollReveal";
import { MonoTag, SurfaceCard } from "./sitePrimitives";

const moduleColors = [
  "from-white/95 to-white/70",
  "from-sky-50/95 to-white/70",
  "from-cyan-50/95 to-white/72",
  "from-slate-100/95 to-white/72",
  "from-white/95 to-slate-100/84",
];

export function SystemStackVisual() {
  const modules = [
    { label: "Websites", detail: "Intent capture and proof paths" },
    { label: "CRM", detail: "Routing, ownership, and lifecycle" },
    { label: "Automations", detail: "SLA-driven execution paths" },
    { label: "AI Agents", detail: "Governed assistive operators" },
    { label: "Analytics", detail: "Shared reporting and visibility" },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[560px] px-2 pb-28 pt-6 sm:px-0 sm:pb-32 sm:pt-8">
      <div className="absolute inset-x-12 top-14 h-24 rounded-full bg-[rgba(18,121,255,0.12)] blur-3xl" />
      {modules.map((module, index) => (
        <div
          key={module.label}
          className="relative mx-auto rounded-[28px] border border-white/70 bg-gradient-to-br px-5 py-4 shadow-[0_24px_60px_rgba(22,32,51,0.10)] backdrop-blur-xl sm:px-6 sm:py-5"
          style={{
            backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`,
            width: `${92 - index * 1.5}%`,
            marginTop: index === 0 ? 0 : "-8px",
            transform: `translateY(${index * 2}px) scale(${1 - index * 0.012})`,
            zIndex: modules.length - index,
          }}
        >
          <div className={`absolute inset-0 rounded-[28px] bg-gradient-to-br ${moduleColors[index]} opacity-90`} />
          <div className="relative flex items-center justify-between gap-4">
            <div>
              <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                Module {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 text-base font-semibold text-[var(--color-text)]">{module.label}</p>
            </div>
            <p className="max-w-[180px] text-right text-xs leading-5 text-[var(--color-text-soft)] sm:max-w-[190px] sm:text-sm sm:leading-6">
              {module.detail}
            </p>
          </div>
        </div>
      ))}

      <div className="relative mx-auto mt-12 w-[92%] rounded-[32px] border border-[var(--color-line)] bg-[rgba(22,32,51,0.92)] px-5 py-5 text-white shadow-[0_30px_70px_rgba(8,15,28,0.26)] sm:w-[84%] sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
          <div>
            <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-white/55">
              Operating layer
            </p>
            <p className="mt-2 max-w-[220px] text-base font-semibold leading-6">
              Shared governed revenue model
            </p>
          </div>
          <p className="max-w-[260px] text-sm leading-6 text-white/68 sm:text-right">
            One context layer underneath acquisition, pipeline, delivery, and AI action.
          </p>
        </div>
      </div>
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
