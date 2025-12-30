import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'], // ป้องกันไม่ให้ Bot เก็บข้อมูลหลังบ้าน
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
