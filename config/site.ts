/** @format */

// 🛠️ IMPORT
import { services } from '@/components/services/serviceData'
import { ALL_CASES } from '@/config/showcase/all-cases'

// 🌐 BASE URL (LOCKED – no trailing slash)
const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://jpvisouldocs.online').replace(
  /\/$/,
  '',
)

/**
 * SITE CONFIG
 * POSITIONING:
 * - ทางการระดับที่ปรึกษา / องค์กร
 * - ขายแบบมีเหตุผล (Authority-driven)
 * - ควบคุม Facebook OG + Google Search พร้อมกัน
 */
export const siteConfig = {
  // 🏷️ BRAND CORE
  name: 'JP Visual Docs',
  shortName: 'JPVD',
  domain: 'jpvisouldocs.online',
  url: baseUrl,

  // 🎯 BRAND MESSAGE (OG / META FIRST)
  description:
    'JP Visual Docs ให้บริการวิเคราะห์โปรไฟล์และจัดการเอกสารด้านวีซ่า สินเชื่อ และเอกสารสำคัญ โดยผู้เชี่ยวชาญเฉพาะทาง วางแผนอย่างเป็นระบบ ตรวจสอบตามเงื่อนไขจริง และดูแลทุกขั้นตอนอย่างเป็นทางการ เพื่อเพิ่มโอกาสผ่านการพิจารณาอย่างมีเหตุผล',

  locale: 'th-TH',
  language: ['th', 'en'],

  // 📦 SERVICE CONTROL
  services,
  showcaseRegistry: ALL_CASES,

  // 👤 AUTHORITY SIGNAL
  author: {
    name: 'เจ้าป่า (JP Visual Docs)',
    role: 'Visa, Credit & Documentation Strategy Consultant',
    email: 'contact@jpvisouldocs.online',
    contacts: {
      phone: '091-054-0710',
      email: 'contact@jpvisouldocs.online',
    },
  },

  // ⚙️ OPERATION STATUS
  system: {
    status: 'ACTIVE',
    label: 'ให้คำปรึกษาอย่างเป็นทางการ',
    version: '3.3.0',
    indicatorColor: 'bg-[#FCDE09]',
  },

  // 📞 CONTACT
  contact: {
    phone: '091-054-0710',
    phoneFull: '+66910540710',
    lineId: '@462fqtfc',
    lineLink: 'https://lin.ee/ZYTzBaIE',
    email: 'contact@jpvisouldocs.online',
    address: 'Bangkok, Thailand',
  },

  // 🌐 SOCIAL
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61575050976562',
    messenger: 'https://m.me/61575050976562',
    line: 'https://lin.ee/ZYTzBaIE',
  },

  // 🔍 SEO + OPEN GRAPH
  seo: {
    titleTemplate: '%s | JP Visual Docs',
    defaultTitle: 'JP Visual Docs – วิเคราะห์โปรไฟล์ จัดการเอกสาร และวางแผนการยื่นอย่างเป็นระบบ',
    description:
      'ศูนย์ให้คำปรึกษาด้านเอกสารวีซ่า สินเชื่อ และเอกสารสำคัญ วิเคราะห์เชิงลึก วางโครงสร้างเอกสารตามเงื่อนไขจริง และดูแลกระบวนการอย่างเป็นทางการ เหมาะสำหรับผู้ต้องการความแม่นยำและความน่าเชื่อถือ',

    keywords: [
      'ที่ปรึกษาเอกสารวีซ่า',
      'วิเคราะห์โปรไฟล์วีซ่า',
      'จัดเอกสารวีซ่า',
      'แก้เคสวีซ่าไม่ผ่าน',
      'ที่ปรึกษาสินเชื่อ',
      'จัดเอกสารสินเชื่อ',
      'เขียน Cover Letter วีซ่า',
      'Visa Consultant Thailand',
      'JP Visual Docs',
    ] as string[],

    openGraph: {
      type: 'website',
      locale: 'th_TH',
      url: baseUrl,
      siteName: 'JP Visual Docs',
      title: 'บริการเอกสาร วีซ่า และสินเชื่อครบวงจร | JP Visual Docs',
      description:
        'วิเคราะห์โปรไฟล์อย่างเป็นระบบ จัดการเอกสารตามเงื่อนไขจริง และดูแลโดยผู้เชี่ยวชาญเฉพาะทาง เหมาะสำหรับผู้ที่ต้องการความแม่นยำ ความเป็นทางการ และผลลัพธ์ที่ตรวจสอบได้',
      images: [
        {
          url: `${baseUrl}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'JP Visual Docs – Professional Visa & Documentation Services',
        },
      ],
    },
  },

  // 🖼️ ASSETS
  assets: {
    ogImage: `${baseUrl}/images/og-image.jpg`,
    favicon: '/favicon.ico',
    appleTouch: '/apple-touch-icon.png',
    logo: '/images/Logo.webp',
    hero: '/images/hero/HeroBackground.png',
    grid: '/grid-pattern.svg',
  },
} as const

export type SiteConfig = typeof siteConfig
