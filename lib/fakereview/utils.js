/**
 * lib/fakereview/utils.js
 * 🔧 Production-ready utilities for Fake Reviews
 */

/**
 * 🔢 สุ่มวันที่ย้อนหลังภายในจำนวนวันที่กำหนด (default: 180 วัน)
 * @param {number} daysLimit - จำนวนวันที่ย้อนหลังสูงสุด
 * @returns {string} ISO string ของวันที่
 */
export function getRandomDate(daysLimit = 180) {
  const daysAgo = Math.floor(Math.random() * daysLimit);
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
}

/**
 * 📅 แปลงวันที่ ISO เป็นรูปแบบไทย เช่น “14 ตุลาคม 2568”
 * @param {string|Date} isoDate - วันที่ ISO หรือ Date object
 * @returns {string} วันที่ในรูปแบบไทย
 */
export function formatThaiDate(isoDate) {
  const months = [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม',
  ];
  const d = new Date(isoDate);
  const day = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear() + 543;
  return `${day} ${month} ${year}`;
}

/**
 * 👍 จำลองจำนวน Likes ของรีวิวแบบสมจริง
 * @param {object} options
 * @param {number} options.rating - Rating 1-5
 * @param {string|Date} options.createdAt - วันที่รีวิว
 * @returns {number} จำนวน Likes
 */
export function getRealisticLikes({ rating = 3, createdAt }) {
  // ยิ่ง rating สูง มักได้ likes เยอะขึ้น
  const base = rating * 5;
  const variance = Math.floor(Math.random() * 5);

  // อายุของรีวิวก็มีผล: รีวิวเก่าอาจมีเวลาให้ Likes เพิ่มขึ้น
  const daysOld = Math.floor((new Date() - new Date(createdAt)) / (1000 * 60 * 60 * 24));
  const ageFactor = Math.min(daysOld, 30) * 0.5; // เพิ่มขึ้นไม่เกิน +15 likes

  return Math.floor(base + variance + ageFactor);
}
