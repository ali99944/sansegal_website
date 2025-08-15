import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
        {
            protocol: "https",
            hostname: "images.unsplash.com",
        },
        {
            protocol: "http",
            hostname: "*",
        },
    ]
  },
};

export default nextConfig;
