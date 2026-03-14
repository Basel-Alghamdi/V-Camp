import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const intlMiddleware = createMiddleware({
  locales: ["ar", "en"],
  defaultLocale: "ar",
  localePrefix: "always",
});

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Let next-intl handle locale routing first
  const response = intlMiddleware(request);

  // Extract locale from pathname
  const localeMatch = pathname.match(/^\/(ar|en)(\/|$)/);
  const locale = localeMatch ? localeMatch[1] : "ar";

  // Public paths (with locale prefix)
  const pathWithoutLocale = pathname.replace(/^\/(ar|en)/, "") || "/";
  const PUBLIC_PATHS = ["/", "/login", "/register"];

  if (PUBLIC_PATHS.includes(pathWithoutLocale)) {
    return response;
  }

  // Check for auth token in cookies
  const token = request.cookies.get("op_token")?.value;

  if (!token) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set("from", pathWithoutLocale);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
