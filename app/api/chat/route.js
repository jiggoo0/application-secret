import { NextResponse } from 'next/server';
import { getRooms } from '@/lib/services/mock/MockChatService';

export async function GET() {
  try {
    const rooms = await getRooms();
    return NextResponse.json({ ok: true, rooms });
  } catch (err) {
    console.error('❌ /api/chat error:', err);
    return NextResponse.json(
      { ok: false, error: err?.message || 'Unknown error' },
      { status: 500 },
    );
  }
}
