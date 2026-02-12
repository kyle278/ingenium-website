import Link from "next/link";
import { ArrowUpRight, Bot, CheckCircle2, ShieldCheck, Target, Waypoints } from "lucide-react";

const capabilities = [
  {
    title: "Research + intelligence",
    detail: "Market scans, competitor tracking, and buyer intent analysis.",
  },
  {
    title: "Content execution",
    detail: "Drafts, variations, and QA aligned to your brand governance.",
  },
  {
    title: "Revenue operations",
    detail: "Lead routing, enrichment, and follow-up sequences triggered by behavior.",
  },
];

const workflows = [
  "Inbound lead -> AI qualification -> CRM routing",
  "Content brief -> AI draft -> human approval -> publish",
  "Account signals -> playbook launch -> SDR notification",
];

const safeguards = [
  "Approval workflows with role-based permissions",
  "Audit logs for every automated action",
  "Human-in-the-loop checkpoints",
  "Security and compliance alignment",
];

export default function AgentsPage() {
  return (
    <div className="space-y-24">
      <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
        <div className="space-y-6">
          <div className="chip">AI Agents</div>
          <h1 className="section-title text-4xl md:text-5xl leading-tight">
            AI agents that execute, not just assist.
          </h1>
          <p className="text-lg text-muted">
            Deploy specialized agents that handle research, content, and operational execution while your
            team retains oversight and control.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary text-sm">
              Get a Website Strategy Call
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/departments" className="btn-secondary text-sm">
              Explore agent departments
            </Link>
          </div>
        </div>
        <div className="card-soft p-6 space-y-4">
          <div className="text-xs text-muted">Agent workflow</div>
          <div className="text-xl section-title">Website signal → AI agent → Action</div>
          <div className="space-y-3 text-sm text-muted">
            {workflows.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Bot className="h-4 w-4 text-[var(--accent)]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="section-title text-3xl">What agents do inside the Ingenium system</h2>
          <p className="text-muted mt-2 max-w-2xl">
            Each agent has a focused role, aligned to your revenue workflow and reporting standards.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {capabilities.map((item) => (
            <div key={item.title} className="card p-6 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
                <Target className="h-5 w-5" />
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
            <h2 className="section-title text-3xl">Governance built for enterprise teams</h2>
            <p className="text-muted mt-2">
              AI agents operate inside your approvals, audit logs, and security requirements.
            </p>
            <div className="mt-6 grid gap-3">
              {safeguards.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-muted">
                  <ShieldCheck className="h-4 w-4 text-[var(--accent)]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="card-soft p-6 space-y-3">
            <div className="text-xs text-muted">Example agent pack</div>
            <div className="text-lg section-title">Marketing response team</div>
            <div className="space-y-3 text-sm text-muted">
              {[
                "Research agent maps competitive positioning",
                "Content agent drafts personalized follow-ups",
                "QA agent validates tone + compliance",
                "Ops agent routes to CRM owner",
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
          <h2 className="section-title text-2xl">Where agents create impact</h2>
          <div className="mt-4 grid gap-3 text-sm text-muted">
            {[
              "Speed up lead qualification and routing",
              "Maintain consistent follow-up with high intent accounts",
              "Expand content output without adding headcount",
              "Surface risks and opportunities across the pipeline",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Waypoints className="h-4 w-4 text-[var(--accent)]" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="card-soft p-6 space-y-4">
          <div className="chip">Aligned with your website</div>
          <h2 className="section-title text-2xl">Every agent action ties back to conversion</h2>
          <p className="text-sm text-muted">
            Agents connect directly to website signals, CRM records, and automation rules so outcomes stay
            measurable.
          </p>
          <Link href="/platform" className="btn-secondary text-xs">
            Explore the platform
          </Link>
        </div>
      </section>

      <section className="card-soft p-10 text-center space-y-4">
        <div className="chip">AI workforce</div>
        <h2 className="section-title text-3xl md:text-4xl">
          Ready to deploy AI agents with governance?
        </h2>
        <p className="text-muted max-w-2xl mx-auto">
          Book a strategy call to map agent roles, workflows, and rollout priorities.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="btn-primary text-sm">
            Get a Website Strategy Call
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href="/departments" className="btn-secondary text-sm">
            See agent departments
          </Link>
        </div>
      </section>
    </div>
  );
}
