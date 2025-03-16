import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.independent.co.uk",
      },
    ],
  },
};

export default nextConfig;
