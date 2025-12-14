import React, { type PropsWithChildren } from 'react';

// 1. กำหนด Props พื้นฐานที่ Component รับ
interface BaseSectionProps {
  id: string;
  title: string;
  isTitleSrOnly?: boolean;
  className?: string;
}

// 2. ใช้ PropsWithChildren เพื่อเพิ่ม 'children' เข้ามาในรูปแบบ Nesting
type SectionProps = PropsWithChildren<BaseSectionProps>;

/**
 * Section Component
 * ใช้สำหรับจัดโครงสร้างส่วนต่างๆ ของหน้าเพจ
 */
export default function Section({
  id,
  title,
  isTitleSrOnly = false,
  className = '',
  // 💡 รับ children ในรูปแบบ Nesting (TypeScript ยอมรับเมื่อใช้ PropsWithChildren)
  children,
}: SectionProps) {
  const titleClasses = isTitleSrOnly ? 'sr-only' : 'text-3xl font-bold tracking-tight sm:text-4xl';

  return (
    <section id={id} className={`py-12 md:py-16 ${className}`}>
      {/* 1. หัวข้อ Section */}
      <h2 className={titleClasses}>{title}</h2>

      {/* 2. เนื้อหา (Children) */}
      {children}
    </section>
  );
}
