'use client';

import React from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert } from '@/components/ui/alert';

/**
 * @typedef {Object} TargetItem
 * @property {string} name
 * @property {number | string} target
 * @property {number} actual
 * @property {string} unit
 */

/**
 * @param {{ targets: TargetItem[] }} props
 */
export default function TargetBreakdown({ targets = [] }) {
  if (!Array.isArray(targets) || targets.length === 0) {
    return (
      <Alert variant="default" className="text-sm text-muted-foreground">
        ไม่พบข้อมูลเป้าหมาย
      </Alert>
    );
  }

  const formatNumber = (value) =>
    typeof value === 'number'
      ? new Intl.NumberFormat('th-TH', { maximumFractionDigits: 2 }).format(value)
      : value;

  const statusLabel = 'กำลังดำเนินการ';
  const statusVariant = 'warning';

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="border border-gray-200 dark:border-gray-700">
        <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h3 className="text-base font-medium text-gray-800 dark:text-white">
            รายการเป้าหมายตามแผนดำเนินการวันที่ 23 ตุลาคม 2568
          </h3>
          <Badge variant="outline">{targets.length} รายการ</Badge>
        </CardHeader>
      </Card>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <ScrollArea className="rounded-lg border border-gray-200 shadow-sm dark:border-gray-700">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-white">
              <tr>
                <th className="px-4 py-2">ลูกค้า</th>
                <th className="px-4 py-2 text-right">ยอดที่วางไว้</th>
                <th className="px-4 py-2 text-right">ยอดที่ได้รับ</th>
                <th className="px-4 py-2 text-center">สถานะ</th>
                <th className="px-4 py-2 text-center">หน่วย</th>
              </tr>
            </thead>
            <tbody>
              {targets.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-t border-gray-200 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
                >
                  <td className="break-words px-4 py-2">{item.name || '—'}</td>
                  <td className="px-4 py-2 text-right">{formatNumber(item.target)}</td>
                  <td className="px-4 py-2 text-right">{formatNumber(item.actual)}</td>
                  <td className="px-4 py-2 text-center">
                    <Badge variant={statusVariant}>{statusLabel}</Badge>
                  </td>
                  <td className="px-4 py-2 text-center">{item.unit || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-2 md:hidden">
        {targets.map((item, idx) => (
          <div
            key={`mobile-${idx}`}
            className="space-y-1 rounded-lg border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="font-medium text-gray-800 dark:text-white">{item.name || '—'}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              ยอดที่วางไว้: {formatNumber(item.target)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              ยอดที่ได้รับ: {formatNumber(item.actual)}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <span>สถานะ:</span>
              <Badge variant={statusVariant}>{statusLabel}</Badge>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              หน่วย: {item.unit || '—'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
