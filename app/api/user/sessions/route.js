import { supabaseServer } from '@/lib/supabase/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

/**
 * 🔹 GET: ดึง session ของผู้ใช้ปัจจุบัน (ล่าสุด N รายการ)
 */
export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    if (!email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get('limit');
    const limit = Math.min(parseInt(limitParam || '20', 10), 100); // จำกัดไม่เกิน 100

    // ตรวจสอบว่า schema ใช้ user_id หรือ user_email
    const { data, error } = await supabaseServer
      .from('user_sessions')
      .select('id, user_id, action, ip_address, user_agent, created_at')
      .eq('user_id', email) // เปลี่ยนเป็น .eq('user_email', email) หาก schema ใช้ชื่อนี้
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('[User Sessions API] ❌ Supabase error:', error.message || error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || [], {
      status: 200,
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (err) {
    console.error('[User Sessions API] ❌ Unexpected error:', err.message || err);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' }, { status: 500 });
  }
}
