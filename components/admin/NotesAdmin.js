'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

/**
 * 🗒️ NotesAdmin — ระบบจัดการโน้ต (CRUD)
 * Production-ready: Next.js 15 / Tailwind CSS / React
 */
export default function NotesAdmin() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [actionLoading, setActionLoading] = useState(false); // เพิ่ม loading state สำหรับปุ่ม

  // ✅ โหลดโน้ตทั้งหมด
  const fetchNotes = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      setNotes(data || []);
    } catch (err) {
      console.error('❌ Fetch error:', err);
      setErrorMsg(err?.message || err?.details || JSON.stringify(err) || 'ไม่สามารถโหลดข้อมูลได้');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // ✅ เพิ่มโน้ตใหม่
  const addNote = async () => {
    if (!newTitle.trim()) return;
    setActionLoading(true);
    try {
      const { error } = await supabase.from('notes').insert([{ title: newTitle }]);
      if (error) throw error;

      setNewTitle('');
      await fetchNotes();
    } catch (err) {
      console.error('❌ Insert error:', err);
      setErrorMsg(
        err?.message || err?.details || JSON.stringify(err) || 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ',
      );
    } finally {
      setActionLoading(false);
    }
  };

  // ✅ ลบโน้ต
  const deleteNote = async (id) => {
    if (!confirm('ต้องการลบโน้ตนี้ใช่หรือไม่?')) return;
    setActionLoading(true);
    try {
      const { error } = await supabase.from('notes').delete().eq('id', id);
      if (error) throw error;

      await fetchNotes();
    } catch (err) {
      console.error('❌ Delete error:', err);
      setErrorMsg(
        err?.message || err?.details || JSON.stringify(err) || 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ',
      );
    } finally {
      setActionLoading(false);
    }
  };

  // ✅ บันทึกการแก้ไข
  const saveEdit = async () => {
    if (!editTitle.trim()) return;
    setActionLoading(true);
    try {
      const { error } = await supabase.from('notes').update({ title: editTitle }).eq('id', editId);

      if (error) throw error;

      setEditId(null);
      setEditTitle('');
      await fetchNotes();
    } catch (err) {
      console.error('❌ Update error:', err);
      setErrorMsg(
        err?.message || err?.details || JSON.stringify(err) || 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ',
      );
    } finally {
      setActionLoading(false);
    }
  };

  // ✅ เริ่มแก้ไข
  const startEdit = (note) => {
    setEditId(note.id);
    setEditTitle(note.title);
  };

  // ✅ แสดงสถานะโหลด
  if (loading) {
    return (
      <p className="animate-pulse py-12 text-center text-gray-500 dark:text-gray-400">
        กำลังโหลดข้อมูล...
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-xl space-y-6 rounded-2xl bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-800 dark:text-gray-100">
        🗒️ Notes Admin
      </h2>

      {/* Error message */}
      {errorMsg && (
        <p className="rounded-lg border border-red-300 bg-red-100 p-3 text-sm text-red-600">
          {errorMsg}
        </p>
      )}

      {/* Add New Note */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="เพิ่มโน้ตใหม่..."
          className="flex-1 rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-800 outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        />
        <button
          onClick={addNote}
          disabled={actionLoading}
          className={`rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 ${
            actionLoading ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          {actionLoading ? 'กำลังเพิ่ม...' : 'เพิ่ม'}
        </button>
      </div>

      {/* Notes List */}
      {notes.length === 0 ? (
        <p className="py-6 text-center text-gray-500 dark:text-gray-400">ยังไม่มีโน้ตในระบบ</p>
      ) : (
        <ul className="space-y-2">
          {notes.map((note) => (
            <li
              key={note.id}
              className="flex items-center justify-between rounded-lg border border-gray-300 p-3 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              {editId === note.id ? (
                <div className="flex w-full gap-2">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="flex-1 rounded border border-gray-300 p-1 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                  />
                  <button
                    onClick={saveEdit}
                    disabled={actionLoading}
                    className={`rounded bg-green-600 px-3 py-1 text-white hover:bg-green-700 ${
                      actionLoading ? 'cursor-not-allowed opacity-50' : ''
                    }`}
                  >
                    {actionLoading ? 'บันทึก...' : 'บันทึก'}
                  </button>
                  <button
                    onClick={() => {
                      setEditId(null);
                      setEditTitle('');
                    }}
                    className="rounded bg-gray-500 px-3 py-1 text-white hover:bg-gray-600"
                  >
                    ยกเลิก
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-gray-800 dark:text-gray-100">{note.title}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(note)}
                      className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                    >
                      แก้ไข
                    </button>
                    <button
                      onClick={() => deleteNote(note.id)}
                      disabled={actionLoading}
                      className={`rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700 ${
                        actionLoading ? 'cursor-not-allowed opacity-50' : ''
                      }`}
                    >
                      {actionLoading ? 'กำลังลบ...' : 'ลบ'}
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
