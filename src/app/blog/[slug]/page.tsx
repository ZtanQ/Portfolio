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
      className="font-display text-3xl md:text-4xl mt-12 mb-4 leading-tight"
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} className="font-display text-2xl mt-10 mb-3 leading-tight" />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} className="font-display text-xl mt-8 mb-2 leading-tight" />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      {...props}
      className="my-4 leading-relaxed max-w-[var(--measure)] text-ink"
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      {...props}
      className="my-4 pl-6 list-disc space-y-2 max-w-[var(--measure)] text-ink"
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      {...props}
      className="my-4 pl-6 list-decimal space-y-2 max-w-[var(--measure)] text-ink"
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
      className="font-mono text-[0.9em] bg-rule/40 px-1.5 py-0.5 rounded-sm"
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
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <p className="font-mono text-xs text-ink-muted mb-4">
        <Link href="/blog" className="hover:text-ink">
          Notas
        </Link>
        {"  /  "}
        <time dateTime={post.date} className="tabular">
          {formatDate(post.date)}
        </time>
        {"  /  "}
        <span className="tabular">{post.readingMinutes} min</span>
      </p>

      <h1 className="font-display text-4xl md:text-5xl leading-tight tracking-tight">
        {post.title}
      </h1>

      {post.description && (
        <p className="mt-6 text-lg text-ink-muted max-w-[var(--measure)]">
          {post.description}
        </p>
      )}

      <div className="mt-10 border-t border-rule pt-6">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>
    </article>
  );
}
