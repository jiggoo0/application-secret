// components/seo/JsonLd.tsx

import { type Service as ServiceItem } from "@/constants/services-data";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

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

interface JsonLdProps {
  type: "Organization" | "Service" | "BlogPosting";
  data?: ServiceItem | BlogData;
}

/* -------------------------------------------------------------------------- */
/*                               Helper Utils                                 */
/* -------------------------------------------------------------------------- */

/**
 * ลบ key ที่เป็น undefined เพื่อป้องกัน JSON-LD invalid
 */
function cleanObject<T extends Record<string, unknown>>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

export function JsonLd({ type, data }: JsonLdProps) {
  let schema: Record<string, unknown> | null = null;

  /* ------------------------------------------------------------------------ */
  /* 1. Organization Schema                                                    */
  /* ------------------------------------------------------------------------ */
  if (type === "Organization") {
    schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "JP-VISOUL-DOCS",
      url: "https://jpvisouldocs.online",
      logo: "https://jpvisouldocs.online/og-image.jpg",
      description:
        "บริการให้คำปรึกษาด้านเอกสาร วีซ่า และการวางโครงสร้างทางกฎหมายครบวงจร",
      contactPoint: {
        "@type": "ContactPoint",
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

  /* ------------------------------------------------------------------------ */
  /* 2. Service Schema                                                         */
  /* ------------------------------------------------------------------------ */
  if (type === "Service" && data) {
    const service = data as ServiceItem;

    schema = cleanObject({
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.name,
      serviceType: service.category ?? service.name,
      description: service.description,
      areaServed: {
        "@type": "Country",
        name: "Thailand",
      },
      provider: {
        "@type": "Organization",
        name: "JP-VISOUL-DOCS",
        url: "https://jpvisouldocs.online",
        logo: "https://jpvisouldocs.online/og-image.jpg",
      },
      hasOfferCatalog: service.features?.length
        ? {
            "@type": "OfferCatalog",
            name: service.category ?? "Service Features",
            itemListElement: service.features.map((feature) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: feature,
              },
            })),
          }
        : undefined,
    });
  }

  /* ------------------------------------------------------------------------ */
  /* 3. BlogPosting Schema                                                      */
  /* ------------------------------------------------------------------------ */
  if (type === "BlogPosting" && data) {
    const blog = data as BlogData;

    schema = cleanObject({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blog.headline ?? blog.title,
      image: Array.isArray(blog.image)
        ? blog.image
        : [blog.image ?? "https://jpvisouldocs.online/og-image.jpg"],
      datePublished: blog.datePublished ?? blog.date,
      dateModified: blog.dateModified ?? blog.datePublished ?? blog.date,
      description: blog.description ?? blog.excerpt,
      author: {
        "@type": "Person",
        name:
          typeof blog.author === "object"
            ? blog.author.name
            : (blog.author ?? "JP-VISOUL Team"),
        url: "https://jpvisouldocs.online",
      },
      publisher: {
        "@type": "Organization",
        name: "JP-VISOUL-DOCS",
        logo: {
          "@type": "ImageObject",
          url: "https://jpvisouldocs.online/og-image.jpg",
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://jpvisouldocs.online/blog/${blog.slug ?? ""}`,
      },
    });
  }

  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
