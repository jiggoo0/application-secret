'use client';

import Image from 'next/image';
import { FaFileAlt } from 'react-icons/fa';

export default function FilePreview({ url, type }) {
  if (!url || !type) return null;

  const isImage = type.startsWith('image/');
  const isPDF = type === 'application/pdf';

  return (
    <div className="rounded border bg-gray-50 p-3 dark:bg-gray-800">
      {isImage ? (
        <Image
          src={url}
          alt="Preview"
          width={320}
          height={200}
          className="rounded object-contain"
        />
      ) : isPDF ? (
        <iframe src={url} title="PDF Preview" className="h-64 w-full rounded border" />
      ) : (
        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
          <FaFileAlt className="text-xl text-gray-500 dark:text-gray-400" />
          <div>
            <p>ไม่สามารถแสดง preview ได้</p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              ดาวน์โหลดไฟล์
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
