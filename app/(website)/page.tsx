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

export default function HomePage() {
  return (
    <div className="space-y-24">
      <section className="grid gap-12 lg:grid-cols-[1.05fr,0.95fr] items-center">
        <div className="space-y-6">
          <div className="chip">Enterprise Website Systems</div>
          <h1 className="section-title text-4xl md:text-6xl leading-tight">
            Enterprise websites built to convert, backed by AI operations.
          </h1>
          <p className="text-lg text-muted">
            Ingenium Digital Consulting designs conversion-first websites and runs the system behind them:
            AI agents, CRM, automation, and analytics that keep performance compounding.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/contact" className="btn-primary text-sm">
              Get a Website Strategy Call
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/case-studies" className="btn-secondary text-sm">
              View case studies
            </Link>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-muted">
            {[
              "4-6 week launch",
              "Conversion-first design",
              "Enterprise security ready",
            ].map((item) => (
              <span key={item} className="badge">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="card-soft p-6 space-y-5">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>Live conversion dashboard</span>
            <span className="badge">Typical outcomes</span>
          </div>
          <div className="grid gap-3">
            {[
              { label: "Conversion lift", value: "Up to 28%" },
              { label: "Time to launch", value: "6 weeks" },
              { label: "Experiments shipped", value: "30 days" },
            ].map((item) => (
              <div key={item.label} className="card p-4 flex items-center justify-between text-sm">
                <span>{item.label}</span>
                <span className="section-title text-base">{item.value}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted">
            Measured across strategy, build, and optimization phases.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="section-title text-3xl">Trusted by teams building enterprise growth</h2>
            <p className="text-muted mt-2 max-w-2xl">
              We partner with leaders who need a website that drives pipeline and a system that keeps it
              growing.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted">
            <BadgeCheck className="h-4 w-4 text-[var(--accent)]" />
            Conversion-first delivery
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {trustLogos.map((logo, index) => (
            <div key={`${logo}-${index}`} className="card p-4 text-center text-xs text-muted">
              {logo}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1.05fr,0.95fr] items-start">
        <div className="space-y-4">
          <h2 className="section-title text-3xl">Most enterprise websites stall after launch</h2>
          <p className="text-muted">
            The build is only half the work. Without a system to capture, qualify, and act, conversion
            gains fade fast.
          </p>
          <div className="grid gap-4">
            {problems.map((item) => (
              <div key={item.title} className="card p-5">
                <div className="flex items-center gap-2 text-sm">
                  <Target className="h-4 w-4 text-[var(--accent)]" />
                  <span className="section-title">{item.title}</span>
                </div>
                <p className="text-sm text-muted mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="card-soft p-6 space-y-4">
          <div className="text-xs text-muted">Outcome snapshot</div>
          <div className="space-y-3 text-sm">
            {["Average conversion lift tracked", "Faster experiments shipped", "Unified website + CRM reporting"].map((metric) => (
              <div key={metric} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[var(--accent)]" />
                <span className="text-muted">{metric}</span>
              </div>
            ))}
          </div>
          <Link href="/websites" className="btn-secondary text-xs">
            See the website system
          </Link>
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="section-title text-3xl">The platform behind your website</h2>
          <p className="text-muted mt-2 max-w-2xl">
            Your site is the front door. The platform is what keeps it converting week after week.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Link key={pillar.title} href={pillar.href} className="card p-6 space-y-3">
                <div className="h-10 w-10 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-lg section-title">{pillar.title}</div>
                <p className="text-sm text-muted">{pillar.description}</p>
                <span className="text-xs text-[var(--accent)] flex items-center gap-1">
                  Explore <ChevronRight className="h-3 w-3" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="card p-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] items-start">
          <div className="space-y-4">
            <h2 className="section-title text-3xl">A proven path to launch and scale</h2>
            <p className="text-muted">
              We align strategy, design, and execution so you see measurable wins fast.
            </p>
            <div className="grid gap-4">
              {steps.map((step, index) => (
                <div key={step.title} className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-full border border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-center text-xs section-title">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{step.title}</div>
                    <p className="text-sm text-muted mt-1">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card-soft p-6 space-y-4">
            <div className="chip">First 30 days</div>
            <div className="text-lg section-title">What you get early</div>
            <div className="space-y-3">
              {deliverables.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm">
                  <Waypoints className="h-4 w-4 text-[var(--accent)]" />
                  <span className="text-muted">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="section-title text-3xl">Proof from enterprise teams</h2>
            <p className="text-muted mt-2 max-w-2xl">
              Short, outcome-first stories that show what changes when the website and platform work together.
            </p>
          </div>
          <Link href="/case-studies" className="btn-secondary text-xs">
            See all case studies
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {proof.map((item) => (
            <div key={item.title} className="card p-6 space-y-3">
              <div className="text-xs uppercase tracking-[0.2em] text-subtle">{item.title}</div>
              <div className="text-lg section-title">{item.outcome}</div>
              <p className="text-sm text-muted">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card p-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
          <div>
            <h2 className="section-title text-3xl">Security and governance built in</h2>
            <p className="text-muted mt-2">
              Approvals, audit trails, and role-based controls keep every update accountable.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {security.map((item) => (
                <div key={item} className="card p-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-[var(--accent)]" />
                    <span className="text-muted">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card-soft p-6 space-y-3">
            <div className="text-xs text-muted">Enterprise readiness</div>
            <div className="text-lg section-title">Security review ready</div>
            <p className="text-sm text-muted">
              We provide security documentation, DPA support, and a clear governance model for procurement teams.
            </p>
            <Link href="/security" className="btn-secondary text-xs">
              View security details
            </Link>
          </div>
        </div>
      </section>

      <section className="card-soft p-10 text-center space-y-4">
        <div className="chip">Website-first growth</div>
        <h2 className="section-title text-3xl md:text-4xl">
          Ready for a website that drives pipeline?
        </h2>
        <p className="text-muted max-w-2xl mx-auto">
          Book a strategy call to map your conversion plan, timeline, and rollout options.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="btn-primary text-sm">
            Get a Website Strategy Call
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href="/websites" className="btn-secondary text-sm">
            Explore the website offer
          </Link>
        </div>
      </section>
    </div>
  );
}
