/**
 * About content.
 *
 * Rewritten from the LinkedIn-style bio into the site's voice: no emoji,
 * no "passionate about", no closing call to action. The substance is
 * unchanged — the dual interest in games and data, the reasoning behind
 * each, and the collaborative work. Only the register moved.
 */

export const about = {
  photo: {
    src: "/img/gabriel-reyna.jpg",
    alt: "Gabriel Reyna standing outdoors in a white shirt and tie",
  },

  paragraphs: [
    "I'm a Computer Science student at UPC, currently in my ninth term. Most of my work sits in two places that look unrelated and aren't: games and data.",
    "Games got my attention first. I think of them as more than entertainment — they're environments where people, especially kids and teenagers, learn and imagine. That reach is the reason I care about the quality of what gets built. I co-founded Camote Studio in 2025 and I've published games on itch.io since before that.",
    "Data came second and took over. The volume of it keeps growing, and the interesting question to me is the one in the middle: how you turn a dataset into an insight, and an insight into a decision someone actually acts on. That's what most of my recent projects are about, and what I did day to day during my internship at Cirion.",
    "I work best on teams with people who aren't like me. The internship at Cirion Next Generations was the clearest case of that — people from different backgrounds and roles solving the same problem from different angles.",
  ],

  /**
   * Areas of work. Broader than the hero stack, which is deliberately
   * restricted to technologies with a linked piece of evidence on the site.
   */
  areas: [
    {
      label: "Data and machine learning",
      detail: "Python, scikit-learn, XGBoost, SHAP, Polars, Pandas",
    },
    {
      label: "Computer vision",
      detail: "OpenCV, object detection, image classification",
    },
    {
      label: "Databases",
      detail: "SQL, MongoDB",
    },
    {
      label: "Game development",
      detail: "Godot, Unity, GameMaker",
    },
    {
      label: "Game art",
      detail: "Pixel art",
    },
  ],

  languages: [
    { name: "Spanish", level: "Native" },
    { name: "English", level: "B2 — Cambridge First, 2025" },
    { name: "French", level: "" },
  ],
} as const;
