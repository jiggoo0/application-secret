/** @format */
import React from "react"
import {
  FileSearch,
  PenTool,
  Plane,
  TrendingUp,
  Layers,
  CreditCard,
  BarChart3,
  LucideIcon,
} from "lucide-react"

export interface ServiceItem {
  id: string
  type: "VISA_ASSET" | "GEN_ASSET"
  icon: LucideIcon
  image: string
  title: string
  description: string
  price: string
  cta: string
  highlight: string
  protocol: string // เพิ่มเพื่อกิมมิคขั้นตอนการทำงาน
}

export const servicesData: ServiceItem[] = [
  {
    id: "visa-asset",
    type: "VISA_ASSET",
    icon: FileSearch,
    image: "/images/service/วีซ่า.webp",
    title: "รับจบเรื่องวีซ่า (สายตรง)",
    description:
      "จัดชุดเอกสารใหม่ให้เนียนกริ๊บ ตรงเงื่อนไขสถานทูตกำหนด เอกสารไม่ครบเราเติมให้จนเต็ม",
    price: "3,000.-",
    cta: "ACCESS_PROTOCOL",
    highlight: "VISA_CORE_SPECIALIST",
    protocol: "ANALYZE > RESTRUCTURE > DEPLOY",
  },
  {
    id: "gen-letter",
    type: "GEN_ASSET",
    icon: PenTool,
    image: "/images/service/บริการจดหมาย.webp",
    title: "รับร่างจดหมายสำคัญ",
    description:
      "Cover Letter แบบที่คนอ่านต้องเชื่อ หรือจดหมายสปอนเซอร์เพิ่มความน่าเชื่อถือระดับมือโปร",
    price: "1,000.-",
    cta: "EXECUTE_DRAFT",
    highlight: "PROFILE_ENHANCEMENT",
    protocol: "DRAFT > REFINE > FINALIZE",
  },
  {
    id: "visa-booking",
    type: "VISA_ASSET",
    icon: Plane,
    image: "/images/service/ตั๋วเครื่องบิน.webp",
    title: "ใบจองตั๋วเครื่องบิน · โรงแรม",
    description:
      "ระบบแท้ 100% เช็กชื่อได้ใน Google / Ebooking งานด่วน 1 วันเสร็จ รองรับทุกประเทศ",
    price: "1,000.-",
    cta: "PRIORITY_RESERVE",
    highlight: "VERIFIED_SYSTEM_ONLY",
    protocol: "RESERVE > VERIFY > CONFIRM",
  },
  {
    id: "gen-loan",
    type: "GEN_ASSET",
    icon: TrendingUp,
    image: "/images/service/สินเชื่อ.webp",
    title: "ที่ปรึกษาปั้นเคสกู้เงิน",
    description:
      "วิเคราะห์โปรไฟล์ ปรับแต่งจุดอ่อนให้แบงก์ยอมปล่อยกู้ ปั้นเคสยากให้เป็นเคสง่าย",
    price: "3,000.-",
    cta: "LOAN_CONSULTANCY",
    highlight: "FINANCIAL_ARCHITECT",
    protocol: "SCAN > ADJUST > APPROVAL",
  },
  {
    id: "gen-modify",
    type: "GEN_ASSET",
    icon: Layers,
    image: "/images/service/แก้ไขเอกสาร.webp",
    title: "แก้-สร้าง-จัดหาเอกสาร",
    description:
      "อยากแก้จุดไหน สร้างใหม่ยังไง สั่งมา... งานเนียนระดับเซียน ตรงตามโจทย์ที่คุณต้องการ",
    price: "เริ่ม 400.-",
    cta: "REQUEST_MODIFICATION",
    highlight: "MASTER_CRAFTSMANSHIP",
    protocol: "SCAN > MODIFY > VALIDATE",
  },
  {
    id: "gen-card",
    type: "GEN_ASSET",
    icon: CreditCard,
    image: "/images/service/บัตร.webp",
    title: "ผลิตชิ้นงานบัตรแข็ง / อ่อน",
    description:
      "เน้นความปลอดภัยสูงสุด ชนมือทำก่อน จ่ายทีหลัง ส่งงานผ่าน Grab / รถทัวร์ เท่านั้น",
    price: "4,000.-",
    cta: "ORDER_PRODUCTION",
    highlight: "SECURE_HANDOVER_ONLY",
    protocol: "BUILD > VERIFY > DELIVERY",
  },
  {
    id: "gen-marketing",
    type: "GEN_ASSET",
    icon: BarChart3,
    image: "/images/service/ภาพลักษณ์.webp",
    title: "ดูแลการตลาดครบวงจร",
    description:
      "คุมภาพลักษณ์ธุรกิจให้ขลัง (สายขาว-เทา-ดำ) วิเคราะห์ฐานลูกค้า ปั้นคอนเทนต์ล่วงหน้า 3 เดือน",
    price: "3,000.-",
    cta: "MARKETING_STRATEGY",
    highlight: "IDENTITY_CONSULTANT",
    protocol: "PLAN > CREATE > OPTIMIZE",
  },
]
