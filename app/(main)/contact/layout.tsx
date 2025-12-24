// app/(main)/contact/layout.tsx
// ----------------------------------------------------
// 🏗️ JP-VISOUL: Contact Layout (SEO Station)
// Role: Server-side Metadata Provider
// ----------------------------------------------------

import React from 'react'; // ✅ เพิ่มเพื่อแก้ Error: 'React' is not defined
import type { Metadata } from 'next';

/**
 * 🛰️ SEO & Metadata Configuration
 * ปรับปรุง Canonical URL ให้ตรงกับโดเมนหลักของระบบ
 */
export const metadata: Metadata = {
  title: 'CONTACT | JP-VISOUL - Establishing Connection',
  description:
    'Connect with JP-VISOUL Operations Command. Professional document solutions, DTI evaluation, and business strategic support. Response within 120 minutes.',
  openGraph: {
    title: 'CONTACT | JP-VISOUL',
    description: 'Secure Communication Line for Professional Solutions.',
    images: ['/og-contact.jpg'],
    url: 'https://www.jpvisouldocs.online/contact',
  },
  alternates: {
    canonical: 'https://www.jpvisouldocs.online/contact',
  },
};

/**
 * 🏗️ Contact Layout Component
 * ทำหน้าที่เป็น Wrapper เฉพาะสำหรับกลุ่มหน้าติดต่อสอบถาม
 */
export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen bg-white/50">
      {/* Layout นี้จะครอบเฉพาะหน้า Contact 
          ช่วยให้เราจัดการสไตล์หรือส่วนประกอบพิเศษ 
          ที่ต้องการให้มีเฉพาะหน้านี้ได้ในอนาคต 
      */}
      {children}
    </section>
  );
}
