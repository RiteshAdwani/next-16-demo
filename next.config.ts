import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  experimental:{
    mcpServer: true,
  }
};

export default nextConfig;
