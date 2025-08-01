import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // ⬇️ Tambahkan custom rules di sini
  {
    rules: {
      "no-unused-vars": "error", // ⛔ Error kalau ada variabel tidak dipakai
      "@typescript-eslint/no-unused-vars": "error", // ⛔ Untuk file TS
    },
  },
];

export default eslintConfig;
