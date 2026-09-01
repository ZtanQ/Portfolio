"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { Project, ProjectTag } from "@/data/projects";
import { ProjectCard } from "./project-card";

type Props = {
  projects: readonly Project[];
  tags: readonly ProjectTag[];
};

const ALL = "All";

/**
 * Filter state lives in the URL, so a filtered view can be shared and the
 * back button behaves as expected.
 *
 * Deliberately NOT using role="tablist"/role="tab": that pattern promises
 * tabpanels and arrow-key navigation we don't implement. A group of toggle
 * buttons with aria-pressed describes what this actually is.
 */
export function ProjectFilter({ projects, tags }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const raw = searchParams.get("tag");
  const active = tags.includes(raw as ProjectTag) ? (raw as ProjectTag) : null;

  const filtered = active
    ? projects.filter((p) => p.tags.includes(active))
    : projects;

  function select(tag: ProjectTag | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (tag) params.set("tag", tag);
    else params.delete("tag");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }

  return (
    <div className="space-y-8">
      <div
        role="group"
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-x-6 gap-y-2"
      >
        <button
          type="button"
          aria-pressed={active === null}
          onClick={() => select(null)}
          className={
            active === null
              ? "font-mono text-small text-accent border-b border-accent pb-1"
              : "font-mono text-small text-ink-muted hover:text-ink border-b border-transparent pb-1 transition-colors duration-150"
          }
        >
          {ALL}
          <span className="ml-2 tabular text-meta text-ink-muted">
            {projects.length}
          </span>
        </button>

        {tags.map((tag) => {
          const isActive = tag === active;
          const count = projects.filter((p) => p.tags.includes(tag)).length;
          return (
            <button
              key={tag}
              type="button"
              aria-pressed={isActive}
              onClick={() => select(tag)}
              className={
                isActive
                  ? "font-mono text-small text-accent border-b border-accent pb-1"
                  : "font-mono text-small text-ink-muted hover:text-ink border-b border-transparent pb-1 transition-colors duration-150"
              }
            >
              {tag}
              <span className="ml-2 tabular text-meta text-ink-muted">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Announced to screen readers when the filter changes. */}
      <p aria-live="polite" className="sr-only">
        {filtered.length} project{filtered.length === 1 ? "" : "s"} shown
      </p>

      {filtered.length === 0 ? (
        <p className="text-ink-muted">No projects in this category yet.</p>
      ) : (
        <div>
          {filtered.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
