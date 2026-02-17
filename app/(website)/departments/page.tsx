import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Crown,
  Layers,
  ShieldCheck,
  Users,
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
  label: "AI Agent Departments",
  title: "Full AI departments with roles, hierarchy, and approvals.",
  body:
    "Move beyond single agents. Deploy multi-agent departments that run entire business functions with governance and accountability.",
  primary_cta: { label: "Book a Strategy Call", href: "/contact" },
  secondary_cta: { label: "View AI Agents", href: "/agents" },
  preview: {
    label: "Department blueprint",
    badge: "Human-led oversight",
    items: [
      "Role-based agents with defined scopes",
      "Approval checkpoints for every action",
      "Escalation paths to human owners",
      "Audit trail across decisions",
    ],
    note: "Departments align to your KPIs, governance, and reporting standards.",
  },
};

const fallbackDepartments = {
  label: "Departments",
  title: "Built for outcomes, not experiments.",
  body: "Each department is designed around a specific business function with measurable KPIs.",
  items: [
    { title: "Marketing Operations", focus: "Campaign execution, content throughput, and conversion testing." },
    { title: "Sales Operations", focus: "Lead routing, pipeline hygiene, and automated follow-up playbooks." },
    { title: "Customer Success", focus: "Health scoring, renewal readiness, and churn prevention workflows." },
    { title: "Growth Ops", focus: "Experiment design, funnel diagnostics, and demand generation signals." },
  ],
};

const fallbackGovernance = {
  label: "Governance",
  title: "Human leaders stay in control.",
  body: "Departments operate inside your security standards and approval workflows.",
  outcomes: [
    "Faster execution without additional headcount",
    "Clear ownership for each workflow",
    "Governed automation aligned to policy",
    "Continuous optimization tied to KPIs",
  ],
  oversight: {
    label: "Oversight model",
    items: [
      "Escalations for high-risk actions",
      "Approval thresholds by role",
      "Visibility across every task",
      "Security review documentation",
    ],
  },
};

const fallbackStructure = {
  label: "How it works",
  title: "Example department structure.",
  items: [
    "Department lead sets goals and approves playbooks",
    "Specialist agents execute research and content tasks",
    "QA agent validates compliance and tone",
    "Ops agent routes updates to CRM and analytics",
  ],
  card: {
    label: "Aligned to your website",
    title: "Departments that keep your site converting.",
    body: "Each department is mapped to website conversion goals and pipeline outcomes.",
    link: { label: "Explore the platform", href: "/platform" },
  },
};

const fallbackCta = {
  title: "Ready to launch an AI department?",
  body: "Book a strategy call to define department roles, governance, and rollout.",
  primary_cta: { label: "Book a Strategy Call", href: "/contact" },
  secondary_cta: { label: "View AI Agents", href: "/agents" },
};

export default async function DepartmentsPage() {
  const { sectionJson, sectionAttrs } = await loadPortalPageContent(PAGE_KEYS.DEPARTMENTS);
  const hero = sectionJson(SECTION_KEYS.DEPARTMENTS.HERO, fallbackHero);
  const departments = sectionJson(SECTION_KEYS.DEPARTMENTS.DEPARTMENTS, fallbackDepartments);
  const governance = sectionJson(SECTION_KEYS.DEPARTMENTS.GOVERNANCE, fallbackGovernance);
  const structure = sectionJson(SECTION_KEYS.DEPARTMENTS.STRUCTURE, fallbackStructure);
  const cta = sectionJson(SECTION_KEYS.DEPARTMENTS.CTA, fallbackCta);

  return (
    <div className="space-y-24 md:space-y-32">
      <section className="grid items-center gap-12 lg:grid-cols-[1.05fr,0.95fr]">
        <div>
          <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.HERO)}>{hero.label}</p>
          <h1 className="mt-6 max-w-2xl font-[var(--font-display)] text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl" {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.HERO)}>
            {hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600" {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.HERO)}>{hero.body}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={hero.primary_cta?.href ?? "/contact"} className={primaryButton} {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.HERO)}>
              {hero.primary_cta?.label ?? "Book a Strategy Call"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={hero.secondary_cta?.href ?? "/agents"} className={secondaryButton} {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.HERO)}>
              {hero.secondary_cta?.label ?? "View AI Agents"}
            </Link>
          </div>
        </div>
        <div className={card}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400" {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.HERO)}>
              {hero.preview?.label ?? fallbackHero.preview.label}
            </span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700" {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.HERO)}>
              {hero.preview?.badge ?? fallbackHero.preview.badge}
            </span>
          </div>
          <div className="mt-6 space-y-4">
            {(hero.preview?.items ?? fallbackHero.preview.items).map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm text-slate-600" {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.HERO)}>
                <Layers className="mt-0.5 h-4 w-4 text-emerald-600" />
                {item}
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500" {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.HERO)}>
            {hero.preview?.note ?? fallbackHero.preview.note}
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1fr,1.1fr]">
        <div>
          <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.DEPARTMENTS)}>{departments.label}</p>
          <h2 className="mt-4 max-w-xl font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl" {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.DEPARTMENTS)}>
            {departments.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600" {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.DEPARTMENTS)}>{departments.body}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {(departments.items ?? fallbackDepartments.items).map((item) => (
            <div key={item.title} className={softCard} {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.DEPARTMENTS)}>
              <Users className="h-5 w-5 text-emerald-600" />
              <h3 className="mt-4 text-base font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.focus}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-slate-200/70 bg-white/80 px-8 py-16 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
        <div className="grid gap-12 lg:grid-cols-[1fr,0.9fr]">
          <div>
            <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.GOVERNANCE)}>{governance.label}</p>
            <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl" {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.GOVERNANCE)}>
              {governance.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600" {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.GOVERNANCE)}>{governance.body}</p>
            <div className="mt-8 space-y-3">
              {(governance.outcomes ?? fallbackGovernance.outcomes).map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-600" {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.GOVERNANCE)}>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/60 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700" {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.GOVERNANCE)}>
              {governance.oversight?.label ?? fallbackGovernance.oversight.label}
            </p>
            <div className="mt-4 space-y-3">
              {(governance.oversight?.items ?? fallbackGovernance.oversight.items).map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-600" {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.GOVERNANCE)}>
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1fr,1fr]">
        <div>
          <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.STRUCTURE)}>{structure.label}</p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl" {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.STRUCTURE)}>
            {structure.title}
          </h2>
          <div className="mt-6 space-y-3">
            {(structure.items ?? fallbackStructure.items).map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-600" {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.STRUCTURE)}>
                <Crown className="h-4 w-4 text-emerald-600" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-emerald-200/60 bg-emerald-50/60 p-8">
          <p className="inline-flex items-center rounded-full border border-emerald-200/60 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700" {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.STRUCTURE)}>
            {structure.card?.label ?? fallbackStructure.card.label}
          </p>
          <h3 className="mt-4 font-[var(--font-display)] text-2xl font-semibold text-slate-900" {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.STRUCTURE)}>
            {structure.card?.title ?? fallbackStructure.card.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600" {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.STRUCTURE)}>
            {structure.card?.body ?? fallbackStructure.card.body}
          </p>
          <Link href={structure.card?.link?.href ?? "/platform"} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700" {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.STRUCTURE)}>
            {structure.card?.link?.label ?? "Explore the platform"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-emerald-600 px-8 py-16 text-center text-white shadow-[0_25px_60px_rgba(5,150,105,0.35)]">
        <h2 className="mx-auto max-w-3xl font-[var(--font-display)] text-3xl font-semibold tracking-tight md:text-4xl" {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.CTA)}>
          {cta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-emerald-50" {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.CTA)}>{cta.body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href={cta.primary_cta?.href ?? "/contact"} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50" {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.CTA)}>
            {cta.primary_cta?.label ?? "Book a Strategy Call"}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href={cta.secondary_cta?.href ?? "/agents"} className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10" {...sectionAttrs(SECTION_KEYS.DEPARTMENTS.CTA)}>
            {cta.secondary_cta?.label ?? "View AI Agents"}
          </Link>
        </div>
      </section>
    </div>
  );
}
