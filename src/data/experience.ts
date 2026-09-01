export type Experience = {
  organization: string;
  role: string;
  /** Display period, e.g. "2025 · 3 months". Keep it short. */
  period: string;
  location?: string;
  /** Two or three lines maximum. No filler verbs. */
  points: readonly string[];
  stack?: readonly string[];
  href?: string;
};

/**
 * Ordered by relevance to the roles I'm targeting, not strictly by date.
 * Cirion goes first: it's the professional data work.
 */
export const experience: readonly Experience[] = [
  {
    organization: "Cirion Technologies",
    role: "Data Analytics Intern",
    period: "Jan — Mar 2024",
    location: "Lima, Peru",
    points: [
      "Part of Cirion Next Generations, a program that brings early-career people into the technology and telecommunications sector.",
      "Built and maintained recurring reports and dashboards for internal stakeholders.",
      "Cleaned and consolidated data from separate sources into the formats reporting depended on.",
      "Ran ad-hoc analyses on request, translating open-ended questions into answerable ones.",
    ],
    stack: ["Excel", "Power BI", "Tableau"],
  },
  {
    organization: "Camote Studio",
    role: "Founder",
    period: "2025 — present",
    location: "Lima, Peru",
    points: [
      "Co-founded an independent game studio and shipped Space Drunks, a cartoon-styled beat 'em up.",
      "Work across development, production, and team coordination rather than a single fixed role.",
      "Presented the studio's work at local events.",
    ],
    href: "https://www.camotestudio.com/",
  },
] as const;
