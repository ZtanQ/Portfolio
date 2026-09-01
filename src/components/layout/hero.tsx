import Link from "next/link";
import { site } from "@/data/site";
import { stack } from "@/data/stack";

export function Hero() {
  return (
    <section className="pt-16 pb-24 md:pt-24 md:pb-32">
      <p className="font-mono text-meta text-ink-muted">
        {site.location} · Computer Science student
      </p>

      <h1 className="mt-6 font-display text-[2.125rem] md:text-display tracking-tight max-w-[22ch]">
        {site.name} — {site.role}
      </h1>

      <p className="mt-7 max-w-[var(--measure)] text-ink-muted">
        {site.tagline}
      </p>

      {/* Stack. Every item links to the thing that proves it. */}
      <div className="mt-12 border-t border-rule">
        <h2 className="sr-only">Technologies, and where I used them</h2>
        <dl>
          {stack.map((group) => (
            <div
              key={group.label}
              className="grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-x-6 gap-y-2 py-4 border-b border-rule [&>*]:min-w-0"
            >
              <dt className="font-mono text-meta text-ink-muted pt-[3px]">
                {group.label}
              </dt>
              <dd>
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        title={item.evidence}
                        className="font-mono text-small text-ink hover:text-signal border-b border-transparent hover:border-signal pb-[2px] transition-colors duration-150"
                      >
                        {item.name}
                        <span className="sr-only">
                          {" — "}
                          {item.evidence}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-3">
        <Link
          href="/projects"
          className="text-accent border-b border-accent pb-[2px] hover:opacity-75 transition-opacity duration-150"
        >
          View projects
        </Link>
        {site.cvAvailable ? (
          <a
            href={site.cvPath}
            className="font-mono text-meta text-ink-muted hover:text-ink transition-colors duration-150"
          >
            Download CV
          </a>
        ) : (
          <Link
            href="/#contact"
            className="font-mono text-meta text-ink-muted hover:text-ink transition-colors duration-150"
          >
            Get in touch
          </Link>
        )}
      </div>
    </section>
  );
}
