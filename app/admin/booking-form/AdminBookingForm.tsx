// app/admin/booking-form/AdminBookingForm.tsx
'use client';

import React, { useState, useTransition, useCallback } from 'react';
import { saveBooking } from '@/app/actions/bookings';
// 💡 Assumed imports for types (adjust path if needed)
import type {
  BookingSchema,
  TravellerDetails,
  FlightSegment,
  HotelDetails,
  FareSummary,
} from '@/types/booking-types';

// ----------------------------------------------------
// 1. CONSTANTS AND TYPES (Moved from component body for clarity)
// ----------------------------------------------------

// 💡 RECOMMENDATION: ย้าย Type เหล่านี้ไปรวมใน '@/types/booking-types'
type ProjectType = 'FLIGHT' | 'HOTEL' | 'TOUR';
type CurrencyType = 'THB' | 'USD' | 'EUR';

const initialTravellerDetails: TravellerDetails = {
  name: '',
  passport_no: '',
  nationality: 'THAI',
  email: '',
  phone: '',
  currency: 'THB',
};

const initialFareSummary: FareSummary = {
  base_fare: 0.0,
  taxes: 0.0,
  total_paid: 0.0,
  currency: 'THB',
};

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
  location: '',
  booking_ref: '',
  check_in_date: '',
  check_out_date: '',
  num_rooms: 1,
  num_nights: 1,
  guest_names: '',
  confirmation_policy: 'Fully Paid',
};

// ----------------------------------------------------
// 2. UTILITY FUNCTIONS (Client-side PDF Download Logic)
// ----------------------------------------------------

/**
 * @description แปลง Base64 String เป็น Blob และ Force Download เป็นไฟล์ PDF
 * ✅ Pattern: แยก Logic ที่ซับซ้อนออกจาก Handler หลัก
 */
const downloadPdfFromBase64 = (base64String: string, pnr: string, projectId: string) => {
  // 1. แปลง Base64 กลับเป็น Binary Data (Standard Atob Conversion)
  const binaryString = atob(base64String);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const blob = new Blob([bytes], { type: 'application/pdf' });

  // 2. จัดการดาวน์โหลดไฟล์
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.setAttribute('download', `${projectId}_${pnr}.pdf`);
  document.body.appendChild(link);
  link.click();

  // 3. Cleanup
  link.remove();
  window.URL.revokeObjectURL(url);
};

// ----------------------------------------------------
// 3. MAIN COMPONENT
// ----------------------------------------------------

export const AdminBookingForm: React.FC = () => {
  const [isPending, startTransition] = useTransition();

  // Primary State
  const [pnrCode, setPnrCode] = useState<string>('');
  const [projectType, setProjectType] = useState<ProjectType>('FLIGHT');
  const [bookingStatus, setBookingStatus] = useState<'CONFIRMED' | 'PENDING' | 'CANCELLED'>(
    'CONFIRMED',
  );
  const [status, setStatus] = useState<{
    message: string;
    type: 'idle' | 'success' | 'error' | 'loading';
  }>({
    message: 'กรอกข้อมูลการจองและเลือกประเภทเอกสาร',
    type: 'idle',
  });

  // Detail States
  const [traveller, setTraveller] = useState<TravellerDetails>(initialTravellerDetails);
  const [fareSummary, setFareSummary] = useState<FareSummary>(initialFareSummary);
  const [flightSegments, setFlightSegments] = useState<FlightSegment[]>([initialFlightSegment]);
  const [hotelData, setHotelData] = useState<HotelDetails>(initialHotelDetails);

  // ----------------------------------------------------
  // HANDLERS
  // ----------------------------------------------------

  // Handler สำหรับอัปเดต Field ทั่วไปและ Fare Summary (รวม logic คำนวณ)
  const handleDetailChange = (
    setter: React.Dispatch<React.SetStateAction<any>>,
    currentState: any,
    field: string,
    value: string | number,
  ) => {
    // แปลงค่าเป็นตัวเลข (ใช้ NaN แทน 0 เพื่อแยกความแตกต่างระหว่าง 'ว่าง' กับ '0')
    let numericValue = typeof value === 'string' && value !== '' ? parseFloat(value) : value;

    if (setter === setFareSummary) {
      const newSummary = { ...currentState, [field]: numericValue };

      // 🎯 Logic: คำนวณ Total Paid อัตโนมัติ (Base Fare + Taxes)
      if (field === 'base_fare' || field === 'taxes') {
        const base = parseFloat(newSummary.base_fare) || 0;
        const taxes = parseFloat(newSummary.taxes) || 0;
        newSummary.total_paid = base + taxes;
      }

      // Currency Field ไม่ใช่ตัวเลข
      if (field === 'currency') {
        newSummary.currency = value as CurrencyType;
      }
      // ใส่ค่ากลับไปเป็นเลข 0 หากเป็น NaN หรือ undefined เพื่อให้ Type สอดคล้องกับ FareSummary
      setter({ ...newSummary, [field]: isNaN(numericValue as number) ? 0 : numericValue });
    } else {
      // Logic สำหรับ States อื่น ๆ (Traveller, Hotel)
      setter({ ...currentState, [field]: value });
    }
  };

  const updateFlightSegment = useCallback(
    (index: number, field: keyof FlightSegment, value: string | number) => {
      setFlightSegments((prevSegments) => {
        const newSegments = [...prevSegments];
        (newSegments[index][field] as string | number) = value;
        return newSegments;
      });
    },
    [],
  );

  const addFlightSegment = () => {
    setFlightSegments((prevSegments) => [...prevSegments, initialFlightSegment]);
  };

  const removeFlightSegment = (index: number) => {
    setFlightSegments((prevSegments) => prevSegments.filter((_, i) => i !== index));
  };

  // ----------------------------------------------------
  // SUBMIT HANDLER (บันทึก + ดาวน์โหลด PDF)
  // ----------------------------------------------------

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const pnr = pnrCode.trim().toUpperCase();

    if (!pnr || !traveller.name) {
      setStatus({ message: 'PNR Code และชื่อผู้เดินทางหลักเป็นสิ่งจำเป็น', type: 'error' });
      return;
    }

    setStatus({ message: 'กำลังบันทึกข้อมูลและสร้างเอกสาร...', type: 'loading' });

    // 🎯 Business Logic: จัดการข้อมูลก่อนส่ง Server Action
    const baseData: BookingSchema = {
      project_id: projectType,
      pnr_code: pnr,
      traveller_name: traveller.name.trim().toUpperCase(),
      booking_status: bookingStatus,
      traveller_details: traveller,
      fare_summary: fareSummary,
      flight_details: projectType === 'FLIGHT' ? flightSegments : undefined,
      hotel_details: projectType === 'HOTEL' ? hotelData : undefined,
    };

    startTransition(async () => {
      // 💡 เรียกใช้ Server Action
      const result = await saveBooking(baseData);

      if (result.success && result.pdf_base64) {
        try {
          // --- Client-side PDF Download --- (ใช้ Utility Function)
          downloadPdfFromBase64(result.pdf_base64, result.pnr_code, result.project_id);

          setStatus({
            message: `🎉 บันทึก PNR: ${result.pnr_code} และดาวน์โหลดเอกสารสำเร็จ!`,
            type: 'success',
          });
          // ✅ Pattern: รีเซ็ตเฉพาะ PNR เพื่อให้ผู้ใช้คีย์รายการต่อไปได้เร็วขึ้น
          setPnrCode('');
        } catch (pdfDownloadError) {
          setStatus({
            message: `⚠️ บันทึกข้อมูลสำเร็จ แต่ดาวน์โหลด PDF ล้มเหลว: ${(pdfDownloadError as Error).message}`,
            type: 'error',
          });
        }
      } else {
        // Handle Error จาก Server Action
        setStatus({
          message: `❌ ${result.error || 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุจากเซิร์ฟเวอร์'}`,
          type: 'error',
        });
      }
    });
  };

  // ----------------------------------------------------
  // UI UTILITIES
  // ----------------------------------------------------

  const statusStyle =
    status.type === 'success'
      ? 'bg-green-100 border-green-500 text-green-700'
      : status.type === 'error'
        ? 'bg-red-100 border-red-500 text-red-700'
        : status.type === 'loading'
          ? 'bg-blue-100 border-blue-500 text-blue-700'
          : 'bg-gray-100 border-gray-400 text-gray-700';

  // ----------------------------------------------------
  // RENDER
  // ----------------------------------------------------

  return (
    <div className="mx-auto max-w-6xl rounded-lg bg-white p-8 shadow-2xl">
      <h2 className="mb-8 border-b pb-4 text-3xl font-bold text-gray-800">
        <span className="text-indigo-600">JP-VISOUL-DOCS</span>: ระบบคีย์ข้อมูลและออกเอกสาร
      </h2>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* 1. Project Type Selector */}
        <div className="flex space-x-4 rounded-xl border border-indigo-200 bg-indigo-50 p-3 shadow-inner">
          {(['FLIGHT', 'HOTEL', 'TOUR'] as ProjectType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setProjectType(type)}
              className={`flex-1 rounded-lg py-3 font-semibold transition duration-200 ${
                projectType === type
                  ? 'bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-500'
                  : 'bg-white text-gray-700 hover:bg-indigo-100/70'
              }`}
              disabled={isPending}
            >
              {type === 'FLIGHT'
                ? '✈️ ตั๋วเครื่องบิน'
                : type === 'HOTEL'
                  ? '🏨 ที่พัก/โรงแรม'
                  : '🗺️ แพ็คเกจทัวร์'}
            </button>
          ))}
        </div>

        {/* 2. Main Booking & Traveller Details */}
        <div className="space-y-6 rounded-lg border border-gray-200 p-6 shadow-md">
          <h3 className="border-b pb-2 text-xl font-semibold text-indigo-700">
            2. ข้อมูลหลัก (Required)
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* PNR */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                PNR / Reference No. <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={pnrCode}
                onChange={(e) => setPnrCode(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 font-bold uppercase focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="เช่น ABCXYZ"
                required
                disabled={isPending}
              />
            </div>

            {/* Booking Status */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Booking Status</label>
              <select
                value={bookingStatus}
                onChange={(e) =>
                  setBookingStatus(e.target.value as 'CONFIRMED' | 'PENDING' | 'CANCELLED')
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                disabled={isPending}
              >
                <option value="CONFIRMED">CONFIRMED (ชำระเงินแล้ว)</option>
                <option value="PENDING">PENDING (รอชำระ)</option>
                <option value="CANCELLED">CANCELLED (ยกเลิก)</option>
              </select>
            </div>

            {/* Project ID (Read-only) */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Document Type</label>
              <input
                type="text"
                value={projectType}
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 font-bold text-gray-600"
                disabled={true}
              />
            </div>
          </div>

          <h4 className="mt-4 border-t pt-4 text-lg font-semibold text-gray-600">
            ข้อมูลผู้เดินทางหลัก
          </h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {/* Name */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                ชื่อ-นามสกุล (หลัก) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={traveller.name}
                onChange={(e) =>
                  handleDetailChange(setTraveller, traveller, 'name', e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2 uppercase focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="MR. SOMCHAI DEEJAI"
                required
                disabled={isPending}
              />
            </div>
            {/* Passport */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Passport No.</label>
              <input
                type="text"
                value={traveller.passport_no}
                onChange={(e) =>
                  handleDetailChange(setTraveller, traveller, 'passport_no', e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                disabled={isPending}
              />
            </div>
            {/* Nationality */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Nationality</label>
              <input
                type="text"
                value={traveller.nationality}
                onChange={(e) =>
                  handleDetailChange(setTraveller, traveller, 'nationality', e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                disabled={isPending}
              />
            </div>
            {/* Email */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={traveller.email}
                onChange={(e) =>
                  handleDetailChange(setTraveller, traveller, 'email', e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                disabled={isPending}
              />
            </div>
          </div>
        </div>

        {/* 3. Dynamic Details Section (Flight / Hotel) */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
          <h3 className="border-b pb-2 text-xl font-semibold text-indigo-700">
            3. รายละเอียดการจอง ({projectType})
          </h3>

          {/* --- FLIGHT SEGMENTS --- */}
          {projectType === 'FLIGHT' && (
            <div className="space-y-5 pt-4">
              {flightSegments.map((segment, index) => (
                <div
                  key={index}
                  className="relative rounded-xl border border-blue-200 bg-blue-50 p-4 shadow-inner"
                >
                  <h4 className="mb-3 font-bold text-blue-700">Segment {index + 1}</h4>

                  <div className="grid grid-cols-4 gap-3">
                    {/* Row 1 */}
                    <input
                      type="text"
                      value={segment.airline_name}
                      onChange={(e) => updateFlightSegment(index, 'airline_name', e.target.value)}
                      className="col-span-2 rounded-lg border px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Airline Name (e.g., THAI AIRWAYS)"
                      disabled={isPending}
                    />
                    <input
                      type="text"
                      value={segment.flight_no}
                      onChange={(e) => updateFlightSegment(index, 'flight_no', e.target.value)}
                      className="col-span-1 rounded-lg border px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Flight No. (e.g., TG921)"
                      disabled={isPending}
                    />
                    <input
                      type="text"
                      value={segment.route}
                      onChange={(e) => updateFlightSegment(index, 'route', e.target.value)}
                      className="col-span-1 rounded-lg border px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Route (e.g., BKK-FRA)"
                      disabled={isPending}
                    />

                    {/* Row 2 */}
                    <input
                      type="date"
                      value={segment.date}
                      onChange={(e) => updateFlightSegment(index, 'date', e.target.value)}
                      className="rounded-lg border px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Date"
                      disabled={isPending}
                    />
                    <input
                      type="text"
                      value={segment.depart_airport}
                      onChange={(e) => updateFlightSegment(index, 'depart_airport', e.target.value)}
                      className="rounded-lg border px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Depart Airport"
                      disabled={isPending}
                    />
                    <input
                      type="text"
                      value={segment.arrive_airport}
                      onChange={(e) => updateFlightSegment(index, 'arrive_airport', e.target.value)}
                      className="rounded-lg border px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Arrive Airport"
                      disabled={isPending}
                    />
                    <input
                      type="text"
                      value={segment.duration}
                      onChange={(e) => updateFlightSegment(index, 'duration', e.target.value)}
                      className="rounded-lg border px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Duration (e.g., 11H 30M)"
                      disabled={isPending}
                    />
                  </div>

                  {flightSegments.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFlightSegment(index)}
                      className="absolute right-4 top-4 text-lg font-bold text-red-600 transition hover:text-red-800"
                      disabled={isPending}
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addFlightSegment}
                className="mt-3 block rounded-md bg-blue-500 px-3 py-1 text-sm font-semibold text-white transition hover:bg-blue-600"
                disabled={isPending}
              >
                + เพิ่ม Flight Segment
              </button>
            </div>
          )}

          {/* --- HOTEL DETAILS --- */}
          {projectType === 'HOTEL' && (
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={hotelData.hotel_name}
                  onChange={(e) =>
                    handleDetailChange(setHotelData, hotelData, 'hotel_name', e.target.value)
                  }
                  className="col-span-2 rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Hotel Name (e.g., The Grand JP Visoul)"
                  required
                  disabled={isPending}
                />
                <input
                  type="text"
                  value={hotelData.booking_ref}
                  onChange={(e) =>
                    handleDetailChange(setHotelData, hotelData, 'booking_ref', e.target.value)
                  }
                  className="rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Hotel Booking Ref (ถ้ามี)"
                  disabled={isPending}
                />
                <input
                  type="text"
                  value={hotelData.confirmation_policy}
                  onChange={(e) =>
                    handleDetailChange(
                      setHotelData,
                      hotelData,
                      'confirmation_policy',
                      e.target.value,
                    )
                  }
                  className="rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Confirmation Policy (e.g., Fully Paid)"
                  disabled={isPending}
                />
              </div>

              <input
                type="text"
                value={hotelData.location}
                onChange={(e) =>
                  handleDetailChange(setHotelData, hotelData, 'location', e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Full Hotel Address (สำหรับยื่นวีซ่า)"
                required
                disabled={isPending}
              />

              <div className="grid grid-cols-4 gap-4">
                {/* Check-in Date */}
                <div>
                  <label className="mb-1 text-sm font-medium text-gray-700">Check-in Date</label>
                  <input
                    type="date"
                    value={hotelData.check_in_date || ''}
                    onChange={(e) =>
                      handleDetailChange(setHotelData, hotelData, 'check_in_date', e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                    required
                    disabled={isPending}
                  />
                </div>

                {/* Check-out Date */}
                <div>
                  <label className="mb-1 text-sm font-medium text-gray-700">Check-out Date</label>
                  <input
                    type="date"
                    value={hotelData.check_out_date || ''}
                    onChange={(e) =>
                      handleDetailChange(setHotelData, hotelData, 'check_out_date', e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                    required
                    disabled={isPending}
                  />
                </div>

                <div>
                  <label className="mb-1 text-sm font-medium text-gray-700">No. of Rooms</label>
                  <input
                    type="number"
                    min="1"
                    value={hotelData.num_rooms}
                    onChange={(e) =>
                      handleDetailChange(
                        setHotelData,
                        hotelData,
                        'num_rooms',
                        parseInt(e.target.value) || 1,
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                    disabled={isPending}
                  />
                </div>
                <div>
                  <label className="mb-1 text-sm font-medium text-gray-700">No. of Nights</label>
                  <input
                    type="number"
                    min="1"
                    value={hotelData.num_nights}
                    onChange={(e) =>
                      handleDetailChange(
                        setHotelData,
                        hotelData,
                        'num_nights',
                        parseInt(e.target.value) || 1,
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                    disabled={isPending}
                  />
                </div>
              </div>

              <textarea
                value={hotelData.guest_names}
                onChange={(e) =>
                  handleDetailChange(setHotelData, hotelData, 'guest_names', e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                rows={2}
                placeholder="Guest Names (Comma separated, including main traveller)"
                disabled={isPending}
              />
            </div>
          )}

          {/* --- TOUR / DEFAULT (Simplified) --- */}
          {projectType === 'TOUR' && (
            <div className="rounded-xl border border-yellow-400 bg-yellow-50 p-4 shadow-sm">
              <p className="font-medium text-yellow-800">
                โปรดระบุรายละเอียดทัวร์/แพ็คเกจในช่องหมายเหตุ (ถ้ามี) ข้อมูลหลักจะถูกบันทึกตาม PNR
                และ Traveller Details ด้านบน
              </p>
            </div>
          )}
        </div>

        {/* 4. Fare Summary (Payment Summary) */}
        <div className="space-y-4 rounded-lg border border-gray-200 p-6 shadow-md">
          <h3 className="border-b pb-2 text-xl font-semibold text-indigo-700">
            4. สรุปค่าใช้จ่าย (Payment Summary)
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {/* Base Fare */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Base Fare</label>
              <input
                type="number"
                step="0.01"
                // ✅ Fix UX: แสดงค่าว่างถ้าเป็น 0 เพื่อให้ผู้ใช้ป้อนข้อมูลได้ง่าย
                value={fareSummary.base_fare === 0 ? '' : fareSummary.base_fare}
                onChange={(e) =>
                  handleDetailChange(setFareSummary, fareSummary, 'base_fare', e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="0.00"
                disabled={isPending}
              />
            </div>

            {/* Taxes / Surcharges */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Taxes / Surcharges
              </label>
              <input
                type="number"
                step="0.01"
                value={fareSummary.taxes === 0 ? '' : fareSummary.taxes}
                onChange={(e) =>
                  handleDetailChange(setFareSummary, fareSummary, 'taxes', e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="0.00"
                disabled={isPending}
              />
            </div>

            {/* Total Paid (Auto-calculated) */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Total Paid (Auto)
              </label>
              <input
                type="text" // เปลี่ยนเป็น text เพื่อการแสดงผลที่สวยงามกว่า number
                value={`${fareSummary.total_paid.toFixed(2)} ${fareSummary.currency}`}
                className="w-full rounded-lg border border-indigo-400 bg-indigo-50 px-4 py-2 text-lg font-bold text-indigo-800"
                required
                disabled={true} // ปิดการแก้ไข
              />
            </div>

            {/* Currency */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Currency</label>
              <select
                value={fareSummary.currency}
                onChange={(e) =>
                  handleDetailChange(
                    setFareSummary,
                    fareSummary,
                    'currency',
                    e.target.value as CurrencyType,
                  )
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                required
                disabled={isPending}
              >
                {(['THB', 'USD', 'EUR'] as CurrencyType[]).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
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
              <span>กำลังบันทึกและออกเอกสาร...</span>
            </div>
          ) : (
            '💾 บันทึกและดาวน์โหลดเอกสารทันที'
          )}
        </button>
      </form>

      {/* Status Alert */}
      <div className={`mt-8 rounded border-l-4 p-4 ${statusStyle}`} role="alert">
        <p className="font-medium">{status.message}</p>
      </div>
    </div>
  );
};
