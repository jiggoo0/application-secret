// app/api/user-sessions/route.js
import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { user_id, action } = body;

    if (!user_id || !action) {
      return NextResponse.json({ error: 'Missing user_id or action' }, { status: 400 });
    }

    // ดึง IP และ User-Agent
    const ip_address = req.headers.get('x-forwarded-for') || req.headers.get('host') || null;
    const user_agent = req.headers.get('user-agent') || null;

    const { error } = await supabaseServer
      .from('user_sessions')
      .insert([{ user_id, action, ip_address, user_agent }]);

    if (error) throw error;

    return NextResponse.json({ message: 'Session recorded' }, { status: 200 });
  } catch (err) {
    console.error('[user-sessions API] ❌', err);
    return NextResponse.json({ error: err.message || 'Failed to record session' }, { status: 500 });
  }
}
