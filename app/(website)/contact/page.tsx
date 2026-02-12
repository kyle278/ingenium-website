import Link from "next/link";
import { Mail, MapPin, PhoneCall, Sparkles, CheckCircle2, AlertTriangle } from "lucide-react";
import { getWebsiteContent } from "../lib/websiteContent";

const deliverablesFallback = [
  "Leak audit + revenue recovery plan",
  "Website conversion rebuild",
  "CRM configuration + custom fields",
  "AI Agent departments",
  "Marketing automations",
  "Forecasting + reporting",
];

export default async function WebsiteContactPage() {
  const content = await getWebsiteContent();
  const deliverables = content.lines("contact_deliverables", deliverablesFallback);
  return (
    <div className="space-y-24">
      <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
        <div className="space-y-6">
          <div className="site-chip">{content.text("contact_hero_chip", "Leak Audit")}</div>
          <h1 className="font-display text-4xl md:text-5xl">{content.text("contact_hero_title", "Find the revenue leaks in your funnel.")}</h1>
          <p className="text-lg text-muted">
            {content.text("contact_hero_subtext", "In 15 minutes we identify where leads are disappearing and map the system to fix it.")}
          </p>
          <div className="flex items-center gap-3 text-sm text-muted">
            <AlertTriangle className="h-4 w-4 text-[var(--accent)]" />
            {content.text("contact_hero_alert", "Limited to 10 audits per week.")}
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-[var(--accent)]" />
              <span>{content.text("contact_email", "hello@ingeniumconsulting.net")}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-[var(--accent)]" />
              <span>{content.text("contact_location", "Graiguecullen, Carlow, Ireland")}</span>
            </div>
            <div className="flex items-center gap-3">
              <PhoneCall className="h-4 w-4 text-[var(--accent)]" />
              <span>{content.text("contact_phone", "Consultations by appointment")}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="btn-secondary h-11 px-6 text-sm">{content.text("contact_back_cta", "Back to Home")}</Link>
            <Link
              href="/app"
              target="_blank"
              rel="noreferrer"
              className="btn-primary h-11 px-6 text-sm"
            >
              Enter Portal
            </Link>
          </div>
        </div>
        <div className="site-card-bright p-6">
          <div className="flex items-center gap-2 text-xs text-muted">
            <Sparkles className="h-4 w-4" />
            Revenue leak audit
          </div>
          <form className="mt-4 space-y-4">
            <input
              className="w-full h-11 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 text-sm"
              placeholder={content.text("contact_form_name", "Full name")}
              type="text"
            />
            <input
              className="w-full h-11 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 text-sm"
              placeholder={content.text("contact_form_email", "Work email")}
              type="email"
            />
            <input
              className="w-full h-11 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 text-sm"
              placeholder={content.text("contact_form_company", "Company")}
              type="text"
            />
            <textarea
              className="w-full min-h-[140px] rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm"
              placeholder={content.text("contact_form_message", "Where do you think leads are leaking today?")}
            />
            <button type="button" className="btn-primary h-11 px-6 text-sm w-full">
              Find my leaks
            </button>
            <p className="text-xs text-muted">
              {content.text("contact_form_note", "This form is for review only. We will wire submissions after the design review.")}
            </p>
          </form>
        </div>
      </section>

      <section className="site-card p-8">
        <h2 className="font-display text-3xl">{content.text("contact_deliverables_title", "What you get after the audit")}</h2>
        <p className="text-muted mt-2 max-w-2xl">
          {content.text("contact_deliverables_subtext", "A clear map of revenue leaks plus the build plan to fix them.")}
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {deliverables.map((item) => (
            <div key={item} className="flex items-center gap-3 text-sm text-muted">
              <CheckCircle2 className="h-4 w-4 text-[var(--accent)]" />
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}



