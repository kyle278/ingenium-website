import { NextRequest, NextResponse } from "next/server";

import { handlePortalFormSubmit } from "@/app/api/portal/_lib/formSubmit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const result = await handlePortalFormSubmit(req);
  return NextResponse.json(result.body, { status: result.status });
}
