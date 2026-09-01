import type { Metadata } from "next";
import { projects, getAllTags } from "@/data/projects";
import { ProjectFilter } from "@/components/project/project-filter";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Proyectos de machine learning, análisis y visualización de datos, con decisiones metodológicas y resultados.",
};

export default function ProyectosPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <header className="mb-12 md:mb-16 max-w-[var(--measure)]">
        <h1 className="font-display text-4xl md:text-5xl leading-tight tracking-tight">
          Proyectos
        </h1>
        <p className="mt-6 text-ink-muted">
          Cada entrada incluye el contexto, las decisiones metodológicas
          relevantes, los resultados con números cuando existen y las
          limitaciones que sé del proyecto.
        </p>
      </header>

      <ProjectFilter projects={projects} tags={getAllTags()} />
    </div>
  );
}
