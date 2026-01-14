import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  /* --- Core Settings --- */
  reactStrictMode: true,

  /* --- Image Optimization --- */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    formats: ["image/avif", "image/webp"],
  },

  /* --- Experimental Features (Next.js 15) --- */
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },

  /* --- MDX Support --- */
  // อนุญาตให้หน้าเว็บรองรับนามสกุลไฟล์ที่หลากหลาย
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  /* --- Optimization --- */
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  /* --- External Packages --- */
  serverExternalPackages: ["sharp"],
};

// ตั้งค่า MDX Plugins (ถ้ามีในอนาคต เช่น remarkGfm)
const withMDX = createMDX({
  // options: {
  //   remarkPlugins: [],
  //   rehypePlugins: [],
  // },
});

// ส่งออก Config ที่ถูก Wrap ด้วย withMDX
export default withMDX(nextConfig);
