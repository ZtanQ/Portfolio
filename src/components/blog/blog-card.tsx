import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

/**
 * Same accessibility pattern as ProjectCard: only the title is a link,
 * and the pseudo-element extends the hit area over the whole card.
 */
export function BlogCard({ post }: { post: BlogPostMeta }) {
  return (
    <article className="group relative py-6 border-b border-rule first:border-t first:border-rule">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-card leading-tight">
          <Link
            href={`/writing/${post.slug}`}
            className="after:absolute after:inset-0 group-hover:text-accent transition-colors duration-150"
          >
            {post.title}
          </Link>
        </h3>
        <time
          dateTime={post.date}
          className="font-mono tabular text-meta text-ink-muted shrink-0"
        >
          {formatDate(post.date)}
        </time>
      </div>

      {post.description && (
        <p className="mt-3 max-w-[var(--measure)] text-small text-ink-muted">
          {post.description}
        </p>
      )}

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-meta text-ink-muted">
        <span>
          <span className="tabular">{post.readingMinutes}</span> min read
        </span>
        {post.tags.length > 0 && <span>{post.tags.join(", ")}</span>}
      </div>
    </article>
  );
}
