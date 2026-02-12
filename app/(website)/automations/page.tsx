import Link from "next/link";
import { ArrowUpRight, CheckCircle2, GitBranch, ShieldCheck, Workflow } from "lucide-react";

const workflows = [
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

const primaryButton =
  "inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(5,150,105,0.35)] transition hover:bg-emerald-800";
const secondaryButton =
  "inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white";
const card = "rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]";
const cardSoft =
  "rounded-3xl border border-emerald-200/60 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]";
const chip =
  "inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-emerald-900";

export default function AutomationsPage() {
  return (
    <div className="space-y-20 md:space-y-28">
      <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
        <div className="space-y-6">
          <div className={chip}>Automations</div>
          <h1 className="font-[var(--font-display)] text-4xl md:text-5xl leading-tight tracking-tight">
            Automations that keep revenue moving.
          </h1>
          <p className="text-lg text-slate-600">
            Build workflows that connect your website signals, CRM data, and AI agents—so teams act on
            intent instantly.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className={primaryButton}>
              Get a Website Strategy Call
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/platform" className={secondaryButton}>
              Explore the platform
            </Link>
          </div>
        </div>
        <div className={cardSoft + " space-y-4"}>
          <div className="text-xs text-slate-500">Workflow snapshot</div>
          <div className="text-xl font-semibold">Website signal → Automation → CRM action</div>
          <div className="space-y-3 text-sm text-slate-600">
            {[
              "Detect high-intent visits",
              "Trigger AI qualification",
              "Assign owner + notify",
              "Log outcome in CRM",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Workflow className="h-4 w-4 text-emerald-700" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="font-[var(--font-display)] text-3xl tracking-tight">Automations built for enterprise teams</h2>
          <p className="text-slate-600 mt-2 max-w-2xl">
            We connect your workflows to measurable outcomes, not just task completion.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {workflows.map((item) => (
            <div key={item.title} className={card + " space-y-3"}>
              <div className="h-10 w-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <GitBranch className="h-5 w-5" />
              </div>
              <div className="text-lg font-semibold">{item.title}</div>
              <p className="text-sm text-slate-600">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={card + " p-8"}>
        <div className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
          <div>
            <h2 className="font-[var(--font-display)] text-3xl tracking-tight">Governance and auditability</h2>
            <p className="text-slate-600 mt-2">
              Automation without control creates risk. We build governance into every workflow.
            </p>
            <div className="mt-6 grid gap-3">
              {governance.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <ShieldCheck className="h-4 w-4 text-emerald-700" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className={cardSoft + " space-y-3"}>
            <div className="text-xs text-slate-500">Example workflow</div>
            <div className="text-lg font-semibold">High-intent lead response</div>
            <div className="space-y-3 text-sm text-slate-600">
              {[
                "Detect key page visits",
                "Trigger AI summary",
                "Assign SDR + notify",
                "Log activity in CRM",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr,1fr]">
        <div className={card}>
          <h2 className="font-[var(--font-display)] text-2xl tracking-tight">What we automate first</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-600">
            {[
              "Lead capture to CRM routing",
              "Pipeline health alerts",
              "Executive reporting summaries",
              "Customer lifecycle updates",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className={cardSoft + " space-y-4"}>
          <div className={chip}>Connected to your website</div>
          <h2 className="font-[var(--font-display)] text-2xl tracking-tight">Every automation ties back to conversion</h2>
          <p className="text-sm text-slate-600">
            Automations run from website signals and CRM context to keep your funnel moving.
          </p>
          <Link href="/websites" className={secondaryButton + " text-xs"}>
            Explore the website offer
          </Link>
        </div>
      </section>

      <section className={cardSoft + " p-10 text-center space-y-4"}>
        <div className={chip}>Automation engine</div>
        <h2 className="font-[var(--font-display)] text-3xl md:text-4xl tracking-tight">
          Ready to automate your revenue workflows?
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Book a strategy call to map your automation priorities and rollout plan.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/contact" className={primaryButton}>
            Get a Website Strategy Call
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href="/platform" className={secondaryButton}>
            Explore the platform
          </Link>
        </div>
      </section>
    </div>
  );
}
