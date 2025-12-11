// lib/dti.js
// Core DTI calculation utilities for financial assessment tools

import { parseMoney } from './validate';

/**
 * Normalize a money input to a number.
 * Accepts strings with commas, currency symbols, or spaces.
 * Returns 0 for invalid or empty input.
 */
export function normalizeMoney(v = '') {
  if (typeof v === 'number') {
    return v;
  }
  if (!v) {
    return 0;
  }

  // FIX: Escape backslash in regex to prevent JSON Serialization error during build
  const cleaned = String(v).replace(/[^\\d.-]/g, '');
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

/**
 * Basic DTI calculation.
 * Returns { dti, totalDebt, risk }
 */
export function calculateDTI(income, debts = []) {
  const inc = normalizeMoney(income);
  if (!inc || inc <= 0) {
    throw new Error('รายได้ต้องมากกว่า 0');
  }

  const totalDebt = debts.reduce((sum, d) => sum + normalizeMoney(d), 0);
  const dti = Number(((totalDebt / inc) * 100).toFixed(2));

  let risk = 'safe';
  if (dti > 50) {
    risk = 'high';
  } else if (dti > 35) {
    risk = 'caution';
  }

  return { dti, totalDebt, risk };
}

/**
 * Enhanced DTI calculation with thresholds and warnings.
 * Returns detailed result or error object.
 */
export function calculateDTIWithThresholds(income, debts = [], options = {}) {
  const minIncome = options.minIncome ?? 5000;
  const maxDTI = options.maxDTI ?? 50;

  const inc = parseMoney(income);
  if (!inc || inc <= 0) {
    throw new Error('รายได้ต้องมากกว่า 0');
  }

  if (inc < minIncome) {
    return {
      error: 'รายได้ต่ำกว่าขั้นต่ำที่ระบบกำหนด',
      minIncome,
      actualIncome: inc,
    };
  }

  const totalDebt = debts.reduce((sum, d) => sum + parseMoney(d), 0);
  const dti = Number(((totalDebt / inc) * 100).toFixed(2));

  let risk = 'overlimit';
  if (dti <= maxDTI) {
    risk = 'caution';
    if (dti <= 35) {
      risk = 'safe';
    }
  }

  const maxAcceptableDebt = Number(((maxDTI / 100) * inc).toFixed(2));
  const warning =
    risk === 'overlimit'
      ? `DTI เกินเกณฑ์ที่กำหนด (${dti}% > ${maxDTI}%) — ควรลดภาระหนี้หรือเพิ่มรายได้`
      : null;

  return {
    dti,
    totalDebt,
    risk,
    maxAcceptableDebt,
    warning,
    thresholds: { minIncome, maxDTI },
  };
}

/**
 * Suggest income or debt adjustment to meet target DTI.
 * Returns recommended increase in income or reduction in debt.
 */
export function suggestIncomeOrDebtAdjustment(income, debts = [], options = {}) {
  const maxDTI = options.maxDTI ?? 50;

  const inc = parseMoney(income);
  const totalDebt = debts.reduce((sum, d) => sum + parseMoney(d), 0);
  const dti = Number(((totalDebt / inc) * 100).toFixed(2));

  const maxAcceptableDebt = Number(((maxDTI / 100) * inc).toFixed(2));
  const minRequiredIncome = totalDebt > 0 ? Number(((totalDebt / maxDTI) * 100).toFixed(2)) : 0;

  const needMoreIncome = dti > maxDTI ? minRequiredIncome - inc : 0;
  const needLessDebt = dti > maxDTI ? totalDebt - maxAcceptableDebt : 0;

  return {
    dti,
    totalDebt,
    maxAcceptableDebt,
    minRequiredIncome,
    needMoreIncome: needMoreIncome > 0 ? Math.ceil(needMoreIncome) : 0,
    needLessDebt: needLessDebt > 0 ? Math.ceil(needLessDebt) : 0,
  };
}
