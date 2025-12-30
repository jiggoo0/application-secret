/** @format */

import { Home, LayoutGrid, ShieldAlert, Gavel, Activity, Briefcase, FileSearch } from 'lucide-react'

/**
 * 🛰️ NAVIGATION_CONFIG_PROTOCOL
 * PURPOSE: แผนผังโครงสร้างการนำทาง (Unified Inquiry Architecture)
 * VERSION: 3.3.2025 (Clean Edition)
 * ✅ FIXED: ESLint error - ลบ 'MessageSquare' และ 'Zap' ที่ไม่ได้ใช้งานออก
 * ✅ STRATEGY: รวมทุกการติดต่อและการประเมินไว้ที่ /contact เพื่อลดความสับสนของผู้ใช้
 */
export const navigationConfig = {
  mainNav: [
    {
      title: 'หน้าหลัก',
      href: '/',
      label: 'HOME_BASE',
      icon: Home,
    },
    {
      title: 'ผลงาน',
      href: '/showcase',
      label: 'CASE_VAULT',
      icon: Briefcase,
    },
    {
      title: 'บริการ',
      href: '/#services',
      label: 'SOLUTIONS',
      icon: LayoutGrid,
    },
    {
      title: 'ปรึกษา & ประเมิน',
      href: '/contact',
      label: 'STRATEGIC_INQUIRY',
      icon: FileSearch, // สื่อถึงการสืบค้นและวิเคราะห์โปรไฟล์เชิงลึก
    },
  ],

  footerNav: {
    solutions: [
      { name: 'Technical Showcase', href: '/showcase' },
      { name: 'Profile Assessment', href: '/contact' },
      { name: 'Service Index', href: '/#services' },
    ],
    company: [
      { name: 'Identity Core', href: '/#about' },
      { name: 'Operational Process', href: '/#process' },
      { name: 'Unified Contact Hub', href: '/contact' },
    ],
    legal: [
      {
        name: 'Privacy Protocol',
        href: '/privacy',
        label: 'PRIVACY_CONTROL',
        icon: ShieldAlert,
      },
      {
        name: 'SLA Policy',
        href: '/terms',
        label: 'TERMS_OF_SERVICE',
        icon: Gavel,
      },
    ],
  },

  actions: {
    primary: {
      name: 'ประเมินโปรไฟล์ฟรี',
      href: '/contact',
      label: 'START_ASSESSMENT',
      icon: Activity, // สื่อถึงการวิเคราะห์ข้อมูลแบบ Live Monitoring
    },
  },
} as const

// 🏷️ TYPE_EXPORT_PROTOCOL
export type NavigationConfig = typeof navigationConfig
export type NavItem = (typeof navigationConfig.mainNav)[number]
export type FooterNavItem = (typeof navigationConfig.footerNav.solutions)[number]
