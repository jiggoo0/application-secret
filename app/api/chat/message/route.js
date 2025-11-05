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
  } catch (error) {
    console.error('[API] Send message error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

// 🔹 GET messages by session_id
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const session_id = searchParams.get('session_id');

    if (!session_id) {
      return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', session_id)
      .order('created_at', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ messages: data });
  } catch (error) {
    console.error('[API] Get messages error:', error);
    return NextResponse.json({ error: 'Failed to load messages' }, { status: 500 });
  }
}
