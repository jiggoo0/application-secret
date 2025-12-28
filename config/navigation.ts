/** @format */
import {
  Home,
  MessageSquare,
  LayoutGrid,
  ShieldAlert,
  Gavel,
  Zap,
  ClipboardCheck,
  Briefcase,
} from "lucide-react"

/**
 * 🛰️ NAVIGATION_CONFIG_PROTOCOL
 * แผนผังโครงสร้างการนำทางทั้งหมดของระบบ (System Intelligence Strategy)
 */
export const navigationConfig = {
  mainNav: [
    {
      title: "หน้าหลัก",
      href: "/",
      label: "HOME_BASE",
      icon: Home,
    },
    {
      title: "ผลงาน",
      href: "/showcase",
      label: "CASE_VAULT",
      icon: Briefcase,
    },
    {
      title: "บริการ",
      href: "/#services",
      label: "SOLUTIONS",
      icon: LayoutGrid,
    },
    {
      title: "ประเมินเอกสาร",
      href: "/assessment",
      label: "RISK_AUDIT",
      icon: ClipboardCheck,
    },
    {
      title: "ติดต่อ",
      href: "/contact",
      label: "INQUIRY",
      icon: MessageSquare,
    },
  ],

  footerNav: {
    solutions: [
      { name: "Technical Showcase", href: "/showcase" },
      { name: "Risk Assessment", href: "/assessment" },
      { name: "Service Index", href: "/#services" },
    ],
    company: [
      { name: "Identity Core", href: "/#about" },
      { name: "Operational Process", href: "/#process" },
      { name: "Contact Hub", href: "/contact" },
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
      name: "ประเมินความเสี่ยงฟรี",
      href: "/assessment",
      label: "START_AUDIT",
      icon: Zap,
    },
  },
} as const

// 🏷️ TYPE_EXPORT_PROTOCOL
export type NavigationConfig = typeof navigationConfig
export type NavItem = (typeof navigationConfig.mainNav)[number]
export type FooterNavItem =
  (typeof navigationConfig.footerNav.solutions)[number]
