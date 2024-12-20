// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@astrojs/netlify";
import solid from "@astrojs/solid-js";
import react from "@astrojs/react";
// import node from "@astrojs/node";
import svelte from "@astrojs/svelte";
import vue from "@astrojs/vue";
// import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  site: "todo-archipelago.netlify.app",
  output: "server",
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    svg: true,
    session: {
      driver: "netlify-blobs",
      options: {
        // @ts-expect-error
        name: "astro-sessions",
        consistency: "strong",
      },
    },
  },
  integrations: [
    react({
      include: ["**/react/"],
    }),
    solid({
      include: ["**/solid/*"],
    }),
    svelte(),
    vue(),
  ],
});
