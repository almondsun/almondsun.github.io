import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://almondsun.github.io",
  output: "static",
  integrations: [sitemap()],
  build: { format: "directory" },
  image: { responsiveStyles: true },
});
