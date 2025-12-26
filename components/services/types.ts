/** @format */
import { LucideIcon } from "lucide-react"

/**
 * ServiceType: แบ่งกลุ่มประเภทบริการหลักตาม Protocol ของ JPVD
 * - VISA_ASSET: เน้นงานเอกสารเดินทางและกฎระเบียบระหว่างประเทศ
 * - GEN_ASSET: เน้นงานร่างเอกสารเฉพาะทาง การเงิน และการตลาด
 */
export type ServiceType = "VISA_ASSET" | "GEN_ASSET"

/**
 * ServiceItem: โครงสร้างข้อมูลหลักของแต่ละบริการ
 * ออกแบบมาให้รองรับระบบ "สถาปัตยกรรมเอกสาร" (Document Architecture)
 */
export interface ServiceItem {
  /** ไอดีอ้างอิงระบบ (เช่น visa-asset) */
  id: string

  /** ประเภทบริการหลักสำหรับการทำ Conditional Styling ใน UI */
  type: ServiceType

  /** * LucideIcon: รับเป็น Component Class
   * เพื่อความยืดหยุ่นในการจัดการขนาดและสีผ่าน Card Component
   */
  icon: LucideIcon

  /** Path ของรูปภาพ (WebP) จาก /public/images/service/ */
  image: string

  /** ชื่อหัวข้อบริการหลัก */
  title: string

  /** รายละเอียดและ Pain Point ที่เราช่วยแก้ไข */
  description: string

  /** ราคาที่ผ่านการคำนวณพื้นฐาน (แสดงผลเป็น String) */
  price: string

  /** ข้อความคำสั่งบนปุ่ม Call to Action (เช่น EXECUTE_PROCESS) */
  cta: string

  /** ข้อความกำกับความเชี่ยวชาญ (เช่น VISA_CORE_SPECIALIST) */
  highlight: string

  /** * Protocol String: ขั้นตอนการทำงานที่แสดงถึงความเป็นระบบ
   * เช่น "ANALYZE > RESTRUCTURE > DEPLOY"
   */
  protocol: string
}

/**
 * ServiceActionProps: สัญญาระหว่าง Component และ Hook สำหรับการสั่งงาน
 */
export interface ServiceActionProps {
  /** ฟังก์ชันการรันคำสั่งงานตามไอดีที่เลือก */
  handleExecute: (id: string, title: string) => void
}
