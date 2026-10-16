import { cache } from "react";
import { headers } from "next/headers";
import type { Metadata } from "next";
import {
  buildMetadata,
  PRIVATE_PATHS,
  PRIVATE_PATH_PREFIXES,
  SITE_URL,
  type PageSeoConfig,
} from "@/lib/seo";
import { pageSeo, type PublishedSeo } from "./seo-adapter";
export const SEO_CACHE_TAG = "ingenium-managed-seo-v1";
export type SeoRevision = {
  id: string;
  revision: number;
  snapshot: PublishedSeo;
};
export function seoConfiguration() {
  const base = process.env.INGENIUM_SEO_SNAPSHOT_BASE_URL?.trim().replace(
      /\/$/,
      "",
    ),
    key = process.env.INGENIUM_SEO_SITE_KEY?.trim();
  return base && key ? { base, key } : null;
}
export function managedPath(path: string) {
  return (
    path.startsWith("/") &&
    !path.startsWith("/api/") &&
    !path.startsWith("/_next/") &&
    !/\.[a-z0-9]+$/i.test(path) &&
    !PRIVATE_PATHS.includes(path as (typeof PRIVATE_PATHS)[number]) &&
    !PRIVATE_PATH_PREFIXES.some((prefix) => path.startsWith(prefix)) &&
    !/\/(confirmed|thanks)$/.test(path)
  );
}
export async function readSeoRevision(
  fresh = false,
): Promise<SeoRevision | null> {
  const config = seoConfiguration();
  if (!config) return null;
  try {
    const response = await fetch(`${config.base}/manifest.json`, {
      ...(fresh
        ? { cache: "no-store" as const }
        : {
            cache: "force-cache" as const,
            next: { revalidate: 300, tags: [SEO_CACHE_TAG] },
          }),
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;
    const raw = await response.text();
    if (raw.length > 2000000) return null;
    const value = JSON.parse(raw) as SeoRevision;
    if (
      !/^[a-f0-9-]{36}$/i.test(value.id) ||
      !Number.isSafeInteger(value.revision) ||
      value.snapshot?.site_key !== config.key ||
      value.snapshot.schema_version !== 1 ||
      !Array.isArray(value.snapshot.pages) ||
      !Array.isArray(value.snapshot.redirects)
    )
      return null;
    return value;
  } catch {
    return null;
  }
}
export const getSeoRevision = cache(() => readSeoRevision());
export async function requestPath() {
  return (await headers()).get("x-ingenium-path") || "/";
}
export async function withPortalSeo(
  existing: Metadata,
  path: string,
): Promise<Metadata> {
  if (!managedPath(path)) return existing;
  const release = await getSeoRevision();
  if (!release) return existing;
  const seo = pageSeo(release.snapshot, new URL(path, SITE_URL).toString());
  return {
    ...existing,
    ...(seo.title ? { title: { absolute: seo.title } } : {}),
    ...(seo.description ? { description: seo.description } : {}),
    ...(seo.canonical
      ? { alternates: { ...existing.alternates, canonical: seo.canonical } }
      : {}),
    ...(seo.robots ? { robots: seo.robots } : {}),
    openGraph: {
      ...existing.openGraph,
      ...(seo.ogTitle || seo.title ? { title: seo.ogTitle || seo.title } : {}),
      ...(seo.ogDescription || seo.description
        ? { description: seo.ogDescription || seo.description }
        : {}),
      ...(seo.ogImage ? { images: [seo.ogImage] } : {}),
    },
    twitter: {
      ...existing.twitter,
      ...(seo.ogTitle || seo.title ? { title: seo.ogTitle || seo.title } : {}),
      ...(seo.ogDescription || seo.description
        ? { description: seo.ogDescription || seo.description }
        : {}),
      ...(seo.ogImage ? { images: [seo.ogImage] } : {}),
    },
  } as Metadata;
}
export async function buildManagedMetadata(config: PageSeoConfig) {
  const base = buildMetadata(config);
  return config.noIndex ? base : withPortalSeo(base, config.path);
}
export function mergeManagedSchemas(
  fallback: Record<string, unknown>[],
  override: unknown,
) {
  if (!override) return fallback;
  const roots = Array.isArray(override) ? override : [override];
  const types = new Set<string>(),
    ids = new Set<string>();
  const collect = (node: unknown) => {
    if (!node || typeof node !== "object") return;
    const row = node as Record<string, unknown>;
    if (typeof row["@type"] === "string") types.add(row["@type"]);
    if (typeof row["@id"] === "string") ids.add(row["@id"]);
    if (Array.isArray(row["@graph"])) row["@graph"].forEach(collect);
  };
  roots.forEach(collect);
  return [
    ...fallback.filter(
      (row) => !types.has(String(row["@type"])) && !ids.has(String(row["@id"])),
    ),
    ...roots,
  ];
}
