/** @format */

import { CaseShowcase } from "../showcase-types"
import { showcase1 } from "./case-1"
import { showcase2 } from "./case-2"
import { showcase3 } from "./case-3"
import { showcase4 } from "./case-4"
import { showcase5 } from "./case-5"
import { showcase6 } from "./case-6"

export const ALL_CASES: CaseShowcase[] = [
  showcase1,
  showcase2,
  showcase3,
  showcase4,
  showcase5,
  showcase6,
]

export const getCaseBySlug = (slug: string): CaseShowcase | undefined => {
  return ALL_CASES.find((item) => item.slug === slug)
}
