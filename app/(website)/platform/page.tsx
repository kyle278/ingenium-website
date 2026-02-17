import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Waypoints,
  Workflow,
  Layers,
  Box,
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
  label: "Platform",
  title: "One portal for websites, AI operations, and revenue systems.",
  body:
    "Replace fragmented tools with a single system that connects your website, CRM, AI agents, and automations so every decision is measurable.",
  primary_cta: { label: "Book a Website Strategy Call", href: "/contact" },
  secondary_cta: { label: "Explore the Website Offer", href: "/websites" },
  preview: {
    label: "Portal preview",
    badge: "Role-based views",
    subtitle: "Website, CRM, AI, and automation controls in one workspace.",
  },
};

const fallbackModules = {
  label: "Inside the portal",
  title: "Every module designed to keep your website converting.",
  body: "Your site is the front door. The platform keeps it converting week after week.",
  link: { label: "Explore the website system", href: "/websites" },
  items: [
    { title: "Website analytics + editor", description: "Ship changes faster with governed approvals and live insights.", icon: "box" },
    { title: "CRM foundation", description: "Unified customer data, pipeline visibility, and lifecycle tracking.", icon: "layers" },
    { title: "AI agents", description: "Specialized agents for research, content, QA, and execution.", icon: "sparkles" },
    { title: "Agent departments", description: "Orchestrated teams with roles, escalation, and oversight.", icon: "users" },
    { title: "Automations", description: "Routing, enrichment, and workflows connected to outcomes.", icon: "workflow" },
  ],
};

const fallbackRoles = {
  label: "Role-based views",
  title: "One platform, tailored views for each team.",
  body: "Marketing, RevOps, and IT see what matters most without the noise.",
  items: [
    { title: "Marketing leaders", detail: "Launch faster, prove ROI, keep messaging consistent across channels.", icon: "target" },
    { title: "RevOps teams", detail: "Single source of truth for pipeline health, routing, and attribution.", icon: "waypoints" },
    { title: "IT + Security", detail: "Governance, audit logs, and role-based access for every change.", icon: "shield" },
  ],
};

const fallbackIntegrations = {
  label: "Integration-ready",
  title: "Connects to your existing systems.",
  body: "The platform plugs into your stack without a rip-and-replace project.",
  items: [
    "Salesforce and HubSpot",
    "Marketing automation platforms",
    "Data warehouses and BI tools",
    "SSO, SCIM, and identity providers",
  ],
  governance_card: {
    label: "Governance",
    title: "Enterprise controls built in.",
    body: "Approval workflows, audit trails, and security documentation ship alongside every module.",
    link: { label: "View security details", href: "/security" },
  },
};

const fallbackCta = {
  title: "Ready to consolidate your website and revenue stack?",
  body: "Book a strategy call to map the portal rollout and conversion plan.",
  primary_cta: { label: "Book a Strategy Call", href: "/contact" },
  secondary_cta: { label: "View Case Studies", href: "/case-studies" },
};

function getIcon(iconName: string | undefined) {
  switch (iconName) {
    case "layers":
      return Layers;
    case "sparkles":
      return Sparkles;
    case "users":
      return Users;
    case "workflow":
      return Workflow;
    case "target":
      return Target;
    case "waypoints":
      return Waypoints;
    case "shield":
      return ShieldCheck;
    default:
      return Box;
  }
}

export default async function PlatformPage() {
  const { sectionJson, sectionAttrs } = await loadPortalPageContent(PAGE_KEYS.PLATFORM);
  const hero = sectionJson(SECTION_KEYS.PLATFORM.HERO, fallbackHero);
  const modules = sectionJson(SECTION_KEYS.PLATFORM.MODULES, fallbackModules);
  const roles = sectionJson(SECTION_KEYS.PLATFORM.ROLES, fallbackRoles);
  const integrations = sectionJson(SECTION_KEYS.PLATFORM.INTEGRATIONS, fallbackIntegrations);
  const cta = sectionJson(SECTION_KEYS.PLATFORM.CTA, fallbackCta);

  return (
    <div className="space-y-24 md:space-y-32">
      <section className="grid items-center gap-12 lg:grid-cols-[1.05fr,0.95fr]">
        <div>
          <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.PLATFORM.HERO)}>{hero.label}</p>
          <h1 className="mt-6 max-w-2xl font-[var(--font-display)] text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl" {...sectionAttrs(SECTION_KEYS.PLATFORM.HERO)}>
            {hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600" {...sectionAttrs(SECTION_KEYS.PLATFORM.HERO)}>{hero.body}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={hero.primary_cta?.href ?? "/contact"} className={primaryButton} {...sectionAttrs(SECTION_KEYS.PLATFORM.HERO)}>
              {hero.primary_cta?.label ?? "Book a Website Strategy Call"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={hero.secondary_cta?.href ?? "/websites"} className={secondaryButton} {...sectionAttrs(SECTION_KEYS.PLATFORM.HERO)}>
              {hero.secondary_cta?.label ?? "Explore the Website Offer"}
            </Link>
          </div>
        </div>
        <div className={card}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400" {...sectionAttrs(SECTION_KEYS.PLATFORM.HERO)}>
              {hero.preview?.label ?? fallbackHero.preview.label}
            </span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700" {...sectionAttrs(SECTION_KEYS.PLATFORM.HERO)}>
              {hero.preview?.badge ?? fallbackHero.preview.badge}
            </span>
          </div>
          <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-medium text-slate-500" {...sectionAttrs(SECTION_KEYS.PLATFORM.HERO)}>
              {hero.preview?.subtitle ?? fallbackHero.preview.subtitle}
            </p>
            <div className="mt-4 grid gap-3">
              <div className="h-3 w-3/4 rounded-full bg-slate-200" />
              <div className="h-3 w-2/3 rounded-full bg-slate-200" />
              <div className="h-3 w-1/2 rounded-full bg-slate-200" />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1fr,1.1fr]">
        <div>
          <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.PLATFORM.MODULES)}>{modules.label}</p>
          <h2 className="mt-4 max-w-xl font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl" {...sectionAttrs(SECTION_KEYS.PLATFORM.MODULES)}>
            {modules.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600" {...sectionAttrs(SECTION_KEYS.PLATFORM.MODULES)}>{modules.body}</p>
          <Link href={modules.link?.href ?? "/websites"} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700" {...sectionAttrs(SECTION_KEYS.PLATFORM.MODULES)}>
            {modules.link?.label ?? "Explore the website system"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {(modules.items ?? fallbackModules.items).map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <div key={item.title} className={softCard} {...sectionAttrs(SECTION_KEYS.PLATFORM.MODULES)}>
                <Icon className="h-5 w-5 text-emerald-600" />
                <h3 className="mt-4 text-base font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-slate-200/70 bg-white/80 px-8 py-16 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
        <div className="mx-auto max-w-2xl text-center">
          <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.PLATFORM.ROLES)}>{roles.label}</p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl" {...sectionAttrs(SECTION_KEYS.PLATFORM.ROLES)}>
            {roles.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600" {...sectionAttrs(SECTION_KEYS.PLATFORM.ROLES)}>{roles.body}</p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {(roles.items ?? fallbackRoles.items).map((role) => {
            const Icon = getIcon(role.icon);
            return (
              <div key={role.title} className="rounded-2xl bg-white p-6" {...sectionAttrs(SECTION_KEYS.PLATFORM.ROLES)}>
                <Icon className="h-5 w-5 text-emerald-600" />
                <h3 className="mt-4 font-semibold text-slate-900">{role.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{role.detail}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1fr,1fr]">
        <div>
          <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.PLATFORM.INTEGRATIONS)}>{integrations.label}</p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl" {...sectionAttrs(SECTION_KEYS.PLATFORM.INTEGRATIONS)}>
            {integrations.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600" {...sectionAttrs(SECTION_KEYS.PLATFORM.INTEGRATIONS)}>{integrations.body}</p>
          <div className="mt-6 space-y-3">
            {(integrations.items ?? fallbackIntegrations.items).map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-600" {...sectionAttrs(SECTION_KEYS.PLATFORM.INTEGRATIONS)}>
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-emerald-200/60 bg-emerald-50/60 p-8" {...sectionAttrs(SECTION_KEYS.PLATFORM.INTEGRATIONS)}>
          <p className="inline-flex items-center rounded-full border border-emerald-200/60 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
            {integrations.governance_card?.label ?? fallbackIntegrations.governance_card.label}
          </p>
          <h3 className="mt-4 font-[var(--font-display)] text-2xl font-semibold">
            {integrations.governance_card?.title ?? fallbackIntegrations.governance_card.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {integrations.governance_card?.body ?? fallbackIntegrations.governance_card.body}
          </p>
          <Link href={integrations.governance_card?.link?.href ?? "/security"} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
            {integrations.governance_card?.link?.label ?? "View security details"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-emerald-600 px-8 py-16 text-center text-white shadow-[0_25px_60px_rgba(5,150,105,0.35)]">
        <h2 className="mx-auto max-w-3xl font-[var(--font-display)] text-3xl font-semibold tracking-tight md:text-4xl" {...sectionAttrs(SECTION_KEYS.PLATFORM.CTA)}>
          {cta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-emerald-50" {...sectionAttrs(SECTION_KEYS.PLATFORM.CTA)}>{cta.body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href={cta.primary_cta?.href ?? "/contact"} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50" {...sectionAttrs(SECTION_KEYS.PLATFORM.CTA)}>
            {cta.primary_cta?.label ?? "Book a Strategy Call"}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href={cta.secondary_cta?.href ?? "/case-studies"} className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10" {...sectionAttrs(SECTION_KEYS.PLATFORM.CTA)}>
            {cta.secondary_cta?.label ?? "View Case Studies"}
          </Link>
        </div>
      </section>
    </div>
  );
}
