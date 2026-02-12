import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { siteId, formSlug, data, apiKey } = body;

    if (!siteId || !formSlug || !data || !apiKey) {
      return NextResponse.json(
        { error: "Missing required fields: siteId, formSlug, data, apiKey" },
        { status: 400 }
      );
    }

    // Use service role to bypass RLS for public submissions
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Validate API key matches the site
    const { data: site, error: siteError } = await supabase
      .from("website_sites")
      .select("id, account_id, api_key")
      .eq("id", siteId)
      .single();

    if (siteError || !site) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }

    if (site.api_key !== apiKey) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 403 });
    }

    // Look up the form
    const { data: form, error: formError } = await supabase
      .from("website_forms")
      .select("id, is_active, notification_email")
      .eq("site_id", siteId)
      .eq("slug", formSlug)
      .single();

    if (formError || !form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    if (!form.is_active) {
      return NextResponse.json({ error: "Form is not active" }, { status: 400 });
    }

    // Insert submission
    const sourceUrl = req.headers.get("referer") || null;
    const ipAddress = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
    const userAgent = req.headers.get("user-agent") || null;

    const { error: insertError } = await supabase
      .from("website_form_submissions")
      .insert({
        account_id: site.account_id,
        site_id: siteId,
        form_id: form.id,
        data,
        source_url: sourceUrl,
        ip_address: ipAddress,
        user_agent: userAgent,
      });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
