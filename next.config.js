/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.paypal.com https://www.paypalobjects.com https://js.paypal.com https://www.sandbox.paypal.com",
              "media-src 'self' https://www.soundhelix.com https://tee.express.magiclabs.com",
              "connect-src 'self' https://www.paypal.com https://www.paypalobjects.com https://api.sandbox.paypal.com https://api-m.paypal.com https://tee.express.magiclabs.com https://ep-crimson-field-a1tjty5u-pooler.ap-southeast-1.aws.neon.tech wss://ep-crimson-field-a1tjty5u-pooler.ap-southeast-1.aws.neon.tech",
              "img-src 'self' data: https://www.paypal.com https://www.paypalobjects.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "frame-src 'self' https://www.paypal.com https://www.sandbox.paypal.com",
            ].join('; '),
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
  images: {
    domains: ['localhost', 'ep-crimson-field-a1tjty5u-pooler.ap-southeast-1.aws.neon.tech'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig;
