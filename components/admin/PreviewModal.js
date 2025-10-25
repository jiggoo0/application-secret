'use client';

import Image from 'next/image';

export default function PreviewModal({ url, onClose }) {
  if (!url || typeof url !== 'string') return null;

  const ext = url.split('.').pop()?.toLowerCase();
  const isPDF = ext === 'pdf';
  const isImage = ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext);
  const isVideo = ['mp4', 'mov', 'webm'].includes(ext);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-4 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-2xl text-gray-500 hover:text-gray-800 focus:outline-none"
          aria-label="ปิด preview"
        >
          &times;
        </button>

        {/* Title */}
        <header className="mb-4 text-center">
          <h2 className="text-lg font-semibold text-gray-800">Preview ไฟล์</h2>
        </header>

        {/* Content */}
        <main className="flex items-center justify-center">
          {isPDF && (
            <iframe src={url} className="h-[70vh] w-full rounded border" title="PDF Preview" />
          )}

          {isImage && (
            <Image
              src={url}
              alt="Image Preview"
              width={800}
              height={600}
              className="mx-auto h-auto max-h-[70vh] w-full rounded object-contain"
            />
          )}

          {isVideo && <video src={url} controls className="mx-auto max-h-[70vh] w-full rounded" />}

          {!isPDF && !isImage && !isVideo && (
            <div className="text-center text-gray-600">
              <p className="mb-2">ไม่สามารถแสดงตัวอย่างไฟล์นี้ได้</p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-blue-600 underline"
              >
                เปิดไฟล์ในแท็บใหม่
              </a>
            </div>
          )}
        </main>

        {/* Mobile close button */}
        <footer className="mt-6 flex justify-center sm:hidden">
          <button
            onClick={onClose}
            className="rounded bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
          >
            ปิดหน้าต่าง
          </button>
        </footer>
      </div>
    </div>
  );
}
