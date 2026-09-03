/**
 * Published games. Kept deliberately compact: this section shows that I
 * finish and ship things, without competing with the data work for
 * attention.
 *
 * Cover art is the one place on the site where a picture is the point:
 * these are visual products, and the art is the work. Everything is the
 * itch.io cover size, 630×500 or its 315×250 half.
 */
export type Game = {
  title: string;
  genre?: string;
  blurb?: string;
  href: string;
  studio?: string;
  image?: {
    src: string;
    alt: string;
  };
};

export const gamesProfileUrl = "https://ztanq.itch.io/";

export const games: readonly Game[] = [
  {
    title: "Waka Wuk",
    genre: "Rhythm",
    blurb:
      "The multiverse has shattered and you are Plan B. Ten frenetic microgames, playable in the browser.",
    href: "https://ztanq.itch.io/waka-wuk",
    image: {
      src: "/games/waka-wuk.png",
      alt: "A purple cartoon face and a floating eyeball in electric blues and pinks, with the title set in pixel lettering.",
    },
  },
  {
    /**
     * The itch.io page still lists this as a platformer; the CV and this site
     * call it what it plays like. If the two are ever reconciled, itch is the
     * one to change.
     */
    title: "Space Drunks",
    genre: "Beat 'em up",
    href: "https://unlucky-alpaca.itch.io/space-drunks",
    studio: "Camote Studio",
    image: {
      src: "/games/space-drunks.png",
      alt: "A green alien bar with a domed counter, a robot patron on one side and a sharp-dressed alien on the other, under the words Alien Bar.",
    },
  },
  {
    title: "Diosa del Mito",
    genre: "Action",
    href: "https://ztanq.itch.io/diosa-del-mito",
    image: {
      src: "/games/diosa-del-mito.jpg",
      alt: "A towering goddess with skull face paint and red eyes looming over a small gunslinger in a red coat and hat.",
    },
  },
  {
    title: "Mamacha",
    genre: "Adventure",
    href: "https://ztanq.itch.io/mamacha",
    image: {
      src: "/games/mamacha.png",
      alt: "A panda in a chef's hat surrounded by carrots and radishes, with the title in rounded hand lettering.",
    },
  },
  {
    title: "Hacky the Robot",
    genre: "Puzzle",
    href: "https://ztanq.itch.io/hacky",
    image: {
      src: "/games/hacky-the-robot.png",
      alt: "A pixel-art robot with a screen for a face, a red block hovering above it, framed against a dark circuit-board wall.",
    },
  },
  {
    title: "Hampiq Runa",
    genre: "Minigames",
    href: "https://ztanq.itch.io/hampiq-runa",
    image: {
      src: "/games/hampiq-runa.png",
      alt: "The title drawn in blue and green bubble lettering, threaded with a heartbeat line, a leaf and a stethoscope.",
    },
  },
] as const;
