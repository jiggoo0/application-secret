// /lib/documents.ts

// *** FIX: เปลี่ยนการ Import เป็น supabaseServer ที่ถูก Export จาก Helper ***
import { supabaseServer } from '@/lib/supabase/server';
import { randomUUID } from 'crypto';

// 💡 Helper Function เพื่อดึง Client Instance
function getSupabaseClient() {
  const supabase = supabaseServer;
  if (!supabase) {
    throw new Error('Supabase client is not initialized. Check lib/supabase/server.ts config.');
  }
  return supabase;
}

export async function createDocument({ type, ref_id }) {
  // 💡 ใช้ Client Instance ที่ Import มาโดยตรง
  const supabase = getSupabaseClient();

  // ใช้ randomUUID ที่ถูก Import มา
  const documentId = randomUUID();
  const qrToken = randomUUID();

  // 💡 เพิ่ม created_at/updated_at เพื่อให้ข้อมูลสมบูรณ์
  const now = new Date().toISOString();

  const { error } = await supabase.from('documents').insert({
    id: documentId,
    type,
    ref_id,
    status: 'pending',
    qr_token: qrToken,
    pdf_url: null,
    created_at: now,
    updated_at: now,
    // เพิ่ม metadata เป็น empty object เพื่อป้องกัน error ถ้า schema ต้องการ
    metadata: {},
  });

  if (error) throw new Error(error.message);

  return {
    document_id: documentId,
    qr_token: qrToken,
    verify_url: `${process.env.NEXT_PUBLIC_BASE_URL}/verify/${qrToken}`,
  };
}

export async function verifyDocument(qrToken: string) {
  // 💡 ใช้ Client Instance ที่ Import มาโดยตรง
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from('documents')
    .select('id, type, status, ref_id, pdf_url, created_at, metadata') // เพิ่ม metadata
    .eq('qr_token', qrToken)
    .single();

  if (error || !data) return { status: 'invalid' };

  return { status: data.status, document: data };
}

export async function updateDocumentStatus(documentId: string, status: string, pdf_url?: string) {
  // 💡 ใช้ Client Instance ที่ Import มาโดยตรง
  const supabase = getSupabaseClient();

  const updatePayload: { status: string; pdf_url?: string; updated_at: string } = {
    status,
    updated_at: new Date().toISOString(),
  };

  if (pdf_url) {
    updatePayload.pdf_url = pdf_url;
  }

  const { error } = await supabase.from('documents').update(updatePayload).eq('id', documentId);

  if (error) throw new Error(error.message);

  return { success: true };
}
