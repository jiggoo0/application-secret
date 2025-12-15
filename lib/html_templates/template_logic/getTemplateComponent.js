// lib/html_templates/template_logic/getTemplateComponent.js (Logic)

/**
 * @description คืนค่า Component/Function สำหรับสร้างเนื้อหา HTML เฉพาะประเภท (หรือ 404)
 * @param {string} projectId - Project ID (FLIGHT, HOTEL, TOUR)
 * @param {object} templates - Object ที่มี Templates Component ที่ถูก Resolve Export แล้ว
 * @returns {function(data: object): string} Template Generation Function
 */
export function getTemplateComponent(projectId, templates) {
  const normalizedProjectId = (projectId || '').toUpperCase();

  // 💡 Map Project ID ไปยัง Template Component/Function ที่ถูก Import
  switch (normalizedProjectId) {
    case 'FLIGHT':
      return templates.FlightTemplate;
    case 'HOTEL':
      return templates.HotelTemplate;
    case 'TOUR':
      return templates.TourTemplate;
    default:
      console.warn(`[PDF Generation] Unsupported Project ID: ${projectId}. Falling back to 404.`);
      return templates.NotFoundTemplate; // คืนค่า NotFound Template
  }
}
