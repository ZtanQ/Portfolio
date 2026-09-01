import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

/**
 * Two rendering modes, decided by whether the project has visual evidence:
 *
 *  - Evidence mode: screenshot or generated chart leads the card.
 *  - Typographic mode: the metrics take that space, set large in mono.
 *
 * A project without a screenshot should read as a deliberate choice, not
 * as a card with a hole in it.
 *
 * Accessibility: only the title is a link. The pseudo-element after the
 * anchor covers the card so the whole surface stays clickable, while the
 * link's accessible name is just the project title and body text stays
 * selectable.
 */
export function ProjectCard({ project }: { project: Project }) {
  const hasImage = Boolean(project.image);
  const metrics = project.metrics ?? [];

  return (
    <article className="group relative grid grid-cols-1 md:grid-cols-[16rem_1fr] gap-x-8 gap-y-4 py-8 border-b border-rule first:border-t first:border-rule [&>*]:min-w-0">
      {hasImage ? (
        <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-rule bg-rule/20">
          <Image
            src={project.image!.src}
            alt={project.image!.alt}
            fill
            sizes="(min-width: 768px) 16rem, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        metrics.length > 0 && (
          <dl className="flex md:flex-col gap-x-8 gap-y-4 flex-wrap md:justify-center">
            {metrics.slice(0, 3).map((m) => (
              <div key={m.label}>
                <dd className="font-mono tabular text-figure text-signal-lg leading-none">
                  {m.value}
                </dd>
                <dt className="mt-1 font-mono text-meta text-ink-muted">
                  {m.label}
                </dt>
              </div>
            ))}
          </dl>
        )
      )}

      <div>
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-card leading-tight">
            <Link
              href={`/projects/${project.slug}`}
              className="after:absolute after:inset-0 group-hover:text-accent transition-colors duration-150"
            >
              {project.title}
            </Link>
          </h3>
          <span className="font-mono tabular text-meta text-ink-muted shrink-0">
            {project.year}
          </span>
        </div>

        <p className="mt-3 max-w-[var(--measure)] text-small text-ink-muted">
          {project.summary}
        </p>

        {hasImage && metrics.length > 0 && (
          <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
            {metrics.slice(0, 3).map((m) => (
              <div key={m.label} className="flex items-baseline gap-2">
                <dd className="font-mono tabular text-small text-signal">
                  {m.value}
                </dd>
                <dt className="font-mono text-meta text-ink-muted">
                  {m.label}
                </dt>
              </div>
            ))}
          </dl>
        )}

        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-meta text-ink-muted">
          {project.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
