'use client';
import { useEffect, useState } from 'react';

export default function ZohoRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecords() {
      try {
        const res = await fetch('/api/zoho/records');
        const data = await res.json();

        if (res.ok) {
          setRecords(data.records || []);
        } else {
          setError(data.error || 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ');
          console.error('Zoho API error:', data.error);
        }
      } catch (err) {
        setError(err.message || 'ไม่สามารถเชื่อมต่อ Zoho API');
        console.error('Fetch Zoho API failed:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchRecords();
  }, []);

  if (loading) return <p>Loading Zoho Records...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (records.length === 0) return <p>ไม่มีข้อมูล</p>;

  return (
    <div className="zoho-records-container" style={{ padding: '1rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Zoho Table Records</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {records.map((record) => (
          <li
            key={record.row_id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              marginBottom: '1rem',
              backgroundColor: '#f9f9f9',
            }}
          >
            {Object.entries(record.data).map(([key, value]) => (
              <p key={key} style={{ margin: '0.25rem 0' }}>
                <strong>{key}:</strong> {String(value)}
              </p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
