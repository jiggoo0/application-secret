import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

/**
 * ฟังก์ชัน Helper สำหรับแปลง metadata เป็นรายละเอียดที่หน้าบ้านเข้าใจ
 * รองรับ Multi-document types
 */
function formatDetails(type: string, meta: any) {
  if (!meta) return null;

  switch (type) {
    case 'E_TICKET':
      return {
        passenger: meta.passenger?.name || 'N/A',
        fare: meta.fareDetails?.totalPaid || 'N/A',
        flights:
          meta.flights?.map((f: any) => ({
            date: f.date,
            from: f.from,
            to: f.to,
            time: f.depTime,
          })) || [],
      };

    case 'JPVISOUL_SALARY_CERT':
      return {
        employee: meta.employee?.name || 'N/A',
        position: meta.employee?.position || 'N/A',
        income: `${meta.salary?.total} ${meta.salary?.currency}`,
        issueDate: meta.issueDate,
      };

    case 'HOTEL_VOUCHER':
      return {
        guest: meta.guest?.name || 'N/A',
        hotel: meta.hotel?.name || 'N/A',
        stay: `${meta.stay?.checkIn} - ${meta.stay?.checkOut}`,
        room: meta.guest?.roomType || 'N/A',
      };

    default:
      return null;
  }
}

export async function GET(_req: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const supabase = supabaseServer;

  if (!supabase) {
    return NextResponse.json(
      { status: 'error', message: 'Database connection failed' },
      { status: 500 },
    );
  }

  // 1. ดึงข้อมูลจากฐานข้อมูล
  const { data, error } = await supabase
    .from('documents')
    .select('id, type, status, ref_id, pdf_url, created_at, metadata')
    .eq('qr_token', token)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { status: 'invalid', message: 'Invalid or expired token' },
      { status: 404 },
    );
  }

  // 2. จัดรูปแบบข้อมูลตามประเภทเอกสาร
  const details = formatDetails(data.type, data.metadata);

  // 3. เตรียม Response (แยก metadata ออกเพื่อความปลอดภัยและลดขนาด JSON)
  const { id, metadata, ...rest } = data;

  return NextResponse.json({
    status: data.status,
    document: {
      ...rest,
      document_id: id,
      details, // รายละเอียดที่จัดรูปแบบแล้ว
      data: metadata, // ข้อมูลดิบ (ถ้า Frontend ต้องการใช้เพิ่ม)
    },
  });
}
