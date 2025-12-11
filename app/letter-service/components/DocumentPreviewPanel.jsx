// 🚀 File: app/letter-service/components/DocumentPreviewPanel.jsx (FIXED: Unused Import)

import React, { useState } from 'react'; // 🚨 ลบ useEffect ออกแล้ว
import PropTypes from 'prop-types';
// Path ที่ถูกต้อง
import CoverLetterDocument from '../CoverLetterDocument.jsx';

/**
 * Component สำหรับแสดงผลพรีวิวเอกสาร และควบคุมการซูม/พิมพ์
 * @param {object} props
 */
const DocumentPreviewPanel = ({
  documentData,
  isDraftMode,
  onToggleFormMinimize,
  isFormMinimized,
}) => {
  // 1. State สำหรับการซูม (Scale Factor)
  const [scaleFactor, setScaleFactor] = useState(0.75); // เริ่มต้นที่ 75%

  // 2. ขนาดมาตรฐาน A4 (px at 96 DPI) เพื่อคงอัตราส่วน 1:1.414
  const A4_WIDTH_PX = 794;
  const A4_HEIGHT_PX = 1123;

  const handleZoom = (delta) => {
    setScaleFactor((prevScale) => {
      let newScale = prevScale + delta;
      // จำกัดช่วงการซูม (Min 25%, Max 150%)
      if (newScale < 0.25) return 0.25;
      if (newScale > 1.5) return 1.5;
      return parseFloat(newScale.toFixed(2));
    });
  };

  const currentZoomPercent = Math.round(scaleFactor * 100);

  return (
    <div className="flex h-full flex-col">
      {/* Control Panel: Zoom and Print */}
      <div className="mb-4 flex items-center justify-between rounded-lg bg-white p-3 shadow-md">
        <h3 className="text-lg font-semibold text-gray-800">มุมมองเอกสาร (Document Preview)</h3>

        {/* Zoom Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleZoom(-0.1)}
            className="rounded-md border p-2 text-gray-600 hover:bg-gray-100"
            title="ซูมออก"
          >
            ซูมออก (-)
          </button>
          <span className="min-w-[50px] text-center font-medium text-blue-600">
            {currentZoomPercent}%
          </span>
          <button
            onClick={() => handleZoom(0.1)}
            className="rounded-md border p-2 text-gray-600 hover:bg-gray-100"
            title="ซูมเข้า"
          >
            ซูมเข้า (+)
          </button>
          {/* ปุ่มสั่งพิมพ์ถูกลบออกไปก่อนหน้านี้แล้ว */}
        </div>
      </div>

      {/* Document Area: พื้นที่พรีวิวที่อนุญาตให้เลื่อน scroll */}
      <div
        className="flex flex-grow items-start justify-center overflow-y-auto bg-gray-100 p-4"
        style={{ padding: isFormMinimized ? '0' : '40px' }}
      >
        {/* Document Container: A4 ถูกตรึงอัตราส่วนและซูมตาม scaleFactor */}
        <div
          id="document-print-area"
          className="origin-top transform bg-white shadow-xl transition-transform duration-300"
          style={{
            width: `${A4_WIDTH_PX}px`, // ตรึงความกว้าง A4
            height: `${A4_HEIGHT_PX}px`, // ตรึงความสูง A4
            transform: `scale(${scaleFactor})`, // ใช้ CSS Scale เพื่อซูม
            // เพิ่ม margin ด้านล่างเพื่อให้มี buffer ในการ scroll เมื่อซูมออก
            marginBottom: `${A4_HEIGHT_PX * scaleFactor * 0.5}px`,
          }}
        >
          <CoverLetterDocument documentData={documentData} isDraft={isDraftMode} />
        </div>
      </div>
    </div>
  );
};

DocumentPreviewPanel.propTypes = {
  documentData: PropTypes.object.isRequired,
  isDraftMode: PropTypes.bool.isRequired,
  onToggleFormMinimize: PropTypes.func.isRequired,
  isFormMinimized: PropTypes.bool.isRequired,
};

export default DocumentPreviewPanel;
