import Link from "next/link";
import { Hero } from "@/components/layout/hero";
import { ExperienceSection } from "@/components/layout/experience-section";
import { ContactSection } from "@/components/layout/contact-section";
import { PersonJsonLd } from "@/components/layout/person-json-ld";
import { getFeaturedProjects, projects } from "@/data/projects";
import { getPostMetas } from "@/lib/blog";
import { ProjectCard } from "@/components/project/project-card";
import { BlogCard } from "@/components/blog/blog-card";

export default function HomePage() {
  const featured = getFeaturedProjects();
  const recentPosts = getPostMetas().slice(0, 2);

  return (
    <div className="mx-auto max-w-[70rem] px-6 md:px-12">
      <PersonJsonLd />
      <Hero />

      <ExperienceSection />

      <section className="pb-24 md:pb-32">
        <div className="flex items-baseline justify-between gap-4 mb-6">
          <h2 className="font-display text-section tracking-tight">
            Selected projects
          </h2>
          <Link
            href="/projects"
            className="font-mono text-meta text-ink-muted hover:text-ink transition-colors duration-150 shrink-0"
          >
            All {projects.length}
          </Link>
        </div>
        <div>
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      {recentPosts.length > 0 && (
        <section className="pb-16 md:pb-20">
          <div className="flex items-baseline justify-between gap-4 mb-6">
            <h2 className="font-display text-section tracking-tight">
              Writing
            </h2>
            <Link
              href="/writing"
              className="font-mono text-meta text-ink-muted hover:text-ink transition-colors duration-150 shrink-0"
            >
              All posts
            </Link>
          </div>
          <div>
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      <ContactSection />
    </div>
  );
}
