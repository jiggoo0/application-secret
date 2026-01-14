import { ServiceItem } from "@/constants/services-data";

/**
 * ✅ กำหนด Interface สำหรับข้อมูล Schema เพื่อหลีกเลี่ยง any
 * ใช้ Record<string, unknown> สำหรับข้อมูลที่เป็นโครงสร้าง Object ทั่วไป
 */
interface JsonLdProps {
  type: "Organization" | "Service" | "BlogPosting";
  data?: ServiceItem | BlogData | Record<string, unknown>;
}

interface BlogData {
  headline?: string;
  title?: string;
  image?: string | string[];
  datePublished?: string;
  date?: string;
  dateModified?: string;
  author?: string | { name: string };
  description?: string;
  excerpt?: string;
  slug?: string;
}

export function JsonLd({ type, data }: JsonLdProps) {
  // ✅ ใช้ unknown และ Record สำหรับ Type Safety แทน any
  let schema: Record<string, unknown> | null = null;

  // 1. ข้อมูลสำหรับองค์กร (Organization)
  if (type === "Organization") {
    schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "JP-VISOUL-DOCS",
      url: "https://jpvisouldocs.online",
      logo: "https://jpvisouldocs.online/logo.png",
      description: "บริการให้คำปรึกษาด้านเอกสาร วีซ่า และงานกฎหมายครบวงจร",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+66-XX-XXX-XXXX",
        contactType: "customer service",
        areaServed: "TH",
        availableLanguage: ["Thai", "English"],
      },
      sameAs: [
        "https://www.facebook.com/jpvisouldocs",
        "https://line.me/ti/p/@jpvisouldocs",
      ],
    };
  }

  // 2. ข้อมูลสำหรับหน้ารายละเอียดบริการ (Service)
  if (type === "Service" && data) {
    const service = data as ServiceItem;
    schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: service.title,
      provider: {
        "@type": "LocalBusiness",
        name: "JP-VISOUL-DOCS",
        image: "https://jpvisouldocs.online/og-image.jpg",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bangkok",
          addressCountry: "TH",
        },
      },
      description: service.description,
      areaServed: "TH",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: service.category || "General Services",
        itemListElement:
          service.features?.map((f) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: f,
            },
          })) || [],
      },
    };
  }

  // 3. ข้อมูลสำหรับหน้าบทความ (BlogPosting)
  if (type === "BlogPosting" && data) {
    const blog = data as BlogData;
    schema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blog.headline || blog.title,
      image: Array.isArray(blog.image)
        ? blog.image
        : [blog.image || "/images/blog-placeholder.jpg"],
      datePublished: blog.datePublished || blog.date,
      dateModified: blog.dateModified || blog.datePublished || blog.date,
      author: [
        {
          "@type": "Person",
          name:
            blog.author && typeof blog.author === "object"
              ? blog.author.name
              : blog.author || "JP-VISOUL Team",
          url: "https://jpvisouldocs.online",
        },
      ],
      description: blog.description || blog.excerpt,
      publisher: {
        "@type": "Organization",
        name: "JP-VISOUL-DOCS",
        logo: {
          "@type": "ImageObject",
          url: "https://jpvisouldocs.online/logo.png",
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://jpvisouldocs.online/blog/${blog.slug || ""}`,
      },
    };
  }

  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
