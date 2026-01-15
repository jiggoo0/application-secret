// constants/navigation.ts

import {
  Home,
  Briefcase,
  BookOpen,
  HelpCircle,
  Users,
  ShieldCheck,
  MessageSquare,
  FileText,
  Globe,
  Wallet,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

/**
 * Interface สำหรับรายการเมนูนำทาง
 */
export interface NavItem {
  title: string;
  href: string;
  icon?: LucideIcon;
  description?: string;
}

/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */

/**
 * ✅ MAIN_NAV
 * เมนูหลักส่วน Header
 * ✔ ตรวจสอบแล้ว: ทุก href มี route จริงตาม Project Structure
 */
export const MAIN_NAV: NavItem[] = [
  {
    title: "หน้าแรก",
    href: "/",
    icon: Home,
    description: "จุดเริ่มต้นความสำเร็จ",
  },
  {
    title: "งานบริการ",
    href: "/services",
    icon: Briefcase,
    description: "Solution เอกสารครบวงจร",
  },
  {
    title: "สาระน่ารู้",
    href: "/blog",
    icon: BookOpen,
    description: "เจาะลึกเทคนิคเอกสาร",
  },
  {
    title: "ถาม-ตอบ",
    href: "/faq",
    icon: HelpCircle,
    description: "ไขข้อสงสัยเบื้องต้น",
  },
  {
    title: "รู้จักเรา",
    href: "/about", // อยู่ใน (marketing)/about
    icon: Users,
    description: "มาตรฐาน JP-VISOUL",
  },
];

/* -------------------------------------------------------------------------- */
/*                                   Footer                                   */
/* -------------------------------------------------------------------------- */

/**
 * ✅ FOOTER_LINKS
 * ลิงก์ส่วนท้ายเว็บ
 * ✔ href ตรงกับ route ที่มีอยู่จริง
 */
export const FOOTER_LINKS: {
  services: NavItem[];
  support: NavItem[];
  legal: NavItem[];
} = {
  /* ----------------------------- Services -------------------------------- */
  services: [
    {
      title: "ที่ปรึกษาการเงิน & สินเชื่อ",
      href: "/services?cat=FINANCIAL",
      icon: Wallet,
    },
    {
      title: "จัดการวีซ่า & การเดินทาง",
      href: "/services?cat=IMMIGRATION",
      icon: Globe,
    },
    {
      title: "จัดทำเอกสารเฉพาะทาง",
      href: "/services?cat=DOCUMENTATION",
      icon: FileText,
    },
  ],

  /* ------------------------------ Support -------------------------------- */
  support: [
    {
      title: "ศูนย์ช่วยเหลือ (FAQ)",
      href: "/faq",
      icon: HelpCircle,
    },
    {
      title: "ปรึกษาเคสส่วนตัว",
      href: "/contact", // อยู่ใน (marketing)/contact
      icon: MessageSquare,
    },
    {
      title: "ร่วมเป็นพาร์ทเนอร์",
      href: "/partner", // ✔ มี route จริง
      icon: Users,
    },
  ],

  /* ------------------------------- Legal --------------------------------- */
  legal: [
    {
      title: "นโยบายความเป็นส่วนตัว",
      href: "/privacy",
      icon: ShieldCheck,
    },
  ],
};