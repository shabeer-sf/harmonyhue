import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ensures files in public are available even with static export
  images: {
    unoptimized: true,
  },
  
  // Output static export
  output: 'export',
};

export default nextConfig;
