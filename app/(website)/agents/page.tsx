import Link from "next/link";
import { Bot, ShieldCheck, Sparkles, Target, Layers, Radar, CheckCircle2 } from "lucide-react";
import { getWebsiteContent } from "../lib/websiteContent";

const proofPlaceholdersFallback = [
  "Client Logo",
  "Client Logo",
  "Client Logo",
  "Client Logo",
  "Client Logo",
  "Client Logo",
];

const departments = [
  {
    name: "Revenue Ops",
    focus: "Pipeline hygiene, forecasts, and stage accuracy.",
    highlights: ["Forecast rollups", "Stage automation", "Risk alerts"],
  },
  {
    name: "Sales Enablement",
    focus: "Live intel, research, and outreach at speed.",
    highlights: ["Lead enrichment", "Personalized follow-ups", "Deal summaries"],
  },
  {
    name: "Client Success",
    focus: "Onboarding, renewals, and proactive retention.",
    highlights: ["Health scoring", "Renewal playbooks", "Executive updates"],
  },
];

const playbooks = [
  {
    title: "Outbound Research",
    description: "Agents enrich leads, surface intent, and update CRM fields automatically.",
  },
  {
    title: "SDR Assist",
    description: "Drafts outreach, schedules follow-ups, and prepares talking points.",
  },
  {
    title: "Deal Intel",
    description: "Summarizes account history, risks, and next-best actions in one view.",
  },
  {
    title: "Renewal Guard",
    description: "Tracks health scores and launches retention playbooks before churn.",
  },
];

const governanceFallback = [
  "Agents inherit CRM permissions and account boundaries.",
  "Every action writes back to the CRM timeline.",
  "Human approvals can be required at any step.",
];

const deliverablesFallback = [
  "AI Agent department design",
  "Playbooks tied to CRM objects",
  "Automation triggers and actions",
  "Governance and approval rules",
];

export default async function WebsiteAgentsPage() {
  const content = await getWebsiteContent();
  const proofPlaceholders = content.lines("agents_proof_logos", proofPlaceholdersFallback);
  const governance = content.lines("agents_governance", governanceFallback);
  const deliverables = content.lines("agents_deliverables", deliverablesFallback);
  const heroBadges = content.lines("agents_hero_badges", [
    "Revenue Ops",
    "Sales Enablement",
    "Client Success",
    "Marketing",
    "Finance",
  ]);
  return (
    <div className="space-y-24">
      <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
        <div className="space-y-6">
          <div className="site-chip">{content.text("agents_hero_chip", "AI Agent Departments")}</div>
          <h1 className="font-display text-4xl md:text-5xl">{content.text("agents_hero_title", "AI departments that operate like your best team.")}</h1>
          <p className="text-lg text-muted">
            {content.text(
              "agents_hero_subtext",
              "Deploy squads of agents with clear responsibilities. They update the CRM, launch automations, and keep revenue motion alive without extra headcount."
            )}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/app/agents"
              target="_blank"
              rel="noreferrer"
              className="btn-primary h-11 px-6 text-sm"
            >
              Open Agents
            </Link>
            <Link href="/contact" className="btn-secondary h-11 px-6 text-sm">{content.text("agents_hero_secondary_cta", "Talk to us")}</Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Revenue Ops", "Sales Enablement", "Client Success", "Marketing", "Finance"].map((dept) => (
              <span key={dept} className="site-badge">
                {dept}
              </span>
            ))}
          </div>
        </div>
        <div className="site-card-bright p-6 space-y-4">
          <div className="text-xs text-muted">Department status</div>
          <div className="site-card p-4">
            <div className="text-xs text-muted">Sales Enablement</div>
            <div className="text-xl font-display mt-2">24 leads processed today</div>
            <div className="mt-3 grid gap-2 text-xs text-muted">
              <div className="flex justify-between">
                <span>Lead enrichment</span>
                <span>99% complete</span>
              </div>
              <div className="flex justify-between">
                <span>Follow-ups queued</span>
                <span>38</span>
              </div>
              <div className="flex justify-between">
                <span>Notifications sent</span>
                <span>12</span>
              </div>
            </div>
          </div>
          <div className="site-card p-4">
            <div className="text-xs text-muted">Agent performance</div>
            <div className="text-xl font-display mt-2">12 workflows active</div>
            <div className="mt-3 text-xs text-muted">Average response time: 4 min</div>
          </div>
        </div>
      </section>

      <section className="site-card p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl">{content.text("agents_proof_title", "Proof placeholders ready to swap")}</h2>
            <p className="text-muted text-sm mt-2">
              {content.text("agents_proof_subtext", "Add customer logos or AI department results when ready.")}
            </p>
          </div>
          <span className="site-badge">{content.text("agents_proof_badge", "Placeholder zone")}</span>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {proofPlaceholders.map((logo, index) => (
            <div key={`${logo}-${index}`} className="site-card p-6 text-center text-sm text-muted">
              {logo}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="font-display text-3xl">{content.text("agents_departments_title", "Departments with clear outcomes")}</h2>
          <p className="text-muted mt-2 max-w-2xl">
            {content.text(
              "agents_departments_subtext",
              "Stop managing individual bots. Deploy departments responsible for outcomes and fully integrated with your CRM objects, custom fields, and automations."
            )}
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {departments.map((dept) => (
            <div key={dept.name} className="site-card p-6">
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--text-subtle)]">{dept.name}</div>
              <div className="mt-3 text-lg font-display">{dept.focus}</div>
              <div className="mt-4 grid gap-2 text-sm text-muted">
                {dept.highlights.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="site-card p-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <div>
            <h2 className="font-display text-3xl">{content.text("agents_playbooks_title", "Agent playbooks built for revenue motion")}</h2>
            <p className="text-muted mt-2">
              {content.text(
                "agents_playbooks_subtext",
                "Each playbook is connected to your CRM objects, custom fields, and automation rules so agents can execute real work without context switching."
              )}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {playbooks.map((playbook) => (
                <div key={playbook.title} className="site-card p-4">
                  <div className="text-sm font-semibold">{playbook.title}</div>
                  <p className="text-xs text-muted mt-2">{playbook.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="site-chip">{content.text("agents_governance_chip", "Governance")}</div>
            {governance.map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] mt-1" />
                <span className="text-muted">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="site-card p-6">
          <Target className="h-6 w-6 text-[var(--accent)]" />
          <div className="mt-4 text-lg font-display">{content.text("agents_card_title_1", "Autonomous qualification")}</div>
          <p className="mt-2 text-sm text-muted">
            {content.text("agents_card_desc_1", "Agents score leads, update lifecycle stages, and route to owners instantly.")}
          </p>
        </div>
        <div className="site-card p-6">
          <ShieldCheck className="h-6 w-6 text-[var(--accent)]" />
          <div className="mt-4 text-lg font-display">{content.text("agents_card_title_2", "Human-in-the-loop")}</div>
          <p className="mt-2 text-sm text-muted">
            {content.text("agents_card_desc_2", "Set approvals where needed and keep leadership visibility at every step.")}
          </p>
        </div>
        <div className="site-card p-6">
          <Sparkles className="h-6 w-6 text-[var(--accent)]" />
          <div className="mt-4 text-lg font-display">{content.text("agents_card_title_3", "Context-rich handoffs")}</div>
          <p className="mt-2 text-sm text-muted">
            {content.text("agents_card_desc_3", "Every task arrives with full CRM history and next-best actions.")}
          </p>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="site-card p-6">
          <h2 className="font-display text-2xl">{content.text("agents_what_you_get_title", "What you get")}</h2>
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
          <h2 className="font-display text-2xl">{content.text("agents_ready_title", "Ready to activate your departments?")}</h2>
          <p className="text-muted mt-2 text-sm">
            {content.text("agents_ready_subtext", "We design AI departments aligned to your CRM and workflows, then launch them in weeks.")}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary h-11 px-6 text-sm">{content.text("agents_ready_primary_cta", "Book a strategy call")}</Link>
            <Link href="/crm" className="btn-secondary h-11 px-6 text-sm">{content.text("agents_ready_secondary_cta", "Explore CRM")}</Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="site-card p-6">
          <Layers className="h-6 w-6 text-[var(--accent)]" />
          <div className="mt-4 text-lg font-display">{content.text("agents_footer_card_title_1", "Department orchestration")}</div>
          <p className="mt-2 text-sm text-muted">
            {content.text("agents_footer_card_desc_1", "Assign goals to each department and track outcomes inside the portal dashboard.")}
          </p>
        </div>
        <div className="site-card p-6">
          <Radar className="h-6 w-6 text-[var(--accent)]" />
          <div className="mt-4 text-lg font-display">{content.text("agents_footer_card_title_2", "Live visibility")}</div>
          <p className="mt-2 text-sm text-muted">
            {content.text("agents_footer_card_desc_2", "Know exactly what each agent is doing, and why, across every account.")}
          </p>
        </div>
        <div className="site-card p-6">
          <Bot className="h-6 w-6 text-[var(--accent)]" />
          <div className="mt-4 text-lg font-display">{content.text("agents_footer_card_title_3", "Scale without friction")}</div>
          <p className="mt-2 text-sm text-muted">
            {content.text("agents_footer_card_desc_3", "Add new squads or workflows without re-architecting your CRM.")}
          </p>
        </div>
      </section>
    </div>
  );
}



