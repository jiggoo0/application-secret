import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

// =====================
// GET: ดึงห้องทั้งหมด
// =====================
export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from('chat_rooms')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ ok: true, rooms: data || [] }, { status: 200 });
  } catch (err) {
    console.error('GET /chat-rooms error:', err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

// =====================
// POST: สร้างห้องใหม่
// =====================
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, description } = body;

    if (!name?.trim()) {
      return NextResponse.json({ ok: false, error: 'Missing room name' }, { status: 400 });
    }

    const { data, error } = await supabaseServer
      .from('chat_rooms')
      .insert([{ name: name.trim(), description: description || null }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ ok: true, room: data }, { status: 201 });
  } catch (err) {
    console.error('POST /chat-rooms error:', err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
