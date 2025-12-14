// lib/html_templates/template_logic/generateVerifiedHtml.js

// 💡 Import template files to be dynamically loaded
import { generateFlightVerifiedHtml } from '@/lib/html_templates/generateFlightVerifiedHtml';
import { generateTourVerifiedHtml } from '@/lib/html_templates/generateTourVerifiedHtml';
import { generateHotelVerifiedHtml } from '@/lib/html_templates/generateHotelVerifiedHtml';
import { generateNotFoundHtml } from '@/lib/html_templates/generateNotFoundHtml';

/**
 * @title generateVerifiedHtml
 * @description เลือก HTML Template ตาม Project ID เพื่อสร้างเนื้อหาสำหรับ PDF หรือ Web View
 * @param {string} projectId - Project ID (FLIGHT, HOTEL, TOUR)
 * @param {object} data - ข้อมูล BookingSchema ที่ถูกเพิ่ม QR_BASE64_IMAGE และ DISPLAY_SERVER_TIMESTAMP
 * @returns {string} Full HTML document string
 */
export function generateVerifiedHtml(projectId, data) {
  const normalizedProjectId = projectId.toUpperCase();

  switch (normalizedProjectId) {
    case 'FLIGHT':
    case 'AIRLINE':
      return generateFlightVerifiedHtml(data);

    case 'HOTEL':
    case 'ACCOMMODATION':
      return generateHotelVerifiedHtml(data);

    case 'TOUR':
    case 'VOUCHER':
      return generateTourVerifiedHtml(data);

    default:
      console.error(
        `[Template Logic] Project ID "${projectId}" is not supported. Falling back to Error page.`,
      );
      return generateNotFoundHtml({
        title: 'UNSUPPORTED BOOKING TYPE',
        message: `ไม่สามารถแสดงผล Template สำหรับ Project ID: ${projectId} ได้`,
        error_code: 'TPL-404',
        reference_id: data.pnr_code,
      });
  }
}
