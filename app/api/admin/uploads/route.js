import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';
// import { getAdminSession } from '@/lib/auth/server'; // ถ้ามีระบบ session

export async function GET(request) {
  try {
    // Optional: ตรวจสอบสิทธิ์
    // const session = await getAdminSession();
    // if (!session?.user?.isAdmin) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    // }

    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get('limit')) || 50;
    const offset = Number(searchParams.get('offset')) || 0;

    const { data, error } = await supabaseServer
      .from('uploads')
      .select('id, user_email, name, path, type, status, created_at')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('[API /admin/uploads] Supabase fetch error:', error.message);
      return NextResponse.json({ error: 'ไม่สามารถโหลดรายการไฟล์ได้' }, { status: 500 });
    }

    const uploads = Array.isArray(data) ? data : [];
    return NextResponse.json({ ok: true, uploads }, { status: 200 });
  } catch (err) {
    console.error('[API /admin/uploads] Unexpected error:', err);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' }, { status: 500 });
  }
}
