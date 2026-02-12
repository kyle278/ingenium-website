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

const primaryButton =
  "inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(5,150,105,0.35)] transition hover:bg-emerald-800";
const secondaryButton =
  "inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white";
const card = "rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]";
const cardSoft =
  "rounded-3xl border border-emerald-200/60 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]";
const chip =
  "inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-emerald-900";

export default function PlatformPage() {
  return (
    <div className="space-y-20 md:space-y-28">
      <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
        <div className="space-y-6">
          <div className={chip}>Platform</div>
          <h1 className="font-[var(--font-display)] text-4xl md:text-5xl leading-tight tracking-tight">
            One portal for websites, AI operations, and revenue systems.
          </h1>
          <p className="text-lg text-slate-600">
            Replace fragmented tools with a single system that connects your website, CRM, AI agents, and
            automations—so every decision is measurable.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className={primaryButton}>
              Get a Website Strategy Call
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/websites" className={secondaryButton}>
              Explore the website offer
            </Link>
          </div>
        </div>
        <div className={cardSoft + " space-y-4"}>
          <div className="text-xs text-slate-500">Portal map</div>
          <div className="text-xl font-semibold">Website → CRM → AI → Automations</div>
          <div className="grid gap-3 text-sm text-slate-600">
            {portalModules.slice(0, 3).map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <item.icon className="h-4 w-4 text-emerald-700" />
                {item.title}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="font-[var(--font-display)] text-3xl tracking-tight">Inside the Ingenium portal</h2>
          <p className="text-slate-600 mt-2 max-w-2xl">
            Every module is designed to keep your website converting while your teams stay aligned.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portalModules.map((item) => (
            <div key={item.title} className={card + " space-y-3"}>
              <div className="h-10 w-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="text-lg font-semibold">{item.title}</div>
              <p className="text-sm text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={card + " p-8"}>
        <div className="grid gap-6 lg:grid-cols-3">
          {roles.map((role) => (
            <div key={role.title} className="space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <role.icon className="h-5 w-5" />
              </div>
              <div className="text-lg font-semibold">{role.title}</div>
              <p className="text-sm text-slate-600">{role.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr,1fr]">
        <div className={card}>
          <h2 className="font-[var(--font-display)] text-2xl tracking-tight">Integration-ready</h2>
          <p className="text-slate-600 mt-2">
            The platform connects to your existing systems without a rip-and-replace project.
          </p>
          <div className="mt-4 grid gap-3 text-sm text-slate-600">
            {integrations.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className={cardSoft + " space-y-4"}>
          <div className={chip}>Governance</div>
          <h2 className="font-[var(--font-display)] text-2xl tracking-tight">Enterprise controls built in</h2>
          <p className="text-sm text-slate-600">
            Approval workflows, audit trails, and security documentation ship alongside every module.
          </p>
          <Link href="/security" className={secondaryButton + " text-xs"}>
            View security details
          </Link>
        </div>
      </section>

      <section className={cardSoft + " p-10 text-center space-y-4"}>
        <div className={chip}>Unified operations</div>
        <h2 className="font-[var(--font-display)] text-3xl md:text-4xl tracking-tight">
          Ready to consolidate your website and revenue stack?
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Book a strategy call to map the portal rollout and conversion plan.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/contact" className={primaryButton}>
            Get a Website Strategy Call
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href="/case-studies" className={secondaryButton}>
            View case studies
          </Link>
        </div>
      </section>
    </div>
  );
}
