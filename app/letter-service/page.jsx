'use client';

import React, { useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// --- Business Logic Schemas (Zod) ---
// Schema: กำหนดให้ recipientEmail สามารถเป็น optional string หรือ empty string ได้
const LetterSchema = z.object({
  recipientName: z.string().min(1, 'กรุณาระบุชื่อผู้รับ'),
  // แก้ไข: .optional() อนุญาตให้เป็น undefined, .or(z.literal('')) อนุญาตให้เป็น empty string (ฟอร์มส่วนใหญ่มักส่งค่าเป็น '')
  recipientEmail: z.string().email('รูปแบบอีเมลไม่ถูกต้อง').optional().or(z.literal('')),
  subject: z.string().min(5, 'หัวข้อต้องมีความยาวอย่างน้อย 5 ตัวอักษร'),
  content: z.string().min(20, 'เนื้อหาต้องมีความยาวอย่างน้อย 20 ตัวอักษร'),
  serviceType: z.enum(['standard', 'express'], {
    errorMap: () => ({ message: 'กรุณาเลือกประเภทบริการที่ถูกต้อง' }),
  }),
});

// --- Component หลัก ---
/**
 * @fileoverview Page Component สำหรับหน้าบริการจดหมาย (Letter Service)
 * ปรับปรุง: แก้ไข Unused Import, ปรับ Zod Schema, Optimize UI/UX ด้วย Tailwind
 */
export default function LetterServicePage() {
  const router = useRouter();

  // 1. Setup Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    resolver: zodResolver(LetterSchema),
    defaultValues: {
      recipientName: '',
      recipientEmail: '',
      subject: '',
      content: '',
      serviceType: 'standard',
    },
  });

  const serviceType = watch('serviceType');

  // 2. Business Logic: Handle Form Submission (Server Action / API Call)
  const onSubmit = useCallback(
    async (data) => {
      // Clean data: แปลง empty string ที่อาจมาจาก optional fields ให้เป็น undefined ก่อนส่ง API หาก Server Action/API รับเฉพาะ String หรือ Undefined
      const submitData = {
        ...data,
        recipientEmail: data.recipientEmail || undefined, // Business Pattern: Cleanse Data
      };

      console.log('Form Data:', submitData);

      // **จำลองการส่งข้อมูลไปยัง Server Action หรือ API**
      try {
        // ตัวอย่าง: การเรียก Server Action (ต้องสร้างใน /app/actions/letterActions.js)
        // const response = await sendLetterAction(submitData);

        // การจำลองการหน่วงเวลาเพื่อแสดงสถานะ Loading (isSubmitting)
        await new Promise((resolve) => setTimeout(resolve, 2000));

        alert('จดหมายถูกส่งสำเร็จ! (จำลอง)');
        router.push('/dashboard');
      } catch (error) {
        console.error('Error sending letter:', error);
        // Error Pattern: แสดงผลที่ผู้ใช้เข้าใจง่าย
        alert('เกิดข้อผิดพลาดในการส่งจดหมาย: กรุณาลองใหม่อีกครั้ง');
      }
    },
    [router],
  );

  // 3. UI/UX: Service Cost Calculation
  const serviceCost = useMemo(() => {
    // Pattern: ธุรกิจกำหนดราคาสูงสุดและต่ำสุดชัดเจน
    return serviceType === 'express' ? 150 : 50;
  }, [serviceType]);

  return (
    <div className="container mx-auto max-w-3xl p-4 md:p-8">
      <h1 className="mb-8 text-3xl font-extrabold text-gray-900">📝 บริการส่งจดหมาย</h1>
      <div className="rounded-xl bg-white p-6 shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Input: ชื่อผู้รับ */}
          <div>
            <label htmlFor="recipientName" className="mb-1 block text-sm font-medium text-gray-700">
              ชื่อผู้รับ *
            </label>
            <input
              id="recipientName"
              type="text"
              {...register('recipientName')}
              className="block w-full rounded-lg border border-gray-300 p-3 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="ชื่อ-นามสกุล ผู้รับ"
            />
            {errors.recipientName && (
              <p className="mt-2 text-sm text-red-600">{errors.recipientName.message}</p>
            )}
          </div>

          {/* Input: อีเมลผู้รับ (Optional) */}
          <div>
            <label
              htmlFor="recipientEmail"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              อีเมลผู้รับ (ตัวเลือกเสริม)
            </label>
            <input
              id="recipientEmail"
              type="email"
              {...register('recipientEmail')}
              className="block w-full rounded-lg border border-gray-300 p-3 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="example@mail.com"
            />
            {errors.recipientEmail && (
              <p className="mt-2 text-sm text-red-600">{errors.recipientEmail.message}</p>
            )}
          </div>

          {/* Input: หัวข้อ */}
          <div>
            <label htmlFor="subject" className="mb-1 block text-sm font-medium text-gray-700">
              หัวข้อจดหมาย *
            </label>
            <input
              id="subject"
              type="text"
              {...register('subject')}
              className="block w-full rounded-lg border border-gray-300 p-3 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="ระบุหัวข้อที่กระชับ"
            />
            {errors.subject && (
              <p className="mt-2 text-sm text-red-600">{errors.subject.message}</p>
            )}
          </div>

          {/* Textarea: เนื้อหา */}
          <div>
            <label htmlFor="content" className="mb-1 block text-sm font-medium text-gray-700">
              เนื้อหาจดหมาย *
            </label>
            <textarea
              id="content"
              rows={6}
              {...register('content')}
              className="block w-full rounded-lg border border-gray-300 p-3 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="พิมพ์เนื้อหาจดหมายที่นี่..."
            />
            {errors.content && (
              <p className="mt-2 text-sm text-red-600">{errors.content.message}</p>
            )}
          </div>

          {/* Radio Group: ประเภทบริการ (Pattern: เพิ่ม Conversion/ลดขั้นตอน) */}
          <fieldset className="border-t pt-6">
            <legend className="text-base font-semibold text-gray-900">ประเภทบริการ *</legend>
            <div className="mt-4 space-y-3">
              <div
                className={`flex items-center rounded-lg border p-3 transition-colors duration-200 ${
                  serviceType === 'standard'
                    ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  id="standard"
                  type="radio"
                  value="standard"
                  {...register('serviceType')}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="standard" className="ml-3 flex cursor-pointer flex-col">
                  <span className="text-sm font-medium text-gray-900">Standard (50 บาท)</span>
                  <span className="text-xs text-gray-500">จัดส่งภายใน 3-5 วันทำการ</span>
                </label>
              </div>
              <div
                className={`flex items-center rounded-lg border p-3 transition-colors duration-200 ${
                  serviceType === 'express'
                    ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  id="express"
                  type="radio"
                  value="express"
                  {...register('serviceType')}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="express" className="ml-3 flex cursor-pointer flex-col">
                  <span className="text-sm font-medium text-gray-900">Express (150 บาท)</span>
                  <span className="text-xs text-gray-500">จัดส่งภายใน 1-2 วันทำการ</span>
                </label>
              </div>
            </div>
            {errors.serviceType && (
              <p className="mt-2 text-sm text-red-600">{errors.serviceType.message}</p>
            )}
          </fieldset>

          {/* สรุปราคาและปุ่มส่ง */}
          <div className="flex items-center justify-between border-t pt-6">
            <p className="text-xl font-bold text-gray-900">
              ค่าบริการรวม: <span className="text-indigo-600">{serviceCost.toLocaleString()}</span>{' '}
              บาท
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center justify-center rounded-lg border border-transparent px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-200 ${
                isSubmitting
                  ? 'cursor-not-allowed bg-indigo-400 opacity-70'
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50'
              }`}
            >
              {isSubmitting ? (
                <>
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
                  กำลังดำเนินการ...
                </>
              ) : (
                'ยืนยันและส่งจดหมาย'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
