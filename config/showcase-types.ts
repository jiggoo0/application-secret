/** @format */

/**
 * 🛠️ INTERFACE: Artifact
 * MODE A: Strict Alignment with Data Files
 * บังคับมี type แต่ title และ url เป็น optional เพื่อรองรับข้อมูลเดิม
 */
export interface Artifact {
  label: string
  type: 'document' | 'code' | 'diagram' | 'link' | string
  description: string
  title?: string
  url?: string
}

/**
 * 🛠️ INTERFACE: ActivityLog
 * ปรับ status ให้เป็น Enum-like string เพื่อรองรับการแสดงผลสีใน UI
 */
export interface ActivityLog {
  day: number
  event: string
  status: 'success' | 'warning' | 'info' | 'ANALYZED' | 'EXECUTED' | 'VERIFIED' | string
}

/**
 * 🛠️ INTERFACE: CaseShowcase
 * MODE A: Flexible Schema Protocol
 * ทำให้ฟิลด์ที่ไม่ได้ใช้ในทุกไฟล์ข้อมูลเป็น Optional (?) เพื่อแก้ TS2740
 */
export interface CaseShowcase {
  id: string
  slug: string
  title: string
  executive_summary: string
  client_category: 'FREELANCE' | 'FAMILY' | 'INDIVIDUAL' | 'SME_OWNER' | 'HNWI' | string

  // Optional Fields for Type-Safety (TS2740 Fix)
  description?: string
  date?: string
  status?: string
  category?: string
  tags?: string[]
  image?: string

  // Performance Data Structure
  stats?: {
    docs_processed?: number | string
    complexity_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | string
    processing_time?: string
  }

  // Regulatory Outcome
  business_outcome?: {
    verdict: string
    authority: string
    official_ref: string
  }

  technical_strategy: string[]
  artifacts: Artifact[]
  logs: ActivityLog[]
}
