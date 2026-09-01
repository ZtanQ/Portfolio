import type { Metadata } from "next";
import { getPostMetas } from "@/lib/blog";
import { BlogCard } from "@/components/blog/blog-card";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notas cortas sobre decisiones metodológicas en proyectos de datos, reseñas y post-mortems.",
};

export default function BlogPage() {
  const posts = getPostMetas();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <header className="mb-12 md:mb-16 max-w-[var(--measure)]">
        <h1 className="font-display text-4xl md:text-5xl leading-tight tracking-tight">
          Notas
        </h1>
        <p className="mt-6 text-ink-muted">
          Textos cortos sobre decisiones que tomé en algún proyecto, cosas que
          aprendí leyendo, y post-mortems cuando algo no salió como esperaba.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-ink-muted">
          Aún no hay notas publicadas.
        </p>
      ) : (
        <div>
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
