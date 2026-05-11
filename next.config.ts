import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rise-atseven.transforms.svdcdn.com",
        pathname: "/production/**",
      },
    ],
  },
};

export default nextConfig;
