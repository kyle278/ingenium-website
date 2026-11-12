import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EditorFlow, EditorSection, EditorText } from "@/components/website-editor/Editable";
import PackageOptions from "@/components/rebuild/PackageOptions";
import { StarterPromotion } from "@/components/rebuild/PackagePricing";
import { getBusinessPackage, packageBookingUrl, starterPromotionActive, type BusinessPackage } from "@/lib/business-packages";
import { packageRequestTime } from "@/lib/package-request-time";
import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata = buildMetadata(pageSeo["/packages"]);
export const dynamic = "force-dynamic";

const crm = getBusinessPackage("crm-automation")!;
const growth = getBusinessPackage("business-growth")!;
const starter = getBusinessPackage("starter-website")!;
const offers = [crm, growth, starter];
const crmScope = {
  "crm-automation": { system: "Configured Ingenium Portal CRM", pipeline: "One", import: "One cleaned dataset; record limit agreed" },
  "business-growth": { system: "Basic Ingenium Portal CRM", pipeline: "One", import: "Major migrations excluded" },
  "starter-website": { system: "Not included", pipeline: "Not included", import: "Not included" },
} as const;

const rows: { label: string; value: (item: BusinessPackage) => string }[] = [
  { label: "Best starting point", value: item => item.fit },
  { label: "CRM", value: item => crmScope[item.id].system },
  { label: "Sales pipeline", value: item => crmScope[item.id].pipeline },
  { label: "Automation", value: item => item.workflows },
  { label: "CRM users", value: item => item.users },
  { label: "Integration", value: item => item.integration },
  { label: "Contact import", value: item => crmScope[item.id].import },
  { label: "Website", value: item => item.website },
  { label: "Training / handover", value: item => item.training },
  { label: "Revisions / acceptance", value: item => item.revisions },
  { label: "Delivery target", value: item => item.timing },
];

export default async function PackagesPage() {
  const now = await packageRequestTime();
  return <EditorFlow containerId="core-packages.v2.compare.flow" className="core-packages-page">
    <EditorSection editorId="core-packages.v2.compare.hero" className="core-comparison-hero" aria-labelledby="packages-title">
      <p className="brand-eyebrow">CRM, enquiry management and websites</p>
      <h1 id="packages-title"><EditorText editorId="core-packages.v2.compare.headline" tag="h1" value="Start with what your team needs to fix." /></h1>
      <p className="rebuild-lead">For established teams, start with CRM and follow-up around the tools you already use. If your website also needs work, Business Growth combines a new site with enquiry management. Starter is for businesses buying their first site.</p>
      <nav className="core-package-jumps" aria-label="Jump to a package">
        {offers.map(item => <a href={`#${item.id}`} key={item.id}>{item.name} ↓</a>)}
      </nav>
    </EditorSection>

    <PackageOptions offers={offers} featuredId={crm.id} />
    {starterPromotionActive(now) && <StarterPromotion initialNow={now} />}

    <nav className="core-fit-links" aria-label="See the workflows before you choose">
      <Link href="/crm-automation#quote-example">See how an open quote gets a follow-up <ArrowUpRight size={16} aria-hidden="true" /></Link>
      <Link href="/business-growth#enquiry-demo">See how a website enquiry reaches the team <ArrowUpRight size={16} aria-hidden="true" /></Link>
    </nav>

    <EditorSection editorId="core-packages.v2.compare.table" className="core-section" id="compare" aria-labelledby="package-comparison-heading">
      <h2 id="package-comparison-heading">Compare what each package includes.</h2>
      <p className="core-small">Scroll across the comparison on smaller screens.</p>
      <div className="core-comparison-scroll" role="region" aria-label="Package scope comparison" tabIndex={0}>
        <table className="core-comparison-table">
          <caption className="sr-only">Scope comparison of Ingenium’s three packages</caption>
          <thead><tr><th scope="col">What matters</th>{offers.map(item => <th scope="col" key={item.id}>{item.name}</th>)}</tr></thead>
          <tbody>{rows.map(row => <tr key={row.label}>
            <th scope="row">{row.label}</th>
            {offers.map(item => <td key={item.id}>{row.value(item)}</td>)}
          </tr>)}</tbody>
          <tfoot><tr>
            <th scope="row">Your next step</th>
            {offers.map(item => <td key={item.id}><Link href={packageBookingUrl(item)} className="rebuild-text-link">{item.cta}<ArrowUpRight size={16} aria-hidden="true" /></Link></td>)}
          </tr></tfoot>
        </table>
      </div>
      <Link href="/ecommerce" className="rebuild-text-link core-compare-link">Need an online shop? Explore ecommerce <ArrowUpRight size={16} aria-hidden="true" /></Link>
    </EditorSection>

    <EditorSection editorId="core-packages.v2.compare.terms" className="core-section core-editorial">
      <h2>A clear proposal before you commit.</h2>
      <div>
        <p>For an established business, we can start with one team and one process. We agree which systems stay in place, what your team will test and whether website work or other integrations belong in the scope.</p>
        <p>Your proposal records deliverables, exclusions, client responsibilities, payment milestones and acceptance checks. Extra work needs an agreed quote.</p>
        <p>Subscriptions document hosting, platform access, support availability, usage limits, cancellation and data export. The first-year figures on individual package pages compare setup plus twelve subscription months. Complex CRM projects may begin with separately paid discovery.</p>
      </div>
    </EditorSection>

    <section className="core-section core-close">
      <div><h2>Bring one handover you want to improve.</h2><p>We’ll use a free 15-minute call to talk through a recent quote, renewal or enquiry and what would be worth testing.</p></div>
      <div className="package-call-actions">
        <Link href={packageBookingUrl(crm)} className="rebuild-button">Discuss your CRM <ArrowUpRight size={17} aria-hidden="true" /></Link>
        <Link href={packageBookingUrl(growth)} className="rebuild-button-secondary">Discuss Business Growth <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
    </section>
  </EditorFlow>;
}
