import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/data/site";
import { about } from "@/data/about";
import { education } from "@/data/education";
import { games, gamesProfileUrl } from "@/data/games";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} — Computer Science student in Lima working across data, machine learning, and game development.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[70rem] px-6 md:px-12 py-16 md:py-24">
      <h1 className="font-display text-[2.125rem] md:text-display tracking-tight">
        About
      </h1>

      {/* Photo sits beside the opening paragraphs, not above them. */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-[16rem_1fr] gap-x-12 gap-y-8 items-start">
        <Image
          src={about.photo.src}
          alt={about.photo.alt}
          width={468}
          height={540}
          sizes="(min-width: 768px) 16rem, 60vw"
          className="w-40 md:w-full rounded-image border border-rule"
          priority
        />

        <div className="space-y-5 max-w-[var(--measure)]">
          {about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      <section className="mt-20">
        <h2 className="font-display text-section tracking-tight mb-6">
          What I work with
        </h2>
        <dl className="border-t border-rule">
          {about.areas.map((area) => (
            <div
              key={area.label}
              className="grid grid-cols-1 sm:grid-cols-[14rem_1fr] gap-x-6 gap-y-1 py-4 border-b border-rule"
            >
              <dt className="font-mono text-meta text-ink-muted sm:pt-[3px]">
                {area.label}
              </dt>
              <dd className="font-mono text-small">{area.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-20">
        <h2 className="font-display text-section tracking-tight mb-6">
          Education
        </h2>
        <dl className="border-t border-rule">
          {education.map((item) => (
            <div
              key={item.institution}
              className="grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-x-6 gap-y-1 py-5 border-b border-rule"
            >
              <dt className="font-mono tabular text-meta text-ink-muted sm:pt-[5px]">
                {item.period}
              </dt>
              <dd>
                <p className="font-display text-card leading-tight">
                  {item.credential}
                </p>
                <p className="mt-1 text-small text-ink-muted">
                  {item.institution}
                </p>
                {item.note && (
                  <p className="mt-1 text-small text-ink-muted">{item.note}</p>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-20">
        <h2 className="font-display text-section tracking-tight mb-6">
          Languages
        </h2>
        <ul className="flex flex-wrap gap-x-10 gap-y-3">
          {about.languages.map((lang) => (
            <li key={lang.name}>
              <span className="font-display text-card">{lang.name}</span>
              {lang.level && (
                <span className="ml-2 font-mono text-meta text-ink-muted">
                  {lang.level}
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <div className="flex items-baseline justify-between gap-4 mb-6">
          <h2 className="font-display text-section tracking-tight">
            Published games
          </h2>
          <a
            href={gamesProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-meta text-ink-muted hover:text-ink transition-colors duration-150 shrink-0"
          >
            itch.io profile
          </a>
        </div>
        {/* Cover art leads here. It's the only section where the picture is
            the work rather than a description of it. Native size is the
            itch.io 630×500, so the frame keeps that ratio and never crops. */}
        <ul className="border-t border-rule">
          {games.map((game) => (
            <li
              key={game.title}
              className="grid grid-cols-[5.5rem_1fr] sm:grid-cols-[9rem_1fr] gap-x-5 sm:gap-x-6 gap-y-1 py-5 border-b border-rule"
            >
              {game.image ? (
                <div className="relative aspect-[63/50] overflow-hidden rounded-image border border-rule bg-rule/20">
                  <Image
                    src={game.image.src}
                    alt={game.image.alt}
                    fill
                    sizes="(min-width: 640px) 9rem, 5.5rem"
                    className="object-cover"
                  />
                </div>
              ) : (
                <span className="font-mono text-meta text-ink-muted pt-[5px]">
                  {game.genre ?? "—"}
                </span>
              )}
              <div>
                <a
                  href={game.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-card leading-tight text-accent border-b border-accent/40 hover:border-accent transition-colors duration-150"
                >
                  {game.title}
                </a>
                {game.studio && (
                  <span className="ml-2 font-mono text-meta text-ink-muted">
                    {game.studio}
                  </span>
                )}
                {game.blurb && (
                  <p className="mt-1 text-small text-ink-muted max-w-[var(--measure)]">
                    {game.blurb}
                  </p>
                )}
                {game.image && game.genre && (
                  <p className="mt-2 font-mono text-meta text-ink-muted">
                    {game.genre}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
