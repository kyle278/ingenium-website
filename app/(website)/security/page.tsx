import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, Lock, ShieldCheck } from "lucide-react";

import { PAGE_KEYS, SECTION_KEYS } from "@/src/lib/content-map";
import { loadPortalPageContent } from "@/src/lib/portal-page-content";

export const dynamic = "force-dynamic";

const primaryButton =
  "inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(5,150,105,0.3)] transition hover:bg-emerald-700";
const secondaryButton =
  "inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50";
const sectionLabel =
  "text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700";
const card =
  "rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]";

const fallbackHero = {
  label: "Security",
  title: "Enterprise security and governance by design.",
  body: "Ingenium is built to meet enterprise security standards, with audit trails and approval workflows baked into every system.",
  primary_cta: {
    label: "Request Security Packet",
    href: "/contact",
  },
  secondary_cta: {
    label: "Explore the Platform",
    href: "/platform",
  },
  compliance_label: "Compliance highlights",
  compliance_note: "SOC 2 readiness and GDPR alignment supported on request.",
  compliance_items: [
    "Security questionnaires and vendor risk reviews",
    "DPA and privacy documentation",
    "Data retention and access policies",
  ],
};

const fallbackControls = {
  label: "Security controls",
  title: "Built-in controls for enterprise teams.",
  body: "Every system ships with the access controls, logging, and encryption your security team expects.",
  items: [
    "Role-based access controls",
    "SSO and SAML with SCIM support",
    "Audit logs for every change",
    "Data encryption in transit and at rest",
  ],
};

const fallbackGovernance = {
  label: "AI governance",
  title: "Governance built for AI workflows.",
  body: "Every AI workflow is governed by approvals, logging, and role-based controls.",
  items: [
    "Approval workflows for AI actions",
    "Escalation paths for sensitive tasks",
    "Version control and rollback",
    "Security documentation for procurement",
  ],
  card: {
    label: "Compliance posture",
    title: "SOC 2 readiness and GDPR alignment.",
    body: "We support enterprise compliance requirements with documented controls and policies.",
    items: [
      "Security questionnaires",
      "Vendor risk reviews",
      "Privacy documentation",
    ],
  },
};

const fallbackCta = {
  title: "Need a security review?",
  body: "We can provide documentation, controls, and a security walkthrough for your procurement team.",
  primary_cta: {
    label: "Request Security Packet",
    href: "/contact",
  },
  secondary_cta: {
    label: "View Case Studies",
    href: "/case-studies",
  },
};

export default async function SecurityPage() {
  const { sectionJson, sectionAttrs } = await loadPortalPageContent(PAGE_KEYS.SECURITY);
  const hero = sectionJson(SECTION_KEYS.SECURITY.HERO, fallbackHero);
  const controls = sectionJson(SECTION_KEYS.SECURITY.CONTROLS, fallbackControls);
  const governance = sectionJson(SECTION_KEYS.SECURITY.GOVERNANCE, fallbackGovernance);
  const cta = sectionJson(SECTION_KEYS.SECURITY.CTA, fallbackCta);
  const complianceItems = Array.isArray(hero.compliance_items)
    ? hero.compliance_items
    : fallbackHero.compliance_items;
  const controlItems = Array.isArray(controls.items)
    ? controls.items
    : fallbackControls.items;
  const governanceItems = Array.isArray(governance.items)
    ? governance.items
    : fallbackGovernance.items;
  const governanceCardItems = Array.isArray(governance.card?.items)
    ? governance.card.items
    : fallbackGovernance.card.items;

  return (
    <div className="space-y-24 md:space-y-32">
      <section className="grid items-center gap-12 lg:grid-cols-[1.05fr,0.95fr]">
        <div>
          <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.SECURITY.HERO)}>
            {hero.label}
          </p>
          <h1
            className="mt-6 max-w-2xl font-[var(--font-display)] text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
            {...sectionAttrs(SECTION_KEYS.SECURITY.HERO)}
          >
            {hero.title}
          </h1>
          <p
            className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600"
            {...sectionAttrs(SECTION_KEYS.SECURITY.HERO)}
          >
            {hero.body}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={hero.primary_cta?.href ?? "/contact"}
              className={primaryButton}
              {...sectionAttrs(SECTION_KEYS.SECURITY.HERO)}
            >
              {hero.primary_cta?.label ?? "Request Security Packet"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={hero.secondary_cta?.href ?? "/platform"}
              className={secondaryButton}
              {...sectionAttrs(SECTION_KEYS.SECURITY.HERO)}
            >
              {hero.secondary_cta?.label ?? "Explore the Platform"}
            </Link>
          </div>
        </div>
        <div className={card}>
          <p
            className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400"
            {...sectionAttrs(SECTION_KEYS.SECURITY.HERO)}
          >
            {hero.compliance_label ?? "Compliance highlights"}
          </p>
          <div className="mt-6 space-y-3">
            {complianceItems.map((item, index) => (
              <div
                key={`${typeof item === "string" ? item : "compliance"}-${index}`}
                className="flex items-center gap-3 text-sm text-slate-600"
                {...sectionAttrs(SECTION_KEYS.SECURITY.HERO)}
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                {typeof item === "string" ? item : fallbackHero.compliance_items[index]}
              </div>
            ))}
          </div>
          <div
            className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500"
            {...sectionAttrs(SECTION_KEYS.SECURITY.HERO)}
          >
            {hero.compliance_note ?? "SOC 2 readiness and GDPR alignment supported on request."}
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1fr,1.1fr]">
        <div>
          <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.SECURITY.CONTROLS)}>
            {controls.label}
          </p>
          <h2
            className="mt-4 max-w-xl font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl"
            {...sectionAttrs(SECTION_KEYS.SECURITY.CONTROLS)}
          >
            {controls.title}
          </h2>
          <p
            className="mt-4 text-lg leading-relaxed text-slate-600"
            {...sectionAttrs(SECTION_KEYS.SECURITY.CONTROLS)}
          >
            {controls.body}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {controlItems.map((item, index) => (
            <div
              key={`${typeof item === "string" ? item : "control"}-${index}`}
              className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-600"
              {...sectionAttrs(SECTION_KEYS.SECURITY.CONTROLS)}
            >
              <Lock className="h-4 w-4 text-emerald-600" />
              {typeof item === "string" ? item : fallbackControls.items[index]}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-slate-200/70 bg-white/80 px-8 py-16 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
        <div className="grid gap-12 lg:grid-cols-[1fr,0.9fr]">
          <div>
            <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.SECURITY.GOVERNANCE)}>
              {governance.label}
            </p>
            <h2
              className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl"
              {...sectionAttrs(SECTION_KEYS.SECURITY.GOVERNANCE)}
            >
              {governance.title}
            </h2>
            <p
              className="mt-4 text-lg leading-relaxed text-slate-600"
              {...sectionAttrs(SECTION_KEYS.SECURITY.GOVERNANCE)}
            >
              {governance.body}
            </p>
            <div className="mt-6 space-y-3">
              {governanceItems.map((item, index) => (
                <div
                  key={`${typeof item === "string" ? item : "governance"}-${index}`}
                  className="flex items-center gap-3 text-sm text-slate-600"
                  {...sectionAttrs(SECTION_KEYS.SECURITY.GOVERNANCE)}
                >
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  {typeof item === "string" ? item : fallbackGovernance.items[index]}
                </div>
              ))}
            </div>
          </div>
          <div
            className="rounded-2xl border border-emerald-200/60 bg-emerald-50/60 p-6"
            {...sectionAttrs(SECTION_KEYS.SECURITY.GOVERNANCE)}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
              {governance.card?.label ?? fallbackGovernance.card.label}
            </p>
            <h3 className="mt-3 font-[var(--font-display)] text-xl font-semibold text-slate-900">
              {governance.card?.title ?? fallbackGovernance.card.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {governance.card?.body ?? fallbackGovernance.card.body}
            </p>
            <div className="mt-4 space-y-3">
              {governanceCardItems.map((item, index) => (
                <div
                  key={`${typeof item === "string" ? item : "card-item"}-${index}`}
                  className="flex items-center gap-3 text-sm text-slate-600"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  {typeof item === "string" ? item : fallbackGovernance.card.items[index]}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-emerald-600 px-8 py-16 text-center text-white shadow-[0_25px_60px_rgba(5,150,105,0.35)]">
        <h2
          className="mx-auto max-w-3xl font-[var(--font-display)] text-3xl font-semibold tracking-tight md:text-4xl"
          {...sectionAttrs(SECTION_KEYS.SECURITY.CTA)}
        >
          {cta.title}
        </h2>
        <p
          className="mx-auto mt-4 max-w-xl text-emerald-50"
          {...sectionAttrs(SECTION_KEYS.SECURITY.CTA)}
        >
          {cta.body}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href={cta.primary_cta?.href ?? "/contact"}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            {...sectionAttrs(SECTION_KEYS.SECURITY.CTA)}
          >
            {cta.primary_cta?.label ?? "Request Security Packet"}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href={cta.secondary_cta?.href ?? "/case-studies"}
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            {...sectionAttrs(SECTION_KEYS.SECURITY.CTA)}
          >
            {cta.secondary_cta?.label ?? "View Case Studies"}
          </Link>
        </div>
      </section>
    </div>
  );
}
