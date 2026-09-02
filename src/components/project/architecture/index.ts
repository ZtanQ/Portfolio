import type { ComponentType } from "react";
import { AldimiArchitecture } from "./aldimi";
import { VocatioArchitecture } from "./vocatio";

/**
 * Architecture diagrams, by project slug. A project only appears here when
 * its structure was read off the repository and there is more than one piece
 * worth drawing — a diagram of a single notebook is decoration.
 */
export const architectureDiagrams: Record<string, ComponentType> = {
  "aldimi-predict": AldimiArchitecture,
  "career-assessment-platform": VocatioArchitecture,
};
