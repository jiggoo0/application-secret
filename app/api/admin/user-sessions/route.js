// app/api/admin/user-sessions/route.js
import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

/**
 * GET /api/admin/user-sessions
 * คืนค่าประวัติ login/logout ของผู้ใช้ทั้งหมด
 */
export async function GET(req) {
  try {
    // ดึง query params limit
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')) : null;

    let query = supabaseServer
      .from('user_sessions')
      .select('*')
      .order('created_at', { ascending: false });

    if (limit) query = query.limit(limit);

    const { data, error } = await query;

    if (error) {
      console.error('[admin/user-sessions API] ❌ Supabase fetch error:', error);
      return NextResponse.json({ error: 'ไม่สามารถโหลดประวัติผู้ใช้ได้' }, { status: 500 });
    }

    return NextResponse.json(data || [], { status: 200 });
  } catch (err) {
    console.error('[admin/user-sessions API] ❌ Unexpected error:', err);
    return NextResponse.json(
      { error: err.message || 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' },
      { status: 500 },
    );
  }
}
