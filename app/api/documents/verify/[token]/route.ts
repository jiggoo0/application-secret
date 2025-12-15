// app/api/documents/verify/[token]/route.ts

import { NextResponse } from 'next/server';
// *** FINAL FIX: เปลี่ยนการ Import ให้ตรงกับที่ Helper Export ***
import { supabaseServer } from '@/lib/supabase/server';

// *** FINAL FIX TYPE: ใช้ context ทั่วไปโดยไม่กำหนด Type ใน Signature ***
export async function GET(_req: Request, context) {
  // 💡 ใช้ Client Instance ที่ Import มาโดยตรง
  const supabase = supabaseServer;

  // Cast Type ชั่วคราวเมื่อใช้งาน เพื่อแก้ปัญหา Type Error ใน Build
  const token = (context.params as { token: string }).token;

  // 1. ตรวจสอบว่า Client ถูกสร้างสำเร็จหรือไม่
  if (!supabase) {
    console.error('❌ Supabase Client is null. Check server.ts logs.');
    return NextResponse.json(
      {
        status: 'error',
        message: 'Server database connection failed.',
      },
      { status: 500 },
    );
  }

  // 2. Query the database using the QR token
  const { data, error } = await supabase
    .from('documents')
    // 💡 เราใช้ 'token' ที่ถูกดึงออกมาจาก context.params
    .select('id, type, status, ref_id, pdf_url, created_at, metadata')
    .eq('qr_token', token)
    .single();

  // 3. Handle token not found or database error
  if (error || !data) {
    if (error) {
      console.error('❌ Supabase Verify Query Error:', error);
    }
    return NextResponse.json(
      {
        status: 'invalid',
        message: 'Document token not found or invalid.',
      },
      { status: 404 },
    );
  }

  // 4. Handle success: return the document status and data
  return NextResponse.json({
    status: data.status,
    document: data,
  });
}
