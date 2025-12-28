/** @format */

// 🛠️ DEFINITION_PROTOCOL: โครงสร้างข้อมูลเคสความสำเร็จ
export interface CaseStudy {
  id: string
  client: string
  title: string
  category: "VISA" | "LEGAL" | "CORPORATE" | "TRANSLATION"
  severity: "LOW" | "MEDIUM" | "HIGH"
  status: "SUCCESS" | "COMPLETED" | "IN_PROGRESS"
  summary: string
  description: string
  content: string
  date: string // ISO Format: YYYY-MM-DD
  imageUrl: string
  stats: { label: string; value: string }[]
}

/**
 * 🎯 SHOWCASE_REGISTRY: ฐานข้อมูลหลัก (Master Database)
 */
export const showcaseRegistry: CaseStudy[] = [
  {
    id: "CASE-001",
    client: "GLOBAL_LOGISTICS_CORP",
    title: "EU Business Infrastructure",
    category: "VISA",
    severity: "HIGH",
    status: "SUCCESS",
    summary:
      "การวางโครงสร้างวีซ่าธุรกิจแบบกลุ่มสำหรับผู้บริหาร 25 ท่านสู่กลุ่มประเทศเชงเก้น",
    description:
      "กระบวนการจัดเตรียมเอกสารระดับองค์กรขนาดใหญ่ เพื่อรองรับการขยายฐานธุรกิจสู่ตลาดยุโรป",
    date: "2024-03-15",
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    stats: [
      { label: "APPROVAL_RATE", value: "100%" },
      { label: "LEAD_TIME", value: "14_DAYS" },
    ],
    content: "รายละเอียดเชิงลึกเกี่ยวกับกลยุทธ์การยื่นเอกสาร...",
  },
  {
    id: "CASE-002",
    client: "PRIVATE_INVESTOR_RE04",
    title: "UK Tier 1 Reconstruction",
    category: "LEGAL",
    severity: "HIGH",
    status: "SUCCESS",
    summary:
      "กู้คืนเคสที่ถูกปฏิเสธ 3 ครั้งซ้อนผ่านการปรับโครงสร้าง Profile ใหม่ทั้งหมด",
    description:
      "การทำ Forensic Audit ข้อมูลคำร้องเดิมเพื่อระบุจุดบกพร่องและสร้างชุดข้อมูลใหม่",
    date: "2024-01-22",
    imageUrl:
      "https://images.unsplash.com/photo-1449156003053-c30420941305?q=80&w=2070",
    stats: [
      { label: "STATUS", value: "OVERTURNED" },
      { label: "COMPLEXITY", value: "LEVEL_05" },
    ],
    content: "กระบวนการวิเคราะห์จุดบกพร่องจากข้อมูลเดิม...",
  },
]

/**
 * 🛰️ REGISTRY_LOGIC: ศูนย์รวมฟังก์ชันจัดการข้อมูล (Business Intelligence)
 * ย้าย Logic จาก UI Components มาไว้ที่นี่เพื่อความ Reusable
 */

// 1. ดึงข้อมูลสำหรับ Slider (แสดงผลหน้าแรก)
export const getSliderCases = (limit: number = 3) => {
  return [...showcaseRegistry]
    .filter((item) => item.status === "SUCCESS")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // เรียงตามความใหม่
    .slice(0, limit)
}

// 2. ดึงข้อมูลตาม ID (สำหรับหน้า Dynamic Route [id])
export const getCaseById = (id: string) => {
  return showcaseRegistry.find((item) => item.id === id)
}

// 3. กรองตามหมวดหมู่ (สำหรับหน้า Filter)
export const getCasesByCategory = (category: CaseStudy["category"]) => {
  return showcaseRegistry.filter((item) => item.category === category)
}
