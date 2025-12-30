/** * @format
 * @description CORE_UTILITIES: ศูนย์รวมฟังก์ชันช่วยเหลือมาตรฐานสูงสุด
 */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 🎨 CN (Class Name Merger)
 * ผสาน Tailwind classes โดยจัดการปัญหา Class ซ้ำซ้อนอย่างมีประสิทธิภาพ
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 📅 FORMAT_DATE_THAI
 * จัดรูปแบบวันที่ให้เป็นมาตรฐานไทย (พ.ศ.) สำหรับงานเอกสารและกฎหมาย
 */
export function formatDateThai(date: Date | string | number) {
  return new Intl.DateTimeFormat('th-TH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

/**
 * 🔗 ABSOLUTE_URL
 * สร้าง Full URL สำหรับ SEO Metadata และ Social Sharing
 */
export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL || 'https://jpvisouldocs.online'}${path}`
}

/**
 * 💰 FORMAT_CURRENCY
 * จัดรูปแบบตัวเลขเป็นสกุลเงิน (ใช้ในการวางแผนการเงินวีซ่า)
 */
export function formatCurrency(amount: number, currency: string = 'THB') {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency,
  }).format(amount)
}
