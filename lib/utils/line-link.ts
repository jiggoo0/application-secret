/**
 * =========================================
 * LINE Official Utilities — JP-VISOUL-DOCS
 * =========================================
 * Single source of truth สำหรับลิงก์ LINE
 * ใช้ได้กับ CTA / Footer / Service Page / SEO-safe
 */

/**
 * LINE Official ID
 */
export const LINE_ID = "@462fqtfc";

/**
 * LINE Add Friend (lin.ee)
 * ใช้สำหรับปุ่ม "เพิ่มเพื่อน"
 */
export const LINE_ADD_FRIEND_URL = "https://lin.ee/TaE0XjI";

/**
 * LINE Official Chat URL (ไม่มีข้อความ)
 * ใช้เป็น fallback / footer / link ทั่วไป
 */
export const LINE_OFFICIAL_URL = `https://line.me/R/ti/p/${LINE_ID}`;

/**
 * สร้างลิงก์ LINE พร้อมข้อความเริ่มต้น (Pre-filled Message)
 * รองรับ Service Page และ CTA
 *
 * @param serviceName ชื่อบริการ (optional)
 * @param serviceId รหัสบริการ เช่น SRV-001 (optional)
 */
export function getLineContactLink(
  serviceName?: string,
  serviceId?: string,
): string {
  const message =
    serviceName && serviceId
      ? `สวัสดีครับ/ค่ะ สนใจบริการ: ${serviceName} [${serviceId}] รบกวนขอข้อมูลเพิ่มเติมและขั้นตอนการวางโครงสร้างเอกสารด้วยครับ`
      : `สวัสดีครับ/ค่ะ สนใจปรึกษาเรื่องการจัดเตรียมเอกสารและบริการวีซ่า รบกวนเจ้าหน้าที่ติดต่อกลับด้วยครับ`;

  const encodedMessage = encodeURIComponent(message);

  /**
   * LINE OA Message Scheme
   * เปิดหน้าแชท + auto-fill ข้อความ
   * เพิ่ม Conversion และลด friction
   */
  return `https://line.me/R/oaMessage/${LINE_ID}/?${encodedMessage}`;
}

/**
 * Helper object สำหรับ import ใช้ทั้งระบบ
 * ป้องกัน hardcode และ build error
 */
export const CONTACT_CHANNELS = {
  line: {
    id: LINE_ID,
    addFriendUrl: LINE_ADD_FRIEND_URL,
    officialUrl: LINE_OFFICIAL_URL,
    getConsultationLink: getLineContactLink,
  },
} as const;
