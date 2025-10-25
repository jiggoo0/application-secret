import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

/**
 * POST /api/admin/uploads/approve
 * Request body: { id: string }
 * อนุมัติไฟล์โดยเปลี่ยน status เป็น 'approved'
 */
export async function POST(req) {
  try {
    const { id } = await req.json();
    const uploadId = id?.trim();

    if (!uploadId) {
      return NextResponse.json({ error: 'Missing or invalid upload id' }, { status: 400 });
    }

    const { data, error } = await supabaseServer
      .from('uploads')
      .update({ status: 'approved' })
      .eq('id', uploadId)
      .select();

    if (error) {
      console.error('[API] Approve upload error:', error.message);
      return NextResponse.json({ error: 'ไม่สามารถอนุมัติไฟล์ได้' }, { status: 400 });
    }

    return NextResponse.json({ ok: true, upload: data[0] || null }, { status: 200 });
  } catch (err) {
    console.error('[API] Unexpected POST error:', err);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' }, { status: 500 });
  }
}
