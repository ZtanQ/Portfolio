import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects, getProject } from "@/data/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const metrics = project.metrics ?? [];
  const links = project.links ?? {};
  const hasLinks = Boolean(links.repo || links.demo || links.report);

  return (
    <article className="mx-auto max-w-[52rem] px-6 md:px-12 py-16 md:py-24">
      <nav aria-label="Breadcrumb" className="font-mono text-meta text-ink-muted mb-5">
        <Link
          href="/projects"
          className="hover:text-ink transition-colors duration-150"
        >
          Projects
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="tabular">{project.year}</span>
      </nav>

      <h1 className="font-display text-[2.125rem] md:text-display tracking-tight">
        {project.title}
      </h1>

      <p className="mt-6 max-w-[var(--measure)] text-ink-muted">
        {project.summary}
      </p>

      {project.image && (
        <div className="mt-10 relative aspect-[4/3] overflow-hidden rounded-md border border-rule bg-rule/20">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(min-width: 768px) 52rem, 100vw"
            className="object-cover"
            priority
          />
        </div>
      )}

      <dl className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-y-5 gap-x-6 border-y border-rule py-6 [&>div]:min-w-0">
        <div>
          <dt className="font-mono text-meta text-ink-muted mb-1">Stack</dt>
          <dd className="font-mono text-small">{project.stack.join(", ")}</dd>
        </div>
        <div>
          <dt className="font-mono text-meta text-ink-muted mb-1">Categories</dt>
          <dd className="font-mono text-small">{project.tags.join(", ")}</dd>
        </div>
        {project.role && (
          <div>
            <dt className="font-mono text-meta text-ink-muted mb-1">Role</dt>
            <dd className="font-mono text-small">{project.role}</dd>
          </div>
        )}
      </dl>

      {metrics.length > 0 && (
        <section className="mt-14">
          <h2 className="font-display text-section tracking-tight mb-6">
            Results at a glance
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-7">
            {metrics.map((m) => (
              <div key={m.label}>
                <dd className="font-mono tabular text-figure text-signal-lg leading-none">
                  {m.value}
                </dd>
                <dt className="mt-2 font-mono text-meta text-ink-muted">
                  {m.label}
                </dt>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section className="mt-14">
        <h2 className="font-display text-section tracking-tight mb-4">
          Context
        </h2>
        <p className="max-w-[var(--measure)]">{project.context}</p>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-section tracking-tight mb-4">
          Methodological decisions
        </h2>
        <ul className="space-y-4 pl-6 list-disc marker:text-ink-muted max-w-[var(--measure)]">
          {project.decisions.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-section tracking-tight mb-4">
          Results
        </h2>
        <ul className="space-y-3 pl-6 list-disc marker:text-ink-muted max-w-[var(--measure)]">
          {project.results.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-section tracking-tight mb-4">
          Limitations
        </h2>
        <ul className="space-y-3 pl-6 list-disc marker:text-ink-muted text-ink-muted max-w-[var(--measure)]">
          {project.limitations.map((l, i) => (
            <li key={i}>{l}</li>
          ))}
        </ul>
      </section>

      {hasLinks && (
        <section className="mt-14 pt-8 border-t border-rule">
          <h2 className="sr-only">Links</h2>
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {links.repo && (
              <li>
                <a
                  href={links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-small text-accent border-b border-accent/40 hover:border-accent transition-colors duration-150"
                >
                  Source on GitHub
                </a>
              </li>
            )}
            {links.demo && (
              <li>
                <a
                  href={links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-small text-accent border-b border-accent/40 hover:border-accent transition-colors duration-150"
                >
                  Live demo
                </a>
              </li>
            )}
            {links.report && (
              <li>
                <a
                  href={links.report}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-small text-accent border-b border-accent/40 hover:border-accent transition-colors duration-150"
                >
                  Technical report
                </a>
              </li>
            )}
          </ul>
        </section>
      )}
    </article>
  );
}
