// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");
const boundaries = require("eslint-plugin-boundaries");
const path = require("node:path");

const projectRoot = __dirname;
const mobileLayers = [
  { type: "shared", pattern: "src/shared", partialMatch: false },
  { type: "core", pattern: "src/core", partialMatch: false },
  { type: "entities", pattern: "src/entities", partialMatch: false },
  { type: "features", pattern: "src/features", partialMatch: false },
  { type: "widgets", pattern: "src/widgets", partialMatch: false },
  { type: "pages", pattern: "src/pages", partialMatch: false },
  { type: "app", pattern: "app", partialMatch: false },
];
const mobilePolicies = [
  {
    from: { element: { type: "shared" } },
    disallow: { to: { element: { types: ["entities", "features", "widgets", "pages"] } } },
  },
  {
    from: { element: { type: "core" } },
    disallow: { to: { element: { types: ["entities", "features", "widgets", "pages"] } } },
  },
  {
    from: { element: { type: "entities" } },
    disallow: { to: { element: { types: ["features", "widgets", "pages"] } } },
  },
  {
    from: { element: { type: "features" } },
    disallow: { to: { element: { types: ["widgets", "pages"] } } },
  },
  {
    from: { element: { type: "widgets" } },
    disallow: { to: { element: { type: "pages" } } },
  },
].map((policy) => ({
  ...policy,
  message: "FSD: una capa solo puede depender de capas de nivel inferior.",
}));

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  },
  {
    files: ["src/**/*.{js,jsx,ts,tsx}", "app/**/*.{js,jsx,ts,tsx}"],
    settings: {
      "import/resolver": {
        typescript: { project: path.join(projectRoot, "tsconfig.json") },
      },
      "boundaries/root-path": projectRoot,
      "boundaries/elements": mobileLayers,
    },
    plugins: { boundaries },
    rules: {
      "boundaries/dependencies": [
        "error",
        { default: "allow", policies: mobilePolicies },
      ],
    },
  }
]);
