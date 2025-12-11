// 🚀 File: components/documents/templates/shared/GarudaEmblem.jsx

import React from 'react';
// 💡 อาจต้องมีการ import รูปครุฑจริง หรือใช้ SVG/Icon แทน

const GarudaEmblem = () => {
  return (
    <div className="mb-6 flex justify-center print:mb-8">
      {/* 💡 แทนที่ด้วย image tag หรือ SVG ของตราครุฑ */}
      <div className="h-16 w-16 text-gray-700">
        <span className="text-5xl" role="img" aria-label="Garuda Emblem">
          🦅
        </span>
      </div>
    </div>
  );
};

export default GarudaEmblem;
