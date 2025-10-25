import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/auth-helpers-nextjs';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  const supabase = createServerClient({ cookies });

  try {
    const body = await req.json();
    const { name, password } = body;

    if (!name || !password) {
      return NextResponse.json({ error: 'กรุณาระบุชื่อห้องและรหัสผ่าน' }, { status: 400 });
    }

    const roomId = `room_${uuidv4().slice(0, 6)}`;

    const { error } = await supabase.from('chat_rooms').insert([
      {
        id: roomId,
        name,
        room_password: password,
      },
    ]);

    if (error) {
      console.error('❌ Create room error:', error);
      return NextResponse.json({ error: 'ไม่สามารถสร้างห้องได้' }, { status: 500 });
    }

    return NextResponse.json({ success: true, roomId }, { status: 200 });
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดในระบบ' }, { status: 500 });
  }
}
