// app/api/reviews/route.js
import { NextResponse } from 'next/server';
import { generateFacebookStyleReviews } from '@/lib/fakereview/ThaiFeedbackGenerator';

// ---------------------------
// GET /api/reviews
// ---------------------------
export async function GET(request) {
  try {
    // อ่าน query param เช่น /api/reviews?count=10
    const { searchParams } = new URL(request.url);
    const countParam = parseInt(searchParams.get('count') || '20', 10);
    const count = Math.max(1, Math.min(countParam, 100)); // จำกัดไม่เกิน 100

    // สร้างข้อมูลรีวิวจำลอง
    const reviews = await generateFacebookStyleReviews(count);

    if (!Array.isArray(reviews)) {
      throw new Error('Invalid data format');
    }

    // ส่งข้อมูลกลับเป็น JSON
    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error) {
    console.error('❌ Failed to generate reviews:', error);
    return NextResponse.json({ error: 'Failed to generate reviews' }, { status: 500 });
  }
}
