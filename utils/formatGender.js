export function formatGender(gender) {
  const g = gender?.toLowerCase();
  if (g === 'male') return 'ชาย';
  if (g === 'female') return 'หญิง';
  return 'ไม่ระบุ';
}
