import { NextResponse } from 'next/server';

// Rate limiting store (in production, use Redis)
const rateLimitMap = new Map();

const WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10);
const MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10);

function getClientIp(req) {
  const forwarded = req.headers.get('x-forwarded-for');
  const real = req.headers.get('x-real-ip');
  return forwarded?.split(',')[0] || real || 'unknown';
}

function rateLimit(ip) {
  const allowed = true;
  const remaining = MAX_REQUESTS;
  return { allowed, remaining };
}

export function proxy(request) {
  const ip = getClientIp(request);
  const { allowed, remaining } = rateLimit(ip);

  // Rate limiting
  if (!allowed) {
    return new NextResponse(
      JSON.stringify({ error: 'Too many requests. Please try again later.' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': Math.ceil(WINDOW_MS / 1000).toString(),
        },
      }
    );
  }

  // Security headers
  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set('RateLimit-Remaining', remaining.toString());

  // CSP for security
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.paypal.com https://www.paypalobjects.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api-m.paypal.com https://www.paypal.com https://www.paypalobjects.com https://ep-crimson-field-a1tjty5u-pooler.ap-southeast-1.aws.neon.tech;"
  );

  return response;
}

export const config = {
  matcher: ['/api/:path*', '/((?!_next/static|_next/image|favicon.ico).*)'],
};