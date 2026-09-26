import Link from "next/link";
type PolicySection = { title: string; body: string; items?: string[] };
type PolicyPageProps = { eyebrow: string; title: string; summary: string; updatedLabel: string; sections: PolicySection[] };
export default function PolicyPage({ eyebrow, title, summary, updatedLabel, sections }: PolicyPageProps) {
  return <div className="rebuild-page">
    <section className="rebuild-hero"><p className="rebuild-kicker">{eyebrow}</p><h1>{title}</h1><p className="rebuild-lead">{summary}</p><p>{updatedLabel}</p></section>
    {sections.map((section) => <section className="rebuild-section" key={section.title}><h2 className="rebuild-section-heading">{section.title}</h2><p>{section.body}</p>{section.items && <ul className="rebuild-list">{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}</section>)}
    <section className="rebuild-section"><h2 className="rebuild-section-heading">Have a question?</h2><p>Contact us about this information or your project. Client-specific agreements may contain additional terms.</p><Link className="rebuild-button" href="/contact">Contact Ingenium</Link>{" "}<Link className="rebuild-text-link" href="/security-review">Security review process →</Link></section>
  </div>;
}
