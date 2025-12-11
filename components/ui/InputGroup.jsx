// /components/ui/InputGroup.js

import React from 'react';

/**
 * Component สำหรับการแสดงผล Input Field มาตรฐานพร้อม Label และ Icon
 *
 * @param {object} props
 * @param {string} props.label
 * @param {string} props.name
 * @param {string | number} props.value
 * @param {function(React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void} props.onChange
 * @param {string} props.type
 * @param {React.ElementType} props.icon - Icon Component จาก lucide-react
 * @param {boolean} [props.disabled=false]
 * @param {number} [props.min]
 */
const InputGroup = ({ label, name, value, onChange, type, icon: Icon, disabled = false, min }) => {
  // ✅ FIX LINTER: การใช้ Single Quotes ใน String Literal
  const classNameString = disabled
    ? 'block w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition duration-150 text-base bg-gray-200 cursor-not-allowed'
    : 'block w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition duration-150 text-base bg-white';

  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1 block flex items-center text-sm font-semibold text-gray-700"
      >
        <Icon className="mr-2 h-4 w-4 text-blue-500" />
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        min={min}
        className={classNameString}
        required
      />
    </div>
  );
};

export default InputGroup;
