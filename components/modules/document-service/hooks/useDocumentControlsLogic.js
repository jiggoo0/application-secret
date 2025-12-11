// 💡 useDocumentControlsLogic.js
// Logic Hook สำหรับคำนวณสถานะของปุ่มควบคุมทั้งหมด

import { useMemo } from 'react';

/**
 * Hook ที่ใช้คำนวณสถานะการใช้งานและรูปแบบของปุ่มควบคุม (Derived States)
 * @param {object} params
 * @param {boolean} params.isLoading - สถานะกำลังโหลด (จาก API Call)
 * @param {boolean} params.isFinalized - สถานะเอกสารฉบับสมบูรณ์ (ผ่านการ Submit แล้ว)
 * @param {boolean} params.isDataSynced - สถานะข้อมูลฟอร์มซิงค์กับ Preview ล่าสุด
 * @param {boolean} params.isFormValid - สถานะฟอร์มทั้งหมดถูกต้องตาม Validation
 * @returns {object} controlStates - Object ที่มีสถานะ Derived States ทั้งหมด
 */
export const useDocumentControlsLogic = ({ isLoading, isFinalized, isDataSynced, isFormValid }) => {
  const controlStates = useMemo(() => {
    // 1. สถานะปุ่ม Draft/Update
    let isDraftButtonDisabled = isLoading || isDataSynced;
    let draftButtonVariant = 'secondary';

    if (isDataSynced) {
      // ข้อมูลซิงค์แล้ว = พร้อมใช้/ไม่ต้องกดซ้ำ
      draftButtonVariant = 'success'; // หรือ 'default' สีเขียว
      isDraftButtonDisabled = true;
    } else if (isLoading && !isFinalized) {
      // กำลังโหลดร่าง
      isDraftButtonDisabled = true;
      draftButtonVariant = 'default';
    } else {
      // ข้อมูลไม่ซิงค์, พร้อมให้อัปเดต
      isDraftButtonDisabled = false;
      draftButtonVariant = 'default';
    }

    // 2. สถานะปุ่ม Finalize/Submit (Type submit ใน Form)
    // เงื่อนไข: ฟอร์มต้องถูกต้อง และยังไม่ได้ Finalize และต้องไม่ได้อยู่ในสถานะกำลังโหลด
    const canFinalize = isFormValid && !isFinalized && !isLoading;

    // 3. สถานะปุ่ม Download
    // เงื่อนไข: สามารถดาวน์โหลดได้เมื่อเอกสารเป็นฉบับสมบูรณ์ *หรือ* เป็นร่างที่ซิงค์แล้ว
    // **Production Note:** ในสถานการณ์จริง อาจจำกัดให้ดาวน์โหลดได้เฉพาะฉบับ Finalized เท่านั้น
    // แต่เพื่อความยืดหยุ่นใน Dev/Testing เราอนุญาตให้ดาวน์โหลดร่างที่ซิงค์แล้วได้ด้วย
    const canDownload = !isLoading && (isFinalized || isDataSynced);

    return {
      canFinalize,
      canDownload,
      isDraftButtonDisabled,
      draftButtonVariant,
    };
  }, [isLoading, isFinalized, isDataSynced, isFormValid]);

  return { controlStates };
};
