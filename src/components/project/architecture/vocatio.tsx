/**
 * Career Assessment Platform — container view (C4 level 2).
 *
 * Drawn from the two repositories, not from memory. Every label here is
 * something the code says:
 *
 *  - Angular front end with an auth-token interceptor that attaches the JWT
 *    (`vocatio-frontend/src/app/core/interceptors/auth-token.interceptor.ts`)
 *  - Spring Boot API on `${PORT:8080}`, controller/service/repository layers,
 *    `JwtAuthenticationFilter` in front of the routes
 *  - PostgreSQL: `org.postgresql.Driver`, credentials from environment
 *    variables, schema and seed data in `BD/*.sql`
 *  - `docker-compose.yml` defines only the database (postgres:16, 5434→5432),
 *    so the API runs against a containerized database, not inside one
 *
 * Hairlines and type, no fills and no color-coding: a diagram in the palette
 * of the page it sits on, not an export from a diagramming tool. `stroke` and
 * `fill` use `currentColor`, so both themes work without a second copy.
 */
export function VocatioArchitecture() {
  return (
    <>
      <svg
        viewBox="0 0 640 406"
        className="w-full h-auto max-w-[var(--measure)]"
        role="img"
        aria-labelledby="vocatio-arch-title vocatio-arch-desc"
      >
        <title id="vocatio-arch-title">
          Container diagram of the Career Assessment Platform
        </title>
        <desc id="vocatio-arch-desc">
          A student uses an Angular single-page application, which calls a
          Spring Boot REST API over HTTPS with a bearer token. The API reads and
          writes a PostgreSQL database through Spring Data JPA.
        </desc>

        <defs>
          <marker
            id="vocatio-arrow"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path
              d="M 0 1 L 7 4 L 0 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </marker>
        </defs>

        <g
          className="text-rule"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        >
          <rect x="250" y="0" width="140" height="34" rx="2" />
          <rect x="20" y="74" width="600" height="82" rx="2" />
          <rect x="20" y="196" width="600" height="94" rx="2" />
          <rect x="20" y="330" width="600" height="72" rx="2" />

          <line
            x1="320"
            y1="34"
            x2="320"
            y2="70"
            markerEnd="url(#vocatio-arrow)"
          />
          <line
            x1="320"
            y1="156"
            x2="320"
            y2="192"
            markerEnd="url(#vocatio-arrow)"
          />
          <line
            x1="320"
            y1="290"
            x2="320"
            y2="326"
            markerEnd="url(#vocatio-arrow)"
          />
        </g>

        {/* Actor */}
        <text
          x="320"
          y="22"
          textAnchor="middle"
          className="font-mono text-ink"
          fill="currentColor"
          fontSize="13"
        >
          Student
        </text>

        {/* Front end */}
        <text
          x="40"
          y="100"
          className="font-display text-ink"
          fill="currentColor"
          fontSize="16"
        >
          Vocatio SPA
        </text>
        <text
          x="40"
          y="121"
          className="font-mono text-ink-muted"
          fill="currentColor"
          fontSize="12"
        >
          Angular, TypeScript
        </text>
        <text
          x="40"
          y="141"
          className="font-body text-ink-muted"
          fill="currentColor"
          fontSize="13"
        >
          An HTTP interceptor attaches the token to every request.
        </text>

        {/* Edge label */}
        <text
          x="336"
          y="179"
          className="font-mono text-ink-muted"
          fill="currentColor"
          fontSize="12"
        >
          HTTPS, JSON, bearer token
        </text>

        {/* API */}
        <text
          x="40"
          y="222"
          className="font-display text-ink"
          fill="currentColor"
          fontSize="16"
        >
          Vocatio API
        </text>
        <text
          x="40"
          y="243"
          className="font-mono text-ink-muted"
          fill="currentColor"
          fontSize="12"
        >
          Spring Boot, port 8080
        </text>
        <text
          x="40"
          y="263"
          className="font-body text-ink-muted"
          fill="currentColor"
          fontSize="13"
        >
          Controller, service and repository layers, with a JWT
        </text>
        <text
          x="40"
          y="281"
          className="font-body text-ink-muted"
          fill="currentColor"
          fontSize="13"
        >
          filter in front of the routes.
        </text>

        {/* Edge label */}
        <text
          x="336"
          y="313"
          className="font-mono text-ink-muted"
          fill="currentColor"
          fontSize="12"
        >
          JDBC, through Spring Data JPA
        </text>

        {/* Database */}
        <text
          x="40"
          y="356"
          className="font-display text-ink"
          fill="currentColor"
          fontSize="16"
        >
          PostgreSQL 16
        </text>
        <text
          x="40"
          y="376"
          className="font-mono text-ink-muted"
          fill="currentColor"
          fontSize="12"
        >
          user, assessment, career
        </text>
        <text
          x="40"
          y="393"
          className="font-body text-ink-muted"
          fill="currentColor"
          fontSize="13"
        >
          Schema and seed data versioned as SQL; credentials from the
          environment.
        </text>
      </svg>
      <p className="mt-4 text-small text-ink-muted">
        The Compose file provisions the database and nothing else, so the API
        runs against a containerized PostgreSQL rather than inside one. Enough
        for a course project, and one of the reasons it never went further.
      </p>
    </>
  );
}
