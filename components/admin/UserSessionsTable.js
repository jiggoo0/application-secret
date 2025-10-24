'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserSessionsTable() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch sessions from API
  const fetchSessions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/admin/user-sessions');
      setSessions(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('[UserSessionsTable] ❌', err);
      setError(err.response?.data?.error || err.message || 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  if (loading)
    return (
      <p className="py-6 text-center text-gray-500 dark:text-gray-400">
        ⏳ กำลังโหลดประวัติผู้ใช้...
      </p>
    );

  if (error) return <p className="py-6 text-center text-red-500 dark:text-red-400">❌ {error}</p>;

  if (!sessions.length)
    return (
      <p className="py-6 text-center text-gray-500 dark:text-gray-400">
        ไม่มีประวัติการเข้าสู่ระบบของผู้ใช้
      </p>
    );

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md dark:border-gray-700">
      <table className="min-w-full table-auto border-collapse">
        <caption className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">
          รายละเอียดการเข้าสู่ระบบของผู้ใช้
        </caption>
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr className="text-sm font-medium text-gray-700 dark:text-gray-200">
            <th className="px-4 py-2 text-left">User</th>
            <th className="px-4 py-2 text-left">Action</th>
            <th className="hidden px-4 py-2 text-left sm:table-cell">IP</th>
            <th className="hidden px-4 py-2 text-left md:table-cell">User Agent</th>
            <th className="px-4 py-2 text-left">Timestamp</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-600 dark:text-gray-300">
          {sessions.map((s, idx) => (
            <tr
              key={s.id ?? `${s.user_id}-${s.created_at}-${idx}`}
              className="border-b border-gray-200 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
            >
              <td className="px-4 py-2 font-medium">{s.user_id ?? '-'}</td>
              <td className="px-4 py-2 capitalize">{s.action ?? '-'}</td>
              <td className="hidden px-4 py-2 sm:table-cell">{s.ip_address ?? '-'}</td>
              <td className="hidden max-w-xs break-words px-4 py-2 md:table-cell">
                {s.user_agent ?? '-'}
              </td>
              <td className="px-4 py-2">
                {s.created_at
                  ? new Date(s.created_at).toLocaleString('th-TH', {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })
                  : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Mobile friendly: collapsible cards */}
      <div className="mt-2 block space-y-2 md:hidden">
        {sessions.map((s, idx) => (
          <div
            key={`mobile-${s.id ?? idx}`}
            className="rounded-lg border border-gray-200 p-3 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
          >
            <p className="font-medium">User: {s.user_id ?? '-'}</p>
            <p>Action: {s.action ?? '-'}</p>
            <p>IP: {s.ip_address ?? '-'}</p>
            <p className="break-words">Agent: {s.user_agent ?? '-'}</p>
            <p>
              Timestamp:{' '}
              {s.created_at
                ? new Date(s.created_at).toLocaleString('th-TH', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                  })
                : '-'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
