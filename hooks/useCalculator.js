// hooks/useCalculator.js

import { useState, useCallback, useMemo } from 'react';

/**
 * Custom Hook สำหรับ Logic การคำนวณ DTI (Debt-to-Income Ratio)
 * DTI Ratio = (Total Monthly Debt Payments / Gross Monthly Income) * 100
 * @param {number} riskThreshold - เกณฑ์ความเสี่ยง DTI (โดยทั่วไปใช้ 43)
 */
export const useDtiCalculator = (riskThreshold = 43) => {
  const [income, setIncome] = useState(0); // รายได้รวมต่อเดือน (Gross Monthly Income)
  const [debt, setDebt] = useState(0); // หนี้ที่ต้องชำระต่อเดือน (Total Monthly Debt Payments)

  const calculateDTI = useCallback((monthlyDebt, monthlyIncome) => {
    // Basic Validation
    if (monthlyIncome <= 0 || monthlyDebt < 0) {
      return 0;
    }
    // DTI calculation: (Debt / Income) * 100
    const dti = (monthlyDebt / monthlyIncome) * 100;
    return parseFloat(dti.toFixed(2));
  }, []);

  const dtiRatio = useMemo(() => {
    return calculateDTI(debt, income);
  }, [debt, income, calculateDTI]);

  const assessment = useMemo(() => {
    if (income <= 0) return 'ป้อนรายได้เพื่อเริ่มต้น';
    if (dtiRatio === 0 && debt === 0) return 'ปลอดภาระหนี้';
    if (dtiRatio > riskThreshold) {
      return {
        status: 'ความเสี่ยงสูง',
        message: 'อัตราส่วน DTI สูงกว่าเกณฑ์ที่แนะนำ (43%) อาจส่งผลต่อการอนุมัติสินเชื่อ',
        style: 'text-red-600 bg-red-100',
      };
    }
    if (dtiRatio > 36) {
      return {
        status: 'ความเสี่ยงปานกลาง',
        message: 'อัตราส่วน DTI ยังอยู่ในเกณฑ์ที่ยอมรับได้ แต่ควรลดภาระหนี้',
        style: 'text-yellow-600 bg-yellow-100',
      };
    }
    return {
      status: 'ความเสี่ยงต่ำ',
      message: 'อัตราส่วน DTI อยู่ในระดับที่ดีเยี่ยม',
      style: 'text-green-600 bg-green-100',
    };
  }, [dtiRatio, income, debt, riskThreshold]);

  return {
    income,
    debt,
    setIncome,
    setDebt,
    dtiRatio,
    assessment,
    isReady: income > 0 && debt >= 0,
  };
};
