import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameLocale = pathname.split("/")[1];

  // English routes
  if (pathnameLocale === "en") {
    return NextResponse.next();
  }

  // Explicit /fa URL
  // /fa      -> /
  // /fa/users -> /users
  if (pathnameLocale === "fa") {
    const url = request.nextUrl.clone();

    const pathnameWithoutLocale = pathname.replace(/^\/fa(?=\/|$)/, "") || "/";

    url.pathname = pathnameWithoutLocale;

    return NextResponse.redirect(url);
  }

  // Everything without a locale belongs to the default locale (fa).
  // Rewrite internally so the browser stays on /...
  const url = request.nextUrl.clone();

  url.pathname = pathname === "/" ? "/fa" : `/fa${pathname}`;

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
