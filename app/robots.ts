/** @format */

import { MetadataRoute } from "next"
import { siteConfig } from "@/config/site"

/**
 * 🤖 ROBOTS_PROTOCOL
 * ควบคุมการเข้าถึงของ Search Engine + ระบุ Sitemap
 * รองรับ Next.js App Router
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/", "/actions/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
