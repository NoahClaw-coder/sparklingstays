import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { REDIRECT_MAP } from './lib/redirect-map';

const intlMiddleware = createMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'always',
});

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Normalize: strip trailing slash (except root)
  const normalized = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;

  // Check redirect map (O(1) lookup)
  const destination = REDIRECT_MAP[normalized];
  if (destination) {
    const url = request.nextUrl.clone();
    url.pathname = destination;
    url.search = ''; // drop old query strings
    return NextResponse.redirect(url, { status: 301 });
  }

  // Pass through to next-intl middleware for locale routing
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all paths except static files, _next, and API routes
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:ico|png|jpg|jpeg|gif|svg|webp|css|js|woff2?|ttf|eot)).*)',
  ],
};
