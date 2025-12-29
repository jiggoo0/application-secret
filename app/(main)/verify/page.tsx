/** @format */

import { supabaseServer } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

/**
 * 🛠️ VERIFICATION_TERMINAL (SERVER-SIDE)
 * @version 3.2.2 (Industrial Sharp Edition)
 * PURPOSE: ประมวลผลการยืนยันตัวตนจากอีเมล -> อัปเดตสถานะ -> Redirect ไปรับ Pass
 */

interface VerifyPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  // 1. DATA_EXTRACTION: ถอดรหัสค่าจาก URL (Next.js 15 Async Standard)
  const params = await searchParams
  const id = typeof params.id === "string" ? params.id : null
  const name = typeof params.name === "string" ? params.name : "Customer"
  const type = typeof params.type === "string" ? params.type : "contact"

  // 🛡️ GUARD_CLAUSE: ป้องกันการเข้าถึงโดยไม่มีรหัสอ้างอิง
  if (!id) {
    redirect("/")
  }

  try {
    /**
     * 2. DATABASE_SYNCHRONIZATION (MODE A)
     * ทำการอัปเดตสถานะ Lead เป็น "Verified" เพื่อเปิดล็อกฟีเจอร์ QR Code
     */
    if (supabaseServer) {
      const { error } = await supabaseServer
        .from("leads")
        .update({
          status: "verified_prospect", // สถานะสำหรับลูกค้าที่ยืนยันอีเมลแล้ว
        })
        .eq("metadata->>ticket_id", id)

      if (error) {
        // 🚨 LOGGING: บันทึกความผิดพลาดแต่ยังปล่อยให้ Flow ดำเนินต่อเพื่อ UX
        console.error(
          `❌ [AUTH_ERROR]: Ticket ${id} update failed: ${error.message}`
        )
      }
    }
  } catch (err) {
    console.error("🚨 [CRITICAL_SYSTEM_FAILURE]:", err)
  }

  /**
   * 3. DYNAMIC_ROUTING_PROTOCOL
   * เลือกหน้า Success ที่ถูกต้องตามประเภทของฟอร์มที่ลูกค้ากรอก
   */
  const targetPath =
    type === "assessment" ? "/assessment/success" : "/contact/success"

  // 🎯 FINAL_REDIRECT: ส่ง Parameter ไปเพื่อสั่งให้ Frontend แสดง QR Code และ Ticket ID
  // verified=true จะเป็นตัว Trigger แอนิเมชันการ Unlock ในหน้า Success
  const finalDestination = `${targetPath}?id=${id}&name=${encodeURIComponent(name)}&verified=true`

  redirect(finalDestination)
}
