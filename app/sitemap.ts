/** @format */
import { MetadataRoute } from "next"
import { siteConfig } from "@/config/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url
  const lastModified = new Date()

  // 🛰️ STATIC_MANIFEST
  const staticRoutes = ["", "/contact", "/showcase", "/privacy", "/terms"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified,
      changeFrequency: (route === "" ? "daily" : "weekly") as any,
      priority: route === "" ? 1.0 : 0.8,
    })
  )

  return [...staticRoutes]
}
