// app/admin/booking-form/AdminBookingForm.tsx
'use client';

import React, { useState, useTransition, useCallback, useMemo } from 'react';
// 💡 Import Server Action ที่ใช้ในการบันทึกและสร้าง PDF
import { saveBooking } from '@/app/actions/bookings';

// 💡 Assumed imports for types (adjust path if needed)
import type {
  BookingSchema,
  FlightSegment,
  HotelDetails,
  FareSummary,
  ProjectType, // 💡 FIX: นำเข้า ProjectType จากไฟล์ types/booking-types
} from '@/types/booking-types';

// ----------------------------------------------------
// 1. UTILITY TYPES & CONSTANTS
// ----------------------------------------------------

// 💡 FIX: ลบ Local Type Definition ออก เพราะเราใช้ Type ที่ Import มา
// type ProjectType = 'FLIGHT' | 'HOTEL' | 'TOUR' | '';
// type CurrencyType = 'THB' | 'USD' | 'EUR';

const initialFlightSegment: FlightSegment = {
  flight_no: '',
  airline_name: '',
  route: '',
  date: '',
  depart_time: '',
  arrive_time: '',
  depart_airport: '',
  arrive_airport: '',
  duration: '',
};

const initialHotelDetails: HotelDetails = {
  hotel_name: '',
  room_type: '',
  check_in_date: '',
  check_out_date: '',
  num_nights: 1,
  num_rooms: 1,
};

// 💡 Initial State ของฟอร์มที่สมบูรณ์ตาม BookingSchema
const initialFormData: BookingSchema = {
  pnr_code: '',
  // 💡 FIX: ไม่ต้องใช้ Type Assertion แล้ว เพราะ ProjectType หลักมี '' รวมอยู่แล้ว
  project_id: '',
  traveller_name: '',
  booking_status: 'CONFIRMED',
  is_active: true, // เพิ่ม field ที่ขาดไป
  eticket_no: null, // Optional DB Field
  payment_method: null, // Optional DB Field

  traveller_details: {
    name: '',
    nationality: 'THAI',
    email: '',
    phone: '',
  },
  fare_summary: {
    base_fare: 0.0,
    taxes: 0.0,
    total_paid: 0.0,
    currency: 'THB',
  },
  flight_details: [initialFlightSegment], // เริ่มต้นด้วย 1 Segment
  hotel_details: initialHotelDetails,
  tour_details: null, // JSONB Object ที่อาจถูกละเว้นหรือเป็น null
};

interface StatusMessage {
  message: string;
  type: 'idle' | 'success' | 'error' | 'info';
}

// ----------------------------------------------------
// 2. UTILITY FUNCTIONS (PDF Download)
// ----------------------------------------------------

/**
 * @description แปลง Base64 String ที่ได้จาก Server Action เป็น Blob และ Force Download เป็นไฟล์ PDF
 */
const downloadPdfFromBase64 = (base64String: string, pnr: string, projectId: ProjectType) => {
  try {
    const base64Cleaned = base64String.replace(/^data:application\/pdf;base64,/, '');
    // ใช้ atob สำหรับ Client-side Base64 decode
    const binaryString = atob(base64Cleaned);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: 'application/pdf' });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const safePnr = pnr.replace(/[^a-zA-Z0-9-]/g, '_');
    // 💡 ปรับการตั้งชื่อไฟล์โดยป้องกันค่าว่าง
    const safeProjectId = projectId || 'UNKNOWN';
    a.download = `${safeProjectId}-${safePnr}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    return true;
  } catch (e) {
    console.error('Error during PDF download:', e);
    return false;
  }
};

// ----------------------------------------------------
// 3. SUB-COMPONENTS (Input Fields)
// ----------------------------------------------------

// 💡 Component นี้จะแสดงเมื่อ project_id คือ FLIGHT
const FlightDetailsInputs = ({
  formData,
  setFormData,
}: {
  formData: BookingSchema;
  setFormData: React.Dispatch<React.SetStateAction<BookingSchema>>;
}) => {
  const handleSegmentChange = (index: number, field: keyof FlightSegment, value: string) => {
    // 💡 เนื่องจาก flight_details เป็น Array, ต้องมั่นใจว่ามันไม่เป็น null
    if (!formData.flight_details) return;

    const newSegments = [...formData.flight_details];
    // 💡 Type check: segment ใน Array ต้องเป็น FlightSegment
    const currentSegment = newSegments[index] as FlightSegment;

    newSegments[index] = { ...currentSegment, [field]: value };
    setFormData((prev) => ({ ...prev, flight_details: newSegments }));
  };

  const segments = formData.flight_details || [];

  return (
    <div className="space-y-6">
      <h2 className="border-b pb-2 text-xl font-semibold text-indigo-700">
        รายละเอียดเที่ยวบิน (Segment)
      </h2>
      {segments.map((segment, index) => (
        <div key={index} className="space-y-3 rounded-lg border bg-gray-50 p-4">
          <p className="text-sm font-bold text-gray-600">เที่ยวบินที่: {index + 1}</p>
          <input
            type="text"
            placeholder="หมายเลขเที่ยวบิน (เช่น JP532)"
            value={segment.flight_no}
            onChange={(e) => handleSegmentChange(index, 'flight_no', e.target.value)}
            className="w-full rounded border px-3 py-2"
            required
          />
          <input
            type="text"
            placeholder="เส้นทาง (เช่น กรุงเทพฯ-กัวลาลัมเปอร์)"
            value={segment.route}
            onChange={(e) => handleSegmentChange(index, 'route', e.target.value)}
            className="w-full rounded border px-3 py-2"
            required
          />
          <input
            type="text"
            placeholder="ชื่อสายการบิน (เช่น Thai Airways)"
            value={segment.airline_name}
            onChange={(e) => handleSegmentChange(index, 'airline_name', e.target.value)}
            className="w-full rounded border px-3 py-2"
            required
          />
          <div className="flex space-x-4">
            <input
              type="date"
              placeholder="วันที่ออกเดินทาง"
              value={segment.date}
              onChange={(e) => handleSegmentChange(index, 'date', e.target.value)}
              className="w-1/2 rounded border px-3 py-2"
              required
            />
            <input
              type="time"
              placeholder="เวลาออกเดินทาง"
              value={segment.depart_time}
              onChange={(e) => handleSegmentChange(index, 'depart_time', e.target.value)}
              className="w-1/2 rounded border px-3 py-2"
              required
            />
          </div>
          {/* ... Add more Flight Segment fields here (depart_airport, arrive_airport, etc.) ... */}
          {segments.length > 1 && (
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  flight_details: prev.flight_details!.filter((_, i) => i !== index),
                }))
              }
              className="mt-2 text-sm text-red-500 hover:text-red-700"
            >
              ลบเที่ยวบินนี้
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          setFormData((prev) => ({
            ...prev,
            flight_details: [...(prev.flight_details || []), initialFlightSegment],
          }))
        }
        className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
      >
        + เพิ่มเที่ยวบิน (Segment)
      </button>
    </div>
  );
};

// 💡 Component นี้จะแสดงเมื่อ project_id คือ HOTEL
const HotelDetailsInputs = ({
  formData,
  setFormData,
}: {
  formData: BookingSchema;
  setFormData: React.Dispatch<React.SetStateAction<BookingSchema>>;
}) => {
  const hotelDetails = formData.hotel_details || initialHotelDetails;

  const handleHotelChange = (field: keyof HotelDetails, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      hotel_details: { ...hotelDetails, [field]: value },
    }));
  };

  return (
    <div className="space-y-4">
      <h2 className="border-b pb-2 text-xl font-semibold text-indigo-700">รายละเอียดโรงแรม</h2>
      <input
        type="text"
        placeholder="ชื่อโรงแรม"
        value={hotelDetails.hotel_name}
        onChange={(e) => handleHotelChange('hotel_name', e.target.value)}
        className="w-full rounded border px-3 py-2"
        required
      />
      <input
        type="text"
        placeholder="ประเภทห้องพัก"
        value={hotelDetails.room_type}
        onChange={(e) => handleHotelChange('room_type', e.target.value)}
        className="w-full rounded border px-3 py-2"
        required
      />
      <div className="flex space-x-4">
        <input
          type="date"
          placeholder="วันเช็คอิน"
          value={hotelDetails.check_in_date}
          onChange={(e) => handleHotelChange('check_in_date', e.target.value)}
          className="w-full rounded border px-3 py-2"
          required
        />
        <input
          type="date"
          placeholder="วันเช็คเอาท์"
          value={hotelDetails.check_out_date}
          onChange={(e) => handleHotelChange('check_out_date', e.target.value)}
          className="w-full rounded border px-3 py-2"
          required
        />
      </div>
      <div className="flex space-x-4">
        <input
          type="number"
          placeholder="จำนวนคืน (Nights)"
          min="1"
          value={hotelDetails.num_nights}
          onChange={(e) => handleHotelChange('num_nights', parseInt(e.target.value) || 1)}
          className="w-1/2 rounded border px-3 py-2"
          required
        />
        <input
          type="number"
          placeholder="จำนวนห้อง (Rooms)"
          min="1"
          value={hotelDetails.num_rooms}
          onChange={(e) => handleHotelChange('num_rooms', parseInt(e.target.value) || 1)}
          className="w-1/2 rounded border px-3 py-2"
          required
        />
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 4. MAIN COMPONENT
// ----------------------------------------------------

export function AdminBookingForm() {
  const [formData, setFormData] = useState<BookingSchema>(initialFormData);
  const [status, setStatus] = useState<StatusMessage>({
    message: 'กรอกข้อมูลการจองเพื่อบันทึกและออกเอกสาร',
    type: 'idle',
  });
  const [isPending, startTransition] = useTransition();

  // 4.1. Helper function สำหรับการอัปเดต Field หลัก
  const handleFieldChange = useCallback(
    // 💡 ใช้ ProjectType ที่ถูก Import มา
    (field: keyof BookingSchema, value: string | ProjectType) => {
      // 💡 Logic พิเศษ: เมื่อเปลี่ยน Project ID ให้ Reset รายละเอียดเฉพาะบริการ
      if (field === 'project_id') {
        let newFormData = { ...formData, [field]: value };
        if (value === 'FLIGHT') {
          newFormData.hotel_details = null;
          newFormData.tour_details = null;
          if (!newFormData.flight_details || newFormData.flight_details.length === 0) {
            newFormData.flight_details = [initialFlightSegment];
          }
        } else if (value === 'HOTEL') {
          newFormData.flight_details = null;
          newFormData.tour_details = null;
          newFormData.hotel_details = initialHotelDetails;
        } else if (value === 'TOUR') {
          newFormData.flight_details = null;
          newFormData.hotel_details = null;
          // 💡 Type Safety: กำหนดให้เป็น null หรือตามโครงสร้าง TourDetails ที่คาดหวัง
          newFormData.tour_details = {} as any; // ใช้ as any ชั่วคราว หรือกำหนดโครงสร้างให้ TourDetails
        } else {
          newFormData.flight_details = null;
          newFormData.hotel_details = null;
          newFormData.tour_details = null;
        }
        setFormData(newFormData);
        return;
      }

      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    [formData],
  );

  // 4.2. Helper function สำหรับการอัปเดต Fare Summary (แก้ไขปัญหาเลข 0)
  const handleFareChange = useCallback((field: keyof FareSummary, value: string) => {
    // 💡 แก้ไข: ถ้าค่าเป็น Empty String ให้ถือว่าเป็น 0.0 เพื่อให้กรอกง่าย
    const cleanedValue = value.trim();
    const numValue = cleanedValue === '' ? 0.0 : parseFloat(cleanedValue);

    setFormData((prev) => ({
      ...prev,
      fare_summary: { ...prev.fare_summary, [field]: numValue || 0.0 }, // Ensure it's always a number
    }));
  }, []);

  // 4.3. Helper: Styling for Status Box
  const statusStyle = useMemo(() => {
    switch (status.type) {
      case 'success':
        return 'bg-green-50 border-green-400 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-400 text-red-800';
      case 'info':
      case 'idle':
      default:
        return 'bg-blue-50 border-blue-400 text-blue-800';
    }
  }, [status.type]);

  // 4.4. Submission Logic
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!formData.pnr_code || !formData.project_id || !formData.traveller_name) {
        setStatus({
          message: 'กรุณากรอก PNR Code, ประเภทบริการ และชื่อผู้เดินทางหลัก ให้ครบถ้วน',
          type: 'error',
        });
        return;
      }

      // 💡 Validation: project_id ต้องไม่ใช่ '' ก่อนส่งไป Server Action
      if (formData.project_id === '') {
        setStatus({
          message: 'กรุณาเลือกประเภทบริการ (Project Type)',
          type: 'error',
        });
        return;
      }

      // 💡 Server Action Call
      startTransition(async () => {
        setStatus({
          message: `กำลังบันทึกข้อมูลและสร้าง PDF สำหรับ ${formData.pnr_code}...`,
          type: 'info',
        });

        try {
          // 💡 saveBooking: บันทึกข้อมูลและส่ง Base64 ของ PDF กลับมา
          const result = await saveBooking(formData);

          if (result.success && result.pdf_base64 && result.pnr_code && result.project_id) {
            // 💡 PDF Generation Success: Trigger Download
            const isDownloaded = downloadPdfFromBase64(
              result.pdf_base64,
              result.pnr_code,
              // 💡 Type Assertion ตรงนี้เพื่อความปลอดภัย
              result.project_id as ProjectType,
            );

            if (isDownloaded) {
              setStatus({
                message: result.message || `บันทึก PNR: ${result.pnr_code} และออกเอกสารสำเร็จ`,
                type: 'success',
              });
              // 💡 Reset form to initial state after successful save
              setFormData(initialFormData);
            } else {
              setStatus({
                message:
                  'บันทึกสำเร็จ แต่การดาวน์โหลดไฟล์ PDF ล้มเหลว (ข้อมูลยังถูกบันทึกในระบบแล้ว)',
                type: 'error',
              });
            }
          } else {
            // DB Save or PDF Generation Failed (Server Side)
            setStatus({
              message: result.error || 'การบันทึกข้อมูลล้มเหลว โปรดตรวจสอบ Server logs',
              type: 'error',
            });
          }
        } catch (error) {
          console.error('Server Action Error:', error);
          setStatus({
            message: 'เกิดข้อผิดพลาดในการเชื่อมต่อ Server Action.',
            type: 'error',
          });
        }
      });
    },
    [formData, startTransition],
  );

  // 💡 คำนวณยอดรวมสุทธิแบบ Real-time
  const calculatedTotal = formData.fare_summary.base_fare + formData.fare_summary.taxes;

  return (
    <form onSubmit={handleSubmit} className="space-y-8 rounded-xl bg-white p-8 shadow-2xl">
      {/* 4.5. Status Alert */}
      <div className={`rounded border-l-4 p-4 ${statusStyle} transition-all`}>
        <p className="font-medium">{status.message}</p>
      </div>

      {/* 4.6. Core Booking Information */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-indigo-700">1. ข้อมูลการจองหลัก</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="รหัส PNR/Voucher (จำเป็น)"
            value={formData.pnr_code}
            onChange={(e) => handleFieldChange('pnr_code', e.target.value)}
            className="w-1/2 rounded-lg border border-gray-300 px-4 py-2 text-lg font-bold uppercase"
            maxLength={15}
            required
            disabled={isPending}
          />
          <select
            value={formData.project_id}
            onChange={(e) => handleFieldChange('project_id', e.target.value as ProjectType)}
            className="w-1/2 rounded-lg border border-gray-300 px-4 py-2 text-lg"
            required
            disabled={isPending}
          >
            <option value="" disabled>
              เลือกประเภทบริการ (Project Type)
            </option>
            <option value="FLIGHT">FLIGHT (เที่ยวบิน)</option>
            <option value="HOTEL">HOTEL (โรงแรม)</option>
            <option value="TOUR">TOUR (ทัวร์/กิจกรรม)</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="ชื่อผู้เดินทางหลัก (Main Traveller Name)"
          value={formData.traveller_name}
          onChange={(e) => handleFieldChange('traveller_name', e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-lg"
          required
          disabled={isPending}
        />
        <select
          value={formData.booking_status}
          onChange={(e) => handleFieldChange('booking_status', e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-lg"
          disabled={isPending}
        >
          <option value="CONFIRMED">สถานะ: CONFIRMED (ยืนยันแล้ว)</option>
          <option value="PENDING">สถานะ: PENDING (รอดำเนินการ)</option>
          <option value="CANCELLED">สถานะ: CANCELLED (ยกเลิกแล้ว)</option>
        </select>
      </section>

      {/* 4.7. Fare Summary */}
      <section className="space-y-4 rounded-lg border bg-gray-50 p-6">
        <h2 className="text-xl font-semibold text-indigo-700">2. สรุปค่าใช้จ่าย (THB)</h2>
        <div className="grid grid-cols-3 gap-4">
          <input
            type="number"
            placeholder="ค่าโดยสาร/ค่าบริการพื้นฐาน"
            // 💡 แก้ไข: ใช้ String เพื่อให้สามารถลบเลข 0 แล้วกรอกค่าใหม่ได้ง่าย
            value={formData.fare_summary.base_fare === 0.0 ? '' : formData.fare_summary.base_fare}
            onChange={(e) => handleFareChange('base_fare', e.target.value)}
            className="rounded border px-3 py-2"
            disabled={isPending}
          />
          <input
            type="number"
            placeholder="ภาษี/ค่าธรรมเนียม"
            value={formData.fare_summary.taxes === 0.0 ? '' : formData.fare_summary.taxes}
            onChange={(e) => handleFareChange('taxes', e.target.value)}
            className="rounded border px-3 py-2"
            disabled={isPending}
          />
          <input
            type="number"
            placeholder="ยอดชำระเงินจริงทั้งหมด"
            value={formData.fare_summary.total_paid === 0.0 ? '' : formData.fare_summary.total_paid}
            onChange={(e) => handleFareChange('total_paid', e.target.value)}
            className="rounded border px-3 py-2"
            required
            disabled={isPending}
          />
        </div>
        {/* 💡 Total calculation preview */}
        <p className="pt-2 text-sm font-semibold text-gray-700">
          ยอดรวมสุทธิ (Base + Taxes):{' '}
          <span className="font-bold text-indigo-600">
            {' '}
            {calculatedTotal.toFixed(2)} {formData.fare_summary.currency}
          </span>
        </p>
      </section>

      {/* 4.8. Project Specific Details (Conditional Rendering) */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-indigo-700">3. รายละเอียดเฉพาะบริการ</h2>
        {formData.project_id === 'FLIGHT' && (
          <FlightDetailsInputs formData={formData} setFormData={setFormData} />
        )}
        {formData.project_id === 'HOTEL' && (
          <HotelDetailsInputs formData={formData} setFormData={setFormData} />
        )}
        {formData.project_id === 'TOUR' && (
          <p className="text-gray-500">รายละเอียดทัวร์/กิจกรรม (ยังไม่ได้นำมาใช้ในเวอร์ชันนี้)</p>
        )}
        {!formData.project_id && (
          <p className="text-gray-500">กรุณาเลือกประเภทบริการด้านบนเพื่อกรอกรายละเอียด</p>
        )}
      </section>

      {/* 4.9. Submission Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isPending || !formData.pnr_code || !formData.project_id}
          className={`w-full rounded-lg px-4 py-4 text-lg font-semibold text-white shadow-xl transition duration-200 ${
            isPending ? 'cursor-not-allowed bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isPending ? (
            <div className="flex items-center justify-center">
              <svg
                className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              กำลังบันทึกและสร้าง PDF...
            </div>
          ) : (
            '💾 บันทึกข้อมูลการจอง & สร้างเอกสาร PDF'
          )}
        </button>
      </div>
    </form>
  );
}
