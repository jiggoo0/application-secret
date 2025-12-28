/** @format */

// 🛠️ IMPORT_NODE: นำเข้าข้อมูลโมดูลาร์
import { services } from "@/components/services/serviceData"
import { showcaseRegistry } from "./showcase"

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://jpvisouldocs.online"

/**
 * 🛰️ SITE_CONFIG_PROTOCOL
 * แหล่งรวมข้อมูลพื้นฐานทั้งหมดของระบบ (Central Information Hub)
 * ออกแบบมาเพื่อรองรับการขยายตัวแบบ Modular
 */
export const siteConfig = {
  name: "JP Visual Docs",
  shortName: "JPVD",
  description:
    "Professional Visa & Documentation Services with Systematic Process. ยกระดับธุรกิจและเอกสารของคุณสู่มาตรฐานมืออาชีพ",
  domain: "jpvisouldocs.online",
  url: baseUrl,

  locale: "th-TH",
  language: ["th", "en"],

  // 🔗 MODULAR_REGISTRY: เชื่อมต่อข้อมูลผลงานและบริการ
  services,
  showcaseRegistry,

  author: {
    name: "เจ้าป่า (JP Visual Docs)",
    email: "contact@jpvisouldocs.online",
    role: "Professional Document Architect",
    contacts: {
      phone: "091-054-0710",
      email: "contact@jpvisouldocs.online",
    },
  },

  // 📟 OPERATIONAL_METADATA: ข้อมูลสถานะระบบสำหรับ UI
  system: {
    status: "SYSTEM_ACTIVE",
    label: "Protocol Online",
    version: "2.9.5",
    indicatorColor: "bg-green-500",
  },

  // 📞 COMMUNICATIONS_NODE: ข้อมูลการติดต่อหลัก
  contact: {
    phone: "091-054-0710",
    phoneFull: "+66910540710",
    lineId: "@462fqtfc",
    lineLink: "https://lin.ee/ZYTzBaIE",
    email: "contact@jpvisouldocs.online",
    address: "Bangkok, Thailand",
  },

  // 🌐 SOCIAL_CONNECTIVITY: ลิงก์ช่องทางโซเชียล
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61575050976562",
    messenger: "https://m.me/61575050976562",
    line: "https://lin.ee/ZYTzBaIE",
  },

  // 🔍 SEO_ARCHITECTURE: โครงสร้างสำหรับการทำอันดับบน Google
  seo: {
    titleTemplate: "%s | JP Visual Docs",
    defaultTitle:
      "JP Visual Docs – ที่ปรึกษาเอกสารวีซ่า และการวางแผนเอกสารระดับพรีเมียม",
    description:
      "JP Visual Docs ให้บริการที่ปรึกษาเอกสารวีซ่า ปั้นเคสยาก และวางแผนเอกสารการเงินเพื่อความสำเร็จระดับสูงสุด",
    keywords: [
      "ที่ปรึกษาเอกสารวีซ่า",
      "ปั้นเคสวีซ่า",
      "รับจัดการเอกสารวีซ่า",
      "ที่ปรึกษาวางแผนการเงิน",
      "เอกสารกู้เงิน",
      "จดหมายแนะนำตัววีซ่า",
      "เคสวีซ่ายาก",
      "Visa Consultant Thailand",
      "JP Visual Docs",
      "เจ้าป่า",
    ] as string[],
  },

  // 🖼️ ASSET_REGISTRY: แหล่งเก็บทรัพยากรรูปภาพ
  assets: {
    ogImage: `${baseUrl}/images/og-image.webp`,
    favicon: "/favicon.ico",
    appleTouch: "/apple-touch-icon.png",
    logo: "/images/เจ้าป่า.webp",
    hero: "/images/hero/HeroBackground.png",
    grid: "/grid-pattern.svg",
  },
} as const

// 🏗️ TYPE_EXPORT: ส่งออกประเภทข้อมูลเพื่อใช้ใน TypeScript ทั่วทั้งโปรเจกต์
export type SiteConfig = typeof siteConfig
