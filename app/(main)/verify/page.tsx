/** @format */

import { supabaseServer } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

/**
 * 🛠️ VERIFICATION_TERMINAL (SERVER-SIDE)
 * หน้าที่: รับช่วงต่อจากอีเมล -> อัปเดต Database -> ส่งไปรับ QR Code
 * Protocol: Secure-Sharp v3.2.1
 */

interface VerifyPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  // 1. DATA_EXTRACTION: ดึงค่าจาก URL ที่ส่งมาจาก Resend Email
  const params = await searchParams
  const id = params.id as string // Ticket ID (e.g., JPV-XXXX)
  const name = params.name as string // ชื่อลูกค้า
  const type = params.type as string // ประเภทบริการ (assessment/contact)

  // 🛡️ GUARD_CLAUSE: ถ้าไม่มี ID ให้ดีดกลับหน้าแรกทันทีเพื่อความปลอดภัย
  if (!id) {
    redirect("/")
  }

  try {
    /**
     * 2. DATABASE_SYNCHRONIZATION (MODE A)
     * ค้นหา Lead ใน Supabase ผ่าน metadata->>ticket_id และเปลี่ยนสถานะเป็น Verified
     */
    const { error } = await supabaseServer
      .from("leads")
      .update({
        status: "verified_prospect",
      })
      .eq("metadata->>ticket_id", id)

    if (error) {
      // 🚨 LOGGING: บันทึกความผิดพลาดลง Server Log
      console.error(
        `❌ [AUTH_ERROR]: ID ${id} failed to update: ${error.message}`
      )
    }
  } catch (err) {
    console.error("🚨 [CRITICAL_SYSTEM_FAILURE]:", err)
  }

  /**
   * 3. DYNAMIC_ROUTING_PROTOCOL
   * กำหนดเส้นทาง Redirect ตามประเภทงาน
   */
  const targetPath =
    type === "contact" ? "/contact/success" : "/assessment/success"

  // 🎯 FINAL_REDIRECT: ส่ง Parameter 'verified=true' ไปเพื่อสั่งให้หน้า Success โชว์ QR Code
  const finalDestination = `${targetPath}?id=${id}&name=${encodeURIComponent(name || "Customer")}&verified=true`

  redirect(finalDestination)
}
