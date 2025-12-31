/** @format */

import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'
import { ALL_CASES } from '@/config/showcase/all-cases'
import type { CaseShowcase } from '@/config/showcase-types'

/**
 * 🛠️ GENERATOR: Sitemap
 * ควบคุมการค้นหาและจัดอันดับของ Search Engine
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url

  // 1. STATIC ROUTES (High Priority)
  const staticRoutes: MetadataRoute.Sitemap = [
    '', // Home
    '/assessment',
    '/contact',
    '/showcase',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }))

  // 2. SHOWCASE ROUTES
  const showcaseRoutes: MetadataRoute.Sitemap = ALL_CASES.map((item: CaseShowcase) => ({
    url: `${baseUrl}/showcase/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  // 3. LEGAL ROUTES (Low Priority)
  const legalRoutes: MetadataRoute.Sitemap = ['/privacy', '/terms'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.3,
  }))

  return [...staticRoutes, ...showcaseRoutes, ...legalRoutes]
}
