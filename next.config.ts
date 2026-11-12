import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const config: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    mdxRs: false,
  },
  async redirects() {
    return [
      { source: "/bulk-events", destination: "/custom-order", permanent: true },
      { source: "/bulk", destination: "/custom-order", permanent: true },
    ];
  },
};

export default withMDX(config);
