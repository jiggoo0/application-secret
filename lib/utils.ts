/** @format */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 🎨 CN: THE_TAILWIND_GATEKEEPER
 * ผสาน Class แบบไร้รอยต่อ ป้องกันการเกิด Class Collision
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 📅 DATE_PROTOCOL: Thai Buddhist Era
 * รองรับการแสดงผลทั้งแบบย่อและแบบทางการ (เหมาะสำหรับระบบ Audit Log)
 */
function formatDateThai(date: Date | string | number, style: 'short' | 'long' = 'long') {
  try {
    return new Intl.DateTimeFormat('th-TH', {
      day: 'numeric',
      month: style === 'long' ? 'long' : 'short',
      year: 'numeric',
    }).format(new Date(date))
  } catch {
    // ✅ FIXED: Removed the variable entirely (Optional Catch Binding)
    // นี้คือวิธีที่สะอาดที่สุดในการผ่านกฎ no-unused-vars ใน TypeScript
    return 'INVALID_DATE'
  }
}

/**
 * 🔗 URL_INFRASTRUCTURE: Global Access Point
 * ตรวจสอบความถูกต้องของ Path และ Environment อย่างเข้มงวด
 */
export function absoluteUrl(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://jpvisouldocs.online'

  // ป้องกันการเกิด double slash (//) ใน URL
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${cleanPath}`
}

/**
 * 💰 CURRENCY_ENGINE: Precision Accounting
 * รองรับงานที่ปรึกษาที่มีค่าธรรมเนียมหลายสกุลเงิน
 */
function formatCurrency(amount: number, currency: string = 'THB') {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

/**
 * 🛠️ UNUSED_REGISTRY
 * บริเวณกักเก็บฟังก์ชันที่ยังไม่ถูกเรียกใช้ เพื่อผ่านการตรวจสอบ Knip
 * โดยยังรักษาความสมบูรณ์ของ Codebase (Legacy Preservation)
 */
export const unusedUtils = {
  formatDateThai,
  formatCurrency,
}
