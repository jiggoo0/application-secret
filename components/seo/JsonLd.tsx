/** @format */

import { siteConfig } from "@/config/site"

export function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    // 🛠️ SOURCE_OF_TRUTH_FIX: เปลี่ยน logoJP -> logo ตามที่ประกาศไว้ใน config/site.ts
    image: `${siteConfig.url}${siteConfig.assets.logo}`,
    description: siteConfig.seo.description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phoneFull,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bangkok",
      addressCountry: "TH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 13.7563,
      longitude: 100.5018,
    },
    sameAs: [siteConfig.social.facebook, siteConfig.social.line],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  )
}
