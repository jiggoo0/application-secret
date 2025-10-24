'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import Image from 'next/image';

/**
 * @typedef {Object} UploadResponse
 * @property {string} url
 * @property {string} [error]
 */

/**
 * @param {{ endpoint?: string }} props
 */
export default function FileUploadForm({ endpoint = '/api/uploads' }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [fileType, setFileType] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    setFileUrl(null);
    setError(null);

    if (selected) {
      const ext = selected.name.split('.').pop()?.toLowerCase();
      if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext)) {
        setFileType('image');
      } else if (['mp4', 'webm', 'mov'].includes(ext)) {
        setFileType('video');
      } else {
        setFileType('other');
      }
    } else {
      setFileType(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('กรุณาเลือกไฟล์ก่อนอัปโหลด');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await axios.post(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      /** @type {UploadResponse} */
      const data = res.data;

      if (!data.url) throw new Error(data.error || 'Upload failed');

      setFileUrl(data.url);
    } catch (err) {
      console.error('[FileUploadForm] ❌ Upload failed:', err);
      setError(err.response?.data?.error || err.message || 'เกิดข้อผิดพลาด');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-4 rounded-lg border border-gray-200 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      {/* File Input */}
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
        เลือกไฟล์
      </label>
      <input
        type="file"
        onChange={handleFileChange}
        accept="*/*"
        className="block w-full text-sm text-gray-700 file:mr-4 file:rounded file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-200 dark:text-gray-200 dark:file:bg-gray-800 dark:file:text-gray-100"
      />

      {/* Upload Button */}
      <Button
        type="button"
        onClick={handleUpload}
        isLoading={uploading}
        disabled={uploading}
        className="w-full"
      >
        {uploading ? 'กำลังอัปโหลด...' : 'อัปโหลดไฟล์'}
      </Button>

      {/* Error Message */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Preview / Success Message */}
      {fileUrl && (
        <div className="mt-2 space-y-2">
          <p className="text-sm font-medium text-green-600 dark:text-green-400">
            ✅ อัปโหลดสำเร็จ!
          </p>

          {fileType === 'image' && (
            <div className="relative aspect-video w-full overflow-hidden rounded border border-gray-300 dark:border-gray-600">
              <Image
                src={fileUrl}
                alt={file.name}
                fill
                style={{ objectFit: 'contain' }}
                className="rounded"
                unoptimized
              />
            </div>
          )}

          {fileType === 'video' && (
            <video
              src={fileUrl}
              controls
              className="aspect-video w-full rounded border border-gray-300 dark:border-gray-600"
            />
          )}

          {fileType === 'other' && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm text-blue-500 underline dark:text-blue-400"
            >
              เปิดไฟล์ {file.name}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
