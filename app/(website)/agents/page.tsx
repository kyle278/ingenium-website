import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  ShieldCheck,
  Target,
  Waypoints,
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
  label: "AI Agents",
  title: "AI agents that execute, not just assist.",
  body:
    "Deploy specialized agents that handle research, content, and operational execution while your team retains oversight and control.",
  primary_cta: { label: "Book a Strategy Call", href: "/contact" },
  secondary_cta: { label: "Explore Agent Departments", href: "/departments" },
  workflow_preview: {
    label: "Agent workflow",
    badge: "Human-approved",
    items: [
      "Inbound lead to AI qualification to CRM routing",
      "Content brief to AI draft to human approval to publish",
      "Account signals to playbook launch to SDR notification",
    ],
    note: "Example: AI qualification alerts delivered to SDRs with full context.",
  },
};

const fallbackCapabilities = {
  label: "Capabilities",
  title: "What agents do inside the Ingenium system.",
  body: "Each agent has a focused role aligned to your revenue workflow and reporting standards.",
  items: [
    { title: "Research and intelligence", detail: "Market scans, competitor tracking, and buyer intent analysis." },
    { title: "Content execution", detail: "Drafts, variations, and QA aligned to your brand governance." },
    { title: "Revenue operations", detail: "Lead routing, enrichment, and follow-up triggered by behavior." },
    { title: "Sales enablement", detail: "Briefs, call prep, and account insights delivered to sellers." },
  ],
};

const fallbackGovernance = {
  label: "Enterprise governance",
  title: "AI agents operate inside your controls.",
  body: "Approvals, audit logs, and security requirements govern every automated action.",
  safeguards: [
    "Approval workflows with role-based permissions",
    "Audit logs for every automated action",
    "Human-in-the-loop checkpoints",
    "Security and compliance alignment",
  ],
  agent_pack: {
    label: "Example agent pack",
    title: "Marketing response team",
    items: [
      "Research agent maps competitive positioning",
      "Content agent drafts personalized follow-ups",
      "QA agent validates tone and compliance",
      "Ops agent routes to CRM owner",
    ],
  },
};

const fallbackImpact = {
  label: "Impact",
  title: "Where agents create measurable results.",
  items: [
    "Speed up lead qualification and routing",
    "Maintain consistent follow-up with high intent accounts",
    "Expand content output without adding headcount",
    "Surface risks and opportunities across the pipeline",
  ],
  card: {
    label: "Aligned with your website",
    title: "Every agent action ties back to conversion.",
    body: "Agents connect directly to website signals, CRM records, and automation rules so outcomes stay measurable.",
    link: { label: "Explore the platform", href: "/platform" },
  },
};

const fallbackCta = {
  title: "Ready to deploy AI agents with governance?",
  body: "Book a strategy call to map agent roles, workflows, and rollout priorities.",
  primary_cta: { label: "Book a Strategy Call", href: "/contact" },
  secondary_cta: { label: "See Agent Departments", href: "/departments" },
};

export default async function AgentsPage() {
  const { sectionJson, sectionAttrs } = await loadPortalPageContent(PAGE_KEYS.AGENTS);
  const hero = sectionJson(SECTION_KEYS.AGENTS.HERO, fallbackHero);
  const capabilities = sectionJson(SECTION_KEYS.AGENTS.CAPABILITIES, fallbackCapabilities);
  const governance = sectionJson(SECTION_KEYS.AGENTS.GOVERNANCE, fallbackGovernance);
  const impact = sectionJson(SECTION_KEYS.AGENTS.IMPACT, fallbackImpact);
  const cta = sectionJson(SECTION_KEYS.AGENTS.CTA, fallbackCta);

  return (
    <div className="space-y-24 md:space-y-32">
      <section className="grid items-center gap-12 lg:grid-cols-[1.05fr,0.95fr]">
        <div>
          <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.AGENTS.HERO)}>{hero.label}</p>
          <h1 className="mt-6 max-w-2xl font-[var(--font-display)] text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl" {...sectionAttrs(SECTION_KEYS.AGENTS.HERO)}>
            {hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600" {...sectionAttrs(SECTION_KEYS.AGENTS.HERO)}>{hero.body}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={hero.primary_cta?.href ?? "/contact"} className={primaryButton} {...sectionAttrs(SECTION_KEYS.AGENTS.HERO)}>
              {hero.primary_cta?.label ?? "Book a Strategy Call"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={hero.secondary_cta?.href ?? "/departments"} className={secondaryButton} {...sectionAttrs(SECTION_KEYS.AGENTS.HERO)}>
              {hero.secondary_cta?.label ?? "Explore Agent Departments"}
            </Link>
          </div>
        </div>
        <div className={card}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400" {...sectionAttrs(SECTION_KEYS.AGENTS.HERO)}>
              {hero.workflow_preview?.label ?? fallbackHero.workflow_preview.label}
            </span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700" {...sectionAttrs(SECTION_KEYS.AGENTS.HERO)}>
              {hero.workflow_preview?.badge ?? fallbackHero.workflow_preview.badge}
            </span>
          </div>
          <div className="mt-6 space-y-4">
            {(hero.workflow_preview?.items ?? fallbackHero.workflow_preview.items).map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm text-slate-600" {...sectionAttrs(SECTION_KEYS.AGENTS.HERO)}>
                <Bot className="mt-0.5 h-4 w-4 text-emerald-600" />
                {item}
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500" {...sectionAttrs(SECTION_KEYS.AGENTS.HERO)}>
            {hero.workflow_preview?.note ?? fallbackHero.workflow_preview.note}
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1fr,1.1fr]">
        <div>
          <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.AGENTS.CAPABILITIES)}>{capabilities.label}</p>
          <h2 className="mt-4 max-w-xl font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl" {...sectionAttrs(SECTION_KEYS.AGENTS.CAPABILITIES)}>
            {capabilities.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600" {...sectionAttrs(SECTION_KEYS.AGENTS.CAPABILITIES)}>{capabilities.body}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {(capabilities.items ?? fallbackCapabilities.items).map((item) => (
            <div key={item.title} className={softCard} {...sectionAttrs(SECTION_KEYS.AGENTS.CAPABILITIES)}>
              <Target className="h-5 w-5 text-emerald-600" />
              <h3 className="mt-4 text-base font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-slate-200/70 bg-white/80 px-8 py-16 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
        <div className="grid gap-12 lg:grid-cols-[1fr,0.9fr]">
          <div>
            <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.AGENTS.GOVERNANCE)}>{governance.label}</p>
            <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl" {...sectionAttrs(SECTION_KEYS.AGENTS.GOVERNANCE)}>
              {governance.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600" {...sectionAttrs(SECTION_KEYS.AGENTS.GOVERNANCE)}>{governance.body}</p>
            <div className="mt-8 space-y-3">
              {(governance.safeguards ?? fallbackGovernance.safeguards).map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-600" {...sectionAttrs(SECTION_KEYS.AGENTS.GOVERNANCE)}>
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/60 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700" {...sectionAttrs(SECTION_KEYS.AGENTS.GOVERNANCE)}>
              {governance.agent_pack?.label ?? fallbackGovernance.agent_pack.label}
            </p>
            <h3 className="mt-3 font-[var(--font-display)] text-xl font-semibold text-slate-900" {...sectionAttrs(SECTION_KEYS.AGENTS.GOVERNANCE)}>
              {governance.agent_pack?.title ?? fallbackGovernance.agent_pack.title}
            </h3>
            <div className="mt-4 space-y-3">
              {(governance.agent_pack?.items ?? fallbackGovernance.agent_pack.items).map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-600" {...sectionAttrs(SECTION_KEYS.AGENTS.GOVERNANCE)}>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1fr,1fr]">
        <div>
          <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.AGENTS.IMPACT)}>{impact.label}</p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl" {...sectionAttrs(SECTION_KEYS.AGENTS.IMPACT)}>
            {impact.title}
          </h2>
          <div className="mt-6 space-y-3">
            {(impact.items ?? fallbackImpact.items).map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-600" {...sectionAttrs(SECTION_KEYS.AGENTS.IMPACT)}>
                <Waypoints className="h-4 w-4 text-emerald-600" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-emerald-200/60 bg-emerald-50/60 p-8">
          <p className="inline-flex items-center rounded-full border border-emerald-200/60 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700" {...sectionAttrs(SECTION_KEYS.AGENTS.IMPACT)}>
            {impact.card?.label ?? fallbackImpact.card.label}
          </p>
          <h3 className="mt-4 font-[var(--font-display)] text-2xl font-semibold text-slate-900" {...sectionAttrs(SECTION_KEYS.AGENTS.IMPACT)}>
            {impact.card?.title ?? fallbackImpact.card.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600" {...sectionAttrs(SECTION_KEYS.AGENTS.IMPACT)}>
            {impact.card?.body ?? fallbackImpact.card.body}
          </p>
          <Link href={impact.card?.link?.href ?? "/platform"} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700" {...sectionAttrs(SECTION_KEYS.AGENTS.IMPACT)}>
            {impact.card?.link?.label ?? "Explore the platform"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-emerald-600 px-8 py-16 text-center text-white shadow-[0_25px_60px_rgba(5,150,105,0.35)]">
        <h2 className="mx-auto max-w-3xl font-[var(--font-display)] text-3xl font-semibold tracking-tight md:text-4xl" {...sectionAttrs(SECTION_KEYS.AGENTS.CTA)}>
          {cta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-emerald-50" {...sectionAttrs(SECTION_KEYS.AGENTS.CTA)}>{cta.body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href={cta.primary_cta?.href ?? "/contact"} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50" {...sectionAttrs(SECTION_KEYS.AGENTS.CTA)}>
            {cta.primary_cta?.label ?? "Book a Strategy Call"}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href={cta.secondary_cta?.href ?? "/departments"} className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10" {...sectionAttrs(SECTION_KEYS.AGENTS.CTA)}>
            {cta.secondary_cta?.label ?? "See Agent Departments"}
          </Link>
        </div>
      </section>
    </div>
  );
}
