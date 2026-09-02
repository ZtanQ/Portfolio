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
  /**
   * This was a five-day Winter School course run by UPC's software and
   * computing school, taught by a University of Pittsburgh professor — not a
   * multi-year programme at Pittsburgh. The certificate names the course, the
   * instructor and the exact dates, so the entry says what actually happened.
   */
  {
    institution: "UPC Winter School, with the University of Pittsburgh",
    credential: "Computer Vision — Artificial Intelligence",
    period: "July 2025",
    note: "Five-day intensive taught by Nils Murrugarra-Llerena, of Pittsburgh's School of Computing and Information. Where the FruitGuard classifier was built.",
  },
  {
    institution: "UPC GameLab",
    credential: "Game development workshop",
    period: "2024",
    note: "A term-long workshop where teams form and ship a game. The team behind Camote Studio came out of it.",
  },
  /**
   * Named certificates only. Three that a reviewer recognises do more than a
   * list of ten, and every one here has a certificate on file. The MongoDB
   * path also issued a certificate per module; naming the twelve of them would
   * pad the list without adding evidence.
   */
  {
    institution: "SCRUMstudy",
    credential: "Scrum Fundamentals Certified (SFC)",
    period: "2023",
  },
  {
    institution: "MongoDB",
    credential: "Introduction to MongoDB",
    period: "2023",
  },
  {
    institution: "Michigan State University, via Coursera",
    credential: "Pixel Art for Video Games",
    period: "2024",
  },
] as const;
