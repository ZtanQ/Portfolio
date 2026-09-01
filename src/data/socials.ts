export type Social = {
  label: string;
  href: string;
  handle: string;
};

/**
 * Only links that actually resolve belong here. A dead link in the footer
 * costs more than a missing one.
 */
export const socials: readonly Social[] = [
  {
    label: "Email",
    href: "mailto:g.alonsoreyna@gmail.com",
    handle: "g.alonsoreyna@gmail.com",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/gabriel-reyna-alvarado",
    handle: "gabriel-reyna-alvarado",
  },
  {
    label: "GitHub",
    href: "https://github.com/ZtanQ",
    handle: "ZtanQ",
  },
  {
    label: "itch.io",
    href: "https://ztanq.itch.io/",
    handle: "ztanq",
  },
] as const;
