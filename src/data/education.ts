export type Education = {
  institution: string;
  credential: string;
  period: string;
  note?: string;
};

export const education: readonly Education[] = [
  {
    institution: "Universidad Peruana de Ciencias Aplicadas (UPC)",
    credential: "BSc Computer Science",
    period: "Ninth term",
    note: "Lima, Peru.",
  },
  {
    institution: "University of Pittsburgh",
    credential: "Computer Vision & AI program",
    period: "2025",
    note: "Where the FruitGuard classifier was built.",
  },
  {
    institution: "UPC GameLab",
    credential: "Game development workshop",
    period: "2024",
    note: "A term-long workshop where teams form and ship a game. The team behind Camote Studio came out of it.",
  },
  // TODO: replace with the actual course names from the LinkedIn
  // certifications page. An unnamed platform reads as filler; a named
  // course a reviewer recognises does real work.
  {
    institution: "Platzi · Coursera",
    credential: "Online coursework",
    period: "Ongoing",
    note: "Course names pending.",
  },
] as const;
