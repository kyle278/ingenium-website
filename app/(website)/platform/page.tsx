import Link from "next/link";
import {
  ArrowRight,
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
    detail: "Launch faster, prove ROI, keep messaging consistent across channels.",
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
  "Salesforce and HubSpot",
  "Marketing automation platforms",
  "Data warehouses and BI tools",
  "SSO, SCIM, and identity providers",
];

export default function PlatformPage() {
  return (
    <div className="space-y-24 md:space-y-32">
      <section className="grid items-center gap-12 lg:grid-cols-[1.05fr,0.95fr]">
        <div>
          <p className={sectionLabel}>Platform</p>
          <h1 className="mt-6 max-w-2xl font-[var(--font-display)] text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            One portal for websites, AI operations, and revenue systems.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            Replace fragmented tools with a single system that connects your website,
            CRM, AI agents, and automations so every decision is measurable.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className={primaryButton}>
              Book a Website Strategy Call
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/websites" className={secondaryButton}>
              Explore the Website Offer
            </Link>
          </div>
        </div>
        <div className={card}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Portal preview
            </span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Role-based views
            </span>
          </div>
          <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-medium text-slate-500">
              Website, CRM, AI, and automation controls in one workspace.
            </p>
            <div className="mt-4 grid gap-3">
              <div className="h-3 w-3/4 rounded-full bg-slate-200" />
              <div className="h-3 w-2/3 rounded-full bg-slate-200" />
              <div className="h-3 w-1/2 rounded-full bg-slate-200" />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1fr,1.1fr]">
        <div>
          <p className={sectionLabel}>Inside the portal</p>
          <h2 className="mt-4 max-w-xl font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Every module designed to keep your website converting.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Your site is the front door. The platform keeps it converting week after week.
          </p>
          <Link
            href="/websites"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700"
          >
            Explore the website system
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {portalModules.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className={softCard}>
                <Icon className="h-5 w-5 text-emerald-600" />
                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-slate-200/70 bg-white/80 px-8 py-16 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
        <div className="mx-auto max-w-2xl text-center">
          <p className={sectionLabel}>Role-based views</p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            One platform, tailored views for each team.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Marketing, RevOps, and IT see what matters most without the noise.
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <div key={role.title} className="rounded-2xl bg-white p-6">
                <Icon className="h-5 w-5 text-emerald-600" />
                <h3 className="mt-4 font-semibold text-slate-900">
                  {role.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {role.detail}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1fr,1fr]">
        <div>
          <p className={sectionLabel}>Integration-ready</p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Connects to your existing systems.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            The platform plugs into your stack without a rip-and-replace project.
          </p>
          <div className="mt-6 space-y-3">
            {integrations.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-emerald-200/60 bg-emerald-50/60 p-8">
          <p className="inline-flex items-center rounded-full border border-emerald-200/60 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
            Governance
          </p>
          <h3 className="mt-4 font-[var(--font-display)] text-2xl font-semibold">
            Enterprise controls built in.
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Approval workflows, audit trails, and security documentation ship alongside every module.
          </p>
          <Link
            href="/security"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700"
          >
            View security details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-emerald-600 px-8 py-16 text-center text-white shadow-[0_25px_60px_rgba(5,150,105,0.35)]">
        <h2 className="mx-auto max-w-3xl font-[var(--font-display)] text-3xl font-semibold tracking-tight md:text-4xl">
          Ready to consolidate your website and revenue stack?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-emerald-50">
          Book a strategy call to map the portal rollout and conversion plan.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50">
            Book a Strategy Call
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            View Case Studies
          </Link>
        </div>
      </section>
    </div>
  );
}
