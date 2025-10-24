// app/api/user/sessions/route.js
import { supabaseServer } from '@/lib/supabase/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

/**
 * 🔹 GET: ดึง session ของผู้ใช้ปัจจุบัน (ล่าสุด 20 รายการ)
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // ตรวจ schema ว่าคอลัมน์ชื่อ user_id หรือ user_email
    const { data, error } = await supabaseServer
      .from('user_sessions')
      .select('id, user_id, action, ip_address, user_agent, created_at')
      .eq('user_id', session.user.email) // เปลี่ยนเป็น user_email ถ้าชื่อคอลัมน์ไม่ตรง
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('[User Sessions API] ❌', error.message || error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || [], {
      status: 200,
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (err) {
    console.error('[User Sessions API] Unexpected ❌', err.message || err);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' }, { status: 500 });
  }
}
