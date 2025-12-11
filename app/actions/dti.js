// app/actions/dti.js
'use server';

// โมดูลนี้จะหาเจอได้เมื่อติดตั้งแล้ว
import { createServerClient } from '@/utils/supabase/server';
import { Decimal } from 'decimal.js'; // ⬅️ Module นี้จะถูก Resolve เมื่อติดตั้ง

/**
 * Server Action สำหรับบันทึกผลการประเมิน DTI และอัปโหลดไฟล์เอกสาร
 */
export async function submitDtiAssessment(formData) {
  // 1. Setup Supabase Client (ใช้ Service Role Key)
  const supabase = createServerClient();

  // 2. ดึงข้อมูล DTI และ File จาก FormData
  const ratio = parseFloat(formData.get('ratio'));
  const assessmentStatus = formData.get('assessmentStatus');
  const uploadedFile = formData.get('documentFile');

  if (isNaN(ratio) || ratio <= 0) {
    throw new Error('อัตราส่วน DTI ไม่ถูกต้อง โปรดคำนวณใหม่อีกครั้ง');
  }

  let fileUrl = null;
  const bucket = 'dti-documents';

  // 3. ตรวจสอบและอัปโหลดไฟล์
  if (uploadedFile instanceof File && uploadedFile.size > 0) {
    const sanitizedFileName = uploadedFile.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const fileName = `${Date.now()}_ratio-${ratio.toFixed(2)}_${sanitizedFileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, uploadedFile, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('File Upload Error:', uploadError);
      throw new Error(`ไม่สามารถอัปโหลดไฟล์ได้: ${uploadError.message}`);
    }

    const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(fileName);

    fileUrl = publicUrlData.publicUrl;
  }

  // 4. บันทึกข้อมูล DTI และ File Reference ลงในตารางฐานข้อมูล
  try {
    const { error: dbError } = await supabase.from('dti_assessments').insert({
      dti_ratio: new Decimal(ratio).toDecimalPlaces(2).toNumber(),
      assessment_status: assessmentStatus,
      document_url: fileUrl,
      created_at: new Date().toISOString(),
    });

    if (dbError) {
      console.error('Database Insert Error:', dbError);
      throw new Error(`ไม่สามารถบันทึกผลการประเมินลงฐานข้อมูลได้: ${dbError.message}`);
    }

    return { success: true, message: 'บันทึกผลการประเมินและไฟล์สำเร็จ' };
  } catch (e) {
    throw new Error(`Server Error: ${e.message}`);
  }
}
