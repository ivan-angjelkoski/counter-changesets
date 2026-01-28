import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  target: ["es2022"],
  minify: true,
  // if this is set to node, the module js files are with a .mjs prefix instead of .js
  platform: "browser",
});
