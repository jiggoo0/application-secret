// 🚀 File: components/documents/templates/shared/SignatureBlock.jsx

import React from 'react';
import PropTypes from 'prop-types';

const SignatureBlock = ({ name, position, signatureDate }) => {
  return (
    <div className="mt-12 space-y-2 text-center print:mt-16">
      <div className="mx-auto h-16 w-64 border-b border-dashed border-gray-400 pt-12 text-sm text-gray-500">
        (ลงชื่อ)
      </div>
      <p className="text-base font-semibold">({name})</p>
      <p className="text-sm text-gray-700">{position}</p>
      <p className="pt-2 text-sm text-gray-600">ออกให้ ณ วันที่: {signatureDate}</p>
    </div>
  );
};

SignatureBlock.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  signatureDate: PropTypes.string, // อาจเป็น date string หรือคำนวณจาก data
};

export default SignatureBlock;
