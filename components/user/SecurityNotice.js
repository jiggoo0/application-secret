'use client';

import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ShieldAlert } from 'lucide-react';

export default function SecurityNotice() {
  return (
    <Alert variant="destructive" className="text-sm">
      <div className="flex items-start gap-3">
        <ShieldAlert className="mt-1 h-5 w-5 text-red-500 dark:text-red-400" />
        <div className="space-y-1">
          <AlertTitle className="font-semibold text-red-600 dark:text-red-400">
            🚫 ข้อกำหนดด้านความปลอดภัย: ห้ามเปลี่ยนอุปกรณ์
          </AlertTitle>
          <AlertDescription className="space-y-2 text-gray-700 dark:text-gray-300">
            <p>
              ระบบนี้ล็อกการใช้งานกับอุปกรณ์ที่คุณใช้เข้าสู่ระบบครั้งแรกโดยอัตโนมัติ
              การเข้าสู่ระบบจากอุปกรณ์อื่นจะถือเป็นการละเมิดข้อตกลงทันที
            </p>
            <p className="font-medium text-red-500 dark:text-red-400">
              หากตรวจพบการเปลี่ยนอุปกรณ์: การจ้างงานจะถูกยกเลิกทันที ไม่มีการคืนเงิน
              และไม่มีการแจ้งเตือนล่วงหน้า
            </p>
            <p>โปรดใช้งานด้วยความรับผิดชอบ เพื่อความปลอดภัยของทั้งผู้จ้างงานและทีมงาน</p>
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
}
