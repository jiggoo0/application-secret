import { supabaseServer } from '@/lib/supabase/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const { phone } = await req.json();
  if (!phone?.trim()) {
    return new Response(JSON.stringify({ error: 'เบอร์โทรไม่ถูกต้อง' }), { status: 400 });
  }

  const { error } = await supabaseServer.from('users').update({ phone }).eq('id', session.user.id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }));
}
