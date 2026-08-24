import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  // Allow using <img> tags with external URLs in the demo (we use standard img tags for simplicity)
  // In production, use next/image for all images
};

export default nextConfig;
