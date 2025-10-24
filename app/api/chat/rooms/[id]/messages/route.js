// /app/api/chat/rooms/[id]/messages/route.js
import { NextResponse } from 'next/server';
import fake from '@/lib/mock/fakeChat';

export async function GET(req, { params }) {
  const { id } = params;
  const messages = fake.getMessages(id) || [];
  // return newest-first or oldest-first depending on UI needs
  return NextResponse.json(messages);
}

export async function POST(req, { params }) {
  const { id } = params;
  try {
    const body = await req.json();
    // Expect body: { text: 'hi', sender: { id, name, avatar } }
    if (!body?.text) return NextResponse.json({ error: 'missing text' }, { status: 400 });
    const added = fake.addMessage(id, { text: body.text, sender: body.sender });
    if (!added) return NextResponse.json({ error: 'room not found' }, { status: 404 });
    return NextResponse.json(added, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 });
  }
}
