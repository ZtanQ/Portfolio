import Link from "next/link";
import { site } from "@/data/site";
import { socials } from "@/data/socials";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-32 border-t border-rule">
      <div className="mx-auto max-w-[70rem] px-6 md:px-12 py-10 flex flex-col md:flex-row md:items-baseline md:justify-between gap-6">
        <p className="font-mono text-meta text-ink-muted">
          <span className="tabular">{year}</span> {site.name}. {site.location}.
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <Link
              href="/#contact"
              className="font-body text-small text-ink-muted hover:text-ink transition-colors duration-150"
            >
              Contact
            </Link>
          </li>
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                className="font-body text-small text-ink-muted hover:text-ink transition-colors duration-150"
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  s.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
