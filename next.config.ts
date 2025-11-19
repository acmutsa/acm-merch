import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.cdn.printful.com",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
