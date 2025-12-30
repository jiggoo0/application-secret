/**
 * @format
 * @description TYPOGRAPHY_ENGINE: ระบบจัดการฟอนต์ฉบับปรับปรุงเพื่อความคมชัดสูงสุด
 * VERSION: 3.3.0 (High-Contrast Edition)
 */

import { Inter, IBM_Plex_Sans_Thai, JetBrains_Mono } from 'next/font/google'

/* --------------------------------------------------------------------------
   INTER: UI / Global Sans (English)
   เพิ่ม weight 800, 900 เพื่อใช้กับ Headline ที่ต้องการความชัดเจนรุนแรง
   -------------------------------------------------------------------------- */
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800', '900'],
  adjustFontFallback: true,
})

/* --------------------------------------------------------------------------
   IBM PLEX SANS THAI: Main Content (Thai)
   ปรับให้น้ำหนักเริ่มต้นที่ 400 เพื่อป้องกันตัวอักษรบางเกินไปจนจาง
   -------------------------------------------------------------------------- */
export const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  subsets: ['thai', 'latin'],
  display: 'swap',
  variable: '--font-ibm-plex-sans-thai',
  weight: ['400', '500', '600', '700'],
  preload: true,
})

/* --------------------------------------------------------------------------
   JETBRAINS MONO: System / Meta Data / Code
   เพิ่ม weight 800 เพื่อให้ Ticket ID และ Metadata ดูหนักแน่นไม่แพ้ลายตาราง
   -------------------------------------------------------------------------- */
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '700', '800'],
})
