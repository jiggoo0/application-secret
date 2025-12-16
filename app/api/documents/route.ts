// /app/api/documents/route.ts
import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';
import { randomUUID } from 'crypto';

interface CreateDocumentBody {
  type: string;
  ref_id: string;
  metadata?: Record<string, any>;
}

export async function POST(req: Request) {
  const supabase = supabaseServer;

  if (!supabase) {
    return NextResponse.json({ error: 'Supabase client not initialized' }, { status: 500 });
  }

  let body: CreateDocumentBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { type, ref_id, metadata } = body;

  if (!type || !ref_id) {
    return NextResponse.json({ error: 'type and ref_id are required' }, { status: 400 });
  }

  const documentId = randomUUID();
  const qrToken = randomUUID();

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL || 'http://localhost:3000';

  const normalizedBaseUrl = baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`;

  const verifyUrl = `${normalizedBaseUrl}/verify/${qrToken}`;

  const { error } = await supabase.from('documents').insert({
    id: documentId,
    type,
    ref_id,
    status: 'pending',
    qr_token: qrToken,
    pdf_url: null,
    metadata: metadata ?? {},
  });

  if (error) {
    console.error('Supabase insert error:', error.message);
    return NextResponse.json({ error: 'Failed to create document' }, { status: 500 });
  }

  return NextResponse.json({
    document_id: documentId,
    qr_token: qrToken,
    verify_url: verifyUrl,
  });
}
