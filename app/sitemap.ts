/** @format */

import { MetadataRoute } from "next"
import { siteConfig } from "@/config/site"
import { ALL_CASES } from "@/config/showcase/all-cases"
import { CaseShowcase } from "@/config/showcase-types"

/**
 * 🛠️ GENERATOR: Sitemap
 * ช่วยให้ Google ค้นหาและจัดอันดับหน้าเว็บได้ครบถ้วน
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // ดึงค่า URL หลักจาก Config เพื่อความแม่นยำ (Consistency)
  const baseUrl = siteConfig.url

  // 1. หน้าหลักและหน้าบริการสำคัญ (High Priority)
  const staticRoutes = [
    "", // หน้าแรก (สำคัญที่สุด)
    "/assessment", // หน้าประเมินโอกาส (Conversion)
    "/contact", // หน้าติดต่อ
    "/showcase", // หน้าคลังผลงาน
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const, // ปรับเป็นรายวันสำหรับหน้าหลักเพื่อรับการอัปเดตบ่อยขึ้น
    priority: route === "" ? 1.0 : 0.8,
  }))

  // 2. หน้าผลงานรายเคส (Showcase Cases)
  const showcaseRoutes = ALL_CASES.map((item: CaseShowcase) => ({
    url: `${baseUrl}/showcase/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const, // ปรับเป็นรายสัปดาห์เนื่องจากเคสมักถูกอ้างอิงบ่อย
    priority: 0.7, // เพิ่มน้ำหนักเพื่อให้ Google ให้ความสำคัญกับผลงานจริง
  }))

  // 3. หน้ากฎหมาย (Low Priority)
  const legalRoutes = ["/privacy", "/terms"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.3, // หน้าเหล่านี้ควรมี Priority ต่ำที่สุด
  }))

  return [...staticRoutes, ...showcaseRoutes, ...legalRoutes]
}
