import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ─── Strict Mode ──────────────────────────────────────────────────────────
  reactStrictMode: true,

  // ─── Image Domains ────────────────────────────────────────────────────────
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
    ],
  },

  // ─── Experimental ─────────────────────────────────────────────────────────
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
