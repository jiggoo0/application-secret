/**
 * ❤️ สร้างจำนวนไลค์สมจริงตาม rating และอายุโพสต์
 */
export function getRealisticLikes({ rating, createdAt }) {
  const ageDays = Math.floor((Date.now() - new Date(createdAt)) / (1000 * 60 * 60 * 24));
  let base = rating * 8 + Math.random() * 20;
  base += Math.max(0, 30 - ageDays) * 1.5;
  return Math.max(1, Math.floor(base)); // ✅ อย่างน้อย 1 ไลค์
}

/**
 * บันทึกยอดไลค์ใน localStorage
 */
export function incrementLikes(id) {
  if (typeof window === 'undefined') return 0;

  try {
    const key = `likes_${id}`;
    const current = parseInt(localStorage.getItem(key) || '0', 10);
    const newCount = isNaN(current) ? 1 : current + 1;
    localStorage.setItem(key, newCount);
    return newCount;
  } catch {
    return 0;
  }
}

/**
 * ดึงยอดไลค์จาก localStorage
 */
export function getLikes(id) {
  if (typeof window === 'undefined') return 0;

  try {
    const value = parseInt(localStorage.getItem(`likes_${id}`) || '0', 10);
    return isNaN(value) ? 0 : value;
  } catch {
    return 0;
  }
}
