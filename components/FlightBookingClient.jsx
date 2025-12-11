// /components/FlightBookingClient.js
'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation'; // ใช้งาน useSearchParams ที่นี่
import { ArrowRight, MessageSquare } from 'lucide-react';
import FlightOrderForm from '@/components/FlightOrderForm';

// Mock Constants
const LINE_OA_LINK = 'https://lin.ee/G8s8rKp';
const SERVICE_BRAND = 'JP-VISOUL-DOCS';

export default function FlightBookingClient() {
  const searchParams = useSearchParams();
  const serviceTitle = searchParams.get('service') || 'ตั๋วเครื่องบิน · ตั๋วโรงแรม';

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <h1 className="mb-4 text-center text-3xl font-bold text-gray-900">
          กรอกข้อมูล: <span className="text-indigo-600">{serviceTitle}</span>
        </h1>

        <div className="mb-6 text-center">
          <p className="text-lg font-extrabold tracking-wide text-teal-600">
            ✅ สามารถจัดทำทุกสายการบิน <span className="mx-2 text-indigo-700">|</span>{' '}
            ทีมงานเจ้าป่าการันตีผลงานคุณภาพ
          </p>
        </div>

        <p className="mb-10 text-center text-gray-600">
          กรุณากรอกข้อมูลในฟอร์มเพื่อสร้างเอกสารตัวอย่างที่มีลายน้ำ ขั้นตอนนี้ไม่มีค่าใช้จ่าย
          <span className="ml-2 inline-flex items-center text-sm font-medium text-indigo-500">
            ดูตัวอย่างก่อนชำระเงิน <ArrowRight className="ml-1 h-4 w-4" />
          </span>
        </p>

        <FlightOrderForm serviceTitle={serviceTitle} />

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-extrabold text-red-600">
            ต้องการออก **เอกสารจริง** สำหรับยื่นวีซ่า?
          </h2>
          <p className="mb-6 mt-2 text-lg text-gray-700">
            เอกสารตัวอย่างข้างต้นมีลายน้ำและไม่สามารถใช้ยื่นจริงได้
            กรุณาติดต่อทีมงานเพื่อชำระเงินและรับเอกสารฉบับสมบูรณ์
          </p>
          <a
            href={LINE_OA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-green-500 px-8 py-3 text-xl font-extrabold text-white shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            <MessageSquare className="mr-3 h-6 w-6" />
            ติดต่อ {SERVICE_BRAND} ทาง LINE เพื่อออกเอกสารจริง!
          </a>
        </div>
      </div>
    </main>
  );
}
