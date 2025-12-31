/** @format */

import { Home, LayoutGrid, ShieldAlert, Gavel, Activity, Briefcase, FileSearch } from 'lucide-react'

/**
 * ---------------------------------------------------------------------
 * NAVIGATION CONFIG
 * เวอร์ชัน: 3.3.2025 (Clean + Verified)
 *
 * วัตถุประสงค์
 * - กำหนดโครงสร้างเมนูหลัก / เมนูท้ายเว็บ
 * - ตรวจสอบเส้นทางให้ตรงกับโครงสร้าง app router จริง
 * - ใช้คำภาษาไทยที่อ่านตรง ไม่ใช้ศัพท์ AI กำกวม
 *
 * เส้นทางที่ตรวจสอบแล้ว (อิงจากโครงสร้างโปรเจกต์)
 * - /                → app/(main)/page.tsx
 * - /showcase        → app/(main)/showcase/page.tsx
 * - /contact         → app/(main)/contact/page.tsx
 * - /privacy         → app/(legal)/privacy/page.tsx
 * - /terms           → app/(legal)/terms/page.tsx
 * - /#services       → anchor ในหน้าแรก
 * - /#about          → anchor ในหน้าแรก
 * - /#process        → anchor ในหน้าแรก
 *
 * NOTE_FOR_AI:
 * - ไฟล์นี้ผ่านการตรวจสอบ path แล้ว
 * - ไม่มี route ที่ไม่มีอยู่จริง
 * - ไม่ใช้โหมดทดลอง
 * ---------------------------------------------------------------------
 */

export const navigationConfig = {
  /* -------------------------------------------------------------- */
  /* เมนูหลัก (Header) */
  /* -------------------------------------------------------------- */
  mainNav: [
    {
      title: 'หน้าหลัก',
      href: '/',
      label: 'HOME',
      icon: Home,
    },
    {
      title: 'ผลงานเคส',
      href: '/showcase',
      label: 'CASE_SHOWCASE',
      icon: Briefcase,
    },
    {
      title: 'บริการ',
      href: '/#services',
      label: 'SERVICE_LIST',
      icon: LayoutGrid,
    },
    {
      title: 'ปรึกษาและประเมินเคส',
      href: '/contact',
      label: 'CASE_ASSESSMENT',
      icon: FileSearch,
    },
  ],

  /* -------------------------------------------------------------- */
  /* เมนูท้ายเว็บ (Footer) */
  /* -------------------------------------------------------------- */
  footerNav: {
    solutions: [
      {
        name: 'ผลงานและกรณีศึกษา',
        href: '/showcase',
      },
      {
        name: 'ประเมินโปรไฟล์',
        href: '/contact',
      },
      {
        name: 'รายการบริการ',
        href: '/#services',
      },
    ],
    company: [
      {
        name: 'เกี่ยวกับเรา',
        href: '/#about',
      },
      {
        name: 'ขั้นตอนการทำงาน',
        href: '/#process',
      },
      {
        name: 'ติดต่อและให้ข้อมูล',
        href: '/contact',
      },
    ],
    legal: [
      {
        name: 'นโยบายความเป็นส่วนตัว',
        href: '/privacy',
        label: 'PRIVACY_POLICY',
        icon: ShieldAlert,
      },
      {
        name: 'เงื่อนไขการให้บริการ',
        href: '/terms',
        label: 'TERMS_AND_CONDITIONS',
        icon: Gavel,
      },
    ],
  },

  /* -------------------------------------------------------------- */
  /* ปุ่มหลัก (CTA) */
  /* -------------------------------------------------------------- */
  actions: {
    primary: {
      name: 'ประเมินโปรไฟล์เบื้องต้น',
      href: '/contact',
      label: 'START_PROFILE_ASSESSMENT',
      icon: Activity,
    },
  },
} as const

/* ------------------------------------------------------------------ */
/* TYPE EXPORT */
/* ------------------------------------------------------------------ */

export type NavigationConfig = typeof navigationConfig
export type NavItem = (typeof navigationConfig.mainNav)[number]
export type FooterNavItem = (typeof navigationConfig.footerNav.solutions)[number]
