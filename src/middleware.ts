import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale
});

const protectedRoutes = ['/dashboard', '/profile'];
const publicRoutes = ['/login', '/register'];

export default async function middleware(req: NextRequest) {
  const response = intlMiddleware(req);
  const locale = req.nextUrl.pathname.split('/')[1];

  const token = req.cookies.get('accessToken')?.value;
  const pathname = req.nextUrl.pathname;

  const isPublic = publicRoutes.some((route) => pathname.startsWith(route) || pathname.includes(`/${locale}${route}`));
  if (isPublic && token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route) || pathname.includes(`/${locale}${route}`)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/',
    '/(ar|en)/:path*' // نفس الـ i18n matcher
  ]
};
