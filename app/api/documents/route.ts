import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';
import { randomUUID } from 'crypto';

export async function POST(req: Request) {
  const supabase = supabaseServer;

  // 1. ตรวจสอบ API Key
  const apiKey = req.headers.get('x-api-key');
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabase) return NextResponse.json({ error: 'Database error' }, { status: 500 });

  const body = await req.json();
  const { type, ref_id, data } = body;

  const documentId = randomUUID();
  const qrToken = randomUUID();

  // 🛠️ แก้ไขตรงนี้: บังคับใช้โดเมนจริงของคุณ
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.jpvisouldocs.online';
  const normalizedBaseUrl = baseUrl.replace(/\/$/, '');
  const verifyUrl = `${normalizedBaseUrl}/verify/${qrToken}`;

  const { error } = await supabase.from('documents').insert({
    id: documentId,
    type,
    ref_id,
    status: 'pending',
    qr_token: qrToken,
    metadata: data || {},
    created_at: new Date().toISOString(),
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    document_id: documentId,
    qr_token: qrToken,
    verify_url: verifyUrl, // ส่ง URL ที่ถูกต้องกลับไป
  });
}
