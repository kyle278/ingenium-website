import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  LayoutPanelTop,
  Layers,
  Lock,
  Sparkles,
  Target,
  Users,
  Waypoints,
  Workflow,
} from "lucide-react";

const trustLogos = ["Client Logo", "Client Logo", "Client Logo", "Client Logo", "Client Logo", "Client Logo"];

const problems = [
  {
    title: "Fragmented stack",
    description: "Your website, CRM, and automation tools live in silos, so wins never compound.",
  },
  {
    title: "Slow iteration",
    description: "Every conversion test waits on dev queues, so revenue experiments die in backlog.",
  },
  {
    title: "No single owner",
    description: "Multiple vendors, no unified accountability, inconsistent performance month to month.",
  },
];

const pillars = [
  {
    title: "Custom enterprise websites",
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
    title: "CRM foundation",
    description: "Unified customer data and revenue visibility.",
    icon: Layers,
    href: "/crm",
  },
  {
    title: "Automations + analytics",
    description: "Workflow automation tied to measurable outcomes.",
    icon: Workflow,
    href: "/automations",
  },
];

const steps = [
  {
    title: "Discover",
    detail: "Audit your funnel, align stakeholders, and map conversion priorities.",
  },
  {
    title: "Build",
    detail: "Design and launch a custom site with integrated CRM and analytics.",
  },
  {
    title: "Run",
    detail: "Deploy AI agents and automations that keep improving performance.",
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
    title: "FinTech platform",
    outcome: "Pipeline growth +32% in 90 days",
    detail: "Rebuilt enterprise site, unified CRM data, launched conversion testing.",
  },
  {
    title: "Healthcare SaaS",
    outcome: "Demo conversions doubled",
    detail: "Role-based pages and automated follow-up for high-intent buyers.",
  },
  {
    title: "Enterprise services",
    outcome: "Launch in 6 weeks, 4 new markets",
    detail: "Localized pages with AI-assisted content governance.",
  },
];

const security = [
  "SSO / SAML access controls",
  "Role-based approvals",
  "Audit trails and activity logs",
  "Data residency options",
  "Vendor risk documentation",
  "Dedicated security review support",
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
const badge =
  "inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white px-3 py-1 text-xs text-slate-600";

export default function HomePage() {
  return (
    <div className="space-y-20 md:space-y-28">
      <section className="grid gap-12 lg:grid-cols-[1.05fr,0.95fr] items-center">
        <div className="space-y-6">
          <div className={chip}>Enterprise Website Systems</div>
          <h1 className="font-[var(--font-display)] text-4xl md:text-6xl leading-tight tracking-tight">
            Enterprise websites built to convert, backed by AI operations.
          </h1>
          <p className="text-lg text-slate-600">
            Ingenium Digital Consulting designs conversion-first websites and runs the system behind them:
            AI agents, CRM, automation, and analytics that keep performance compounding.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/contact" className={primaryButton}>
              Get a Website Strategy Call
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/case-studies" className={secondaryButton}>
              View case studies
            </Link>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-slate-600">
            {["4-6 week launch", "Conversion-first design", "Enterprise security ready"].map((item) => (
              <span key={item} className={badge}>
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className={cardSoft + " space-y-5"}>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Live conversion dashboard</span>
            <span className={badge}>Typical outcomes</span>
          </div>
          <div className="grid gap-3">
            {[
              { label: "Conversion lift", value: "Up to 28%" },
              { label: "Time to launch", value: "6 weeks" },
              { label: "Experiments shipped", value: "30 days" },
            ].map((item) => (
              <div key={item.label} className={card + " flex items-center justify-between text-sm"}>
                <span>{item.label}</span>
                <span className="font-[var(--font-display)] text-base">{item.value}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500">
            Measured across strategy, build, and optimization phases.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-[var(--font-display)] text-3xl tracking-tight">Trusted by teams building enterprise growth</h2>
            <p className="text-slate-600 mt-2 max-w-2xl">
              We partner with leaders who need a website that drives pipeline and a system that keeps it
              growing.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <BadgeCheck className="h-4 w-4 text-emerald-700" />
            Conversion-first delivery
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {trustLogos.map((logo, index) => (
            <div key={`${logo}-${index}`} className={card + " text-center text-xs text-slate-500"}>
              {logo}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1.05fr,0.95fr] items-start">
        <div className="space-y-4">
          <h2 className="font-[var(--font-display)] text-3xl tracking-tight">Most enterprise websites stall after launch</h2>
          <p className="text-slate-600">
            The build is only half the work. Without a system to capture, qualify, and act, conversion
            gains fade fast.
          </p>
          <div className="grid gap-4">
            {problems.map((item) => (
              <div key={item.title} className={card}>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Target className="h-4 w-4 text-emerald-700" />
                  <span>{item.title}</span>
                </div>
                <p className="text-sm text-slate-600 mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={cardSoft + " space-y-4"}>
          <div className="text-xs text-slate-500">Outcome snapshot</div>
          <div className="space-y-3 text-sm text-slate-600">
            {["Average conversion lift tracked", "Faster experiments shipped", "Unified website + CRM reporting"].map((metric) => (
              <div key={metric} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                <span>{metric}</span>
              </div>
            ))}
          </div>
          <Link href="/websites" className={secondaryButton + " text-xs"}>
            See the website system
          </Link>
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="font-[var(--font-display)] text-3xl tracking-tight">The platform behind your website</h2>
          <p className="text-slate-600 mt-2 max-w-2xl">
            Your site is the front door. The platform is what keeps it converting week after week.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Link key={pillar.title} href={pillar.href} className={card + " space-y-3"}>
                <div className="h-10 w-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-lg font-semibold">{pillar.title}</div>
                <p className="text-sm text-slate-600">{pillar.description}</p>
                <span className="text-xs text-emerald-700 flex items-center gap-1">
                  Explore <ChevronRight className="h-3 w-3" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className={card + " p-8"}>
        <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] items-start">
          <div className="space-y-4">
            <h2 className="font-[var(--font-display)] text-3xl tracking-tight">A proven path to launch and scale</h2>
            <p className="text-slate-600">
              We align strategy, design, and execution so you see measurable wins fast.
            </p>
            <div className="grid gap-4">
              {steps.map((step, index) => (
                <div key={step.title} className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-full border border-slate-200/70 bg-white flex items-center justify-center text-xs font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{step.title}</div>
                    <p className="text-sm text-slate-600 mt-1">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={cardSoft + " space-y-4"}>
            <div className={chip}>First 30 days</div>
            <div className="text-lg font-semibold">What you get early</div>
            <div className="space-y-3">
              {deliverables.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-slate-600">
                  <Waypoints className="h-4 w-4 text-emerald-700" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-[var(--font-display)] text-3xl tracking-tight">Proof from enterprise teams</h2>
            <p className="text-slate-600 mt-2 max-w-2xl">
              Short, outcome-first stories that show what changes when the website and platform work together.
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

      <section className={card + " p-8"}>
        <div className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
          <div>
            <h2 className="font-[var(--font-display)] text-3xl tracking-tight">Security and governance built in</h2>
            <p className="text-slate-600 mt-2">
              Approvals, audit trails, and role-based controls keep every update accountable.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {security.map((item) => (
                <div key={item} className={card + " p-4 text-sm"}>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Lock className="h-4 w-4 text-emerald-700" />
                    <span>{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={cardSoft + " space-y-3"}>
            <div className="text-xs text-slate-500">Enterprise readiness</div>
            <div className="text-lg font-semibold">Security review ready</div>
            <p className="text-sm text-slate-600">
              We provide security documentation, DPA support, and a clear governance model for procurement teams.
            </p>
            <Link href="/security" className={secondaryButton + " text-xs"}>
              View security details
            </Link>
          </div>
        </div>
      </section>

      <section className={cardSoft + " p-10 text-center space-y-4"}>
        <div className={chip}>Website-first growth</div>
        <h2 className="font-[var(--font-display)] text-3xl md:text-4xl tracking-tight">
          Ready for a website that drives pipeline?
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Book a strategy call to map your conversion plan, timeline, and rollout options.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/contact" className={primaryButton}>
            Get a Website Strategy Call
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href="/websites" className={secondaryButton}>
            Explore the website offer
          </Link>
        </div>
      </section>
    </div>
  );
}
