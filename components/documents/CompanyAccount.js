'use client';

import { useEffect, useState } from 'react';

export default function CompanyAccount() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/data/CompanyAccount.json');
        if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูลได้');
        const data = await res.json();
        setDocuments(data);
      } catch (err) {
        console.error('❌ Failed to fetch documents:', err);
        setError(err.message || 'เกิดข้อผิดพลาด');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading documents...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!documents.length) return <p>ไม่พบเอกสาร</p>;

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">📄 รายละเอียดเอกสาร</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-b px-4 py-2">รหัสเอกสาร</th>
              <th className="border-b px-4 py-2">ชื่อเอกสาร</th>
              <th className="border-b px-4 py-2">วันที่อัปโหลด</th>
              <th className="border-b px-4 py-2">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="border-b px-4 py-2 font-medium">{doc.id}</td>
                <td className="border-b px-4 py-2">{doc.name}</td>
                <td className="border-b px-4 py-2">{doc.uploadedAt}</td>
                <td
                  className={`border-b px-4 py-2 font-semibold ${
                    doc.status === 'approved'
                      ? 'text-green-600'
                      : doc.status === 'pending'
                        ? 'text-yellow-600'
                        : 'text-gray-600'
                  }`}
                >
                  {doc.status === 'approved'
                    ? 'ตรวจสอบแล้ว'
                    : doc.status === 'pending'
                      ? 'รอตรวจสอบ'
                      : doc.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
