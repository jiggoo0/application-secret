'use client';

import { useEffect, useState } from 'react';

export default function Uploads() {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [approvingId, setApprovingId] = useState(null);

  useEffect(() => {
    async function fetchUploads() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch('/api/admin/uploads');
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${text}`);
        }
        const data = await res.json();
        setUploads(data || []);
      } catch (err) {
        console.error('❌ Failed to fetch uploads:', err);
        setError(err.message || 'เกิดข้อผิดพลาดในการโหลดไฟล์');
      } finally {
        setLoading(false);
      }
    }

    fetchUploads();
  }, []);

  async function handleApprove(id) {
    setApprovingId(id);
    try {
      const res = await fetch('/api/admin/uploads/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
      }

      // ไม่ต้องเก็บ result ถ้าไม่ได้ใช้
      await res.json();

      setUploads((prev) => prev.map((u) => (u.id === id ? { ...u, status: 'approved' } : u)));
    } catch (err) {
      console.error('❌ Approve failed:', err);
      alert(err.message);
    } finally {
      setApprovingId(null);
    }
  }

  async function handlePreview(path) {
    try {
      const res = await fetch('/api/admin/uploads/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
      }

      const { url } = await res.json(); // destructure url เลย
      if (!url) throw new Error('Preview failed: no URL returned');
      setPreviewUrl(url);
    } catch (err) {
      console.error('❌ Preview failed:', err);
      alert(err.message);
    }
  }

  if (loading) return <p>Loading uploads...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!uploads.length) return <p>No uploads found.</p>;

  return (
    <div>
      <ul className="space-y-2">
        {uploads.map((u) => (
          <li
            key={u.id}
            className="flex flex-col rounded border p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium">{u.name}</p>
              <p className="text-sm text-gray-500">
                Uploaded at: {new Date(u.created_at).toLocaleString()}
              </p>
              <p className="text-sm text-gray-700">Status: {u.status}</p>
            </div>
            <div className="mt-2 flex gap-2 sm:mt-0">
              {u.status !== 'approved' && (
                <button
                  onClick={() => handleApprove(u.id)}
                  disabled={approvingId === u.id}
                  className="rounded bg-green-600 px-3 py-1 text-white hover:bg-green-700 disabled:opacity-50"
                >
                  {approvingId === u.id ? 'Approving...' : 'Approve'}
                </button>
              )}
              <button
                onClick={() => handlePreview(u.path)}
                className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
              >
                Preview
              </button>
            </div>
          </li>
        ))}
      </ul>

      {previewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-xl rounded bg-white p-4 shadow-lg">
            <button
              onClick={() => setPreviewUrl(null)}
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>
            <iframe src={previewUrl} className="h-96 w-full" title="Preview" />
          </div>
        </div>
      )}
    </div>
  );
}
