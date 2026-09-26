import { buildMetadata, pageSeo } from "@/lib/seo";
import type { Metadata } from "next";
import ContactForm from "./ContactForm";
export const metadata: Metadata = buildMetadata(pageSeo["/contact"]);
export default function ContactPage() {
  return <div className="rebuild-container rebuild-contact"><section className="rebuild-section"><p className="rebuild-eyebrow">Let’s talk</p><h1>What would you like to improve?</h1><p className="rebuild-lead">A new website, a clearer sales process, or both. Tell us a little about your business and we’ll work out a useful next step.</p><p>No obligation. We’ll review your enquiry and get in touch about the next step.</p><a href="mailto:hello@ingeniumconsulting.net">hello@ingeniumconsulting.net</a></section><section className="rebuild-section" aria-label="Project enquiry"><ContactForm formName="Contact Form" formSlug="contact" /></section></div>;
}
