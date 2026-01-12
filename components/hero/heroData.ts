/** @format */

import { Globe2, FileText, Landmark, ShieldCheck, type LucideIcon } from 'lucide-react'

/**
 * JP-VISUALDOCS — SERVICE DATA PROTOCOL
 * v2026.0.1
 * - โครงสร้างข้อมูลตายตัว
 * - เน้นผลลัพธ์ + ความน่าเชื่อถือ
 * - ไม่มี field ส่วนเกิน
 */

export interface ServiceItem {
  readonly icon: LucideIcon
  readonly label: string
  readonly title: string
  readonly description: string
}

export interface TrustStat {
  readonly label: string
  readonly value: string
  readonly unit: string
}

/* ─────────────────────────────────────────────── */
/* CORE SERVICES */
/* ─────────────────────────────────────────────── */

export const serviceList: readonly ServiceItem[] = [
  {
    icon: Globe2,
    label: 'VISA_STRATEGY',
    title: 'วางแผนและจัดการวีซ่า',
    description: 'วิเคราะห์โปรไฟล์เชิงลึกและดูแลคำร้องให้ตรงตามหลักเกณฑ์ของสถานทูต',
  },
  {
    icon: FileText,
    label: 'DOC_MANAGEMENT',
    title: 'จัดการเอกสารครบวงจร',
    description: 'จัดเตรียมและตรวจทานเอกสารสำคัญให้ถูกต้อง แม่นยำ และเป็นระบบ',
  },
  {
    icon: Landmark,
    label: 'BUSINESS_SETUP',
    title: 'จดทะเบียนและที่ปรึกษาธุรกิจ',
    description: 'วางโครงสร้างเอกสารบริษัทให้ถูกต้อง รองรับการตรวจสอบและการเติบโต',
  },
  {
    icon: ShieldCheck,
    label: 'CERTIFICATION',
    title: 'รับรองเอกสารและกงสุล',
    description: 'ดำเนินการรับรองเอกสารสำคัญเพื่อใช้งานในระดับสากลอย่างถูกต้อง',
  },
] as const

/* ─────────────────────────────────────────────── */
/* TRUST METRICS */
/* ─────────────────────────────────────────────── */

export const trustStats: readonly TrustStat[] = [
  {
    label: 'SUCCESS_RATE',
    value: '99',
    unit: '%',
  },
  {
    label: 'YEARS_EXPERIENCE',
    value: '08',
    unit: 'ปี',
  },
  {
    label: 'CLIENTS_SERVED',
    value: '2,500',
    unit: 'ราย',
  },
] as const
