import { NextRequest, NextResponse } from "next/server";

import { handlePortalFormSubmit } from "@/app/api/portal/_lib/formSubmit";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export const runtime = "nodejs";

export async function POST(req: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  const result = await handlePortalFormSubmit(req, { routeSlug: slug });
  return NextResponse.json(result.body, { status: result.status });
}
