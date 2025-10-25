'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserSessionHistory() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/user/sessions?limit=5'); // ดึง 5 รายการล่าสุด
      setSessions(res.data || []);
    } catch (err) {
      console.error('[UserSessionHistory] ❌', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="py-6 text-center text-gray-500">กำลังโหลดประวัติ...</p>;

  if (!sessions.length)
    return <p className="py-6 text-center text-gray-500">ไม่มีประวัติการเข้าสู่ระบบ</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-200 dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr className="text-center">
            <th className="border px-4 py-2">Action</th>
            <th className="border px-4 py-2">IP Address</th>
            <th className="border px-4 py-2">User Agent</th>
            <th className="border px-4 py-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((s) => (
            <tr key={s.id} className="border-b border-gray-200 text-center dark:border-gray-700">
              <td className="px-4 py-2 capitalize">{s.action}</td>
              <td className="px-4 py-2">{s.ip_address || '-'}</td>
              <td className="px-4 py-2">{s.user_agent || '-'}</td>
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
