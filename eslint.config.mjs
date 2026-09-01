// Flat config mínimo. Cuando quieras las reglas completas de Next.js,
// migra a la config que genera `create-next-app` de Next 16.
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    // Ignorar archivos generados y dependencias.
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "next-env.d.ts",
      "public/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
];
