import {
  Home,
  Briefcase,
  BookOpen,
  Mail,
  // ✅ ลบ Globe, Languages, Stamp, Building2 ออกเพราะไม่ได้ถูกเรียกใช้ในตัวแปรด้านล่าง
  type LucideIcon,
} from "lucide-react";

/**
 * Interface สำหรับรายการเมนูนำทาง
 */
export interface NavItem {
  title: string;
  href: string;
  icon?: LucideIcon;
  description?: string;
}

/**
 * เมนูหลักส่วน Header
 */
export const MAIN_NAV: NavItem[] = [
  { title: "หน้าแรก", href: "/", icon: Home },
  { title: "บริการ", href: "/services", icon: Briefcase },
  { title: "บทความ", href: "/blog", icon: BookOpen },
  { title: "ติดต่อเรา", href: "/contact", icon: Mail },
];

/**
 * ลิงก์ส่วน Footer แบ่งตามหมวดหมู่
 */
export const FOOTER_LINKS = {
  company: [
    { title: "เกี่ยวกับเรา", href: "/about" },
    { title: "ร่วมงานกับเรา", href: "/careers" },
    { title: "นโยบายความเป็นส่วนตัว", href: "/privacy" },
  ],
  support: [
    { title: "คำถามที่พบบ่อย", href: "/faq" },
    { title: "เช็คสถานะเอกสาร", href: "/track-status" },
    { title: "ศูนย์ช่วยเหลือ", href: "/support" },
  ],
};
