import { NextResponse } from 'next/server';
import fake from '@/lib/mock/fakeChat';

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const url = new URL(req.url);
    const order = url.searchParams.get('order'); // newest | oldest
    const messages = fake.getMessages(id) || [];
    const sorted = order === 'newest' ? [...messages].reverse() : messages;
    return NextResponse.json({ ok: true, messages: sorted });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  const { id } = params;
  try {
    const body = await req.json();
    const { text, sender } = body;
    if (!text || !sender?.id || !sender?.name) {
      return NextResponse.json({ error: 'invalid message body' }, { status: 400 });
    }

    const added = fake.addMessage(id, { text, sender });
    if (!added) return NextResponse.json({ error: 'room not found' }, { status: 404 });

    return NextResponse.json({ ok: true, message: added }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'invalid body' }, { status: 400 });
  }
}
