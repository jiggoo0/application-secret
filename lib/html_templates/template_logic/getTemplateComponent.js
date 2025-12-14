// lib/html_templates/template_logic/getTemplateComponent.js (Logic)

import { generateTourContent } from '../templates/TourTemplate';
import { generateFlightContent } from '../templates/FlightTemplate';
import { generateHotelContent } from '../templates/HotelTemplate';
import { generateNotFoundContent } from '../generateNotFoundHtml';

/**
 * คืนค่า Function สำหรับสร้างเนื้อหา HTML เฉพาะประเภท
 * @param {'tour' | 'flight' | 'hotel' | '404'} type
 * @returns {function(data: object): string} Template Generation Function
 */
export function getTemplateComponent(type) {
  switch (type) {
    case 'tour':
      return generateTourContent;
    case 'flight':
      return generateFlightContent;
    case 'hotel':
      return generateHotelContent;
    case '404':
      return generateNotFoundContent;
    default:
      console.warn(`Unsupported type for PDF generation: ${type}. Falling back to 404.`);
      return generateNotFoundContent;
  }
}
