import { uploadFile, getPublicUrl } from '@/lib/supabase/uploadService';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { supabaseServer } from '@/lib/supabase/server';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return new Response(JSON.stringify({ error: 'No file uploaded' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // ✅ ป้องกันไฟล์ใหญ่เกิน 10MB
    if (file.size > 10 * 1024 * 1024) {
      return new Response(JSON.stringify({ error: 'File too large (max 10MB)' }), {
        status: 413,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const timestamp = Date.now();
    const emailFolder = session.user.email.replace(/[@.]/g, '_');
    const path = `user/${emailFolder}/${timestamp}-${file.name}`;

    // ✅ Upload to Supabase Storage
    await uploadFile(file, path);

    // ✅ Generate public URL
    const url = getPublicUrl(path);

    // ✅ Save metadata in DB
    const { error: dbError } = await supabaseServer.from('uploads').insert([
      {
        user_email: session.user.email,
        path,
        name: file.name,
        type: file.type,
        status: 'pending',
        created_at: new Date().toISOString(),
      },
    ]);
    if (dbError) throw dbError;

    // ✅ Success response
    return new Response(JSON.stringify({ url }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('[Upload API] ❌', err.message || err);
    return new Response(JSON.stringify({ error: err.message || 'Upload failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
