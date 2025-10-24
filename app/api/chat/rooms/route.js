// /app/api/chat/rooms/route.js
import { NextResponse } from 'next/server';
import fake from '@/lib/mock/fakeChat';

export async function GET() {
  const rooms = fake.getRooms();
  return NextResponse.json(rooms);
}

// optional: allow creating a room via POST
export async function POST(req) {
  try {
    const body = await req.json();
    const room = fake.createRoom(body);
    return NextResponse.json(room, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 });
  }
}
