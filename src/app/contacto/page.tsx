import type { Metadata } from "next";
import { site } from "@/data/site";
import { socials } from "@/data/socials";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Cómo contactar con ${site.name}.`,
};

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <header className="mb-12 max-w-[var(--measure)]">
        <h1 className="font-display text-4xl md:text-5xl leading-tight tracking-tight">
          Contacto
        </h1>
        <p className="mt-6 text-ink-muted">
          La vía más rápida es el correo. Reviso LinkedIn con menos frecuencia,
          y el GitHub tiene el código fuente de la mayoría de los proyectos del
          portafolio.
        </p>
      </header>

      <dl className="space-y-6 border-y border-rule py-8">
        {socials.map((s) => (
          <div
            key={s.label}
            className="grid grid-cols-1 md:grid-cols-[8rem_1fr] gap-x-6 gap-y-1"
          >
            <dt className="font-mono text-sm text-ink-muted">
              {s.label}
            </dt>
            <dd>
              <a
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  s.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="text-accent underline underline-offset-2 hover:opacity-80"
              >
                {s.handle}
              </a>
            </dd>
          </div>
        ))}
      </dl>

      <section className="mt-10">
        <a
          href={site.cvPath}
          className="font-mono text-sm text-ink-muted hover:text-ink transition-colors"
        >
          Descargar CV en PDF
        </a>
      </section>
    </div>
  );
}
