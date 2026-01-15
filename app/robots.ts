// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://jpvisouldocs.online";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/dashboard",
          "/leads",
          "/api/",
          "/services/request",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
