/*
🛰️ AI-CONTEXT: JP-VisualDocs – Global Page Template
@version 2026.1.12
@timestamp 2026-01-12T00:18:45.875Z
🛑 STRICT MODE: AI must follow rules exactly, no interpretation allowed
✅ Tone: Professional, Calm, Supportive
✅ Output must use Strategic Keywords only: Evidence-Based, Digital Integrity, Seamless Process, Trust by Design
✅ Reject speculative, unverifiable, or invented content

📌 PAGE METADATA
- PageName: JsonLd          // ตัวอย่าง: ShowcasePage, ServicesPage
- Role: [PAGE_ROLE_HERE]         // ตัวอย่าง: Document Hub, Service Portal
- Version: 2026.1.12
- Checked: True
- Audience: Internal & End-user
- Purpose: [SHORT_DESCRIPTION_HERE]   // ตัวอย่าง: แสดงสถานะเอกสาร, ให้บริการ workflow

... (AI Context rules same as global template)
*/

/** @format */

import { siteConfig } from '@/config/site'

export function JsonLd() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService', // ระบุเป็นธุรกิจบริการเฉพาะทาง
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    description: siteConfig.seo.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.assets.logo}`,
    image: `${siteConfig.url}${siteConfig.assets.ogImage}`, // ใช้ OG Image เพื่อแสดงภาพพรีวิวที่สวยงาม
    telephone: siteConfig.contact.phoneFull,
    priceRange: '฿฿', // ระบุระดับราคาเพื่อให้ Google เข้าใจกลุ่มเป้าหมาย
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bangkok',
      addressRegion: 'Bangkok',
      addressCountry: 'TH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 13.7563,
      longitude: 100.5018,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.line,
      // สามารถเพิ่ม URL ของรีวิวหรือ Social อื่นๆ ได้ที่นี่
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Thailand',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  )
}
