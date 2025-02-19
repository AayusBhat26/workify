import { withAuth } from 'next-auth/middleware';
import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
const locales = ['hi', 'en'];
const publicPages = ['/', '/sign-in', '/sign-up'];
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en',
});
const authMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token !== null,
    },
    pages: {
      signIn: '/login',
    },
  },
);
export default function middleware(req: NextRequest) {
  const publicRegex = RegExp(`^(/(${locales.join('|')}))?(${publicPages.join('|')})?/?$`, 'i');
  const isPublic = publicRegex.test(req.nextUrl.pathname);

  if (isPublic) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
