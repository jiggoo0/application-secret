'use client';

import { useEffect, useState, useCallback } from 'react';

/**
 * 👥 หน้าจัดการผู้ใช้งานในระบบแอดมิน
 */
export default function Users() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // โหลดข้อมูลผู้ใช้ทั้งหมด
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/users');
      if (!res.ok) throw new Error('โหลดข้อมูลผู้ใช้งานล้มเหลว');
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // ฟังก์ชันค้นหา (debounce 500ms)
  const handleSearch = useCallback(async () => {
    const keyword = query.trim();
    if (keyword.length < 2) {
      fetchUsers();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/users/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: keyword }),
      });
      if (!res.ok) throw new Error('ค้นหาผู้ใช้งานล้มเหลว');
      const { results } = await res.json();
      setUsers(Array.isArray(results) ? results : []);
    } catch (err) {
      setError(err.message || 'เกิดข้อผิดพลาดในการค้นหา');
    } finally {
      setLoading(false);
    }
  }, [query, fetchUsers]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim().length >= 2) handleSearch();
      else if (query.trim().length === 0) fetchUsers();
    }, 500);
    return () => clearTimeout(delay);
  }, [query, handleSearch, fetchUsers]);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-base-content">จัดการผู้ใช้งาน</h1>
        <button onClick={fetchUsers} className="btn-outline btn btn-sm" disabled={loading}>
          🔄 โหลดใหม่
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="🔍 ค้นหาด้วยชื่อ อีเมล หรือ ID"
          className="input-bordered input w-full max-w-sm"
        />
        <button
          onClick={handleSearch}
          className="btn-primary btn"
          disabled={loading || query.trim().length < 2}
        >
          ค้นหา
        </button>
      </div>

      {loading && <p className="text-sm text-gray-500">⏳ กำลังโหลดข้อมูลผู้ใช้งาน...</p>}
      {error && <p className="text-sm text-red-600">เกิดข้อผิดพลาด: {error}</p>}
      {!loading && !error && users.length === 0 && (
        <p className="text-sm text-gray-500">🚫 ไม่พบผู้ใช้งานที่ตรงกับคำค้น</p>
      )}

      {!loading && !error && users.length > 0 && (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user, index) => (
            <li
              key={user.id ?? `${user.email ?? 'unknown'}-${index}`}
              className="rounded-lg border border-base-300 bg-base-100 p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <h2 className="text-lg font-semibold text-base-content">
                {user.name ?? 'ไม่ระบุชื่อ'}
              </h2>
              <p className="text-sm text-gray-600">📧 {user.email ?? 'ไม่ระบุอีเมล'}</p>
              <p className="text-sm text-gray-500">🔑 สิทธิ์: {user.role ?? 'ไม่ระบุสิทธิ์'}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
