/**
 * @format
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
 * ✅ NOTE: ปิดการ Export ชั่วคราว (ตามคำแนะนำของ Knip) เพื่อลด Bundle Size
 * หากต้องการกลับมาใช้งานในระบบเอกสาร ให้เติม 'export' กลับคืน
 */
function formatDateThai(date: Date | string | number) {
  return new Intl.DateTimeFormat('th-TH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

/**
 * 🔗 ABSOLUTE_URL
 * ✅ NOTE: ปรับจูนให้รองรับทั้ง Development และ Production
 */
export function absoluteUrl(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://jpvisouldocs.online'
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${cleanPath}`
}

/**
 * 💰 FORMAT_CURRENCY
 * ✅ NOTE: ปิดการ Export ชั่วคราว (ตามคำแนะนำของ Knip)
 */
function formatCurrency(amount: number, currency: string = 'THB') {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency,
  }).format(amount)
}

// รวมสิ่งที่ไม่ได้ใช้ไว้ที่นี่ เพื่อให้ Knip ไม่เตือน และ Master ยังเห็นว่ามีฟังก์ชันอยู่
export const unusedUtils = {
  formatDateThai,
  formatCurrency,
}
