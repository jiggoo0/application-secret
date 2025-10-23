'use client';
import { useState, useEffect } from 'react';

export default function NotesAdmin() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(false);

  // โหลดโน้ตทั้งหมด
  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const res = await fetch('/api/notes');
    const data = await res.json();
    setNotes(data || []);
  }

  // เพิ่มโน้ตใหม่
  async function addNote() {
    if (!newNote.title || !newNote.content) return alert('กรอกข้อมูลให้ครบ');

    setLoading(true);
    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newNote.title,
        content: newNote.content,
        user_id: 'admin', // หรือ session.user.id ถ้ามีระบบ login
      }),
    });

    const result = await res.json();
    setLoading(false);

    if (result.error) {
      alert('เกิดข้อผิดพลาด: ' + result.error);
    } else {
      alert('เพิ่มโน้ตสำเร็จ ✅');
      setNewNote({ title: '', content: '' });
      fetchNotes();
    }
  }

  return (
    <div className="mx-auto max-w-xl p-4">
      <h2 className="mb-4 text-xl font-bold">📒 จัดการโน้ต</h2>

      <div className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="หัวข้อโน้ต"
          className="w-full rounded border p-2"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <textarea
          placeholder="เนื้อหาโน้ต"
          className="w-full rounded border p-2"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
        />
        <button
          onClick={addNote}
          disabled={loading}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          {loading ? 'กำลังเพิ่ม...' : 'เพิ่มโน้ต'}
        </button>
      </div>

      <h3 className="mb-2 font-semibold">รายการโน้ตทั้งหมด</h3>
      {notes.length === 0 ? (
        <p className="text-gray-500">ยังไม่มีโน้ตในระบบ</p>
      ) : (
        <ul className="space-y-2">
          {notes.map((note) => (
            <li key={note.id} className="rounded border p-2">
              <strong>{note.title}</strong>
              <p>{note.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
