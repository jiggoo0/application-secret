/** * @format
 * @description TYPOGRAPHY_ENGINE: ระบบจัดการฟอนต์มาตรฐานสูงสุดสำหรับภาษาไทยและอังกฤษ
 */

import { Inter, IBM_Plex_Sans_Thai, JetBrains_Mono } from 'next/font/google'

/* --------------------------------------------------------------------------
   INTER: UI / Global Sans (English)
   -------------------------------------------------------------------------- */
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  adjustFontFallback: true,
})

/* --------------------------------------------------------------------------
   IBM PLEX SANS THAI: Main Content (Thai)
   เน้นความอ่านง่ายสำหรับเอกสารกฎหมายและข้อมูลวีซ่า
   -------------------------------------------------------------------------- */
export const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  subsets: ['thai', 'latin'],
  display: 'swap',
  variable: '--font-ibm-plex-sans-thai',
  weight: ['400', '500', '600', '700'], // ตัด 300 ออกหากไม่ได้ใช้ใน Industrial Design
  preload: true,
})

/* --------------------------------------------------------------------------
   JETBRAINS MONO: System / Meta Data / Code
   สร้างความรู้สึกแบบ Technical & Sharp
   -------------------------------------------------------------------------- */
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  weight: ['400', '700'], // โหลดเฉพาะน้ำหนักที่จำเป็นสำหรับ UI Mono
})
