/** @type {import('next').NextConfig} */

const securityHeaders = [
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000; includeSubDomains; preload'
    },
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff'
    },
    {
      key: 'X-Frame-Options',
      value: 'SAMEORIGIN'
    },
    {
      key: 'X-XSS-Protection',
      value: '1; mode=block'
    }
  ]
  
  module.exports = {
    reactStrictMode: true,
    assetPrefix: "/",
    async headers() {
      return [
        {
          source: '/:path*',
          headers: securityHeaders,
        },
      ]
    },
    reactStrictMode: true,
    experimental: {
      scrollRestoration: true,
    },
    images: {
      minimumCacheTTL: 60 * 60 * 24, // 1 daydangerouslyAllowSVG: true,
      dangerouslyAllowSVG: true,
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'assets.coingecko.com',
          port: '',
          pathname: '/**',
        },
      ],
    },
    poweredByHeader: false,
  };