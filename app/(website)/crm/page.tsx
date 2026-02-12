import Link from "next/link";
import { BarChart3, Database, LineChart, ShieldCheck, Layers, Sparkles, CheckCircle2 } from "lucide-react";
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

const objectsFallback = [
  "Leads",
  "Accounts",
  "Contacts",
  "Opportunities",
  "Products",
  "Orders",
  "Invoices",
  "Projects",
  "Campaigns",
  "Forecasts",
];

const deliverablesFallback = [
  "CRM configuration + custom fields",
  "Opportunity forecasting",
  "Automation-ready data model",
  "Account-level security",
];

export default async function WebsiteCrmPage() {
  const content = await getWebsiteContent();

  const proofPlaceholders = content.lines("crm_proof_logos", proofPlaceholdersFallback);
  const objects = content.lines("crm_objects", objectsFallback);
  const deliverables = content.lines("crm_deliverables", deliverablesFallback);

  const heroBadges = content.lines("crm_hero_badges", [
    "Custom fields",
    "Forecasting",
    "Related lists",
    "AI-ready",
  ]);


  const forecastRows = parseDelimited(
    content.lines("crm_forecast_rows", [
      "Prospecting | $240k",
      "Proposal | $520k",
      "Negotiation | $320k",
    ]),
    [
      { label: "Prospecting", value: "$240k" },
      { label: "Proposal", value: "$520k" },
      { label: "Negotiation", value: "$320k" },
    ],
    (parts) => ({ label: parts[0], value: parts[1] }),
    2
  );
  return (
    <div className="space-y-24">
      <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
        <div className="space-y-6">
          <div className="site-chip">{content.text("crm_hero_chip", "CRM Platform")}</div>
          <h1 className="font-display text-4xl md:text-5xl">{content.text("crm_hero_title", "A CRM built for clarity, forecasting, and AI execution.")}</h1>
          <p className="text-lg text-muted">
            {content.text(
              "crm_hero_subtext",
              "Your CRM is the system of record. Our AI agents live inside it, enriching every record, updating stages, and triggering automations in real time."
            )}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/app/crm"
              target="_blank"
              rel="noreferrer"
              className="btn-primary h-11 px-6 text-sm"
            >
              {content.text("crm_hero_primary_cta", "Open CRM")}
            </Link>
            <Link href="/contact" className="btn-secondary h-11 px-6 text-sm">{content.text("crm_hero_secondary_cta", "Get a demo")}</Link>
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
          <div className="text-xs text-muted">{content.text("crm_forecast_label", "Forecast snapshot")}</div>
          <div className="text-3xl font-display">{content.text("crm_forecast_value", "$1.28M")}</div>
          <div className="text-xs text-muted">{content.text("crm_forecast_subtext", "Pipeline value · 82% confidence")}</div>
          <div className="mt-4 grid gap-3">
            {forecastRows.map((row) => (
              <div key={row.label} className="flex items-center justify-between text-sm">
                <span>{row.label}</span>
                <span className="text-muted">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-card p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl">{content.text("crm_proof_title", "Proof placeholders ready to swap")}</h2>
            <p className="text-muted text-sm mt-2">
              {content.text("crm_proof_subtext", "Add customer proof and performance metrics when available.")}
            </p>
          </div>
          <span className="site-badge">{content.text("crm_proof_badge", "Placeholder zone")}</span>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {proofPlaceholders.map((logo, index) => (
            <div key={`${logo}-${index}`} className="site-card p-6 text-center text-sm text-muted">
              {logo}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-4">
        {[
          {
            title: "Lead to cash",
            description: "Track every record with full history, activities, and tasks.",
            icon: Database,
          },
          {
            title: "Forecasting",
            description: "Weighted pipeline, close dates, and line item rollups.",
            icon: LineChart,
          },
          {
            title: "Revenue analytics",
            description: "Dashboards that show where to focus for lift.",
            icon: BarChart3,
          },
          {
            title: "Account security",
            description: "Every record stays inside the correct account boundary.",
            icon: ShieldCheck,
          },
        ].map((card) => (
          <div key={card.title} className="site-card p-6">
            <card.icon className="h-6 w-6 text-[var(--accent)]" />
            <div className="mt-4 text-lg font-display">{card.title}</div>
            <p className="mt-2 text-sm text-muted">{card.description}</p>
          </div>
        ))}
      </section>

      <section className="site-card p-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <div>
            <h2 className="font-display text-3xl">{content.text("crm_ai_title", "AI Agents live inside your CRM")}</h2>
            <p className="text-muted mt-2">
              {content.text(
                "crm_ai_subtext",
                "Agents update stages, enrich fields, and trigger workflows right where your team works. Every action is logged, auditable, and tied to account-level permissions."
              )}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "AI-driven lead enrichment",
                "Opportunity forecasting updates",
                "Automated task creation",
                "Custom field filtering",
              ].map((item) => (
                <div key={item} className="site-card p-4 text-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="site-chip">{content.text("crm_flow_chip", "CRM + AI flow")}</div>
            <div className="site-card p-5">
              <div className="text-xs text-muted">{content.text("crm_flow_card1_label", "Opportunity updated")}</div>
              <div className="text-lg font-display mt-2">{content.text("crm_flow_card1_title", "AI updates forecast + notifies finance")}</div>
              <div className="mt-3 text-xs text-muted">{content.text("crm_flow_card1_subtext", "Automation triggered · 2 actions executed")}</div>
            </div>
            <div className="site-card p-5">
              <div className="text-xs text-muted">{content.text("crm_flow_card2_label", "Lead converted")}</div>
              <div className="text-lg font-display mt-2">{content.text("crm_flow_card2_title", "Account + contact created automatically")}</div>
              <div className="mt-3 text-xs text-muted">{content.text("crm_flow_card2_subtext", "New opportunity optional")}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-card p-8">
        <h2 className="font-display text-3xl">{content.text("crm_objects_title", "Every object you need, ready for automation")}</h2>
        <p className="text-muted mt-2 max-w-2xl">
          {content.text(
            "crm_objects_subtext",
            "Leads, contacts, accounts, opportunities, products, orders, invoices, projects, and campaigns are all first-class. Add custom fields and related lists without breaking workflows."
          )}
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-5 text-sm">
          {objects.map((item) => (
            <div key={item} className="site-card p-3 text-center">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="site-card p-6">
          <h2 className="font-display text-2xl">{content.text("crm_what_you_get_title", "What you get")}</h2>
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
          <h2 className="font-display text-2xl">{content.text("crm_ready_title", "Ready for a CRM that drives action?")}</h2>
          <p className="text-muted mt-2 text-sm">
            {content.text("crm_ready_subtext", "We configure the CRM, connect the workflows, and train your team to run it.")}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary h-11 px-6 text-sm">{content.text("crm_ready_primary_cta", "Book a CRM consult")}</Link>
            <Link href="/websites" className="btn-secondary h-11 px-6 text-sm">{content.text("crm_ready_secondary_cta", "Explore Websites")}</Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="site-card p-6">
          <Layers className="h-6 w-6 text-[var(--accent)]" />
          <div className="mt-4 text-lg font-display">{content.text("crm_foundation_title_1", "Customizable foundations")}</div>
          <p className="mt-2 text-sm text-muted">
            {content.text("crm_foundation_desc_1", "Add fields, list views, and lifecycle stages per account without engineering work.")}
          </p>
        </div>
        <div className="site-card p-6">
          <Sparkles className="h-6 w-6 text-[var(--accent)]" />
          <div className="mt-4 text-lg font-display">{content.text("crm_foundation_title_2", "AI-ready structure")}</div>
          <p className="mt-2 text-sm text-muted">
            {content.text("crm_foundation_desc_2", "Every record is structured to be read and acted on by AI departments.")}
          </p>
        </div>
        <div className="site-card p-6">
          <ShieldCheck className="h-6 w-6 text-[var(--accent)]" />
          <div className="mt-4 text-lg font-display">{content.text("crm_foundation_title_3", "Secure by default")}</div>
          <p className="mt-2 text-sm text-muted">
            {content.text("crm_foundation_desc_3", "Account-based access control and RLS keep data isolated and safe.")}
          </p>
        </div>
      </section>
    </div>
  );
}







