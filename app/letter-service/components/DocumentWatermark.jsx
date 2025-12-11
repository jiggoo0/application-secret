// 🚀 File: app/letter-service/components/DocumentWatermark.jsx (Ultra High Density)
import React from 'react';
import PropTypes from 'prop-types';

const DocumentWatermark = ({ text }) => {
  // สร้าง Array สำหรับการทำซ้ำลายน้ำ (150 ชิ้น) เพื่อความถี่สูงสุด
  const watermarkGrid = Array(150).fill(text);

  const tileStyle = {
    opacity: 0.5,
    fontSize: '32pt', // ลดขนาด Font เพื่อเพิ่มความถี่แนวตั้ง
    fontWeight: 900,
    letterSpacing: '3px', // ลดระยะห่างตัวอักษร
    textAlign: 'center',
    padding: '5px 3px', // ลด Padding ให้ชิดกัน
    userSelect: 'none', // ป้องกันการเลือกข้อความลายน้ำ
    WebkitPrintColorAdjust: 'exact', // บังคับให้พิมพ์สีจริง
    printColorAdjust: 'exact',
  };

  return (
    // คอนเทนเนอร์หลัก: จัดกึ่งกลาง Grid ที่ถูกขยายและหมุน
    <div
      // ลบ print:hidden ออก เพื่อให้ลายน้ำถูกพิมพ์ติดไปกับเอกสาร
      className="pointer-events-none absolute inset-0 z-50 select-none"
      style={{
        display: 'flex',
        justifyContent: 'center', // จัดกึ่งกลางแนวนอน
        alignItems: 'center', // จัดกึ่งกลางแนวตั้ง
        overflow: 'hidden',
      }}
    >
      {/* คอนเทนเนอร์ Grid ที่ขยายและหมุน */}
      <div
        style={{
          // ขยายขนาด Grid ให้ใหญ่กว่า A4 (180%) เพื่อคลุมมุมที่เกิดจากการหมุน
          width: '180%',
          height: '180%',
          transform: 'rotate(-45deg)', // หมุน Grid ทั้งก้อน

          // 💡 Layout Grid ภายใน: Ultra High Density
          display: 'grid',
          gridTemplateColumns: 'repeat(9, 1fr)', // 9 คอลัมน์ เพื่อความถี่แนวนอน
          gridTemplateRows: 'repeat(auto-fit, minmax(60px, 1fr))',
          overflow: 'hidden',
        }}
      >
        {watermarkGrid.map((wmText, index) => (
          <div
            key={index}
            style={{
              ...tileStyle,
              // สลับสีแดง-ดำเพื่อรบกวนการอ่าน
              color: index % 2 === 0 ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.4)',
              lineHeight: 1.1,
              whiteSpace: 'nowrap',
            }}
          >
            {wmText}
          </div>
        ))}
      </div>
    </div>
  );
};

DocumentWatermark.propTypes = {
  text: PropTypes.string.isRequired,
};

export default DocumentWatermark;
