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
 * @property {string | number[] | null} range
 * @property {string} status
 * @property {string} owner
 */

/**
 * @param {{ roadmap: RoadmapItem[] }} props
 */
export default function RoadmapSummary({ roadmap = [] }) {
  if (!Array.isArray(roadmap) || roadmap.length === 0) {
    return (
      <Alert variant="default" className="text-sm text-muted-foreground">
        ไม่พบข้อมูลแผนงาน
      </Alert>
    );
  }

  const formatNumber = (value) =>
    typeof value === 'number'
      ? new Intl.NumberFormat('th-TH', { maximumFractionDigits: 2 }).format(value)
      : '—';

  const getStatusVariant = (status) => {
    const s = status?.toLowerCase();
    if (s?.includes('เสร็จสิ้น')) return 'success';
    if (s?.includes('รอดำเนินการ')) return 'secondary';
    return 'warning';
  };

  const formatStatusLabel = (status) => status || 'เริ่มดำเนินการ';

  const formatRange = (range) => {
    try {
      const parsed = typeof range === 'string' && range.startsWith('[') ? JSON.parse(range) : range;
      return Array.isArray(parsed) ? parsed.map((v) => formatNumber(v)).join(' - ') : '—';
    } catch {
      return '—';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="border border-gray-200 dark:border-gray-700">
        <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h3 className="text-base font-medium text-gray-800 dark:text-white">สรุปแผนงานทั้งหมด</h3>
          <Badge variant="outline">{roadmap.length} รายการ</Badge>
        </CardHeader>
      </Card>

      {/* Desktop Table */}
      <div className="hidden md:block">
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
              {roadmap.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-t border-gray-200 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
                >
                  <td className="break-words px-4 py-2">{item.title || '—'}</td>
                  <td className="px-4 py-2 text-right">{formatNumber(item.target)}</td>
                  <td className="px-4 py-2 text-center">{formatRange(item.range)}</td>
                  <td className="px-4 py-2 text-center">
                    <Badge variant={getStatusVariant(item.status)}>
                      {formatStatusLabel(item.status)}
                    </Badge>
                  </td>
                  <td className="break-words px-4 py-2">{item.owner || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-2 md:hidden">
        {roadmap.map((item, idx) => (
          <div
            key={`mobile-${idx}`}
            className="space-y-1 rounded-lg border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="font-medium text-gray-800 dark:text-white">{item.title || '—'}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              เป้าหมาย: {formatNumber(item.target)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              ช่วง: {formatRange(item.range)}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <span>สถานะ:</span>
              <Badge variant={getStatusVariant(item.status)}>
                {formatStatusLabel(item.status)}
              </Badge>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              ผู้รับผิดชอบ: {item.owner || '—'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
