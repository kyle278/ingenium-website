import { PanelsTopLeft } from "lucide-react";
import styles from "./project-sample-badge.module.css";

export function isSampleWebsite(url: string) {
  return new URL(url).hostname.endsWith(".vercel.app");
}

export default function ProjectSampleBadge({ url }: { url: string }) {
  if (!isSampleWebsite(url)) return null;
  return <span className={styles.badge}><PanelsTopLeft size={14} aria-hidden="true" />Sample</span>;
}
