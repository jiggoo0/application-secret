/**
 * =========================================
 * ✅ Service & Protocol Data Model (Production Ready)
 * File: constants/services-data.ts
 * =========================================
 */

/**
 * ✅ Interface สำหรับโครงสร้างขั้นตอน (Protocol Step)
 * ใช้ร่วมกันทั้ง Service / ProtocolStepper / UI
 */
export interface ProtocolStep {
  title: string;
  description: string;
}

/**
 * =========================================
 * ✅ Global / Reusable Service Protocol
 * ใช้เป็น Default หรือ Fallback ได้
 * =========================================
 */
export const SERVICE_PROTOCOL: ProtocolStep[] = [
  {
    title: "Initial Analysis",
    description: "วิเคราะห์เคสและความเสี่ยงเบื้องต้น",
  },
  {
    title: "Document Structuring",
    description: "จัดโครงสร้างเอกสารให้ตรงเกณฑ์",
  },
  {
    title: "Submission",
    description: "ยื่นเอกสารและติดตามผล",
  },
];

/**
 * =========================================
 * ✅ Interface สำหรับโครงสร้างบริการ (Service)
 * ใช้เป็น Single Source of Truth ทั้ง UI / SEO / JsonLd
 * =========================================
 */
export interface Service {
  id: string;
  slug: string;
  name: string;
  title: string; // สำหรับ SEO / JsonLd
  category:
    | "FINANCIAL"
    | "IMMIGRATION"
    | "DOCUMENTATION"
    | "SYSTEMS"
    | "INFRASTRUCTURE";
  description: string;
  protocol: ProtocolStep[];
  feeEstimate: string;
  timeline: string;
  tagline: string;
  imageUrl: string;
  contactMethod: "LINE";
  tags?: string[];
  features?: string[];
}

/**
 * =========================================
 * ✅ Default Image (Fallback)
 * =========================================
 */
export const DEFAULT_SERVICE_IMAGE =
  "https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Service/Service.webp";

/**
 * =========================================
 * ✅ Services Dataset
 * =========================================
 */
export const SERVICES: Service[] = [
  {
    id: "SRV-FIN-01",
    slug: "financial-account-structuring",
    category: "FINANCIAL",
    name: "วิเคราะห์และวางโครงสร้างเดินบัญชี (Account Structuring)",
    title: "Account Structuring - บริการวางโครงสร้างเดินบัญชี",
    tagline: "ปรับปรุงโปรไฟล์สเตทเม้นให้เข้าเกณฑ์พิจารณาสูงสุด [Case Recovery]",
    description:
      "บริการสำหรับเคสที่ตัวเลขไม่ถึงหรือที่มาเงินไม่ชัดเจน เราออกแบบโครงสร้างเดินบัญชีใหม่ให้มีความน่าเชื่อถือตามเกณฑ์สถาบันการเงินและสถานทูต",
    timeline: "3 - 7 วันทำการ",
    feeEstimate: "ประเมินตามความยากของเคส",
    imageUrl: DEFAULT_SERVICE_IMAGE,
    contactMethod: "LINE",
    protocol: [
      {
        title: "Gap Analysis",
        description:
          "วิเคราะห์จุดบอดของบัญชีเดิมและประเมินยอดที่จำเป็นต่อการอนุมัติ",
      },
      {
        title: "Cashflow Design",
        description: "ออกแบบจังหวะการหมุนเวียนเงินให้เป็นธรรมชาติและตรวจสอบได้",
      },
      {
        title: "Internal Audit",
        description:
          "จำลองการตรวจสอบผ่านระบบ Banking เพื่อยืนยันความพร้อมก่อนใช้งานจริง",
      },
    ],
    tags: ["High Success", "Financial Design", "Case Adjustment"],
    features: ["วิเคราะห์จุดบอด", "ออกแบบ Cashflow", "Audit ความพร้อม"],
  },
  {
    id: "SRV-DOC-01",
    slug: "customized-income-documentation",
    category: "DOCUMENTATION",
    name: "จัดเตรียมชุดเอกสารรับรองรายได้ (Customized Documentation)",
    title: "Income Documentation - จัดเตรียมชุดเอกสารรับรองรายได้",
    tagline: "จัดทำเอกสารสำหรับเคสไม่มีบริษัทหรือไม่มีหน้าร้าน",
    description:
      "จัดทำและปรับจูนเอกสารรับรองรายได้ให้สอดคล้องกับเป้าหมายการยื่นกู้หรือยื่นวีซ่า พร้อมตรวจสอบความสมจริงทุกมิติ",
    timeline: "1 - 2 วันทำการ",
    feeEstimate: "เริ่มต้น ฿1,XXX",
    imageUrl: DEFAULT_SERVICE_IMAGE,
    contactMethod: "LINE",
    protocol: [
      {
        title: "Logic Setup",
        description:
          "กำหนดโปรไฟล์อาชีพที่สมเหตุสมผลเพื่อรองรับแหล่งที่มารายได้",
      },
      {
        title: "Data Customization",
        description: "จัดทำเอกสารด้วยข้อมูลที่ถูกต้องตามรูปแบบหน่วยงาน",
      },
      {
        title: "Verified Appearance",
        description:
          "ตรวจสอบ Font / Stamp / Alignment ให้ใกล้เคียงต้นฉบับมากที่สุด",
      },
    ],
    tags: ["Technical Edit", "Profile Building", "Express Work"],
    features: [
      "กำหนดโปรไฟล์อาชีพ",
      "เอกสารความละเอียดสูง",
      "ตรวจสอบความสมจริง",
    ],
  },
  {
    id: "SRV-IMM-01",
    slug: "flight-hotel-confirmed-status",
    category: "IMMIGRATION",
    name: "สำรองตั๋วและโรงแรมสถานะจริง (Confirmed GDS Status)",
    title: "GDS Reservation - สำรองตั๋วและโรงแรมสถานะจริง",
    tagline: "ออกใบจองรหัสจริง ตรวจสอบสถานะได้บนเว็บทางการ",
    description:
      "บริการสำรองผ่านระบบ GDS สำหรับยื่นวีซ่า ได้รหัส PNR ที่ตรวจสอบได้จริงโดยไม่ต้องชำระค่าตั๋วเต็มจำนวน",
    timeline: "2 - 6 ชั่วโมง",
    feeEstimate: "฿450 - ฿XXX",
    imageUrl: DEFAULT_SERVICE_IMAGE,
    contactMethod: "LINE",
    protocol: [
      {
        title: "System Injection",
        description:
          "บันทึกข้อมูลเข้าสู่ระบบ GDS สากลในสถานะ Hold หรือ Confirmed",
      },
      {
        title: "PNR Validation",
        description: "ตรวจสอบรหัสกับเว็บไซต์ทางการของสายการบินหรือโรงแรม",
      },
      {
        title: "Visa Documentation",
        description: "จัดส่งไฟล์ E-Booking มาตรฐานสำหรับการยื่นวีซ่า",
      },
    ],
    tags: ["Visa Support", "Real System", "No-Risk"],
    features: ["PNR จริง", "รองรับทุกสายการบิน", "ใช้ยื่นวีซ่าได้ทันที"],
  },
  {
    id: "SRV-SYS-01",
    slug: "complete-profile-infrastructure",
    category: "SYSTEMS",
    name: "วางโครงสร้างโปรไฟล์แบบครบวงจร (Complete Infra-Setup)",
    title: "Infra-Setup - วางโครงสร้างโปรไฟล์ครบวงจร",
    tagline: "สร้างโปรไฟล์ใหม่ตั้งแต่ศูนย์เพื่อเป้าหมายระดับสูง",
    description:
      "ดูแลตั้งแต่การเงิน เอกสาร และโครงสร้างธุรกิจ สำหรับลูกค้าที่ต้องการผลลัพธ์ระยะยาวและความน่าเชื่อถือระดับสูง",
    timeline: "1 - 3 เดือน",
    feeEstimate: "ประเมินตามเป้าหมาย",
    imageUrl: DEFAULT_SERVICE_IMAGE,
    contactMethod: "LINE",
    protocol: [
      {
        title: "Infrastructure Design",
        description: "วางโครงสร้างตัวตนทางธุรกิจและการเงินในระยะยาว",
      },
      {
        title: "Monthly Monitoring",
        description: "ติดตามและปรับปรุงข้อมูลรายเดือนอย่างต่อเนื่อง",
      },
      {
        title: "Final Compliance Check",
        description: "ตรวจสอบความพร้อมขั้นสุดท้ายก่อนใช้งานจริง",
      },
    ],
    tags: ["Elite Service", "Long-term Planning"],
    features: ["ดูแลระยะยาว", "ปรับโปรไฟล์รายเดือน", "Compliance Check"],
  },
];
