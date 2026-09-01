/**
 * Single source of truth for site metadata.
 * Change it here, not on each page.
 */
export const site = {
  name: "Gabriel Reyna",
  role: "Data & Machine Learning",
  location: "Lima, Peru",

  // Replace with the real domain once the deploy is set up.
  url: "https://gabrielreyna.dev",

  description:
    "Portfolio of applied machine learning and data analysis projects, focused on methodological decisions, results with numbers, and stated limitations.",

  tagline:
    "Computer Science student working with data. I train models, build dashboards, and document why things work — and why sometimes they don't.",

  /**
   * Flip to true once the PDF is actually in public/cv/. While false, the
   * download links don't render at all — better than a 404 on the main CTA.
   */
  cvAvailable: false,
  cvPath: "/cv/gabriel-reyna-cv.pdf",
} as const;
