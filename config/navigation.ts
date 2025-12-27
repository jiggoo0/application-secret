/** @format */
import {
  Home,
  FileText,
  MessageSquare,
  LayoutGrid,
  ShieldAlert,
  Gavel,
  UserCheck,
  Zap,
} from "lucide-react"

/**
 * 🛰️ NAVIGATION_CONFIG_PROTOCOL
 * แผนผังโครงสร้างการนำทางทั้งหมดของระบบ (Single Page Strategy)
 * สไตล์: Industrial Sharp (Technical Manifest)
 */
export const navigationConfig = {
  mainNav: [
    {
      name: "หน้าหลัก",
      href: "/",
      label: "HOME_BASE",
      icon: Home,
    },
    {
      name: "เกี่ยวกับเรา",
      href: "/#about-section",
      label: "IDENTITY_LOG",
      icon: UserCheck,
    },
    {
      name: "บริการทั้งหมด",
      href: "/#services-index", // 🔗 ลิงก์ตรงเข้าสู่ Section ในหน้าหลัก
      label: "SOLUTIONS",
      icon: LayoutGrid,
    },
    {
      name: "รีวิว/บันทึก",
      href: "/#success-logs",
      label: "SUCCESS_LOG",
      icon: Zap,
    },
    {
      name: "ติดต่อสอบถาม",
      href: "/contact",
      label: "INQUIRY",
      icon: MessageSquare,
    },
  ],

  footerNav: {
    // ✅ ปรับให้เชื่อมโยงกับ Anchor Link ภายในหน้าหลัก เพื่อลดจำนวน Page ที่ไม่จำเป็น
    solutions: [
      { name: "All Solutions Index", href: "/#services-index" },
      { name: "Service Workflow", href: "/#services-index" },
    ],
    company: [
      { name: "About Identity", href: "/#about-section" },
      { name: "Review Logs", href: "/#success-logs" },
      { name: "Contact Protocol", href: "/contact" },
    ],
    legal: [
      {
        name: "Privacy Protocol",
        href: "/privacy",
        label: "PRIVACY_CONTROL",
        icon: ShieldAlert,
      },
      {
        name: "SLA Policy",
        href: "/terms",
        label: "TERMS_OF_SERVICE",
        icon: Gavel,
      },
    ],
  },

  actions: {
    primary: {
      name: "Order_Service",
      href: "/contact",
      label: "EXECUTE_PAYLOAD",
      icon: FileText,
    },
  },
} as const

// 🏷️ TYPE_EXPORT_PROTOCOL
export type NavigationConfig = typeof navigationConfig
export type NavItem = (typeof navigationConfig.mainNav)[number]
