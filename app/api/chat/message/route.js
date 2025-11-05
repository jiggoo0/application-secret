import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(req) {
  try {
    const { session_id, role, content } = await req.json();

    if (!session_id || !role || !content) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const { error } = await supabase.from('chat_messages').insert([{ session_id, role, content }]);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('ส่งข้อความล้มเหลว:', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
