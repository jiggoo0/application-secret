/** @format */

import { siteConfig } from "@/config/site"

/**
 * 🛰️ JSON_LD_PROTOCOL
 * ----------------------------------------------------------------
 * Structured Data (Schema.org) สำหรับ Google
 * รองรับ LocalBusiness + Service Catalog
 * ใช้ร่วมกับ Next.js App Router
 */
export const JsonLd = () => {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    url: siteConfig.url,

    // ใช้ logo จริง ไม่ใช้ favicon
    logo: `${siteConfig.url}${siteConfig.assets.logoJP}`,
    image: `${siteConfig.url}${siteConfig.assets.ogImage}`,

    description: siteConfig.seo.description,
    telephone: siteConfig.contact.phoneFull,
    email: siteConfig.contact.email,
    priceRange: "$$",

    address: {
      "@type": "PostalAddress",
      addressLocality: "Bangkok",
      addressCountry: "TH",
    },

    areaServed: {
      "@type": "Country",
      name: "Thailand",
    },

    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.line,
      siteConfig.social.messenger,
    ],

    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Visa & Documentation Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "ที่ปรึกษาเอกสารวีซ่า และปั้นเคสวีซ่า",
            description:
              "วิเคราะห์เคส วางแผนเอกสาร และจัดทำจดหมายประกอบการยื่นวีซ่า",
            areaServed: "Thailand",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "ที่ปรึกษาวางแผนกู้เงิน และจัดระบบเอกสารรายได้",
            description:
              "จัดโครงสร้างรายได้ สเตทเม้น และเอกสารประกอบการยื่นสินเชื่อ",
            areaServed: "Thailand",
          },
        },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(businessSchema),
      }}
    />
  )
}
