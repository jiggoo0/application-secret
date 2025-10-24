import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

export async function GET() {
  try {
    const { data: files, error } = await supabaseServer.storage.from('user-uploads').list('Work', {
      limit: 100,
      sortBy: { column: 'created_at', order: 'desc' },
    });

    if (error) throw error;

    console.log('[Supabase Files]', files);

    if (!files?.length) {
      return NextResponse.json([]);
    }

    const urls = files.map((file) => {
      const { data: urlData } = supabaseServer.storage
        .from('user-uploads')
        .getPublicUrl(`Work/${file.name}`);

      return {
        name: file.name,
        url: urlData.publicUrl,
        type: file.metadata?.mimetype || 'unknown',
        size: file.metadata?.size || 0,
        created_at: file.created_at ?? null,
        updated_at: file.updated_at ?? null,
      };
    });

    return NextResponse.json(urls);
  } catch (err) {
    console.error('[Works API] ❌', err.message || err);
    return NextResponse.json(
      { error: 'โหลดข้อมูลไฟล์ล้มเหลว', details: err.message },
      { status: 500 },
    );
  }
}
