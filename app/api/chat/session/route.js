import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  try {
    const { user_id, user_name, phone } = await req.json();
    const session_id = uuidv4();

    const { error } = await supabase
      .from('chat_sessions')
      .insert([{ id: session_id, user_id, user_name, phone }]);

    if (error) throw error;

    return NextResponse.json({ session_id });
  } catch (error) {
    console.error('[API] Create session error:', error);
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}
