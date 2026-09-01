import { experience } from "@/data/experience";

export function ExperienceSection() {
  return (
    <section id="experience" className="pb-24 md:pb-32 scroll-mt-8">
      <h2 className="font-display text-section tracking-tight mb-6">
        Experience
      </h2>

      <div className="border-t border-rule">
        {experience.map((item) => (
          <article
            key={item.organization}
            className="grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-x-6 gap-y-3 py-7 border-b border-rule [&>*]:min-w-0"
          >
            <div className="font-mono text-meta text-ink-muted sm:pt-[6px]">
              <p className="tabular">{item.period}</p>
              {item.location && <p className="mt-1">{item.location}</p>}
            </div>

            <div>
              <h3 className="font-display text-card leading-tight">
                {item.role}
                <span className="text-ink-muted"> · </span>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent border-b border-accent/40 hover:border-accent transition-colors duration-150"
                  >
                    {item.organization}
                  </a>
                ) : (
                  <span>{item.organization}</span>
                )}
              </h3>

              <ul className="mt-3 space-y-2 text-small text-ink-muted max-w-[var(--measure)]">
                {item.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>

              {item.stack && item.stack.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-meta text-ink-muted">
                  {item.stack.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
