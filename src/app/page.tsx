import Link from "next/link";
import { Hero } from "@/components/layout/hero";
import { ExperienceSection } from "@/components/layout/experience-section";
import { StackSection } from "@/components/layout/stack-section";
import { ContactSection } from "@/components/layout/contact-section";
import { PersonJsonLd } from "@/components/layout/person-json-ld";
import { getFeaturedProjects, projects } from "@/data/projects";
import { getPostMetas } from "@/lib/blog";
import { ProjectCard } from "@/components/project/project-card";
import { BlogCard } from "@/components/blog/blog-card";

/**
 * Section order, and why (instrucciones.md §5):
 *
 * Projects come before Experience. The internship was three months; the
 * projects are the body of work, and they answer the question a technical
 * reader actually arrives with. The stack, which used to open the page,
 * closes the argument instead of prefacing it.
 *
 * The index below the hero exists because this page is long and someone
 * looking for one specific thing shouldn't have to scroll for it.
 */
export default function HomePage() {
  const featured = getFeaturedProjects();
  const recentPosts = getPostMetas().slice(0, 2);

  const index = [
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#stack", label: "Stack" },
    ...(recentPosts.length > 0
      ? [{ href: "#writing", label: "Writing" }]
      : []),
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="mx-auto max-w-[70rem] px-6 md:px-12">
      <PersonJsonLd />
      <Hero />

      <nav
        aria-label="Sections of this page"
        className="pb-16 md:pb-24 border-t border-rule pt-4"
      >
        <ul className="flex flex-wrap gap-x-7 gap-y-2 font-mono text-meta text-ink-muted">
          {index.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="hover:text-ink border-b border-transparent hover:border-rule pb-[2px] transition-colors duration-150"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <section id="projects" className="pb-24 md:pb-32 scroll-mt-8">
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

      <ExperienceSection />

      <StackSection />

      {recentPosts.length > 0 && (
        <section id="writing" className="pb-16 md:pb-20 scroll-mt-8">
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
