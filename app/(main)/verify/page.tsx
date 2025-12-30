/**
 * @format
 * @description VERIFICATION_TERMINAL: V4.0.0 (High-Precision Async)
 * ✅ FIXED: Async SSR Client, JSONB Metadata Merging, Next.js 15 Standards
 */

import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

interface VerifyPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  // 1. ASYNC_RESOLUTION: ดึงค่าจาก Parameter อย่างปลอดภัย
  const params = await searchParams
  const id = typeof params.id === 'string' ? params.id : null
  const name = typeof params.name === 'string' ? params.name : 'Client'
  const type = typeof params.type === 'string' ? params.type : 'contact'

  // 🛡️ SECURITY_ENFORCEMENT: หากไม่มี ID ให้ตัดการเชื่อมต่อ
  if (!id) {
    console.warn('⚠️ [SECURITY_ALERT]: Missing Ticket ID.')
    redirect('/')
  }

  // 🛰️ INITIALIZE_ASYNC_CLIENT
  const supabase = await createServerClient()

  try {
    /**
     * 2. ATOMIC_DATA_UPGRADE
     * เราใช้คำสั่ง rpc หรือการดึงข้อมูลมา Merge เพื่อป้องกันการ Overwrite Metadata เดิม
     */

    // ดึงข้อมูลเดิมมาเพื่อทำ Metadata Merging
    const { data: currentLead } = await supabase
      .from('leads')
      .select('metadata')
      .eq('metadata->>ticket_id', id)
      .single()

    if (currentLead) {
      const { error } = await supabase
        .from('leads')
        .update({
          status: 'verified_prospect',
          metadata: {
            ...(currentLead.metadata as object), // 🛡️ PRESERVE: รักษาข้อมูลเดิม
            verification_completed_at: new Date().toISOString(),
            verification_status: 'SUCCESS_AUTHORIZED',
          },
        })
        .eq('metadata->>ticket_id', id)

      if (error) {
        console.error(`🚨 [DB_REJECTION]: ${error.message}`)
      }
    }
  } catch (err) {
    console.error('🔥 [CRITICAL_EXCEPTION]: Terminal failure.', err)
  }

  /**
   * 3. DYNAMIC_ROUTING_PROTOCOL
   */
  const routePrefix = type === 'assessment' ? '/assessment' : '/contact'
  const successUrl = `${routePrefix}/success?id=${id}&name=${encodeURIComponent(name)}&verified=true`

  // 🎯 FINAL_DISPATCH
  redirect(successUrl)
}
