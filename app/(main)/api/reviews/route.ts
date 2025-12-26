/** @format */
import { NextResponse } from "next/server"
import { generateFacebookStyleReviews } from "@/lib/fakereview/ThaiFeedbackGenerator"
import type { FakeReview } from "@/lib/fakereview/ThaiFeedbackGenerator"

// ----------------------------------------------------
// 🚀 MEMORY_CACHE: เก็บข้อมูลไว้ในแรม ไม่ต้องเจนนใหม่ทุกรอบ
// ----------------------------------------------------
let cachedReviews: FakeReview[] | null = null
const MOCK_TOTAL_COUNT = 50
const DEFAULT_LIMIT = 6

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const page = Math.max(1, Number(searchParams.get("page") || 1))
    const limit = Math.max(
      1,
      Number(searchParams.get("limit") || DEFAULT_LIMIT)
    )

    const start = (page - 1) * limit
    const end = start + limit

    // 1. Singleton Generation: ถ้ามีของใน Cache แล้วให้ใช้เลย
    if (!cachedReviews) {
      console.log("⚡ [API]: Generating Initial Mock Reviews...")
      cachedReviews = await generateFacebookStyleReviews(MOCK_TOTAL_COUNT, 365)
    }

    // 2. Pagination: ดึงจาก Cache มา Slice
    const paginatedReviews = cachedReviews.slice(start, end)

    // 3. Data Transformation (มั่นใจว่าส่งเฉพาะ JSON Body)
    const reviews = paginatedReviews.map((review) => ({
      id: review.id,
      name: review.name,
      photo: review.photo,
      feedback: review.feedback,
      createdAt: review.createdAt,
      likes: review.likes,
    }))

    const totalPages = Math.ceil(MOCK_TOTAL_COUNT / limit)

    // ✅ NextResponse.json จะจัดการเรื่อง charset=utf-8 ให้โดยอัตโนมัติใน Body
    return NextResponse.json({
      success: true,
      reviews,
      pagination: {
        total: MOCK_TOTAL_COUNT,
        page,
        limit,
        totalPages,
      },
    })
  } catch (error) {
    console.error("❌ [Reviews API Error]:", error)

    // 🛡️ SECURITY: ป้องกัน Unicode Error ใน Status Header
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: "SERVER_ERROR",
        message: "Unicode processing failed",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
        // ❌ ห้ามมี statusText ที่เป็นภาษาไทยที่นี่
      }
    )
  }
}
