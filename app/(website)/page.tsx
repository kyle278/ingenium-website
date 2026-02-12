import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Gauge,
  Layers,
  LayoutPanelTop,
  Lock,
  Sparkles,
  Target,
  Users,
  Waypoints,
  Workflow,
} from "lucide-react";
import { parseDelimited } from "./lib/contentParsers";
import { getWebsiteContent } from "./lib/websiteContent";

const trustLogosFallback = [
  "Client Logo",
  "Client Logo",
  "Client Logo",
  "Client Logo",
  "Client Logo",
];

const heroBadgesFallback = ["4-6 week launch", "Conversion-first", "Enterprise-ready"];

const heroStatsFallback = [
  { label: "Conversion lift", value: "Up to 28%" },
  { label: "Time to launch", value: "6 weeks" },
  { label: "Experiments shipped", value: "30 days" },
];

const problemCardsFallback = [
  {
    title: "Fragmented stack",
    description: "Website, CRM, and automation tools live in silos, so wins never compound.",
  },
  {
    title: "Slow iteration",
    description: "Every change waits on dev queues, so revenue experiments die in backlog.",
  },
  {
    title: "No ownership",
    description: "Multiple vendors, no single outcome owner, and inconsistent performance.",
  },
];

const stepsFallback = [
  {
    title: "Discover",
    detail: "Audit your funnel, define the conversion model, and align stakeholders.",
  },
  {
    title: "Build",
    detail: "Design and launch a custom site with integrated CRM and analytics.",
  },
  {
    title: "Run",
    detail: "Deploy agents and automations to keep optimizing after launch.",
  },
];

const deliverablesFallback = [
  "Conversion blueprint + messaging map",
  "Design system + component library",
  "Analytics instrumentation + dashboards",
  "AI operations roadmap for next 90 days",
];

const caseStudiesFallback = [
  {
    title: "FinTech platform",
    outcome: "Pipeline growth +32% in 90 days",
    detail: "Rebuilt enterprise site, unified CRM data, and launched conversion testing.",
  },
  {
    title: "Healthcare SaaS",
    outcome: "Demo conversions doubled",
    detail: "Streamlined navigation, added role-based pages, and automated follow-up.",
  },
  {
    title: "Enterprise services",
    outcome: "Launch in 6 weeks, 4 new markets",
    detail: "Localized pages with AI-assisted content governance and approvals.",
  },
];

const securityFallback = [
  "SSO / SAML access controls",
  "Role-based approvals",
  "Audit trails and activity logs",
  "Data residency options",
];

const outcomeMetricsFallback = [
  "Average conversion lift tracked",
  "Faster experiments shipped",
  "Unified website + CRM reporting",
];

export default async function WebsiteHomePage() {
  const content = await getWebsiteContent();

  const trustLogos = content.lines("home_trust_logos", trustLogosFallback);
  const heroBadges = content.lines("home_hero_badges", heroBadgesFallback);

  const heroStats = parseDelimited(
    content.lines(
      "home_hero_stats",
      heroStatsFallback.map((item) => `${item.label} | ${item.value}`)
    ),
    heroStatsFallback,
    (parts) => ({ label: parts[0], value: parts[1] }),
    2
  );

  const problemCards = parseDelimited(
    content.lines(
      "home_problem_cards",
      problemCardsFallback.map((item) => `${item.title} | ${item.description}`)
    ),
    problemCardsFallback,
    (parts) => ({ title: parts[0], description: parts[1] }),
    2
  );

  const steps = parseDelimited(
    content.lines(
      "home_steps",
      stepsFallback.map((step) => `${step.title} | ${step.detail}`)
    ),
    stepsFallback,
    (parts) => ({ title: parts[0], detail: parts[1] }),
    2
  );

  const deliverables = content.lines("home_deliverables", deliverablesFallback);

  const caseStudies = parseDelimited(
    content.lines(
      "home_case_studies",
      caseStudiesFallback.map(
        (item) => `${item.title} | ${item.outcome} | ${item.detail}`
      )
    ),
    caseStudiesFallback,
    (parts) => ({ title: parts[0], outcome: parts[1], detail: parts[2] }),
    3
  );

  const securityItems = content.lines("home_security_items", securityFallback);
  const outcomeMetrics = content.lines("home_outcome_metrics", outcomeMetricsFallback);

  const pillars = [
    {
      title: "Custom websites",
      description: "Enterprise-grade builds designed to convert and scale.",
      href: "/websites",
      icon: LayoutPanelTop,
    },
    {
      title: "AI agents",
      description: "Specialized agents for research, content, and execution.",
      href: "/agents",
      icon: Sparkles,
    },
    {
      title: "Agent departments",
      description: "Multi-agent orchestration with approvals and governance.",
      href: "/departments",
      icon: Users,
    },
    {
      title: "CRM foundation",
      description: "Unified customer data and revenue visibility.",
      href: "/crm",
      icon: Layers,
    },
    {
      title: "Automation + analytics",
      description: "Workflow automation tied to measurable outcomes.",
      href: "/automations",
      icon: Workflow,
    },
  ];

  return (
    <div className="space-y-24">
      <section className="grid gap-12 lg:grid-cols-[1.05fr,0.95fr] items-center">
        <div className="space-y-6">
          <div className="site-chip">
            {content.text("home_hero_chip", "Enterprise Website Systems")}
          </div>
          <h1 className="font-display text-4xl md:text-6xl leading-tight">
            {content.text(
              "home_hero_headline",
              "Enterprise websites built to convert, backed by AI operations."
            )}
          </h1>
          <p className="text-lg text-muted">
            {content.text(
              "home_hero_subtext",
              "We design and deploy conversion-first websites, then run the system behind them: agents, CRM, automations, and analytics that keep performance compounding."
            )}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/contact" className="btn-primary h-12 px-6 text-sm inline-flex items-center gap-2">
              {content.text("home_hero_primary_cta", "Get a Website Strategy Call")}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/case-studies" className="btn-secondary h-12 px-6 text-sm">
              {content.text("home_hero_secondary_cta", "View case studies")}
            </Link>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-muted">
            {heroBadges.map((badge) => (
              <span key={badge} className="site-badge">
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="site-card-bright p-6 space-y-5">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>{content.text("home_hero_card_title", "Live conversion dashboard")}</span>
            <span className="site-badge">{content.text("home_hero_card_badge", "Typical outcomes")}</span>
          </div>
          <div className="grid gap-3">
            {heroStats.map((item) => (
              <div key={item.label} className="site-card p-4 flex items-center justify-between text-sm">
                <span>{item.label}</span>
                <span className="font-display text-base">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="text-xs text-muted">
            {content.text("home_hero_card_note", "Measured across strategy, build, and optimization phases.")}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl">
              {content.text("home_trust_title", "Trusted by teams building enterprise growth")}
            </h2>
            <p className="text-muted mt-2 max-w-2xl">
              {content.text(
                "home_trust_subtext",
                "We partner with leaders who need a website that drives pipeline and a system that keeps it growing."
              )}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted">
            <Gauge className="h-4 w-4 text-[var(--accent)]" />
            {content.text("home_trust_metric", "Conversion-first delivery")}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {trustLogos.map((logo, index) => (
            <div key={`${logo}-${index}`} className="site-card p-4 text-center text-xs text-muted">
              {logo}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1.05fr,0.95fr] items-start">
        <div className="space-y-4">
          <h2 className="font-display text-3xl">
            {content.text("home_problem_title", "Most enterprise websites stall after launch")}
          </h2>
          <p className="text-muted">
            {content.text(
              "home_problem_subtext",
              "The build is only half the work. Without a system to capture, qualify, and act, conversion gains fade fast."
            )}
          </p>
          <div className="grid gap-4">
            {problemCards.map((card) => (
              <div key={card.title} className="site-card p-5">
                <div className="flex items-center gap-2 text-sm">
                  <Target className="h-4 w-4 text-[var(--accent)]" />
                  <span className="font-display">{card.title}</span>
                </div>
                <p className="text-sm text-muted mt-2">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="site-card-bright p-6 space-y-4">
          <div className="text-xs text-muted">{content.text("home_problem_card_label", "Outcome snapshot")}</div>
          <div className="space-y-3">
            {outcomeMetrics.map((metric) => (
              <div key={metric} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-[var(--accent)]" />
                <span className="text-muted">{metric}</span>
              </div>
            ))}
          </div>
          <Link href="/websites" className="btn-secondary h-10 px-4 text-xs inline-flex items-center">
            {content.text("home_problem_cta", "See the website system")}
          </Link>
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="font-display text-3xl">
            {content.text("home_pillars_title", "The platform behind your website")}
          </h2>
          <p className="text-muted mt-2 max-w-2xl">
            {content.text(
              "home_pillars_subtext",
              "Your site is the front door. The platform is what keeps it converting week after week."
            )}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Link key={pillar.title} href={pillar.href} className="site-card p-6 space-y-3">
                <div className="h-10 w-10 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-lg font-display">{pillar.title}</div>
                <p className="text-sm text-muted">{pillar.description}</p>
                <span className="text-xs text-[var(--accent)]">Explore</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="site-card p-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] items-start">
          <div className="space-y-4">
            <h2 className="font-display text-3xl">
              {content.text("home_steps_title", "A proven path to launch and scale")}
            </h2>
            <p className="text-muted">
              {content.text(
                "home_steps_subtext",
                "We align strategy, design, and execution so you see measurable wins fast."
              )}
            </p>
            <div className="grid gap-4">
              {steps.map((step, index) => (
                <div key={step.title} className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-full border border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-center text-xs font-display">
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
          <div className="site-card-bright p-6 space-y-4">
            <div className="site-chip">
              {content.text("home_deliverables_chip", "First 30 days")}
            </div>
            <div className="text-lg font-display">
              {content.text("home_deliverables_title", "What you get early")}
            </div>
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
            <h2 className="font-display text-3xl">
              {content.text("home_cases_title", "Proof from enterprise teams")}
            </h2>
            <p className="text-muted mt-2 max-w-2xl">
              {content.text(
                "home_cases_subtext",
                "Short, outcome-first stories that show what changes when the website and platform work together."
              )}
            </p>
          </div>
          <Link href="/case-studies" className="btn-secondary h-10 px-4 text-xs inline-flex items-center">
            {content.text("home_cases_cta", "See all case studies")}
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {caseStudies.map((item) => (
            <div key={item.title} className="site-card p-6 space-y-3">
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--text-subtle)]">{item.title}</div>
              <div className="text-lg font-display">{item.outcome}</div>
              <p className="text-sm text-muted">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="site-card p-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
          <div>
            <h2 className="font-display text-3xl">
              {content.text("home_security_title", "Security and governance built in")}
            </h2>
            <p className="text-muted mt-2">
              {content.text(
                "home_security_subtext",
                "Approvals, audit trails, and role-based controls keep every update accountable."
              )}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {securityItems.map((item) => (
                <div key={item} className="site-card p-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-[var(--accent)]" />
                    <span className="text-muted">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="site-card-bright p-6 space-y-3">
            <div className="text-xs text-muted">
              {content.text("home_security_card_label", "Enterprise readiness")}
            </div>
            <div className="text-lg font-display">
              {content.text("home_security_card_title", "Security review ready")}
            </div>
            <p className="text-sm text-muted">
              {content.text(
                "home_security_card_copy",
                "We provide security documentation, DPA support, and a clear governance model for procurement teams."
              )}
            </p>
            <Link href="/security" className="btn-secondary h-10 px-4 text-xs inline-flex items-center">
              {content.text("home_security_card_cta", "View security details")}
            </Link>
          </div>
        </div>
      </section>

      <section className="site-card-bright p-10 text-center space-y-4">
        <div className="site-chip">
          {content.text("home_final_chip", "Website-first growth")}
        </div>
        <h2 className="font-display text-3xl md:text-4xl">
          {content.text("home_final_title", "Ready for a website that drives pipeline?")}
        </h2>
        <p className="text-muted max-w-2xl mx-auto">
          {content.text(
            "home_final_subtext",
            "Book a strategy call to map your conversion plan, timeline, and rollout options."
          )}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="btn-primary h-12 px-6 text-sm inline-flex items-center gap-2">
            {content.text("home_final_primary_cta", "Get a Website Strategy Call")}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href="/websites" className="btn-secondary h-12 px-6 text-sm">
            {content.text("home_final_secondary_cta", "Explore the website offer")}
          </Link>
        </div>
      </section>
    </div>
  );
}
