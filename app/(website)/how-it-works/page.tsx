import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EditorFlow, EditorSection, EditorText } from "@/components/website-editor/Editable";
import { businessPackages } from "@/lib/business-packages";
import { buildMetadata, pageSeo } from "@/lib/seo";
export const metadata = buildMetadata(pageSeo["/how-it-works"]);
export default function HowItWorksPage() {
  return <EditorFlow containerId="core-packages.v2.process.flow" className="core-packages-page">
    <EditorSection editorId="core-packages.v2.process.hero" className="core-comparison-hero"><p className="brand-eyebrow">A useful first conversation. A clear handover.</p><h1><EditorText editorId="core-packages.v2.process.headline" tag="h1" value="From your business problem to a working setup." /></h1><p className="rebuild-lead">Tell us what needs to work better. We agree the scope and responsibilities, build or configure the solution, and review the result with you.</p></EditorSection>
    <ol className="core-process"><li><span>01</span><h3>Understand the starting point</h3><p>A free 15-minute call to discuss your business, website, enquiries or repeated admin. Complex systems work may need a separately priced discovery phase.</p></li><li><span>02</span><h3>Agree the scope and prepare</h3><p>Your proposal records deliverables, exclusions, payment stages, client inputs, allowances and acceptance checks. You supply accurate content, data and access.</p></li><li><span>03</span><h3>Build, test and hand over</h3><p>Review the agreed website or workflow with us. Complete the included revision or acceptance process and practical handover before launch.</p></li></ol>
    <EditorSection editorId="core-packages.v2.process.timing" className="core-section core-editorial"><h2>A realistic schedule.<br />Clear start conditions.</h2><div>{businessPackages.map(item => <p key={item.id}><strong>{item.name}: {item.timing} target.</strong> {item.id === "crm-automation" ? "The final schedule depends on scope, data quality and integration complexity." : "The delivery period starts when the agreed deposit, required content and access have been received."}</p>)}<p>Client feedback and third-party dependencies affect the schedule. We confirm your project dates before work starts.</p></div></EditorSection>
    <section className="core-section core-close"><div><h2>Start with one example.</h2><p>An enquiry that stalled, a task that gets repeated or a website that no longer represents you.</p></div><Link className="rebuild-button" href="/book-a-call">Help me find the right package<ArrowUpRight size={18} aria-hidden="true" /></Link></section>
  </EditorFlow>;
}

