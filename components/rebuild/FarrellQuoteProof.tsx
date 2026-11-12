import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EditorSection } from "@/components/website-editor/Editable";

export default function FarrellQuoteProof({ editorId, id, projectsLink }: { editorId: string; id: string; projectsLink?: string }) {
  return <EditorSection editorId={editorId} className="core-section quote-form-proof" id={id} aria-labelledby={`${id}-heading`}>
    <div>
      <p className="brand-eyebrow">Published client website · Farrell Contract Cleaning</p>
      <h2 id={`${id}-heading`}>A clearer way to request a cleaning quote.</h2>
      <p>We built a dedicated quote form for Farrell. Customers can choose the type of cleaning they need and tell the team how they prefer to be contacted.</p>
      <div className="core-hero-actions">
        <Link href="/business-growth#package-example" className="rebuild-button">See the published quote example <ArrowUpRight size={17} aria-hidden="true" /></Link>
        {projectsLink && <Link href={projectsLink} className="rebuild-text-link">See more website projects <ArrowUpRight size={16} aria-hidden="true" /></Link>}
      </div>
    </div>
    <figure className="quote-form-capture">
      <div>
        <Image src="/project-previews/farrell-quote-mobile.webp" alt="Farrell’s quote form showing cleaning service and contact method choices on a phone" width={716} height={1394} sizes="208px" />
      </div>
      <figcaption>First step of Farrell’s live quote form</figcaption>
    </figure>
  </EditorSection>;
}
