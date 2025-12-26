/** @format */

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
  },

  // 📡 SYSTEM STATUS: สำหรับใช้ทำ UI ไฟกะพริบ
  system: {
    status: "SYSTEM_ACTIVE",
    label: "Protocol Online",
    version: "v2.8.5",
    indicatorColor: "bg-green-500",
  },

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
    ] as string[], // ✅ กำหนดเป็น string[] เพื่อให้ Metadata ใน layout.tsx ใช้งานได้โดยตรง
  },

  social: {
    facebook: "https://www.facebook.com/profile.php?id=61575050976562",
    line: "https://lin.ee/ZYTzBaIE",
    lineId: "@462fqtfc",
    email: "contact@jpvisualdocs.online",
    messenger: "https://m.me/61575050976562",
    phone: "091-054-0710", // ✅ เพิ่มฟิลด์ phone เพื่อแก้ Error ในหน้า Contact และ CTA
  },

  assets: {
    ogImage: "/images/og-image.webp",
    favicon: "/favicon.ico",
    appleTouch: "/apple-touch-icon.png",
  },
} as const

export type SiteConfig = typeof siteConfig
