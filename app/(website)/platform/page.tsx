import Link from "next/link";
import {
  ArrowUpRight,
  Box,
  Layers,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Waypoints,
  Workflow,
} from "lucide-react";

const portalModules = [
  {
    title: "Website analytics + editor",
    description: "Ship changes faster with governed approvals and live insights.",
    icon: Box,
  },
  {
    title: "CRM foundation",
    description: "Unified customer data, pipeline visibility, and lifecycle tracking.",
    icon: Layers,
  },
  {
    title: "AI agents",
    description: "Specialized agents for research, content, QA, and execution.",
    icon: Sparkles,
  },
  {
    title: "Agent departments",
    description: "Orchestrated teams with roles, escalation, and oversight.",
    icon: Users,
  },
  {
    title: "Automations",
    description: "Routing, enrichment, and workflows connected to outcomes.",
    icon: Workflow,
  },
];

const roles = [
  {
    title: "Marketing leaders",
    detail: "Launch faster, prove ROI, and keep messaging consistent across channels.",
    icon: Target,
  },
  {
    title: "RevOps teams",
    detail: "Single source of truth for pipeline health, routing, and attribution.",
    icon: Waypoints,
  },
  {
    title: "IT + Security",
    detail: "Governance, audit logs, and role-based access for every change.",
    icon: ShieldCheck,
  },
];

const integrations = [
  "Salesforce, HubSpot, and custom CRM schemas",
  "Marketing automation + email platforms",
  "Data warehouses and BI tools",
  "SSO, SCIM, and identity providers",
];

export default function PlatformPage() {
  return (
    <div className="space-y-24">
      <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
        <div className="space-y-6">
          <div className="chip">Platform</div>
          <h1 className="section-title text-4xl md:text-5xl leading-tight">
            One portal for websites, AI operations, and revenue systems.
          </h1>
          <p className="text-lg text-muted">
            Replace fragmented tools with a single system that connects your website, CRM, AI agents, and
            automations—so every decision is measurable.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary text-sm">
              Get a Website Strategy Call
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/websites" className="btn-secondary text-sm">
              Explore the website offer
            </Link>
          </div>
        </div>
        <div className="card-soft p-6 space-y-4">
          <div className="text-xs text-muted">Portal map</div>
          <div className="text-xl section-title">Website → CRM → AI → Automations</div>
          <div className="grid gap-3 text-sm text-muted">
            {portalModules.slice(0, 3).map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <item.icon className="h-4 w-4 text-[var(--accent)]" />
                {item.title}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="section-title text-3xl">Inside the Ingenium portal</h2>
          <p className="text-muted mt-2 max-w-2xl">
            Every module is designed to keep your website converting while your teams stay aligned.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portalModules.map((item) => (
            <div key={item.title} className="card p-6 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="text-lg section-title">{item.title}</div>
              <p className="text-sm text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card p-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {roles.map((role) => (
            <div key={role.title} className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
                <role.icon className="h-5 w-5" />
              </div>
              <div className="text-lg section-title">{role.title}</div>
              <p className="text-sm text-muted">{role.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr,1fr]">
        <div className="card p-6">
          <h2 className="section-title text-2xl">Integration-ready</h2>
          <p className="text-muted mt-2">
            The platform connects to your existing systems without a rip-and-replace project.
          </p>
          <div className="mt-4 grid gap-3 text-sm text-muted">
            {integrations.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="card-soft p-6 space-y-4">
          <div className="chip">Governance</div>
          <h2 className="section-title text-2xl">Enterprise controls built in</h2>
          <p className="text-sm text-muted">
            Approval workflows, audit trails, and security documentation ship alongside every module.
          </p>
          <Link href="/security" className="btn-secondary text-xs">
            View security details
          </Link>
        </div>
      </section>

      <section className="card-soft p-10 text-center space-y-4">
        <div className="chip">Unified operations</div>
        <h2 className="section-title text-3xl md:text-4xl">
          Ready to consolidate your website and revenue stack?
        </h2>
        <p className="text-muted max-w-2xl mx-auto">
          Book a strategy call to map the portal rollout and conversion plan.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="btn-primary text-sm">
            Get a Website Strategy Call
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href="/case-studies" className="btn-secondary text-sm">
            View case studies
          </Link>
        </div>
      </section>
    </div>
  );
}
