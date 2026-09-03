import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects, getProject } from "@/data/projects";
import { architectureDiagrams } from "@/components/project/architecture";
import { ProjectGallery } from "@/components/project/project-gallery";

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

/**
 * Two columns, like a lab notebook: the account runs down the main column at
 * a fixed measure, and the margin carries what you check while reading —
 * where the code is, what year, what role, which tools.
 *
 * Two things moved into that margin. The meta used to be a horizontal band
 * under the title, which pushed the actual writing down the page. And the
 * links used to close the page, which meant the repository — the single item
 * a technical reader most wants — sat below three screens of prose. Top right
 * is the first place the eye goes after the title.
 *
 * The margin sits after the summary in source order, so the reading order is
 * the same with or without CSS; `lg:order-*` only moves it sideways.
 */
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const metrics = project.metrics ?? [];
  const images = project.images ?? [];
  const links = project.links ?? {};
  const repos = links.repos ?? [];
  const hasLinks = Boolean(repos.length || links.demo || links.report);
  const Architecture = architectureDiagrams[project.slug];

  return (
    <article className="mx-auto max-w-[60rem] px-6 md:px-12 py-16 md:py-24">
      <nav
        aria-label="Breadcrumb"
        className="font-mono text-meta text-ink-muted mb-5"
      >
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

      {images.length > 1 ? (
        <div className="mt-10">
          <ProjectGallery images={images} />
        </div>
      ) : (
        images.length === 1 && (
          <div className="mt-10 relative aspect-[4/3] max-w-[var(--measure)] overflow-hidden rounded-image border border-rule bg-rule/20">
            <Image
              src={images[0].src}
              alt={images[0].alt}
              fill
              sizes="(min-width: 768px) 40rem, 100vw"
              className="object-cover"
              priority
            />
          </div>
        )
      )}

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,var(--measure))_1fr] gap-x-12 gap-y-12 [&>*]:min-w-0">
        {/* The margin. Everything here is checked, not read. */}
        <aside className="lg:order-2 lg:pt-1">
          <h2 className="sr-only">Project details</h2>

          <dl className="border-t border-rule">
            {hasLinks && (
              <div className="py-4 border-b border-rule">
                <dt className="font-mono text-meta text-ink-muted mb-2">
                  Code
                </dt>
                <dd>
                  <ul className="flex flex-col gap-2">
                    {repos.map((repo) => (
                      <li key={repo.url}>
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-small text-accent border-b border-accent/40 hover:border-accent transition-colors duration-150"
                        >
                          {repo.label}
                        </a>
                      </li>
                    ))}
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
                </dd>
              </div>
            )}

            <div className="py-4 border-b border-rule">
              <dt className="font-mono text-meta text-ink-muted mb-1">Year</dt>
              <dd className="font-mono tabular text-small">{project.year}</dd>
            </div>

            {project.role && (
              <div className="py-4 border-b border-rule">
                <dt className="font-mono text-meta text-ink-muted mb-1">
                  Role
                </dt>
                <dd className="text-small text-ink-muted">{project.role}</dd>
              </div>
            )}

            <div className="py-4 border-b border-rule">
              <dt className="font-mono text-meta text-ink-muted mb-2">Stack</dt>
              <dd>
                <ul className="flex flex-wrap lg:flex-col gap-x-4 gap-y-1 font-mono text-small">
                  {project.stack.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </dd>
            </div>

            <div className="py-4 border-b border-rule">
              <dt className="font-mono text-meta text-ink-muted mb-1">
                Categories
              </dt>
              <dd className="font-mono text-small text-ink-muted">
                {project.tags.join(", ")}
              </dd>
            </div>
          </dl>
        </aside>

        <div className="lg:order-1">
          {metrics.length > 0 && (
            <section>
              <h2 className="sr-only">Results at a glance</h2>
              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-7 pb-10 border-b border-rule">
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

          <section className={metrics.length > 0 ? "mt-12" : ""}>
            <h2 className="font-display text-section tracking-tight mb-4">
              Context
            </h2>
            <p>{project.context}</p>
          </section>

          {project.dataOrigin && (
            <section className="mt-12">
              <h2 className="font-display text-section tracking-tight mb-4">
                Where the data comes from
              </h2>
              <p>{project.dataOrigin}</p>
            </section>
          )}

          {Architecture && (
            <section className="mt-12">
              <h2 className="font-display text-section tracking-tight mb-4">
                Architecture
              </h2>
              <p className="mb-6">
                Container-level view, read off the two repositories rather than
                drawn from memory.
              </p>
              <Architecture />
            </section>
          )}

          <section className="mt-12">
            <h2 className="font-display text-section tracking-tight mb-4">
              Methodological decisions
            </h2>
            <ul className="space-y-4 pl-6 list-disc marker:text-ink-muted">
              {project.decisions.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-section tracking-tight mb-4">
              Results
            </h2>
            <ul className="space-y-3 pl-6 list-disc marker:text-ink-muted">
              {project.results.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-section tracking-tight mb-4">
              Limitations
            </h2>
            <ul className="space-y-3 pl-6 list-disc marker:text-ink-muted text-ink-muted">
              {project.limitations.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </article>
  );
}
