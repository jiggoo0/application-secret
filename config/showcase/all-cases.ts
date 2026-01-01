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
 * 🛰️ ACCESS_PROTOCOLS
 * เพิ่มฟังก์ชันเหล่านี้เพื่อให้ Next.js 15 เรียกใช้ใน generateStaticParams และ Page Components
 */

// ✅ เพิ่มฟังก์ชันนี้เพื่อแก้ Error "(0 , getAllCases) is not a function"
export const getAllCases = (): CaseShowcase[] => {
  return ALL_CASES
}

export const getCaseBySlug = (slug: string): CaseShowcase | undefined => {
  return ALL_CASES.find((item) => item.slug === slug)
}
