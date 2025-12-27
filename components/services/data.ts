/** @format */
import {
  FileSearch,
  PenTool,
  Plane,
  TrendingUp,
  Layers,
  CreditCard,
  BarChart3,
} from "lucide-react"
import { ServiceItem } from "./types"

/**
 * 🛰️ SERVICES_REGISTRY_DATA
 * ----------------------------------------------------------------
 * ฐานข้อมูลบริการหลักตามโครงสร้าง ServiceItem Interface
 * ข้อมูลนี้จะถูกนำไป Render ใน ServiceCard และ ServicesSection
 */
export const services: ServiceItem[] = [
  {
    id: "visa-strategy-001",
    code: "SRV-VSA-01",
    category: "IMMIGRATION",
    type: "VISA_ASSET",
    icon: FileSearch,
    image: "/images/service/วีซ่า.webp",
    title: "Visa Solutions & Strategy",
    description:
      "วิเคราะห์และวางโครงสร้างเอกสารสำหรับเคสยาก หรือเคยถูกปฏิเสธ โดยใช้มาตรฐาน Embassy-Grade",
    price: { base: "4,x00" },
    cta: { label: "EXECUTE_PROTOCOL", action: "/contact?ref=visa" },
    technical: {
      highlight: "EMBASSY_GRADE_CASE",
      protocol: ["ASSESS", "RESTRUCTURE", "SUBMIT_READY"],
      status: "OPERATIONAL",
    },
  },
  {
    id: "financial-tuning-001",
    code: "SRV-FIN-01",
    category: "FINANCIAL",
    type: "GEN_ASSET",
    icon: TrendingUp,
    image: "/images/service/สินเชื่อ.webp",
    title: "Loan Profile Engineering",
    description:
      "ปรับจูนโปรไฟล์การเงินและจัดโครงสร้างหลักฐานรายได้ เพื่อเพิ่มโอกาสการอนุมัติสินเชื่อสูงสุด",
    price: { base: "3,xxx", suffix: "+ Success Fee" },
    cta: { label: "STRATEGIZE", action: "/contact?ref=loan" },
    technical: {
      highlight: "CREDIT_PROFILE_ENGINEER",
      protocol: ["ANALYZE", "FIX", "MATCH_SOURCE"],
      status: "OPERATIONAL",
    },
  },
  {
    id: "doc-verify-001",
    code: "SRV-DOC-01",
    category: "DOCUMENTATION",
    type: "GEN_ASSET",
    icon: Layers,
    image: "/images/service/แก้ไขเอกสาร.webp",
    title: "Smart Verification System",
    description:
      "ระบบสร้างเอกสารดิจิทัลพร้อม QR Verification และ Landing Page ส่วนตัวเพื่อตรวจสอบความถูกต้อง",
    price: { base: "1,xxx" },
    cta: { label: "DEPLOY_SYSTEM", action: "/contact?ref=verify" },
    technical: {
      highlight: "ONLINE_VERIFICATION_READY",
      protocol: ["CREATE", "VERIFY", "PUBLISH"],
      status: "HIGH_DEMAND",
    },
  },
  {
    id: "secure-print-001",
    code: "SRV-PRT-01",
    category: "INFRASTRUCTURE",
    type: "GEN_ASSET",
    icon: CreditCard,
    image: "/images/service/บัตร.webp",
    title: "Confidential Production",
    description:
      "งานพิมพ์บัตรและเอกสารความปลอดภัยสูง พร้อมกระบวนการส่งมอบแบบเข้ารหัส (Confidential Handover)",
    price: { base: "4,500" },
    cta: { label: "START_PRODUCTION", action: "/contact?ref=print" },
    technical: {
      highlight: "ENCRYPTED_DELIVERY",
      protocol: ["DESIGN", "PRODUCE", "HANDOVER"],
      status: "OPERATIONAL",
    },
  },
  {
    id: "verified-booking-001",
    code: "SRV-VSA-02",
    category: "IMMIGRATION",
    type: "VISA_ASSET",
    icon: Plane,
    image: "/images/service/ตั๋วเครื่องบิน.webp",
    title: "Verified Booking Node",
    description:
      "สำรองตั๋วเครื่องบินและโรงแรมผ่านระบบ Global Distribution System (GDS) ที่ตรวจสอบได้จริง",
    price: { base: "4xx", suffix: "/ 1,xxx Express" },
    cta: { label: "ISSUE_TICKET", action: "/contact?ref=booking" },
    technical: {
      highlight: "REAL_SYSTEM_CHECKABLE",
      protocol: ["RESERVE", "VALIDATE", "ISSUE"],
      status: "OPERATIONAL",
    },
  },
  {
    id: "legal-writing-001",
    code: "SRV-DOC-02",
    category: "DOCUMENTATION",
    type: "GEN_ASSET",
    icon: PenTool,
    image: "/images/service/บริการจดหมาย.webp",
    title: "Professional Representation",
    description:
      "ร่างจดหมายชี้แจงและนิติกรรมด้วยภาษาทางการ (Embassy Tone) เพื่อการสื่อสารระดับสากล",
    price: { base: "1,000", suffix: "- 3,000" },
    cta: { label: "DRAFT_NOW", action: "/contact?ref=writing" },
    technical: {
      highlight: "OFFICIAL_REPRESENTATION",
      protocol: ["DRAFT", "REVIEW", "FINAL"],
      status: "OPERATIONAL",
    },
  },
  {
    id: "auto-marketing-001",
    code: "SRV-SYS-01",
    category: "INFRASTRUCTURE",
    type: "GEN_ASSET",
    icon: BarChart3,
    image: "/images/service/บัตร.webp",
    title: "Marketing Automation Stack",
    description:
      "วางระบบ AI และการตลาดอัตโนมัติ เพื่อขับเคลื่อนธุรกิจให้ทำงานได้ตลอด 24 ชั่วโมง",
    price: { base: "4,xxx" },
    cta: { label: "ACTIVATE_AUTO", action: "/contact?ref=auto" },
    technical: {
      highlight: "24H_AUTOMATION_STACK",
      protocol: ["PLAN", "AUTOMATE", "SCALE"],
      status: "DEVELOPMENT",
    },
  },
]
