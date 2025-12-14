// app/admin/issue-form/page.tsx
import { ClientIssueForm } from './ClientIssueForm';

/**
 * @component IssueDocumentPage
 * @description Server Component สำหรับหน้าออกเอกสาร PDF
 */
export default function IssueDocumentPage() {
  // 💡 1. ดึง Secret Key จาก Environment Variable (สามารถทำได้เฉพาะใน Server Component)
  const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

  if (!ADMIN_API_KEY) {
    return (
      <div className="bg-red-50 p-8 text-center text-red-600">
        <h1 className="text-xl font-bold">CONFIGURATION ERROR</h1>
        <p>
          The ADMIN_API_KEY environment variable is missing. Cannot proceed with document issuing.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* 2. ส่ง Secret Key ไปให้ Client Component ผ่าน Props */}
      <ClientIssueForm adminApiKey={ADMIN_API_KEY} />
    </div>
  );
}

// ----------------------------------------------------
// 💡 IMPORTANT: Security Note
// ----------------------------------------------------
/* เนื่องจากเราต้องส่ง 'ADMIN_API_KEY' ไปยัง Client Component (ClientIssueForm.tsx) 
ดังนั้น API Key นี้จะปรากฏใน Source Code ของ Browser 

ข้อกำหนดด้านความปลอดภัยนี้จำเป็นสำหรับ Next.js App Router 
เมื่อใช้ Client Fetching และ API Key แบบตายตัว 

**ทางเลือกที่ปลอดภัยกว่า:** 1. ใช้ NextAuth.js หรือ Session Token (ซับซ้อนกว่ามาก)
2. ย้าย Logic การ Fetch ทั้งหมดไปที่ Server Action 
(แต่การจัดการ Binary PDF Buffer/Blob ใน Server Action จะซับซ้อนกว่าการใช้ Client Fetching)
*/
