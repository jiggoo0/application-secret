/** @format */

import { Inter, IBM_Plex_Sans_Thai, JetBrains_Mono } from "next/font/google"

/**
 * 🌐 ENGLISH_PRIMARY: Inter
 * มาตรฐานอุตสาหกรรมสำหรับเนื้อหา Global Tech และ UI ส่วนกลาง
 */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

/**
 * 🇹🇭 THAI_PRIMARY: IBM Plex Sans Thai
 * ฟอนต์ไม่มีหัว (Sans-serif) ที่ให้ความรู้สึก Modern, Sharp และเป็นมืออาชีพ
 * สอดคล้องกับตัวตน "The Trusted Professional Peer"
 */
export const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-thai",
  display: "swap",
})

/**
 * 💻 TECHNICAL_MONO: JetBrains Mono
 * ฟอนต์สำหรับ Metadata, ตัวเลข และรหัสการดำเนินงาน (Case IDs)
 * ให้ความรู้สึกถึงความแม่นยำสูง (High Precision) แบบวิศวกรรม
 */
export const jetbrainsMono = JetBrains_Mono({
  // เปลี่ยนจาก mono เป็น jetbrainsMono
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})
