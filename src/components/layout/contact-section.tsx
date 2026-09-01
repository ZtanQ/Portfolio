import { site } from "@/data/site";
import { socials } from "@/data/socials";

export function ContactSection() {
  return (
    <section id="contact" className="pb-24 md:pb-32 scroll-mt-8">
      <h2 className="font-display text-section tracking-tight mb-6">Contact</h2>

      <p className="max-w-[var(--measure)] text-ink-muted">
        Email is the fastest way to reach me. I check LinkedIn less often, and
        itch.io has the games.
      </p>

      <dl className="mt-8 border-t border-rule">
        {socials.map((s) => (
          <div
            key={s.label}
            className="grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-x-6 gap-y-1 py-4 border-b border-rule"
          >
            <dt className="font-mono text-meta text-ink-muted sm:pt-[3px]">
              {s.label}
            </dt>
            <dd>
              <a
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  s.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="font-mono text-small text-accent border-b border-accent/40 hover:border-accent transition-colors duration-150"
              >
                {s.handle}
              </a>
            </dd>
          </div>
        ))}
      </dl>

      {site.cvAvailable && (
        <p className="mt-8">
          <a
            href={site.cvPath}
            className="font-mono text-meta text-ink-muted hover:text-ink transition-colors duration-150"
          >
            Download CV (PDF)
          </a>
        </p>
      )}
    </section>
  );
}
