import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

/**
 * POST /api/admin/uploads/preview
 * Request body: { path: string, expires?: number }
 */
export async function POST(req) {
  try {
    let { path, expires } = await req.json();

    if (!path || typeof path !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid file path' }, { status: 400 });
    }

    const filePath = path.trim().replace(/^\/+/, '');
    expires = Math.min(Number(expires) || 3600, 86400); // max 24h

    const { data, error } = await supabaseServer.storage
      .from('user-uploads')
      .createSignedUrl(filePath, expires);

    if (error || !data?.signedUrl) {
      console.error('[Preview] Supabase error:', error?.message || error);
      return NextResponse.json({ error: 'ไม่สามารถสร้างลิงก์ preview ได้' }, { status: 500 });
    }

    return NextResponse.json({ ok: true, url: data.signedUrl }, { status: 200 });
  } catch (err) {
    console.error('[Preview] Unexpected error:', err);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' }, { status: 500 });
  }
}
