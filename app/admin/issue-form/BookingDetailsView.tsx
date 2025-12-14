// app/admin/issue-form/BookingDetailsView.tsx
'use client';

import React from 'react';
// 💡 Assumed imports
import type { BookingSchema } from '@/types/booking-types';
import { formatThaiDate } from '@/lib/utils/formatters';

// ----------------------------------------------------
// 1. HELPER COMPONENTS
// ----------------------------------------------------

interface DetailItemProps {
  label: string;
  value: string | number | undefined | null;
  highlight?: boolean;
}

const DetailItem: React.FC<DetailItemProps> = ({ label, value, highlight = false }) => (
  <div
    className={`flex justify-between border-b border-gray-100 py-2 ${highlight ? 'bg-yellow-50 font-bold' : ''}`}
  >
    <span className="text-gray-600">{label}</span>
    <span className="text-right text-gray-900">{value ?? 'N/A'}</span>
  </div>
);

// ----------------------------------------------------
// 2. MAIN COMPONENT
// ----------------------------------------------------

interface BookingDetailsViewProps {
  data: BookingSchema;
}

/**
 * @component BookingDetailsView
 * @description แสดงรายละเอียดข้อมูลการจองที่ดึงมา
 */
export const BookingDetailsView: React.FC<BookingDetailsViewProps> = ({ data }) => {
  const {
    pnr_code,
    project_id,
    booking_status,
    traveller_name,
    traveller_details,
    fare_summary,
    flight_details,
    hotel_details,
  } = data;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-500';
      case 'PENDING':
        return 'bg-yellow-500';
      case 'CANCELLED':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-xl">
      <h2 className="mb-4 text-2xl font-bold text-indigo-700">รายละเอียดการจอง: {pnr_code}</h2>

      {/* General Status */}
      <div className="mb-6 flex items-center justify-between border-b pb-4">
        <p className="text-lg font-semibold text-gray-700">
          ประเภท: <span className="font-bold text-indigo-600">{project_id}</span>
        </p>
        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold text-white ${getStatusColor(booking_status)}`}
        >
          {booking_status}
        </span>
      </div>

      {/* Traveller Summary */}
      <h3 className="mb-3 text-xl font-semibold text-gray-800">ข้อมูลผู้เดินทาง</h3>
      <div className="mb-6 space-y-1">
        <DetailItem label="ชื่อผู้เดินทางหลัก" value={traveller_name} highlight />
        <DetailItem label="อีเมล" value={traveller_details.email} />
        <DetailItem label="เบอร์โทรศัพท์" value={traveller_details.phone} />
        <DetailItem label="สัญชาติ" value={traveller_details.nationality} />
      </div>

      {/* Fare Summary */}
      <h3 className="mb-3 text-xl font-semibold text-gray-800">สรุปค่าใช้จ่าย</h3>
      <div className="mb-6 space-y-1">
        <DetailItem
          label="Base Fare"
          value={`${fare_summary.base_fare.toFixed(2)} ${fare_summary.currency}`}
        />
        <DetailItem
          label="Taxes/Fees"
          value={`${fare_summary.taxes.toFixed(2)} ${fare_summary.currency}`}
        />
        <DetailItem
          label="รวมยอดชำระ"
          value={`${fare_summary.total_paid.toFixed(2)} ${fare_summary.currency}`}
          highlight
        />
      </div>

      {/* Project Specific Details */}
      {project_id === 'FLIGHT' && flight_details && flight_details.length > 0 && (
        <FlightDetails flightDetails={flight_details} />
      )}

      {project_id === 'HOTEL' && hotel_details && <HotelDetailsView hotelDetails={hotel_details} />}

      {/* Note: Tour details logic would be added here if needed */}
    </div>
  );
};

// ----------------------------------------------------
// 3. FLIGHT SEGMENT VIEW
// ----------------------------------------------------

interface FlightDetailsProps {
  flightDetails: BookingSchema['flight_details'];
}

const FlightDetails: React.FC<FlightDetailsProps> = ({ flightDetails }) => (
  <div className="mt-6">
    <h3 className="mb-3 text-xl font-semibold text-gray-800">รายละเอียดเที่ยวบิน</h3>
    {flightDetails?.map((flight, index) => (
      <div key={index} className="mb-4 rounded-lg border bg-gray-50 p-4">
        <h4 className="font-bold text-indigo-500">เที่ยวบินที่ {index + 1}</h4>
        <DetailItem label="สายการบิน" value={flight.airline_name} />
        <DetailItem label="เที่ยวบิน" value={flight.flight_no} />
        <DetailItem label="เส้นทาง" value={flight.route} />
        <DetailItem
          label="วัน/เวลาออกเดินทาง"
          value={formatThaiDate(flight.date + ' ' + flight.depart_time)}
        />
        <DetailItem label="ระยะเวลาบิน" value={flight.duration} />
      </div>
    ))}
  </div>
);

// ----------------------------------------------------
// 4. HOTEL DETAILS VIEW
// ----------------------------------------------------

interface HotelDetailsViewProps {
  hotelDetails: BookingSchema['hotel_details'];
}

const HotelDetailsView: React.FC<HotelDetailsViewProps> = ({ hotelDetails }) => (
  <div className="mt-6">
    <h3 className="mb-3 text-xl font-semibold text-gray-800">รายละเอียดโรงแรม</h3>
    <div className="rounded-lg border bg-gray-50 p-4">
      <DetailItem label="ชื่อโรงแรม" value={hotelDetails?.hotel_name} highlight />
      <DetailItem label="Confirmation No." value={hotelDetails?.confirmation_no} />
      <DetailItem label="เช็คอิน" value={hotelDetails?.check_in_date} />
      <DetailItem label="เช็คเอาท์" value={hotelDetails?.check_out_date} />
      <DetailItem label="ประเภทห้อง" value={hotelDetails?.room_type} />
    </div>
  </div>
);
