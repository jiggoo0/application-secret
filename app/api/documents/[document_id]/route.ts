import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL || '', SUPABASE_SERVICE_ROLE_KEY || '', {
  auth: { persistSession: false },
});

// 💡 ขยาย Interface ให้รองรับข้อมูลที่หลากหลายขึ้นจาก Generator
interface UpdateDocumentBody {
  status: 'pending' | 'paid' | 'verified' | 'revoked' | 'canceled';
  pdf_url?: string;
  error_message?: string; // สำหรับบันทึกเหตุผลถ้าสร้าง PDF ไม่สำเร็จ
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ document_id: string }> },
) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  const { document_id } = await params;

  let body: UpdateDocumentBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { status, pdf_url, error_message } = body;

  // 💡 ตรวจสอบความถูกต้องของสถานะ
  if (!status) {
    return NextResponse.json({ error: 'Status is required' }, { status: 400 });
  }

  // เตรียมข้อมูลสำหรับ Update
  const updateData: any = { status };
  if (pdf_url) updateData.pdf_url = pdf_url;
  if (error_message) updateData.metadata = { last_error: error_message }; // หรือเก็บในฟิลด์ที่ต้องการ

  const { data, error } = await supabase
    .from('documents')
    .update(updateData)
    .eq('id', document_id)
    .select()
    .single();

  if (error || !data) {
    console.error('Update Error:', error);
    return NextResponse.json({ error: 'Document not found or update failed' }, { status: 404 });
  }

  return NextResponse.json({
    message: 'Document updated successfully',
    document: data,
  });
}
