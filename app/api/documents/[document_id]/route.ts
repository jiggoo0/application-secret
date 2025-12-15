// /app/api/documents/[document_id]/route.ts

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// 💡 CONFIGURATION: ใช้ Service Role Key สำหรับการดำเนินการที่ต้องการสิทธิ์สูง
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// 💡 Initialize Supabase Client
const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
  auth: { persistSession: false },
});

// ==========================================================
// PATCH /api/documents/[document_id]
// ==========================================================
// *** FINAL FIX TYPE: ใช้ context ทั่วไปโดยไม่กำหนด Type ใน Signature ***
export async function PATCH(
  request: Request,
  context, // ปล่อยให้ TypeScript อนุมาน
) {
  // Cast Type ชั่วคราวเมื่อใช้งาน เพื่อแก้ปัญหา Type Error ใน Build
  const documentId = (context.params as { document_id: string }).document_id;

  // 1. ตรวจสอบ documentId
  if (!documentId) {
    return NextResponse.json({ error: 'Document ID is required' }, { status: 400 });
  }

  // 2. รับ Payload (Body)
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // 3. ตรวจสอบข้อมูลที่ต้องอัปเดต
  const { status, pdf_url } = body;
  if (!status || !pdf_url) {
    return NextResponse.json(
      { error: 'Missing required fields: status and pdf_url' },
      { status: 400 },
    );
  }

  // 4. อัปเดตข้อมูลใน Supabase
  try {
    const { data, error } = await supabase
      .from('documents')
      .update({
        status: status,
        pdf_url: pdf_url,
        updated_at: new Date().toISOString(),
      })
      // ใช้ 'id' ที่เป็น Primary Key ที่ถูกต้อง
      .eq('id', documentId)
      .select();

    if (error) {
      console.error('❌ Supabase Update Error (API PATCH):', error);
      return NextResponse.json(
        {
          error: 'Failed to update document status in DB.',
          details: error.message,
        },
        { status: 500 },
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Document not found or nothing updated' }, { status: 404 });
    }

    // 5. ส่ง Success Response กลับไป
    return NextResponse.json(
      { message: 'Document status updated successfully', document: data[0] },
      { status: 200 },
    );
  } catch (e) {
    console.error('❌ Unhandled Server Error (API PATCH):', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
