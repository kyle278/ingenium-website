import Link from "next/link";
import { CallLink, LocalFaq, NextStep } from "@/components/rebuild/LocalBusinessSections";
import PackageOptions from "@/components/rebuild/PackageOptions";
import { buildMetadata, pageSeo } from "@/lib/seo";
export const metadata = buildMetadata(pageSeo["/packages"]);
export default function PackagesPage() {
  return <div className="rebuild-page local-page">
    <section className="rebuild-hero"><p className="local-location">A useful first step. Room to grow.</p><h1>Your business online. The hard part handled.</h1><p className="rebuild-lead">Look credible when customers check you, without spending your evenings writing a website. Choose one clear page or give each main service its own space. We handle the writing and setup; you approve the result.</p><CallLink /><nav className="local-package-jumps" aria-label="Choose a package route"><a href="#packages-website">I need a website ↓</a><a href="#packages-follow-up">I need better follow-up ↓</a></nav></section>
    <PackageOptions />
    <section className="rebuild-section local-split"><h2 className="rebuild-section-heading">Need both? Plan them together.</h2><div><p>If your online presence and your follow-up both need attention, the Leads to Jobs System brings the whole customer journey together. From checking your services to asking for a quote and hearing back.</p><Link href="/leads-to-jobs" className="rebuild-text-link">Explore the Leads to Jobs System ↗</Link></div></section>
    <section className="rebuild-section local-assurance"><h2>A clear proposal before you decide.</h2><p>We’ll recommend the smallest useful package and confirm what fits your business, your delivery schedule and any extras in writing. Tell us how you work now; you don’t need to choose the technology.</p></section>
    <LocalFaq /><NextStep title="Not sure which package fits? That’s what the call is for." />
  </div>;
}
