/**
 * @format
 * @description TYPOGRAPHY_ENGINE — JP-VISUALDOCS
 * ROLE: Document-first / Calm / Long-read Friendly
 */

import { Inter, IBM_Plex_Sans_Thai, JetBrains_Mono } from 'next/font/google'

/* --------------------------------------------------------------------------
   INTER — UI / Headings (EN)
   ลดน้ำหนักสูงสุดเพื่อคุมความสุภาพของเอกสาร
   -------------------------------------------------------------------------- */
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  adjustFontFallback: true,
})

/* --------------------------------------------------------------------------
   IBM PLEX SANS THAI — Main Content (TH)
   เน้นความอ่านง่ายระยะยาว ไม่แข็ง ไม่บีบสายตา
   -------------------------------------------------------------------------- */
export const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  subsets: ['thai', 'latin'],
  display: 'swap',
  variable: '--font-thai',
  weight: ['400', '500', '600'],
  preload: true,
})

/* --------------------------------------------------------------------------
   JETBRAINS MONO — System / Metadata / IDs
   ใช้เฉพาะงานอ้างอิง ไม่ดึงสายตาเกินจำเป็น
   -------------------------------------------------------------------------- */
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500', '600'],
})
