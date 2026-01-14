"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// กำหนดประเภทข้อมูลที่รับมาจาก Form ให้ตรงกับ Schema และสอดคล้องกับ Database
export interface ServiceRequestInput {
  name: string;
  email: string;
  phone: string;
  service_type: string; // ตรงกับคอลัมน์ใน DB
  details: string;      // ตรงกับคอลัมน์ใน DB
  urgency: "normal" | "urgent" | "express";
  privacyPolicy: boolean;
}

/**
 * Action สำหรับสร้างรายการคำขอรับบริการใหม่
 * รองรับมาตรฐาน JP-VISOUL-DOCS v2.0.0
 * แก้ไขปัญหา Linting: ลบ Unused variables เรียบร้อยแล้ว
 */
export async function createServiceRequest(values: ServiceRequestInput) {
  const supabase = await createClient();

  try {
    // 1. ตรวจสอบข้อมูลเบื้องต้น
    if (!values.privacyPolicy) {
      return { error: "โปรดยอมรับนโยบายความเป็นส่วนตัวเพื่อดำเนินการต่อ" };
    }

    // 2. บันทึกข้อมูลลงฐานข้อมูล
    const { data, error } = await supabase
      .from("service_requests")
      .insert([
        {
          full_name: values.name,
          email: values.email,
          phone: values.phone,
          service_type: values.service_type,
          details: { 
            content: values.details,
            urgency: values.urgency,
            submitted_at: new Date().toISOString()
          },
          status: "DRAFT",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Database Error:", error.message);
      return { 
        error: "ขออภัย ระบบขัดข้องชั่วคราว ทีมงานกำลังเร่งแก้ไข โปรดลองอีกครั้ง" 
      };
    }

    // 3. Update Cache (Revalidation)
    revalidatePath("/admin/requests");

    return { 
      success: true, 
      data, 
      message: "ได้รับข้อมูลของท่านแล้ว เจ้าหน้าที่ทีมงานจะติดต่อกลับโดยเร็วที่สุด" 
    };

  } catch {
    // แก้ไข Linting: ลบ (err) ออกเนื่องจากไม่ได้ถูกใช้งาน
    return { 
      error: "เกิดข้อผิดพลาดที่ไม่คาดคิด โปรดตรวจสอบการเชื่อมต่ออินเทอร์เน็ตของท่าน" 
    };
  }
}
