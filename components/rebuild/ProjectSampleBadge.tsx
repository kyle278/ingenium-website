import { PanelsTopLeft } from "lucide-react";
import styles from "./project-sample-badge.module.css";

const workInProgress = new Set(["fight-factory-pro-wrestling", "attic-jiu-jitsu", "kennypm", "tantrum"]);

export function getProjectBadge(url: string, slug: string) {
  if (workInProgress.has(slug)) return "WIP";
  return new URL(url).hostname.endsWith(".vercel.app") ? "Sample" : null;
}

export default function ProjectSampleBadge({ url, slug }: { url: string; slug: string }) {
  const label = getProjectBadge(url, slug);
  if (!label) return null;
  return <span className={styles.badge}><PanelsTopLeft size={14} aria-hidden="true" />{label}</span>;
}
