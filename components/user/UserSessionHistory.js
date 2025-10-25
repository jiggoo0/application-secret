'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

export default function UserSessionHistory() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('/api/user/sessions?limit=5');
      setSessions(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('[UserSessionHistory] fetch error:', err);
      setError('ไม่สามารถโหลดข้อมูลประวัติการเข้าสู่ระบบ');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-2 py-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-full rounded bg-gray-200 dark:bg-gray-700" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="text-sm text-red-500 dark:text-red-400">
        {error}
      </Alert>
    );
  }

  if (!sessions.length) {
    return (
      <p className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        ไม่พบประวัติการเข้าสู่ระบบ
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-200 text-sm dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr className="text-center font-medium text-gray-700 dark:text-white">
            <th className="border px-4 py-2">การกระทำ</th>
            <th className="border px-4 py-2">IP Address</th>
            <th className="border px-4 py-2">อุปกรณ์</th>
            <th className="border px-4 py-2">วันเวลา</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((s) => (
            <tr
              key={s.id}
              className="border-b border-gray-200 text-center transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
            >
              <td className="px-4 py-2 capitalize">{s.action || '-'}</td>
              <td className="px-4 py-2">{s.ip_address || '-'}</td>
              <td className="px-4 py-2">{s.user_agent || '-'}</td>
              <td className="px-4 py-2">
                {s.created_at
                  ? new Date(s.created_at).toLocaleString('th-TH', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })
                  : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
