import Link from "next/link";
import { BlogBody, articleJsonLd, jsonLdString } from "@/lib/blog/renderer";
import type { PublishedArticle } from "@/lib/blog/contracts";
import { getBlogPosts } from "@/lib/blog/client";
import BlogAnalytics from "./BlogAnalytics";

export async function Article({
  post,
  preview = false,
  siteName = "Ingenium",
}: {
  post: PublishedArticle;
  preview?: boolean;
  siteName?: string;
}) {
  const cover = post.cover_media_id && post.media[post.cover_media_id],
    category = post.categories[0];
  const related =
    !preview && post.related_ids.length
      ? (
          await getBlogPosts(
            new URLSearchParams({
              ids: post.related_ids.join(","),
              limit: "6",
            }),
          )
        ).posts
      : [];
  return (
    <article
      className="blog-article"
      data-blog-revision={post.revision_id}
      data-blog-post={post.id}
    >
      {!preview && (
        <BlogAnalytics postId={post.id} revisionId={post.revision_id} />
      )}
      {preview && (
        <aside className="blog-preview-banner">
          <strong>Private article preview</strong>
          <span>This revision has not been published.</span>
          <a href="/api/ingenium/blog/preview?exit=1">Exit preview</a>
        </aside>
      )}
      <header className="blog-article-header">
        <nav className="blog-breadcrumb" aria-label="Breadcrumb">
          <Link href="/blog">Blog</Link>
          {category && (
            <>
              <span>/</span>
              <Link href={`/blog/category/${category.slug}`}>
                {category.name}
              </Link>
            </>
          )}
        </nav>
        <h1>{post.title || "Untitled article"}</h1>
        {post.excerpt && <p className="blog-standfirst">{post.excerpt}</p>}
        <div className="blog-byline">
          <span>
            {post.authors.map((a) => a.name).join(", ") || "Ingenium"}
          </span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.published_at}>
            {new Date(post.published_at).toLocaleDateString("en-IE", {
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "Europe/Dublin",
            })}
          </time>
          {post.modified_at.slice(0, 10) !== post.published_at.slice(0, 10) && (
            <span>
              Updated {new Date(post.modified_at).toLocaleDateString("en-IE")}
            </span>
          )}
        </div>
      </header>
      {cover && (
        <figure className="blog-cover">
          <img
            src={cover.url}
            width={cover.width}
            height={cover.height}
            alt={post.cover_alt}
            fetchPriority="high"
          />
        </figure>
      )}
      <BlogBody blocks={post.body.blocks} media={post.media} />
      {post.tags.length > 0 && (
        <nav className="blog-tags" aria-label="Article topics">
          {post.tags.map((t) => (
            <Link key={t.id} href={`/blog/tag/${t.slug}`}>
              {t.name}
            </Link>
          ))}
        </nav>
      )}
      {post.authors
        .filter((a) => a.description)
        .map((a) => (
          <aside className="blog-author" key={a.id}>
            <h2>About {a.name}</h2>
            <p>{a.description}</p>
            <Link href={`/blog/author/${a.slug}`}>More from {a.name}</Link>
          </aside>
        ))}
      {!!related.length && (
        <aside className="blog-author">
          <h2>Related articles</h2>
          {related.map((article) => (
            <p key={article.id}>
              <Link href={`/blog/${article.slug}`}>{article.title} →</Link>
            </p>
          ))}
        </aside>
      )}
      <footer className="blog-article-footer">
        <Link href="/blog">← All articles</Link>
        <Link href="/contact">Discuss your project →</Link>
      </footer>
      {!preview && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdString({
              "@context": "https://schema.org",
              "@graph": [
                articleJsonLd(post, siteName),
                {
                  "@type": "BreadcrumbList",
                  "@id": `${post.url}#breadcrumb`,
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "Blog",
                      item: new URL("/blog", post.url).toString(),
                    },
                    {
                      "@type": "ListItem",
                      position: 2,
                      name: post.title,
                      item: post.url,
                    },
                  ],
                },
              ],
            }),
          }}
        />
      )}
    </article>
  );
}
