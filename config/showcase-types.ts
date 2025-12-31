/** @format */

/* ------------------------------------------------------------------ */
/* ENUM / UNION PROTOCOL                                              */
/* ------------------------------------------------------------------ */

export type ArtifactType = 'document' | 'code' | 'diagram' | 'link' | (string & {})

export type ActivityStatus =
  | 'success'
  | 'warning'
  | 'info'
  | 'ANALYZED'
  | 'EXECUTED'
  | 'VERIFIED'
  | (string & {})

export type ClientCategory =
  | 'FREELANCE'
  | 'FAMILY'
  | 'INDIVIDUAL'
  | 'SME_OWNER'
  | 'HNWI'
  | (string & {})

export type ComplexityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | (string & {})

/* ------------------------------------------------------------------ */
/* ARTIFACT                                                           */
/* ------------------------------------------------------------------ */
/**
 * MODE A: Strict Alignment with Data Files
 * - บังคับ label / type / description
 * - title / url เป็น optional เพื่อรองรับข้อมูลเดิม
 */
export interface Artifact {
  label: string
  type: ArtifactType
  description: string
  title?: string
  url?: string
}

/* ------------------------------------------------------------------ */
/* ACTIVITY LOG                                                       */
/* ------------------------------------------------------------------ */
/**
 * - ใช้ status แบบ Enum-like string
 * - รองรับการ map สีใน UI
 */
export interface ActivityLog {
  day: number
  event: string
  status: ActivityStatus
}

/* ------------------------------------------------------------------ */
/* CASE SHOWCASE                                                      */
/* ------------------------------------------------------------------ */
/**
 * MODE A: Flexible Schema Protocol
 * - ฟิลด์ที่ไม่อยู่ครบทุกไฟล์กำหนดเป็น optional
 * - แก้ปัญหา TS2740 จาก data ไม่ครบ schema
 */
export interface CaseShowcase {
  id: string
  slug: string
  title: string
  executive_summary: string
  client_category: ClientCategory

  /* ---------------- Optional Meta ---------------- */
  description?: string
  date?: string
  status?: string
  category?: string
  tags?: string[]
  image?: string

  /* ---------------- Performance ------------------ */
  stats?: {
    docs_processed?: number | string
    complexity_level: ComplexityLevel
    processing_time?: string
  }

  /* ---------------- Outcome ---------------------- */
  business_outcome?: {
    verdict: string
    authority: string
    official_ref: string
  }

  /* ---------------- Core Data -------------------- */
  technical_strategy: string[]
  artifacts: Artifact[]
  logs: ActivityLog[]
}
