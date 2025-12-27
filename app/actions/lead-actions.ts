/** @format */
"use server"

import { supabaseServer } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers" // ✅ นำเข้าเพื่อดึงข้อมูล Request Headers

export async function createLead(formData: {
  name: string
  email: string
  phone?: string
  message: string
  category: string
  source_url: string
  template_id?: string
}) {
  try {
    // 🛡️ 1. SECURITY_&_ANALYTICS_COLLECTION
    // ดึงข้อมูลจาก Headers เพื่อเก็บร่องรอยดิจิทัล (Digital Footprint)
    const headerList = await headers()
    const ip = headerList.get("x-forwarded-for")?.split(",")[0] || "unknown"
    const userAgent = headerList.get("user-agent") || "unknown"
    const referer = headerList.get("referer") || "direct"

    // 🔍 ตรวจสอบความพร้อมของระบบเชื่อมต่อ
    if (!supabaseServer) {
      throw new Error("SERVER_CLIENT_NOT_INITIALIZED")
    }

    // 🛰️ 2. EXECUTE_INSERT_PROTOCOL
    const { data, error } = await supabaseServer
      .from("leads")
      .insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          category: formData.category,
          source_url: formData.source_url,
          template_id: formData.template_id || "contact_v8",
          status: "new",
          admin_notes: null,
          metadata: {
            transmitted_at: new Date().toISOString(),
            protocol_version: "v2.8.5",
            environment: process.env.NODE_ENV,
            // 📡 Passive Data Collection
            network_context: {
              ip_address: ip,
              user_agent: userAgent,
              referer_origin: referer,
            },
            system_fingerprint: {
              platform: userAgent.includes("Windows")
                ? "Windows"
                : userAgent.includes("Mac")
                  ? "MacOS"
                  : "Mobile",
              is_bot: userAgent.toLowerCase().includes("bot"),
            },
          },
        },
      ])
      .select()

    if (error) {
      console.error("❌ DATABASE_INSERT_ERROR:", error.message)
      return { success: false, error: error.message }
    }

    // 🔄 3. REVALIDATE_CACHE
    // อัปเดตข้อมูลให้หน้า Admin หรือหน้าแสดงผลอัตโนมัติ
    revalidatePath("/admin/leads")

    return {
      success: true,
      data: data[0],
      message: "LEAD_ENTRY_CREATED_SUCCESSFULLY",
    }
  } catch (error: any) {
    console.error("🚨 CRITICAL_ACTION_FAILURE:", error)
    return {
      success: false,
      error: error.message || "UNKNOWN_SYSTEM_ERROR",
    }
  }
}
