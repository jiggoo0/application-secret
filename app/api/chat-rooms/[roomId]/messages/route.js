import { supabaseServer } from '@/lib/supabase/server'; // ใช้ service role key สำหรับ RLS

// =====================
// GET: ดึงข้อความทั้งหมดในห้อง
// =====================
export async function GET(req, context) {
  const { params } = context;
  const { roomId } = await params;

  if (!roomId) {
    return new Response(JSON.stringify({ ok: false, error: 'Missing roomId' }), { status: 400 });
  }

  try {
    const { data, error } = await supabaseServer
      .from('chat_messages')
      .select('*')
      .eq('room_id', roomId)
      .order('created_at', { ascending: true });

    if (error) throw error;

    return new Response(JSON.stringify({ ok: true, messages: data }), { status: 200 });
  } catch (err) {
    console.error('❌ GET messages error:', err);
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 });
  }
}

// =====================
// POST: เพิ่มข้อความใหม่ (guest / admin)
// =====================
export async function POST(req, context) {
  const { params } = context;
  const { roomId } = await params;

  if (!roomId) {
    return new Response(JSON.stringify({ ok: false, error: 'Missing roomId' }), { status: 400 });
  }

  try {
    const body = await req.json();

    // ตรวจสอบและตั้งค่า default สำหรับ guest/admin
    const user_id = body.user_id || `guest-${Date.now()}`;
    const user_name = body.user_name?.trim() || 'Guest';
    const user_email = body.user_email?.trim() || '';
    const content = body.content?.trim();

    if (!content) {
      return new Response(JSON.stringify({ ok: false, error: 'Content is required' }), {
        status: 400,
      });
    }

    const newMessage = {
      room_id: roomId,
      user_id,
      user_name,
      user_email,
      content,
      sender_id: body.sender_id || null,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabaseServer
      .from('chat_messages')
      .insert([newMessage])
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ ok: true, message: data }), { status: 201 });
  } catch (err) {
    console.error('❌ POST message error:', err);
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 });
  }
}
