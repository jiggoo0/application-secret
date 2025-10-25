'use client';

import { useEffect, useState } from 'react';
import { Loader2, Eye, Check, X } from 'lucide-react';

export default function UploadsAdmin() {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [approvingId, setApprovingId] = useState(null);

  // ============================
  // 📦 โหลดข้อมูล Uploads จาก API
  // ============================
  useEffect(() => {
    const fetchUploads = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/admin/uploads');
        if (!res.ok) throw new Error(`โหลดข้อมูลล้มเหลว (${res.status})`);
        const result = await res.json();

        // ปรับรูปแบบข้อมูลให้ตรงกับ API ที่ส่งกลับ
        setUploads(result?.uploads || []);
      } catch (err) {
        console.error('❌ Failed to fetch uploads:', err);
        setError(err.message || 'เกิดข้อผิดพลาดในการโหลดไฟล์');
      } finally {
        setLoading(false);
      }
    };

    fetchUploads();
  }, []);

  // ============================
  // ✅ อนุมัติไฟล์
  // ============================
  const handleApprove = async (id) => {
    setApprovingId(id);
    try {
      const res = await fetch('/api/admin/uploads/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error(`Approve failed (${res.status})`);

      await res.json();
      setUploads((prev) => prev.map((u) => (u.id === id ? { ...u, status: 'approved' } : u)));
    } catch (err) {
      console.error('❌ Approve failed:', err);
      alert(err.message);
    } finally {
      setApprovingId(null);
    }
  };

  // ============================
  // 👁️ ดูตัวอย่างไฟล์ (Preview)
  // ============================
  const handlePreview = async (path) => {
    try {
      const res = await fetch('/api/admin/uploads/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path }),
      });

      if (!res.ok) throw new Error(`Preview failed (${res.status})`);

      const { url } = await res.json();
      if (!url) throw new Error('ไม่พบ URL ของไฟล์พรีวิว');
      setPreviewUrl(url);
    } catch (err) {
      console.error('❌ Preview failed:', err);
      alert(err.message);
    }
  };

  // ============================
  // 🧩 Rendering UI
  // ============================

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-500">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> กำลังโหลดรายการไฟล์...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 text-center text-red-500">
        <p>⚠️ เกิดข้อผิดพลาด:</p>
        <p className="mt-2 text-sm">{error}</p>
      </div>
    );
  }

  if (!uploads.length) {
    return (
      <div className="py-10 text-center text-gray-500">
        <p>ไม่มีไฟล์อัปโหลดในระบบ</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {uploads.map((u) => (
        <div
          key={u.id}
          className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-100">{u.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {u.user_email || 'ไม่ระบุผู้ใช้'}
            </p>
            <p className="text-xs text-gray-400">
              อัปโหลดเมื่อ {new Date(u.created_at).toLocaleString('th-TH')}
            </p>
            <p
              className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs ${
                u.status === 'approved'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              สถานะ: {u.status}
            </p>
          </div>

          <div className="mt-3 flex gap-2 sm:mt-0">
            {u.status !== 'approved' && (
              <button
                onClick={() => handleApprove(u.id)}
                disabled={approvingId === u.id}
                className="inline-flex items-center gap-1 rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-green-700 disabled:opacity-50"
              >
                {approvingId === u.id ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> กำลังอนุมัติ...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" /> อนุมัติ
                  </>
                )}
              </button>
            )}

            <button
              onClick={() => handlePreview(u.path)}
              className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <Eye className="h-4 w-4" /> ดูตัวอย่าง
            </button>
          </div>
        </div>
      ))}

      {/* 🔍 Preview Modal */}
      {previewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="relative w-full max-w-3xl rounded-lg bg-white shadow-xl dark:bg-gray-900">
            <button
              onClick={() => setPreviewUrl(null)}
              className="absolute right-3 top-3 rounded-full bg-gray-200 p-1 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
            <iframe src={previewUrl} title="Preview" className="h-[80vh] w-full rounded-b-lg" />
          </div>
        </div>
      )}
    </div>
  );
}
