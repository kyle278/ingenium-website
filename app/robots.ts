import type { MetadataRoute } from "next";
import { PRIVATE_PATH_PREFIXES, PRIVATE_PATHS, SITE_URL } from "@/lib/seo";
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/", ...PRIVATE_PATH_PREFIXES, ...PRIVATE_PATHS];
  return { rules: ["*", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "PerplexityBot", "GPTBot"].map((userAgent) => ({ userAgent, allow: "/", disallow })), sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL };
}
