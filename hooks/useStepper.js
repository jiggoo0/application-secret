// hooks/useStepper.js

import { useState, useCallback } from 'react';

/**
 * Custom Hook สำหรับจัดการ Logic ของ Multi-Part Form / Stepper
 * @param {number} totalSteps - จำนวนขั้นตอนทั้งหมด
 */
export const useStepper = (totalSteps) => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToStep = useCallback(
    (step) => {
      // ต้องมี Validation บางอย่างก่อน (เช่น ห้ามข้าม Step ที่ยังไม่สำเร็จ)
      // แต่สำหรับ Logic พื้นฐาน เราอนุญาตให้ไปได้หากอยู่ในช่วง 1 ถึง totalSteps
      if (step >= 1 && step <= totalSteps) {
        setCurrentStep(step);
      }
    },
    [totalSteps],
  );

  return {
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    goToStep,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === totalSteps,
  };
};
