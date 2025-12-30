/** * @format
 * @description CASE_ARCHIVE_MANIFEST: Central Data Registry (V2.025.4)
 * ✅ MISSION: Unified Type Export for System-wide Integration
 */

import { CaseShowcase } from '../showcase-types'
import { showcase1 } from './case-1'
import { showcase2 } from './case-2'
import { showcase3 } from './case-3'
import { showcase4 } from './case-4'
import { showcase5 } from './case-5'
import { showcase6 } from './case-6'

// 🏛️ RE-EXPORT Type เพื่อให้คอมโพเนนต์อื่น (เช่น ShowcaseGrid) เรียกใช้งานได้โดยตรง
export type { CaseShowcase }

/**
 * 📦 ALL_CASES DATA_POOL
 * รวบรวมข้อมูลเคสทั้งหมดเพื่อนำไป Render บน Matrix Grid
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
 * 🔍 CASE_QUERY_PROTOCOL
 * ฟังก์ชันสำหรับดึงข้อมูลเคสรายตัวผ่าน URL Slug
 */
export const getCaseBySlug = (slug: string): CaseShowcase | undefined => {
  return ALL_CASES.find((item) => item.slug === slug)
}
