module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
      tsconfigRootDir: __dirname,
      project: ["./packages/*/tsconfig.json"],
    },

    plugins: [
      "@typescript-eslint",
    ],

    extends: [
      "airbnb-typescript",
      "plugin:@typescript-eslint/recommended-requiring-type-checking",
    ],

    rules: {
      "@typescript-eslint/quotes": ["error", "double"],
    },
};
