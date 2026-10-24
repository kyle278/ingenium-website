
import { EditorFlow, EditorLink, EditorSection, EditorText } from "@/components/website-editor/Editable";
import type { Metadata } from "next";
import Link from "next/link";
import TeamGrid from "@/components/rebuild/TeamGrid";
import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(pageSeo["/team"]);

export default function TeamPage() {
  return (
    <EditorFlow containerId="rebuild.app.website.team.page.tsx.flow.6b428663b4d9" className="rebuild-page">
      <EditorSection editorId="rebuild.app.website.team.page.tsx.section.dd054a526f76" className="rebuild-hero">
        <p className="rebuild-kicker"><EditorText editorId="rebuild.app.website.team.page.tsx.text.ecfdb98aaa88" tag="p" value={"Meet the team"} /></p>
        <h1><EditorText editorId="rebuild.app.website.team.page.tsx.text.320bc7ffc3c9" tag="h1" value={"The people behind your project."} /></h1>
        <p className="rebuild-lead"><EditorText editorId="rebuild.app.website.team.page.tsx.text.a0ee071a0b51" tag="p" value={"A small team with clear responsibilities across design, technical delivery and project conversations. You work directly with the people building your website and CRM."} /></p>
        <div className="home-hero-actions">
          <EditorLink editorId="rebuild.app.website.team.page.tsx.link.36aea10fa021" className="rebuild-button" href="/contact"><EditorText editorId="rebuild.app.website.team.page.tsx.text.ec58fda05a5e" tag="Link" value={"Talk to the team"} /></EditorLink>
          <EditorLink editorId="rebuild.app.website.team.page.tsx.link.9ff5d6f1dd66" className="rebuild-text-link" href="/about"><EditorText editorId="rebuild.app.website.team.page.tsx.text.e63acddf11b1" tag="Link" value={"About Ingenium →"} /></EditorLink>
        </div>
      </EditorSection>
      <EditorSection editorId="rebuild.app.website.team.page.tsx.section.9969d3eb519c" className="rebuild-section">
        <h2 className="rebuild-section-heading"><EditorText editorId="rebuild.app.website.team.page.tsx.text.0aa92e32633e" tag="h2" value={"Meet the people you’ll work with."} /></h2>
        <TeamGrid />
      </EditorSection>
      <EditorSection editorId="rebuild.app.website.team.page.tsx.section.a6b9a2e17578" className="rebuild-section home-invitation">
        <div><h2 className="rebuild-section-heading"><EditorText editorId="rebuild.app.website.team.page.tsx.text.85f49d1eafb8" tag="h2" value={"Let’s talk about your next step."} /></h2><p><EditorText editorId="rebuild.app.website.team.page.tsx.text.1d5c962ee7c7" tag="p" value={"Tell us what needs to work better. We’ll help you find the right scope and the right people for the project."} /></p></div>
        <EditorLink editorId="rebuild.app.website.team.page.tsx.link.685ed1d0f741" className="rebuild-button" href="/contact"><EditorText editorId="rebuild.app.website.team.page.tsx.text.ed43933a8854" tag="Link" value={"Discuss your project"} /></EditorLink>
      </EditorSection>
    </EditorFlow>
  );
}
