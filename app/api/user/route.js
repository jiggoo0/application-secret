import { supabaseServer } from '@/lib/supabase/server';
import { uploadFile, deleteFile, getPublicUrl, listWorkMedia } from '@/lib/supabase/uploadService';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

/**
 * 🔹 GET: ดึงรายการไฟล์ของผู้ใช้
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const emailFolder = session.user.email.replace(/[@.]/g, '_');
    const files = await listWorkMedia(`user/${emailFolder}`);

    return new Response(JSON.stringify(files), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('❌ GET /user error:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

/**
 * 🔹 POST: อัปโหลดไฟล์ใหม่
 */
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400 });
    }

    const timestamp = Date.now();
    const emailFolder = session.user.email.replace(/[@.]/g, '_');
    const path = `user/${emailFolder}/${timestamp}-${file.name}`;

    // Upload file to Supabase Storage
    await uploadFile(file, path);

    // Insert metadata into Supabase table 'uploads'
    const { error: dbError } = await supabaseServer.from('uploads').insert({
      user_email: session.user.email,
      path,
      name: file.name,
      type: file.type,
      status: 'pending',
    });
    if (dbError) throw dbError;

    return new Response(JSON.stringify({ url: getPublicUrl(path) }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('❌ POST /user error:', err);
    return new Response(JSON.stringify({ error: err.message || 'Upload failed' }), { status: 500 });
  }
}

/**
 * 🔹 DELETE: ลบไฟล์ (ต้องส่ง ?path=)
 */
export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const path = searchParams.get('path');
    if (!path) {
      return new Response(JSON.stringify({ error: 'File path required' }), { status: 400 });
    }

    // Delete file from Supabase Storage
    await deleteFile(path);

    // Delete metadata from uploads table
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
