/** @format */
import { siteConfig } from "@/config/site"

/**
 * 🛰️ JSON_LD_PROTOCOL
 * ----------------------------------------------------------------
 * จัดการ Structured Data (Schema.org) แยกส่วนจาก Layout
 * ช่วยให้ Google เข้าใจประเภทธุรกิจและบริการของ JP Visual Docs
 */
export const JsonLd = () => {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.assets.favicon}`,
    image: `${siteConfig.url}${siteConfig.assets.ogImage}`,
    description: siteConfig.seo.description,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bangkok",
      addressCountry: "TH",
    },
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.line,
      siteConfig.social.messenger,
    ],
    priceRange: "$$",
    areaServed: "Thailand",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "บริการด้านเอกสารและวีซ่าโดยมืออาชีพ",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "รับจัดการเอกสารวีซ่า และปั้นเคสวีซ่า",
            description: "แก้ปัญหาเคสยาก วางแผนยื่นวีซ่าให้ผ่านมาตรฐาน",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "ที่ปรึกษาวางแผนกู้เงิน และจัดการเอกสารรายได้",
            description: "วิเคราะห์โครงสร้างรายได้เพื่อยื่นกู้ธนาคาร",
          },
        },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
    />
  )
}
