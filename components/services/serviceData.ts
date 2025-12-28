/** @format */
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

// --- 1. DATA_INTERFACES (คงเดิมเพื่อความปลอดภัยของระบบ) ---
export interface ServicePrice {
  base: string
  suffix?: string
}

export interface ServiceTechnical {
  highlight: string
  protocol: string[]
  status: "OPERATIONAL" | "HIGH_DEMAND" | "DEVELOPMENT" | "SYSTEM_CHECK"
}

export interface ServiceItem {
  id: string
  code: string
  category:
    | "IMMIGRATION"
    | "FINANCIAL"
    | "DOCUMENTATION"
    | "INFRASTRUCTURE"
    | "SYSTEMS"
  type: string
  icon: LucideIcon
  image: string
  title: string
  description: string
  price: ServicePrice
  cta: {
    label: string
    action: string
  }
  technical: ServiceTechnical
}

// --- 2. CORE_SERVICE_REGISTRY ---
// ปรับปรุงเนื้อหาให้ดูอบอุ่น มั่นใจ และลดความกังวล
export const services: ServiceItem[] = [
  {
    id: "visa-strategy-001",
    code: "SRV-VSA-01",
    category: "IMMIGRATION",
    type: "VISA_ASSET",
    icon: FileSearch,
    image:
      "https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Service/Service1.webp",
    title: "ที่ปรึกษาวีซ่าและวางแผนเอกสาร",
    description:
      "วิเคราะห์และช่วยจัดเตรียมเอกสารสำหรับเคสที่กังวล หรือเคยมีประวัติไม่ผ่าน เพื่อสร้างความมั่นใจสูงสุด",
    price: { base: "4,x00" },
    cta: { label: "ปรึกษาผู้เชี่ยวชาญ", action: "/contact?ref=visa" },
    technical: {
      highlight: "CARE_BY_EXPERT",
      protocol: ["วิเคราะห์", "ปรับแก้", "เตรียมความพร้อม"],
      status: "OPERATIONAL",
    },
  },
  {
    id: "financial-tuning-001",
    code: "SRV-FIN-01",
    category: "FINANCIAL",
    type: "GEN_ASSET",
    icon: TrendingUp,
    image:
      "https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Service/credit.webp",
    title: "ดูแลโปรไฟล์และการเงิน",
    description:
      "ช่วยแนะนำการจัดโครงสร้างรายได้และหลักฐานการเงินให้ถูกต้อง เพื่อเพิ่มโอกาสการอนุมัติสินเชื่อ",
    price: { base: "3,xxx", suffix: "+ Success Fee" },
    cta: { label: "วางแผนการเงิน", action: "/contact?ref=loan" },
    technical: {
      highlight: "FINANCIAL_CARE",
      protocol: ["ตรวจสอบ", "ปรับปรุง", "คัดสรรแหล่งเงิน"],
      status: "OPERATIONAL",
    },
  },
  {
    id: "doc-verify-001",
    code: "SRV-DOC-01",
    category: "DOCUMENTATION",
    type: "GEN_ASSET",
    icon: Layers,
    image:
      "https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Service/document-fix.webp",
    title: "ระบบตรวจสอบเอกสารออนไลน์",
    description:
      "สร้างความมั่นใจด้วยระบบตรวจสอบความถูกต้องผ่าน QR Code พร้อมหน้าข้อมูลส่วนตัวที่ปลอดภัย",
    price: { base: "1,xxx" },
    cta: { label: "เริ่มใช้งานระบบ", action: "/contact?ref=verify" },
    technical: {
      highlight: "VERIFICATION_SECURE",
      protocol: ["สร้างข้อมูล", "ตรวจทาน", "เปิดใช้งาน"],
      status: "HIGH_DEMAND",
    },
  },
  {
    id: "secure-print-001",
    code: "SRV-PRT-01",
    category: "INFRASTRUCTURE",
    type: "GEN_ASSET",
    icon: CreditCard,
    image:
      "https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Service/card.webp",
    title: "จัดทำบัตรและเอกสารสำคัญ",
    description:
      "ดูแลงานพิมพ์ระดับมาตรฐานความปลอดภัยสูง พร้อมขั้นตอนการส่งมอบที่รัดกุมและเป็นส่วนตัว",
    price: { base: "4,500" },
    cta: { label: "แจ้งความต้องการ", action: "/contact?ref=print" },
    technical: {
      highlight: "HIGH_SECURITY_PRINT",
      protocol: ["ออกแบบ", "ผลิต", "ส่งมอบปลอดภัย"],
      status: "OPERATIONAL",
    },
  },
  {
    id: "verified-booking-001",
    code: "SRV-VSA-02",
    category: "IMMIGRATION",
    type: "VISA_ASSET",
    icon: Plane,
    image:
      "https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Service/ticket.webp",
    title: "จองตั๋วและที่พักเพื่อยื่นวีซ่า",
    description:
      "บริการช่วยสำรองตั๋วเครื่องบินและโรงแรมที่ตรวจสอบสถานะได้จริง เพื่อความราบรื่นในการยื่นเรื่อง",
    price: { base: "4xx", suffix: "/ 1,xxx Express" },
    cta: { label: "จองทันที", action: "/contact?ref=booking" },
    technical: {
      highlight: "VERIFIED_STATUS",
      protocol: ["สำรองที่นั่ง", "ตรวจสอบ", "ยืนยันผล"],
      status: "OPERATIONAL",
    },
  },
  {
    id: "legal-writing-001",
    code: "SRV-DOC-02",
    category: "DOCUMENTATION",
    type: "GEN_ASSET",
    icon: PenTool,
    image:
      "https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Service/mail-service.webp",
    title: "ร่างจดหมายและเอกสารทางการ",
    description:
      "ช่วยเขียนจดหมายชี้แจงและเอกสารสำคัญด้วยภาษาที่เป็นงานเป็นการและถูกต้องตามมาตรฐาน",
    price: { base: "1,000", suffix: "- 3,000" },
    cta: { label: "เริ่มร่างเอกสาร", action: "/contact?ref=writing" },
    technical: {
      highlight: "PROFESSIONAL_DRAFT",
      protocol: ["ร่างเนื้อหา", "ตรวจทาน", "จัดทำเล่มจริง"],
      status: "OPERATIONAL",
    },
  },
  {
    id: "auto-marketing-001",
    code: "SRV-SYS-01",
    category: "INFRASTRUCTURE",
    type: "GEN_ASSET",
    icon: BarChart3,
    image:
      "https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Service/branding.webp",
    title: "ตัวช่วยดูแลธุรกิจอัตโนมัติ",
    description:
      "วางแผนการดูแลลูกค้าและโปรโมทธุรกิจอัตโนมัติ เพื่อให้ธุรกิจของคุณเติบโตได้ต่อเนื่อง",
    price: { base: "4,xxx" },
    cta: { label: "เปิดใช้งานตัวช่วย", action: "/contact?ref=auto" },
    technical: {
      highlight: "BUSINESS_GROWTH",
      protocol: ["วางแผน", "ตั้งค่าดูแล", "ขยายผล"],
      status: "DEVELOPMENT",
    },
  },
]
