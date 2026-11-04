import boundaries from "eslint-plugin-boundaries";
import path from "node:path";
import tseslint from "typescript-eslint";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const webLayers = [
  { type: "shared", pattern: "src/shared", partialMatch: false },
  { type: "features", pattern: "src/features", partialMatch: false },
  { type: "pages", pattern: "src/pages", partialMatch: false },
  { type: "app", pattern: "src/app", partialMatch: false },
];
const webPolicies = [
  {
    from: { element: { type: "shared" } },
    disallow: { to: { element: { types: ["features", "pages"] } } },
  },
  {
    from: { element: { type: "features" } },
    disallow: { to: { element: { types: ["pages"] } } },
  },
].map((policy) => ({
  ...policy,
  message: "FSD: una capa solo puede depender de capas de nivel inferior.",
}));

export default [
  {
    ignores: ["dist/**"],
  },
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      boundaries,
    },
    settings: {
      "import/resolver": {
        typescript: { project: path.join(projectRoot, "tsconfig.json") },
      },
      "boundaries/root-path": projectRoot,
      "boundaries/elements": webLayers,
    },
    rules: {
      "boundaries/dependencies": [
        "error",
        { default: "allow", policies: webPolicies },
      ],
    },
  },
];
