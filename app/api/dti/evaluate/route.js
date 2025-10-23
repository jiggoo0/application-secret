// app/api/dti/evaluate/route.js
import { calculateDTI } from '@/lib/dti';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const body = await req.json();
    const { income, debts = [], consentSave = false } = body;
    const result = calculateDTI(income, debts);
    if (process.env.DTI_SAVE_RESULTS === 'true' && consentSave) {
      try {
        const dataDir = path.join(process.cwd(), 'data');
        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir, { recursive: true });
        }
        const outPath = path.join(dataDir, 'dti-results.jsonl');
        const record = {
          ts: new Date().toISOString(),
          dti: result.dti,
          totalDebt: result.totalDebt,
        };
        fs.appendFileSync(outPath, JSON.stringify(record) + '\n', 'utf8');
      } catch (e) {
        // non-fatal: log but don't fail response
      }
    }
    return new Response(JSON.stringify({ ok: true, result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || 'invalid' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
