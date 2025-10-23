'use client';

import DtiForm from './DtiForm';

/**
 * DtiClientWrapper
 * - Isolates client-only logic from Server Components
 * - Ensures hydration-safe rendering of interactive DTI form
 */
export default function DtiClientWrapper({ saveEnabled = false }) {
  return <DtiForm saveEnabled={saveEnabled} />;
}
