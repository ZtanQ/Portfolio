import type { Metadata } from "next";
import { getPostMetas } from "@/lib/blog";
import { BlogCard } from "@/components/blog/blog-card";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Short notes on methodological decisions in data projects, plus post-mortems when something didn't go as planned.",
};

export default function WritingPage() {
  const posts = getPostMetas();

  return (
    <div className="mx-auto max-w-[70rem] px-6 md:px-12 py-16 md:py-24">
      <header className="mb-12 md:mb-16 max-w-[var(--measure)]">
        <h1 className="font-display text-[2.125rem] md:text-display tracking-tight">
          Writing
        </h1>
        <p className="mt-6 text-ink-muted">
          Short pieces about decisions I made on a project, things I picked up
          from reading, and post-mortems when something didn&apos;t go the way I
          expected.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-ink-muted">Nothing published yet.</p>
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
