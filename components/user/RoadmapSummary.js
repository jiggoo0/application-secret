'use client';

import React from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert } from '@/components/ui/alert';

/**
 * @typedef {Object} RoadmapItem
 * @property {string} title
 * @property {number} target
 * @property {number[]} range
 * @property {string} status
 * @property {string} owner
 */

/**
 * @param {{ data: RoadmapItem[] }} props
 */
export default function RoadmapSummary({ data = [] }) {
  const formatNumber = (value) =>
    new Intl.NumberFormat('th-TH', { maximumFractionDigits: 2 }).format(value);

  const getStatusVariant = (status) => {
    const s = status?.toLowerCase();
    if (s === 'completed') return 'success';
    if (s === 'inprogress') return 'warning';
    if (s === 'pending') return 'secondary';
    return 'default';
  };

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <Alert variant="default" className="text-sm text-muted-foreground">
        ไม่มีข้อมูล Roadmap
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary Header */}
      <Card className="border border-gray-200 dark:border-gray-700">
        <CardHeader className="flex items-center justify-between">
          <h3 className="text-base font-medium text-gray-800 dark:text-white">
            รายการ Roadmap ทั้งหมด
          </h3>
          <Badge variant="outline">{data.length} รายการ</Badge>
        </CardHeader>
      </Card>

      {/* Table */}
      <ScrollArea className="rounded-lg border border-gray-200 shadow-sm dark:border-gray-700">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-white">
            <tr>
              <th className="px-4 py-2">หัวข้อ</th>
              <th className="px-4 py-2 text-right">เป้าหมาย</th>
              <th className="px-4 py-2 text-center">ช่วง</th>
              <th className="px-4 py-2 text-center">สถานะ</th>
              <th className="px-4 py-2">ผู้รับผิดชอบ</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr
                key={idx}
                className="border-t border-gray-200 transition hover:bg-muted/50 dark:border-gray-700"
              >
                <td className="break-words px-4 py-2">{item.title || '—'}</td>
                <td className="px-4 py-2 text-right">{formatNumber(item.target)}</td>
                <td className="px-4 py-2 text-center">
                  {item.range?.length ? item.range.join(' - ') : '—'}
                </td>
                <td className="px-4 py-2 text-center">
                  <Badge variant={getStatusVariant(item.status)}>{item.status || 'ไม่ระบุ'}</Badge>
                </td>
                <td className="break-words px-4 py-2">{item.owner || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
    </div>
  );
}
