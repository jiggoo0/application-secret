'use client';

import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ShieldAlert } from 'lucide-react';

export default function SecurityNotice() {
  return (
    <Alert
      variant="destructive"
      role="alert"
      aria-live="assertive"
      className="text-sm md:text-base"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-start">
        <ShieldAlert
          className="h-6 w-6 shrink-0 text-red-500 dark:text-red-400"
          aria-hidden="true"
        />
        <div className="space-y-2">
          <AlertTitle className="flex items-center gap-2 font-semibold text-red-600 dark:text-red-400">
            <ShieldAlert className="h-5 w-5" />
            ข้อกำหนดด้านความปลอดภัย: ห้ามเปลี่ยนอุปกรณ์
          </AlertTitle>
          <AlertDescription className="space-y-2 text-gray-700 dark:text-gray-300">
            <p className="leading-relaxed">
              ระบบนี้จะผูกการใช้งานกับอุปกรณ์ที่ใช้เข้าสู่ระบบครั้งแรกโดยอัตโนมัติ
              การเข้าสู่ระบบจากอุปกรณ์อื่นจะถือเป็นการละเมิดข้อตกลงการใช้งาน
            </p>
            <p className="font-medium leading-relaxed text-red-500 dark:text-red-400">
              หากตรวจพบการเปลี่ยนอุปกรณ์: การจ้างงานจะถูกยกเลิกทันทีโดยไม่มีการคืนเงิน
              และไม่มีการแจ้งเตือนล่วงหน้า
            </p>
            <p className="leading-relaxed">
              โปรดใช้งานด้วยความรับผิดชอบ เพื่อความปลอดภัยของทั้งผู้ว่าจ้างและทีมงาน
            </p>
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
}
