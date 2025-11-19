// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "files.cdn.printful.com" },
      { protocol: "https", hostname: "images.printful.com" },
      { protocol: "https", hostname: "cdn.printful.com" },
    ],
  },
};

export default nextConfig;
