import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { blogConfig, getBlogManifest } from "@/lib/blog/client";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  try {
    const raw = await req.text();
    if (raw.length > 100000)
      return NextResponse.json({ error: "Event too large" }, { status: 413 });
    const config = blogConfig(),
      timestamp = req.headers.get("x-ingenium-timestamp") || "",
      signature = req.headers.get("x-ingenium-signature") || "";
    if (
      !config.secret ||
      !/^\d+$/.test(timestamp) ||
      Math.abs(Date.now() - Number(timestamp)) > 300000 ||
      !/^[a-f0-9]{64}$/.test(signature)
    )
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    const expected = createHmac("sha256", config.secret)
      .update(`${timestamp}.${raw}`)
      .digest();
    if (!timingSafeEqual(expected, Buffer.from(signature, "hex")))
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    const event = JSON.parse(raw);
    if (
      event.type !== "blog.release" ||
      event.api_version !== 1 ||
      event.site_key !== config.key ||
      event.environment !==
        (process.env.INGENIUM_BLOG_ENVIRONMENT || "production") ||
      !Number.isSafeInteger(event.generation) ||
      !Array.isArray(event.paths)
    )
      return NextResponse.json(
        { error: "Invalid Blog event identity" },
        { status: 422 },
      );
    const manifest = await getBlogManifest();
    if (manifest.generation !== event.generation)
      return NextResponse.json(
        {
          error: "Release was superseded or is not current",
          generation: manifest.generation,
        },
        { status: 409 },
      );
    // Current content and generation are read from the durable Portal on every request.
    // There is no local mutable pointer that an old retry could regress.
    for (const path of event.paths)
      if (
        typeof path === "string" &&
        (path === manifest.base_path ||
          path.startsWith(manifest.base_path + "/"))
      )
        revalidatePath(path);
    revalidatePath("/blog", "layout");
    revalidatePath("/sitemap.xml");
    revalidatePath("/blog/feed.xml");
    return NextResponse.json(
      {
        site_key: config.key,
        release_id: event.release_id,
        generation: manifest.generation,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { error: "Blog refresh is temporarily unavailable" },
      { status: 503 },
    );
  }
}
