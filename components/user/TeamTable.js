'use client';

import React from 'react';

/**
 * แสดงตารางทีมผู้ดูแลระบบ
 * @param {Object} props
 * @param {Array<{ id: number|null, status: string, owner: string }>} props.data
 */
export default function TeamTable({ data = [] }) {
  if (!data.length) {
    return <p className="text-sm text-gray-500">ไม่มีข้อมูลทีมผู้ดูแลระบบ</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium text-gray-800">
        รายชื่อทีมผู้ดูแลระบบ <span className="text-sm text-gray-500">({data.length} คน)</span>
      </h3>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="table w-full text-sm">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">สถานะ</th>
              <th className="px-4 py-2 text-left">ผู้รับผิดชอบ</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-2">{item.id ?? '—'}</td>
                <td className="px-4 py-2">
                  <span
                    className={`badge ${
                      item.status === 'active'
                        ? 'badge-success'
                        : item.status === 'inactive'
                          ? 'badge-outline'
                          : 'badge-warning'
                    }`}
                  >
                    {item.status || 'unknown'}
                  </span>
                </td>
                <td className="break-words px-4 py-2">{item.owner || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
