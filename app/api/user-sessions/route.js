// app/api/user-sessions/route.js
import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { user_id, action } = body ?? {};

    // ✅ ตรวจสอบ input
    if (typeof user_id !== 'string' || typeof action !== 'string') {
      return NextResponse.json({ error: 'Invalid user_id or action' }, { status: 400 });
    }

    // ✅ ดึง IP และ User-Agent
    const ip_address =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      req.headers.get('host') ||
      'unknown';

    const user_agent = req.headers.get('user-agent') || 'unknown';

    // ✅ บันทึกข้อมูลลง Supabase
    const { error } = await supabaseServer.from('user_sessions').insert([
      {
        user_id,
        action,
        ip_address,
        user_agent,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) throw error;

    return NextResponse.json({ message: 'Session recorded' }, { status: 200 });
  } catch (err) {
    console.error('[user-sessions API] ❌', err.message || err);
    return NextResponse.json(
      { error: 'Failed to record session', details: err.message },
      { status: 500 },
    );
  }
}
