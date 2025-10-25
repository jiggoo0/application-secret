import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { supabaseServer } from '@/lib/supabase/server';
import { uploadFile, deleteFile, getPublicUrl, listWorkMedia } from '@/lib/supabase/uploadService';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME = ['image/', 'video/', 'application/pdf', 'text/plain'];

function sanitizeEmail(email) {
  return email.replace(/[@.]/g, '_');
}

/** 🔹 GET: ดึงรายการไฟล์ของผู้ใช้ */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    const folder = sanitizeEmail(email);
    const files = await listWorkMedia(`user/${folder}`);

    return new Response(JSON.stringify(files), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('❌ GET /user error:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

/** 🔹 POST: อัปโหลดไฟล์ใหม่ */
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    const formData = await req.formData();
    const file = formData.get('file');
    if (!file || typeof file === 'string') {
      return new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return new Response(JSON.stringify({ error: 'File too large (max 10MB)' }), { status: 413 });
    }

    const mime = file.type || '';
    if (!ALLOWED_MIME.some((prefix) => mime.startsWith(prefix))) {
      return new Response(JSON.stringify({ error: `Unsupported file type: ${mime}` }), {
        status: 415,
      });
    }

    const folder = sanitizeEmail(email);
    const timestamp = Date.now();
    const path = `user/${folder}/${timestamp}-${file.name}`;

    await uploadFile(file, path);

    const { error: dbError } = await supabaseServer.from('uploads').insert([
      {
        user_email: email,
        path,
        name: file.name,
        type: mime,
        status: 'pending',
      },
    ]);
    if (dbError) throw dbError;

    const publicUrl = getPublicUrl(path);

    return new Response(JSON.stringify({ url: publicUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('❌ POST /user error:', err);
    return new Response(JSON.stringify({ error: err.message || 'Upload failed' }), { status: 500 });
  }
}

/** 🔹 DELETE: ลบไฟล์ (ต้องส่ง ?path=) */
export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    const { searchParams } = new URL(req.url);
    const path = searchParams.get('path');
    if (!path) {
      return new Response(JSON.stringify({ error: 'File path required' }), { status: 400 });
    }

    await deleteFile(path);

    const { error: dbError } = await supabaseServer.from('uploads').delete().eq('path', path);
    if (dbError) throw dbError;

    return new Response(JSON.stringify({ message: 'File deleted' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('❌ DELETE /user error:', err);
    return new Response(JSON.stringify({ error: err.message || 'Delete failed' }), { status: 500 });
  }
}
