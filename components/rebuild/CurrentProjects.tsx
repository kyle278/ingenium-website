
import { EditorLink, EditorSection, EditorText } from "@/components/website-editor/Editable";
import { ArrowUpRight } from "lucide-react";

const currentProjects = [
  { name: "Farrell Cleaning", url: "https://www.farrellcleaning.ie" },
  { name: "Holland Pianos", url: "https://www.hollandpianos.ie" },
  { name: "Tantrum", url: "https://tantrum-website.vercel.app" },
  { name: "KennyPM", url: "https://kennypm-website.vercel.app/" },
  { name: "Attic Jiu Jitsu", url: "https://attic-jiu-jitsu-website.vercel.app/memberships" },
  { name: "Connie Byrne Yoga", url: "https://conniebyrneyoga.com" },
];

export default function CurrentProjects({ home = false }: { home?: boolean }) {
  return (
    <EditorSection editorId="rebuild.components.rebuild.CurrentProjects.tsx.section.87f2e0ee1a5f"
      id="current-projects"
      className={home ? "brand-section" : "rebuild-section"}
      aria-labelledby="current-projects-heading"
    >
      <h2 id="current-projects-heading" className="rebuild-section-heading"><EditorText editorId="rebuild.components.rebuild.CurrentProjects.tsx.text.c127439ea83e" tag="h2" value={"Current projects"} /></h2>
      <div className="rebuild-grid rebuild-grid-two mt-8">
        {currentProjects.map((project) => (
          <article className="rebuild-panel" key={project.url}>
            <h3><EditorText editorId="rebuild.components.rebuild.CurrentProjects.tsx.text.351d700f547e" identity={project.url} tag="h3" value={project.name} /></h3>
            <p className="break-words"><EditorText editorId="rebuild.components.rebuild.CurrentProjects.tsx.text.ac001b4fa144" identity={project.url} tag="p" value={new URL(project.url).hostname.replace(/^www\./, "")} /></p>
            <EditorLink editorId="rebuild.components.rebuild.CurrentProjects.tsx.link.c45be03954df" identity={project.url}
              className="rebuild-text-link"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.name} website (opens in a new tab)`}
            >
              <EditorText editorId="rebuild.components.rebuild.CurrentProjects.tsx.text.15bf74726c6b" identity={project.url} tag="a" value={"Visit website"} /><ArrowUpRight size={17} aria-hidden="true" />
            </EditorLink>
          </article>
        ))}
      </div>
    </EditorSection>
  );
}
