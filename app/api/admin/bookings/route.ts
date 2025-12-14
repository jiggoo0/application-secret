import { NextRequest, NextResponse } from 'next/server';
// 💡 แก้ไข: Import ชื่อ Function ให้ถูกต้องจาก server-client.ts
import { getSupabaseServerClient } from '@/lib/supabase/server-client';

// 💡 สมมติว่า BookingPayload ถูกนิยามไว้
// import type { BookingPayload } from '@/types/booking-types';

/**
 * @title POST /api/admin/bookings
 * @description API Route สำหรับจัดการ Booking Data ในส่วน Admin
 */
export async function POST(req: NextRequest) {
  // ✅ FIX 1: เรียกใช้ Function เพื่อรับ Client Instance
  const supabase = getSupabaseServerClient();
  let payload: any; // ควรแทนที่ด้วย BookingPayload ที่ถูกต้อง

  try {
    payload = await req.json();

    // 1. Validation (ควรมีการตรวจสอบข้อมูลตรงนี้)
    if (!payload.pnr_code || !payload.project_id) {
      return NextResponse.json(
        { success: false, error: 'Validation Error: PNR Code และ Project ID ต้องระบุ' },
        { status: 400 },
      );
    }

    // 2. Database Upsert
    const { error: dbError } = await supabase.from('bookings').upsert(payload, {
      onConflict: 'pnr_code',
    });

    if (dbError) {
      console.error('Supabase save error:', dbError.message);
      return NextResponse.json({ success: false, error: dbError.message }, { status: 500 });
    }

    // 3. Success Response
    return NextResponse.json(
      {
        success: true,
        message: `บันทึก/อัปเดต PNR: ${payload.pnr_code} สำเร็จ`,
        pnr_code: payload.pnr_code,
      },
      { status: 200 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error during API execution';
    console.error('API execution failed:', message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
