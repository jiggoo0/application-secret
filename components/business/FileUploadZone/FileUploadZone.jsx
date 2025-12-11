// components/business/FileUploadZone/FileUploadZone.jsx
'use client';

import { useFileUpload } from '@/hooks/useFileUpload';
import { UploadCloud, FileText, XCircle, Loader2, Trash2, CheckCircle } from 'lucide-react';
import { useRef, useState, useCallback, useEffect, useMemo } from 'react';

/**
 * FileUploadZone: Client Component สำหรับการเลือกและอัปโหลดไฟล์
 * @param {string} acceptedFileTypes - รายการ MIME types ที่ยอมรับ (คั่นด้วย ,)
 * @param {number} maxFileSizeMB - ขนาดไฟล์สูงสุดที่ยอมรับเป็น MB
 * @param {(file: File | null) => void} onFileStatusChange - Callback function เพื่อส่ง File Object หรือ null ไปยัง Parent
 * @param {string} documentName - ชื่อเอกสารที่กำลังอัปโหลด (สำหรับ UI)
 * @param {boolean} isOptional - ระบุว่าเป็นไฟล์ทางเลือกหรือไม่
 */
export default function FileUploadZone({
  acceptedFileTypes = 'application/pdf,image/jpeg,image/png',
  maxFileSizeMB = 10,
  onFileStatusChange,
  documentName = 'เอกสาร',
  isOptional = false,
}) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Convert string to array for useFileUpload hook
  const acceptedTypesArray = useMemo(
    () => acceptedFileTypes.split(',').map((type) => type.trim()),
    [acceptedFileTypes],
  );

  const {
    file,
    isLoading,
    error,
    handleFileChange,
    uploadFile,
    clearFile,
    isReadyToUpload,
    isUploaded,
  } = useFileUpload({
    acceptedFileTypes: acceptedTypesArray,
    maxFileSizeMB,
  });

  // --- Utility functions for Drag-and-Drop ---
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave' || e.type === 'drop') {
      setIsDragging(false);
    }
  };

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileChange(e.dataTransfer.files[0]);
      }
    },
    [handleFileChange],
  );

  // --- File Input Click Handler ---
  const handleClick = () => {
    // ไม่อนุญาตให้คลิกเพื่อเปลี่ยนไฟล์/เปิด Input หากไฟล์ถูกอัปโหลดแล้ว
    if (!isLoading && !isUploaded) {
      fileInputRef.current.click();
    }
  };

  // ✅ Business Logic: ส่ง File Object หรือ null กลับไปให้ Parent (ถ้ามีการเปลี่ยนแปลง)
  useEffect(() => {
    if (onFileStatusChange) {
      onFileStatusChange(file);
    }
  }, [file, onFileStatusChange]);

  // --- UI Render Helpers ---
  const getFileIcon = () => {
    if (isUploaded) return <CheckCircle className="h-10 w-10 text-green-600" />;
    if (file) {
      if (error) return <XCircle className="h-10 w-10 text-red-500" />;
      if (isLoading) return <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />;
      return <FileText className="h-10 w-10 text-indigo-500" />;
    }
    return <UploadCloud className="h-10 w-10 text-gray-400" />;
  };

  const fileSizeDisplay = file ? `(${(file.size / (1024 * 1024)).toFixed(2)} MB)` : '';

  return (
    <div className="space-y-4">
      {/* Label/Document Name (Improved) */}
      <div className="flex items-center justify-between text-base font-semibold text-gray-700">
        <span>
          {documentName} {!isOptional && <span className="text-red-500">*</span>}
        </span>
        {isOptional && <span className="text-sm italic text-gray-500">(เป็นทางเลือก)</span>}
      </div>

      <div
        className={`flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 p-8 text-center transition-all duration-200 ${
          isDragging
            ? 'border-indigo-500 bg-indigo-50 ring-4 ring-indigo-200'
            : isUploaded
              ? 'border-green-500 bg-green-50'
              : error
                ? 'border-red-500 bg-red-50 hover:border-red-600'
                : file
                  ? 'border-indigo-500 bg-indigo-50 hover:border-indigo-600'
                  : 'border-dashed border-gray-300 bg-white hover:border-indigo-400 hover:bg-gray-50'
        } ${isUploaded ? 'cursor-default' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label={`Upload zone for ${documentName}. Drag and drop file or click to upload.`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFileTypes}
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files[0])}
        />

        {getFileIcon()}

        {file ? (
          <div className="mt-3">
            <p className="break-words font-semibold text-gray-800">
              {file.name} {fileSizeDisplay}
            </p>
            {isUploaded ? (
              <p className="mt-1 text-sm font-medium text-green-600">✅ อัปโหลดสำเร็จแล้ว!</p>
            ) : error ? (
              <p className="mt-1 text-sm text-red-500">{error}</p>
            ) : isLoading ? (
              <p className="mt-1 text-sm text-indigo-500">กำลังตรวจสอบไฟล์...</p>
            ) : (
              // 🔴 FIX: แก้ไข Error react/no-unescaped-entities
              <p className="mt-1 text-sm text-indigo-600">
                ไฟล์ถูกเลือกแล้ว{' '}
                <span className="font-medium">กด &apos;อัปโหลดไฟล์&apos; เพื่อยืนยัน</span>
              </p>
            )}
          </div>
        ) : (
          <div className="mt-3">
            <p className="font-bold text-gray-700">ลากและวางไฟล์ที่นี่</p>
            <p className="mt-1 text-sm text-gray-500">
              หรือ{' '}
              <span className="font-medium text-indigo-600 hover:underline">
                คลิกเพื่อเลือกไฟล์
              </span>
            </p>
            <p className="mt-2 text-xs text-gray-400">
              (สูงสุด {maxFileSizeMB} MB, รองรับ: {acceptedTypesArray.join(', ').toUpperCase()})
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons (Refined) */}
      <div className="flex items-center justify-between">
        <button
          onClick={clearFile}
          disabled={!file || isLoading || isUploaded} // ไม่ต้องล้างไฟล์ที่อัปโหลดสำเร็จแล้ว
          className="flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-red-500 disabled:opacity-50"
          aria-label="Clear selected file"
        >
          <Trash2 className="mr-1 h-4 w-4" />
          {isUploaded ? 'ลบไฟล์ที่อัปโหลด' : 'ยกเลิก/ล้างไฟล์'}
        </button>

        <button
          onClick={uploadFile}
          // Logic: ต้องพร้อมอัปโหลด และยังไม่ได้อัปโหลด และไม่มี Error
          disabled={!isReadyToUpload || isLoading || isUploaded || error}
          className={`flex items-center rounded-lg px-6 py-2 text-sm font-bold shadow-md transition-all duration-200 ${
            isReadyToUpload && !isLoading && !isUploaded && !error
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'cursor-not-allowed bg-gray-200 text-gray-500 shadow-none'
          } `}
          aria-label={isUploaded ? 'File uploaded successfully' : 'Upload file'}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : isUploaded ? (
            <CheckCircle className="mr-2 h-4 w-4" />
          ) : null}
          {isUploaded ? 'อัปโหลดแล้ว' : 'อัปโหลดไฟล์'}
        </button>
      </div>
    </div>
  );
}
