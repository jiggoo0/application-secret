import { calculateDTI } from '@/lib/dti';
import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { income, debts = [], consentSave = false } = await req.json();

    if (
      typeof income !== 'number' ||
      !Array.isArray(debts) ||
      debts.some((d) => typeof d !== 'number')
    ) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const result = calculateDTI(income, debts);

    if (process.env.DTI_SAVE_RESULTS === 'true' && consentSave) {
      try {
        const dataDir = path.join(process.cwd(), 'data');
        await fs.mkdir(dataDir, { recursive: true });

        const outPath = path.join(dataDir, 'dti-results.jsonl');
        const record = {
          ts: new Date().toISOString(),
          dti: result.dti,
          totalDebt: result.totalDebt,
        };
        await fs.appendFile(outPath, JSON.stringify(record) + '\n', 'utf8');
      } catch (e) {
        console.error('Failed to save DTI result:', e);
      }
    }

    return NextResponse.json({ ok: true, result });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'invalid' }, { status: 400 });
  }
}
