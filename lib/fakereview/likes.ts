/** @format */

// ----------------------------------------------------
// 1. INTERFACES & TYPES
// ----------------------------------------------------

interface GetLikesOptions {
  rating: number
  /** วันที่รีวิว (ISO string หรือ Date object) */
  createdAt: string | Date
}

// ----------------------------------------------------
// 2. UTILITY FUNCTIONS
// ----------------------------------------------------

/**
 * ❤️ GENERATE_REALISTIC_LIKES
 * คำนวณจำนวนไลค์สมจริงตามคะแนนเรตติ้งและอายุของข้อมูล (Days Age)
 * @param options - { rating, createdAt }
 * @returns จำนวน Likes (ขั้นต่ำ 1)
 */
export function getRealisticLikes({
  rating,
  createdAt,
}: GetLikesOptions): number {
  const reviewDate = new Date(createdAt)

  // 💡 ป้องกันการคำนวณผิดพลาดหาก Date Invalid
  if (isNaN(reviewDate.getTime())) return Math.floor(Math.random() * 10) + 1

  // 💡 คำนวณอายุโพสต์ (วัน)
  const diffTime = Math.abs(Date.now() - reviewDate.getTime())
  const ageDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  /**
   * 🏗️ LOGIC_CALCULATION:
   * 1. Base: Rating x 8 (เช่น 5 ดาว = 40 ไลค์พื้นฐาน)
   * 2. Variance: สุ่มเพิ่ม 0-25 เพื่อความไม่ซ้ำกัน
   * 3. Recency Boost: ยิ่งรีวิวใหม่ (ไม่เกิน 30 วัน) ยิ่งได้ไลค์เยอะขึ้น
   */
  let baseLikes = rating * 8 + Math.random() * 25

  // เพิ่มค่าความนิยมสำหรับรีวิวใหม่ (Trending Effect)
  const recencyBoost = Math.max(0, 30 - ageDays) * 2

  return Math.max(1, Math.floor(baseLikes + recencyBoost))
}

/**
 * 💾 INCREMENT_USER_LIKES (Client-Side Only)
 * บันทึกการกดไลค์ส่วนตัวของผู้ใช้ลงใน LocalStorage เพื่อให้ยอดไม่หายเมื่อ Refresh
 */
export function incrementLikes(id: string): number {
  // 🛡️ SSR_PROTECTION: ตรวจสอบว่าเป็น Browser Environment หรือไม่
  if (typeof window === "undefined") return 0

  try {
    const key = `jp_likes_registry_${id}` // ใช้ Prefix เพื่อป้องกันชื่อซ้ำกับแอปอื่น
    const currentStr = localStorage.getItem(key)
    const currentCount = currentStr ? parseInt(currentStr, 10) : 0

    const newCount = isNaN(currentCount) ? 1 : currentCount + 1

    localStorage.setItem(key, newCount.toString())
    return newCount
  } catch (error) {
    console.error(
      `[System_Storage_Error]: Failed to increment likes for ID: ${id}`,
      error
    )
    return 0
  }
}

/**
 * 🔍 GET_PERSISTENT_LIKES (Client-Side Only)
 * ดึงสถานะการกดไลค์ที่บันทึกไว้ในเครื่องผู้ใช้
 */
export function getLikes(id: string): number {
  if (typeof window === "undefined") return 0

  try {
    const key = `jp_likes_registry_${id}`
    const value = localStorage.getItem(key)
    const parsedValue = value ? parseInt(value, 10) : 0

    return isNaN(parsedValue) ? 0 : parsedValue
  } catch (error) {
    console.error(
      `[System_Storage_Error]: Failed to retrieve likes for ID: ${id}`,
      error
    )
    return 0
  }
}
