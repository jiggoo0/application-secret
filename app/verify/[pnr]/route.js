// app/verify/[pnr]/route.js

import { NextResponse } from 'next/server';
// Assumption: supabasePublic is correctly configured for public (anon) access
import { supabasePublic } from '@/lib/supabase/public';

// 💡 Import HTML Template Functions
import { generateNotFoundHtml } from '@/lib/html_templates/generateNotFoundHtml';
import { generateFlightVerifiedHtml } from '@/lib/html_templates/generateFlightVerifiedHtml';
import { generateTourVerifiedHtml } from '@/lib/html_templates/generateTourVerifiedHtml';
import { generateHotelVerifiedHtml } from '@/lib/html_templates/generateHotelVerifiedHtml';

/**
 * @title GET /verify/[pnr]
 * @description Route Handler สำหรับตรวจสอบ PNR Code สาธารณะ (Dynamic Segment)
 * @param {object} request - Next.js Request object (unused but required signature)
 * @param {object} context - Context object containing dynamic path segments
 */
export async function GET(request, context) {
  // 1. ดึง PNR Code จาก Dynamic Path Segment
  const pnr_code = context.params.pnr?.toUpperCase();

  // 1.1 PNR Validation (Basic Length Check)
  if (!pnr_code || pnr_code.length < 3 || pnr_code.length > 15) {
    // 💡 ปรับปรุง: ใช้ generateNotFoundHtml พร้อม Parameter เพื่อให้ข้อความชัดเจนขึ้น
    const htmlContent = generateNotFoundHtml({
      title: 'INVALID REFERENCE CODE FORMAT',
      message: `รหัสอ้างอิง: ${pnr_code || 'ไม่ระบุ'} ไม่อยู่ในรูปแบบที่ถูกต้อง (ต้องมีความยาว 3-15 ตัวอักษร)`,
      error_code: 'VERIFY-400',
      redirect_label: 'กลับสู่หน้าหลัก',
    });
    return new NextResponse(htmlContent, {
      status: 400, // 400 Bad Request
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  // 2. Database Fetch (ใช้ Anon Key)
  let bookingData;
  try {
    const { data, error } = await supabasePublic
      .from('bookings')
      .select('*')
      // pnr_code ถูกแปลงเป็นตัวพิมพ์ใหญ่แล้ว
      .eq('pnr_code', pnr_code)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = No Rows Found
      console.error(`[VERIFY] Supabase Query Error for PNR ${pnr_code}:`, error);
      // Throw error to be caught below for 500 response
      throw new Error(error.message || 'Database query failed.');
    }

    bookingData = data;
  } catch (err) {
    // Catch database connection/internal server error
    console.error(`[VERIFY] Internal Error for PNR ${pnr_code}:`, err);
    const htmlContent = generateNotFoundHtml({
      title: 'INTERNAL SERVER ERROR',
      message: 'เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล โปรดลองอีกครั้งภายหลัง',
      error_code: 'VERIFY-500',
      reference_id: pnr_code,
    });
    return new NextResponse(htmlContent, {
      status: 500, // 500 Internal Server Error
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  // 3. Data Not Found (404)
  if (!bookingData) {
    // 💡 ปรับปรุง: ใช้ generateNotFoundHtml พร้อม Parameter
    const htmlContent = generateNotFoundHtml({
      title: 'DOCUMENT NOT FOUND',
      message: `ไม่พบเอกสารการจองสำหรับรหัสอ้างอิง: ${pnr_code}`,
      error_code: 'VERIFY-404',
      reference_id: pnr_code,
    });
    return new NextResponse(htmlContent, {
      status: 404, // 404 Not Found (Data not found)
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  // 4. Dynamic HTML Template Selection
  let htmlContent;
  const projectId = bookingData.project_id?.toUpperCase() || 'DEFAULT';

  switch (projectId) {
    case 'FLIGHT':
    case 'AIRLINE':
      htmlContent = generateFlightVerifiedHtml(bookingData);
      break;

    case 'TOUR':
    case 'VOUCHER':
      htmlContent = generateTourVerifiedHtml(bookingData);
      break;

    case 'HOTEL':
    case 'ACCOMMODATION':
      htmlContent = generateHotelVerifiedHtml(bookingData);
      break;

    default:
      // Fallback: หาก Project ID ไม่ตรงกับ Template ให้ใช้ Flight Template เป็น Default
      console.warn(
        `[VERIFY] Unknown Project ID: ${projectId} for PNR: ${pnr_code}. Using Flight template as fallback.`,
      );
      htmlContent = generateFlightVerifiedHtml(bookingData);
      break;
  }

  // 4.1. Sanity Check for empty HTML (เผื่อ template function คืนค่าว่าง)
  if (!htmlContent || htmlContent.trim() === '') {
    console.error(`[VERIFY] Template ${projectId} returned empty HTML for PNR: ${pnr_code}`);
    htmlContent = generateNotFoundHtml({
      title: 'TEMPLATE GENERATION ERROR',
      message: `Template สำหรับ ${projectId} ไม่สามารถสร้างเนื้อหาได้`,
      error_code: 'VERIFY-ERR-TPL',
      reference_id: pnr_code,
    });
  }

  // 5. Success Response
  return new NextResponse(htmlContent, {
    status: 200, // 200 OK
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
