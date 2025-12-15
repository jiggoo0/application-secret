// /app/api/documents/route.ts
// Method: POST
// Function: Initialize a new document record and generate a unique QR token.

import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server'; // <<< แก้ไข: ใช้ Named Import ที่ถูกต้อง
import { randomUUID } from 'crypto';

export async function POST(req: Request) {
  // 1. Setup Supabase Client
  const supabase = supabaseServer;

  // 💡 ตรวจสอบ Client: หาก Supabase Client ไม่สามารถสร้างได้ (เพราะ ENV หาย) จะตอบ 500 ทันที
  if (!supabase) {
    return NextResponse.json(
      { error: 'Server configuration error: Supabase client not initialized.' },
      { status: 500 },
    );
  }

  // 2. Input Validation
  let body: { type: string; ref_id: string; metadata?: any };
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON body provided.' }, { status: 400 });
  }

  const { type, ref_id, metadata } = body;

  if (!type || !ref_id) {
    return NextResponse.json(
      { error: 'Missing required fields: type and ref_id.' },
      { status: 400 },
    );
  }

  // 3. Generate unique identifiers
  const documentId = randomUUID();
  const qrToken = randomUUID();

  // 4. Determine Base URL for Verification
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL || 'http://localhost:3000';
  const verifyUrl = `${baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`}/verify/${qrToken}`;

  // 5. Insert the initial record into the database
  const { error } = await supabase.from('documents').insert({
    id: documentId,
    type: type,
    ref_id: ref_id,
    status: 'pending',
    qr_token: qrToken,
    pdf_url: null,
    metadata: metadata || {},
    // 💡 หากตารางมีฟิลด์ NOT NULL อื่นๆ ที่คุณไม่ได้ส่งมา ต้องเพิ่มตรงนี้!
  });

  if (error) {
    // 💡 ข้อความ Error ที่แท้จริงจาก Supabase ถูก Log ใน Terminal ของ Next.js Server
    console.error('Supabase Insert Error:', error.message);
    // ตอบกลับ Client ด้วย Generic Error 500
    return NextResponse.json({ error: 'Database error during initialization.' }, { status: 500 });
  }

  // 6. Return the success response
  return NextResponse.json({
    document_id: documentId,
    qr_token: qrToken,
    verify_url: verifyUrl,
  });
}
