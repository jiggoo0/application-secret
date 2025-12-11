// 🚀 File: app/admin/documents/page.jsx

import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import DocumentBuilderClient from './components/DocumentBuilderClient';

/**
 * ดึงข้อมูลแม่แบบเอกสารจาก Supabase
 * @param {object} supabase - Supabase Client Instance
 * @returns {Promise<Array>}
 */
async function getDocumentTemplates(supabase) {
  // Business Logic: ดึงแม่แบบเอกสารที่ผู้ใช้มีสิทธิ์เข้าถึง
  const { data, error } = await supabase.from('document_templates').select('id, name, structure');

  if (error) {
    // ✅ IMPROVED LOGGING: แสดง Object ข้อผิดพลาดทั้งหมด เพื่อวินิจฉัยปัญหา RLS
    console.error('❌ Supabase Template Fetch Error:');
    console.dir(error);
  }

  return data || [];
}

/**
 * DocumentBuilderPage: Server Component
 * ดึงข้อมูลก่อนส่งต่อไปยัง Client Component
 */
export default async function DocumentBuilderPage() {
  const cookieStore = cookies();
  // 💡 สร้าง Supabase Client ที่มีสิทธิ์ตามผู้ใช้ที่ล็อกอินอยู่
  const supabase = createClient(cookieStore);

  // **การ Optimize:** ดึงข้อมูลทั้งหมดใน Server Component
  const templates = await getDocumentTemplates(supabase);

  // Note: สามารถเพิ่ม logic ในการตรวจสอบสิทธิ์ (Auth/Role Check) ได้ที่นี่

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10">
      <h1 className="mb-8 text-4xl font-extrabold text-indigo-700">
        บริการสร้างเอกสาร (Document Builder)
      </h1>

      {/* ส่งข้อมูลที่ดึงมาแล้วไปยัง Client Component */}
      <DocumentBuilderClient templates={templates} />
    </div>
  );
}
