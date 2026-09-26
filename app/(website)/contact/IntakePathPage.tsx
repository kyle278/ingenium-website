import ContactForm from "./ContactForm";
import type { IntakePathConfig } from "./pathContent";
export default function IntakePathPage({ config, formName, formSlug }: { config: IntakePathConfig; formName: string; formSlug: string }) {
  return <div className="rebuild-container rebuild-contact"><section className="rebuild-section"><p className="rebuild-eyebrow">{config.title}</p><h1>{config.hero}</h1><p className="rebuild-lead">{config.summary}</p><p>We’ll review your enquiry and get in touch about the next step. This form does not book an appointment.</p></section><section className="rebuild-section" aria-label={config.title}><ContactForm formName={formName} formSlug={formSlug} intent={config.intent} submitLabel={config.ctaLabel} successRedirect={config.confirmationPath} /></section></div>;
}
