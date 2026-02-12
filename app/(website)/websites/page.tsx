import Link from "next/link";
import {
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
  { label: "Qualified demo requests", value: "+38%" },
  { label: "Time to launch", value: "6 weeks" },
  { label: "Pipeline attribution", value: "100% tracked" },
];

const process = [
  {
    title: "Discovery & strategy",
    detail: "Audit funnel performance, define the conversion model, align stakeholders.",
  },
  {
    title: "UX + design system",
    detail: "Create a high-clarity narrative, visual system, and conversion architecture.",
  },
  {
    title: "Build + integrate",
    detail: "Develop the site, wire forms to CRM, and instrument analytics.",
  },
  {
    title: "Launch + optimize",
    detail: "Ship in phases, run experiments, and iterate with AI support.",
  },
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

const proof = [
  {
    title: "FinTech platform",
    outcome: "Pipeline growth +32% in 90 days",
    detail: "Rebuilt enterprise site and launched conversion testing cadence.",
  },
  {
    title: "Healthcare SaaS",
    outcome: "Demo conversions doubled",
    detail: "Role-based pages, automated follow-up, and CRM routing.",
  },
  {
    title: "Enterprise services",
    outcome: "Launch in 6 weeks, 4 new markets",
    detail: "Localized pages with governance and approvals.",
  },
];

const faqs = [
  {
    question: "Can you rebuild our current site?",
    answer: "Yes. We migrate what works, redesign the conversion flow, and ship in phases.",
  },
  {
    question: "Will the site connect to our CRM?",
    answer: "Every form and CTA can write directly into your CRM with routing and automation triggers.",
  },
  {
    question: "What do you need from our team?",
    answer: "Brand inputs, stakeholder alignment, and access to CRM/analytics for discovery.",
  },
  {
    question: "How fast can we go live?",
    answer: "Most enterprise sites launch in 4-6 weeks with staged rollouts.",
  },
];

const benefits = [
  "Live lead capture into CRM",
  "AI-ready follow-ups and routing",
  "Governed approvals and security",
  "Full-funnel analytics + attribution",
  "Ongoing experimentation cadence",
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

export default function WebsitesPage() {
  return (
    <div className="space-y-20 md:space-y-28">
      <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
        <div className="space-y-6">
          <div className={chip}>Websites</div>
          <h1 className="font-[var(--font-display)] text-4xl md:text-5xl leading-tight tracking-tight">
            Custom enterprise websites that convert and compound.
          </h1>
          <p className="text-lg text-slate-600">
            Your website is the first sales conversation. We build conversion-first sites that connect
            directly to your CRM, AI agents, and automation stack.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className={primaryButton}>
              Get a Website Strategy Call
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/case-studies" className={secondaryButton}>
              View case studies
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {outcomes.map((stat) => (
              <div key={stat.label} className={card + " p-4"}>
                <div className="text-2xl font-[var(--font-display)]">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={cardSoft + " space-y-4"}>
          <div className="text-xs text-slate-500">Conversion engine snapshot</div>
          <div className="text-xl font-semibold">Website → CRM → AI → Revenue</div>
          <div className="space-y-3 text-sm text-slate-600">
            {[
              "Capture intent in real time",
              "Route to the right owner instantly",
              "Trigger AI follow-ups",
              "Measure every decision point",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={card + " p-8"}>
        <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <div>
            <h2 className="font-[var(--font-display)] text-3xl tracking-tight">What makes our websites different</h2>
            <p className="text-slate-600 mt-2">
              We do not stop at design. We build the system around the site so every visitor becomes a
              measurable opportunity.
            </p>
            <div className="mt-6 grid gap-3">
              {benefits.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className={cardSoft + " space-y-3"}>
            <div className="text-xs text-slate-500">Pricing approach</div>
            <div className="text-lg font-semibold">Enterprise scope, fixed outcomes</div>
            <p className="text-sm text-slate-600">
              We scope by conversion outcomes and timeline, not by hours. You get clear milestones and a
              single accountable team.
            </p>
            <Link href="/contact" className={secondaryButton + " text-xs"}>
              Request a scope call
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {deliverables.map((item) => (
          <div key={item.title} className={card + " space-y-3"}>
            <item.icon className="h-6 w-6 text-emerald-700" />
            <div className="text-xl font-semibold">{item.title}</div>
            <p className="text-sm text-slate-600">{item.description}</p>
          </div>
        ))}
      </section>

      <section className={card + " p-8"}>
        <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <div>
            <h2 className="font-[var(--font-display)] text-3xl tracking-tight">Implementation path</h2>
            <p className="text-slate-600 mt-2">
              We map your story, build the conversion system, and connect it to CRM and AI operations.
            </p>
          </div>
          <div className="space-y-3">
            {process.map((item, index) => (
              <div key={item.title} className="flex items-start gap-3 text-sm">
                <span className="h-7 w-7 rounded-full border border-slate-200/70 bg-white flex items-center justify-center text-xs font-semibold">
                  {index + 1}
                </span>
                <div>
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-xs text-slate-500 mt-1">{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
        <div className={card}>
          <h2 className="font-[var(--font-display)] text-2xl tracking-tight">What you get in 30 days</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-600">
            {[
              "Conversion blueprint and page hierarchy",
              "Design direction + key templates",
              "CRM integration plan",
              "Experiment roadmap",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <LineChart className="h-4 w-4 text-emerald-700" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className={card}>
          <h2 className="font-[var(--font-display)] text-2xl tracking-tight">What we need from you</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-600">
            {[
              "Access to current analytics",
              "CRM and marketing tooling overview",
              "Stakeholder workshop attendance",
              "Brand and legal constraints",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Target className="h-4 w-4 text-emerald-700" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-[var(--font-display)] text-3xl tracking-tight">Proof from enterprise teams</h2>
            <p className="text-slate-600 mt-2 max-w-2xl">
              Outcomes that show how conversion-first websites create measurable revenue impact.
            </p>
          </div>
          <Link href="/case-studies" className={secondaryButton + " text-xs"}>
            See all case studies
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {proof.map((item) => (
            <div key={item.title} className={card + " space-y-3"}>
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.title}</div>
              <div className="text-lg font-semibold">{item.outcome}</div>
              <p className="text-sm text-slate-600">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr,1fr]">
        <div className={card}>
          <h2 className="font-[var(--font-display)] text-2xl tracking-tight">FAQ</h2>
          <div className="mt-4 space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <div className="text-sm font-semibold">{faq.question}</div>
                <div className="text-xs text-slate-500 mt-2">{faq.answer}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={cardSoft + " space-y-4"}>
          <div className={chip}>Enterprise-ready</div>
          <h2 className="font-[var(--font-display)] text-2xl tracking-tight">Security and governance baked in</h2>
          <p className="text-sm text-slate-600">
            We align with your security requirements, approval workflows, and compliance needs from day one.
          </p>
          <div className="grid gap-3 text-sm text-slate-600">
            {[
              "SOC 2 readiness and security documentation",
              "Role-based access and approvals",
              "Audit logs and data retention policies",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-emerald-700" />
                {item}
              </div>
            ))}
          </div>
          <Link href="/security" className={secondaryButton + " text-xs"}>
            View security details
          </Link>
        </div>
      </section>

      <section className={cardSoft + " p-10 text-center space-y-4"}>
        <div className={chip}>Website-first growth</div>
        <h2 className="font-[var(--font-display)] text-3xl md:text-4xl tracking-tight">
          Ready to build a website that drives pipeline?
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Book a strategy call to map your conversion plan, timeline, and rollout options.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/contact" className={primaryButton}>
            Get a Website Strategy Call
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href="/platform" className={secondaryButton}>
            Explore the platform
          </Link>
        </div>
      </section>
    </div>
  );
}
