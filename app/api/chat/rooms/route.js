import { NextResponse } from 'next/server';
import fake from '@/lib/mock/fakeChat';

export async function GET() {
  try {
    const rooms = fake.getRooms();
    return NextResponse.json({ ok: true, rooms });
  } catch (err) {
    console.error('Failed to fetch rooms:', err);
    return NextResponse.json({ error: 'failed to fetch rooms' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body?.name) {
      return NextResponse.json({ error: 'Room name is required' }, { status: 400 });
    }

    const room = fake.createRoom(body);
    return NextResponse.json({ ok: true, room }, { status: 201 });
  } catch (err) {
    console.error('Failed to create room:', err);
    return NextResponse.json({ error: 'invalid body' }, { status: 400 });
  }
}
