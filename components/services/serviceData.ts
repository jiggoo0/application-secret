/** @format */
import {
  FileSearch,
  PenTool,
  Plane,
  TrendingUp,
  Layers,
  CreditCard,
  FileText,
  LucideIcon,
} from 'lucide-react'

// --- 1. DATA_INTERFACES (Type Safety Full Coverage) ---
export interface ServicePrice {
  base: string
  suffix?: string
}

export interface ServiceTechnical {
  highlight: string
  protocol: string[]
  status: 'OPERATIONAL' | 'HIGH_DEMAND' | 'DEVELOPMENT' | 'SYSTEM_CHECK'
}

export interface ServiceItem {
  id: string
  code: string
  category: 'IMMIGRATION' | 'FINANCIAL' | 'DOCUMENTATION' | 'INFRASTRUCTURE' | 'SYSTEMS'
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

// --- 2. CORE_SERVICE_REGISTRY v3.3.1 ---
export const services: ServiceItem[] = [
  {
    id: 'loan-strategy-001',
    code: 'SRV-FIN-01',
    category: 'FINANCIAL',
    type: 'GEN_ASSET',
    icon: TrendingUp,
    image:
      'https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Service/mail-service.webp',
    title: 'ที่ปรึกษาสินเชื่อส่วนบุคคลและธุรกิจ',
    description:
      'ช่วยวิเคราะห์โปรไฟล์และเลือกแผนที่เหมาะสมที่สุด จัดชุดเอกสารให้ครบตามเงื่อนไขแบงก์ ดูแลการยื่นกู้ให้แบบมืออาชีพโดยที่คุณไม่ต้องจัดการเอง',
    price: { base: 'X,XXX' },
    cta: { label: 'คุยแผนการกู้', action: '/contact?ref=loan' },
    technical: {
      highlight: 'LOAN_STRATEGY',
      protocol: ['เช็กโปรไฟล์', 'เตรียมเอกสาร', 'ส่งยื่นมืออาชีพ'],
      status: 'OPERATIONAL',
    },
  },
  {
    id: 'travel-booking-001',
    code: 'SRV-IMM-01',
    category: 'IMMIGRATION',
    type: 'VISA_ASSET',
    icon: Plane,
    image:
      'https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Service/mail-service.webp',
    title: 'ตั๋วเครื่องบินและโรงแรม (ตรวจสอบได้จริง)',
    description:
      'จัดการจองตั๋วและที่พักทั่วโลก พร้อม E-booking และ Google ค้นหาสถานะจริง การันตีงานด่วนจบไวภายใน 1 วัน',
    price: { base: 'ราคาพิเศษ' },
    cta: { label: 'เช็กราคาห้องพัก/ตั๋ว', action: '/contact?ref=booking' },
    technical: {
      highlight: 'REAL_TIME_BOOKING',
      protocol: ['จองผ่านระบบ', 'ยืนยันสถานะ', 'ส่งใบจองทางการ'],
      status: 'OPERATIONAL',
    },
  },
  {
    id: 'legal-writing-001',
    code: 'SRV-DOC-01',
    category: 'DOCUMENTATION',
    type: 'GEN_ASSET',
    icon: PenTool,
    image:
      'https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Service/mail-service.webp',
    title: 'ร่างจดหมายสำคัญโดยผู้เชี่ยวชาญ',
    description:
      'รับเขียนจดหมาย Cover Letter หรือจดหมายรับรอง/สปอนเซอร์ ทั้งไทยและอังกฤษ ปรับโทนให้น่าเชื่อถือ เพิ่มโอกาสผ่านได้จริง',
    price: { base: '1,000' },
    cta: { label: 'เริ่มร่างเนื้อหา', action: '/contact?ref=writing' },
    technical: {
      highlight: 'PROFESSIONAL_CONTENT',
      protocol: ['คุยเนื้อหาหลัก', 'เรียบเรียงภาษา', 'ส่งเล่มจริง'],
      status: 'OPERATIONAL',
    },
  },
  {
    id: 'visa-work-001',
    code: 'SRV-IMM-02',
    category: 'IMMIGRATION',
    type: 'VISA_ASSET',
    icon: FileSearch,
    image:
      'https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Service/mail-service.webp',
    title: 'ดูแลเอกสารยื่นวีซ่า (สายทำงาน)',
    description:
      'จัดชุดเอกสารครบและเนี้ยบที่สุด ปรับข้อมูลให้สอดคล้องเกณฑ์ประเทศปลายทาง ผลลัพธ์ผ่านฉลุยไม่มีสะดุด',
    price: { base: 'X,XXX' },
    cta: { label: 'ปรึกษาการยื่น', action: '/contact?ref=visa' },
    technical: {
      highlight: 'VISA_PREPARATION',
      protocol: ['เช็กเอกสารเดิม', 'เติมส่วนขาด', 'จัดชุดพร้อมยื่น'],
      status: 'OPERATIONAL',
    },
  },
  {
    id: 'doc-creation-001',
    code: 'SRV-DOC-02',
    category: 'DOCUMENTATION',
    type: 'GEN_ASSET',
    icon: FileText,
    image:
      'https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Service/mail-service.webp',
    title: 'แก้ไขและจัดหาเอกสารเฉพาะทาง',
    description:
      'ปรับแก้หรือสร้างเอกสารใหม่ตามโจทย์ จัดหาเอกสารแม่นยำ งานเนียนและรวดเร็ว สำหรับงานด่วนพิเศษ',
    price: { base: '450', suffix: '- 8XX' },
    cta: { label: 'ส่งโจทย์ให้แอดมิน', action: '/contact?ref=doc-fix' },
    technical: {
      highlight: 'CUSTOM_DOCUMENT',
      protocol: ['รับบรีฟละเอียด', 'ดำเนินการผลิต', 'เช็กความถูกต้อง'],
      status: 'HIGH_DEMAND',
    },
  },
  {
    id: 'vifily-system-001',
    code: 'SRV-SYS-01',
    category: 'SYSTEMS',
    type: 'GEN_ASSET',
    icon: Layers,
    image:
      'https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Service/mail-service.webp',
    title: 'เอกสารรับรองดิจิทัล (Vifily)',
    description:
      'สร้างความมั่นใจระดับสากลด้วย Vifily ออกเอกสารรับรองพร้อม QR Code ตรวจสอบโปรไฟล์ได้ทั่วโลก',
    price: { base: 'XXX', suffix: '- X,XXX' },
    cta: { label: 'เปิดระบบ Vifily', action: '/contact?ref=vifily' },
    technical: {
      highlight: 'DIGITAL_VERIFY',
      protocol: ['อัปโหลดฐานข้อมูล', 'สร้าง QR พิเศษ', 'เปิดระบบเช็กสถานะ'],
      status: 'OPERATIONAL',
    },
  },
  {
    id: 'card-production-001',
    code: 'SRV-INF-01',
    category: 'INFRASTRUCTURE',
    type: 'GEN_ASSET',
    icon: CreditCard,
    image:
      'https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Service/mail-service.webp',
    title: 'ผลิตบัตรจริงเกรดพรีเมียม',
    description:
      'งานพิมพ์คุณภาพสูง พร้อมระบบจัดส่งรัดกุมและเป็นส่วนตัว เพื่อความปลอดภัยและเป็นความลับสูงสุด',
    price: { base: 'X,XXX' },
    cta: { label: 'ดูตัวอย่างบัตร', action: '/contact?ref=card' },
    technical: {
      highlight: 'SECURE_PRODUCTION',
      protocol: ['สรุปแบบบัตร', 'ผลิตชิ้นงานจริง', 'ส่งมอบส่วนตัว'],
      status: 'OPERATIONAL',
    },
  },
]
