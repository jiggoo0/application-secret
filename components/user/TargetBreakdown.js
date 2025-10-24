'use client';

import React from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert } from '@/components/ui/alert';

/**
 * แสดงรายการเป้าหมายที่โหลดจาก service
 * @param {Object} props
 * @param {Array<{ name: string, actual: number, target: number, unit: string }>} props.data
 */
export default function TargetBreakdown({ data = [] }) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <Alert variant="default" className="text-sm text-muted-foreground">
        ไม่มีข้อมูลเป้าหมาย
      </Alert>
    );
  }

  // ✅ บังคับให้ทุก actual เป็น 0 เพื่อให้สถานะเดียวกัน
  const sanitizedData = data.map((item) => ({
    ...item,
    actual: 0,
  }));

  const formatNumber = (value) =>
    new Intl.NumberFormat('th-TH', { maximumFractionDigits: 2 }).format(value);

  return (
    <div className="space-y-4">
      {/* Summary Header */}
      <Card className="border border-gray-200 dark:border-gray-700">
        <CardHeader className="flex items-center justify-between">
          <h3 className="text-base font-medium text-gray-800 dark:text-white">
            รายชื่อลูกค้า ตามแผนดำเนินการวันที่ 23 ตุลาคม 2568
          </h3>
          <Badge variant="outline">{sanitizedData.length} รายการ</Badge>
        </CardHeader>
      </Card>

      {/* Table */}
      <ScrollArea className="rounded-lg border border-gray-200 shadow-sm dark:border-gray-700">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-white">
            <tr>
              <th className="px-4 py-2">ลูกค้า</th>
              <th className="px-4 py-2 text-right">ยอดที่วางไว้</th>
              <th className="px-4 py-2 text-right">ยอดที่ได้รับ</th>
              <th className="px-4 py-2 text-center">สถานะ</th>
              <th className="px-4 py-2 text-center">ค่าดำเนินงาน</th>
            </tr>
          </thead>
          <tbody>
            {sanitizedData.map((item, idx) => (
              <tr
                key={idx}
                className="hover:bg-muted/50 border-t border-gray-200 transition dark:border-gray-700"
              >
                <td className="break-words px-4 py-2">{item.name || '—'}</td>
                <td className="px-4 py-2 text-right">{formatNumber(item.target)}</td>
                <td className="px-4 py-2 text-right">{formatNumber(item.actual)}</td>
                <td className="px-4 py-2 text-center">
                  <Badge variant="secondary">ยังไม่ดำเนินการ</Badge>
                </td>
                <td className="px-4 py-2 text-center">{item.unit || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
    </div>
  );
}
