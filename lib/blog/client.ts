import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { createHmac } from "node:crypto";
import type { PublishedArticle, PublicEntity } from "./contracts";

export type Manifest = {
  api_version: number;
  generation: number;
  enabled: boolean;
  site_key: string;
  title: string;
  description: string;
  base_path: string;
  origin: string;
};
export type Summary = Omit<PublishedArticle, "body">;
export class BlogUnavailable extends Error {
  constructor(
    message: string,
    public status = 503,
  ) {
    super(message);
  }
}
export function blogConfig() {
  const origin =
      process.env.INGENIUM_PORTAL_ORIGIN ||
      "https://portal.ingeniumconsulting.net",
    key = process.env.INGENIUM_BLOG_SITE_KEY;
  if (!key || !/^blog_[a-f0-9]{32}$/.test(key))
    throw new BlogUnavailable("The blog connection is not configured.");
  if (new URL(origin).protocol !== "https:")
    throw new BlogUnavailable("The Portal connection requires HTTPS.");
  return {
    origin: new URL(origin).origin,
    key,
    secret: process.env.INGENIUM_BLOG_SIGNING_SECRET || "",
  };
}
export async function blogFetch<T>(path: string): Promise<T> {
  const config = blogConfig();
  let response;
  try {
    response = await fetch(
      `${config.origin}/api/websites/blog/public/v1/${config.key}/${path}`,
      {
        cache: "no-store",
        redirect: "error",
        signal: AbortSignal.timeout(12000),
      },
    );
  } catch {
    throw new BlogUnavailable(
      "The article service is temporarily unavailable.",
    );
  }
  if (!response.ok)
    throw new BlogUnavailable(
      response.status === 404
        ? "Article not found."
        : response.status === 410
          ? "Article removed."
          : "The article service is temporarily unavailable.",
      response.status,
    );
  if (Number(response.headers.get("content-length") || 0) > 2200000)
    throw new BlogUnavailable("Article response exceeds its size limit.");
  const text = await response.text();
  if (text.length > 2200000)
    throw new BlogUnavailable("Article response exceeds its size limit.");
  const data = JSON.parse(text);
  if (
    data.api_version !== 1 ||
    data.site_key !== config.key ||
    !Number.isSafeInteger(data.generation)
  )
    throw new BlogUnavailable("The Blog contract version is not supported.");
  return data as T;
}
export const getBlogManifest = cache(() => blogFetch<Manifest>("manifest"));
export const getBlogArticle = cache((slug: string) =>
  blogFetch<{
    generation: number;
    post?: PublishedArticle;
    redirect?: { status: number; path: string };
  }>(`posts/${encodeURIComponent(slug)}`),
);
export async function getBlogPosts(
  params: URLSearchParams = new URLSearchParams(),
) {
  return blogFetch<{
    generation: number;
    posts: Summary[];
    total: number;
    next_cursor: string | null;
  }>(`posts?${params}`);
}
export async function getBlogEntities(
  kind: "categories" | "tags" | "authors",
  slug?: string,
) {
  return blogFetch<{ entities: PublicEntity[] }>(
    `${kind}${slug ? `/${encodeURIComponent(slug)}` : ""}`,
  );
}
export async function signedBlogRequest(
  action: "exchange" | "read",
  payload: Record<string, unknown>,
) {
  const config = blogConfig();
  if (!config.secret) throw new BlogUnavailable("Preview is not configured.");
  const body = JSON.stringify({ site_key: config.key, ...payload }),
    timestamp = String(Date.now());
  const signature = createHmac("sha256", config.secret)
    .update(`${timestamp}.${body}`)
    .digest("hex");
  const response = await fetch(
    `${config.origin}/api/websites/blog/preview/${action}`,
    {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
        "X-Ingenium-Timestamp": timestamp,
        "X-Ingenium-Signature": signature,
      },
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(12000),
    },
  );
  if (!response.ok)
    throw new BlogUnavailable("Preview expired, revoked or unavailable.", 401);
  return (await response.json()) as {
    post: PublishedArticle;
    session?: string;
    expires_at: string;
    base_path: string;
  };
}
export const readBlogPreview = cache(async () => {
  const cookie = (await cookies()).get("ingenium-blog-preview")?.value;
  if (!cookie) throw new BlogUnavailable("Preview access required.", 401);
  return signedBlogRequest("read", { session: cookie });
});
export async function allBlogPosts(): Promise<Summary[]> {
  for (let attempt = 0; attempt < 3; attempt++) {
    const posts: Summary[] = [];
    let cursor: string | null = null;
    try {
      do {
        const params = new URLSearchParams({ limit: "50" });
        if (cursor) params.set("cursor", cursor);
        const result = await getBlogPosts(params);
        posts.push(...result.posts);
        cursor = result.next_cursor;
        if (posts.length > 100000)
          throw new BlogUnavailable(
            "Split the blog sitemap before adding more articles.",
          );
      } while (cursor);
      return posts;
    } catch (e) {
      if (!(e instanceof BlogUnavailable) || e.status !== 409 || attempt === 2)
        throw e;
    }
  }
  return [];
}
