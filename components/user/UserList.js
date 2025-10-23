'use client';

import React from 'react';

/**
 * แสดงรายชื่อผู้ใช้จาก UsersStatus.csv
 * @param {Object} props
 * @param {Array<{ first_name: string, last_name: string, gender: string }>} props.data
 */
export default function UserList({ data = [] }) {
  if (!data.length) {
    return <p className="text-sm text-gray-500">ไม่มีข้อมูลผู้ใช้</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium text-gray-800">
        รายชื่อผู้ใช้ทั้งหมด <span className="text-sm text-gray-500">({data.length} คน)</span>
      </h3>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="table w-full text-sm">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">ชื่อ</th>
              <th className="px-4 py-2 text-left">นามสกุล</th>
              <th className="px-4 py-2 text-center">เพศ</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="break-words px-4 py-2">{user.first_name?.trim() || '—'}</td>
                <td className="break-words px-4 py-2">{user.last_name?.trim() || '—'}</td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`badge ${
                      user.gender === 'male'
                        ? 'badge-info'
                        : user.gender === 'female'
                          ? 'badge-pink'
                          : 'badge-outline'
                    }`}
                  >
                    {user.gender || 'unknown'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
