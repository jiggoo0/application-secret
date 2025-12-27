/** @format */
import { LucideIcon } from "lucide-react"

/**
 * 🛠️ SERVICE_CATEGORY
 * แบ่งกลุ่มตามโครงสร้างธุรกิจหลักของ JP Visual Docs
 */
export type ServiceCategory =
  | "IMMIGRATION"
  | "FINANCIAL"
  | "DOCUMENTATION"
  | "INFRASTRUCTURE"

/**
 * 🛠️ SYSTEM_STATUS
 */
export type SystemStatus = "OPERATIONAL" | "DEVELOPMENT" | "HIGH_DEMAND"

/**
 * 🛠️ SERVICE_ITEM
 * โครงสร้างข้อมูลหลัก (Registry System)
 * ✅ FIXED: 'code' property is now integrated into the system logic
 */
export interface ServiceItem {
  id: string
  code: string // รหัสอ้างอิงบริการ (เช่น JPV-001)
  category: ServiceCategory
  type: "VISA_ASSET" | "GEN_ASSET"
  icon: LucideIcon
  image: string
  title: string
  description: string
  price: {
    base: string
    suffix?: string
  }
  cta: {
    label: string
    action: string
  }
  technical: {
    highlight: string
    protocol: string[]
    status: SystemStatus
  }
}

/**
 * 🛠️ SERVICE_CARD_PROPS
 * ✅ OPTIMIZED: Function signature refinement
 */
export interface ServiceCardProps {
  item: ServiceItem
  onExecute?: (id: string) => void // เปลี่ยนจาก code เป็น id เพื่อให้ตรงกับ Logic หลัก
}
