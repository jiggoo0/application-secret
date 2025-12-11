// components/ui/StickyActionBlock/StickyActionBlock.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronUp } from 'lucide-react';

/**
 * StickyActionBlock: แถบ Action/CTA แบบลอย (Sticky) ที่อยู่ด้านล่างของจอ
 * จะซ่อนตัวเองเมื่อถึง Footer เพื่อให้ดูเป็นมิตรต่อผู้ใช้มากขึ้น
 * @param {React.ReactNode} children - เนื้อหาหลักของ Action (เช่น ปุ่ม)
 * @param {string} footerSelector - CSS Selector ของ Footer (เช่น '#footer-section')
 */
export default function StickyActionBlock({ children, footerSelector = '#footer-section' }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const blockRef = useRef(null);

  // 1. Logic การควบคุมการมองเห็น (Visibility Control)
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const footerElement = document.querySelector(footerSelector);

      // A. ตรวจสอบการเลื่อนขึ้น/ลง (สำหรับซ่อนชั่วคราวเมื่อเลื่อนลงเร็วๆ)
      setIsScrolledUp(currentScrollY < lastScrollY);
      lastScrollY = currentScrollY;

      // B. ตรวจสอบว่าอยู่ใกล้ Footer หรือไม่
      let nearFooter = false;
      if (footerElement) {
        // คำนวณระยะห่างระหว่างจุดบนของ footer กับจุดล่างของ viewport
        const distanceToFooter = footerElement.getBoundingClientRect().top - window.innerHeight;

        // หากระยะห่างน้อยกว่า 100px (หรือ Block อยู่เหนือ Footer) ให้ถือว่าใกล้
        if (distanceToFooter <= 100) {
          nearFooter = true;
        }
      }

      // C. แสดง Block เมื่อเลื่อนลงมาเกิน 300px และไม่อยู่ใกล้ Footer
      const shouldBeVisible = currentScrollY > 300 && !nearFooter;

      // อัปเดตสถานะการมองเห็น
      setIsVisible(shouldBeVisible);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial check on load
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [footerSelector]);

  // 2. Logic สำหรับ Scroll to Top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // 3. การแสดงผล (Render)
  return (
    <footer
      ref={blockRef}
      role="complementary" // เป็นส่วนเสริมของเนื้อหาหลัก
      aria-label="แถบการดำเนินการที่สำคัญ"
      className={`fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 shadow-2xl backdrop-blur-sm transition-transform duration-300 ease-out lg:bottom-4 lg:left-1/2 lg:hidden lg:w-fit lg:-translate-x-1/2 lg:rounded-xl lg:border lg:p-3 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} `}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-0">
        {/* Scroll to Top Button (สำหรับมือถือ/เล็ก) */}
        <button
          onClick={scrollToTop}
          aria-label="เลื่อนขึ้นด้านบน"
          className="mr-3 rounded-full bg-indigo-500 p-3 text-white shadow-lg transition-colors hover:bg-indigo-600 lg:hidden"
        >
          <ChevronUp className="h-5 w-5" />
        </button>

        {/* Action Content */}
        <div className="flex flex-grow justify-end">{children}</div>
      </div>
    </footer>
  );
}
