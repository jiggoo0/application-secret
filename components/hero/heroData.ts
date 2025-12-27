/** @format */
import { Globe, Database, ShieldCheck, FileSearch } from "lucide-react"

export const stats = [
  {
    id: "s1",
    label: "TOTAL_CASES",
    value: "2,800",
    unit: "+",
    color: "text-blue-600",
  },
  {
    id: "s2",
    label: "SUCCESS_RATE",
    value: "98.5",
    unit: "%",
    color: "text-slate-900",
  },
  {
    id: "s3",
    label: "OPERATION",
    value: "8",
    unit: "YRS",
    color: "text-blue-600",
  },
]

export const capabilities = [
  { text: "VISA_STRATEGY_PROTOCOL", icon: Globe, delay: 0.1 },
  { text: "DATA_ENCRYPTION_LAYER", icon: Database, delay: 0.2 },
  { text: "LEGAL_DRAFTING_UNIT", icon: ShieldCheck, delay: 0.3 },
  { text: "RISK_GAP_ANALYSIS", icon: FileSearch, delay: 0.4 },
]
