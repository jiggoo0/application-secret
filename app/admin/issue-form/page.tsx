// app/admin/issue-form/page.tsx

import { ClientIssueForm } from './ClientIssueForm';
// 💡 FIX: แก้ไขจาก import { Metadata } from 'next'; เป็น import type { Metadata } from 'next';
import type { Metadata } from 'next';

// ----------------------------------------------------
// 1. METADATA (SEO/Title)
// ----------------------------------------------------
export const metadata: Metadata = {
  title: 'Issue Verified Document | Admin Portal',
  description: 'Admin interface for searching bookings and issuing verified PDF documents.',
};

/**
 * @component IssueDocumentPage
 * @description Server Component สำหรับหน้าออกเอกสาร PDF
 * * 💡 Note: Component นี้ไม่ต้อง Load Secret Key (ADMIN_API_KEY) อีกต่อไป
 * เนื่องจาก Server Actions (fetchBookingDetails, issueDocument) จะดึง Environment Variable
 * โดยตรงบน Server Side ซึ่งเป็นวิธีที่ปลอดภัยกว่า
 */
export default function IssueDocumentPage() {
  // 💡 โค้ดเดิมที่เคยตรวจสอบ ADMIN_API_KEY ถูกนำออกไปแล้ว
  // เนื่องจากความปลอดภัยต้องจัดการใน Server Actions เท่านั้น

  return (
    <div className="container mx-auto px-4 py-12">
      {/* 2. เรียก Client Component โดยไม่ส่ง Secret Key ผ่าน Props 
        (ClientIssueForm ต้องถูกแก้ไขให้ไม่รับ Prop 'adminApiKey' แล้ว)
      */}
      <ClientIssueForm />
    </div>
  );
}
