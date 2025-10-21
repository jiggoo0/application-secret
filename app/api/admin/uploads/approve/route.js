import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

/**
 * 📦 POST /api/admin/uploads/approve
 * Request body: { id: string }
 * อนุมัติไฟล์โดยเปลี่ยน status เป็น 'approved'
 */
export async function POST(req) {
  try {
    const { id } = await req.json();

    // ตรวจสอบ input
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid upload id' }, { status: 400 });
    }

    // อัปเดตสถานะไฟล์ใน Supabase
    const { data, error } = await supabaseServer
      .from('uploads')
      .update({ status: 'approved' })
      .eq('id', id)
      .select();

    if (error) {
      console.error('[API] ❌ Approve upload error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    console.error('[API] ❌ Unexpected POST error:', err);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' }, { status: 500 });
  }
}
