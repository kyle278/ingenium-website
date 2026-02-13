import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  ShieldCheck,
  Target,
  Waypoints,
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

const capabilities = [
  {
    title: "Research and intelligence",
    detail: "Market scans, competitor tracking, and buyer intent analysis.",
  },
  {
    title: "Content execution",
    detail: "Drafts, variations, and QA aligned to your brand governance.",
  },
  {
    title: "Revenue operations",
    detail: "Lead routing, enrichment, and follow-up triggered by behavior.",
  },
  {
    title: "Sales enablement",
    detail: "Briefs, call prep, and account insights delivered to sellers.",
  },
];

const workflows = [
  "Inbound lead to AI qualification to CRM routing",
  "Content brief to AI draft to human approval to publish",
  "Account signals to playbook launch to SDR notification",
];

const safeguards = [
  "Approval workflows with role-based permissions",
  "Audit logs for every automated action",
  "Human-in-the-loop checkpoints",
  "Security and compliance alignment",
];

const agentPack = [
  "Research agent maps competitive positioning",
  "Content agent drafts personalized follow-ups",
  "QA agent validates tone and compliance",
  "Ops agent routes to CRM owner",
];

const impactAreas = [
  "Speed up lead qualification and routing",
  "Maintain consistent follow-up with high intent accounts",
  "Expand content output without adding headcount",
  "Surface risks and opportunities across the pipeline",
];

export default function AgentsPage() {
  return (
    <div className="space-y-24 md:space-y-32">
      <section className="grid items-center gap-12 lg:grid-cols-[1.05fr,0.95fr]">
        <div>
          <p className={sectionLabel}>AI Agents</p>
          <h1 className="mt-6 max-w-2xl font-[var(--font-display)] text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            AI agents that execute, not just assist.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            Deploy specialized agents that handle research, content, and operational execution
            while your team retains oversight and control.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className={primaryButton}>
              Book a Strategy Call
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/departments" className={secondaryButton}>
              Explore Agent Departments
            </Link>
          </div>
        </div>
        <div className={card}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Agent workflow
            </span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Human-approved
            </span>
          </div>
          <div className="mt-6 space-y-4">
            {workflows.map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm text-slate-600">
                <Bot className="mt-0.5 h-4 w-4 text-emerald-600" />
                {item}
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
            Example: AI qualification alerts delivered to SDRs with full context.
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1fr,1.1fr]">
        <div>
          <p className={sectionLabel}>Capabilities</p>
          <h2 className="mt-4 max-w-xl font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            What agents do inside the Ingenium system.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Each agent has a focused role aligned to your revenue workflow and reporting standards.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {capabilities.map((item) => (
            <div key={item.title} className={softCard}>
              <Target className="h-5 w-5 text-emerald-600" />
              <h3 className="mt-4 text-base font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-slate-200/70 bg-white/80 px-8 py-16 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
        <div className="grid gap-12 lg:grid-cols-[1fr,0.9fr]">
          <div>
            <p className={sectionLabel}>Enterprise governance</p>
            <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              AI agents operate inside your controls.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Approvals, audit logs, and security requirements govern every automated action.
            </p>
            <div className="mt-8 space-y-3">
              {safeguards.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/60 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
              Example agent pack
            </p>
            <h3 className="mt-3 font-[var(--font-display)] text-xl font-semibold text-slate-900">
              Marketing response team
            </h3>
            <div className="mt-4 space-y-3">
              {agentPack.map((item) => (
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
          <p className={sectionLabel}>Impact</p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Where agents create measurable results.
          </h2>
          <div className="mt-6 space-y-3">
            {impactAreas.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                <Waypoints className="h-4 w-4 text-emerald-600" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-emerald-200/60 bg-emerald-50/60 p-8">
          <p className="inline-flex items-center rounded-full border border-emerald-200/60 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
            Aligned with your website
          </p>
          <h3 className="mt-4 font-[var(--font-display)] text-2xl font-semibold text-slate-900">
            Every agent action ties back to conversion.
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Agents connect directly to website signals, CRM records, and automation rules
            so outcomes stay measurable.
          </p>
          <Link
            href="/platform"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700"
          >
            Explore the platform
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-emerald-600 px-8 py-16 text-center text-white shadow-[0_25px_60px_rgba(5,150,105,0.35)]">
        <h2 className="mx-auto max-w-3xl font-[var(--font-display)] text-3xl font-semibold tracking-tight md:text-4xl">
          Ready to deploy AI agents with governance?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-emerald-50">
          Book a strategy call to map agent roles, workflows, and rollout priorities.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50">
            Book a Strategy Call
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href="/departments"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            See Agent Departments
          </Link>
        </div>
      </section>
    </div>
  );
}
