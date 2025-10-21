import { supabaseServer } from '@/lib/supabase/server';

/**
 * 🔹 GET: ดึงค่าการตั้งค่า
 */
export async function GET() {
  try {
    const { data, error } = await supabaseServer.from('settings').select('*').limit(1).single();

    if (error) throw error;

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[Settings API] GET error:', err);
    return new Response(JSON.stringify({ error: err.message || 'Failed to load settings' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

/**
 * 🔹 PATCH: อัปเดตค่าการตั้งค่า
 */
export async function PATCH(req) {
  try {
    const body = await req.json();

    if (!body || typeof body !== 'object') {
      return new Response(JSON.stringify({ error: 'Invalid body' }), {
        status: 400,
      });
    }

    const { data, error } = await supabaseServer
      .from('settings')
      .update(body)
      .eq('id', 1) // สมมติว่า settings มี row เดียว id=1
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[Settings API] PATCH error:', err);
    return new Response(JSON.stringify({ error: err.message || 'Failed to update settings' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
