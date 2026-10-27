import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import styles from "./current-projects.module.css";

const currentProjects = [
  { slug: "farrell-cleaning", name: "Farrell Cleaning", url: "https://www.farrellcleaning.ie" },
  { slug: "holland-pianos", name: "Holland Pianos", url: "https://www.hollandpianos.ie" },
  { slug: "tantrum", name: "Tantrum", url: "https://tantrum-website.vercel.app" },
  { slug: "kennypm", name: "KennyPM", url: "https://kennypm-website.vercel.app/" },
  { slug: "attic-jiu-jitsu", name: "Attic Jiu Jitsu", url: "https://attic-jiu-jitsu-website.vercel.app/" },
  { slug: "connie-byrne-yoga", name: "Connie Byrne Yoga", url: "https://conniebyrneyoga.com" },
  { slug: "nitro-sports-supplements", name: "Nitro Sports Supplements", url: "https://nitro-sports-supplements.vercel.app/" },
];

export default function CurrentProjects({ home = false }: { home?: boolean }) {
  return (
    <section id="current-projects" className={home ? "brand-section" : "rebuild-section"} aria-labelledby="current-projects-heading">
      <h2 id="current-projects-heading" className="rebuild-section-heading">Current projects</h2>
      <div className={styles.grid}>
        {currentProjects.map((project) => (
          <article key={project.slug}>
            <a className={styles.project} href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.name} website (opens in a new tab)`}>
              <div className={styles.preview}>
                <Image src={`/project-previews/${project.slug}.webp`} alt={`Screenshot of the ${project.name} website`} width={1200} height={833} sizes="(max-width: 760px) 100vw, (max-width: 1304px) 50vw, 600px" />
              </div>
              <div className={styles.caption}>
                <div><h3>{project.name}</h3><p>{new URL(project.url).hostname.replace(/^www\./, "")}</p></div>
                <span className={styles.action}>Visit website<ArrowUpRight size={18} aria-hidden="true" /></span>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
