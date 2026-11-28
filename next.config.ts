import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "media.istockphoto.com" },
      { protocol: "https", hostname: "gtmnow.com" },
      { protocol: "https", hostname: "cdn.arstechnica.net" },
    ],
  },
};

export default nextConfig;
