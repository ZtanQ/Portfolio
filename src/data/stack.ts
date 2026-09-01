/**
 * The hero's core claim: every technology listed here links to something
 * that proves I used it. If a tool has no evidence, it doesn't belong on
 * this list — that's the whole point of the section.
 *
 * `href` points either at a project page or at a section of the home page.
 */
export type StackItem = {
  name: string;
  href: string;
  /** Short phrase naming the evidence, used as the link's accessible name. */
  evidence: string;
};

export type StackGroup = {
  label: string;
  items: readonly StackItem[];
};

export const stack: readonly StackGroup[] = [
  {
    label: "Machine learning",
    items: [
      {
        name: "Python",
        href: "/projects/aldimi-predict",
        evidence: "used across every modeling project",
      },
      {
        name: "scikit-learn",
        href: "/projects/ski-recommender",
        evidence: "clustering and model selection in the recommender",
      },
      {
        name: "XGBoost",
        href: "/projects/aldimi-predict",
        evidence: "clinical risk classifier in ALDIMI Predict",
      },
      {
        name: "SHAP",
        href: "/projects/aldimi-predict",
        evidence: "per-prediction explanations in ALDIMI Predict",
      },
      {
        name: "OpenCV",
        href: "/projects/fruitguard",
        evidence: "feature extraction in FruitGuard",
      },
    ],
  },
  {
    label: "Data",
    items: [
      {
        name: "Polars",
        href: "/projects/smart-kitchen-intelligence",
        evidence: "cleaning pipeline in Smart Kitchen",
      },
      {
        name: "Pandas",
        href: "/projects/smart-kitchen-intelligence",
        evidence: "cross-validation of the cleaning pipeline",
      },
      {
        name: "SQL",
        href: "/projects/career-assessment-platform",
        evidence: "relational schema in the assessment platform",
      },
      {
        name: "Tableau",
        href: "/projects/smart-kitchen-intelligence",
        evidence: "ten-sheet dashboard in Smart Kitchen",
      },
      {
        name: "Power BI",
        href: "/#experience",
        evidence: "recurring reports at Cirion Technologies",
      },
    ],
  },
  {
    label: "Engineering",
    items: [
      {
        name: "Java",
        href: "/projects/career-assessment-platform",
        evidence: "REST API in the assessment platform",
      },
      {
        name: "Spring Boot",
        href: "/projects/career-assessment-platform",
        evidence: "REST API in the assessment platform",
      },
      {
        name: "Streamlit",
        href: "/projects/aldimi-predict",
        evidence: "delivered dashboards in ALDIMI and the recommender",
      },
      {
        name: "Gradio",
        href: "/projects/fruitguard",
        evidence: "inference interface in FruitGuard",
      },
    ],
  },
] as const;
