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

const portalModules = [
  {
    title: "Website analytics + editor",
    description: "Ship changes faster with governed approvals and live insights.",
    icon: Box,
  },
  {
    title: "CRM foundation",
    description:
      "Unified customer data, pipeline visibility, and lifecycle tracking.",
    icon: Layers,
  },
  {
    title: "AI agents",
    description:
      "Specialized agents for research, content, QA, and execution.",
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
    detail:
      "Launch faster, prove ROI, and keep messaging consistent across channels.",
    icon: Target,
  },
  {
    title: "RevOps teams",
    detail:
      "Single source of truth for pipeline health, routing, and attribution.",
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
    <div className="space-y-24 md:space-y-32">
      {/* ── Hero ── */}
      <section className="text-center">
        <p className="inline-flex items-center rounded-full border border-emerald-200/60 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700">
          Platform
        </p>
        <h1 className="mx-auto mt-8 max-w-4xl font-[var(--font-display)] text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
          One portal for websites, AI operations, and revenue systems
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-500">
          Replace fragmented tools with a single system that connects your
          website, CRM, AI agents, and automations&mdash;so every decision is
          measurable.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(5,150,105,0.3)] transition hover:bg-emerald-700"
          >
            Get a Website Strategy Call
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/websites"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Explore the Website Offer
          </Link>
        </div>
      </section>

      {/* ── Portal modules (sticky) ── */}
      <section className="grid items-start gap-16 lg:grid-cols-2">
        <div className="lg:sticky lg:top-28">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Inside the portal
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl">
            Every module designed to keep your website converting
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-500">
            Your site is the front door. The platform keeps it converting week
            after week.
          </p>
        </div>
        <div className="space-y-4">
          {portalModules.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200/60 bg-white p-6"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-emerald-600" />
                  <h3 className="font-semibold">{item.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Role-based views (dark) ── */}
      <section className="overflow-hidden rounded-[2rem] bg-slate-950 px-8 py-16 md:px-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
            Built for your role
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight text-white md:text-4xl">
            One platform, tailored views
          </h2>
          <p className="mt-4 text-slate-400">
            Marketing, RevOps, and IT each see what matters most&mdash;without
            the noise.
          </p>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
              >
                <Icon className="h-5 w-5 text-emerald-400" />
                <h3 className="mt-4 font-semibold text-white">{role.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {role.detail}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Integrations + Governance (sticky) ── */}
      <section className="grid items-start gap-16 lg:grid-cols-2">
        <div className="lg:sticky lg:top-28">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Integration-ready
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl">
            Connects to your existing systems
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-500">
            The platform plugs into your stack without a rip-and-replace
            project.
          </p>
          <div className="mt-8 space-y-3">
            {integrations.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-sm text-slate-600"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-emerald-200/40 bg-emerald-50/50 p-8">
          <p className="inline-flex items-center rounded-full border border-emerald-200/60 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-700">
            Governance
          </p>
          <h3 className="mt-4 font-[var(--font-display)] text-2xl font-bold tracking-tight">
            Enterprise controls built in
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            Approval workflows, audit trails, and security documentation ship
            alongside every module.
          </p>
          <Link
            href="/security"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
          >
            View security details
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="overflow-hidden rounded-[2rem] bg-emerald-600 px-8 py-16 text-center md:px-16 md:py-20">
        <h2 className="mx-auto max-w-3xl font-[var(--font-display)] text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
          Ready to consolidate your website and revenue stack?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-emerald-100">
          Book a strategy call to map the portal rollout and conversion plan.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            Get a Website Strategy Call
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            View Case Studies
          </Link>
        </div>
      </section>
    </div>
  );
}
