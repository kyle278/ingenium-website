import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { teamMembers } from "@/src/lib/team";

export default function TeamGrid() {
  return (
    <div className="rebuild-grid">
      {teamMembers.map((member) => (
        <article className="rebuild-panel" key={member.name} id={member.name.toLowerCase().replace(/\s+/g, "-")}>
          <Image src={member.image} alt={member.name} width={320} height={320}
            sizes="(max-width: 820px) 90vw, 320px"
            style={{ width: "100%", maxWidth: 320, height: "auto", aspectRatio: "1", objectFit: "cover", borderRadius: 12 }} />
          <h3>{member.name}</h3>
          {member.websiteUrl && (
            <a className="rebuild-text-link team-website-link" href={member.websiteUrl} target="_blank" rel="noopener noreferrer"
              aria-label={`Visit ${member.name}'s website (opens in a new tab)`}>
              Visit {member.name.split(" ")[0]}’s website <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
          <p className="rebuild-kicker">{member.role}</p>
          <p>{member.name === "Kyle Redmond" ? "Kyle leads technical delivery, website development and CRM implementation." : member.name === "Clayton Long" ? "Clayton handles project conversations, commercial fit and the scope of work." : "Sophie leads visual design across brand, layout and presentation."}</p>
          <p>{member.focus.join(" · ")}</p>
          <p><a className="rebuild-text-link" href={`mailto:${member.email}`}>Email {member.name.split(" ")[0]}</a>{" · "}<a className="rebuild-text-link" href={member.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
        </article>
      ))}
    </div>
  );
}
