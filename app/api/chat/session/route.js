import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export async function POST() {
  try {
    // สร้าง session_id ใหม่
    const session_id = uuidv4();

    const { error } = await supabase.from('chat_sessions').insert([{ id: session_id }]);

    if (error) throw error;

    return NextResponse.json({ session_id });
  } catch (err) {
    console.error('❌ สร้าง session ล้มเหลว:', err);
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}
