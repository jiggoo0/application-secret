/** @format */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/* -------------------------------------------------------------------------- */
/* CLASSNAME UTILITY */
/* -------------------------------------------------------------------------- */
/**
 * รวม Tailwind class อย่างปลอดภัย
 * - ตัด class ซ้ำ
 * - ป้องกัน collision
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/* -------------------------------------------------------------------------- */
/* DATE UTILITY — THAI BUDDHIST ERA */
/* -------------------------------------------------------------------------- */
/**
 * แสดงวันที่รูปแบบภาษาไทย
 * ใช้กับเอกสาร, Audit log, และสถานะทางการ
 */
export function formatDateThai(date: Date | string | number, style: 'short' | 'long' = 'long') {
  try {
    return new Intl.DateTimeFormat('th-TH', {
      day: 'numeric',
      month: style === 'long' ? 'long' : 'short',
      year: 'numeric',
    }).format(new Date(date))
  } catch {
    return 'INVALID_DATE'
  }
}

/* -------------------------------------------------------------------------- */
/* URL UTILITY */
/* -------------------------------------------------------------------------- */
/**
 * สร้าง Absolute URL จาก Path
 * ใช้กับ SEO, OpenGraph, และระบบอ้างอิงภายนอก
 */
export function absoluteUrl(path: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') || 'https://jpvisouldocs.online'

  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${cleanPath}`
}

/* -------------------------------------------------------------------------- */
/* CURRENCY UTILITY */
/* -------------------------------------------------------------------------- */
/**
 * แสดงจำนวนเงินตามมาตรฐานประเทศไทย
 * ใช้กับค่าบริการและเอกสารทางการเงิน
 */
export function formatCurrency(amount: number, currency: string = 'THB') {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount)
}
