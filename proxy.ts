import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const APEX_HOST = "ingeniumconsulting.net";
const CANONICAL_HOST = "www.ingeniumconsulting.net";

export function proxy(request: NextRequest) {
  if (request.nextUrl.hostname !== APEX_HOST) {
    return NextResponse.next();
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.hostname = CANONICAL_HOST;
  redirectUrl.protocol = "https:";

  return NextResponse.redirect(redirectUrl, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
