module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
      tsconfigRootDir: __dirname,
      project: ["./packages/*/tsconfig.json"],
    },

    plugins: [
      "@typescript-eslint",
      "prettier",
    ],

    extends: [
      "airbnb-typescript",
      "plugin:@typescript-eslint/recommended-requiring-type-checking",
      "prettier/@typescript-eslint",
      "prettier/react",
    ],

    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/quotes": ["error", "double"],
      "import/prefer-default-export": 0,
      "comma-dangle": 0,
    },

    settings: {
      "import/resolver": {
        node: {
          extensions: [".ts", ".tsx"],
        }
      }
    }
};
