// app/api/reviews/route.ts

import { NextResponse } from 'next/server';

// ✅ Import function (runtime)
import { generateFacebookStyleReviews } from '@/lib/fakereview/ThaiFeedbackGenerator';

// ✅ Import type (type-only)
import type { FakeReview } from '@/lib/fakereview/ThaiFeedbackGenerator';

// ----------------------------------------------------
// CONFIG
// ----------------------------------------------------

const MOCK_TOTAL_COUNT = 50;
const DEFAULT_LIMIT = 5;

// ----------------------------------------------------
// API ROUTE HANDLER (GET)
// ----------------------------------------------------

/**
 * GET /api/reviews?page=...&limit=...
 * ใช้ Fake Review Generator (ไม่พึ่ง Supabase)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get('page') ?? 1);
    const limit = Number(searchParams.get('limit') ?? DEFAULT_LIMIT);

    const start = (page - 1) * limit;
    const end = start + limit;

    // 1. Generate mock reviews
    const allMockReviews: FakeReview[] = await generateFacebookStyleReviews(MOCK_TOTAL_COUNT, 365);

    // 2. Pagination
    const paginatedReviews = allMockReviews.slice(start, end);

    // 3. Shape response
    const reviews = paginatedReviews.map((review) => ({
      id: review.id,
      name: review.name,
      photo: review.photo,
      feedback: review.feedback,
      createdAt: review.createdAt,
      likes: review.likes,
    }));

    const totalPages = Math.ceil(MOCK_TOTAL_COUNT / limit);

    return NextResponse.json({
      success: true,
      reviews,
      count: MOCK_TOTAL_COUNT,
      page,
      limit,
      totalPages,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown error during reviews API execution';

    console.error('[Reviews API]', message);

    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
