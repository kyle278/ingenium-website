import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Database,
  Eye,
  FileCheck2,
  Fingerprint,
  Globe,
  KeyRound,
  Lock,
  Network,
  Shield,
  ShieldCheck,
  Siren,
  UserCheck,
} from "lucide-react";

import { PAGE_KEYS, SECTION_KEYS } from "@/src/lib/content-map";
import { loadPortalPageContent } from "@/src/lib/portal-page-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Enterprise Security and AI Governance | Ingenium",
  description:
    "Enterprise-grade security controls, AI governance frameworks, and compliance readiness. Built for regulated industries and procurement teams.",
  openGraph: {
    title: "Enterprise Security and AI Governance | Ingenium",
    description:
      "Enterprise-grade security controls and AI governance frameworks for regulated and procurement-heavy organizations.",
    url: "/security",
  },
  alternates: { canonical: "/security" },
};

/* ------------------------------------------------------------------ */
/*  Shared style tokens (dark theme)                                   */
/* ------------------------------------------------------------------ */

const primaryButton =
  "inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(5,150,105,0.35)] transition hover:bg-emerald-500";
const secondaryButton =
  "inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800";
const tertiaryButton =
  "inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 transition hover:text-emerald-300";
const sectionLabel =
  "text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400";
const darkCard =
  "rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-sm";
const darkCardLg =
  "rounded-3xl border border-slate-800 bg-slate-900/80 p-8 backdrop-blur-sm";

/* ------------------------------------------------------------------ */
/*  Fallback content (portal-overridable)                              */
/* ------------------------------------------------------------------ */

const fallbackHero = {
  label: "Enterprise Security & Governance",
  title: "Security and governance engineered into every layer.",
  body: "Ingenium is built for organizations where security is non-negotiable. Every system ships with enterprise-grade controls, audit infrastructure, and compliance documentation designed to satisfy CTOs, procurement teams, and regulated industry requirements.",
  primary_cta: {
    label: "Book a Strategy Call",
    href: "/contact",
  },
  secondary_cta: {
    label: "Request a Security Review Pack",
    href: "/contact?intent=security-review",
  },
  badges: [
    { label: "SOC 2", sublabel: "Type II Readiness" },
    { label: "GDPR", sublabel: "Data Protection" },
    { label: "ISO 27001", sublabel: "Information Security" },
  ],
  posture_items: [
    "Security questionnaire responses on request",
    "Data processing agreements and DPA templates",
    "Vendor risk assessment documentation",
    "Penetration test summaries available under NDA",
    "Business continuity and disaster recovery plans",
  ],
};

const fallbackControls = {
  label: "Security Controls",
  title: "Defense-in-depth controls across every system boundary.",
  body: "Security is not a feature toggle. It is the architecture. Every component in the Ingenium platform enforces encryption, access controls, and logging by default, with no opt-in required.",
  encryption: {
    title: "Data Encryption Standards",
    items: [
      { label: "In transit", detail: "TLS 1.3 enforced on all connections. HSTS headers with preload. Certificate transparency monitoring." },
      { label: "At rest", detail: "AES-256 encryption for all stored data. Key management via hardware security modules with automatic rotation." },
      { label: "Application layer", detail: "Field-level encryption for PII and sensitive business data. Tokenization for payment and credential storage." },
      { label: "Backup encryption", detail: "All backups encrypted with separate key hierarchies. Point-in-time recovery with encrypted snapshots." },
    ],
  },
  access: {
    title: "Access Control Model",
    items: [
      { label: "RBAC", detail: "Role-based access control with principle of least privilege. Custom role definitions per organization." },
      { label: "SSO / SAML", detail: "SAML 2.0 and OIDC integration with your identity provider. Okta, Azure AD, Google Workspace supported." },
      { label: "MFA", detail: "Multi-factor authentication enforced for all administrative access. TOTP, WebAuthn, and hardware key support." },
      { label: "SCIM", detail: "Automated user provisioning and deprovisioning synced with your directory service." },
    ],
  },
  infrastructure: {
    title: "Infrastructure Architecture",
    items: [
      { label: "Network isolation", detail: "VPC segmentation with private subnets. No direct internet exposure for application servers or databases." },
      { label: "WAF and DDoS", detail: "Web application firewall with OWASP Top 10 rulesets. Volumetric and application-layer DDoS mitigation." },
      { label: "Container security", detail: "Immutable container images with vulnerability scanning. Runtime security monitoring and anomaly detection." },
      { label: "Secrets management", detail: "Centralized secrets vault with dynamic credentials. No secrets in code, environment variables, or logs." },
    ],
  },
  incident: {
    title: "Incident Response Posture",
    items: [
      "Documented incident response plan with defined severity levels",
      "24-hour initial response SLA for critical security events",
      "Post-incident review and root cause analysis for all P1/P2 incidents",
      "Customer notification within 72 hours for data breach events",
      "Annual tabletop exercises and plan reviews",
    ],
  },
  residency: {
    title: "Data Residency and Sovereignty",
    items: [
      "Primary hosting in US-East and EU-West regions",
      "Data residency guarantees available by contract",
      "No cross-border data transfers without explicit consent",
      "Sub-processor transparency and contractual flow-down",
      "Right to data portability and deletion on contract termination",
    ],
  },
};

const fallbackGovernance = {
  label: "AI Governance Framework",
  title: "Every AI output is governed, auditable, and human-approved.",
  body: "AI in production without governance is a liability. Ingenium enforces a structured policy and approval lifecycle for every AI-generated output, ensuring your organization retains control, auditability, and compliance posture across all automated workflows.",
  lifecycle: {
    title: "Policy and Approval Lifecycle",
    stages: [
      {
        stage: "01",
        title: "Policy Definition",
        detail: "Organization-level AI usage policies define permitted actions, data access boundaries, and output constraints. Policies are versioned and require executive sign-off.",
      },
      {
        stage: "02",
        title: "Agent Configuration",
        detail: "AI agents are configured within policy boundaries. Each agent has defined scope, data access permissions, and output format constraints. No agent operates outside its policy envelope.",
      },
      {
        stage: "03",
        title: "Human Approval Gates",
        detail: "All AI outputs pass through configurable approval workflows before reaching production. Approvers are role-based. Escalation paths are predefined for edge cases.",
      },
      {
        stage: "04",
        title: "Execution and Logging",
        detail: "Approved outputs execute with full audit trail capture. Every action is timestamped, attributed, and linked to the originating policy, agent, and approver.",
      },
      {
        stage: "05",
        title: "Audit and Review",
        detail: "Continuous audit trail with exportable logs. Periodic governance reviews surface policy drift, approval bottlenecks, and compliance gaps.",
      },
    ],
  },
  data_handling: {
    title: "AI Data Handling Controls",
    items: [
      "AI models do not train on customer data",
      "Prompt and response data is not persisted beyond session scope",
      "PII detection and redaction applied before AI processing",
      "Data classification labels enforced at the agent level",
      "Opt-out controls for all AI-assisted features",
    ],
  },
  regulated: {
    title: "Designed for Regulated Industries",
    body: "Organizations in financial services, healthcare, legal, and government face additional scrutiny on AI adoption. Ingenium provides the documentation, controls, and audit infrastructure to satisfy those requirements.",
    items: [
      { label: "Financial services", detail: "Model risk management documentation, explainability reports, and fair lending compliance support." },
      { label: "Healthcare", detail: "HIPAA-aligned data handling, BAA availability, and PHI access controls with audit logging." },
      { label: "Legal and professional services", detail: "Attorney-client privilege protections, conflict-of-interest screening, and ethical wall support." },
      { label: "Government and public sector", detail: "FedRAMP-aligned control documentation, data sovereignty guarantees, and accessibility compliance." },
    ],
  },
};

const fallbackCta = {
  title: "Your security team has questions. We have documentation.",
  body: "Whether you need a security review pack for procurement, a technical architecture walkthrough, or a strategy discussion, we are ready.",
  primary_cta: {
    label: "Book a Strategy Call",
    href: "/contact",
  },
  secondary_cta: {
    label: "Request a Security Review Pack",
    href: "/contact?intent=security-review",
  },
  tertiary_cta: {
    label: "Book a Technical Architecture Call",
    href: "/contact?intent=architecture-call",
  },
};

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default async function SecurityPage() {
  const { sectionJson, sectionAttrs } = await loadPortalPageContent(PAGE_KEYS.SECURITY);
  const hero = sectionJson(SECTION_KEYS.SECURITY.HERO, fallbackHero);
  const controls = sectionJson(SECTION_KEYS.SECURITY.CONTROLS, fallbackControls);
  const governance = sectionJson(SECTION_KEYS.SECURITY.GOVERNANCE, fallbackGovernance);
  const cta = sectionJson(SECTION_KEYS.SECURITY.CTA, fallbackCta);

  const badges = Array.isArray(hero.badges) ? hero.badges : fallbackHero.badges;
  const postureItems = Array.isArray(hero.posture_items)
    ? hero.posture_items
    : fallbackHero.posture_items;

  const encryptionItems = Array.isArray(controls.encryption?.items)
    ? controls.encryption.items
    : fallbackControls.encryption.items;
  const accessItems = Array.isArray(controls.access?.items)
    ? controls.access.items
    : fallbackControls.access.items;
  const infraItems = Array.isArray(controls.infrastructure?.items)
    ? controls.infrastructure.items
    : fallbackControls.infrastructure.items;
  const incidentItems = Array.isArray(controls.incident?.items)
    ? controls.incident.items
    : fallbackControls.incident.items;
  const residencyItems = Array.isArray(controls.residency?.items)
    ? controls.residency.items
    : fallbackControls.residency.items;

  const lifecycleStages = Array.isArray(governance.lifecycle?.stages)
    ? governance.lifecycle.stages
    : fallbackGovernance.lifecycle.stages;
  const dataHandlingItems = Array.isArray(governance.data_handling?.items)
    ? governance.data_handling.items
    : fallbackGovernance.data_handling.items;
  const regulatedItems = Array.isArray(governance.regulated?.items)
    ? governance.regulated.items
    : fallbackGovernance.regulated.items;

  return (
    <div className="space-y-28 md:space-y-36">
      {/* ============================================================ */}
      {/*  SECTION 1 — Hero / Compliance                               */}
      {/* ============================================================ */}
      <section className="grid items-start gap-14 lg:grid-cols-[1.1fr,0.9fr]">
        {/* Left column — headline + CTAs */}
        <div>
          <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.SECURITY.HERO)}>
            {hero.label}
          </p>

          <h1
            className="mt-6 max-w-2xl font-(--font-display) text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]"
            {...sectionAttrs(SECTION_KEYS.SECURITY.HERO)}
          >
            {hero.title}
          </h1>

          <p
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400"
            {...sectionAttrs(SECTION_KEYS.SECURITY.HERO)}
          >
            {hero.body}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={hero.primary_cta?.href ?? "/contact"}
              className={primaryButton}
              {...sectionAttrs(SECTION_KEYS.SECURITY.HERO)}
            >
              {hero.primary_cta?.label ?? "Book a Strategy Call"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={hero.secondary_cta?.href ?? "/contact?intent=security-review"}
              className={secondaryButton}
              {...sectionAttrs(SECTION_KEYS.SECURITY.HERO)}
            >
              {hero.secondary_cta?.label ?? "Request a Security Review Pack"}
            </Link>
          </div>

          {/* Compliance badge cluster */}
          <div className="mt-12 flex flex-wrap gap-4">
            {badges.map((badge, i) => (
              <div
                key={`badge-${i}`}
                className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-5 py-3.5 backdrop-blur-sm"
                {...sectionAttrs(SECTION_KEYS.SECURITY.HERO)}
              >
                <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-400" />
                <div>
                  <p className="text-sm font-semibold text-white">
                    {typeof badge === "string" ? badge : badge.label}
                  </p>
                  {typeof badge !== "string" && badge.sublabel && (
                    <p className="text-xs text-slate-500">{badge.sublabel}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — compliance posture card */}
        <div className={darkCardLg}>
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-emerald-400" />
            <p
              className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500"
              {...sectionAttrs(SECTION_KEYS.SECURITY.HERO)}
            >
              Compliance Posture
            </p>
          </div>

          <div className="mt-6 space-y-3.5">
            {postureItems.map((item, i) => (
              <div
                key={`posture-${i}`}
                className="flex items-start gap-3 text-sm leading-relaxed text-slate-300"
                {...sectionAttrs(SECTION_KEYS.SECURITY.HERO)}
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                {typeof item === "string" ? item : fallbackHero.posture_items[i]}
              </div>
            ))}
          </div>

          <div
            className="mt-6 rounded-xl border border-dashed border-slate-700 bg-slate-950/60 p-4 text-sm leading-relaxed text-slate-500"
            {...sectionAttrs(SECTION_KEYS.SECURITY.HERO)}
          >
            Documentation packages are available under NDA for procurement and vendor review processes.
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 2 — Security Controls                               */}
      {/* ============================================================ */}
      <section>
        <div className="max-w-3xl">
          <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.SECURITY.CONTROLS)}>
            {controls.label}
          </p>
          <h2
            className="mt-4 font-(--font-display) text-3xl font-semibold tracking-tight text-white md:text-4xl"
            {...sectionAttrs(SECTION_KEYS.SECURITY.CONTROLS)}
          >
            {controls.title}
          </h2>
          <p
            className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-400"
            {...sectionAttrs(SECTION_KEYS.SECURITY.CONTROLS)}
          >
            {controls.body}
          </p>
        </div>

        {/* --- 2a. Data Encryption --- */}
        <div className="mt-14">
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-emerald-400" />
            <h3
              className="font-(--font-display) text-xl font-semibold text-white"
              {...sectionAttrs(SECTION_KEYS.SECURITY.CONTROLS)}
            >
              {controls.encryption?.title ?? fallbackControls.encryption.title}
            </h3>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {encryptionItems.map((item, i) => (
              <div key={`enc-${i}`} className={darkCard} {...sectionAttrs(SECTION_KEYS.SECURITY.CONTROLS)}>
                <p className="text-sm font-semibold text-emerald-400">
                  {typeof item === "string" ? item : item.label}
                </p>
                {typeof item !== "string" && item.detail && (
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.detail}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* --- 2b. Access Control --- */}
        <div className="mt-14">
          <div className="flex items-center gap-3">
            <KeyRound className="h-5 w-5 text-emerald-400" />
            <h3
              className="font-(--font-display) text-xl font-semibold text-white"
              {...sectionAttrs(SECTION_KEYS.SECURITY.CONTROLS)}
            >
              {controls.access?.title ?? fallbackControls.access.title}
            </h3>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {accessItems.map((item, i) => (
              <div key={`acc-${i}`} className={darkCard} {...sectionAttrs(SECTION_KEYS.SECURITY.CONTROLS)}>
                <div className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-cyan-400" />
                  <p className="text-sm font-semibold text-white">
                    {typeof item === "string" ? item : item.label}
                  </p>
                </div>
                {typeof item !== "string" && item.detail && (
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.detail}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* --- 2c. Infrastructure Architecture --- */}
        <div className="mt-14">
          <div className="flex items-center gap-3">
            <Network className="h-5 w-5 text-emerald-400" />
            <h3
              className="font-(--font-display) text-xl font-semibold text-white"
              {...sectionAttrs(SECTION_KEYS.SECURITY.CONTROLS)}
            >
              {controls.infrastructure?.title ?? fallbackControls.infrastructure.title}
            </h3>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {infraItems.map((item, i) => (
              <div key={`infra-${i}`} className={darkCard} {...sectionAttrs(SECTION_KEYS.SECURITY.CONTROLS)}>
                <p className="text-sm font-semibold text-white">
                  {typeof item === "string" ? item : item.label}
                </p>
                {typeof item !== "string" && item.detail && (
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.detail}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* --- 2d. Incident Response + 2e. Data Residency --- */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Incident Response */}
          <div className={darkCardLg} {...sectionAttrs(SECTION_KEYS.SECURITY.CONTROLS)}>
            <div className="flex items-center gap-3">
              <Siren className="h-5 w-5 text-emerald-400" />
              <h3 className="font-(--font-display) text-lg font-semibold text-white">
                {controls.incident?.title ?? fallbackControls.incident.title}
              </h3>
            </div>
            <div className="mt-5 space-y-3">
              {incidentItems.map((item, i) => (
                <div
                  key={`inc-${i}`}
                  className="flex items-start gap-3 text-sm leading-relaxed text-slate-300"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  {typeof item === "string" ? item : fallbackControls.incident.items[i]}
                </div>
              ))}
            </div>
          </div>

          {/* Data Residency */}
          <div className={darkCardLg} {...sectionAttrs(SECTION_KEYS.SECURITY.CONTROLS)}>
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-cyan-400" />
              <h3 className="font-(--font-display) text-lg font-semibold text-white">
                {controls.residency?.title ?? fallbackControls.residency.title}
              </h3>
            </div>
            <div className="mt-5 space-y-3">
              {residencyItems.map((item, i) => (
                <div
                  key={`res-${i}`}
                  className="flex items-start gap-3 text-sm leading-relaxed text-slate-300"
                >
                  <Database className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                  {typeof item === "string" ? item : fallbackControls.residency.items[i]}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 3 — AI Governance                                   */}
      {/* ============================================================ */}
      <section className="rounded-[2.5rem] border border-slate-800 bg-slate-900/50 px-6 py-16 backdrop-blur-sm sm:px-10">
        <div className="max-w-3xl">
          <p className={sectionLabel} {...sectionAttrs(SECTION_KEYS.SECURITY.GOVERNANCE)}>
            {governance.label}
          </p>
          <h2
            className="mt-4 font-(--font-display) text-3xl font-semibold tracking-tight text-white md:text-4xl"
            {...sectionAttrs(SECTION_KEYS.SECURITY.GOVERNANCE)}
          >
            {governance.title}
          </h2>
          <p
            className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-400"
            {...sectionAttrs(SECTION_KEYS.SECURITY.GOVERNANCE)}
          >
            {governance.body}
          </p>
        </div>

        {/* --- 3a. Policy and Approval Lifecycle Diagram --- */}
        <div className="mt-14">
          <div className="flex items-center gap-3">
            <FileCheck2 className="h-5 w-5 text-emerald-400" />
            <h3
              className="font-(--font-display) text-xl font-semibold text-white"
              {...sectionAttrs(SECTION_KEYS.SECURITY.GOVERNANCE)}
            >
              {governance.lifecycle?.title ?? fallbackGovernance.lifecycle.title}
            </h3>
          </div>

          {/* Lifecycle stages — vertical timeline */}
          <div className="relative mt-8 ml-3 border-l border-slate-700 pl-8">
            {lifecycleStages.map((stage, i) => (
              <div
                key={`stage-${i}`}
                className="relative pb-10 last:pb-0"
                {...sectionAttrs(SECTION_KEYS.SECURITY.GOVERNANCE)}
              >
                {/* Timeline dot */}
                <div className="absolute -left-[calc(2rem+0.4375rem)] flex h-7 w-7 items-center justify-center rounded-full border border-emerald-500/40 bg-slate-950">
                  <span className="font-(--font-mono) text-[10px] font-bold text-emerald-400">
                    {typeof stage === "string" ? `0${i + 1}` : stage.stage}
                  </span>
                </div>
                <h4 className="text-base font-semibold text-white">
                  {typeof stage === "string" ? stage : stage.title}
                </h4>
                {typeof stage !== "string" && stage.detail && (
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
                    {stage.detail}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* --- 3b. AI Data Handling Controls --- */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className={darkCardLg} {...sectionAttrs(SECTION_KEYS.SECURITY.GOVERNANCE)}>
            <div className="flex items-center gap-3">
              <Eye className="h-5 w-5 text-cyan-400" />
              <h3 className="font-(--font-display) text-lg font-semibold text-white">
                {governance.data_handling?.title ?? fallbackGovernance.data_handling.title}
              </h3>
            </div>
            <div className="mt-5 space-y-3">
              {dataHandlingItems.map((item, i) => (
                <div
                  key={`dh-${i}`}
                  className="flex items-start gap-3 text-sm leading-relaxed text-slate-300"
                >
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  {typeof item === "string" ? item : fallbackGovernance.data_handling.items[i]}
                </div>
              ))}
            </div>
          </div>

          {/* --- 3c. Regulated Industry Support --- */}
          <div {...sectionAttrs(SECTION_KEYS.SECURITY.GOVERNANCE)}>
            <h3 className="font-(--font-display) text-lg font-semibold text-white">
              {governance.regulated?.title ?? fallbackGovernance.regulated.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {governance.regulated?.body ?? fallbackGovernance.regulated.body}
            </p>
            <div className="mt-6 space-y-4">
              {regulatedItems.map((item, i) => (
                <div
                  key={`reg-${i}`}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-4"
                >
                  <div className="flex items-center gap-2">
                    <Fingerprint className="h-4 w-4 text-cyan-400" />
                    <p className="text-sm font-semibold text-white">
                      {typeof item === "string" ? item : item.label}
                    </p>
                  </div>
                  {typeof item !== "string" && item.detail && (
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                      {item.detail}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 4 — Final CTA                                       */}
      {/* ============================================================ */}
      <section className="rounded-[2.5rem] border border-emerald-500/20 bg-gradient-to-b from-emerald-950/40 to-slate-950 px-8 py-20 text-center shadow-[0_0_80px_rgba(16,185,129,0.08)]">
        <Shield className="mx-auto h-10 w-10 text-emerald-500/60" />

        <h2
          className="mx-auto mt-6 max-w-3xl font-(--font-display) text-3xl font-semibold tracking-tight text-white md:text-4xl"
          {...sectionAttrs(SECTION_KEYS.SECURITY.CTA)}
        >
          {cta.title}
        </h2>

        <p
          className="mx-auto mt-4 max-w-xl text-slate-400"
          {...sectionAttrs(SECTION_KEYS.SECURITY.CTA)}
        >
          {cta.body}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={cta.primary_cta?.href ?? "/contact"}
            className={primaryButton}
            {...sectionAttrs(SECTION_KEYS.SECURITY.CTA)}
          >
            {cta.primary_cta?.label ?? "Book a Strategy Call"}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href={cta.secondary_cta?.href ?? "/contact?intent=security-review"}
            className={secondaryButton}
            {...sectionAttrs(SECTION_KEYS.SECURITY.CTA)}
          >
            {cta.secondary_cta?.label ?? "Request a Security Review Pack"}
          </Link>
        </div>

        <div className="mt-6">
          <Link
            href={cta.tertiary_cta?.href ?? "/contact?intent=architecture-call"}
            className={tertiaryButton}
            {...sectionAttrs(SECTION_KEYS.SECURITY.CTA)}
          >
            {cta.tertiary_cta?.label ?? "Book a Technical Architecture Call"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
