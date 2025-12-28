/** @format */

/**
 * 🛰️ SITE_CONFIGURATION_REGISTRY
 * ----------------------------------------------------------------
 * Global Constants สำหรับ JP Visual Docs
 * รองรับ Next.js 15 (App Router) + Metadata API
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

  // 📡 SYSTEM_STATUS
  system: {
    status: "SYSTEM_ACTIVE",
    label: "Protocol Online",
    version: "2.8.5",
    indicatorColor: "bg-green-500",
  },

  // 🛠️ CONTACT_REGISTRY
  contact: {
    phone: "091-054-0710",
    phoneFull: "+66910540710",
    lineId: "@462fqtfc",
    email: "contact@jpvisualdocs.online",
    address: "Bangkok, Thailand",
  },

  // 🔍 SEO_PROTOCOL (รองรับ Next.js Metadata)
  seo: {
    titleTemplate: "%s | JP Visual Docs",
    defaultTitle:
      "JP Visual Docs – ที่ปรึกษาเอกสารวีซ่า ปั้นเคส และวางแผนการเงิน",
    description:
      "JP Visual Docs ให้บริการที่ปรึกษาเอกสารวีซ่า ปั้นเคสยาก จัดทำจดหมายแนะนำตัว และวางแผนเอกสารการเงิน โดยผู้เชี่ยวชาญประสบการณ์กว่า 8 ปี",
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
    ],

    openGraph: {
      type: "website",
      locale: "th_TH",
      url: baseUrl,
      siteName: "JP Visual Docs",
      title: "JP Visual Docs – ที่ปรึกษาเอกสารวีซ่า ปั้นเคส และวางแผนการเงิน",
      description:
        "บริการที่ปรึกษาเอกสารวีซ่า ปั้นเคสยาก และจัดระบบเอกสารการเงินอย่างเป็นระบบ",
      images: [
        {
          url: "/images/og-image.webp",
          width: 1200,
          height: 630,
          alt: "JP Visual Docs – Visa & Documentation Consultant",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: "JP Visual Docs – ที่ปรึกษาเอกสารวีซ่า ปั้นเคส และวางแผนการเงิน",
      description: "ที่ปรึกษาเอกสารวีซ่าและการเงิน จัดการเคสยากอย่างเป็นระบบ",
      images: ["/images/og-image.webp"],
    },
  },

  // 🔗 SOCIAL_CONNECTIVITY
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61575050976562",
    line: "https://lin.ee/ZYTzBaIE",
    messenger: "https://m.me/61575050976562",
    phone: "tel:0910540710",
  },

  // 🖼️ ASSET_MANIFEST
  assets: {
    ogImage: "/images/og-image.webp",
    favicon: "/favicon.ico",
    appleTouch: "/apple-touch-icon.png",
    logoJP: "/images/เจ้าป่า.webp",
    heroBg: "/images/hero/HeroBackground.png",
  },
} as const

export type SiteConfig = typeof siteConfig
