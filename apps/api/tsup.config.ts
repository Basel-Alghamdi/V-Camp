import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs"],
  outDir: "dist",
  splitting: false,
  noExternal: [
    "@owners-platform/database",
    "@owners-platform/validators",
    "@owners-platform/types",
  ],
});
