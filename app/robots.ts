/** @format */
import { MetadataRoute } from "next"
import { siteConfig } from "@/config/site"

/**
 * 🤖 ROBOTS_PROTOCOL
 * ควบคุมการเข้าถึงของ Crawler และระบุตำแหน่ง Sitemap
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/", // ป้องกันการเก็บข้อมูล API
        "/admin/", // ป้องกันส่วนจัดการ (ถ้ามี)
        "/_next/", // ป้องกันส่วน Internal Next.js
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
