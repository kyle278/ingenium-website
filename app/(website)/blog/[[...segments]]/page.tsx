import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { Article } from "@/components/blog/Article";
import {
  getBlogManifest,
  getBlogArticle,
  getBlogPosts,
  getBlogEntities,
  readBlogPreview,
  BlogUnavailable,
  type Summary,
} from "@/lib/blog/client";
import "../../blog.css";

export const dynamic = "force-dynamic";
type Props = {
  params: Promise<{ segments?: string[] }>;
  searchParams: Promise<{ q?: string }>;
};
async function route(segments: string[], q?: string) {
  const manifest = await getBlogManifest();
  if (segments[0] === "preview" && segments[1]) {
    const preview = await readBlogPreview();
    if (preview.post.id !== segments[1]) notFound();
    return { manifest, post: preview.post, preview: true };
  }
  if (!manifest.enabled) notFound();
  if (
    segments.length === 1 &&
    !["search", "page", "category", "tag", "author"].includes(segments[0])
  ) {
    const result = await getBlogArticle(segments[0]);
    if (result.redirect) permanentRedirect(result.redirect.path);
    if (!result.post) notFound();
    return { manifest, post: result.post, preview: false };
  }
  let page = 1,
    title = manifest.title,
    description = manifest.description,
    noindex = segments[0] === "search";
  const query = new URLSearchParams({ limit: "12" });
  if (segments[0] === "page") {
    if (segments.length !== 2 || !/^[1-9]\d*$/.test(segments[1])) notFound();
    page = Number(segments[1]);
    query.set("page", String(page));
  } else if (["category", "tag", "author"].includes(segments[0])) {
    if (segments.length !== 2) notFound();
    const kind = (
      { category: "categories", tag: "tags", author: "authors" } as const
    )[segments[0] as "category" | "tag" | "author"];
    const result = await getBlogEntities(kind, segments[1]),
      entity = result.entities[0];
    title = entity?.seo.title || entity?.name || title;
    description = entity?.seo.description || entity?.description || description;
    noindex = entity?.seo.noindex ?? true;
    query.set(segments[0], segments[1]);
  } else if (segments[0] === "search") {
    if (segments.length !== 1) notFound();
    title = "Search articles";
    query.set("q", q || "");
  } else if (segments.length) notFound();
  const result = await getBlogPosts(query);
  if (page > 1 && !result.posts.length) notFound();
  return {
    manifest,
    list: result,
    page,
    title,
    description,
    preview: false,
    query: q || "",
    noindex,
  };
}
export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { segments = [] } = await params,
    { q } = await searchParams;
  try {
    const data = await route(segments, q),
      path = `/blog${segments.length ? `/${segments.join("/")}` : ""}`;
    if (data.post) {
      const p = data.post,
        social = p.seo.social_media_id
          ? p.media[p.seo.social_media_id]
          : p.cover_media_id
            ? p.media[p.cover_media_id]
            : undefined;
      return {
        title: { absolute: p.seo.title || `${p.title} | Ingenium` },
        description: p.seo.description || p.excerpt,
        alternates: { canonical: p.seo.canonical || p.url },
        robots: {
          index: !data.preview && !p.seo.noindex,
          follow: !data.preview,
        },
        openGraph: {
          type: "article",
          title: p.seo.social_title || p.seo.title || p.title,
          description:
            p.seo.social_description || p.seo.description || p.excerpt,
          url: p.url,
          publishedTime: p.published_at,
          modifiedTime: p.modified_at,
          ...(social
            ? {
                images: [
                  {
                    url: social.url,
                    width: social.width,
                    height: social.height,
                    alt: social.alt,
                  },
                ],
              }
            : {}),
        },
        twitter: {
          card: social ? "summary_large_image" : "summary",
          title: p.seo.social_title || p.title,
          description: p.seo.social_description || p.excerpt,
          ...(social ? { images: [social.url] } : {}),
        },
      };
    }
    return {
      title: `${data.title}${data.page && data.page > 1 ? ` — Page ${data.page}` : ""}`,
      description: data.description,
      alternates: { canonical: `${data.manifest.origin}${path}` },
      robots: { index: !data.noindex, follow: true },
    };
  } catch (error) {
    if (
      error instanceof BlogUnavailable &&
      [401, 404, 410].includes(error.status)
    )
      return {
        title: "Article unavailable",
        robots: { index: false, follow: false },
      };
    throw error;
  }
}
export default async function BlogPage({ params, searchParams }: Props) {
  const { segments = [] } = await params,
    { q } = await searchParams;
  let data;
  try {
    data = await route(segments, q);
  } catch (error) {
    if (
      error instanceof BlogUnavailable &&
      [401, 404, 410].includes(error.status)
    )
      notFound();
    throw error;
  }
  if (data.post) return <Article post={data.post} preview={data.preview} />;
  const list = data.list!,
    page = data.page || 1;
  return (
    <div className="blog-home" data-blog-generation={list.generation}>
      <header className="blog-intro">
        <p className="blog-section-label">Ideas from Ingenium</p>
        <h1>{data.title}</h1>
        <p>
          {data.description ||
            "Practical ideas for better websites, clearer customer journeys and more organised follow-up."}
        </p>
        <form action="/blog/search" className="blog-search" role="search">
          <label className="sr-only" htmlFor="blog-search">
            Search articles
          </label>
          <input
            id="blog-search"
            name="q"
            defaultValue={data.query}
            placeholder="Search the blog"
            maxLength={100}
          />
          <button type="submit">Search →</button>
        </form>
      </header>
      <section className="blog-post-grid" aria-label="Articles">
        {list.posts.map((p: Summary) => {
          const image = p.cover_media_id && p.media[p.cover_media_id];
          return (
            <article key={p.id} className="blog-post-card">
              {image && (
                <Link href={`/blog/${p.slug}`} aria-label={p.title}>
                  <img
                    src={image.url}
                    width={image.width}
                    height={image.height}
                    alt={p.cover_alt || image.alt || p.title}
                    loading="lazy"
                  />
                </Link>
              )}
              <div className="blog-card-content">
                {p.categories[0] && (
                  <Link
                    className="blog-category"
                    href={`/blog/category/${p.categories[0].slug}`}
                  >
                    {p.categories[0].name}
                  </Link>
                )}
                <h2>
                  <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                </h2>
                <p>{p.excerpt}</p>
                <div className="blog-card-footer">
                  <span>{p.authors.map((a) => a.name).join(", ")}</span>
                  <time dateTime={p.published_at}>
                    {new Date(p.published_at).toLocaleDateString("en-IE", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                </div>
                <Link className="blog-read-link" href={`/blog/${p.slug}`}>
                  Read article <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          );
        })}
      </section>
      {!list.posts.length && (
        <div className="blog-empty">
          <h2>
            {segments[0] === "search"
              ? "No matching articles."
              : "The next idea is on its way."}
          </h2>
          <p>
            {segments[0] === "search"
              ? "Try a different word or browse all articles."
              : "Our latest practical guides will appear here."}
          </p>
          <Link href={segments[0] === "search" ? "/blog" : "/contact"}>
            {segments[0] === "search"
              ? "Browse the blog"
              : "Discuss your project"}{" "}
            →
          </Link>
        </div>
      )}
      {(!segments.length || segments[0] === "page") && (
        <nav className="blog-pagination" aria-label="Article pages">
          {page > 1 && (
            <Link href={page === 2 ? "/blog" : `/blog/page/${page - 1}`}>
              ← Previous
            </Link>
          )}
          <span>Page {page}</span>
          {list.next_cursor && (
            <Link href={`/blog/page/${page + 1}`}>Next →</Link>
          )}
        </nav>
      )}
    </div>
  );
}
