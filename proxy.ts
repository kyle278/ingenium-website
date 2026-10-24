import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  readSeoRevision,
  managedPath,
} from "@/lib/portalIntegration/seo-runtime";
import { seoRedirect } from "@/lib/portalIntegration/seo-adapter";
import { BLOG_UNAVAILABLE_HTML } from "@/lib/blog/unavailable";

const APEX_HOST = "ingeniumconsulting.net";
const CANONICAL_HOST = "www.ingeniumconsulting.net";
const WEBSITE_BRIEF_COOKIE = "ingenium-brief-access";
const WEBSITE_BRIEF_PATH = "/website-brief";

function isWebsiteBriefPath(pathname: string) {
  return (
    pathname === WEBSITE_BRIEF_PATH ||
    pathname.startsWith(`${WEBSITE_BRIEF_PATH}/`)
  );
}

function existingProxy(request: NextRequest) {
  if (request.nextUrl.hostname !== APEX_HOST) {
    const websiteBriefToken = process.env.WEBSITE_BRIEF_ACCESS_TOKEN?.trim();
    const isDevelopment = process.env.NODE_ENV !== "production";

    if (!isWebsiteBriefPath(request.nextUrl.pathname)) {
      return NextResponse.next();
    }

    if (!websiteBriefToken) {
      return isDevelopment
        ? NextResponse.next()
        : new NextResponse(null, { status: 404 });
    }

    const tokenFromCookie = request.cookies.get(WEBSITE_BRIEF_COOKIE)?.value;

    if (tokenFromCookie === websiteBriefToken) {
      return NextResponse.next();
    }

    const tokenFromQuery = request.nextUrl.searchParams.get("access");

    if (tokenFromQuery !== websiteBriefToken) {
      return new NextResponse(null, { status: 404 });
    }

    const redirectUrl = request.nextUrl.clone();
    redirectUrl.searchParams.delete("access");

    const response = NextResponse.redirect(redirectUrl, 307);
    response.cookies.set(WEBSITE_BRIEF_COOKIE, websiteBriefToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: WEBSITE_BRIEF_PATH,
      maxAge: 60 * 60 * 12,
    });

    return response;
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.hostname = CANONICAL_HOST;
  redirectUrl.protocol = "https:";

  return NextResponse.redirect(redirectUrl, 308);
}

export async function proxy(request: NextRequest) {
  const gate = existingProxy(request);
  if (gate.status !== 200) return gate;
  if (request.nextUrl.searchParams.get("__ingenium_editor")==="1") {
    const requestHeaders=new Headers(request.headers);
    requestHeaders.set("x-ingenium-path",request.nextUrl.pathname);
    requestHeaders.set("x-ingenium-editor-preview","1");
    const response=NextResponse.next({request:{headers:requestHeaders}});
    const editorParents=["https://portal.ingeniumconsulting.net",process.env.INGENIUM_EDITOR_STAGING_PORTAL_ORIGIN].filter(Boolean);
    response.headers.set("Content-Security-Policy","frame-ancestors "+editorParents.join(" "));
    response.headers.set("Cache-Control","private, no-store");
    response.headers.set("X-Robots-Tag","noindex, nofollow");
    response.headers.set("Referrer-Policy","no-referrer");
    return response;
  }
    const blogPath = request.nextUrl.pathname;
    if (blogPath === "/blog" || blogPath.startsWith("/blog/")) {
      const headers = { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex" };
      if (blogPath.startsWith("/blog/preview/")) { const requestHeaders = new Headers(request.headers); requestHeaders.set("x-ingenium-path", blogPath); const response = NextResponse.next({ request: { headers: requestHeaders } }); Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value)); response.headers.set("Referrer-Policy", "no-referrer"); return response; }
      try {
        const key = process.env.INGENIUM_BLOG_SITE_KEY;
        const origin = process.env.INGENIUM_PORTAL_ORIGIN || "https://portal.ingeniumconsulting.net";
        if (!key || !/^blog_[a-f0-9]{32}$/.test(key)) throw new Error("Blog is not configured");
        const base = `${origin}/api/websites/blog/public/v1/${key}`;
        const manifestResponse = await fetch(`${base}/manifest`, { cache: "no-store", redirect: "error", signal: AbortSignal.timeout(10000) });
        if (manifestResponse.status === 404) return new NextResponse("Blog not found", { status: 404, headers });
        if (!manifestResponse.ok) throw new Error("Blog service unavailable");
        const manifest = await manifestResponse.json();
        if (!manifest.enabled) return new NextResponse("Blog not found", { status: 404, headers });
        const segments = blogPath.split("/").filter(Boolean).slice(1);
        if (segments.length === 1 && !["search", "page", "category", "tag", "author", "feed.xml"].includes(segments[0])) {
          const articleResponse = await fetch(`${base}/posts/${encodeURIComponent(segments[0])}`, { cache: "no-store", redirect: "error", signal: AbortSignal.timeout(10000) });
          if ([404, 410].includes(articleResponse.status)) return new NextResponse("Article not found", { status: articleResponse.status, headers });
          if (!articleResponse.ok) throw new Error("Article service unavailable");
          const article = await articleResponse.json();
          if (article.redirect) return NextResponse.redirect(new URL(article.redirect.path, request.url), 308);
        }
        const requestHeaders = new Headers(request.headers); requestHeaders.set("x-ingenium-path", blogPath); const response = NextResponse.next({ request: { headers: requestHeaders } }); response.headers.set("Cache-Control", "no-store"); return response;
      } catch { return new NextResponse(BLOG_UNAVAILABLE_HTML, { status: 503, headers: { ...headers, "Content-Type": "text/html; charset=utf-8", "Retry-After": "60" } }); }
    }
  if (!managedPath(request.nextUrl.pathname)) return gate;
  const revision = await readSeoRevision(true),
    rule = revision ? seoRedirect(revision.snapshot, request.url) : null;
  if (rule)
    return NextResponse.redirect(
      new URL(rule.target, request.url),
      rule.status,
    );
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-ingenium-path", request.nextUrl.pathname);
  requestHeaders.set("x-ingenium-seo-revision", revision?.id ?? "");
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  if (revision) response.headers.set("x-ingenium-seo-revision", revision.id);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
