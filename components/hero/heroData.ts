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
 * ปรับคำอธิบายให้เข้าถึงง่าย ลดความกังวล และเน้นการช่วยเหลือ
 */
export const serviceList: ServiceItem[] = [
  {
    icon: Globe2,
    label: "VISA_PROTOCOL",
    title: "วีซ่าท่องเที่ยวและทำงาน",
    description: "ช่วยดูแลคำร้องและนัดหมายให้คุณอย่างครบถ้วน สบายใจทุกขั้นตอน",
  },
  {
    icon: FileText,
    label: "DOC_STRUCTURE",
    title: "จัดเตรียมเอกสารครบวงจร",
    description: "ช่วยตรวจทานและเตรียมเอกสารสำคัญให้ถูกต้องแม่นยำตามมาตรฐาน",
  },
  {
    icon: Landmark,
    label: "CORP_REGISTRY",
    title: "จดทะเบียนและเอกสารบริษัท",
    description:
      "เป็นที่ปรึกษาด้านงานเอกสาร เพื่อการเริ่มต้นและเติบโตของธุรกิจคุณ",
  },
  {
    icon: ShieldCheck,
    label: "LEGAL_SYNC",
    title: "รับรองเอกสารทางกฎหมาย",
    description: "ดูแลการรับรองเอกสารสำคัญและประสานงานกงสุลให้คุณอย่างมืออาชีพ",
  },
]

/**
 * สถิติความสำเร็จ (Performance Metrics)
 * ปรับ Unit ให้เป็นภาษาที่เข้าใจง่ายสำหรับหน้าเว็บภาษาไทย
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
    unit: "ปี",
  },
  {
    label: "CLIENT_NODES",
    value: "2.5K",
    unit: "ราย",
  },
]
