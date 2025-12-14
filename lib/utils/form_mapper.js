// /lib/utils/form_mapper.js

/**
 * @file form_mapper.js
 * @description ฟังก์ชันสำหรับแปลงข้อมูลจากฟอร์ม (Flat Object) เป็น Payload มาตรฐาน BookingSchema
 * * @typedef {import('@/types/booking-types').BookingSchema} BookingSchema
 * @typedef {import('@/types/booking-types').TravellerDetails} TravellerDetails
 * @typedef {import('@/types/booking-types').FareSummary} FareSummary
 * @typedef {import('@/types/booking-types').FlightSegment} FlightSegment
 * @typedef {import('@/types/booking-types').HotelDetails} HotelDetails
 * @typedef {import('@/types/booking-types').TourDetails} TourDetails
 * @typedef {import('@/types/booking-types').ProjectType} ProjectType
 */

// 💡 เนื่องจาก AGENCY_DETAILS และ security ไม่ใช่ส่วนหนึ่งของ BookingSchema
// เราจะตัดออกจาก Payload ที่ส่งไป DB แต่เก็บไว้ใน formData หากจำเป็น

/**
 * @title mapFormDataToBookingSchema
 * @description แปลงข้อมูลฟอร์มให้เป็น BookingSchema (Payload สำหรับ Server Action)
 * @param {object} formData - ข้อมูลจากฟอร์มใน AdminBookingForm
 * @param {number} totalPaid - ยอดรวมที่คำนวณแล้ว
 * @param {ProjectType} projectId - ID ของ Project ที่กำลังดำเนินการ
 * @returns {BookingSchema} Payload ที่มีโครงสร้างตาม BookingSchema
 */
export const mapFormDataToPayload = (formData, totalPaid, projectId) => {
  const pnrCode = formData.pnr?.toUpperCase().trim() || 'N/A';
  const travellerName = formData.travellerName?.toUpperCase().trim() || 'N/A';

  // 1. Traveller Details (JSONB: traveller_details)
  /** @type {TravellerDetails} */
  const travellerDetails = {
    name: travellerName,
    passport_no: formData.passportNo || undefined,
    nationality: formData.nationality || 'THAI',
    email: formData.email || '',
    phone: formData.phone || '',
  };

  // 2. Fare Summary (JSONB: fare_summary)
  /** @type {FareSummary} */
  const fareSummary = {
    base_fare: parseFloat(formData.baseFare) || 0,
    taxes: parseFloat(formData.taxesFees) || 0,
    // total_paid ควรใช้ค่าที่คำนวณจาก totalPaid ที่ส่งมา
    total_paid: totalPaid,
    currency: formData.currency || 'THB',
    payment_status: formData.paymentStatus || 'PAID IN FULL',
  };

  // 3. Flight Details (JSONB: flight_details) - ใช้สำหรับ FLIGHT
  /** @type {FlightSegment[] | null} */
  let flightDetails = null;
  if (projectId === 'FLIGHT' && formData.route1) {
    flightDetails = [
      {
        flight_no: formData.flightNo1 || '',
        airline_name: formData.airlineName1 || 'TG (Thai Airways)',
        route: formData.route1,
        date: formData.date1 || '',
        depart_time: formData.departTime1 || '',
        arrive_time: formData.arriveTime1 || '',
        depart_airport: formData.departAirport1 || formData.route1?.split(' → ')?.[0] || '',
        arrive_airport: formData.arriveAirport1 || formData.route1?.split(' → ')?.[1] || '',
        duration: formData.duration1 || undefined,
        class: formData.class1 || undefined,
      },
    ];
    // 💡 หากมี route2, route3, ควรเพิ่ม Segment ที่ 2, 3 เข้าไปใน Array นี้
  }

  // 4. Hotel Details (JSONB: hotel_details) - ใช้สำหรับ HOTEL
  /** @type {HotelDetails | null} */
  let hotelDetails = null;
  if (projectId === 'HOTEL' && formData.hotelName) {
    hotelDetails = {
      hotel_name: formData.hotelName || '',
      room_type: formData.roomType || '',
      check_in_date: formData.checkInDate || '',
      check_out_date: formData.checkOutDate || '',
      num_nights: parseInt(formData.numNights) || 0,
      num_rooms: parseInt(formData.numRooms) || 0,
      // address, contact_phone, cancellation_policy อาจต้องเพิ่มในฟอร์ม
    };
  }

  // 5. Tour Details (JSONB: tour_details) - ใช้สำหรับ TOUR
  /** @type {TourDetails | null} */
  let tourDetails = null;
  // 💡 สมมติว่าฟอร์มมี field เช่น tourName, activityDate
  if (projectId === 'TOUR' && formData.tourName) {
    tourDetails = {
      tour_name: formData.tourName || '',
      activity_date: formData.activityDate || '',
      activity_time: formData.activityTime || '',
      package_type: formData.packageType || '',
      pickup_location: formData.pickupLocation || '',
    };
  }

  // 6. Final BookingSchema Payload
  /** @type {BookingSchema} */
  const bookingSchemaPayload = {
    pnr_code: pnrCode,
    project_id: projectId,
    traveller_name: travellerName,
    booking_status: formData.bookingStatus || 'CONFIRMED',
    is_active: true,

    // JSONB Fields
    traveller_details: travellerDetails,
    fare_summary: fareSummary,
    flight_details: flightDetails,
    hotel_details: hotelDetails,
    tour_details: tourDetails,

    // Additional DB Fields
    eticket_no: formData.eticket || null,
    payment_method: formData.paymentMethod || null,
  };

  return bookingSchemaPayload;
};

// *** แนะนำให้ Server Action 'saveBooking' รับแค่ BookingSchema เท่านั้น ***
// *** และจัดการ Agency/Security ในส่วน Server Side ถ้าจำเป็น ***
