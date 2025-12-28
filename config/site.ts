/** @format */

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://jpvisouldocs.online"

export const siteConfig = {
  name: "JP Visual Docs",
  shortName: "JPVD",
  description:
    "Professional Visa & Documentation Services with Systematic Process. ยกระดับธุรกิจและเอกสารของคุณสู่มาตรฐานมืออาชีพ",
  domain: "jpvisouldocs.online",
  url: baseUrl,

  locale: "th-TH",
  language: ["th", "en"],

  author: {
    name: "เจ้าป่า (JP Visual Docs)",
    email: "contact@jpvisouldocs.online",
    role: "Professional Document Architect",
    contacts: {
      phone: "091-054-0710",
      email: "contact@jpvisouldocs.online",
    },
  },

  // ✅ ต้องมี (ใช้ทั้งระบบ)
  system: {
    status: "SYSTEM_ACTIVE",
    label: "Protocol Online",
    version: "2.8.5",
    indicatorColor: "bg-green-500",
  },

  // ✅ ต้องมี
  contact: {
    phone: "091-054-0710",
    phoneFull: "+66910540710",
    lineId: "@462fqtfc",
    email: "contact@jpvisouldocs.online",
    address: "Bangkok, Thailand",
  },

  // ✅ ต้องมี
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61575050976562",
    line: "https://lin.ee/ZYTzBaIE",
    messenger: "https://m.me/61575050976562",
    phone: "tel:0910540710",
  },

  seo: {
    titleTemplate: "%s | JP Visual Docs",
    defaultTitle:
      "JP Visual Docs – ที่ปรึกษาเอกสารวีซ่า ปั้นเคส และวางแผนการเงิน",
    description:
      "JP Visual Docs ให้บริการที่ปรึกษาเอกสารวีซ่า ปั้นเคสยาก และวางแผนเอกสารการเงิน",

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

  assets: {
    ogImage: `${baseUrl}/images/og-image.webp`,
    favicon: "/favicon.ico",
    appleTouch: "/apple-touch-icon.png",
    logoJP: "/images/เจ้าป่า.webp",
    heroBg: "/images/hero/HeroBackground.png",
  },
} as const

export type SiteConfig = typeof siteConfig