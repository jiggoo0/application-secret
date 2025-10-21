import { NextResponse } from 'next/server';
import { generateFacebookStyleReviews } from '@/lib/fakereview/ThaiFeedbackGenerator';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const countParam = parseInt(searchParams.get('count') || '20', 10);
    const count = Math.max(1, Math.min(countParam, 100)); // ป้องกันเกิน 100

    const reviews = await generateFacebookStyleReviews(count);

    if (!Array.isArray(reviews)) {
      throw new Error('Invalid data format');
    }

    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error) {
    console.error('❌ Failed to generate reviews:', error);
    return NextResponse.json({ error: 'Failed to generate reviews' }, { status: 500 });
  }
}
