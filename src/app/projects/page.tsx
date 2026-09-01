import type { Metadata } from "next";
import { Suspense } from "react";
import { projects, getAllTags } from "@/data/projects";
import { ProjectFilter } from "@/components/project/project-filter";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Machine learning, data analysis, and visualization projects, with the methodological decisions and results behind each one.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-[70rem] px-6 md:px-12 py-16 md:py-24">
      <header className="mb-12 md:mb-16 max-w-[var(--measure)]">
        <h1 className="font-display text-[2.125rem] md:text-display tracking-tight">
          Projects
        </h1>
        <p className="mt-6 text-ink-muted">
          Each entry covers the context, the methodological decisions that
          mattered, results with numbers where they exist, and the limitations
          I know about.
        </p>
      </header>

      {/* useSearchParams needs a Suspense boundary during static rendering. */}
      <Suspense fallback={null}>
        <ProjectFilter projects={projects} tags={getAllTags()} />
      </Suspense>
    </div>
  );
}
