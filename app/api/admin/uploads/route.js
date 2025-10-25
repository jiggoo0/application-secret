import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';
// import { getAdminSession } from '@/lib/auth/server'; // ถ้ามีระบบ session ตรวจสอบสิทธิ์

/**
 * @route GET /api/admin/uploads
 * @desc ดึงรายการไฟล์ทั้งหมดจาก Supabase (เฉพาะแอดมิน)
 * @param {Request} request
 */
export async function GET(request) {
  try {
    // 🧩 (Optional) ตรวจสอบสิทธิ์แอดมิน
    // const session = await getAdminSession();
    // if (!session?.user?.isAdmin) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    // }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    // ✅ Query Supabase
    const { data, error, count } = await supabaseServer
      .from('uploads')
      .select('id, user_email, name, path, type, status, created_at', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // ❌ จัดการ Error จาก Supabase
    if (error) {
      console.error('❌ [API /admin/uploads] Supabase error:', error);
      return NextResponse.json(
        { ok: false, error: 'ไม่สามารถโหลดข้อมูลไฟล์ได้', details: error.message },
        { status: 500 },
      );
    }

    // ✅ Response data พร้อม meta
    return NextResponse.json(
      {
        ok: true,
        meta: {
          total: count ?? data?.length ?? 0,
          limit,
          offset,
        },
        uploads: data || [],
      },
      { status: 200 },
    );
  } catch (err) {
    console.error('🔥 [API /admin/uploads] Unexpected error:', err);
    return NextResponse.json(
      { ok: false, error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์', details: err.message },
      { status: 500 },
    );
  }
}
