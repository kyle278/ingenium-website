import React from "react";
import type { BlogBlock, PublishedArticle, PublicMedia } from "./contracts";

/** Formatting is parsed into React nodes; stored content is never executable HTML. */
export function inlineText(text: string): React.ReactNode[] {
  return text
    .split(/(\*\*[^*\n]+\*\*|\*[^*\n]+\*|\[[^\]\n]+\]\([^\s)]+\))/g)
    .map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**"))
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      if (part.startsWith("*") && part.endsWith("*"))
        return <em key={i}>{part.slice(1, -1)}</em>;
      const link = part.match(/^\[([^\]]+)\]\((.+)\)$/);
      if (
        link &&
        (/^(https:\/\/|mailto:|tel:)/i.test(link[2]) ||
          (/^\/(?!\/)/.test(link[2]) && !/[\\\u0000-\u001f]/.test(link[2])))
      )
        return (
          <a key={i} href={link[2]}>
            {link[1]}
          </a>
        );
      return part;
    });
}
export function BlogBody({
  blocks,
  media,
}: {
  blocks: BlogBlock[];
  media: Record<string, PublicMedia>;
}) {
  return (
    <div className="blog-prose">
      {blocks.map((block) => (
        <React.Fragment key={block.id}>
          {renderBlock(block, media)}
        </React.Fragment>
      ))}
    </div>
  );
}
function renderBlock(
  b: BlogBlock,
  media: Record<string, PublicMedia>,
): React.ReactNode {
  switch (b.type) {
    case "heading":
      return b.level === 3 ? (
        <h3>{inlineText(b.text)}</h3>
      ) : b.level === 4 ? (
        <h4>{inlineText(b.text)}</h4>
      ) : (
        <h2>{inlineText(b.text)}</h2>
      );
    case "paragraph":
      return <p style={{ whiteSpace: "pre-wrap" }}>{inlineText(b.text)}</p>;
    case "quote":
      return <blockquote>{inlineText(b.text)}</blockquote>;
    case "callout":
      return <aside className="blog-callout">{inlineText(b.text)}</aside>;
    case "list": {
      const items = b.text
        .split("\n")
        .filter(Boolean)
        .map((v, i) => <li key={i}>{inlineText(v)}</li>);
      return b.ordered ? <ol>{items}</ol> : <ul>{items}</ul>;
    }
    case "image": {
      const image = b.media_id && media[b.media_id];
      return image ? (
        <figure>
          <img
            src={image.url}
            width={image.width}
            height={image.height}
            alt={b.decorative ? "" : b.alt}
            loading="lazy"
          />
          {b.caption && <figcaption>{b.caption}</figcaption>}
        </figure>
      ) : null;
    }
    case "cta":
      return (
        <aside className="blog-cta">
          <p>{inlineText(b.text)}</p>
          <a href={b.href}>{b.label}</a>
        </aside>
      );
    case "divider":
      return <hr />;
    case "code":
      return (
        <pre>
          <code>{b.text}</code>
        </pre>
      );
    case "table": {
      const [head, ...rows] = b.text
        .split("\n")
        .filter(Boolean)
        .map((row) => row.split("|"));
      return (
        <div className="blog-table-scroll">
          <table>
            {b.caption && <caption>{b.caption}</caption>}
            <thead>
              <tr>
                {head?.map((cell, i) => (
                  <th scope="col" key={i}>
                    {inlineText(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{inlineText(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}
export function articleJsonLd(post: PublishedArticle, siteName: string) {
  const image = post.cover_media_id && post.media[post.cover_media_id];
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${post.url}#article`,
    mainEntityOfPage: post.seo.canonical || post.url,
    headline: post.title,
    description: post.seo.description || post.excerpt,
    datePublished: post.published_at,
    dateModified: post.modified_at,
    inLanguage: post.locale,
    ...(image ? { image: [image.url] } : {}),
    author: post.authors.map((a) => ({
      "@type": "Person",
      name: a.name,
      ...(a.url ? { url: a.url } : {}),
    })),
    publisher: { "@type": "Organization", name: siteName },
  };
}
export function jsonLdString(value: unknown) {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
