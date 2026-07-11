import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "media.istockphoto.com" },
      { protocol: "https", hostname: "gtmnow.com" },
      { protocol: "https", hostname: "pbs.twimg.com" },
      { protocol: "https", hostname: "allthingslearning.wordpress.com" },
      { protocol: "https", hostname: "media1.giphy.com" },
      { protocol: "https", hostname: "media.giphy.com" },
      { protocol: "https", hostname: "cdn.marvel.com" },
      { protocol: "https", hostname: "media.licdn.com" },
      { protocol: "https", hostname: "i.programmerhumor.io" },
      { protocol: "https", hostname: "media1.tenor.com" },
      { protocol: "https", hostname: "images.squarespace-cdn.com" },
      { protocol: "https", hostname: "cdn.arstechnica.net" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
};

export default nextConfig;
