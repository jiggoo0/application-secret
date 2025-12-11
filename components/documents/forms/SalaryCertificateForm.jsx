// components/documents/forms/SalaryCertificateForm.jsx

export default function SalaryCertificateForm({ data, onChange }) {
  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === 'monthlySalary') {
      value = parseFloat(value) || 0;
    }
    onChange(e.target.name, value);
  };

  return (
    <div className="space-y-4">
      <h3 className="border-b pb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
        ข้อมูลพนักงาน
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
          ชื่อ-นามสกุล
        </label>
        <input
          type="text"
          name="employeeName"
          value={data.employeeName || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
          ตำแหน่ง
        </label>
        <input
          type="text"
          name="position"
          value={data.position || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
          วันที่เริ่มงาน
        </label>
        <input
          type="date"
          name="startDate"
          value={data.startDate || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
        />
      </div>

      <h3 className="border-b pb-2 pt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
        ข้อมูลเงินเดือน
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
          เงินเดือน/เดือน (บาท)
        </label>
        <input
          type="number"
          name="monthlySalary"
          value={data.monthlySalary || 0}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
        />
      </div>

      <h3 className="border-b pb-2 pt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
        วัตถุประสงค์
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
          วัตถุประสงค์ในการขอหนังสือรับรอง
        </label>
        <textarea
          name="purpose"
          value={data.purpose || ''}
          onChange={handleChange}
          rows="3"
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
          ชื่อผู้มีอำนาจลงนาม
        </label>
        <input
          type="text"
          name="managerName"
          value={data.managerName || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
        />
      </div>
    </div>
  );
}
