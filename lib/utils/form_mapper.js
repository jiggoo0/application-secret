// /lib/utils/form_mapper.js

/**
 * @file form_mapper.js
 * @description ฟังก์ชันสำหรับแปลงข้อมูลจากฟอร์ม (Flat Object) เป็น Payload มาตรฐานสำหรับ API และ Database
 */

import { AGENCY_DETAILS } from '@/config/agency';

/**
 * แปลงข้อมูลฟอร์มให้เป็น Payload มาตรฐาน
 * @param {object} formData - ข้อมูลจากฟอร์มใน ClientIssueForm
 * @param {number} totalPaid - ยอดรวมที่คำนวณแล้ว
 * @param {string} projectId - ID ของ Project ที่กำลังดำเนินการ
 * @returns {object} Payload สำหรับส่งไปยัง /api/issue-document
 */
export const mapFormDataToPayload = (formData, totalPaid, projectId) => {
  // 1. Traveller Info (ใช้เป็น Key หลัก)
  const traveller = {
    pnr: formData.pnr?.toUpperCase(),
    name: formData.travellerName,
    eticket: formData.eticket,
    status: formData.bookingStatus,
    issueDate: formData.issueDate,
    paymentMethod: formData.paymentMethod,
    currency: 'THB', // ค่าเริ่มต้น
  };

  // 2. Flight Segments (ใช้สำหรับ Flight/Tour/Package Info)
  const flightSegments = [];
  if (formData.route1) {
    flightSegments.push({
      segmentId: '1',
      // ใช้ field ในฟอร์มตามที่ออกแบบไว้
      flightNo: formData.flightNo1,
      route: formData.route1,
      date: formData.date1,
      departTime: formData.departTime1,
      arriveTime: formData.arriveTime1,
      airlineName: 'TG (Thai Airways)', // Hardcoded for simplicity or fetched if needed
      // เพิ่มข้อมูลอื่น ๆ ที่เกี่ยวข้อง
      departCityCode: formData.route1?.split(' → ')?.[0] || '',
      arriveCityCode: formData.route1?.split(' → ')?.[1] || '',
    });
  }

  // 3. Hotel Info (ถ้ามี)
  const hotel = {
    hotelName: formData.hotelName || null,
    location: formData.location || null,
    checkInDate: formData.checkInDate || null,
    checkOutDate: formData.checkOutDate || null,
    numRooms: formData.numRooms || 0,
    numNights: formData.numNights || 0,
  };

  // 4. Fare Summary
  const fareSummary = {
    baseFare: parseFloat(formData.baseFare) || 0,
    taxesFees: parseFloat(formData.taxesFees) || 0,
    hotelAccommodation: parseFloat(formData.hotelAccommodation) || 0,
    totalPaid: totalPaid,
    currency: 'THB',
  };

  // 5. Agency Info (ดึงจาก Config)
  const agency = AGENCY_DETAILS;

  // 6. Security (Admin Password)
  const security = {
    adminPassword: formData.adminPassword,
  };

  // 7. Final Payload
  return {
    agency,
    traveller,
    flightSegments,
    hotel,
    fareSummary,
    security,
    project_id: projectId, // 💡 Project ID ที่ส่งมาจาก ClientIssueForm
  };
};
