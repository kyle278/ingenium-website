import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("sb-access-token")?.value;
    const refreshToken = cookieStore.get("sb-refresh-token")?.value;

    if (!accessToken || !refreshToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false } }
    );

    await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    const body = await req.json();
    const { siteId } = body;

    if (!siteId) {
      return NextResponse.json({ error: "Missing siteId" }, { status: 400 });
    }

    // Fetch the site's deploy hook
    const { data: site, error: siteError } = await supabase
      .from("website_sites")
      .select("vercel_deploy_hook")
      .eq("id", siteId)
      .single();

    if (siteError || !site) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }

    if (!site.vercel_deploy_hook) {
      return NextResponse.json({ success: true, revalidated: false, message: "No deploy hook configured" });
    }

    // Trigger Vercel revalidation
    const hookResponse = await fetch(site.vercel_deploy_hook, { method: "POST" });

    if (!hookResponse.ok) {
      return NextResponse.json(
        { error: "Failed to trigger revalidation" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, revalidated: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
