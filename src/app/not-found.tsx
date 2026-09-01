import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[52rem] px-6 md:px-12 py-24 md:py-32">
      <p className="font-mono tabular text-meta text-ink-muted mb-4">404</p>
      <h1 className="font-display text-[2.125rem] md:text-display tracking-tight">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-6 max-w-[var(--measure)] text-ink-muted">
        The link may have changed, or it may never have existed.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block text-accent border-b border-accent pb-[2px] hover:opacity-75 transition-opacity duration-150"
      >
        Back to home
      </Link>
    </div>
  );
}
