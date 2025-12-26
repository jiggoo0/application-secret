// lib/fakereview/utils.ts
// 🔧 Production-ready utilities for Fake Reviews

// ----------------------------------------------------
// 1. INTERFACES & TYPES
// ----------------------------------------------------

interface GetLikesOptions {
  rating?: number
  createdAt: string | Date // วันที่รีวิว (ISO string หรือ Date object)
}

// ----------------------------------------------------
// 2. UTILITY FUNCTIONS
// ----------------------------------------------------

/**
 * 🔢 สุ่มวันที่ย้อนหลังภายในจำนวนวันที่กำหนด (default: 180 วัน)
 * @param daysLimit - จำนวนวันที่ย้อนหลังสูงสุด
 * @returns ISO string ของวันที่
 */
export function getRandomDate(daysLimit: number = 180): string {
  const daysAgo = Math.floor(Math.random() * daysLimit)
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date.toISOString()
}

/**
 * 📅 แปลงวันที่ ISO เป็นรูปแบบไทย เช่น “14 ตุลาคม 2568”
 * @param isoDate - วันที่ ISO หรือ Date object
 * @returns วันที่ในรูปแบบไทย
 */
export function formatThaiDate(isoDate: string | Date): string {
  const months: string[] = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ]

  // 💡 สร้าง Date object จาก input
  const d = new Date(isoDate)

  // 💡 ตรวจสอบความถูกต้องของ Date object
  if (isNaN(d.getTime())) {
    console.error(`[formatThaiDate] Invalid date input: ${isoDate}`)
    return "วันที่ไม่ถูกต้อง"
  }

  const day = d.getDate()
  const month = months[d.getMonth()]
  // 💡 ปี พ.ศ. (เพิ่ม 543)
  const year = d.getFullYear() + 543

  return `${day} ${month} ${year}`
}

/**
 * 👍 จำลองจำนวน Likes ของรีวิวแบบสมจริง
 * @param options - อ็อบเจกต์ที่มี rating และ createdAt
 * @returns จำนวน Likes
 */
export function getRealisticLikes({
  rating = 3,
  createdAt,
}: GetLikesOptions): number {
  // 💡 การแปลง rating เป็น number เพื่อความปลอดภัย
  const safeRating = typeof rating === "number" ? rating : 3

  // ยิ่ง rating สูง มักได้ likes เยอะขึ้น
  const base: number = safeRating * 5
  const variance: number = Math.floor(Math.random() * 5)

  // อายุของรีวิวก็มีผล: รีวิวเก่าอาจมีเวลาให้ Likes เพิ่มขึ้น
  const now = new Date()
  const reviewDate = new Date(createdAt)

  if (isNaN(reviewDate.getTime())) {
    console.warn(
      `[getRealisticLikes] Invalid createdAt date: ${createdAt}. Using 0 days old.`
    )
    return Math.floor(base + variance)
  }

  const daysOld: number = Math.floor(
    (now.getTime() - reviewDate.getTime()) / (1000 * 60 * 60 * 24)
  )
  // เพิ่มขึ้นไม่เกิน +15 likes
  const ageFactor: number = Math.min(daysOld, 30) * 0.5

  return Math.floor(base + variance + ageFactor)
}
