// components/shared/Icons.tsx
import * as React from "react";
import {
  Globe,
  Languages,
  Scale,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Home,
  Briefcase,
  BookOpen,
  Mail,
  User,
  Users,
  ShieldCheck,
  FileText,
  BadgeCheck,
  Calendar,
  ArrowRight,
  Clock,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

export type IconType = LucideIcon;

/**
 * Icons Registry
 * Single Source of Truth สำหรับ icon ทั้งระบบ
 * ❗ key ต้องตรงกับที่เรียกใช้ เช่น <Icons.help />
 */
export const Icons = {
  /* =====================
   * Core Services
   * ===================== */
  visa: Globe,
  translation: Languages,
  legal: Scale,

  /* =====================
   * Navigation
   * ===================== */
  menu: Menu,
  close: X,
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,

  home: Home,
  services: Briefcase,
  blog: BookOpen,
  book: BookOpen,
  contact: Mail,

  /* =====================
   * Users / Trust
   * ===================== */
  user: User,
  users: Users,
  shield: ShieldCheck,

  /* =====================
   * Documents / Status
   * ===================== */
  document: FileText,
  fileText: FileText,
  badge: BadgeCheck,

  /* =====================
   * Misc
   * ===================== */
  calendar: Calendar,
  arrowRight: ArrowRight,
  clock: Clock,
  help: HelpCircle, // ใช้กับ FAQ / Help
} satisfies Record<string, LucideIcon>;

interface DynamicIconProps extends React.ComponentPropsWithoutRef<"svg"> {
  name: keyof typeof Icons;
  size?: number;
}

/**
 * DynamicIcon
 * ใช้ render icon จาก key แบบ dynamic
 * ปลอดภัยต่อ runtime (คืน null หากไม่พบ icon)
 */
export function DynamicIcon({ name, size = 20, ...props }: DynamicIconProps) {
  const IconComponent = Icons[name];

  if (!IconComponent) return null;

  return <IconComponent size={size} {...props} />;
}
