import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const APEX_HOST = "ingeniumconsulting.net";
const CANONICAL_HOST = "www.ingeniumconsulting.net";
const WEBSITE_BRIEF_COOKIE = "ingenium-brief-access";
const WEBSITE_BRIEF_PATH = "/website-brief";

function isWebsiteBriefPath(pathname: string) {
  return pathname === WEBSITE_BRIEF_PATH || pathname.startsWith(`${WEBSITE_BRIEF_PATH}/`);
}

export function proxy(request: NextRequest) {
  if (request.nextUrl.hostname !== APEX_HOST) {
    const websiteBriefToken = process.env.WEBSITE_BRIEF_ACCESS_TOKEN?.trim();
    const isDevelopment = process.env.NODE_ENV !== "production";

    if (!isWebsiteBriefPath(request.nextUrl.pathname)) {
      return NextResponse.next();
    }

    if (!websiteBriefToken) {
      return isDevelopment ? NextResponse.next() : new NextResponse(null, { status: 404 });
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

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
