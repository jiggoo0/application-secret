'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserSessionsTable() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ดึงประวัติ user sessions
  const fetchSessions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/admin/user-sessions'); // API สำหรับ admin
      setSessions(res.data || []);
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

  if (loading) {
    return (
      <p className="py-6 text-center text-gray-500 dark:text-gray-400">กำลังโหลดประวัติผู้ใช้...</p>
    );
  }

  if (error) {
    return <p className="py-6 text-center text-red-500 dark:text-red-400">❌ {error}</p>;
  }

  if (!sessions.length) {
    return (
      <p className="py-6 text-center text-gray-500 dark:text-gray-400">
        ยังไม่มีประวัติการเข้าสู่ระบบของผู้ใช้
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-200 dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr className="text-center text-sm font-medium text-gray-700 dark:text-gray-200">
            <th className="border px-4 py-2">User</th>
            <th className="border px-4 py-2">Action</th>
            <th className="border px-4 py-2">IP</th>
            <th className="border px-4 py-2">User Agent</th>
            <th className="border px-4 py-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((s) => (
            <tr
              key={s.id}
              className="border-b border-gray-200 text-center text-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
            >
              <td className="px-4 py-2 font-medium">{s.user_id}</td>
              <td className="px-4 py-2 capitalize">{s.action}</td>
              <td className="px-4 py-2">{s.ip_address || '-'}</td>
              <td className="max-w-xs break-words px-4 py-2">{s.user_agent || '-'}</td>
              <td className="px-4 py-2">
                {new Date(s.created_at).toLocaleString('th-TH', {
                  dateStyle: 'short',
                  timeStyle: 'short',
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
