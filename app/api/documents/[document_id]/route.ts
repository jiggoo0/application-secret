// /app/api/documents/[document_id]/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL || '', SUPABASE_SERVICE_ROLE_KEY || '', {
  auth: { persistSession: false },
});

interface UpdateDocumentBody {
  status: 'pending' | 'paid' | 'verified' | 'revoked';
  pdf_url: string;
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

  const { status, pdf_url } = body;

  if (!status || !pdf_url) {
    return NextResponse.json({ error: 'status and pdf_url are required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('documents')
    .update({ status, pdf_url })
    .eq('id', document_id)
    .select()
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Document not found or update failed' }, { status: 404 });
  }

  return NextResponse.json({
    message: 'Document updated successfully',
    document: data,
  });
}
