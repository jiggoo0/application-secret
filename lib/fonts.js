// lib/fonts.ts
import { Inter, Prompt, Noto_Sans_Thai } from 'next/font/google';

/**
 * 🏗️ JP-VISOUL Font System Configuration
 * เน้นความชัดเจน (High-Contrast) และรองรับภาษาไทยแบบทางการ
 */

// 1. Inter: ใช้สำหรับ UI และ Body Text ทั่วไป (Medium 500 ตาม Spec)
export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

// 2. Prompt: ใช้สำหรับ Headlines (Black 900 Italic ตาม Spec)
export const prompt = Prompt({
  subsets: ['thai', 'latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-prompt',
});

// 3. Noto Sans Thai: ใช้สำหรับเนื้อหาภาษาไทยที่ต้องการความทันสมัย
export const notoTasksThai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto',
});

/**
 * หมายเหตุ: สำหรับฟอนต์ 'TH Sarabun New'
 * แนะนำให้ใช้ผ่าน Local Font ในหน้า Document Preview
 * เพราะเป็นฟอนต์เฉพาะทางสำหรับเอกสารราชการ/การเงิน
 */
