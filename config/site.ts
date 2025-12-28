/** @format */

/**
 * 🛰️ SITE_CONFIGURATION_REGISTRY
 * ----------------------------------------------------------------
 * ศูนย์รวมค่าคงที่ (Global Constants) สำหรับ JP Visual Docs
 * ใช้จัดการ SEO, ข้อมูลติดต่อ, และ Assets ทั้งหมดในจุดเดียว
 * ออกแบบตามหลัก Clean Code เพื่อรองรับ Next.js 15 (App Router)
 */

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://jpvisualdocs.online"

export const siteConfig = {
  // 🏢 BRAND_IDENTITY
  name: "JP Visual Docs",
  shortName: "JPVD",
  description:
    "Professional Visa & Documentation Services with Systematic Process. ยกระดับธุรกิจและเอกสารของคุณสู่มาตรฐานมืออาชีพ",
  domain: "jpvisualdocs.online",
  url: baseUrl,

  // 🌍 LOCALIZATION
  locale: "th-TH",
  language: ["th", "en"],

  // 👤 AUTHOR_&_CREDENTIALS
  author: {
    name: "เจ้าป่า (JP Visual Docs)",
    email: "contact@jpvisualdocs.online",
    role: "Professional Document Architect",
    contacts: {
      phone: "091-054-0710",
      email: "contact@jpvisualdocs.online",
    },
  },

  // 📡 SYSTEM_STATUS: สำหรับการแสดงผลใน Terminal UI
  system: {
    status: "SYSTEM_ACTIVE",
    label: "Protocol Online",
    version: "2.8.5",
    indicatorColor: "bg-green-500",
  },

  // 🛠️ CONTACT_REGISTRY: สำหรับใช้ใน Footer, Contact Page และ CTA
  contact: {
    phone: "091-054-0710",
    phoneFull: "+66910540710",
    lineId: "@462fqtfc",
    email: "contact@jpvisualdocs.online",
    address: "Bangkok, Thailand",
  },

  // 🔍 SEO_PROTOCOL: ปรับแต่งเพื่อ Keyword 'ปั้นเคสวีซ่า' และ 'วางแผนกู้เงิน'
  seo: {
    titleTemplate: "%s | JP Visual Docs",
    defaultTitle:
      "JP Visual Docs | รับจัดการเอกสารวีซ่าและที่ปรึกษาปั้นเคสระดับมือโปร",
    description:
      "บริการปั้นเคสวีซ่า ร่างจดหมายแนะนำตัว และที่ปรึกษาวางแผนกู้เงิน จัดการเอกสารรายได้ให้เป็นระบบโดยมืออาชีพ ประสบการณ์กว่า 8 ปี",
    keywords: [
      "รับทำวีซ่า",
      "ปั้นเคสวีซ่า",
      "ที่ปรึกษาวางแผนกู้เงิน",
      "ร่างจดหมายแนะนำตัว",
      "จัดการเอกสารรายได้",
      "วีซ่าไม่ผ่านทำยังไง",
      "ปรึกษาเคสยาก",
      "เจ้าป่า",
      "JP Visual Docs",
      "Visa Consultant Thailand",
    ] as string[],
  },

  // 🔗 SOCIAL_CONNECTIVITY
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61575050976562",
    line: "https://lin.ee/ZYTzBaIE",
    messenger: "https://m.me/61575050976562",
    phone: "tel:0910540710",
  },

  // 🖼️ ASSET_MANIFEST: เส้นทางไฟล์ทรัพยากร (ตรวจสอบแล้วว่าตรงกับ public folder)
  assets: {
    ogImage: "/images/og-image.webp",
    favicon: "/favicon.ico",
    appleTouch: "/apple-touch-icon.png",
    logoJP: "/images/เจ้าป่า.webp",
    heroBg: "/images/hero/HeroBackground.png",
  },
} as const

// ✅ EXPORT_TYPE: สำหรับใช้งานร่วมกับ TypeScript ทั่วทั้งโปรเจกต์
export type SiteConfig = typeof siteConfig
