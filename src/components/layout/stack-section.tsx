import Link from "next/link";
import { stack } from "@/data/stack";

/**
 * The evidence rule, made visible: every technology here links to the work
 * that proves I used it. A tool with nothing to point at doesn't get listed.
 *
 * This block used to open the page. It reads better here, after the projects
 * and the internship: by now the reader has a claim in front of them and a
 * reason to check it, which is what a list of fourteen links is good for.
 */
export function StackSection() {
  return (
    <section id="stack" className="pb-24 md:pb-32 scroll-mt-8">
      <h2 className="font-display text-section tracking-tight">
        Stack, with evidence
      </h2>

      <p className="mt-4 max-w-[var(--measure)] text-small text-ink-muted">
        Each one links to where I used it — a project page or the work at
        Cirion. Nothing is listed that I can&rsquo;t point at.
      </p>

      <div className="mt-8 border-t border-rule">
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
    </section>
  );
}
