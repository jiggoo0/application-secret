'use client';

import { useState } from 'react';

export default function UserForm({ onSubmit }) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    facebook: '',
    line: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, email, phone } = form;
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      alert('กรุณากรอกข้อมูลที่จำเป็นให้ครบ');
      return;
    }
    onSubmit(form);
  };

  return (
    <div className="flex h-full items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800"
      >
        <input
          type="text"
          name="fullName"
          placeholder="ชื่อ-นามสกุล *"
          value={form.fullName}
          onChange={handleChange}
          required
          className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
        />
        <input
          type="email"
          name="email"
          placeholder="อีเมล *"
          value={form.email}
          onChange={handleChange}
          required
          className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
        />
        <input
          type="tel"
          name="phone"
          placeholder="เบอร์โทรศัพท์ *"
          value={form.phone}
          onChange={handleChange}
          required
          className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          name="facebook"
          placeholder="Facebook (ถ้ามี)"
          value={form.facebook}
          onChange={handleChange}
          className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          name="line"
          placeholder="Line ID (ถ้ามี)"
          value={form.line}
          onChange={handleChange}
          className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white transition-all hover:bg-blue-700"
        >
          เริ่มแชท
        </button>
      </form>
    </div>
  );
}
