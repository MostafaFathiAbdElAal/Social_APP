import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  experimental: {
    typedEnv: true
  },
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: "linked-posts.routemisr.com"
    }]
  }
};

export default nextConfig;
