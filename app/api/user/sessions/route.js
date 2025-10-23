// app/api/user/sessions/route.js
import { supabaseServer } from '@/lib/supabase/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

/**
 * GET: ดึง session ของผู้ใช้ปัจจุบัน (ล่าสุด 20 รายการ)
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabaseServer
      .from('user_sessions')
      .select('*')
      .eq('user_id', session.user.email)
      .order('created_at', { ascending: false })
      .limit(20); // แสดงล่าสุด 20 รายการ

    if (error) {
      console.error('[User Sessions API] ❌', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || [], { status: 200 });
  } catch (err) {
    console.error('[User Sessions API] Unexpected ❌', err);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' }, { status: 500 });
  }
}
