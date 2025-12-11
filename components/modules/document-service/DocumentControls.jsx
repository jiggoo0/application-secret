// 🚀 File: app/letter-service/components/DocumentControls.jsx (UI)

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { ChevronRight, Loader2, Download } from 'lucide-react';

/**
 * Component สำหรับกลุ่มปุ่ม Action (Draft, Finalize, Download)
 * @param {boolean} props.isLoading - สถานะกำลังโหลด
 * @param {boolean} props.isFinalized - สถานะเอกสารฉบับสมบูรณ์
 * @param {boolean} props.isDataSynced - สถานะข้อมูลซิงค์กับ Preview ล่าสุด
 * @param {object} props.controlStates - สถานะ derived states เช่น canSubmit, canDownload
 * @param {function} props.onGenerateDraft - Handler สำหรับสร้าง Draft
 * @param {function} props.onDownload - Handler สำหรับดาวน์โหลด
 */
const DocumentControls = ({
  isLoading,
  isFinalized,
  isDataSynced,
  controlStates,
  onGenerateDraft,
  onDownload,
}) => {
  return (
    <div className="flex flex-col space-y-3 pt-4 sm:flex-row sm:justify-between sm:space-x-4 sm:space-y-0">
      {/* 1. Generate/Update Draft Button */}
      <Button
        type="button"
        variant={controlStates.draftButtonVariant}
        onClick={onGenerateDraft}
        disabled={controlStates.isDraftButtonDisabled}
        className="w-full sm:w-auto"
      >
        <Loader2 className={`mr-2 h-4 w-4 ${isLoading && !isFinalized ? 'animate-spin' : ''}`} />
        {isLoading && !isFinalized
          ? 'กำลังสร้างร่าง...'
          : isDataSynced
            ? 'เอกสารร่างพร้อมใช้งาน'
            : 'สร้าง/อัปเดตเอกสารร่าง'}
      </Button>

      <div className="flex space-x-3">
        {/* 2. Download Button */}
        <Button
          type="button"
          variant="outline"
          onClick={onDownload}
          disabled={!controlStates.canDownload}
          className={`group w-full sm:w-auto ${
            !controlStates.canDownload
              ? 'cursor-not-allowed opacity-50'
              : 'hover:border-primary hover:text-primary'
          }`}
        >
          <Download
            className={`mr-2 h-4 w-4 transition-transform duration-300 ${
              controlStates.canDownload ? 'group-hover:translate-y-0.5' : ''
            }`}
          />
          ดาวน์โหลด
        </Button>

        {/* 3. Finalize/Submit Button (Type submit เพื่อทำงานร่วมกับ <form>) */}
        <Button
          type="submit"
          variant="default"
          disabled={!controlStates.canFinalize}
          className="group w-full sm:w-auto"
        >
          {isLoading && isFinalized ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <>
              ยืนยันและรับเอกสาร
              <ChevronRight
                className={`ml-2 h-4 w-4 transition-transform duration-300 ${
                  controlStates.canFinalize ? 'group-hover:translate-x-1' : ''
                }`}
              />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

DocumentControls.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isFinalized: PropTypes.bool.isRequired,
  isDataSynced: PropTypes.bool.isRequired,
  controlStates: PropTypes.shape({
    canFinalize: PropTypes.bool.isRequired,
    canDownload: PropTypes.bool.isRequired,
    isDraftButtonDisabled: PropTypes.bool.isRequired,
    draftButtonVariant: PropTypes.string.isRequired,
  }).isRequired,
  onGenerateDraft: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default DocumentControls;
