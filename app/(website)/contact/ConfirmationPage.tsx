import Link from "next/link";
type Props = { title: string; body: string; primaryLabel: string; primaryHref: string };
export default function ConfirmationPage({ title, primaryLabel, primaryHref }: Props) {
  return <section className="rebuild-container rebuild-section"><p className="rebuild-eyebrow">Next steps</p><h1>{title}</h1><p className="rebuild-lead">If you have just sent the form and received confirmation, we’ll review your enquiry and get in touch about the next step. An appointment has not been booked.</p><p>Opening this page directly does not send an enquiry.</p><div className="rebuild-actions"><Link className="rebuild-button" href={primaryHref}>{primaryLabel}</Link><Link href="/contact">Contact Ingenium</Link></div></section>;
}
