import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const siteId = searchParams.get("siteId");
    const apiKey = searchParams.get("apiKey");
    const blockKey = searchParams.get("blockKey");

    if (!siteId || !apiKey) {
      return NextResponse.json(
        { error: "Missing required params: siteId, apiKey" },
        { status: 400 }
      );
    }

    // Use service role to bypass RLS
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Validate API key
    const { data: site, error: siteError } = await supabase
      .from("website_sites")
      .select("id, api_key")
      .eq("id", siteId)
      .single();

    if (siteError || !site) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }

    if (site.api_key !== apiKey) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 403 });
    }

    // Fetch content blocks
    let query = supabase
      .from("website_content_blocks")
      .select("block_key, label, block_type, content, content_json, section, sort_order")
      .eq("site_id", siteId)
      .eq("is_published", true)
      .order("section")
      .order("sort_order");

    if (blockKey) {
      query = query.eq("block_key", blockKey);
    }

    const { data: blocks, error: blocksError } = await query;

    if (blocksError) {
      return NextResponse.json({ error: blocksError.message }, { status: 500 });
    }

    // If requesting a single block, return it directly
    if (blockKey) {
      return NextResponse.json({ block: blocks?.[0] || null });
    }

    return NextResponse.json({ blocks: blocks || [] });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
