import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

/**
 * 📦 POST /api/admin/uploads/preview
 * ใช้สร้างลิงก์ signed URL สำหรับ preview ไฟล์จาก bucket
 * Request body: { path: string }
 */
export async function POST(req) {
  try {
    const { path } = await req.json();

    // ตรวจสอบ input
    if (!path || typeof path !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid file path' }, { status: 400 });
    }

    const expiresIn = 3600; // ลิงก์มีอายุ 1 ชั่วโมง

    const { data, error } = await supabaseServer.storage
      .from('user-uploads') // ชื่อ bucket
      .createSignedUrl(path, expiresIn);

    // ตรวจสอบ error
    if (error || !data?.signedUrl) {
      console.error('[Preview] ❌ Supabase error:', error);
      return NextResponse.json({ error: 'ไม่สามารถสร้างลิงก์ preview ได้' }, { status: 500 });
    }

    // ส่งลิงก์กลับให้ client
    return NextResponse.json({ url: data.signedUrl }, { status: 200 });
  } catch (err) {
    console.error('[Preview] ❌ Unexpected error:', err);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' }, { status: 500 });
  }
}
