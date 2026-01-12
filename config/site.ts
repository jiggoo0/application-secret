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
 * SITE CONFIG — JP VISUAL DOCS
 * DESIGN PRINCIPLE:
 * - จริงจัง / ตรวจสอบได้ / ไม่ขายฝัน
 * - สื่อสารแบบมืออาชีพที่ทำงานหน้างานจริง
 * - ใช้เป็น Single Source of Truth สำหรับ SEO / UI / System Signal
 */
export const siteConfig = {
  // 🏷️ BRAND CORE
  name: 'JP Visual Docs',
  shortName: 'JPVD',
  domain: 'jpvisouldocs.online',
  url: baseUrl,

  // 🎯 BRAND POSITIONING
  description:
    'JP Visual Docs ให้คำปรึกษาและจัดการเอกสารด้านวีซ่าและสินเชื่อ โดยยึดเกณฑ์พิจารณาจริงของหน่วยงานเป็นหลัก วิเคราะห์เคสตรงจุด วางโครงสร้างข้อมูลอย่างมีเหตุผล และควบคุมคุณภาพงานทุกขั้นตอน',

  locale: 'th-TH',
  language: ['th', 'en'] as const,

  // 📦 SERVICE & SHOWCASE
  services,
  showcaseRegistry: ALL_CASES,

  // 👤 AUTHORITY SIGNAL
  author: {
    name: 'เจ้าป่า',
    brand: 'JP Visual Docs',
    role: 'ที่ปรึกษาด้านเอกสารวีซ่าและสินเชื่อ',
    email: 'contact@jpvisouldocs.online',
    contacts: {
      phone: '091-054-0710',
      email: 'contact@jpvisouldocs.online',
    },
  },

  // ⚙️ SYSTEM STATUS (ใช้กับ UI / Footer / Badge)
  system: {
    status: 'ACTIVE',
    label: 'เปิดรับปรึกษาตามปกติ',
    version: '3.3.0',
    indicatorColor: '#FCDE09',
  },

  // 📞 CONTACT
  contact: {
    phone: '091-054-0710',
    phoneFull: '+66910540710',
    lineId: '@462fqtfc',
    lineLink: 'https://lin.ee/ZYTzBaIE',
    email: 'contact@jpvisouldocs.online',
    address: 'กรุงเทพมหานคร, ประเทศไทย',
  },

  // 🌐 SOCIAL
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61575050976562',
    messenger: 'https://m.me/61575050976562',
    line: 'https://lin.ee/ZYTzBaIE',
  },

  // 🔍 SEO / OPEN GRAPH (โทนผู้เชี่ยวชาญ ไม่โอ้อวด)
  seo: {
    titleTemplate: '%s | JP Visual Docs',
    defaultTitle: 'JP Visual Docs – ที่ปรึกษาเอกสารวีซ่าและสินเชื่อ วิเคราะห์เคสตามเกณฑ์จริง',
    description:
      'วิเคราะห์เคสรายบุคคล วางโครงสร้างเอกสารตามเงื่อนไขพิจารณาจริง และดูแลโดยทีมงานที่เชี่ยวชาญงานเอกสารโดยตรง ตรวจสอบได้ทุกขั้นตอน',

    keywords: [
      'ที่ปรึกษาเอกสารวีซ่า',
      'วิเคราะห์เคสวีซ่า',
      'จัดเอกสารวีซ่า',
      'แก้เคสวีซ่าไม่ผ่าน',
      'ที่ปรึกษาสินเชื่อ',
      'จัดเอกสารสินเชื่อ',
      'Visa Consultant Thailand',
      'JP Visual Docs',
    ],

    openGraph: {
      type: 'website',
      locale: 'th_TH',
      url: baseUrl,
      siteName: 'JP Visual Docs',
      title: 'ที่ปรึกษาเอกสารวีซ่าและสินเชื่อ | JP Visual Docs',
      description:
        'บริการวิเคราะห์และจัดการเอกสารโดยยึดเกณฑ์พิจารณาจริง ลดความเสี่ยง และเพิ่มความน่าเชื่อถือของเคส',
      images: [
        {
          url: `${baseUrl}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'JP Visual Docs – Professional Documentation & Visa Consulting',
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
