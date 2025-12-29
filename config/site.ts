/** @format */

// 🛠️ IMPORT_NODE
import { services } from "@/components/services/serviceData"
import { ALL_CASES } from "./showcase/all-cases"

// 🌐 NETWORK_PROTOCOL: ตรวจสอบให้แน่ใจว่า URL ไม่มี "/" ปิดท้าย
const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://jpvisouldocs.online"

/**
 * 🛰️ SITE_CONFIG_PROTOCOL
 * ✅ ENFORCED: Maximum SEO compatibility & Benefit-driven content
 */
export const siteConfig = {
  name: "JP Visual Docs",
  shortName: "JPVD",
  description:
    "ที่ปรึกษาด้านการจัดการเอกสารและวางแผนวีซ่าครบวงจร ช่วยวิเคราะห์จุดอ่อน ปั้นเคสยากให้ผ่านง่าย และเตรียมความพร้อมเพื่อความสำเร็จระดับสูงสุด",
  domain: "jpvisouldocs.online",
  url: baseUrl,

  locale: "th-TH",
  language: ["th", "en"],

  services,
  showcaseRegistry: ALL_CASES,

  author: {
    name: "เจ้าป่า (JP Visual Docs)",
    email: "contact@jpvisouldocs.online",
    role: "ที่ปรึกษาด้านการวางแผนเอกสารมืออาชีพ",
    contacts: {
      phone: "091-054-0710",
      email: "contact@jpvisouldocs.online",
    },
  },

  // 📟 OPERATIONAL_METADATA
  system: {
    status: "SYSTEM_ACTIVE",
    label: "พร้อมให้บริการ",
    version: "2.9.5",
    indicatorColor: "bg-green-500",
  },

  contact: {
    phone: "091-054-0710",
    phoneFull: "+66910540710",
    lineId: "@462fqtfc",
    lineLink: "https://lin.ee/ZYTzBaIE",
    email: "contact@jpvisouldocs.online",
    address: "Bangkok, Thailand",
  },

  social: {
    facebook: "https://www.facebook.com/profile.php?id=61575050976562",
    messenger: "https://m.me/61575050976562",
    line: "https://lin.ee/ZYTzBaIE",
  },

  // 🔍 SEO_ARCHITECTURE: ยกระดับคะแนนเป็น 100
  seo: {
    titleTemplate: "%s | JP Visual Docs",
    defaultTitle:
      "JP Visual Docs – เตรียมเอกสารวีซ่า ปั้นเคสยากให้ผ่านง่าย และวางแผนเอกสารครบวงจร",
    // 📝 ENFORCED: ความยาว Description ที่เหมาะสม (150-160 ตัวอักษร)
    description:
      "หมดกังวลเรื่องเอกสารไม่ผ่าน! JP Visual Docs ช่วยวิเคราะห์จุดอ่อนของเคส วางแผนการเงิน และจัดเตรียมเอกสารอย่างมืออาชีพ เพื่อเพิ่มโอกาสสำเร็จสูงสุดให้คุณโดยที่ปรึกษาเฉพาะทาง",
    keywords: [
      "ที่ปรึกษาเอกสารวีซ่า",
      "ปั้นเคสวีซ่า",
      "รับเตรียมเอกสารวีซ่า",
      "ที่ปรึกษาวางแผนเอกสาร",
      "ช่วยเตรียมเอกสารกู้เงิน",
      "เขียนจดหมายแนะนำตัววีซ่า",
      "วิเคราะห์เคสวีซ่า",
      "แก้ไขวีซ่าไม่ผ่าน",
      "Visa Consultant Thailand",
      "JP Visual Docs",
      "เจ้าป่า",
    ] as string[],
  },

  // 🖼️ ASSET_REGISTRY
  assets: {
    // ✅ RECOMMENDED: ใช้ .jpg แทน .webp สำหรับ OG Image เพื่อความชัวร์บน Facebook
    ogImage: `${baseUrl}/images/og-image.jpg`,
    favicon: "/favicon.ico",
    appleTouch: "/apple-touch-icon.png",
    logo: "/images/เจ้าป่า.webp",
    // ✅ PERFORMANCE_TIP: รูป Hero ควรมีขนาดไฟล์ไม่เกิน 200KB
    hero: "/images/hero/HeroBackground.png",
    grid: "/grid-pattern.svg",
  },
} as const

export type SiteConfig = typeof siteConfig
