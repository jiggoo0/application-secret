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

    // ✅ ป้องกัน input ผิดพลาดและจำกัดจำนวน
    const count = Math.max(1, Math.min(Number(countParam) || 20, 100));

    // ✅ สร้างรีวิวจำลอง
    const reviews = await generateFacebookStyleReviews(count);

    // ✅ ตรวจสอบว่าได้ array จริง
    if (!Array.isArray(reviews)) {
      console.warn('[Reviews API] ⚠️ Unexpected data format:', reviews);
      throw new Error('Invalid data format');
    }

    // ✅ ส่ง response พร้อม header ที่เหมาะสม
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
    return NextResponse.json(
      { error: 'Failed to generate reviews' },
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
