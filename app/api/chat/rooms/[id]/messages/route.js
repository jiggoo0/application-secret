import { NextResponse } from 'next/server';
import { getMessages, addMessage } from '@/lib/services/mock/MockChatService';

export async function GET(req, context) {
  try {
    const params = await context.params;
    const { id } = params;
    if (!id) {
      return NextResponse.json({ ok: false, error: 'Room ID missing' }, { status: 400 });
    }

    const url = new URL(req.url);
    const order = url.searchParams.get('order') || 'newest';

    const messages = await getMessages(id, order);
    return NextResponse.json({ ok: true, messages });
  } catch (err) {
    console.error('❌ /api/chat/rooms/[id]/messages GET error:', err);
    return NextResponse.json({ ok: false, error: err.message || 'Unknown error' }, { status: 500 });
  }
}

export async function POST(req, context) {
  try {
    const params = await context.params;
    const { id } = params;
    if (!id) {
      return NextResponse.json({ ok: false, error: 'Room ID missing' }, { status: 400 });
    }

    const body = await req.json();
    const { text, sender } = body;
    if (!text || !sender) {
      return NextResponse.json({ ok: false, error: 'Missing text or sender' }, { status: 400 });
    }

    const message = await addMessage(id, text, sender);
    return NextResponse.json({ ok: true, message });
  } catch (err) {
    console.error('❌ /api/chat/rooms/[id]/messages POST error:', err);
    return NextResponse.json({ ok: false, error: err.message || 'Unknown error' }, { status: 500 });
  }
}
