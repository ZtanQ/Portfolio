"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectImage } from "@/data/projects";

/**
 * Arrows over a stack of screenshots, plus a full-size view. One of the two
 * client components on a project page, and deliberately small: no library, no
 * animation, no dots, no autoplay.
 *
 * Layout: the image keeps the full reading measure and the buttons hang in the
 * page margin beside it, so the controls cost the photograph no width. That
 * only works where there is margin to hang in, so below `md` they tuck against
 * the image edges instead of overflowing the screen.
 *
 * The large view is a native `<dialog>`. `showModal()` brings Escape, focus
 * containment and inertness for the rest of the page with no code of ours and
 * no dependency — the same reasoning as using a static SVG instead of a chart
 * library.
 */
export function ProjectGallery({ images }: { images: readonly ProjectImage[] }) {
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const count = images.length;

  const go = useCallback(
    (step: number) => setIndex((i) => (i + step + count) % count),
    [count],
  );

  const current = images[index];

  // Arrow keys move the gallery while the large view is open, wherever focus
  // happens to be inside it.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
    };
    dialog.addEventListener("keydown", onKey);
    return () => dialog.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <div
      role="group"
      aria-label={`Screenshots, ${count} of them`}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(-1);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          go(1);
        }
      }}
    >
      <div className="relative max-w-[var(--measure)]">
        <button
          type="button"
          onClick={() => dialogRef.current?.showModal()}
          aria-label={`View screenshot ${index + 1} full size`}
          className="block w-full cursor-zoom-in"
        >
          <span className="relative block aspect-[4/3] overflow-hidden rounded-image border border-rule bg-rule/20">
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              fill
              sizes="(min-width: 768px) 40rem, 100vw"
              className="object-cover"
              priority={index === 0}
            />
          </span>
        </button>

        <Arrow
          direction="left"
          onClick={() => go(-1)}
          className="left-2 md:-left-12"
        />
        <Arrow
          direction="right"
          onClick={() => go(1)}
          className="right-2 md:-right-12"
        />
      </div>

      <p
        aria-live="polite"
        className="mt-3 font-mono tabular text-meta text-ink-muted"
      >
        {index + 1} / {count}
      </p>

      <dialog
        ref={dialogRef}
        aria-label="Screenshot, full size"
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="m-auto max-w-none max-h-none bg-transparent backdrop:bg-ink/85"
      >
        <div className="relative w-[min(92vw,calc(80vh*4/3))]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-image border border-rule bg-paper">
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="92vw"
              className="object-contain"
            />
          </div>

          <div className="mt-3 flex items-center gap-4">
            <Arrow direction="left" onClick={() => go(-1)} inline />
            <Arrow direction="right" onClick={() => go(1)} inline />
            <p className="font-mono tabular text-meta text-paper/80">
              {index + 1} / {count}
            </p>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="ml-auto font-mono text-meta text-paper/80 hover:text-paper transition-colors duration-150"
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

/**
 * Round on purpose: a circle reads as a control, where a square reads as one
 * more panel. The 2-4px ceiling in instrucciones.md §7 is about panels.
 */
function Arrow({
  direction,
  onClick,
  className = "",
  inline = false,
}: {
  direction: "left" | "right";
  onClick: () => void;
  className?: string;
  inline?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "left" ? "Previous screenshot" : "Next screenshot"}
      className={
        inline
          ? "grid place-items-center w-9 h-9 rounded-full border border-paper/30 text-paper/80 hover:text-paper hover:border-paper/60 transition-colors duration-150"
          : `absolute top-1/2 -translate-y-1/2 grid place-items-center w-9 h-9 rounded-full border border-rule bg-paper text-ink-muted hover:text-ink hover:border-ink-muted transition-colors duration-150 ${className}`
      }
    >
      <Chevron direction={direction} />
    </button>
  );
}

/** Hairline chevron, same weight as the rules that structure the page. */
function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden="true"
    >
      <path
        d={direction === "left" ? "M 10 2 L 4 8 L 10 14" : "M 6 2 L 12 8 L 6 14"}
      />
    </svg>
  );
}
