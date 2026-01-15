import type { NextConfig } from "next";
import createMDX from "@next/mdx";

/* -------------------------------------------------------------------------- */
/*                               Base Config                                  */
/* -------------------------------------------------------------------------- */

const nextConfig: NextConfig = {
  reactStrictMode: true,

  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  serverExternalPackages: ["sharp"],

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        child_process: false,
      };
    }
    return config;
  },
};

/* -------------------------------------------------------------------------- */
/*                                 MDX Wrap                                   */
/* -------------------------------------------------------------------------- */

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: "@mdx-js/react",
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);