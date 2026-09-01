import type { Metadata } from "next";
import { notFound } from "next/navigation";
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

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <p className="font-mono text-xs text-ink-muted mb-4">
        <Link href="/proyectos" className="hover:text-ink">
          Proyectos
        </Link>
        {"  /  "}
        <span className="tabular">{project.year}</span>
      </p>

      <h1 className="font-display text-4xl md:text-5xl leading-tight tracking-tight">
        {project.title}
      </h1>

      <p className="mt-6 text-lg text-ink-muted max-w-[var(--measure)]">
        {project.summary}
      </p>

      {/* Metadata compacta: stack, rol, tags */}
      <dl className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6 border-y border-rule py-6 font-mono text-sm">
        <div>
          <dt className="text-xs text-ink-muted mb-1">
            Stack
          </dt>
          <dd className="text-ink">
            {project.stack.join(", ")}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-ink-muted mb-1">
            Categorías
          </dt>
          <dd className="text-ink">
            {project.tags.join(", ")}
          </dd>
        </div>
        {project.role && (
          <div>
            <dt className="text-xs text-ink-muted mb-1">
              Rol
            </dt>
            <dd className="text-ink">{project.role}</dd>
          </div>
        )}
      </dl>

      {/* Métricas destacadas */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-2xl mb-4">Números</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <dt className="font-mono text-xs text-ink-muted mb-1">
                  {m.label}
                </dt>
                <dd className="font-display tabular text-3xl text-ink">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section className="mt-12">
        <h2 className="font-display text-2xl mb-4">Contexto</h2>
        <p className="text-ink leading-relaxed">
          {project.context}
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl mb-4">Decisiones metodológicas</h2>
        <ul className="space-y-4 text-ink leading-relaxed pl-6 list-disc marker:text-ink-muted">
          {project.decisions.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl mb-4">Resultados</h2>
        <ul className="space-y-3 text-ink leading-relaxed">
          {project.results.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12 mb-4">
        <h2 className="font-display text-2xl mb-4">Limitaciones</h2>
        <ul className="space-y-3 text-ink-muted italic leading-relaxed">
          {project.limitations.map((l, i) => (
            <li key={i}>{l}</li>
          ))}
        </ul>
      </section>

      {(project.links?.repo || project.links?.demo || project.links?.report) && (
        <section className="mt-12 pt-8 border-t border-rule">
          <ul className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-sm">
            {project.links.repo && (
              <li>
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:opacity-80"
                >
                  Código en GitHub
                </a>
              </li>
            )}
            {project.links.demo && (
              <li>
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:opacity-80"
                >
                  Demo
                </a>
              </li>
            )}
            {project.links.report && (
              <li>
                <a
                  href={project.links.report}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:opacity-80"
                >
                  Reporte técnico
                </a>
              </li>
            )}
          </ul>
        </section>
      )}
    </article>
  );
}
