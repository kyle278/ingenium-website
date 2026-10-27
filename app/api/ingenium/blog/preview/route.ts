import { NextResponse } from "next/server";
import { signedBlogRequest } from "@/lib/blog/client";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  const url = new URL(req.url);
  if (url.searchParams.has("exit")) {
    const response = NextResponse.redirect(new URL("/blog", url.origin));
    response.cookies.delete("ingenium-blog-preview");
    return response;
  }
  const code = url.searchParams.get("code");
  if (!code || !/^[A-Za-z0-9_-]{43}$/.test(code))
    return new Response("Invalid preview code.", {
      status: 401,
      headers: {
        "Cache-Control": "private, no-store",
        "X-Robots-Tag": "noindex",
        "Referrer-Policy": "no-referrer",
      },
    });
  try {
    const preview = await signedBlogRequest("exchange", { code });
    if (!preview.session) throw new Error("Session missing");
    const response = NextResponse.redirect(
      new URL(`/blog/preview/${preview.post.id}`, url.origin),
    );
    response.cookies.set("ingenium-blog-preview", preview.session, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: Math.max(
        0,
        Math.floor((Date.parse(preview.expires_at) - Date.now()) / 1000),
      ),
    });
    response.headers.set("Cache-Control", "private, no-store");
    response.headers.set("X-Robots-Tag", "noindex");
    response.headers.set("Referrer-Policy", "no-referrer");
    return response;
  } catch {
    return new Response(
      "This preview has expired, was revoked, or has already been opened. Create a new preview in Ingenium Portal.",
      {
        status: 401,
        headers: {
          "Cache-Control": "private, no-store",
          "X-Robots-Tag": "noindex",
          "Referrer-Policy": "no-referrer",
        },
      },
    );
  }
}
