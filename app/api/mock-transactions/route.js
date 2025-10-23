import { NextResponse } from 'next/server';
import { getMockTransactions } from '@/lib/services/mock/MockTransactionService';

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const count = parseInt(url.searchParams.get('count')) || 20;
    const data = await getMockTransactions(count);

    if (!Array.isArray(data)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('[API] ❌ Failed to get mock transactions:', err);
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}
