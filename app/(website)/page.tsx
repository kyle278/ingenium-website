import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  LayoutPanelTop,
  LineChart,
  Lock,
  Sparkles,
  Users,
  Workflow,
  Layers,
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

const outcomes = [
  { metric: "Up to 28%", label: "Conversion lift" },
  { metric: "4-6 weeks", label: "Launch timeline" },
  { metric: "100%", label: "Attribution coverage" },
  { metric: "24/7", label: "AI operations" },
];

const industries = [
  "Fintech",
  "Healthcare",
  "B2B SaaS",
  "Enterprise Services",
  "Logistics",
  "Professional Services",
];

const problems = [
  {
    title: "Fragmented stack",
    description:
      "Your website, CRM, and automations live in silos, so wins never compound.",
  },
  {
    title: "Slow iteration",
    description:
      "Conversion tests wait on dev queues, and revenue experiments die in backlog.",
  },
  {
    title: "No ownership",
    description:
      "Multiple vendors means inconsistent results and no accountable operator.",
  },
];

const systemSteps = [
  {
    title: "Website",
    detail: "Conversion-first experience built for enterprise teams.",
    icon: LayoutPanelTop,
  },
  {
    title: "CRM",
    detail: "Unified pipeline data, routing, and attribution.",
    icon: Layers,
  },
  {
    title: "AI Agents",
    detail: "Specialized agents execute research, content, and QA.",
    icon: Sparkles,
  },
  {
    title: "Automations",
    detail: "Workflows that keep momentum compounding.",
    icon: Workflow,
  },
  {
    title: "Analytics",
    detail: "Performance dashboards across the funnel.",
    icon: LineChart,
  },
];

const steps = [
  {
    num: "01",
    title: "Diagnose",
    detail:
      "Audit your funnel, align stakeholders, and map conversion priorities.",
  },
  {
    num: "02",
    title: "Build",
    detail:
      "Launch a custom website with integrated CRM and analytics foundations.",
  },
  {
    num: "03",
    title: "Operate",
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
    label: "Fintech",
    metric: "+32%",
    title: "Pipeline growth in 90 days",
    detail:
      "Rebuilt enterprise site, unified CRM data, launched weekly conversion tests.",
  },
  {
    label: "Healthcare SaaS",
    metric: "2x",
    title: "Demo conversions",
    detail:
      "Role-based pages with automated follow-up and AI-assisted SDR briefs.",
  },
  {
    label: "Enterprise Services",
    metric: "6 wks",
    title: "Strategy to launch",
    detail:
      "Localized pages with governance workflows across four regions.",
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
      <section className="grid items-center gap-12 lg:grid-cols-[1.1fr,0.9fr]">
        <div>
          <p className={sectionLabel}>Enterprise Website Systems</p>
          <h1 className="mt-6 max-w-2xl font-[var(--font-display)] text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Enterprise websites built to convert, backed by AI operations.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            Ingenium builds conversion-first websites and operates the system
            behind them, including AI agents, CRM, automations, and analytics
            that keep performance compounding.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className={primaryButton}>
              Book a Website Strategy Call
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/case-studies" className={secondaryButton}>
              View Case Studies
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-4 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              4-6 week launch
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Up to 28% conversion lift
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              100% pipeline attribution
            </span>
          </div>
        </div>

        <div className="rounded-[2.25rem] border border-slate-200/70 bg-white/80 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.15)]">
          <div className="rounded-3xl border border-slate-200/60 bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Live Conversion View
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                +28% lift
              </span>
            </div>
            <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-medium text-slate-500">
                Website experience preview
              </p>
              <div className="mt-4 space-y-3">
                <div className="h-3 w-3/4 rounded-full bg-slate-200" />
                <div className="h-3 w-2/3 rounded-full bg-slate-200" />
                <div className="h-3 w-1/2 rounded-full bg-slate-200" />
              </div>
            </div>
          </div>
          <div className="mt-6 grid gap-3">
            <div className="rounded-2xl border border-slate-200/60 bg-white px-4 py-3 text-sm text-slate-600">
              Pipeline: <span className="font-semibold">$4.6M</span>
            </div>
            <div className="rounded-2xl border border-slate-200/60 bg-white px-4 py-3 text-sm text-slate-600">
              Demo conversion: <span className="font-semibold">+31%</span>
            </div>
            <div className="rounded-2xl border border-slate-200/60 bg-white px-4 py-3 text-sm text-slate-600">
              Response SLA: <span className="font-semibold">2 hours</span>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/70 bg-white/70 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
        <div className="grid gap-6 md:grid-cols-4">
          {outcomes.map((item) => (
            <div key={item.label} className="rounded-2xl bg-white/80 p-5">
              <p className="text-2xl font-[var(--font-display)] font-semibold text-slate-900">
                {item.metric}
              </p>
              <p className="mt-2 text-sm text-slate-500">{item.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-slate-400">
          Typical outcomes from recent enterprise launches
        </p>
      </section>

      <section className="space-y-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Trusted by enterprise teams across
        </p>
        <div className="flex flex-wrap gap-3">
          {industries.map((industry) => (
            <span
              key={industry}
              className="rounded-full border border-slate-200/60 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
            >
              {industry}
            </span>
          ))}
        </div>
      </section>

      <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr]">
        <div>
          <p className={sectionLabel}>The problem</p>
          <h2 className="mt-4 max-w-xl font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Most enterprise websites stall after launch.
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
            Without a system to capture, qualify, and act on intent, conversion
            gains fade fast.
          </p>
          <Link
            href="/websites"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700"
          >
            Explore the website system
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="space-y-4">
          {problems.map((item) => (
            <div key={item.title} className={softCard}>
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <h3 className="text-base font-semibold text-slate-900">
                  {item.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-slate-200/70 bg-white/80 px-8 py-16 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
        <div className="mx-auto max-w-2xl text-center">
          <p className={sectionLabel}>The system</p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            The conversion engine behind every launch.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Your website is the front door. The Ingenium platform keeps it
            converting week after week.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-5">
          {systemSteps.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-2xl bg-white p-4">
                <Icon className="h-5 w-5 text-emerald-600" />
                <h3 className="mt-3 text-sm font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-12 lg:grid-cols-[1fr,1fr]">
        <div>
          <p className={sectionLabel}>How it works</p>
          <h2 className="mt-4 max-w-xl font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            A proven path from strategy to scale.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            We align strategy, design, and execution so you see measurable wins
            quickly.
          </p>
          <div className="mt-8 space-y-4">
            {steps.map((step) => (
              <div
                key={step.num}
                className="flex gap-4 rounded-2xl bg-white/70 p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
                  {step.num}
                </div>
                <div>
                  <p className="text-base font-semibold text-slate-900">
                    {step.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={card}>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            First 30 days
          </p>
          <h3 className="mt-4 font-[var(--font-display)] text-2xl font-semibold text-slate-900">
            What you receive early
          </h3>
          <div className="mt-6 space-y-4">
            {deliverables.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                <span className="text-sm text-slate-600">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className={sectionLabel}>Proof</p>
            <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              Outcomes from enterprise teams.
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
          >
            View all case studies
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {proof.map((item) => (
            <div key={item.label} className={card}>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                {item.label}
              </p>
              <p className="mt-4 text-4xl font-[var(--font-display)] font-semibold text-emerald-600">
                {item.metric}
              </p>
              <p className="mt-2 text-base font-semibold text-slate-900">
                {item.title}
              </p>
              <p className="mt-3 text-sm text-slate-600">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-12 lg:grid-cols-[1fr,1fr]">
        <div>
          <p className={sectionLabel}>Security</p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Enterprise governance built in.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Approvals, audit trails, and role-based controls keep every update
            accountable.
          </p>
          <Link
            href="/security"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700"
          >
            Review security posture
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {securityItems.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-600"
            >
              <Lock className="h-4 w-4 text-emerald-600" />
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-emerald-600 px-8 py-16 text-center text-white shadow-[0_25px_60px_rgba(5,150,105,0.35)]">
        <h2 className="mx-auto max-w-3xl font-[var(--font-display)] text-3xl font-semibold tracking-tight md:text-4xl">
          Ready for a website system that drives pipeline?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-emerald-50">
          Book a strategy call to map your conversion plan, timeline, and
          rollout options.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            Book a Strategy Call
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href="/websites"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Explore the Website Offer
          </Link>
        </div>
      </section>
    </div>
  );
}
