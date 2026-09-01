/**
 * Published games. Kept deliberately compact: this section shows that I
 * finish and ship things, without competing with the data work for
 * attention.
 */
export type Game = {
  title: string;
  genre?: string;
  blurb?: string;
  href: string;
  studio?: string;
};

export const gamesProfileUrl = "https://ztanq.itch.io/";

export const games: readonly Game[] = [
  {
    title: "Waka Wuk",
    genre: "Rhythm",
    blurb:
      "The multiverse has shattered and you are Plan B. Ten frenetic microgames, playable in the browser.",
    href: "https://ztanq.itch.io/waka-wuk",
  },
  {
    title: "Space Drunks",
    genre: "Platformer",
    blurb: "Cartoon-styled beat 'em up, released under Camote Studio.",
    href: "https://unlucky-alpaca.itch.io/space-drunks",
    studio: "Camote Studio",
  },
  {
    title: "Diosa del Mito",
    genre: "Action",
    href: "https://ztanq.itch.io/diosa-del-mito",
  },
  {
    title: "Mamacha",
    genre: "Adventure",
    href: "https://ztanq.itch.io/mamacha",
  },
  {
    title: "Hacky the Robot",
    genre: "Puzzle",
    href: "https://ztanq.itch.io/hacky",
  },
  {
    title: "Hampiq Runa",
    href: "https://ztanq.itch.io/hampiq-runa",
  },
] as const;
