'use client';

import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { formatThaiDate } from '@/lib/fakereview/utils';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'; // ✅ ใช้ Table ของ shadcn/ui

/**
 * @typedef {Object} TransactionRow
 * @property {string} customer
 * @property {string} product
 * @property {string} status
 * @property {string} date
 * @property {string} team
 * @property {string} [id]
 */

/**
 * @param {{ refreshInterval?: number }} props
 */
export default function RandomTransactionTable({ refreshInterval = 5000 }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      const res = await fetch('/api/mock-transactions', { cache: 'no-store' });
      if (!res.ok) throw new Error(`Fetch failed with status ${res.status}`);
      const json = await res.json().catch(() => []);
      setData(Array.isArray(json) ? json : []);
    } catch (err) {
      console.error('[RandomTransactionTable] ❌ fetch failed:', err);
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  const getStatusStyle = (status) => {
    const s = status?.toLowerCase() || '';
    const map = {
      เสร็จสิ้น: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      กำลังดำเนินการ: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
      รอดำเนินการ: 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
      ยังไม่เริ่ม: 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
    };
    return (
      Object.entries(map).find(([k]) => s.includes(k))?.[1] ||
      'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
    );
  };

  const headers = ['ชื่อลูกค้า', 'รายการ', 'สถานะ', 'วันที่ดำเนินการ', 'ทีมงาน'];

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm dark:border-gray-700">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((h) => (
                <TableHead key={h} className="font-medium text-gray-700 dark:text-gray-200">
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="animate-pulse">
                  {headers.map((_, j) => (
                    <TableCell key={j}>
                      <div className="h-5 rounded bg-gray-200 dark:bg-gray-700" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={headers.length}
                  className="p-4 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  ไม่มีข้อมูลรายการ
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow
                  key={row.id || uuidv4()}
                  className="transition hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <TableCell>{row.customer || '—'}</TableCell>
                  <TableCell>{row.product || '—'}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-block w-[120px] rounded-full px-2 py-1 text-center text-xs font-medium ${getStatusStyle(row.status)}`}
                    >
                      {row.status || '—'}
                    </span>
                  </TableCell>
                  <TableCell>{row.date ? formatThaiDate(row.date) : '—'}</TableCell>
                  <TableCell>{row.team || '—'}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
