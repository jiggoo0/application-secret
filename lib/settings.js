import fs from 'fs/promises';
import path from 'path';

const settingsPath = path.join(process.cwd(), 'data', 'settings.json');

// ✅ โหลดการตั้งค่าระบบ
export async function getSettings() {
  try {
    const raw = await fs.readFile(settingsPath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('⚠️ ไม่พบ settings.json หรืออ่านไม่ได้:', err);
    return { siteName: '', themeColor: '#000000' };
  }
}

// ✅ บันทึกการตั้งค่าใหม่
export async function saveSettings(data) {
  try {
    const json = JSON.stringify(data, null, 2);
    await fs.mkdir(path.dirname(settingsPath), { recursive: true });
    await fs.writeFile(settingsPath, json, 'utf-8');
  } catch (err) {
    console.error('⚠️ บันทึก settings.json ล้มเหลว:', err);
    throw err;
  }
}
