import { supabaseServer } from '@/lib/supabase/server';

export async function POST(req, { params }) {
  const resolvedParams = await params;
  const { roomId } = resolvedParams;

  if (!roomId) {
    return new Response(JSON.stringify({ ok: false, error: 'Missing roomId' }), { status: 400 });
  }

  try {
    const body = await req.json();
    const content = body.content?.trim();
    const adminUserId = body.user_id; // ต้องเป็น uuid ของแอดมิน
    const adminUserName = body.user_name || 'Admin';
    const adminEmail = body.user_email || '';

    if (!content) {
      return new Response(JSON.stringify({ ok: false, error: 'Content is required' }), {
        status: 400,
      });
    }

    const newMessage = {
      room_id: roomId,
      user_id: adminUserId,
      user_name: adminUserName,
      user_email: adminEmail,
      content,
      sender_id: adminUserId,
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
    console.error('❌ Admin POST message error:', err);
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 });
  }
}
