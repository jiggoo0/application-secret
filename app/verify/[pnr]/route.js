// app/verify/[pnr]/route.js

import { NextResponse } from 'next/server';
import { supabasePublic } from '@/lib/supabase/public';
import { generateNotFoundHtml } from '@/lib/html_templates/generateNotFoundHtml';
import { generateFlightVerifiedHtml } from '@/lib/html_templates/generateFlightVerifiedHtml';
import { generateTourVerifiedHtml } from '@/lib/html_templates/generateTourVerifiedHtml';
import { generateHotelVerifiedHtml } from '@/lib/html_templates/generateHotelVerifiedHtml';

/**
 * @title GET /verify/[pnr]
 * @description Route Handler สำหรับตรวจสอบ PNR Code สาธารณะ (Dynamic Segment)
 * @param {object} request - Next.js Request object
 * @param {object} context - Context object containing dynamic path segments
 */
export async function GET(request, context) {
  // 1. ดึง PNR Code จาก Dynamic Path Segment
  // ✅ แก้ไข: เข้าถึง params ผ่าน context โดยตรง
  const pnr_code = context.params.pnr?.toUpperCase();

  // 1.1 PNR Validation
  if (!pnr_code || pnr_code.length < 5 || pnr_code.length > 10) {
    const htmlContent = generateNotFoundHtml();
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
      // ใช้ pnr_code ที่ถูกแปลงเป็นตัวพิมพ์ใหญ่แล้ว
      .eq('pnr_code', pnr_code)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Supabase Query Error:', error);
      throw new Error('Database query failed.');
    }

    bookingData = data;
  } catch (err) {
    console.error('Verification Error:', err);
    const htmlContent = generateNotFoundHtml();
    return new NextResponse(htmlContent, {
      status: 500, // 500 Internal Server Error
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  // 3. Data Not Found (404)
  if (!bookingData) {
    const htmlContent = generateNotFoundHtml();
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
      // Fallback
      htmlContent = generateFlightVerifiedHtml(bookingData);
      break;
  }

  // 5. Success Response
  return new NextResponse(htmlContent, {
    status: 200, // 200 OK
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
