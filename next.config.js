/** @type {import('next').NextConfig} */

// Security headers configuration
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.jsdelivr.net;
      style-src 'self' 'unsafe-inline' cdn.jsdelivr.net;
      img-src 'self' data: images.unsplash.com plus.unsplash.com;
      font-src 'self' data:;
      connect-src 'self';
      frame-ancestors 'none';
      form-action 'self';
    `.replace(/\s+/g, ' ').trim()
  }
];

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'plus.unsplash.com'
    ],
    // Optimize image loading
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60,
  },
  experimental: {
    optimizeCss: true,
    // Optimize packages
    optimizePackageImports: [
      '@mui/icons-material',
      '@mui/material',
      'date-fns',
      'lodash'
    ]
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Optimize bundle size
  poweredByHeader: false,
  compress: true,
  // Enable webpack optimization
  webpack: (config, { dev, isServer }) => {
    // Optimize CSS
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups.styles = {
        name: 'styles',
        test: /\.css$/,
        chunks: 'all',
        enforce: true
      };
    }
    return config;
  },
  // Add security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  }
};

module.exports = nextConfig;
