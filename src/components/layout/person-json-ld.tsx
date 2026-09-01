import { site } from "@/data/site";
import { socials } from "@/data/socials";

/**
 * Schema.org Person markup. Helps search engines associate the site with
 * a real person rather than treating it as a generic page.
 *
 * sameAs only lists profiles that resolve — an empty or broken URL here
 * is worse than omitting the field.
 */
export function PersonJsonLd() {
  const sameAs = socials
    .filter((s) => s.href.startsWith("http"))
    .map((s) => s.href);

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: site.role,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lima",
      addressCountry: "PE",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Universidad Peruana de Ciencias Aplicadas",
    },
    knowsLanguage: ["es", "en", "fr"],
    sameAs,
  };

  return (
    <script
      type="application/ld+json"
      // Content is fully static and built from our own data files.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
