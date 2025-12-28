/** @format */
import { LucideIcon } from "lucide-react"

/**
 * 🛠️ SERVICE_CATEGORY
 * ----------------------------------------------------------------
 * แบ่งกลุ่มตามโครงสร้างธุรกิจหลักของ JP Visual Docs (JPVD_CORE)
 */
export type ServiceCategory =
  | "IMMIGRATION" // บริการด้านวีซ่าและตรวจคนเข้าเมือง
  | "FINANCIAL" // บริการที่ปรึกษาสินเชื่อและรายได้
  | "DOCUMENTATION" // บริการร่างจดหมายและงานเอกสาร
  | "INFRASTRUCTURE" // บริการเสริมด้านการเดินทางและที่พัก

/**
 * 🛠️ SYSTEM_STATUS
 */
export type SystemStatus = "OPERATIONAL" | "DEVELOPMENT" | "HIGH_DEMAND"

/**
 * 🛠️ SERVICE_ITEM_INTERFACE
 * ----------------------------------------------------------------
 * โครงสร้างข้อมูลหลัก (Master Registry System)
 */
export interface ServiceItem {
  id: string // Unique UUID (ใช้ใน Logic/Cart)
  code: string // รหัสอ้างอิงลูกค้า (เช่น JPV-001)
  category: ServiceCategory
  type: "VISA_ASSET" | "GEN_ASSET"
  icon: LucideIcon
  image: string // Path รูปภาพ (WebP Optimized)
  title: string
  description: string
  price: {
    base: string // ราคา (เช่น 2,500)
    suffix?: string // หน่วย (เช่น /เคส)
  }
  cta: {
    label: string
    action: string
  }
  technical: {
    highlight: string
    protocol: string[] // ลำดับขั้นตอนการทำงาน (Industrial Protocol)
    status: SystemStatus
  }
}

/**
 * 🛠️ SERVICE_CARD_PROPS
 * ----------------------------------------------------------------
 * ✅ FIXED: ใช้ _id ใน interface เพื่อเลี่ยง Unused Variable Warning
 * ในขณะที่ยังคงความชัดเจนของ Type Definition
 */
export interface ServiceCardProps {
  item: ServiceItem
  /**
   * @function onExecute
   * รับค่า id เพื่อนำไปประมวลผลต่อในระบบ CartSection หรือ Contact Gateway
   */
  onExecute?: (_id: string) => void
}
