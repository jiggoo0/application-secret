import {
  Globe,
  Languages,
  Scale,
  Menu,
  X,
  ChevronDown,
  Home,
  Briefcase,
  BookOpen,
  Mail,
  User,
  ShieldCheck,
  FileText,
  BadgeCheck,
  type LucideIcon,
} from "lucide-react";

/**
 * 1. กำหนดประเภทของ Icon เพื่อใช้งานในโปรเจกต์
 */
export type IconType = LucideIcon;

/**
 * 2. คลัง Icon หลัก (Static Mapping)
 * เพิ่มไอคอนที่จำเป็นสำหรับงานเอกสารและวีซ่า
 */
export const Icons = {
  visa: Globe,
  translation: Languages,
  legal: Scale,
  menu: Menu,
  close: X,
  chevronDown: ChevronDown,
  home: Home,
  services: Briefcase,
  blog: BookOpen,
  contact: Mail,
  user: User,
  shield: ShieldCheck,
  document: FileText,
  badge: BadgeCheck,
};

/**
 * 3. DynamicIcon Component (แก้ไขปัญหา Element type is invalid)
 * ใช้สำหรับเรนเดอร์ Icon ผ่านชื่อ String (key)
 * เช่น <DynamicIcon name="visa" />
 */
interface DynamicIconProps extends React.ComponentProps<"svg"> {
  name: string | keyof typeof Icons;
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  // เลือก Icon ตามชื่อที่ส่งมา หากไม่พบจะใช้ Globe เป็นค่าเริ่มต้น
  const IconComponent = Icons[name as keyof typeof Icons] || Icons.visa;

  return <IconComponent {...props} />;
}
