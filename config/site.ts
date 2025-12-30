/**
 * @format
 * @description SITE_CONFIG: Central Command Infrastructure (V2.9.6 Zero-Error)
 * ✅ FIXED: Removed unused imports 'services' and 'ALL_CASES'
 * ✅ FIXED: Ensured 'messenger' property exists for JsonLd synergy
 */

import { env } from '@/lib/env'

export interface SiteConfig {
  name: string
  shortName: string
  description: string
  domain: string
  url: string
  locale: string
  language: string[]
  author: {
    name: string
    email: string
    role: string
  }
  system: {
    status: 'SYSTEM_ACTIVE' | 'MAINTENANCE' | 'OFFLINE'
    label: string
    version: string
  }
  contact: {
    phone: string
    phoneFull: string
    lineId: string
    lineLink: string
    email: string
    address: string
  }
  social: {
    facebook: string
    tiktok: string
    line: string
    messenger: string
  }
  seo: {
    titleTemplate: string
    defaultTitle: string
    description: string
    keywords: string[]
  }
  assets: {
    ogImage: string
    favicon: string
    logo: string
    grid: string
    appleTouch: string
  }
}

export const siteConfig: SiteConfig = {
  name: 'JP Visual Docs',
  shortName: 'JPVD',
  description: 'ที่ปรึกษาด้านการจัดการเอกสารและวางแผนวีซ่าครบวงจร',
  domain: 'jpvisouldocs.online',
  url: env.NEXT_PUBLIC_APP_URL || 'https://jpvisouldocs.online',

  locale: 'th-TH',
  language: ['th', 'en'],

  author: {
    name: 'เจ้าป่า (JP Visual Docs)',
    email: 'contact@jpvisouldocs.online',
    role: 'ที่ปรึกษาด้านการวางแผนเอกสารมืออาชีพ',
  },

  system: {
    status: 'SYSTEM_ACTIVE',
    label: 'พร้อมให้บริการ',
    version: '2.9.6',
  },

  contact: {
    phone: '091-054-0710',
    phoneFull: '+66910540710',
    lineId: '@462fqtfc',
    lineLink: 'https://lin.ee/ZYTzBaIE',
    email: 'contact@jpvisouldocs.online',
    address: 'Bangkok, Thailand',
  },

  social: {
    facebook: 'https://facebook.com/jpvisouldocs',
    tiktok: 'https://tiktok.com/@jpvisouldocs',
    line: 'https://lin.ee/ZYTzBaIE',
    messenger: 'https://m.me/jpvisouldocs',
  },

  seo: {
    titleTemplate: '%s | JP Visual Docs',
    defaultTitle: 'JP Visual Docs – วางแผนวีซ่า และจัดเตรียมเอกสารระดับมืออาชีพ',
    description: 'ช่วยวิเคราะห์จุดอ่อนของเคส วางแผนการเงิน และจัดเตรียมเอกสารวีซ่า',
    keywords: [
      'ที่ปรึกษาเอกสารวีซ่า',
      'ปั้นเคสวีซ่า',
      'Visa Consultant Thailand',
      'JP Visual Docs',
    ],
  },

  assets: {
    ogImage: '/images/og-image.jpg',
    favicon: '/favicon.ico',
    logo: '/images/เจ้าป่า.webp',
    grid: '/grid-pattern.svg',
    appleTouch: '/images/apple-touch-icon.png',
  },
}
