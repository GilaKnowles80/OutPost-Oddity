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
  images: {
    domains: ['localhost', 'ep-crimson-field-a1tjty5u-pooler.ap-southeast-1.aws.neon.tech'],
  },
}

module.exports = nextConfig;
