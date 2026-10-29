import { packageRequestTime } from "@/lib/package-request-time";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EditorFlow, EditorSection, EditorText } from "@/components/website-editor/Editable";
import PackageOptions from "@/components/rebuild/PackageOptions";
import { StarterPromotion } from "@/components/rebuild/PackagePricing";
import { businessPackages, packageBookingUrl, PACKAGE_PRICE_NOTE } from "@/lib/business-packages";
import { buildMetadata, pageSeo } from "@/lib/seo";
export const metadata = buildMetadata(pageSeo["/packages"]);
export const dynamic = "force-dynamic";
const rows = [
  ["Best starting point", ...businessPackages.map(p => p.fit)],
  ["Website", ...businessPackages.map(p => p.website)],
  ["CRM", "No full CRM", "Basic Ingenium Portal CRM", "Configured Ingenium Portal CRM"],
  ["Sales pipeline", "Not included", "One", "One"],
  ["Automation", ...businessPackages.map(p => p.workflows)],
  ["CRM users", ...businessPackages.map(p => p.users)],
  ["Integration", ...businessPackages.map(p => p.integration)],
  ["Contact import", "Not included", "Major migrations excluded", "One cleaned dataset; record limit agreed"],
  ["Training / handover", ...businessPackages.map(p => p.training)],
  ["Revisions / acceptance", ...businessPackages.map(p => p.revisions)],
  ["Delivery target", ...businessPackages.map(p => p.timing)],
];
export default async function PackagesPage() {
  const now = await packageRequestTime();
  return <EditorFlow containerId="core-packages.v2.compare.flow" className="core-packages-page">
    <StarterPromotion initialNow={now} />
    <EditorSection editorId="core-packages.v2.compare.hero" className="core-comparison-hero"><p className="brand-eyebrow">Online presence → Customer enquiries → Business operations</p><h1><EditorText editorId="core-packages.v2.compare.headline" tag="h1" value="The right support for your next stage." /></h1><p className="rebuild-lead">Three defined starting points. One team to help you choose, build and use the right one. Setup and monthly subscriptions are shown separately.</p><nav className="core-package-jumps" aria-label="Jump to a package">{businessPackages.map(item => <a href={`#${item.id}`} key={item.id}>{item.name} ↓</a>)}</nav></EditorSection>
    <PackageOptions />
    <EditorSection editorId="core-packages.v2.compare.table" className="core-section" id="compare"><h2>See the differences at a glance.</h2><p className="core-small">Scroll across the comparison on smaller screens.</p><div className="core-comparison-scroll" role="region" aria-label="Package scope comparison" tabIndex={0}><table className="core-comparison-table"><caption className="sr-only">Scope comparison of Ingenium&apos;s three core packages</caption><thead><tr><th scope="col">What matters</th>{businessPackages.map(p => <th scope="col" key={p.id}>{p.name}</th>)}</tr></thead><tbody>{rows.map(([label, ...cells]) => <tr key={label}><th scope="row">{label}</th>{cells.map((cell, i) => <td key={i}>{cell}</td>)}</tr>)}</tbody><tfoot><tr><th scope="row">Your next step</th>{businessPackages.map(p => <td key={p.id}><Link href={packageBookingUrl(p)} className="rebuild-text-link">{p.cta}<ArrowUpRight size={16} aria-hidden="true" /></Link></td>)}</tr></tfoot></table></div></EditorSection>
    <EditorSection editorId="core-packages.v2.compare.terms" className="core-section core-editorial"><h2>A clear proposal<br />before you commit.</h2><div><p>{PACKAGE_PRICE_NOTE}</p><p>Every project has written deliverables, exclusions, client responsibilities, payment milestones and acceptance checks. Extra work needs an agreed quote.</p><p>Subscriptions document hosting, platform access, support availability, usage limits, cancellation and data export. The first-year figures on individual package pages are comparisons of setup plus twelve subscription months, not annual invoices or minimum terms.</p><p>Existing client agreements and promotional commitments are honoured. Complex CRM projects may begin with separately paid discovery.</p></div></EditorSection>
    <section className="core-section core-close"><div><h2>Unsure where the<br />real problem sits?</h2><p>Show us one enquiry, quote or task that is hard to keep track of. We will help you choose a starting point.</p></div><Link href="/book-a-call" className="rebuild-button">Help me choose<ArrowUpRight size={18} aria-hidden="true" /></Link></section>
  </EditorFlow>;
}
