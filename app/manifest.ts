/**
 * @format
 * @description PWA_MANIFEST_PROTOCOL: Protocol V5.2.1 (Production Ready)
 * ✅ FIXED: Path Mismatch (config), Theme Sync, Type-Safe Icons
 */

import type { MetadataRoute } from 'next'
// 🛡️ FIX: เปลี่ยน Path ให้ตรงกับรายงาน lint (@/config/site)
import { siteConfig } from '@/config/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',

    // 🎨 SYNC: ใช้สี Rich Black จาก Master Theme เพื่อ Splash Screen ที่เนียนตา
    background_color: '#05080A',
    theme_color: '#020617',

    lang: siteConfig.locale || 'th-TH',
    icons: [
      {
        src: siteConfig.assets.favicon || '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: siteConfig.assets.appleTouch || '/images/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      // 🏗️ PWA_STANDARD_COMPLIANCE
      {
        src: '/images/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/images/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}
