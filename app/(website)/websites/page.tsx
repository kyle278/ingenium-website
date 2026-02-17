import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  LineChart,
  PenTool,
  Rocket,
  ShieldCheck,
  Target,
} from "lucide-react";

import { PAGE_KEYS, SECTION_KEYS } from "@/src/lib/content-map";
import { loadPortalPageContent } from "@/src/lib/portal-page-content";

export const dynamic = "force-dynamic";

const primaryButton =
  "inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(5,150,105,0.3)] transition hover:bg-emerald-700";
const secondaryButton =
  "inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50";
const sectionLabel = "text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700";
const card =
  "rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]";
const softCard =
  "rounded-3xl border border-white/60 bg-white/60 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)]";

const fallbackHero = {
  label: "Websites",
  title: "Enterprise websites that convert and compound.",
  body:
    "Your website is the first sales conversation. We build conversion-first sites that connect directly to your CRM, AI agents, and automation stack.",
  primary_cta: { label: "Book a Website Strategy Call", href: "/contact" },
  secondary_cta: { label: "View Case Studies", href: "/case-studies" },
  outcomes: [
    { value: "+38%", label: "Qualified demo requests" },
    { value: "6 wks", label: "Time to launch" },
    { value: "100%", label: "Pipeline attribution" },
    { value: "24/7", label: "Performance monitoring" },
  ],
  preview_badge: "+38% qualified demos",
  preview_label: "Conversion lift preview",
  preview_note: "Live dashboard preview for pipeline, attribution, and experiments.",
};

const fallbackEngine = {
  label: "Conversion engine",
  title: "Website to CRM to AI to revenue.",
  body: "We build the system around the site so every visitor becomes a measurable opportunity.",
  steps: [
    "Capture intent in real time",
    "Route to the right owner instantly",
    "Trigger AI follow-ups",
    "Measure every decision point",
  ],
};

const fallbackDifferentiators = {
  cards: [
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
  ],
};

const fallbackDeliverables = {
  items: [
    {
      title: "Narrative-first messaging",
      description: "Positioning, proof, and CTA flow mapped to buyer intent.",
      icon: "pen",
    },
    {
      title: "Conversion-grade design",
      description: "Enterprise UI that guides decision makers to action.",
      icon: "target",
    },
    {
      title: "Launch + growth system",
      description: "SEO, analytics, CRM integration, and AI-ready workflows.",
      icon: "rocket",
    },
  ],
};

const fallbackProcess = {
  label: "Process",
  title: "Implementation path in weeks, not months.",
  body: "We map your story, build the conversion system, and connect it to CRM and AI operations.",
  link: { label: "Request a scope call", href: "/contact" },
  timeline: [
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
  ],
};

const fallbackReadiness = {
  first_30_days: {
    label: "First 30 days",
    title: "What you receive early",
    items: [
      "Conversion blueprint and page hierarchy",
      "Design direction plus key templates",
      "CRM integration plan",
      "Experiment roadmap",
    ],
  },
  your_side: {
    label: "Your side",
    title: "What we need from you",
    items: [
      "Access to current analytics",
      "CRM and marketing tooling overview",
      "Stakeholder workshop attendance",
      "Brand and legal constraints",
    ],
  },
};

const fallbackProof = {
  label: "Proof",
  title: "Outcomes from enterprise teams.",
  link: { label: "View all case studies", href: "/case-studies" },
  items: [
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
  ],
};

const fallbackFaq = {
  title: "FAQ",
  items: [
    {
      question: "Can you rebuild our current site?",
      answer: "Yes. We migrate what works, redesign the conversion flow, and ship in phases.",
    },
    {
      question: "Will the site connect to our CRM?",
      answer: "Every form and CTA writes directly into your CRM with routing and automation triggers.",
    },
    {
      question: "What do you need from our team?",
      answer: "Brand inputs, stakeholder alignment, and access to CRM and analytics for discovery.",
    },
    {
      question: "How fast can we go live?",
      answer: "Most enterprise sites launch in 4-6 weeks with staged rollouts.",
    },
  ],
  enterprise_card: {
    label: "Enterprise ready",
    title: "Security and governance baked in.",
    body: "We align with your security requirements, approval workflows, and compliance needs from day one.",
    items: [
      "SOC 2 readiness and security documentation",
      "Role-based access and approvals",
      "Audit logs and data retention policies",
    ],
    link: { label: "View security details", href: "/security" },
  },
};

const fallbackCta = {
  title: "Ready to build a website that drives pipeline?",
  body: "Book a strategy call to map your conversion plan, timeline, and rollout options.",
  primary_cta: { label: "Book a Strategy Call", href: "/contact" },
  secondary_cta: { label: "Explore the Platform", href: "/platform" },
  launch_note: "Typical launch in 4-6 weeks",
};

function getDeliverableIcon(iconName: string | undefined) {
  switch (iconName) {
    case "pen":
      return PenTool;
    case "rocket":
      return Rocket;
    default:
      return Target;
  }
}

export default async function WebsitesPage() {
  const { sectionJson, sectionAttrs } = await loadPortalPageContent(PAGE_KEYS.WEBSITES);
  const hero = sectionJson(SECTION_KEYS.WEBSITES.HERO, fallbackHero);
  const engine = sectionJson(SECTION_KEYS.WEBSITES.ENGINE, fallbackEngine);
  const differentiators = sectionJson(SECTION_KEYS.WEBSITES.DIFFERENTIATORS, fallbackDifferentiators);
  const deliverables = sectionJson(SECTION_KEYS.WEBSITES.DELIVERABLES, fallbackDeliverables);
  const process = sectionJson(SECTION_KEYS.WEBSITES.PROCESS, fallbackProcess);
  const readiness = sectionJson(SECTION_KEYS.WEBSITES.READINESS, fallbackReadiness);
  const proof = sectionJson(SECTION_KEYS.WEBSITES.PROOF, fallbackProof);
  const faq = sectionJson(SECTION_KEYS.WEBSITES.FAQ, fallbackFaq);
  const cta = sectionJson(SECTION_KEYS.WEBSITES.CTA, fallbackCta);

  return (
    <div className="space-y-24 md:space-y-32">
      <section className="grid items-center gap-12 lg:grid-cols-[1.1fr,0.9fr]">
        <div>
          <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.WEBSITES.HERO)}>{hero.label}</p>
          <h1 className="mt-6 max-w-2xl font-[var(--font-display)] text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl" {...sectionAttrs(SECTION_KEYS.WEBSITES.HERO)}>
            {hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600" {...sectionAttrs(SECTION_KEYS.WEBSITES.HERO)}>
            {hero.body}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={hero.primary_cta?.href ?? "/contact"} className={primaryButton} {...sectionAttrs(SECTION_KEYS.WEBSITES.HERO)}>
              {hero.primary_cta?.label ?? "Book a Website Strategy Call"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={hero.secondary_cta?.href ?? "/case-studies"} className={secondaryButton} {...sectionAttrs(SECTION_KEYS.WEBSITES.HERO)}>
              {hero.secondary_cta?.label ?? "View Case Studies"}
            </Link>
          </div>
        </div>
        <div className={card}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400" {...sectionAttrs(SECTION_KEYS.WEBSITES.HERO)}>
              {hero.preview_label ?? fallbackHero.preview_label}
            </span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700" {...sectionAttrs(SECTION_KEYS.WEBSITES.HERO)}>
              {hero.preview_badge ?? fallbackHero.preview_badge}
            </span>
          </div>
          <div className="mt-6 grid gap-3">
            {(hero.outcomes ?? fallbackHero.outcomes).map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200/60 bg-white px-4 py-3 text-sm text-slate-600" {...sectionAttrs(SECTION_KEYS.WEBSITES.HERO)}>
                <span className="font-semibold text-slate-900">{item.value}</span>
                <span className="ml-2 text-slate-500">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500" {...sectionAttrs(SECTION_KEYS.WEBSITES.HERO)}>
            {hero.preview_note ?? fallbackHero.preview_note}
          </div>
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-slate-200/70 bg-white/80 px-8 py-16 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
        <div className="mx-auto max-w-2xl text-center">
          <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.WEBSITES.ENGINE)}>{engine.label}</p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl" {...sectionAttrs(SECTION_KEYS.WEBSITES.ENGINE)}>
            {engine.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600" {...sectionAttrs(SECTION_KEYS.WEBSITES.ENGINE)}>{engine.body}</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {(engine.steps ?? fallbackEngine.steps).map((item) => (
            <div key={item} className="rounded-2xl bg-white p-5 text-sm text-slate-600" {...sectionAttrs(SECTION_KEYS.WEBSITES.ENGINE)}>
              <span className="mb-3 block h-2.5 w-2.5 rounded-full bg-emerald-500" />
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {(differentiators.cards ?? fallbackDifferentiators.cards).map((item) => (
          <div key={item.title} className={`${item.emphasis ? "border-emerald-200/70" : "border-slate-200/70"} ${card}`} {...sectionAttrs(SECTION_KEYS.WEBSITES.DIFFERENTIATORS)}>
            <p className="text-sm font-semibold text-slate-900">{item.title}</p>
            <div className="mt-5 space-y-3">
              {(item.points ?? []).map((point) => (
                <div key={point} className="flex items-start gap-3 text-sm text-slate-600">
                  <CheckCircle2 className={`mt-0.5 h-4 w-4 ${item.emphasis ? "text-emerald-600" : "text-slate-300"}`} />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {(deliverables.items ?? fallbackDeliverables.items).map((item) => {
          const Icon = getDeliverableIcon(item.icon);
          return (
            <div key={item.title} className={card} {...sectionAttrs(SECTION_KEYS.WEBSITES.DELIVERABLES)}>
              <Icon className="h-6 w-6 text-emerald-600" />
              <h3 className="mt-4 font-[var(--font-display)] text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
            </div>
          );
        })}
      </section>

      <section className="grid gap-12 lg:grid-cols-[1fr,1.1fr]">
        <div>
          <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.WEBSITES.PROCESS)}>{process.label}</p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl" {...sectionAttrs(SECTION_KEYS.WEBSITES.PROCESS)}>
            {process.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600" {...sectionAttrs(SECTION_KEYS.WEBSITES.PROCESS)}>{process.body}</p>
          <Link href={process.link?.href ?? "/contact"} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700" {...sectionAttrs(SECTION_KEYS.WEBSITES.PROCESS)}>
            {process.link?.label ?? "Request a scope call"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="space-y-4">
          {(process.timeline ?? fallbackProcess.timeline).map((item) => (
            <div key={item.num} className={softCard} {...sectionAttrs(SECTION_KEYS.WEBSITES.PROCESS)}>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">{item.num}</span>
                <span className="text-sm font-semibold text-slate-900">{item.title}</span>
              </div>
              <p className="mt-3 text-sm text-slate-600">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className={card} {...sectionAttrs(SECTION_KEYS.WEBSITES.READINESS)}>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            {readiness.first_30_days?.label ?? fallbackReadiness.first_30_days.label}
          </p>
          <h3 className="mt-4 font-[var(--font-display)] text-2xl font-semibold">
            {readiness.first_30_days?.title ?? fallbackReadiness.first_30_days.title}
          </h3>
          <div className="mt-6 space-y-4">
            {(readiness.first_30_days?.items ?? fallbackReadiness.first_30_days.items).map((item) => (
              <div key={item} className="flex items-start gap-3">
                <LineChart className="mt-0.5 h-4 w-4 text-emerald-600" />
                <span className="text-sm text-slate-600">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={card} {...sectionAttrs(SECTION_KEYS.WEBSITES.READINESS)}>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            {readiness.your_side?.label ?? fallbackReadiness.your_side.label}
          </p>
          <h3 className="mt-4 font-[var(--font-display)] text-2xl font-semibold">
            {readiness.your_side?.title ?? fallbackReadiness.your_side.title}
          </h3>
          <div className="mt-6 space-y-4">
            {(readiness.your_side?.items ?? fallbackReadiness.your_side.items).map((item) => (
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
            <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.WEBSITES.PROOF)}>{proof.label}</p>
            <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl" {...sectionAttrs(SECTION_KEYS.WEBSITES.PROOF)}>
              {proof.title}
            </h2>
          </div>
          <Link href={proof.link?.href ?? "/case-studies"} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900" {...sectionAttrs(SECTION_KEYS.WEBSITES.PROOF)}>
            {proof.link?.label ?? "View all case studies"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {(proof.items ?? fallbackProof.items).map((item) => (
            <div key={item.label} className={card} {...sectionAttrs(SECTION_KEYS.WEBSITES.PROOF)}>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{item.label}</p>
              <p className="mt-4 text-4xl font-[var(--font-display)] font-semibold text-emerald-600">{item.metric}</p>
              <p className="mt-2 text-base font-semibold text-slate-900">{item.title}</p>
              <p className="mt-3 text-sm text-slate-600">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className={card} {...sectionAttrs(SECTION_KEYS.WEBSITES.FAQ)}>
          <h2 className="font-[var(--font-display)] text-2xl font-semibold">{faq.title}</h2>
          <div className="mt-6 space-y-6">
            {(faq.items ?? fallbackFaq.items).map((item) => (
              <div key={item.question}>
                <h3 className="text-sm font-semibold text-slate-900">{item.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-200/60 bg-emerald-50/60 p-8" {...sectionAttrs(SECTION_KEYS.WEBSITES.FAQ)}>
          <p className="inline-flex items-center rounded-full border border-emerald-200/60 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
            {faq.enterprise_card?.label ?? fallbackFaq.enterprise_card.label}
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-2xl font-semibold">
            {faq.enterprise_card?.title ?? fallbackFaq.enterprise_card.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {faq.enterprise_card?.body ?? fallbackFaq.enterprise_card.body}
          </p>
          <div className="mt-6 space-y-3">
            {(faq.enterprise_card?.items ?? fallbackFaq.enterprise_card.items).map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                {item}
              </div>
            ))}
          </div>
          <Link href={faq.enterprise_card?.link?.href ?? "/security"} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
            {faq.enterprise_card?.link?.label ?? "View security details"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-emerald-600 px-8 py-16 text-center text-white shadow-[0_25px_60px_rgba(5,150,105,0.35)]">
        <h2 className="mx-auto max-w-3xl font-[var(--font-display)] text-3xl font-semibold tracking-tight md:text-4xl" {...sectionAttrs(SECTION_KEYS.WEBSITES.CTA)}>
          {cta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-emerald-50" {...sectionAttrs(SECTION_KEYS.WEBSITES.CTA)}>
          {cta.body}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href={cta.primary_cta?.href ?? "/contact"} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50" {...sectionAttrs(SECTION_KEYS.WEBSITES.CTA)}>
            {cta.primary_cta?.label ?? "Book a Strategy Call"}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href={cta.secondary_cta?.href ?? "/platform"} className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10" {...sectionAttrs(SECTION_KEYS.WEBSITES.CTA)}>
            {cta.secondary_cta?.label ?? "Explore the Platform"}
          </Link>
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-emerald-100" {...sectionAttrs(SECTION_KEYS.WEBSITES.CTA)}>
          <Clock className="h-3.5 w-3.5" />
          {cta.launch_note ?? fallbackCta.launch_note}
        </div>
      </section>
    </div>
  );
}
