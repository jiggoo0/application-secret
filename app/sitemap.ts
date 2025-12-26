/** @format */
import { MetadataRoute } from "next"
import { siteConfig } from "@/config/site"

/**
 * 🛰️ SITEMAP_GENERATOR
 * สร้างดัชนีหน้าเว็บเพื่อให้ Google Search Engine เก็บข้อมูลได้อย่างแม่นยำ
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url

  // 📝 กำหนดประเภทของ Change Frequency ให้ตรงกับ MetadataRoute.Sitemap
  type ChangeFreq =
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never"

  const routes = ["", "/about", "/services", "/contact"].map((route) => {
    // ✅ แก้ไข: กำหนดค่าคงที่แยกออกมาก่อน เพื่อเลี่ยง Error TS1355
    const freq: ChangeFreq = route === "" ? "daily" : "weekly"

    return {
      url: `${baseUrl}${route}`,
      // ✅ แก้ไข: Next.js Sitemap แนะนำให้ใช้ Date Object แทน ISO String
      lastModified: new Date(),
      changeFrequency: freq,
      priority: route === "" ? 1.0 : 0.8,
    }
  })

  return routes
}
