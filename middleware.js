import { NextResponse } from 'next/server';

// Routes that require an authenticated session (session_token cookie)
const protectedApiPaths = [
  '/api/save-progress',
  '/api/save-buildings',
  '/api/load-buildings',
];

// Routes that require admin authentication
const adminPaths = ['/admin', '/api/admin'];

// Public routes that never require authentication
const publicPaths = [
  '/api/auth',
  '/api/paypal',
  '/api/webhooks',
  '/api/bank-transfer',
  '/gdpr',
];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get('session_token')?.value;

  // Allow public routes through unconditionally
  const isPublic = publicPaths.some((p) => pathname.startsWith(p));
  if (isPublic) {
    return NextResponse.next();
  }

  // Admin routes: require session token
  const isAdminPath = adminPaths.some((p) => pathname.startsWith(p));
  if (isAdminPath) {
    if (!sessionToken) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { success: false, error: 'Authentication required' },
          { status: 401 }
        );
      }
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Other protected API routes: require session token
  const isProtected = protectedApiPaths.some((p) => pathname.startsWith(p));
  if (isProtected && !sessionToken) {
    return NextResponse.json(
      { success: false, error: 'Authentication required' },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*',
    '/gdpr/:path*',
  ],
};
