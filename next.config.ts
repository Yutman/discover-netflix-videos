import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
      images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**', // Allow images from any path
      },
    ],
  },
};

export default nextConfig;
