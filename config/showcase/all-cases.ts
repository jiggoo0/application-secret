/** @format */

import { CaseShowcase } from '../showcase-types'
import { showcase1 } from './case-1'
import { showcase2 } from './case-2'
import { showcase3 } from './case-3'
import { showcase4 } from './case-4'
import { showcase5 } from './case-5'
import { showcase6 } from './case-6'

export type { CaseShowcase }

/**
 * 📦 ALL_CASES_REGISTRY
 * ทะเบียนรวมเคสศึกษาทั้งหมดที่ผ่านการตรวจสอบ (Audit Passed)
 */
export const ALL_CASES: CaseShowcase[] = [
  showcase1,
  showcase2,
  showcase3,
  showcase4,
  showcase5,
  showcase6,
]

/**
 * 🛰️ DATA_ACCESS_PROTOCOLS
 * ชุดคำสั่งสำหรับการเข้าถึงข้อมูลผ่านฝั่ง Server และ Client
 */

/**
 * 🔓 PROTOCOL: GET_ALL
 * ใช้สำหรับ generateStaticParams และหน้า Showcase Gallery
 */
export const getAllCases = (): CaseShowcase[] => {
  // ส่งคืนข้อมูลทั้งหมดที่ถูกจัดเรียงตามลำดับ ID (หรือเพิ่ม Logic การจัดลำดับที่นี่)
  return [...ALL_CASES].reverse() // Reverse เพื่อให้เคสใหม่ล่าสุดขึ้นก่อน
}

/**
 * 🎯 PROTOCOL: GET_BY_SLUG
 * ใช้สำหรับหน้า CaseDetailPage ([slug])
 */
export const getCaseBySlug = (slug: string): CaseShowcase | undefined => {
  const targetCase = ALL_CASES.find((item) => item.slug === slug)

  if (!targetCase) {
    console.warn(`[DATA_AUDIT] Case not found for slug: ${slug}`)
  }

  return targetCase
}

/**
 * 📊 PROTOCOL: GET_FEATURED
 * สำหรับแสดงผลในหน้าแรก (Home Page)
 */
export const getFeaturedCases = (limit: number = 3): CaseShowcase[] => {
  return getAllCases().slice(0, limit)
}
