
import { EditorFlow, EditorLink, EditorSection, EditorText } from "@/components/website-editor/Editable";
import Link from "next/link";
type PolicySection = { title: string; body: string; items?: string[] };
type PolicyPageProps = { eyebrow: string; title: string; summary: string; updatedLabel: string; sections: PolicySection[] };
export default function PolicyPage({ eyebrow, title, summary, updatedLabel, sections }: PolicyPageProps) {
  return <EditorFlow containerId="r0c16c91eb4-9n" className="rebuild-page">
    <EditorSection editorId="r0c16c91eb4-an" className="rebuild-hero"><p className="rebuild-kicker"><EditorText editorId="r0c16c91eb4-cf" tag="p" value={eyebrow} /></p><h1><EditorText editorId="r0c16c91eb4-cw" tag="h1" value={title} /></h1><p className="rebuild-lead"><EditorText editorId="r0c16c91eb4-e0" tag="p" value={summary} /></p><p><EditorText editorId="r0c16c91eb4-eg" tag="p" value={updatedLabel} /></p></EditorSection>
    {sections.map((section) => <EditorSection editorId="r0c16c91eb4-g5" instanceKey={section.title} className="rebuild-section" key={section.title}><h2 className="rebuild-section-heading"><EditorText identity={section.title} editorId="r0c16c91eb4-iu" tag="h2" value={section.title} /></h2><p><EditorText identity={section.title} editorId="r0c16c91eb4-jh" tag="p" value={section.body} /></p>{section.items && <ul className="rebuild-list">{section.items.map((item) => <li key={item}><EditorText identity={item} editorId="r0c16c91eb4-mi" tag="li" value={item} /></li>)}</ul>}</EditorSection>)}
    <EditorSection editorId="r0c16c91eb4-nj" className="rebuild-section"><h2 className="rebuild-section-heading"><EditorText editorId="r0c16c91eb4-po" tag="h2" value={"Have a question?"} /></h2><p><EditorText editorId="r0c16c91eb4-qc" tag="p" value={"Contact us about this information or your project. Client-specific agreements may contain additional terms."} /></p><EditorLink editorId="r0c16c91eb4-tf" className="rebuild-button" href="/contact"><EditorText editorId="r0c16c91eb4-us" tag="Link" value={"Contact Ingenium"} /></EditorLink>{" "}<EditorLink editorId="r0c16c91eb4-vk" className="rebuild-text-link" href="/security-review"><EditorText editorId="r0c16c91eb4-x8" tag="Link" value={"Security review process →"} /></EditorLink></EditorSection>
  </EditorFlow>;
}
