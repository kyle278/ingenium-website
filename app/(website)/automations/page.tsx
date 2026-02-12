import Link from "next/link";
import { GitBranch, Bell, Workflow, Zap, Layers, ShieldCheck, CheckCircle2 } from "lucide-react";
import { parseDelimited } from "../lib/contentParsers";
import { getWebsiteContent } from "../lib/websiteContent";

const proofPlaceholdersFallback = [
  "Client Logo",
  "Client Logo",
  "Client Logo",
  "Client Logo",
  "Client Logo",
  "Client Logo",
];

const playsFallback = [
  {
    title: "Lead created -> Notify SDR",
    description: "Instant alert plus automatic task creation in the CRM.",
  },
  {
    title: "Opportunity won -> Create invoice",
    description: "Generate the invoice record, notify finance, and update forecast totals.",
  },
  {
    title: "Stalled pipeline -> Escalate",
    description: "Detect inactivity and trigger a re-engagement playbook.",
  },
  {
    title: "Renewal risk -> Launch retention",
    description: "Kick off success workflows before churn hits.",
  },
];

const deliverablesFallback = [
  "Trigger + filter design",
  "Decision paths and splits",
  "Record actions",
  "Notification workflows",
];

export default async function WebsiteAutomationsPage() {
  const content = await getWebsiteContent();

  const proofPlaceholders = content.lines("automations_proof_logos", proofPlaceholdersFallback);
  const deliverables = content.lines("automations_deliverables", deliverablesFallback);

  const plays = parseDelimited(
    content.lines(
      "automations_plays",
      playsFallback.map((item) => `${item.title} | ${item.description}`)
    ),
    playsFallback,
    (parts) => ({ title: parts[0], description: parts[1] }),
    2
  );

  const heroBadges = content.lines("automations_hero_badges", [
    "Triggers",
    "Decisions",
    "Record actions",
    "Notifications",
  ]);


  return (
    <div className="space-y-24">
      <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
        <div className="space-y-6">
          <div className="site-chip">{content.text("automations_hero_chip", "Automations")}</div>
          <h1 className="font-display text-4xl md:text-5xl">{content.text("automations_hero_title", "Automations that run while you sleep.")}</h1>
          <p className="text-lg text-muted">
            {content.text(
              "automations_hero_subtext",
              "Trigger on record changes, branch on conditions, and orchestrate CRM work without code. Your workflows keep moving even when no one is online."
            )}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/app/crm/automations"
              target="_blank"
              rel="noreferrer"
              className="btn-primary h-11 px-6 text-sm"
            >
              {content.text("automations_hero_primary_cta", "Open Builder")}
            </Link>
            <Link href="/contact" className="btn-secondary h-11 px-6 text-sm">{content.text("automations_hero_secondary_cta", "Talk to us")}</Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {heroBadges.map((badge) => (
              <span key={badge} className="site-badge">
                {badge}
              </span>
            ))}
          </div>
        </div>
        <div className="site-card-bright p-6 space-y-4">
          <div className="text-xs text-muted">{content.text("automations_hero_card_label", "Live workflow")}</div>
          <div className="text-xl font-display">{content.text("automations_hero_card_title", "Lead updated > Notify owner")}</div>
          <div className="mt-4 space-y-3 text-sm text-muted">
            {[
              "Trigger: Lead updated",
              "Decision: Status = Qualified",
              "Action: Send notification",
            ].map((step) => (
              <div key={step} className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                {step}
              </div>
            ))}
          </div>
          <div className="site-card p-4 text-xs text-muted">
            {content.text("automations_hero_card_note", "Automations are processed continuously, even when no user is logged in.")}
          </div>
        </div>
      </section>

      <section className="site-card p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl">{content.text("automations_proof_title", "Proof placeholders ready to swap")}</h2>
            <p className="text-muted text-sm mt-2">
              {content.text("automations_proof_subtext", "Add automation results, case studies, or customer proof when ready.")}
            </p>
          </div>
          <span className="site-badge">{content.text("automations_proof_badge", "Placeholder zone")}</span>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {proofPlaceholders.map((logo, index) => (
            <div key={`${logo}-${index}`} className="site-card p-6 text-center text-sm text-muted">
              {logo}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Smart triggers",
            description: "Run when any CRM object is created, updated, or meets a filter.",
            icon: Workflow,
          },
          {
            title: "Decision paths",
            description: "Branch based on field values, custom data, or random splits.",
            icon: GitBranch,
          },
          {
            title: "Instant notifications",
            description: "Notify teams in-app the moment a workflow completes a step.",
            icon: Bell,
          },
        ].map((card) => (
          <div key={card.title} className="site-card p-6">
            <card.icon className="h-6 w-6 text-[var(--accent)]" />
            <div className="mt-4 text-xl font-display">{card.title}</div>
            <p className="mt-2 text-sm text-muted">{card.description}</p>
          </div>
        ))}
      </section>

      <section className="site-card p-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <div>
            <h2 className="font-display text-3xl">{content.text("automations_plays_title", "Popular automation plays")}</h2>
            <p className="text-muted mt-2">
              {content.text("automations_plays_subtext", "Start with proven workflows and customize them with your own fields and CRM objects.")}
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {plays.map((card) => (
                <div key={card.title} className="site-card p-5">
                  <div className="text-lg font-display">{card.title}</div>
                  <p className="mt-2 text-sm text-muted">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="site-chip">{content.text("automations_why_chip", "Why it matters")}</div>
            {[
              "Every automation is scoped to the correct account data.",
              "Run actions like create record, update record, notify, or branch.",
              "Field selectors include both default and custom fields.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] mt-1" />
                <span className="text-muted">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="site-card p-6">
          <h2 className="font-display text-2xl">{content.text("automations_what_you_get_title", "What you get")}</h2>
          <div className="mt-4 grid gap-3">
            {deliverables.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-muted">
                <CheckCircle2 className="h-4 w-4 text-[var(--accent)]" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="site-card p-6">
          <h2 className="font-display text-2xl">{content.text("automations_ready_title", "Automation-ready in weeks")}</h2>
          <p className="text-muted mt-2 text-sm">
            {content.text("automations_ready_subtext", "We build the workflows, connect the data, and hand off a system your team can run.")}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary h-11 px-6 text-sm">{content.text("automations_ready_primary_cta", "Book a workflow consult")}</Link>
            <Link href="/crm" className="btn-secondary h-11 px-6 text-sm">{content.text("automations_ready_secondary_cta", "Explore CRM")}</Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="site-card p-6">
          <Zap className="h-6 w-6 text-[var(--accent)]" />
          <div className="mt-4 text-lg font-display">{content.text("automations_card_title_1", "Fast execution")}</div>
          <p className="mt-2 text-sm text-muted">
            {content.text("automations_card_desc_1", "Workflows trigger within seconds and keep your teams ahead.")}
          </p>
        </div>
        <div className="site-card p-6">
          <Layers className="h-6 w-6 text-[var(--accent)]" />
          <div className="mt-4 text-lg font-display">{content.text("automations_card_title_2", "Flexible nodes")}</div>
          <p className="mt-2 text-sm text-muted">
            {content.text("automations_card_desc_2", "Add decision logic, random splits, and record actions anytime.")}
          </p>
        </div>
        <div className="site-card p-6">
          <ShieldCheck className="h-6 w-6 text-[var(--accent)]" />
          <div className="mt-4 text-lg font-display">{content.text("automations_card_title_3", "Audit-ready")}</div>
          <p className="mt-2 text-sm text-muted">
            {content.text("automations_card_desc_3", "Every action is logged with clear ownership and timestamps.")}
          </p>
        </div>
      </section>
    </div>
  );
}








