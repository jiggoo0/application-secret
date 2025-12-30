/** @format */

// 🛠️ IMPORT_NODE
import { services } from '@/components/services/serviceData'
import { ALL_CASES } from './showcase/all-cases'

// 🌐 NETWORK_PROTOCOL: ตรวจสอบให้แน่ใจว่า URL ไม่มี "/" ปิดท้าย
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://jpvisouldocs.online'

/**
 * 🛰️ SITE_CONFIG_PROTOCOL
 * ✅ ENFORCED: Unified Inquiry & Assessment Architecture
 * VERSION: 3.3.0 (Unified Edition)
 */
export const siteConfig = {
  name: 'JP Visual Docs',
  shortName: 'JPVD',
  description:
    'ศูนย์วิเคราะห์และจัดการเอกสารครบวงจร บริการประเมินโอกาสสำเร็จเบื้องต้น ปรับจูนโปรไฟล์ และวางแผนวีซ่าอย่างเป็นระบบเพื่อให้ได้ผลลัพธ์ที่ดีที่สุด',
  domain: 'jpvisouldocs.online',
  url: baseUrl,

  locale: 'th-TH',
  language: ['th', 'en'],

  services,
  showcaseRegistry: ALL_CASES,

  author: {
    name: 'เจ้าป่า (JP Visual Docs)',
    email: 'contact@jpvisouldocs.online',
    role: 'Technical Document & Visa Strategist',
    contacts: {
      phone: '091-054-0710',
      email: 'contact@jpvisouldocs.online',
    },
  },

  // 📟 OPERATIONAL_METADATA
  system: {
    status: 'SYSTEM_ACTIVE',
    label: 'READY_FOR_ASSESSMENT',
    version: '3.3.0',
    indicatorColor: 'bg-[#FCDE09]', // เปลี่ยนเป็นสีแบรนด์เหลืองเพื่อให้เข้าธีมใหม่
  },

  contact: {
    phone: '012-345-67890',
    phoneFull: '+6634567890',
    lineId: '@462fqtfc',
    lineLink: 'https://lin.ee/ZYTzBaIE',
    email: 'contact@jpvisouldocs.online',
    address: 'Bangkok, Thailand',
  },

  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61575050976562',
    messenger: 'https://m.me/61575050976562',
    line: 'https://lin.ee/ZYTzBaIE',
  },

  // 🔍 SEO_ARCHITECTURE: Optimized for Unified Inquiry
  seo: {
    titleTemplate: '%s | JP Visual Docs',
    defaultTitle: 'JP Visual Docs – ประเมินโอกาสสำเร็จ วางแผนโปรไฟล์ และจัดการเอกสารวีซ่าครบวงจร',
    // 📝 ENFORCED: เน้นเรื่องการ "ประเมิน" และ "แก้เคสยาก" ในจุดเดียว
    description:
      'บริการประเมินโปรไฟล์และวางแผนเอกสารระดับมืออาชีพ วิเคราะห์จุดอ่อนเคสยาก จัดโครงสร้างเอกสารการเงิน และดูแลการยื่นวีซ่าครบจบในที่เดียวโดยทีมงานเฉพาะทาง',
    keywords: [
      'ประเมินโอกาสวีซ่า',
      'วิเคราะห์โปรไฟล์วีซ่า',
      'ที่ปรึกษาเอกสารวีซ่า',
      'ปั้นเคสวีซ่า',
      'รับเตรียมเอกสารวีซ่า',
      'วางแผนเอกสารการเงิน',
      'แก้ไขวีซ่าไม่ผ่าน',
      'Visa Strategy Thailand',
      'JP Visual Docs',
      'เจ้าป่า',
    ] as string[],
  },

  // 🖼️ ASSET_REGISTRY
  assets: {
    ogImage: `${baseUrl}/images/og-image.jpg`,
    favicon: '/favicon.ico',
    appleTouch: '/apple-touch-icon.png',
    logo: '/images/เจ้าป่า.webp',
    hero: '/images/hero/HeroBackground.png',
    grid: '/grid-pattern.svg',
  },
} as const

export type SiteConfig = typeof siteConfig
