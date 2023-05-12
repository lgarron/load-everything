import { build } from "esbuild";

build({
  entryPoints: ["src/index.ts"],
  format: "esm",
  outdir: "dist",
});
