// components/documents/forms/MedicalCertificateForm.jsx
export default function MedicalCertificateForm({ data, onChange }) {
  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === 'daysOff') {
      value = parseInt(value) || 0;
    }
    onChange(e.target.name, value);
  };

  return (
    <div className="space-y-4">
      <h3 className="border-b pb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
        ข้อมูลผู้ป่วย
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
          ชื่อ-นามสกุลผู้ป่วย
        </label>
        <input
          type="text"
          name="patientName"
          value={data.patientName || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
          เลขบัตรประชาชน
        </label>
        <input
          type="text"
          name="idNumber"
          value={data.idNumber || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
          วันที่ออกใบรับรอง
        </label>
        <input
          type="date"
          name="issueDate"
          value={data.issueDate || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
        />
      </div>

      <h3 className="border-b pb-2 pt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
        รายละเอียดการรักษา
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
          เหตุผล/อาการป่วย
        </label>
        <textarea
          name="reason"
          value={data.reason || ''}
          onChange={handleChange}
          rows="3"
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
          จำนวนวันหยุดพักฟื้น
        </label>
        <input
          type="number"
          name="daysOff"
          value={data.daysOff || 0}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
          ชื่อแพทย์ผู้ตรวจ
        </label>
        <input
          type="text"
          name="doctorName"
          value={data.doctorName || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
        />
      </div>
    </div>
  );
}
