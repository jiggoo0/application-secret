// config/site.ts
/** @format */

export const siteConfig = {
  name: "JP Visual Docs",
  description:
    "Professional Visa & Documentation Services with Systematic Process. ยกระดับธุรกิจและเอกสารของคุณสู่มาตรฐานมืออาชีพ",
  domain: "jpvisualdocs.online",
  url: "https://jpvisualdocs.online",

  locale: "th-TH",
  language: ["th", "en"],

  author: {
    name: "เจ้าป่า (JP Visual Docs)",
    email: "contact@jpvisualdocs.online",
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
      "จัดการเอกสาร",
      "เจ้าป่า",
    ],
  },

  social: {
    facebook: "https://www.facebook.com/profile.php?id=61575050976562",
    line: "https://lin.ee/ZYTzBaIE",
    lineId: "@462fqtfc",
    email: "contact@jpvisualdocs.online",
    phone: "0XX-XXX-XXXX",
  },

  links: {
    messenger: "https://m.me/61575050976562",
  },

  actions: {
    primary: {
      href: "/contact",
      label: "ติดต่อเรา",
    },
  },
} as const

export type SiteConfig = typeof siteConfig
