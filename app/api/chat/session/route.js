// app/api/chat/session/route.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { session_id, full_name, email, phone, facebook, line_id } = body;

    if (!session_id || !full_name || !email || !phone) {
      return new Response(JSON.stringify({ error: 'ข้อมูลไม่ครบถ้วน' }), { status: 400 });
    }

    const { data, error } = await supabase
      .from('chat_sessions')
      .insert([
        {
          session_id,
          full_name,
          email,
          phone,
          facebook: facebook || null,
          line_id: line_id || null,
        },
      ])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return new Response(JSON.stringify({ error: 'ไม่สามารถสร้าง session ได้' }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: 'สร้าง session สำเร็จ', data }), { status: 200 });
  } catch (err) {
    console.error('Server error:', err);
    return new Response(JSON.stringify({ error: 'เกิดข้อผิดพลาดบนเซิร์ฟเวอร์' }), { status: 500 });
  }
}
