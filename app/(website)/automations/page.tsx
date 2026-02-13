import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  GitBranch,
  ShieldCheck,
  Workflow,
} from "lucide-react";

const primaryButton =
  "inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(5,150,105,0.3)] transition hover:bg-emerald-700";
const secondaryButton =
  "inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50";
const sectionLabel =
  "text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700";
const card =
  "rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]";
const softCard =
  "rounded-3xl border border-white/60 bg-white/60 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)]";

const coreWorkflows = [
  {
    title: "Lead routing",
    detail: "Route inbound leads based on intent, territory, and account priority.",
  },
  {
    title: "Follow-up automation",
    detail: "Trigger sequences when buyers engage with key pages or assets.",
  },
  {
    title: "Pipeline alerts",
    detail: "Surface stalled deals and send playbooks to owners automatically.",
  },
];

const governance = [
  "Approval gates for sensitive actions",
  "Audit logs for every workflow",
  "Role-based access controls",
  "Rollback options and monitoring",
];

const priorities = [
  "Lead capture to CRM routing",
  "Pipeline health alerts",
  "Executive reporting summaries",
  "Customer lifecycle updates",
];

export default function AutomationsPage() {
  return (
    <div className="space-y-24 md:space-y-32">
      <section className="grid items-center gap-12 lg:grid-cols-[1.05fr,0.95fr]">
        <div>
          <p className={sectionLabel}>Automations</p>
          <h1 className="mt-6 max-w-2xl font-[var(--font-display)] text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Automations that keep revenue moving.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            Build workflows that connect your website signals, CRM data, and AI agents
            so teams act on intent instantly.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className={primaryButton}>
              Book a Strategy Call
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/platform" className={secondaryButton}>
              Explore the Platform
            </Link>
          </div>
        </div>
        <div className={card}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Workflow preview
            </span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              High intent response
            </span>
          </div>
          <div className="mt-6 space-y-3">
            {[
              "Detect key page visits",
              "Trigger AI summary",
              "Assign SDR and notify",
              "Log activity in CRM",
            ].map((item, idx) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-2xl border border-slate-200/60 bg-white px-4 py-3 text-sm text-slate-600"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-xs font-semibold text-emerald-700">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1fr,1.1fr]">
        <div>
          <p className={sectionLabel}>Workflows</p>
          <h2 className="mt-4 max-w-xl font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Automations built for enterprise teams.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            We connect your workflows to measurable outcomes, not just task completion.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {coreWorkflows.map((item) => (
            <div key={item.title} className={softCard}>
              <GitBranch className="h-5 w-5 text-emerald-600" />
              <h3 className="mt-4 text-base font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.detail}
              </p>
            </div>
          ))}
          <div className={softCard}>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Example workflow
            </p>
            <h3 className="mt-3 text-base font-semibold text-slate-900">
              High-intent lead response
            </h3>
            <div className="mt-3 space-y-3">
              {[
                "Signal detection",
                "AI summary",
                "SDR assignment",
                "CRM activity log",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <Workflow className="h-4 w-4 text-emerald-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-slate-200/70 bg-white/80 px-8 py-16 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
        <div className="grid gap-12 lg:grid-cols-[1fr,0.9fr]">
          <div>
            <p className={sectionLabel}>Governance</p>
            <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              Governance and auditability built in.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Automation without control creates risk. We build governance into every workflow.
            </p>
            <div className="mt-8 space-y-3">
              {governance.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/60 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
              First automations
            </p>
            <div className="mt-4 space-y-3">
              {priorities.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1fr,1fr]">
        <div>
          <p className={sectionLabel}>Connected</p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Every automation ties back to conversion.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Automations run from website signals and CRM context to keep your funnel moving.
          </p>
        </div>
        <div className="rounded-3xl border border-emerald-200/60 bg-emerald-50/60 p-8">
          <div className="space-y-3">
            {[
              "Detect high-intent visits",
              "Trigger AI qualification",
              "Assign owner and notify",
              "Log outcome in CRM",
            ].map((item, idx) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-2xl border border-emerald-200/60 bg-white px-5 py-3 text-sm text-slate-700"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-xs font-semibold text-emerald-700">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                {item}
              </div>
            ))}
          </div>
          <Link
            href="/websites"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700"
          >
            Explore the website offer
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-emerald-600 px-8 py-16 text-center text-white shadow-[0_25px_60px_rgba(5,150,105,0.35)]">
        <h2 className="mx-auto max-w-3xl font-[var(--font-display)] text-3xl font-semibold tracking-tight md:text-4xl">
          Ready to automate your revenue workflows?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-emerald-50">
          Book a strategy call to map your automation priorities and rollout plan.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50">
            Book a Strategy Call
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href="/platform"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Explore the Platform
          </Link>
        </div>
      </section>
    </div>
  );
}
