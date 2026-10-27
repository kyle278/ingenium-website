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
    <section
      id="current-projects"
      className={home ? "brand-section" : "rebuild-section"}
      aria-labelledby="current-projects-heading"
    >
      <h2 id="current-projects-heading" className="rebuild-section-heading">Current projects</h2>
      <div className="rebuild-grid rebuild-grid-two mt-8">
        {currentProjects.map((project) => (
          <article className="rebuild-panel" key={project.url}>
            <h3>{project.name}</h3>
            <p className="break-words">{new URL(project.url).hostname.replace(/^www\./, "")}</p>
            <a
              className="rebuild-text-link"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.name} website (opens in a new tab)`}
            >
              Visit website<ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
