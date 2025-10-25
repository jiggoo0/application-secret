'use client';

import { useEffect, useState } from 'react';

const STATUS_COLORS = {
  ผ่าน: 'text-green-600',
  ไม่ผ่าน: 'text-red-600',
  เอกสารมีปัญหา: 'text-yellow-600',
};

export default function ResultAnnouncement() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch('/data/results.json');
        if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูลได้');
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error('❌ Failed to fetch results:', err);
        setError(err.message || 'เกิดข้อผิดพลาด');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading)
    return (
      <p className="py-6 text-center text-gray-500 dark:text-gray-400">⏳ กำลังโหลดผลประกาศ...</p>
    );

  if (error) return <p className="py-6 text-center text-red-500 dark:text-red-400">❌ {error}</p>;

  if (!results.length)
    return <p className="py-6 text-center text-gray-500 dark:text-gray-400">ไม่พบข้อมูลผลประกาศ</p>;

  const Note = () => (
    <p className="mt-4 px-2 text-xs text-gray-500 dark:text-gray-400 md:px-4">
      หมายเหตุ: รายละเอียดที่แจ้งไปคือรายละเอียดที่ทางสินเชื่อนั้นๆ ตอบกลับทางบริษัทฯ
      เอกสารหรือบัตรสำคัญจะส่งถึงภายใน 3-7 วันทำการหลังบริษัทฯ รับเอกสาร
      กรุณาติดต่อแอดมินหากมีข้อสงสัย
    </p>
  );

  return (
    <div className="space-y-6">
      {/* Desktop Table */}
      <div className="hidden overflow-x-auto rounded-lg border border-gray-200 shadow-md dark:border-gray-700 md:block">
        <table className="min-w-full table-auto border-collapse">
          <caption className="sticky top-0 bg-gray-100 px-4 py-2 text-left font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-200">
            รายละเอียดผลประกาศเอกสาร
          </caption>
          <thead className="sticky top-[2.5rem] z-10 bg-gray-100 dark:bg-gray-800">
            <tr className="text-sm font-medium text-gray-700 dark:text-gray-200">
              <th className="px-4 py-2 text-left">รหัส</th>
              <th className="px-4 py-2 text-left">ชื่อ</th>
              <th className="px-4 py-2 text-left">วันที่</th>
              <th className="px-4 py-2 text-left">สถานะ</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-600 dark:text-gray-300">
            {results.map((r) => (
              <tr
                key={r.id}
                className="border-b border-gray-200 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
              >
                <td className="px-4 py-2 font-medium">{r.id}</td>
                <td className="px-4 py-2">{r.name}</td>
                <td className="px-4 py-2">{r.uploadedAt}</td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    STATUS_COLORS[r.status] || 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {r.status}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-100 font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-200">
            <tr>
              <td colSpan={3} className="px-4 py-2">
                รวมทั้งหมด
              </td>
              <td className="px-4 py-2">{results.length}</td>
            </tr>
          </tfoot>
        </table>
        <Note />
      </div>

      {/* Mobile Card View */}
      <div className="space-y-3 md:hidden">
        {results.map((r) => (
          <div
            key={`mobile-${r.id}`}
            className="rounded-lg border border-gray-200 p-4 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
          >
            <p className="font-medium">รหัส: {r.id}</p>
            <p>ชื่อ: {r.name}</p>
            <p>วันที่: {r.uploadedAt}</p>
            <p
              className={`font-semibold ${
                STATUS_COLORS[r.status] || 'text-gray-600 dark:text-gray-300'
              }`}
            >
              สถานะ: {r.status}
            </p>
          </div>
        ))}
        <Note />
      </div>
    </div>
  );
}
