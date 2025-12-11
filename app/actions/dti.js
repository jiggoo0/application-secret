'use server';

// 💡 FIXED: ตอนนี้สามารถนำเข้า createClient ได้แล้ว
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
// ❌ FIXED: ลบ import { redirect } ที่ไม่ได้ใช้งาน
// import { redirect } from 'next/navigation';

/**
 * 🚀 Server Action สำหรับการประเมิน DTI
 * 💡 FIXED: เปลี่ยนชื่อฟังก์ชันจาก submitDtiForm เป็น submitDtiAssessment เพื่อให้ตรงกับที่ DtiClientWrapper เรียกใช้
 * @param {FormData} formData - ข้อมูลจากฟอร์ม
 */
export async function submitDtiAssessment(formData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // 1. รับค่าที่จำเป็นจาก formData
  const income = Number(formData.get('income')) || 0;
  const debt = Number(formData.get('debt')) || 0;

  // 2. Business Logic/Validation: คำนวณ DTI
  const dti = debt > 0 ? (debt / income) * 100 : 0;

  // ... (ส่วนการจัดการข้อมูลอื่นๆ)

  const { error } = await supabase.from('dti_assessments').insert([
    {
      income,
      debt,
      dti_score: dti,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    console.error('DTI Action Error:', error);
    return { success: false, error: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล: ' + error.message };
  }

  return { success: true, message: 'ประเมิน DTI และบันทึกข้อมูลสำเร็จ', dti_score: dti };
}
