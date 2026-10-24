
import { EditorImage, EditorLink, EditorText } from "@/components/website-editor/Editable";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { teamMembers } from "@/src/lib/team";

export default function TeamGrid() {
  return (
    <div className="rebuild-grid">
      {teamMembers.map((member) => (
        <article className="rebuild-panel" key={member.name} id={member.name.toLowerCase().replace(/\s+/g, "-")}>
          <EditorImage identity={member.name} editorId="r97e1e2b888-ah" src={member.image} alt={member.name} width={320} height={320}
            sizes="(max-width: 820px) 90vw, 320px"
            style={{ width: "100%", maxWidth: 320, height: "auto", aspectRatio: "1", objectFit: "cover", borderRadius: 12 }} />
          <h3><EditorText identity={member.name} editorId="r97e1e2b888-hu" tag="h3" value={member.name} /></h3>
          {member.websiteUrl && (
            <EditorLink identity={member.name} editorId="r97e1e2b888-jp" className="rebuild-text-link team-website-link" href={member.websiteUrl} target="_blank" rel="noopener noreferrer"
              aria-label={`Visit ${member.name}'s website (opens in a new tab)`}>
              <EditorText identity={member.name} editorId="r97e1e2b888-pp" tag="a" value={"Visit "} /><EditorText identity={member.name} editorId="r97e1e2b888-pv" tag="a" value={member.name.split(" ")[0]} /><EditorText identity={member.name} editorId="r97e1e2b888-qm" tag="a" value={"’s website "} /><ArrowUpRight size={16} aria-hidden="true" />
            </EditorLink>
          )}
          <p className="rebuild-kicker"><EditorText identity={member.name} editorId="r97e1e2b888-u8" tag="p" value={member.role} /></p>
          <p><EditorText identity={member.name} editorId="r97e1e2b888-v4" tag="p" value={member.name === "Kyle Redmond" ? "Kyle leads technical delivery, website development and CRM implementation." : member.name === "Clayton Long" ? "Clayton handles project conversations, commercial fit and the scope of work." : "Sophie leads visual design across brand, layout and presentation."} /></p>
          <p><EditorText identity={member.name} editorId="r97e1e2b888-13u" tag="p" value={member.focus.join(" · ")} /></p>
          <p><EditorLink identity={member.name} editorId="r97e1e2b888-153" className="rebuild-text-link" href={`mailto:${member.email}`}><EditorText identity={member.name} editorId="r97e1e2b888-16w" tag="a" value={"Email "} /><EditorText identity={member.name} editorId="r97e1e2b888-172" tag="a" value={member.name.split(" ")[0]} /></EditorLink><EditorText identity={member.name} editorId="r97e1e2b888-17x" tag="p" value={" · "} /><EditorLink identity={member.name} editorId="r97e1e2b888-184" className="rebuild-text-link" href={member.linkedinUrl} target="_blank" rel="noopener noreferrer"><EditorText identity={member.name} editorId="r97e1e2b888-1ax" tag="a" value={"LinkedIn"} /></EditorLink></p>
        </article>
      ))}
    </div>
  );
}
