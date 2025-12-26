import {
  Home,
  FileText,
  History,
  MessageSquare,
  LayoutGrid,
  HelpCircle,
} from "lucide-react"

export const navigationConfig = {
  // 🧭 MAIN_NAVIGATION: ปรับปรุง href เพื่อให้ Scroll ในหน้า Home ได้จริง
  mainNav: [
    { name: "หน้าหลัก", href: "/", label: "HOME_BASE", icon: Home },
    {
      name: "บริการทั้งหมด",
      href: "/#services-index", // เชื่อมกับ id ใน ServicesSection.tsx
      label: "SOLUTIONS",
      icon: LayoutGrid,
    },
    {
      name: "รีวิว/บันทึก",
      href: "/#success-logs", // เชื่อมกับ id ใน ReviewsSection.tsx
      label: "SUCCESS_LOG",
      icon: History,
    },
    {
      name: "คำถามที่พบบ่อย",
      href: "/#faq-registry", // เชื่อมกับ id ใน FAQSection.tsx
      label: "FAQ_DATABASE",
      icon: HelpCircle,
    },
    {
      name: "ติดต่อสอบถาม",
      href: "/contact",
      label: "INQUIRY",
      icon: MessageSquare,
    },
  ],

  // 📂 FOOTER_SITEMAP: จัดกลุ่มลิงก์ตามลำดับความสำคัญของโครงสร้างภาษี/เอกสาร
  footerNav: {
    solutions: [
      { name: "Visa Application", href: "/#services-index" },
      { name: "Letter Drafting", href: "/#services-index" },
      { name: "Loan Consulting", href: "/#services-index" },
      { name: "Document Modification", href: "/#services-index" },
    ],
    company: [
      { name: "About Company", href: "/#about-section" },
      { name: "Review Logs", href: "/#success-logs" },
      { name: "Contact Protocol", href: "/contact" },
    ],
    legal: [
      { name: "Privacy Protocol", href: "/privacy" },
      { name: "SLA Policy", href: "/terms" },
    ],
  },

  // 🛠️ UTILITY_LINKS: ปุ่มคำสั่งหลัก (Call to Action)
  actions: {
    primary: {
      name: "Order_Service",
      href: "/contact",
      label: "EXECUTE_PAYLOAD",
      icon: FileText,
    },
  },
} as const

export type NavigationConfig = typeof navigationConfig
