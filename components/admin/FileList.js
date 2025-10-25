'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Eye, CheckCircle } from 'lucide-react';

export default function FileList() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [previewingPath, setPreviewingPath] = useState(null);
  const [error, setError] = useState(null);

  const fetchFiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/admin/uploads');
      if (res.data?.ok && Array.isArray(res.data.uploads)) {
        setFiles(res.data.uploads);
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (err) {
      console.error('❌ Fetch files error:', err);
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.error || `HTTP ${err.response?.status} - Failed to fetch files`
          : err.message || 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

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

  const handlePreview = async (path) => {
    try {
      setPreviewingPath(path);
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
    } finally {
      setPreviewingPath(null);
    }
  };

  if (loading) {
    return (
      <div className="py-6 text-center">
        <div className="mx-auto h-6 w-1/3 animate-pulse rounded bg-gray-300" />
      </div>
    );
  }

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
          {files.map((file, index) => (
            <tr key={file.id ?? index} className="text-center">
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
                {file.created_at ? new Date(file.created_at).toLocaleString('th-TH') : '-'}
              </td>
              <td className="flex justify-center gap-2 border px-4 py-2">
                <button
                  onClick={() => handlePreview(file.path)}
                  disabled={previewingPath === file.path}
                  className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  <Eye className="h-4 w-4" /> Preview
                </button>

                {file.status !== 'approved' && (
                  <button
                    onClick={() => handleApprove(file.id)}
                    disabled={approvingId === file.id}
                    className="inline-flex items-center gap-1 rounded-md bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700 disabled:opacity-50"
                  >
                    <CheckCircle className="h-4 w-4" />
                    {approvingId === file.id ? 'กำลังอนุมัติ...' : 'Approve'}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {previewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-3xl rounded-md bg-white p-4">
            <button
              onClick={() => setPreviewUrl('')}
              className="absolute right-2 top-2 font-bold text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
            {previewUrl.endsWith('.pdf') || previewUrl.startsWith('https://') ? (
              <iframe src={previewUrl} className="h-96 w-full" title="File Preview"></iframe>
            ) : (
              <p className="text-center text-gray-600">ไม่สามารถแสดงตัวอย่างไฟล์นี้ได้</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
