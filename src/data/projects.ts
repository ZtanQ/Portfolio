export type ProjectTag =
  | "Machine Learning"
  | "Data Visualization"
  | "Computer Vision"
  | "Backend";

export type ProjectMetric = {
  label: string;
  value: string;
};

export type Project = {
  slug: string;
  title: string;
  year: number;
  tags: readonly ProjectTag[];
  stack: readonly string[];
  summary: string;
  role?: string;
  metrics?: readonly ProjectMetric[];
  featured: boolean;
  /**
   * Visual evidence. When absent, the card renders in typographic mode:
   * metrics set large in mono instead of an image.
   */
  image?: {
    src: string;
    alt: string;
  };
  links?: {
    /**
     * One entry per repository. Some projects live in more than one: a team
     * repo alongside a personal one, or a frontend/backend split. The label
     * says what each holds, so the reader knows which one answers their
     * question instead of guessing between two identical links.
     */
    repos?: readonly { label: string; url: string }[];
    demo?: string;
    report?: string;
  };
  context: string;
  /**
   * Where the data came from, how much of it there was, and — when it is
   * synthetic or simulated — why, and against what it was checked. A reader
   * evaluating a data project asks this second, right after what it was for,
   * and burying it in the limitations reads like hiding it.
   */
  dataOrigin?: string;
  decisions: readonly string[];
  results: readonly string[];
  limitations: readonly string[];
};

export const projects: readonly Project[] = [
  {
    slug: "aldimi-predict",
    title: "ALDIMI Predict",
    year: 2026,
    tags: ["Machine Learning"],
    stack: ["Python", "XGBoost", "scikit-learn", "SHAP", "SQLite", "Streamlit"],
    summary:
      "Predictive system for a pediatric oncology shelter: forecasts stock shortages and classifies clinical risk across 34 variables.",
    role: "Modeling and deployment, in a team of four.",
    metrics: [
      { label: "Macro F1 (clinical risk)", value: "0.75" },
      { label: "AUC (clinical risk)", value: "0.87" },
      { label: "Forecast window", value: "7 and 14 days" },
    ],
    featured: true,
    links: {
      repos: [
        { label: "Source on GitHub", url: "https://github.com/itosh10110/ALDIMI" },
      ],
    },
    context:
      "The shelter houses pediatric oncology patients and their families, and runs on limited resources. They needed two things: advance warning of inventory shortages, and a way to prioritize care based on each patient's clinical risk across nutritional, socioeconomic, and treatment-adherence variables.",
    dataOrigin:
      "Entirely synthetic, generated from aggregate statistics over 34 nutritional, socioeconomic, and treatment-adherence variables. No real patient record left the shelter: confidentiality was a hard constraint, not a preference, for an institution treating children with cancer. What this buys is a verifiable pipeline; what it costs is stated below — the metrics validate the method, not the clinical outcome.",
    decisions: [
      "Trained XGBoost and Random Forest under 5-fold stratified cross-validation, with hyperparameter search via RandomizedSearchCV.",
      "Chose macro F1 over accuracy because the risk classes are imbalanced and a false negative — missing a high-risk case — costs far more than a false positive.",
      "Explained every prediction with SHAP values. Staff need to audit the model, since it feeds into decisions about patient care.",
    ],
    results: [
      "Multiclass clinical-risk classifier reaching 0.75 macro F1 and 0.87 AUC on the held-out test set.",
      "Streamlit dashboard over a unified SQLite database, delivered with a user manual and a data dictionary.",
    ],
    limitations: [
      "The dataset is synthetic. Real-world performance needs validation against anonymized operational data before anyone relies on it.",
      "The model assumes the distribution of new admissions stays stable — a change in admission policy would break that assumption.",
    ],
  },
  {
    slug: "smart-kitchen-intelligence",
    title: "Smart Kitchen Intelligence",
    year: 2026,
    tags: ["Data Visualization", "Machine Learning"],
    stack: ["Python", "Polars", "Pandas", "scikit-learn", "Tableau"],
    summary:
      "Food waste analytics over 25,819 inventory movements, with a Polars pipeline and a prescriptive Tableau dashboard.",
    role: "Data preparation, modeling, and visualization, in a team of three.",
    metrics: [
      { label: "Records processed", value: "25,819" },
      { label: "Loss concentration", value: "97% in one location" },
      { label: "Waste ratio", value: "9.1× the most efficient" },
    ],
    featured: true,
    links: {
      repos: [
        { label: "Source on GitHub", url: "https://github.com/ZtanQ/Smart_Kitchen" },
      ],
    },
    context:
      "Data Visualization course, UPC (2026-I). The dataset simulated household operations with kitchen inventories and consumption patterns. The goal was to find where economic loss concentrated and which levers actually moved the waste rate.",
    dataOrigin:
      "25,819 simulated inventory movements across households, from the course dataset. Representativeness was checked against UNEP's Food Waste Index Report 2024, and the waste rates land in the same band as the published estimates. Simulated data is why every cleaning rule could be verified one by one, and why the findings are directional rather than operational.",
    decisions: [
      "Implemented the cleaning pipeline twice — once in Polars, once in Pandas — and compared outputs as a cross-check. If both paths agree, no library-specific bug is hiding an error.",
      "Defined six verifiable data-quality rules: outliers, category harmonization, referential integrity, structural nulls, deduplication, and temporal coherence.",
      "Caught a data leak in the first model. An F1 of exactly 1.0 is suspicious, not impressive. Tracing it back to the pipeline kept an inflated result out of the report.",
      "Rejected accuracy as the metric: a classifier that always predicts the majority class already reached 64.5%. Used macro F1 and cross-validation stability instead.",
    ],
    results: [
      "Ten-sheet Tableau dashboard with four KPIs and a global household filter.",
      "Found that 97% of economic loss concentrated in a single location, with a waste rate 9.1 times higher than the most efficient one.",
    ],
    limitations: [
      "Structural redundancy between the location and category variables, documented as a methodological limitation of the study.",
      "Simulated dataset. The pattern matches public benchmarks but does not substitute for real operational data.",
    ],
  },
  {
    slug: "ski-recommender",
    title: "Anti-Waste Recommendation Engine",
    year: 2026,
    tags: ["Machine Learning"],
    stack: ["Python", "scikit-learn", "implicit (ALS)", "NetworkX", "Streamlit"],
    summary:
      "Hybrid recommender combining content, collaborative, and expiry-urgency signals, evaluated under a masked-basket protocol.",
    role: "Modeling and deployment, in a team of three.",
    metrics: [
      { label: "Catalog coverage", value: "100%" },
      { label: "Silhouette score", value: "0.65" },
      { label: "DBSCAN noise", value: "< 0.3%" },
    ],
    featured: true,
    links: {
      repos: [
        {
          label: "Source on GitHub",
          url: "https://github.com/jose-melgar/Smart-Kitchen-Intelligence",
        },
      ],
    },
    context:
      "An extension of Smart Kitchen Intelligence. If the analysis shows where food is lost, the next step is recommending recipes and purchases that prevent the loss before it happens.",
    dataOrigin:
      "The same simulated household dataset as Smart Kitchen Intelligence, reshaped into baskets. Evaluation masks items out of held-out baskets and asks the model to complete them, so the protocol is scored against data the model never saw rather than against a target it helped define.",
    decisions: [
      "Combined three signals: content similarity (TF-IDF), implicit collaborative filtering (ALS), and urgency weighted by proximity to expiry.",
      "Evaluated under a blind masked-basket completion protocol rather than standard offline metrics, which tend to overstate real performance.",
      "Compared DBSCAN against K-Means and GMM over a PCA-reduced space to segment consumption patterns.",
      "Tested adding PageRank centrality to the ensemble. The ablation over the weight grid returned an optimal weight of zero, so I dropped it and documented the negative result.",
    ],
    results: [
      "100% catalog coverage against a popularity baseline.",
      "Silhouette score of 0.65 with under 0.3% noise in the segmentation.",
      "Streamlit app connecting household to cluster to recommendations to a co-occurrence graph.",
    ],
    limitations: [
      "No evaluation with real users. Validation is against historical baskets, not adoption.",
      "The collaborative component needs a critical mass of households to avoid cold start.",
    ],
  },
  {
    slug: "fruitguard",
    title: "FruitGuard",
    year: 2025,
    tags: ["Computer Vision", "Machine Learning"],
    stack: ["Python", "OpenCV", "scikit-learn", "scikit-image", "Gradio"],
    summary:
      "Freshness classifier for nine produce types, using HOG, GLCM, and color features over 30,357 images.",
    role: "Modeling and evaluation, in a team of three.",
    metrics: [
      { label: "Test accuracy", value: "97.4%" },
      { label: "Images processed", value: "30,357" },
      { label: "Classes evaluated", value: "14" },
    ],
    featured: false,
    links: {
      repos: [
        { label: "Source on GitHub", url: "https://github.com/Dreelliot/FruitGuard" },
      ],
    },
    context:
      "Computer Vision course project. Agrifood supply chains lose value to manual inspection that is slow and subjective. FruitGuard automates the fresh-versus-rotten judgment using classical computer vision, evaluated over 30,357 images across nine produce categories. Methodological reference: Montoya Holguín, Cortés Osorio & Chaves Osorio (2014).",
    dataOrigin:
      "30,357 labeled photographs of nine produce types, fresh and rotten, from a public dataset shot against controlled backgrounds. The folder names that carried the labels arrived corrupted (`patato`, `tamto`) and were normalized at load time so the encoder never saw a duplicate class. The controlled backgrounds are the main limit on external validity, and it is the last limitation listed below.",
    decisions: [
      "Chose handcrafted features — HOG, GLCM, and color statistics across RGB, HSV, and LAB — over a CNN. With a moderate dataset, a Random Forest over interpretable features iterates faster, needs less data, and stays auditable: I can explain every dimension of the input vector.",
      "GLCM captures the textures that change as produce decomposes — spots, wrinkles, mold. It discriminates rot better than a color histogram alone.",
      "Added LAB alongside HSV because it separates luminance from chrominance in a perceptually uniform way, which helps tolerate lighting differences between shots.",
      "Random Forest with 200 trees and max_depth of 20. No formal hyperparameter search: the model reached strong performance quickly and we prioritized shipping the full system with a working Gradio interface.",
    ],
    results: [
      "97.4% accuracy over 6,738 test images.",
      "Per-class F1 between 0.92 and 1.00. The hardest classes are fresh oranges and rotten apples — the model confuses natural rind blemishes with signs of decay.",
      "Gradio app for interactive inference on new images.",
    ],
    limitations: [
      "No cross-validation. The 97.4% comes from a single predefined train/test split; k-fold would have given a confidence band instead of a point estimate.",
      "No comparison against a modern baseline such as a fine-tuned ResNet. I can't claim HOG plus GLCM plus color is the best choice here, only that it was sufficient.",
      "The dataset uses controlled backgrounds. Performance on real kitchen or market photos, with variable lighting and overlapping objects, is an open question I did not close.",
    ],
  },
  {
    slug: "career-assessment-platform",
    title: "Career Assessment Platform",
    year: 2024,
    tags: ["Backend"],
    stack: ["Java", "Spring Boot", "PostgreSQL"],
    summary:
      "Career guidance platform with a REST API and a normalized relational schema.",
    metrics: [],
    featured: false,
    links: {
      repos: [
        {
          label: "Backend API",
          url: "https://github.com/DecideClaro/Vocatio-backend",
        },
        {
          label: "Frontend",
          url: "https://github.com/DecideClaro/frontend-Vocation",
        },
      ],
    },
    context:
      "Course project. The goal was a structured self-assessment tool with queryable profiles and recommendations.",
    dataOrigin:
      "No dataset. Persistence is a normalized PostgreSQL schema whose DDL and seed rows are versioned as SQL in the repository; the platform never held real user assessments.",
    decisions: [
      "Modeled the relational schema by normalizing user, assessment, and result to avoid expensive nested queries when generating personalized recommendations.",
      "Exposed the profile and scoring logic through a Spring Boot REST API.",
    ],
    results: [
      "Working platform with relational persistence and documented REST endpoints.",
    ],
    limitations: [
      "Never reached production. It's evidence that I can take something end to end, not a product in use.",
    ],
  },
] as const;

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): readonly Project[] {
  return projects.filter((p) => p.featured);
}

export function getAllTags(): readonly ProjectTag[] {
  const set = new Set<ProjectTag>();
  for (const p of projects) for (const t of p.tags) set.add(t);
  return Array.from(set);
}
