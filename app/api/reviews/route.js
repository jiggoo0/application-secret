// app/api/reviews/route.js
import { NextResponse } from 'next/server';
import { generateFacebookStyleReviews } from '@/lib/fakereview/ThaiFeedbackGenerator';

/**
 * 🔹 GET /api/reviews?count=10
 * สร้างข้อมูลรีวิวจำลองแบบ Facebook-style
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const countParam = searchParams.get('count');
    const count = Math.max(1, Math.min(parseInt(countParam || '20', 10), 100));

    const reviews = await generateFacebookStyleReviews(count);

    if (!Array.isArray(reviews)) {
      throw new Error('Invalid data format');
    }

    return NextResponse.json(
      { reviews },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error('[Reviews API] ❌', error.message || error);
    return NextResponse.json({ error: 'Failed to generate reviews' }, { status: 500 });
  }
}
