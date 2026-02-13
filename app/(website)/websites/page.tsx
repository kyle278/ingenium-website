import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  LayoutPanelTop,
  LineChart,
  PenTool,
  Rocket,
  ShieldCheck,
  Target,
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
  { value: "+38%", label: "Qualified demo requests" },
  { value: "6 wks", label: "Time to launch" },
  { value: "100%", label: "Pipeline attribution" },
  { value: "24/7", label: "Performance monitoring" },
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
    num: "Week 1",
    title: "Discovery and strategy",
    detail: "Audit funnel performance, define conversion model, align stakeholders.",
  },
  {
    num: "Week 2",
    title: "UX + design system",
    detail: "Create narrative, visual system, and conversion architecture.",
  },
  {
    num: "Week 3-4",
    title: "Build + integrate",
    detail: "Develop the site, wire forms to CRM, instrument analytics.",
  },
  {
    num: "Week 5-6",
    title: "Launch + optimize",
    detail: "Ship in phases, run experiments, and iterate with AI support.",
  },
];

const differentiators = [
  {
    title: "Ingenium Website System",
    emphasis: true,
    points: [
      "Conversion strategy tied to pipeline outcomes",
      "CRM and automation wiring included",
      "Governed approvals and security from day one",
      "Ongoing experimentation cadence",
    ],
  },
  {
    title: "Traditional agency",
    points: [
      "Design-heavy with limited CRM integration",
      "Projects end at launch",
      "Measurement and optimization left to internal teams",
    ],
  },
  {
    title: "In-house only",
    points: [
      "Competes with internal priorities",
      "Slower iteration cycles",
      "Lacks dedicated conversion operators",
    ],
  },
];

const proof = [
  {
    label: "Fintech",
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
      "Every form and CTA writes directly into your CRM with routing and automation triggers.",
  },
  {
    question: "What do you need from our team?",
    answer:
      "Brand inputs, stakeholder alignment, and access to CRM and analytics for discovery.",
  },
  {
    question: "How fast can we go live?",
    answer: "Most enterprise sites launch in 4-6 weeks with staged rollouts.",
  },
];

export default function WebsitesPage() {
  return (
    <div className="space-y-24 md:space-y-32">
      <section className="grid items-center gap-12 lg:grid-cols-[1.1fr,0.9fr]">
        <div>
          <p className={sectionLabel}>Websites</p>
          <h1 className="mt-6 max-w-2xl font-[var(--font-display)] text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Enterprise websites that convert and compound.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            Your website is the first sales conversation. We build conversion-first
            sites that connect directly to your CRM, AI agents, and automation stack.
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
        </div>
        <div className={card}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Conversion lift preview
            </span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              +38% qualified demos
            </span>
          </div>
          <div className="mt-6 grid gap-3">
            {outcomes.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200/60 bg-white px-4 py-3 text-sm text-slate-600"
              >
                <span className="font-semibold text-slate-900">{item.value}</span>
                <span className="ml-2 text-slate-500">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
            Live dashboard preview for pipeline, attribution, and experiments.
          </div>
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-slate-200/70 bg-white/80 px-8 py-16 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
        <div className="mx-auto max-w-2xl text-center">
          <p className={sectionLabel}>Conversion engine</p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Website to CRM to AI to revenue.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            We build the system around the site so every visitor becomes a measurable opportunity.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {[
            "Capture intent in real time",
            "Route to the right owner instantly",
            "Trigger AI follow-ups",
            "Measure every decision point",
          ].map((item) => (
            <div key={item} className="rounded-2xl bg-white p-5 text-sm text-slate-600">
              <span className="mb-3 block h-2.5 w-2.5 rounded-full bg-emerald-500" />
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {differentiators.map((item) => (
          <div
            key={item.title}
            className={`${item.emphasis ? "border-emerald-200/70" : "border-slate-200/70"} ${card}`}
          >
            <p className="text-sm font-semibold text-slate-900">{item.title}</p>
            <div className="mt-5 space-y-3">
              {item.points.map((point) => (
                <div key={point} className="flex items-start gap-3 text-sm text-slate-600">
                  <CheckCircle2
                    className={`mt-0.5 h-4 w-4 ${
                      item.emphasis ? "text-emerald-600" : "text-slate-300"
                    }`}
                  />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {deliverables.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className={card}>
              <Icon className="h-6 w-6 text-emerald-600" />
              <h3 className="mt-4 font-[var(--font-display)] text-xl font-semibold">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
            </div>
          );
        })}
      </section>

      <section className="grid gap-12 lg:grid-cols-[1fr,1.1fr]">
        <div>
          <p className={sectionLabel}>Process</p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Implementation path in weeks, not months.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            We map your story, build the conversion system, and connect it to CRM and AI operations.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700"
          >
            Request a scope call
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="space-y-4">
          {process.map((item) => (
            <div key={item.num} className={softCard}>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {item.num}
                </span>
                <span className="text-sm font-semibold text-slate-900">
                  {item.title}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-600">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className={card}>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            First 30 days
          </p>
          <h3 className="mt-4 font-[var(--font-display)] text-2xl font-semibold">
            What you receive early
          </h3>
          <div className="mt-6 space-y-4">
            {[
              "Conversion blueprint and page hierarchy",
              "Design direction plus key templates",
              "CRM integration plan",
              "Experiment roadmap",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <LineChart className="mt-0.5 h-4 w-4 text-emerald-600" />
                <span className="text-sm text-slate-600">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={card}>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Your side
          </p>
          <h3 className="mt-4 font-[var(--font-display)] text-2xl font-semibold">
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
                <Target className="mt-0.5 h-4 w-4 text-emerald-600" />
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
            <ArrowRight className="h-4 w-4" />
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

      <section className="grid gap-6 lg:grid-cols-2">
        <div className={card}>
          <h2 className="font-[var(--font-display)] text-2xl font-semibold">
            FAQ
          </h2>
          <div className="mt-6 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="text-sm font-semibold text-slate-900">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-200/60 bg-emerald-50/60 p-8">
          <p className="inline-flex items-center rounded-full border border-emerald-200/60 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
            Enterprise ready
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-2xl font-semibold">
            Security and governance baked in.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            We align with your security requirements, approval workflows, and compliance needs from day one.
          </p>
          <div className="mt-6 space-y-3">
            {[
              "SOC 2 readiness and security documentation",
              "Role-based access and approvals",
              "Audit logs and data retention policies",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                {item}
              </div>
            ))}
          </div>
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
          Ready to build a website that drives pipeline?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-emerald-50">
          Book a strategy call to map your conversion plan, timeline, and rollout options.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50">
            Book a Strategy Call
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href="/platform"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Explore the Platform
          </Link>
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-emerald-100">
          <Clock className="h-3.5 w-3.5" />
          Typical launch in 4-6 weeks
        </div>
      </section>
    </div>
  );
}
