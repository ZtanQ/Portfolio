"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { ThemeToggle } from "./theme-toggle";

const nav = [
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-rule">
      <div className="mx-auto max-w-[70rem] px-6 md:px-12 py-5 flex items-baseline justify-between gap-4">
        <Link
          href="/"
          className="font-display text-body sm:text-card tracking-tight hover:text-accent transition-colors duration-150 shrink-0"
        >
          {site.name}
        </Link>

        <nav aria-label="Main">
          <ul className="flex items-baseline gap-4 sm:gap-7">
            {nav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={
                      active
                        ? "font-body text-small text-ink border-b border-accent pb-[3px]"
                        : "font-body text-small text-ink-muted hover:text-ink border-b border-transparent pb-[3px] transition-colors duration-150"
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="flex items-baseline">
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
