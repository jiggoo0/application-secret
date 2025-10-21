'use client';

import { useEffect, useState } from 'react';

export default function Settings() {
  const [settings, setSettings] = useState({ siteName: '', maintenanceMode: false });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // 🔄 โหลดค่าการตั้งค่าเริ่มต้น
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/admin/settings');
        if (!res.ok) throw new Error('โหลดค่าการตั้งค่าล้มเหลว');
        const data = await res.json();
        setSettings(data);
      } catch (err) {
        setError(err.message || 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // 💾 บันทึกค่าการตั้งค่า
  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);
    setError(null);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error('บันทึกการตั้งค่าล้มเหลว');
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'เกิดข้อผิดพลาดในการบันทึก');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setError(null);
    setSuccess(false);
  };

  if (loading) return <p className="text-sm text-gray-500">กำลังโหลดค่าการตั้งค่า...</p>;

  return (
    <section className="space-y-6">
      <h1 className="text-xl font-bold text-base-content">ตั้งค่าระบบ</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-base-content">ชื่อเว็บไซต์</label>
          <input
            type="text"
            value={settings.siteName}
            onChange={(e) => handleChange('siteName', e.target.value)}
            className="input input-bordered mt-1 block w-full"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.maintenanceMode}
            onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
            className="checkbox"
          />
          <label className="text-sm text-base-content">โหมดปิดปรับปรุง</label>
        </div>

        <button onClick={handleSave} disabled={saving} className="btn btn-primary">
          {saving ? 'กำลังบันทึก...' : 'บันทึกการตั้งค่า'}
        </button>

        {success && <p className="text-sm text-green-600">✅ บันทึกสำเร็จ</p>}
        {error && <p className="text-sm text-red-600">เกิดข้อผิดพลาด: {error}</p>}
      </div>
    </section>
  );
}
