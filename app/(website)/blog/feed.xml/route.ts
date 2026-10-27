import { allBlogPosts, getBlogManifest } from "@/lib/blog/client";
export const dynamic = "force-dynamic";
function xml(s: string) {
  return s.replace(
    /[<>&"']/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[c]!,
  );
}
export async function GET() {
  try {
    const manifest = await getBlogManifest();
    if (!manifest.enabled) return new Response(null, { status: 404 });
    const posts = (await allBlogPosts()).slice(0, 50);
    const body = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${xml(manifest.title)}</title><link>${xml(manifest.origin + manifest.base_path)}</link><description>${xml(manifest.description)}</description>${posts.map((p) => `<item><guid isPermaLink="false">${p.id}</guid><title>${xml(p.title)}</title><link>${xml(p.url)}</link><description>${xml(p.excerpt)}</description><pubDate>${new Date(p.published_at).toUTCString()}</pubDate></item>`).join("")}</channel></rss>`;
    return new Response(body, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new Response("Feed temporarily unavailable", {
      status: 503,
      headers: { "Retry-After": "60" },
    });
  }
}
