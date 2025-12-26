/** @format */
import { ReactNode } from "react"

/**
 * ServiceType: แบ่งกลุ่มประเภทบริการหลัก
 * - VISA_ASSET: บริการเกี่ยวกับวีซ่าและเอกสารเดินทาง
 * - GEN_ASSET: บริการเกี่ยวกับจดหมาย สินเชื่อ และการตลาด
 */
export type ServiceType = "VISA_ASSET" | "GEN_ASSET"

/**
 * ServiceItem: โครงสร้างข้อมูลหลักของแต่ละบริการ
 * ออกแบบมาให้สอดคล้องกับภาพลักษณ์สถาปัตยกรรมเอกสาร (Visual Docs)
 */
export interface ServiceItem {
  /** ไอดีอ้างอิงของบริการ (เช่น visa-asset) */
  id: string

  /** ประเภทบริการสำหรับการทำสีและฟิลเตอร์ */
  type: ServiceType

  /** Icon จาก Lucide React ที่จะนำมาแสดงผล */
  icon: ReactNode

  /** Path ของรูปภาพหน้าปกบริการ (จาก /public/images/service/) */
  image: string

  /** ชื่อหัวข้อบริการ */
  title: string

  /** รายละเอียดบริการเบื้องต้น */
  description: string

  /** ราคาแสดงผล (เช่น "3,000.-" หรือ "เริ่ม 400.-") */
  price: string

  /** ข้อความบนปุ่ม Call to Action */
  cta: string

  /** ข้อความเน้นย้ำสั้นๆ (Highlight) เช่น "สายงานตรง" */
  highlight: string
}

/**
 * ServiceActionProps: สำหรับส่งต่อ Logic การจัดการ Event
 */
export interface ServiceActionProps {
  handleExecute: (id: string, title: string) => void
}
