import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();


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
  }
};

export default withNextIntl(nextConfig);