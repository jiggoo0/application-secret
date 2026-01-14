import { z } from "zod";

/**
 * Schema สำหรับการขอรับบริการ (Service Request)
 * ปรับปรุงตามมาตรฐาน JP-VISOUL-DOCS v2.0.0
 * สอดคล้องกับคอลัมน์ในฐานข้อมูล: service_type, details
 */
export const serviceRequestSchema = z.object({
  name: z.string().min(3, "กรุณากรอกชื่อ-นามสกุลให้ครบถ้วน"),
  email: z.string().email("รูปแบบอีเมลไม่ถูกต้อง"),
  phone: z.string().min(9, "กรุณากรอกเบอร์โทรศัพท์ที่ติดต่อได้"),
  
  // ✅ ปรับให้ตรงกับ DB Column: service_type
  service_type: z.string().min(1, "โปรดเลือกประเภทบริการ"),
  
  // ✅ ปรับให้ตรงกับ DB Column: details
  details: z.string().min(10, "กรุณาระบุรายละเอียดเพิ่มเติมอย่างน้อย 10 ตัวอักษร"),
  
  // ✅ Urgency Enum (แก้ไข TS2769 เรียบร้อย)
  urgency: z.enum(["normal", "urgent", "express"]),

  // ✅ PDPA Compliance
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: "กรุณายอมรับนโยบายความเป็นส่วนตัว",
  }),

  // Optional fields สำหรับระบบ Tracking
  source_url: z.string().optional(),
  template_id: z.string().optional(),
  files: z.any().optional(),
});

// ส่งออก Type เพื่อใช้ใน Form และ Server Action
export type ServiceRequestInput = z.infer<typeof serviceRequestSchema>;
