import { MetadataRoute } from "next"
import { siteConfig } from "@/config/site"
import { showcaseRegistry } from "@/config/showcase"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/assessment",
    "/contact",
    "/showcase",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  const showcaseRoutes = showcaseRegistry.map((item) => ({
    url: `${siteConfig.url}/showcase/${item.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...routes, ...showcaseRoutes]
}
