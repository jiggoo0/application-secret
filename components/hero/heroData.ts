/** @format */
import { Globe2, FileText, Landmark, ShieldCheck } from "lucide-react"

// ประเภทข้อมูลสำหรับความปลอดภัยของ Type (Type Safety)
export interface ServiceItem {
  icon: any
  label: string
  title: string
  description?: string
}

export interface TrustStat {
  label: string
  value: string
  unit: string
}

/**
 * รายการบริการหลัก (Core Services)
 * ใช้ Label สไตล์ System Code เพื่อคงกลิ่นอาย Industrial
 */
export const serviceList: ServiceItem[] = [
  {
    icon: Globe2,
    label: "VISA_PROTOCOL",
    title: "วีซ่าท่องเที่ยวและทำงาน",
    description: "จัดการคำร้องและนัดหมายครบวงจร",
  },
  {
    icon: FileText,
    label: "DOC_STRUCTURE",
    title: "จัดเตรียมเอกสารครบวงจร",
    description: "ตรวจสอบความถูกต้องตามมาตรฐานสากล",
  },
  {
    icon: Landmark,
    label: "CORP_REGISTRY",
    title: "จดทะเบียนและเอกสารบริษัท",
    description: "รองรับการจัดตั้งและขยายธุรกิจ",
  },
  {
    icon: ShieldCheck,
    label: "LEGAL_SYNC",
    title: "รับรองเอกสารทางกฎหมาย",
    description: "บริการ Notary Public และการรับรองกงสุล",
  },
]

/**
 * สถิติความสำเร็จ (Performance Metrics)
 */
export const trustStats: TrustStat[] = [
  {
    label: "SUCCESS_RATE",
    value: "99",
    unit: "%",
  },
  {
    label: "SERVICE_YEARS",
    value: "08",
    unit: "YRS",
  },
  {
    label: "CLIENT_NODES",
    value: "2.5K",
    unit: "+",
  },
]
