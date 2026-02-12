import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  LayoutPanelTop,
  Layers,
  Lock,
  Sparkles,
  Target,
  Users,
  Workflow,
} from "lucide-react";

const trustLogos = [
  "Client Logo",
  "Client Logo",
  "Client Logo",
  "Client Logo",
  "Client Logo",
  "Client Logo",
];

const problems = [
  {
    title: "Fragmented stack",
    description:
      "Your website, CRM, and automation tools live in silos\u2014wins never compound.",
  },
  {
    title: "Slow iteration",
    description:
      "Every conversion test waits on dev queues. Revenue experiments die in backlog.",
  },
  {
    title: "No single owner",
    description:
      "Multiple vendors, no unified accountability, inconsistent results.",
  },
];

const pillars = [
  {
    title: "Custom websites",
    description: "High-conversion sites built for speed, clarity, and scale.",
    icon: LayoutPanelTop,
    href: "/websites",
  },
  {
    title: "AI agents",
    description: "Specialized agents for research, content, QA, and execution.",
    icon: Sparkles,
    href: "/agents",
  },
  {
    title: "Agent departments",
    description: "Orchestrated teams with roles, approvals, and governance.",
    icon: Users,
    href: "/departments",
  },
  {
    title: "CRM",
    description: "Unified customer data and full pipeline visibility.",
    icon: Layers,
    href: "/crm",
  },
  {
    title: "Automations",
    description: "Workflow automation tied to measurable outcomes.",
    icon: Workflow,
    href: "/automations",
  },
];

const steps = [
  {
    num: "01",
    title: "Discover",
    detail:
      "Audit your funnel, align stakeholders, and map conversion priorities.",
  },
  {
    num: "02",
    title: "Build",
    detail:
      "Design and launch a custom site with integrated CRM and analytics.",
  },
  {
    num: "03",
    title: "Run",
    detail:
      "Deploy AI agents and automations that keep improving performance.",
  },
];

const deliverables = [
  "Conversion blueprint + messaging hierarchy",
  "Design system + component library",
  "Analytics instrumentation + dashboards",
  "AI operations roadmap for the next 90 days",
];

const proof = [
  {
    label: "FinTech",
    metric: "+32%",
    title: "Pipeline growth in 90 days",
    detail:
      "Rebuilt enterprise site, unified CRM data, launched conversion testing.",
  },
  {
    label: "Healthcare SaaS",
    metric: "2x",
    title: "Demo conversions",
    detail:
      "Role-based pages and automated follow-up for high-intent buyers.",
  },
  {
    label: "Enterprise Services",
    metric: "6 wks",
    title: "From strategy to launch",
    detail:
      "Localized pages with AI-assisted content governance across 4 markets.",
  },
];

const securityItems = [
  "SSO / SAML access controls",
  "Role-based approvals",
  "Audit trails and activity logs",
  "Data residency options",
  "Vendor risk documentation",
  "Security review support",
];

export default function HomePage() {
  return (
    <div className="space-y-24 md:space-y-32">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="text-center">
        <p className="inline-flex items-center rounded-full border border-emerald-200/60 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700">
          Enterprise Website Systems
        </p>

        <h1 className="mx-auto mt-8 max-w-4xl font-[var(--font-display)] text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Enterprise websites built to convert, backed by
          AI{"\u00a0"}operations
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-500">
          We design conversion-first websites and run the system behind
          them&mdash;AI agents, CRM, automation, and analytics that keep
          performance compounding.
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
            href="/case-studies"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            View Case Studies
          </Link>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-slate-400">
          {[
            "4\u20136 week launch",
            "Up to 28% conversion lift",
            "100% pipeline attribution",
          ].map((stat) => (
            <span key={stat} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {stat}
            </span>
          ))}
        </div>
      </section>

      {/* ── Trust strip ──────────────────────────────────────── */}
      <section className="rounded-2xl border border-slate-200/60 bg-white/40 px-8 py-10">
        <p className="mb-8 text-center text-xs font-medium uppercase tracking-widest text-slate-400">
          Trusted by enterprise teams building growth
        </p>
        <div className="grid grid-cols-3 gap-8 md:grid-cols-6">
          {trustLogos.map((logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center py-2 text-sm text-slate-300"
            >
              {logo}
            </div>
          ))}
        </div>
      </section>

      {/* ── Problem ──────────────────────────────────────────── */}
      <section className="grid items-start gap-16 lg:grid-cols-2">
        <div className="lg:sticky lg:top-28">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            The problem
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl">
            Most enterprise websites stall after launch
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-500">
            The build is only half the work. Without a system to capture,
            qualify, and act on intent, conversion gains fade fast.
          </p>
          <Link
            href="/websites"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
          >
            See the website system
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="space-y-4">
          {problems.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200/60 bg-white p-6"
            >
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-slate-400" />
                <h3 className="font-semibold">{item.title}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Platform pillars (dark) ──────────────────────────── */}
      <section className="overflow-hidden rounded-[2rem] bg-slate-950 px-8 py-16 md:px-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
            The Ingenium System
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight text-white md:text-4xl">
            One platform. One team. Compounding results.
          </h2>
          <p className="mt-4 text-slate-400">
            Your site is the front door. The platform keeps it converting week
            after week.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Link
                key={pillar.title}
                href={pillar.href}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:bg-white/[0.08]"
              >
                <Icon className="h-5 w-5 text-emerald-400" />
                <h3 className="mt-4 font-semibold text-white">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {pillar.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-emerald-400">
                  Explore <ChevronRight className="h-3 w-3" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────── */}
      <section className="grid gap-16 lg:grid-cols-[1fr,1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            How it works
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl">
            A proven path from strategy to scale
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-500">
            We align strategy, design, and execution so you see measurable wins
            fast.
          </p>

          <div className="mt-10 space-y-0">
            {steps.map((step, idx) => (
              <div key={step.num} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 font-[var(--font-display)] text-sm font-bold text-emerald-700">
                    {step.num}
                  </span>
                  {idx < steps.length - 1 && (
                    <div className="my-1 h-full w-px bg-slate-200" />
                  )}
                </div>
                <div className="pb-10">
                  <h3 className="font-[var(--font-display)] text-lg font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/60 bg-white p-8 lg:mt-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            First 30 days
          </p>
          <h3 className="mt-3 font-[var(--font-display)] text-xl font-semibold">
            What you get early
          </h3>
          <div className="mt-6 space-y-4">
            {deliverables.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span className="text-sm leading-relaxed text-slate-600">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Proof ────────────────────────────────────────────── */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
              Results
            </p>
            <h2 className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl">
              Proof from enterprise teams
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
          >
            All case studies
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {proof.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200/60 bg-white p-8"
            >
              <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
                {item.label}
              </p>
              <p className="mt-4 font-[var(--font-display)] text-4xl font-bold tracking-tight text-emerald-600">
                {item.metric}
              </p>
              <p className="mt-1 font-semibold">{item.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Security ─────────────────────────────────────────── */}
      <section className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Enterprise ready
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl">
            Security and governance built in
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-500">
            Approvals, audit trails, and role-based controls keep every update
            accountable.
          </p>
          <Link
            href="/security"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
          >
            View security details
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {securityItems.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-xl border border-slate-200/60 bg-white px-4 py-3.5 text-sm text-slate-600"
            >
              <Lock className="h-4 w-4 shrink-0 text-slate-400" />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="overflow-hidden rounded-[2rem] bg-emerald-600 px-8 py-16 text-center md:px-16 md:py-20">
        <h2 className="mx-auto max-w-3xl font-[var(--font-display)] text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
          Ready for a website that drives pipeline?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-emerald-100">
          Book a strategy call to map your conversion plan, timeline, and
          rollout options.
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
            href="/websites"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Explore the Website Offer
          </Link>
        </div>
      </section>
    </div>
  );
}
