/**
 * @format
 * @description SERVICE_REGISTRY: High-Precision Data Nodes (V3.5.1-HOTFIX)
 * ✅ FIX: Removed unused icons, added strict interface, passed lint-check
 */

import {
  FileSearch,
  TrendingUp,
  Layers,
  CreditCard,
  BarChart3,
  type LucideIcon,
} from 'lucide-react'

// 🏛️ INTERFACE_DEFINITION: บังคับใช้โครงสร้างข้อมูลที่เข้มงวด
export interface ServiceItem {
  id: string
  code: string
  category: 'FINANCIAL' | 'IMMIGRATION' | 'SYSTEMS' | 'DOCUMENTATION' | 'INFRASTRUCTURE'
  type: 'GEN_ASSET' | 'VISA_ASSET'
  icon: LucideIcon
  image: string
  title: string
  description: string
  price: {
    base: string
    suffix: string
  }
  cta: {
    label: string
    action: string
  }
  technical: {
    highlight: string
    protocol: string[]
    status: 'OPERATIONAL' | 'HIGH_DEMAND' | 'MAINTENANCE'
  }
}

const SERVICE_IMAGE =
  'https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Service/service.webp'

/**
 * 🛰️ SERVICES_REGISTRY
 * ข้อมูลบริการทั้งหมดที่ถูกเชื่อมโยงกับ UI ผ่าน Type-Safe Interface
 */
export const services: ServiceItem[] = [
  {
    id: 'loan-consult-001',
    code: 'SRV-FIN-01',
    category: 'FINANCIAL',
    type: 'GEN_ASSET',
    icon: TrendingUp,
    image: SERVICE_IMAGE,
    title: 'Asset & Loan Strategy',
    description:
      'วิเคราะห์โปรไฟล์เชิงลึกเพื่อการยื่นกู้สินเชื่อส่วนบุคคลและธุรกิจ จัดชุดเอกสารตามมาตรฐานสถาบันการเงิน (Tier-1)',
    price: { base: '2,500', suffix: 'START_FEE' },
    cta: { label: 'ปรึกษาสินเชื่อ', action: '/contact?ref=loan' },
    technical: {
      highlight: 'LOAN_STRATEGY',
      protocol: ['Profile_Audit', 'Document_Stacking', 'Bank_Alignment'],
      status: 'OPERATIONAL',
    },
  },
  {
    id: 'visa-doc-care-001',
    code: 'SRV-VSA-02',
    category: 'IMMIGRATION',
    type: 'VISA_ASSET',
    icon: FileSearch,
    image: SERVICE_IMAGE,
    title: 'Professional Visa Logistics',
    description:
      'ตรวจสอบและจัดการชุดเอกสารสำหรับการยื่นวีซ่าทุกประเภท โดยเฉพาะสายทำงานและกลุ่มพำนักระยะยาว',
    price: { base: '3,000', suffix: 'PER_CASE' },
    cta: { label: 'ดูแลเอกสารวีซ่า', action: '/contact?ref=visa' },
    technical: {
      highlight: 'VISA_DOCUMENT_CARE',
      protocol: ['Requirement_Matching', 'Data_Refinement', 'Final_Stack_Check'],
      status: 'HIGH_DEMAND',
    },
  },
  {
    id: 'vifily-verify-001',
    code: 'SRV-SYS-01',
    category: 'SYSTEMS',
    type: 'GEN_ASSET',
    icon: BarChart3,
    image: SERVICE_IMAGE,
    title: 'Vifily Digital Verification',
    description:
      'ออกเอกสารรับรองดิจิทัลพร้อมระบบตรวจสอบความถูกต้องผ่าน QR Code (Real-time Database)',
    price: { base: '1,200', suffix: 'GEN_CODE' },
    cta: { label: 'สร้างเอกสารรับรอง', action: '/contact?ref=vifily' },
    technical: {
      highlight: 'QR_VERIFICATION',
      protocol: ['Data_Injection', 'QR_Mapping', 'Live_Deployment'],
      status: 'OPERATIONAL',
    },
  },
  {
    id: 'doc-custom-001',
    code: 'SRV-DOC-02',
    category: 'DOCUMENTATION',
    type: 'GEN_ASSET',
    icon: Layers,
    image: SERVICE_IMAGE,
    title: 'Custom Document Synthesis',
    description:
      'บริการปรับแต่งและร่างเอกสารใหม่ตามเงื่อนไขเฉพาะทาง (Tailor-made) สำหรับเคสเร่งด่วนและงานซับซ้อน',
    price: { base: '1,500', suffix: 'ESTIMATE' },
    cta: { label: 'แจ้งความต้องการ', action: '/contact?ref=custom-doc' },
    technical: {
      highlight: 'CUSTOM_DOCUMENT',
      protocol: ['Need_Assessment', 'Draft_Production', 'Quality_Control'],
      status: 'OPERATIONAL',
    },
  },
  {
    id: 'card-production-001',
    code: 'SRV-INF-01',
    category: 'INFRASTRUCTURE',
    type: 'GEN_ASSET',
    icon: CreditCard,
    image: SERVICE_IMAGE,
    title: 'Smart Card Infrastructure',
    description:
      'ผลิตบัตรประจำตัว บัตรสมาชิก ทั้งรูปแบบบัตรแข็งและบัตรอ่อน พร้อมระบบความปลอดภัยในการขนส่ง',
    price: { base: '500', suffix: 'MIN_ORDER' },
    cta: { label: 'สั่งผลิตบัตร', action: '/contact?ref=card' },
    technical: {
      highlight: 'SECURE_PRODUCTION',
      protocol: ['Physical_Print', 'ID_Validation', 'Secure_Delivery'],
      status: 'OPERATIONAL',
    },
  },
]
