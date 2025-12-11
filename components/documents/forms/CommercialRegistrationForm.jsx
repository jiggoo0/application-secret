// components/documents/forms/CommercialRegistrationForm.jsx

export default function CommercialRegistrationForm({ data, onChange }) {
  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === 'capital') {
      value = parseFloat(value) || 0;
    }
    onChange(e.target.name, value);
  };

  return (
    <div className="space-y-4">
      <h3 className="border-b pb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
        ข้อมูลการจดทะเบียน
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
          ชื่อสถานประกอบการ
        </label>
        <input
          type="text"
          name="companyName"
          value={data.companyName || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
          เลขทะเบียนพาณิชย์
        </label>
        <input
          type="text"
          name="registrationNumber"
          value={data.registrationNumber || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
          วันที่จดทะเบียน
        </label>
        <input
          type="date"
          name="registeredDate"
          value={data.registeredDate || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
        />
      </div>

      <h3 className="border-b pb-2 pt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
        รายละเอียดธุรกิจ
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
          ทุนจดทะเบียน (บาท)
        </label>
        <input
          type="number"
          name="capital"
          value={data.capital || 0}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
          ประเภทธุรกิจหลัก
        </label>
        <input
          type="text"
          name="businessType"
          value={data.businessType || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
          ที่ตั้งสำนักงานใหญ่
        </label>
        <textarea
          name="address"
          value={data.address || ''}
          onChange={handleChange}
          rows="3"
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
        />
      </div>
    </div>
  );
}
