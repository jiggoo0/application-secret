// lib/fakereview/likes.ts

// ----------------------------------------------------
// 1. INTERFACES & TYPES
// ----------------------------------------------------

interface GetLikesOptions {
  rating: number;
  createdAt: string | Date; // วันที่รีวิว (ISO string หรือ Date object)
}

// ----------------------------------------------------
// 2. UTILITY FUNCTIONS
// ----------------------------------------------------

/**
 * ❤️ สร้างจำนวนไลค์สมจริงตาม rating และอายุโพสต์
 * @param options - มี rating และ createdAt
 * @returns จำนวน Likes (อย่างน้อย 1)
 */
export function getRealisticLikes({ rating, createdAt }: GetLikesOptions): number {
  // 💡 คำนวณอายุโพสต์เป็นวัน
  const ageDays: number = Math.floor(
    (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24),
  );

  // 💡 ฐานไลค์ขึ้นอยู่กับ Rating และ Variance
  let base: number = rating * 8 + Math.random() * 20;

  // 💡 รีวิวใหม่จะได้ Boost Likes: ยิ่งวันน้อยยิ่งบวกเยอะ
  base += Math.max(0, 30 - ageDays) * 1.5;

  // 💡 รับประกันว่ามีอย่างน้อย 1 ไลค์
  return Math.max(1, Math.floor(base));
}

/**
 * 💾 บันทึกยอดไลค์ใน localStorage และเพิ่มขึ้น 1
 * @param id - Review ID
 * @returns จำนวนไลค์ใหม่
 */
export function incrementLikes(id: string): number {
  // 🚨 ตรวจสอบว่าเป็น Client Environment (ป้องกัน Server-Side Crash)
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return 0;
  }

  try {
    const key = `likes_${id}`;
    // 💡 ดึงค่าปัจจุบันมาเป็นตัวเลข
    const current: number = parseInt(localStorage.getItem(key) || '0', 10);

    // 💡 ตรวจสอบว่าค่าที่ได้มาเป็นตัวเลขที่ถูกต้องหรือไม่
    const newCount: number = isNaN(current) ? 1 : current + 1;

    localStorage.setItem(key, newCount.toString());
    return newCount;
  } catch (e) {
    console.error(`[localStorage] Failed to increment like for ${id}:`, e);
    return 0;
  }
}

/**
 * 🔍 ดึงยอดไลค์ที่ผู้ใช้คนนี้เคยทำไว้จาก localStorage
 * @param id - Review ID
 * @returns จำนวนไลค์ที่บันทึกไว้ (0 ถ้าไม่มี)
 */
export function getLikes(id: string): number {
  // 🚨 ตรวจสอบว่าเป็น Client Environment
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return 0;
  }

  try {
    const key = `likes_${id}`;
    const value: string | null = localStorage.getItem(key);

    // 💡 แปลงค่าเป็นตัวเลข
    const parsedValue: number = parseInt(value || '0', 10);

    // 💡 ตรวจสอบความถูกต้อง
    return isNaN(parsedValue) ? 0 : parsedValue;
  } catch (e) {
    console.error(`[localStorage] Failed to get likes for ${id}:`, e);
    return 0;
  }
}
