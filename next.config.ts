import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages.
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
