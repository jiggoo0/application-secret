import { NextResponse } from 'next/server';
import { getMockTransactions } from '@/lib/services/mock/MockTransactionService';

/**
 * 🔹 GET /api/mock-transactions?count=20
 * คืนข้อมูลธุรกรรมจำลอง (mock data)
 */
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const rawCount = url.searchParams.get('count');
    const parsedCount = parseInt(rawCount, 10);

    const count = Number.isFinite(parsedCount) ? Math.max(1, Math.min(parsedCount, 100)) : 20; // fallback เป็น 20 หากไม่ใช่ตัวเลข

    const data = await getMockTransactions(count);

    if (!Array.isArray(data)) {
      console.warn('[MockTransactions API] ⚠️ Invalid data format:', data);
      throw new Error('Invalid data format');
    }

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.error('[MockTransactions API] ❌ Unexpected error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch transactions', message: err.message || 'Unknown error' },
      { status: 500 },
    );
  }
}
