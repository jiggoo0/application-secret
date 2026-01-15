/**
 * Business Contact Configuration
 * ------------------------------------
 * ใช้สำหรับ:
 * - Footer
 * - CTA
 * - Contact Page
 * - Quick Actions (LINE / Chat)
 *
 * หมายเหตุ:
 * - ข้อมูลระดับองค์กรอยู่ที่ SITE_CONFIG
 * - ไฟล์นี้โฟกัสเฉพาะ "ช่องทางการติดต่อ"
 */

export const CONTACT = {
  line: {
    /**
     * LINE Official Account ID
     * รูปแบบมาตรฐาน: @xxxx
     */
    id: "@462fqtfc",

    /**
     * Public LINE URL
     * ใช้เปิดแชทโดยตรง
     */
    url: "https://line.me/R/ti/p/@462fqtfc",
  },
} as const;
