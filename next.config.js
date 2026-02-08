/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '**', // Allow any HTTPS images
      },
    ],
    // Keep local images optimized, but allow unoptimized for remote URLs
    // This prevents 404 errors from breaking the page
    // Keep local images optimized, but allow unoptimized for remote URLs
    // This prevents 404 errors from breaking the page
    // unoptimized: true, // Revert to unoptimized since Unsplash URLs are broken (404)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Enable compression
  compress: true,
  // Optimize production builds
  poweredByHeader: false,
  reactStrictMode: true,
  env: {
    NEXTAUTH_URL: 'http://localhost:3001',
    NEXTAUTH_SECRET: 'change-me-secret-key-2024-minimum-32-characters-required-for-nextauth',
  },
}

module.exports = nextConfig


