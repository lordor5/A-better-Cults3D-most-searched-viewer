import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://lordor5.github.io",
  base: "A-better-Cults3D-most-searched-viewer",
  integrations: [sitemap()],
});
