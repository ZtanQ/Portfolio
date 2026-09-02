/**
 * ALDIMI Predict — container view (C4 level 2).
 *
 * What makes this worth drawing is the split between training and serving,
 * which the repository makes explicit and prose does not: the notebooks fit
 * the estimators and write them to disk, and the dashboard only loads them.
 *
 * Read off the repository:
 *
 *  - `notebooks/` — EDA, modeling, and the patient-risk work, four notebooks
 *  - `models/` — four serialized estimators: inventory, patient risk, product
 *    cost, and inventory quantity
 *  - `dashboard.py` — the Streamlit application, with `aldani2_lib.py` and
 *    `integracion_bd.py` beside it
 *  - `data/aldimi_core.db` — a single SQLite database
 *
 * Same drawing rules as the other diagram: hairlines, `currentColor`, and no
 * color-coding, so it reads as part of the page in either theme.
 */
export function AldimiArchitecture() {
  return (
    <>
      <svg
        viewBox="0 0 640 428"
        className="w-full h-auto max-w-[var(--measure)]"
        role="img"
        aria-labelledby="aldimi-arch-title aldimi-arch-desc"
      >
        <title id="aldimi-arch-title">
          Container diagram of ALDIMI Predict
        </title>
        <desc id="aldimi-arch-desc">
          Notebooks train the models offline and write them to disk as four
          serialized estimators. The Streamlit dashboard loads those estimators
          at start-up and reads and writes a single SQLite database.
        </desc>

        <defs>
          <marker
            id="aldimi-arrow"
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
          <rect x="20" y="0" width="600" height="86" rx="2" />
          <rect x="20" y="122" width="600" height="66" rx="2" />
          <rect x="20" y="224" width="600" height="86" rx="2" />
          <rect x="20" y="346" width="600" height="76" rx="2" />

          <line
            x1="320"
            y1="86"
            x2="320"
            y2="118"
            markerEnd="url(#aldimi-arrow)"
          />
          <line
            x1="320"
            y1="188"
            x2="320"
            y2="220"
            markerEnd="url(#aldimi-arrow)"
          />
          <line
            x1="320"
            y1="310"
            x2="320"
            y2="342"
            markerStart="url(#aldimi-arrow)"
            markerEnd="url(#aldimi-arrow)"
          />
        </g>

        {/* Training */}
        <text
          x="40"
          y="28"
          className="font-display text-ink"
          fill="currentColor"
          fontSize="16"
        >
          Notebooks
        </text>
        <text
          x="40"
          y="49"
          className="font-mono text-ink-muted"
          fill="currentColor"
          fontSize="12"
        >
          scikit-learn, XGBoost, SHAP
        </text>
        <text
          x="40"
          y="70"
          className="font-body text-ink-muted"
          fill="currentColor"
          fontSize="13"
        >
          Exploration, model selection and evaluation. Run once, by hand.
        </text>

        <text
          x="336"
          y="108"
          className="font-mono text-ink-muted"
          fill="currentColor"
          fontSize="12"
        >
          writes, offline
        </text>

        {/* Artifacts */}
        <text
          x="40"
          y="148"
          className="font-display text-ink"
          fill="currentColor"
          fontSize="16"
        >
          Serialized estimators
        </text>
        <text
          x="40"
          y="172"
          className="font-body text-ink-muted"
          fill="currentColor"
          fontSize="13"
        >
          Four of them: inventory, patient risk, product cost, quantity.
        </text>

        <text
          x="336"
          y="210"
          className="font-mono text-ink-muted"
          fill="currentColor"
          fontSize="12"
        >
          loaded at start-up
        </text>

        {/* Serving */}
        <text
          x="40"
          y="250"
          className="font-display text-ink"
          fill="currentColor"
          fontSize="16"
        >
          Dashboard
        </text>
        <text
          x="40"
          y="271"
          className="font-mono text-ink-muted"
          fill="currentColor"
          fontSize="12"
        >
          Streamlit
        </text>
        <text
          x="40"
          y="292"
          className="font-body text-ink-muted"
          fill="currentColor"
          fontSize="13"
        >
          Serves predictions and the SHAP explanation. It does no training.
        </text>

        <text
          x="336"
          y="332"
          className="font-mono text-ink-muted"
          fill="currentColor"
          fontSize="12"
        >
          reads and writes
        </text>

        {/* Storage */}
        <text
          x="40"
          y="372"
          className="font-display text-ink"
          fill="currentColor"
          fontSize="16"
        >
          SQLite
        </text>
        <text
          x="40"
          y="393"
          className="font-mono text-ink-muted"
          fill="currentColor"
          fontSize="12"
        >
          one unified database
        </text>
        <text
          x="40"
          y="414"
          className="font-body text-ink-muted"
          fill="currentColor"
          fontSize="13"
        >
          Inventory, patients and products, behind a small access module.
        </text>
      </svg>
      <p className="mt-4 text-small text-ink-muted">
        The estimators are committed to the repository, which is why the
        dashboard starts without a training step. It also means retraining is a
        manual act rather than a pipeline — fine for a delivered prototype, and
        the first thing I would change if it had to stay in use.
      </p>
    </>
  );
}
