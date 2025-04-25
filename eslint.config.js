import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        require: "readonly",
        module: "writable",
        __dirname: "readonly",
        console: "readonly", // Add console here
        process: "readonly", // Add process here
      },
    },
    rules: {
      "no-console": "off",
      "no-unused-vars": ["warn"],
    },
  },
];
