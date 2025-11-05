import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

/**
 * ✅ API สำหรับเพิ่มข้อความลงในตาราง chat_messages
 * ใช้ได้ทั้งฝั่งลูกค้าและแอดมิน
 */
export async function POST(req) {
  try {
    const { role, content } = await req.json();

    if (!role || !content) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const { error } = await supabase.from('chat_messages').insert([{ role, content }]);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ API error:', error);
    return NextResponse.json(
      { error: 'Failed to save message', details: error.message },
      { status: 500 },
    );
  }
}
