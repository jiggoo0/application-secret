import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

// =====================
// GET: ดึงข้อมูลห้องเดียว
// =====================
export async function GET(req, { params }) {
  try {
    const { roomId } = await params;

    const { data, error } = await supabaseServer
      .from('chat_rooms')
      .select('*')
      .eq('id', roomId)
      .single();

    if (error) throw error;

    return NextResponse.json({ ok: true, room: data }, { status: 200 });
  } catch (err) {
    console.error('GET /chat-rooms/[roomId] error:', err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

// =====================
// PATCH: อัปเดตข้อมูลห้อง
// =====================
export async function PATCH(req, { params }) {
  try {
    const { roomId } = await params;
    const body = await req.json();

    const { data, error } = await supabaseServer
      .from('chat_rooms')
      .update(body)
      .eq('id', roomId)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ ok: true, room: data }, { status: 200 });
  } catch (err) {
    console.error('PATCH /chat-rooms/[roomId] error:', err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

// =====================
// DELETE: ลบห้อง
// =====================
export async function DELETE(req, { params }) {
  try {
    const { roomId } = await params;

    const { error } = await supabaseServer.from('chat_rooms').delete().eq('id', roomId);

    if (error) throw error;

    return NextResponse.json({ ok: true, message: 'Room deleted' }, { status: 200 });
  } catch (err) {
    console.error('DELETE /chat-rooms/[roomId] error:', err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
