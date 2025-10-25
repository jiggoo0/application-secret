import { NextResponse } from 'next/server';
import { getMockTransactions } from '@/lib/services/mock/MockTransactionService';

/**
 * 🔹 GET /api/mock-transactions?count=20
 * คืนข้อมูลธุรกรรมจำลอง (mock data)
 */
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const count = Math.max(1, Math.min(parseInt(url.searchParams.get('count') || '20', 10), 100));

    const data = await getMockTransactions(count);

    if (!Array.isArray(data)) {
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
    console.error('[MockTransactions API] ❌', err.message || err);
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}
