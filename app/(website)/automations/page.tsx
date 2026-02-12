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

export default function AutomationsPage() {
  return (
    <div className="space-y-24">
      <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
        <div className="space-y-6">
          <div className="chip">Automations</div>
          <h1 className="section-title text-4xl md:text-5xl leading-tight">
            Automations that keep revenue moving.
          </h1>
          <p className="text-lg text-muted">
            Build workflows that connect your website signals, CRM data, and AI agents—so teams act on
            intent instantly.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary text-sm">
              Get a Website Strategy Call
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/platform" className="btn-secondary text-sm">
              Explore the platform
            </Link>
          </div>
        </div>
        <div className="card-soft p-6 space-y-4">
          <div className="text-xs text-muted">Workflow snapshot</div>
          <div className="text-xl section-title">Website signal → Automation → CRM action</div>
          <div className="space-y-3 text-sm text-muted">
            {[
              "Detect high-intent visits",
              "Trigger AI qualification",
              "Assign owner + notify",
              "Log outcome in CRM",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Workflow className="h-4 w-4 text-[var(--accent)]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="section-title text-3xl">Automations built for enterprise teams</h2>
          <p className="text-muted mt-2 max-w-2xl">
            We connect your workflows to measurable outcomes, not just task completion.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {workflows.map((item) => (
            <div key={item.title} className="card p-6 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
                <GitBranch className="h-5 w-5" />
              </div>
              <div className="text-lg section-title">{item.title}</div>
              <p className="text-sm text-muted">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card p-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
          <div>
            <h2 className="section-title text-3xl">Governance and auditability</h2>
            <p className="text-muted mt-2">
              Automation without control creates risk. We build governance into every workflow.
            </p>
            <div className="mt-6 grid gap-3">
              {governance.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-muted">
                  <ShieldCheck className="h-4 w-4 text-[var(--accent)]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="card-soft p-6 space-y-3">
            <div className="text-xs text-muted">Example workflow</div>
            <div className="text-lg section-title">High-intent lead response</div>
            <div className="space-y-3 text-sm text-muted">
              {[
                "Detect key page visits",
                "Trigger AI summary",
                "Assign SDR + notify",
                "Log activity in CRM",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-[var(--accent)]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr,1fr]">
        <div className="card p-6">
          <h2 className="section-title text-2xl">What we automate first</h2>
          <div className="mt-4 grid gap-3 text-sm text-muted">
            {[
              "Lead capture to CRM routing",
              "Pipeline health alerts",
              "Executive reporting summaries",
              "Customer lifecycle updates",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-[var(--accent)]" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="card-soft p-6 space-y-4">
          <div className="chip">Connected to your website</div>
          <h2 className="section-title text-2xl">Every automation ties back to conversion</h2>
          <p className="text-sm text-muted">
            Automations run from website signals and CRM context to keep your funnel moving.
          </p>
          <Link href="/websites" className="btn-secondary text-xs">
            Explore the website offer
          </Link>
        </div>
      </section>

      <section className="card-soft p-10 text-center space-y-4">
        <div className="chip">Automation engine</div>
        <h2 className="section-title text-3xl md:text-4xl">
          Ready to automate your revenue workflows?
        </h2>
        <p className="text-muted max-w-2xl mx-auto">
          Book a strategy call to map your automation priorities and rollout plan.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="btn-primary text-sm">
            Get a Website Strategy Call
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href="/platform" className="btn-secondary text-sm">
            Explore the platform
          </Link>
        </div>
      </section>
    </div>
  );
}
