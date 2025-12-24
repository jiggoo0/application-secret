// app/sitemap.ts
// ----------------------------------------------------
// 🗺️ JP-VISOUL: Sitemap Generator
// เป้าหมาย: สร้างแผนที่นำทางระบบ (SEO Indexing)
// ----------------------------------------------------

import type { MetadataRoute } from 'next';
import { ALL_SERVICES } from '@/data/services';

export default function sitemap(): MetadataRoute.Sitemap {
  // กำหนด Base URL จาก Environment Variable หรือ Default
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.jp-visoul.com';

  // 1. เส้นทางหลัก (Core Routes: High Priority)
  const coreRoutes: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/services',
    '/works',
    '/blog',
    '/contact',
    '/reviews', // เพิ่มเติม: หน้าผลตอบรับจากลูกค้า
    '/letter-service',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'monthly', // หน้าแรกปรับเปลี่ยนบ่อยกว่า
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. เส้นทางบริการรายตัว (Service Routes: Operational Tiers)
  // หมายเหตุ: ใช้ slug ที่สอดคล้องกับระบบ Routing ของพี่
  const serviceRoutes: MetadataRoute.Sitemap = ALL_SERVICES.map((service) => {
    // แนะนำ: หากใน ALL_SERVICES มีฟิลด์ id หรือ slug อยู่แล้ว ให้ใช้ค่านั้นแทนการแปลง title
    const slug = service.id || service.title.replace(/\s+/g, '-').toLowerCase();

    return {
      url: `${baseUrl}/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    };
  });

  // 3. รวมเส้นทางและคืนค่าหน่วยประมวลผล (Merged Matrix)
  return [...coreRoutes, ...serviceRoutes];
}
