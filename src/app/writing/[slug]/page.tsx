import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { getAllPosts, getPost } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

/**
 * Componentes para renderizar dentro del MDX. Mantener el mismo lenguaje
 * tipográfico del resto del sitio.
 */
const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      {...props}
      className="font-display text-section mt-12 mb-4 tracking-tight"
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} className="font-display text-section mt-10 mb-3 tracking-tight" />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} className="font-display text-card mt-8 mb-2" />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      {...props}
      className="my-5 max-w-[var(--measure)]"
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      {...props}
      className="my-5 pl-6 list-disc space-y-2 marker:text-ink-muted max-w-[var(--measure)]"
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      {...props}
      className="my-5 pl-6 list-decimal space-y-2 marker:text-ink-muted max-w-[var(--measure)]"
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className="my-6 pl-4 border-l-2 border-accent italic text-ink-muted max-w-[var(--measure)]"
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      {...props}
      className="font-mono text-[0.875em] bg-rule/40 px-1.5 py-0.5 rounded-sm"
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      {...props}
      className="my-6 p-4 overflow-x-auto border border-rule font-mono text-sm bg-rule/20 rounded-sm"
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      {...props}
      className="text-accent underline underline-offset-2 hover:opacity-80"
    />
  ),
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-[52rem] px-6 md:px-12 py-16 md:py-24">
      <nav
        aria-label="Breadcrumb"
        className="font-mono text-meta text-ink-muted mb-5 flex flex-wrap gap-x-3"
      >
        <Link
          href="/writing"
          className="hover:text-ink transition-colors duration-150"
        >
          Writing
        </Link>
        <time dateTime={post.date} className="tabular">
          {formatDate(post.date)}
        </time>
        <span>
          <span className="tabular">{post.readingMinutes}</span> min read
        </span>
      </nav>

      <h1 className="font-display text-[2.125rem] md:text-display tracking-tight">
        {post.title}
      </h1>

      {post.description && (
        <p className="mt-6 text-ink-muted max-w-[var(--measure)]">
          {post.description}
        </p>
      )}

      <div className="mt-10 border-t border-rule pt-6">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>
    </article>
  );
}
