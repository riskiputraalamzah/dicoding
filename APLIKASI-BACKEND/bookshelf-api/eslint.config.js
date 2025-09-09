import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    files: ["**/*.js"], // Sesuaikan dengan file JS di proyek Anda
    ignores: ["node_modules/**"], // Opsional, untuk mengabaikan direktori node_modules
    languageOptions: {
      ecmaVersion: 12,
      sourceType: "module",
      globals: {
        process: "readonly", // Mendefinisikan `process` sebagai variabel global
        __dirname: "readonly", // Jika Anda butuh `__dirname` di proyek
        module: "readonly", // Tambahkan variabel Node.js lainnya yang diperlukan
        exports: "readonly",
        require: "readonly",
      },
    },
    plugins: {
      // jika Anda menggunakan plugin tambahan, tambahkan di sini
    },
    rules: {
      "no-console": "off",
    },
  },
];
