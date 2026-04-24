import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Triggering new build to reflect environment variable changes
  serverExternalPackages: ["bcryptjs"],
};

export default nextConfig;
