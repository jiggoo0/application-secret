'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Eye, CheckCircle } from 'lucide-react';

export default function FileList() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState(null);

  // ดึงข้อมูลไฟล์จาก API
  const fetchFiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/admin/uploads');
      setFiles(res.data || []);
    } catch (err) {
      console.error('❌ Fetch files error:', err);
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.error || `HTTP ${err.response?.status} - Failed to fetch files`,
        );
      } else {
        setError(err.message || 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // อนุมัติไฟล์
  const handleApprove = async (id) => {
    try {
      setApprovingId(id);
      const res = await axios.post('/api/admin/uploads/approve', { id });
      if (res.data?.data) {
        setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, status: 'approved' } : f)));
      }
    } catch (err) {
      console.error('❌ Approve error:', err);
      alert(
        axios.isAxiosError(err)
          ? err.response?.data?.error || `HTTP ${err.response?.status} - Approve failed`
          : err.message,
      );
    } finally {
      setApprovingId(null);
    }
  };

  // Preview ไฟล์
  const handlePreview = async (path) => {
    try {
      const res = await axios.post('/api/admin/uploads/preview', { path });
      if (res.data?.url) {
        setPreviewUrl(res.data.url);
      } else {
        throw new Error('Preview failed: URL not returned');
      }
    } catch (err) {
      console.error('❌ Preview error:', err);
      alert(
        axios.isAxiosError(err)
          ? err.response?.data?.error || `HTTP ${err.response?.status} - Preview failed`
          : err.message,
      );
    }
  };

  if (loading) return <p className="py-6 text-center">กำลังโหลดไฟล์...</p>;
  if (error) return <p className="py-6 text-center text-red-500">{error}</p>;
  if (!files.length) return <p className="py-6 text-center">ไม่มีไฟล์ที่อัปโหลด</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">ชื่อไฟล์</th>
            <th className="border px-4 py-2">ประเภท</th>
            <th className="border px-4 py-2">ผู้ใช้อัปโหลด</th>
            <th className="border px-4 py-2">สถานะ</th>
            <th className="border px-4 py-2">วันที่สร้าง</th>
            <th className="border px-4 py-2">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.id} className="text-center">
              <td className="border px-4 py-2">{file.name}</td>
              <td className="border px-4 py-2">{file.type || '-'}</td>
              <td className="border px-4 py-2">{file.user_email}</td>
              <td className="border px-4 py-2">
                {file.status === 'approved' ? (
                  <span className="font-semibold text-green-600">อนุมัติแล้ว</span>
                ) : (
                  <span className="font-semibold text-yellow-600">{file.status}</span>
                )}
              </td>
              <td className="border px-4 py-2">
                {new Date(file.created_at).toLocaleString('th-TH')}
              </td>
              <td className="flex justify-center gap-2 border px-4 py-2">
                <button
                  onClick={() => handlePreview(file.path)}
                  className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                >
                  <Eye className="h-4 w-4" /> Preview
                </button>

                {file.status !== 'approved' && (
                  <button
                    onClick={() => handleApprove(file.id)}
                    disabled={approvingId === file.id}
                    className="inline-flex items-center gap-1 rounded-md bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700 disabled:opacity-50"
                  >
                    <CheckCircle className="h-4 w-4" />{' '}
                    {approvingId === file.id ? 'กำลังอนุมัติ...' : 'Approve'}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Preview Modal */}
      {previewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-3xl rounded-md bg-white p-4">
            <button
              onClick={() => setPreviewUrl('')}
              className="absolute right-2 top-2 font-bold text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
            <iframe src={previewUrl} className="h-96 w-full" title="File Preview"></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
