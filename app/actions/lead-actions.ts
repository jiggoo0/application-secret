/** @format */
"use server"

import { supabaseServer } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"

/**
 * 🛰️ ACTION_PROTOCOL: CREATE_LEAD_ENTRY
 * ----------------------------------------------------------------
 * จัดการบันทึกข้อมูลผู้มุ่งหวัง (Lead) ทั้งจาก Contact Form และ Assessment Multi-step
 * รองรับการเก็บข้อมูลเชิงลึก (Case Profile) เพื่อใช้ประเมินก่อนติดต่อกลับ
 */

interface LeadData {
  full_name: string
  phone: string
  email?: string
  line_id?: string
  service_type: string
  details: string
  // 📁 ASSESSMENT_FIELDS: ข้อมูลเพิ่มเติมจากใบประเมิน
  assessment_profile?: {
    travel_history?: string
    denial_history?: boolean
    financial_status?: string
    target_country?: string
    urgency_level?: "standard" | "express" | "critical"
  }
  source_url?: string
  template_id?: string
  status?: string
}

export async function createLead(formData: LeadData) {
  try {
    // 🛡️ 1. SECURITY_&_CONTEXT_COLLECTION
    const headerList = await headers()
    const ip = headerList.get("x-forwarded-for")?.split(",")[0] || "unknown"
    const userAgent = headerList.get("user-agent") || "unknown"
    const referer = headerList.get("referer") || "direct"

    if (!supabaseServer) {
      throw new Error("SERVER_CLIENT_NOT_INITIALIZED")
    }

    // 🛰️ 2. EXECUTE_INSERT_PROTOCOL
    const { data, error } = await supabaseServer
      .from("leads")
      .insert([
        {
          name: formData.full_name,
          phone: formData.phone,
          email: formData.email || null,
          message: formData.details,
          category: formData.service_type,
          source_url: formData.source_url || referer,
          template_id: formData.template_id || "v2_standard",
          status: formData.status || "new",

          // 🧠 EXTENDED_DATA_STRUCTURE
          metadata: {
            transmitted_at: new Date().toISOString(),
            protocol_version: "v2.9.0",
            line_id: formData.line_id || "not_provided",
            // รวมข้อมูลจากใบประเมินเข้าใน Metadata เพื่อไม่ให้กระทบตารางหลัก
            case_profile: formData.assessment_profile || null,
            network_context: {
              ip_address: ip,
              user_agent: userAgent,
              referer_origin: referer,
            },
            system_fingerprint: {
              device_type: userAgent.includes("Mobi") ? "Mobile" : "Desktop",
              is_bot: /bot|googlebot|crawler|spider|robot|crawling/i.test(
                userAgent
              ),
            },
          },
        },
      ])
      .select()

    if (error) {
      console.error("❌ DATABASE_INSERT_ERROR:", error.message)
      return {
        success: false,
        error: "DATA_COMMIT_FAILURE",
        details: error.message,
      }
    }

    // 🔄 3. CACHE_INVALIDATION_PROTOCOL
    revalidatePath("/admin/leads")

    return {
      success: true,
      data: data[0],
      message: "SYSTEM_SUCCESS: LEAD_ENTRY_COMMITTED",
    }
  } catch (error: any) {
    console.error("🚨 CRITICAL_ACTION_FAILURE:", error)
    return {
      success: false,
      error: error.message || "INTERNAL_SYSTEM_ERROR",
    }
  }
}
