import Link from "next/link";
import { site } from "@/data/site";
import { coreStack } from "@/data/stack";

/**
 * Everything a reader needs in the first ten seconds, and nothing else:
 * who I am, what I do, four technologies, and the two things they might
 * want to click. It has to fit one screen at 375px.
 *
 * The full stack used to live here — fourteen links between the tagline and
 * the CTAs, which pushed both actions off the screen on a phone. It moved to
 * its own section further down, where it does its real job: verifying a claim
 * the reader has already been given a reason to check. See instrucciones.md §5.
 */
export function Hero() {
  return (
    <section className="pt-16 pb-14 md:pt-24 md:pb-20">
      <p className="font-mono text-meta text-ink-muted">
        Computer Science student in {site.location}
      </p>

      <h1 className="mt-6 font-display text-[2.125rem] md:text-display tracking-tight max-w-[22ch]">
        {site.name} — {site.role}
      </h1>

      <p className="mt-7 max-w-[var(--measure)] text-ink-muted">
        {site.tagline}
      </p>

      <div className="mt-8">
        <h2 className="sr-only">Core technologies</h2>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {coreStack.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                title={item.evidence}
                className="font-mono text-small text-ink hover:text-signal border-b border-rule hover:border-signal pb-[2px] transition-colors duration-150"
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
      </div>

      <div className="mt-9 flex flex-wrap items-baseline gap-x-8 gap-y-3">
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
