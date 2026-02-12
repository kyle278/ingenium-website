import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  LayoutPanelTop,
  LineChart,
  PenTool,
  Rocket,
  ShieldCheck,
  Target,
} from "lucide-react";

const outcomes = [
  { value: "+38%", label: "Qualified demo requests" },
  { value: "6 wks", label: "Time to launch" },
  { value: "100%", label: "Pipeline attribution" },
];

const benefits = [
  "Live lead capture into CRM",
  "AI-ready follow-ups and routing",
  "Governed approvals and security",
  "Full-funnel analytics + attribution",
  "Ongoing experimentation cadence",
];

const deliverables = [
  {
    title: "Narrative-first messaging",
    description: "Positioning, proof, and CTA flow mapped to buyer intent.",
    icon: PenTool,
  },
  {
    title: "Conversion-grade design",
    description: "Enterprise UI that guides decision makers to action.",
    icon: LayoutPanelTop,
  },
  {
    title: "Launch + growth system",
    description: "SEO, analytics, CRM integration, and AI-ready workflows.",
    icon: Rocket,
  },
];

const process = [
  {
    num: "01",
    title: "Discovery & strategy",
    detail:
      "Audit funnel performance, define the conversion model, align stakeholders.",
  },
  {
    num: "02",
    title: "UX + design system",
    detail:
      "Create a high-clarity narrative, visual system, and conversion architecture.",
  },
  {
    num: "03",
    title: "Build + integrate",
    detail:
      "Develop the site, wire forms to CRM, and instrument analytics.",
  },
  {
    num: "04",
    title: "Launch + optimize",
    detail:
      "Ship in phases, run experiments, and iterate with AI support.",
  },
];

const proof = [
  {
    label: "FinTech",
    metric: "+32%",
    title: "Pipeline growth in 90 days",
    detail: "Rebuilt enterprise site and launched conversion testing cadence.",
  },
  {
    label: "Healthcare SaaS",
    metric: "2x",
    title: "Demo conversions",
    detail: "Role-based pages, automated follow-up, and CRM routing.",
  },
  {
    label: "Enterprise Services",
    metric: "6 wks",
    title: "Launch across 4 markets",
    detail: "Localized pages with governance and approvals.",
  },
];

const faqs = [
  {
    question: "Can you rebuild our current site?",
    answer:
      "Yes. We migrate what works, redesign the conversion flow, and ship in phases.",
  },
  {
    question: "Will the site connect to our CRM?",
    answer:
      "Every form and CTA can write directly into your CRM with routing and automation triggers.",
  },
  {
    question: "What do you need from our team?",
    answer:
      "Brand inputs, stakeholder alignment, and access to CRM/analytics for discovery.",
  },
  {
    question: "How fast can we go live?",
    answer:
      "Most enterprise sites launch in 4\u20136 weeks with staged rollouts.",
  },
];

export default function WebsitesPage() {
  return (
    <div className="space-y-24 md:space-y-32">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="text-center">
        <p className="inline-flex items-center rounded-full border border-emerald-200/60 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700">
          Websites
        </p>

        <h1 className="mx-auto mt-8 max-w-4xl font-[var(--font-display)] text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
          Custom enterprise websites that convert and compound
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-500">
          Your website is the first sales conversation. We build
          conversion-first sites that connect directly to your CRM, AI agents,
          and automation stack.
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

        <div className="mx-auto mt-14 grid max-w-2xl gap-6 sm:grid-cols-3">
          {outcomes.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-200/60 bg-white p-6">
              <p className="font-[var(--font-display)] text-3xl font-bold tracking-tight text-emerald-600">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Conversion engine (dark) ─────────────────────────── */}
      <section className="overflow-hidden rounded-[2rem] bg-slate-950 px-8 py-16 md:px-16 md:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
              Conversion engine
            </p>
            <h2 className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight text-white md:text-4xl">
              Website &rarr; CRM &rarr; AI &rarr; Revenue
            </h2>
            <p className="mt-4 text-slate-400">
              We don&rsquo;t stop at design. We build the system around the site
              so every visitor becomes a measurable opportunity.
            </p>
          </div>
          <div className="space-y-3">
            {[
              "Capture intent in real time",
              "Route to the right owner instantly",
              "Trigger AI follow-ups",
              "Measure every decision point",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm text-slate-300"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What makes us different ──────────────────────────── */}
      <section className="grid items-start gap-16 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Differentiators
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl">
            What makes our websites different
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-500">
            We build the system around the site so every visitor becomes a
            measurable opportunity.
          </p>
          <div className="mt-8 space-y-3">
            {benefits.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/60 bg-white p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Pricing approach
          </p>
          <h3 className="mt-3 font-[var(--font-display)] text-xl font-semibold">
            Enterprise scope, fixed outcomes
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            We scope by conversion outcomes and timeline, not by hours. You get
            clear milestones and a single accountable team.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
          >
            Request a scope call
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* ── Deliverables ─────────────────────────────────────── */}
      <section className="grid gap-6 lg:grid-cols-3">
        {deliverables.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200/60 bg-white p-8"
            >
              <Icon className="h-6 w-6 text-emerald-600" />
              <h3 className="mt-4 font-[var(--font-display)] text-xl font-semibold">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {item.description}
              </p>
            </div>
          );
        })}
      </section>

      {/* ── Implementation path ──────────────────────────────── */}
      <section className="grid gap-16 lg:grid-cols-[1fr,1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Process
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl">
            Implementation path
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-500">
            We map your story, build the conversion system, and connect it to
            CRM and AI operations.
          </p>
        </div>

        <div className="space-y-0">
          {process.map((item, idx) => (
            <div key={item.num} className="flex gap-6">
              <div className="flex flex-col items-center">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 font-[var(--font-display)] text-sm font-bold text-emerald-700">
                  {item.num}
                </span>
                {idx < process.length - 1 && (
                  <div className="my-1 h-full w-px bg-slate-200" />
                )}
              </div>
              <div className="pb-8">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 30-day deliverables + what we need ───────────────── */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200/60 bg-white p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            First 30 days
          </p>
          <h3 className="mt-3 font-[var(--font-display)] text-xl font-semibold">
            What you get early
          </h3>
          <div className="mt-6 space-y-4">
            {[
              "Conversion blueprint and page hierarchy",
              "Design direction + key templates",
              "CRM integration plan",
              "Experiment roadmap",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <LineChart className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span className="text-sm text-slate-600">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/60 bg-white p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Your side
          </p>
          <h3 className="mt-3 font-[var(--font-display)] text-xl font-semibold">
            What we need from you
          </h3>
          <div className="mt-6 space-y-4">
            {[
              "Access to current analytics",
              "CRM and marketing tooling overview",
              "Stakeholder workshop attendance",
              "Brand and legal constraints",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <Target className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span className="text-sm text-slate-600">{item}</span>
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

      {/* ── FAQ + Security ───────────────────────────────────── */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200/60 bg-white p-8">
          <h2 className="font-[var(--font-display)] text-2xl font-bold tracking-tight">
            FAQ
          </h2>
          <div className="mt-6 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="text-sm font-semibold">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-200/40 bg-emerald-50/50 p-8">
          <p className="inline-flex items-center rounded-full border border-emerald-200/60 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-700">
            Enterprise-ready
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-2xl font-bold tracking-tight">
            Security and governance baked in
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            We align with your security requirements, approval workflows, and
            compliance needs from day one.
          </p>
          <div className="mt-6 space-y-3">
            {[
              "SOC 2 readiness and security documentation",
              "Role-based access and approvals",
              "Audit logs and data retention policies",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
                {item}
              </div>
            ))}
          </div>
          <Link
            href="/security"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
          >
            View security details
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="overflow-hidden rounded-[2rem] bg-emerald-600 px-8 py-16 text-center md:px-16 md:py-20">
        <h2 className="mx-auto max-w-3xl font-[var(--font-display)] text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
          Ready to build a website that drives pipeline?
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
            href="/platform"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Explore the Platform
          </Link>
        </div>
      </section>
    </div>
  );
}
