/** @format */

/**
 * 🛰️ SITE_CONFIGURATION_REGISTRY
 * ----------------------------------------------------------------
 * ศูนย์รวมค่าคงที่ (Global Constants) สำหรับ JP Visual Docs
 * ใช้สำหรับจัดการ SEO, ข้อมูลติดต่อ และสถานะระบบในจุดเดียว
 */
export const siteConfig = {
  name: "JP Visual Docs",
  shortName: "JPVD",
  description:
    "Professional Visa & Documentation Services with Systematic Process. ยกระดับธุรกิจและเอกสารของคุณสู่มาตรฐานมืออาชีพ",
  domain: "jpvisualdocs.online",
  url: "https://jpvisualdocs.online",
  ogImage: "https://jpvisualdocs.online/images/og-image.webp",

  locale: "th-TH",
  language: ["th", "en"],

  author: {
    name: "เจ้าป่า (JP Visual Docs)",
    email: "contact@jpvisualdocs.online",
    role: "Professional Document Architect",
    // 🛡️ PROTOCOL_NAV: รองรับการเรียกใช้ใน Contact/CTA Components
    contacts: {
      phone: "091-054-0710",
      email: "contact@jpvisualdocs.online",
    },
  },

  // 📡 SYSTEM_STATUS: สำหรับแสดงผลใน UI สไตล์ Industrial Sharp (Terminal)
  system: {
    status: "SYSTEM_ACTIVE",
    label: "Protocol Online",
    version: "2.8.5",
    indicatorColor: "bg-green-500",
  },

  // 🛠️ CONTACT_REGISTRY: ศูนย์รวมข้อมูลติดต่อหลัก
  contact: {
    phone: "091-054-0710",
    lineId: "@462fqtfc",
    email: "contact@jpvisualdocs.online",
  },

  // 🔍 SEO_PROTOCOL: จัดการเรื่อง Search Engine Optimization
  seo: {
    titleTemplate: "%s | JP Visual Docs",
    defaultTitle:
      "JP Visual Docs | รับจัดการเอกสารวีซ่าและที่ปรึกษาปั้นเคสระดับมือโปร",
    description:
      "บริการจัดการเอกสารวีซ่า ร่างจดหมายสำคัญ และที่ปรึกษาปั้นเคสกู้เงิน จัดการทุกความยากให้เป็นระบบด้วยประสบการณ์กว่า 8 ปี",
    keywords: [
      "รับทำวีซ่า",
      "ร่างจดหมายแนะนำตัว",
      "จองตั๋วเครื่องบินยื่นวีซ่า",
      "ที่ปรึกษาวางแผนกู้เงิน",
      "แก้ปัญหาเอกสารไม่ผ่าน",
      "ปั้นเคสวีซ่า",
      "จัดการเอกสารรายได้",
      "วีซ่าไม่ผ่านทำยังไง",
      "ปรึกษาเคสยาก",
      "เจ้าป่า",
    ] as string[],
  },

  // 🔗 SOCIAL_CONNECTIVITY: ลิงก์สำหรับช่องทาง Social Media
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61575050976562",
    line: "https://lin.ee/ZYTzBaIE",
    messenger: "https://m.me/61575050976562",
    phone: "091-054-0710",
  },

  // 🖼️ ASSET_MANIFEST: เส้นทางไฟล์ทรัพยากรหลัก
  assets: {
    ogImage: "/images/og-image.webp",
    favicon: "/favicon.ico",
    appleTouch: "/apple-touch-icon.png",
  },
} as const

// ✅ EXPORT_TYPE: สำหรับใช้งานร่วมกับ TypeScript ทั่วทั้งโปรเจกต์
export type SiteConfig = typeof siteConfig
