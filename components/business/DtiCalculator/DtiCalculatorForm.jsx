// components/business/DtiCalculator/DtiCalculatorForm.jsx
'use client';

import { useDtiCalculator } from '@/hooks/useCalculator'; // Absolute Import
import { DollarSign, Zap } from 'lucide-react';
import { useEffect } from 'react';

/**
 * DtiCalculatorForm: Client Component สำหรับป้อนข้อมูลและแสดงผลลัพธ์ DTI
 *
 * @param {object} props
 * @param {(ratio: number, assessment: object) => void} props.onCalculate - Callback function เพื่อส่งผลลัพธ์ DTI Ratio และ Assessment ไปยัง Parent (ต้องถูกห่อด้วย useCallback ใน Parent)
 */
export default function DtiCalculatorForm({ onCalculate }) {
  // ใช้ Hook จัดการ Logic และ State การคำนวณ
  const { income, debt, setIncome, setDebt, dtiRatio, assessment, isReady } = useDtiCalculator(43); // ใช้เกณฑ์ 43%

  // ✅ Side Effect: เมื่อผลลัพธ์ DTI หรือ Assessment เปลี่ยนแปลง ให้เรียก Callback ทันที
  // การทำงานนี้จะไม่วนลูปแล้ว เพราะ onCalculate ถูกห่อด้วย useCallback ใน Parent
  useEffect(() => {
    if (onCalculate) {
      onCalculate(dtiRatio, assessment);
    }
  }, [dtiRatio, assessment, onCalculate]); // Dependencies ถูกต้อง

  // Styling
  const inputClasses =
    'w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors';

  return (
    <div className="space-y-6">
      {/* 1. Input: รายได้ต่อเดือน */}
      <div className="space-y-2">
        <label htmlFor="income" className="flex items-center text-sm font-medium text-gray-700">
          <DollarSign className="mr-1 h-4 w-4 text-green-600" />
          รายได้รวมต่อเดือน (Gross Monthly Income)
        </label>
        <input
          id="income"
          type="number"
          // แสดงค่าเป็นสตริงว่างถ้าเป็น 0 เพื่อให้ User ลบค่าทั้งหมดได้ง่าย
          value={income > 0 ? income : ''}
          onChange={(e) => {
            // ใช้ parseFloat(e.target.value) || 0 เพื่อจัดการกรณีที่ input เป็นค่าว่าง
            setIncome(parseFloat(e.target.value) || 0);
          }}
          placeholder="0.00 บาท"
          min="0"
          className={inputClasses}
          aria-label="รายได้รวมต่อเดือน"
        />
      </div>

      {/* 2. Input: ภาระหนี้ต่อเดือน */}
      <div className="space-y-2">
        <label htmlFor="debt" className="flex items-center text-sm font-medium text-gray-700">
          <DollarSign className="mr-1 h-4 w-4 text-red-600" />
          ภาระหนี้ที่ต้องชำระต่อเดือน (Total Monthly Debt)
        </label>
        <input
          id="debt"
          type="number"
          value={debt > 0 ? debt : ''}
          onChange={(e) => {
            setDebt(parseFloat(e.target.value) || 0);
          }}
          placeholder="0.00 บาท"
          min="0"
          className={inputClasses}
          aria-label="ภาระหนี้ที่ต้องชำระต่อเดือน"
        />
        <p className="text-xs text-gray-500">รวม ผ่อนบ้าน, รถ, บัตรเครดิต, สินเชื่อส่วนบุคคล ฯลฯ</p>
      </div>

      {/* 3. Real-Time Result Summary (แสดงผลลัพธ์ DTI ทันที) */}
      <div
        className={`rounded-lg border p-4 transition-all ${assessment.style}`}
        role="status" // เพื่อช่วยผู้ใช้ Screen Reader
        aria-live="polite"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Zap className="mr-2 h-5 w-5 text-indigo-700" />
            <span className="text-lg font-bold">DTI Ratio:</span>
          </div>
          <span className="text-2xl font-extrabold text-indigo-700">
            {isReady ? `${dtiRatio.toFixed(2)}%` : '--.--%'}
          </span>
        </div>
        <p className="mt-2 text-sm">
          สถานะ: <span className="font-semibold">{assessment.status}</span>
        </p>
        <p className="mt-1 text-xs italic">{assessment.message}</p>
      </div>
    </div>
  );
}
