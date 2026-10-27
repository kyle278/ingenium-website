import { WEBSITE_FORM_NAMES, WEBSITE_FORM_SLUGS } from "@/lib/portalIntegration/forms";
import { buildMetadata, pageSeo } from "@/lib/seo";
import WebsiteBriefForm from "./WebsiteBriefForm";
export const metadata = buildMetadata(pageSeo["/website-brief"]);
export default function WebsiteBriefPage() { return <div className="rebuild-page local-page"><section className="rebuild-hero"><p className="local-location">Private project brief</p><h1>Plan your website.</h1><p className="rebuild-lead">Share the business, pages and features we need to discuss your scope. We’ll ask for your name and email near the end and reply by email. This doesn’t commit you to a project or a launch date.</p></section><WebsiteBriefForm formName={WEBSITE_FORM_NAMES[WEBSITE_FORM_SLUGS.websiteProjectBrief]} formSlug={WEBSITE_FORM_SLUGS.websiteProjectBrief} /></div>; }
