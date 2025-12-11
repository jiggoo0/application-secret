// hooks/useFileUpload.js

import { useState, useCallback } from 'react';

/**
 * Custom Hook สำหรับจัดการ Logic การ Upload ไฟล์
 * @param {object} options - Configuration options
 * @param {string[]} options.acceptedFileTypes - Array ของ MIME types ที่ยอมรับ (e.g., ['application/pdf', 'image/jpeg'])
 * @param {number} options.maxFileSizeMB - ขนาดไฟล์สูงสุดที่ยอมรับเป็น MB
 */
export const useFileUpload = ({ acceptedFileTypes = [], maxFileSizeMB = 5 }) => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const maxSizeBytes = maxFileSizeMB * 1024 * 1024;

  const handleFileChange = useCallback(
    (selectedFile) => {
      setError(null);
      setFile(null);

      if (!selectedFile) {
        setError('กรุณาเลือกไฟล์');
        return false;
      }

      // Validation 1: File Type
      if (acceptedFileTypes.length > 0 && !acceptedFileTypes.includes(selectedFile.type)) {
        setError(`ประเภทไฟล์ไม่ถูกต้อง. รองรับเฉพาะ: ${acceptedFileTypes.join(', ')}`);
        return false;
      }

      // Validation 2: File Size
      if (selectedFile.size > maxSizeBytes) {
        setError(`ขนาดไฟล์เกิน ${maxFileSizeMB} MB`);
        return false;
      }

      setFile(selectedFile);
      return true;
    },
    [acceptedFileTypes, maxSizeBytes],
  );

  const uploadFile = useCallback(async () => {
    if (!file) {
      setError('ไม่มีไฟล์ให้ Upload');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      // ** Logic การ Upload จริง (จำลอง) **
      await new Promise((resolve) => setTimeout(resolve, 1500)); // จำลองการ Upload 1.5 วินาที

      console.log('File uploaded successfully:', file.name);
      setIsLoading(false);
      return { success: true, fileName: file.name, url: `/documents/${file.name}` };
    } catch (err) {
      console.error('Upload failed:', err);
      setError('การอัปโหลดล้มเหลว. โปรดลองอีกครั้ง');
      setIsLoading(false);
      return null;
    }
  }, [file]);

  const clearFile = useCallback(() => {
    setFile(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    file,
    isLoading,
    error,
    handleFileChange,
    uploadFile,
    clearFile,
    isReadyToUpload: !!file && !error,
  };
};
