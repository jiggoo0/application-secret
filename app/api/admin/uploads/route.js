import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

/**
 * 📦 GET /api/admin/uploads
 * คืนค่ารายการไฟล์ทั้งหมดจาก table uploads
 */
export async function GET() {
  try {
    // ดึงข้อมูลไฟล์ทั้งหมดเรียงตามวันที่สร้างล่าสุด
    const { data, error } = await supabaseServer
      .from('uploads')
      .select('id, user_email, name, path, type, status, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[API] ❌ Supabase fetch error:', error);
      return NextResponse.json({ error: 'ไม่สามารถโหลดรายการไฟล์ได้' }, { status: 500 });
    }

    // ส่งกลับข้อมูลไฟล์
    return NextResponse.json(data || [], { status: 200 });
  } catch (err) {
    console.error('[API] ❌ Unexpected error:', err);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' }, { status: 500 });
  }
}
