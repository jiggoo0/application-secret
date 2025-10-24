import { NextResponse } from 'next/server';
import { getRoomById } from '@/lib/services/mock/MockChatService';

export async function GET(req, { params }) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ ok: false, error: 'Room ID missing' }, { status: 400 });
    }

    const room = await getRoomById(id);
    if (!room) {
      return NextResponse.json({ ok: false, error: 'Room not found' }, { status: 404 });
    }

    return NextResponse.json({ ok: true, room });
  } catch (err) {
    console.error('❌ /api/chat/rooms/[id] error:', err);
    return NextResponse.json(
      { ok: false, error: err?.message || 'Unknown error' },
      { status: 500 },
    );
  }
}
