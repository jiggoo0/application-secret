// app/api/chat/route.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { session_id, full_name, email, phone, facebook, line_id, message_text } = body;

    if (!session_id || !message_text || !email || !full_name || !phone) {
      return new Response(JSON.stringify({ error: 'ข้อมูลไม่ครบถ้วน' }), { status: 400 });
    }

    const { data: session, error: sessionError } = await supabase
      .from('chat_sessions')
      .select('id')
      .eq('session_id', session_id)
      .single();

    if (sessionError || !session) {
      return new Response(JSON.stringify({ error: 'ไม่พบ session ที่ระบุ' }), { status: 404 });
    }

    const { data, error } = await supabase
      .from('chat_messages')
      .insert([
        {
          user_id: session.id,
          user_name: full_name,
          user_email: email,
          user_phone: phone,
          facebook: facebook || null,
          line: line_id || null,
          message_text,
        },
      ])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return new Response(JSON.stringify({ error: 'ไม่สามารถบันทึกข้อความได้' }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: 'ส่งข้อความสำเร็จ', data }), { status: 200 });
  } catch (err) {
    console.error('Server error:', err);
    return new Response(JSON.stringify({ error: 'เกิดข้อผิดพลาดบนเซิร์ฟเวอร์' }), { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Supabase fetch error:', error);
      return new Response(JSON.stringify({ error: 'ไม่สามารถโหลดข้อความได้' }), { status: 500 });
    }

    return new Response(JSON.stringify({ messages: data }), { status: 200 });
  } catch (err) {
    console.error('Server error:', err);
    return new Response(JSON.stringify({ error: 'เกิดข้อผิดพลาดบนเซิร์ฟเวอร์' }), { status: 500 });
  }
}
