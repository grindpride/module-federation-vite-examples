import { federation } from "@module-federation/vite";
import { cpSync, existsSync } from "node:fs";
import { resolve } from "node:path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: false,
  modules: ["@pinia/nuxt"],

  experimental: {
    buildCache: false,
  },

  // CORS headers so the host app can fetch remoteEntry.js cross-origin
  routeRules: {
    "/**": { headers: { "Access-Control-Allow-Origin": "*" } },
  },

  hooks: {
    // Nuxt only copies the _nuxt/ subfolder from dist/client/ to .output/public/.
    // The federation plugin emits remoteEntry.js at the output root (so its
    // relative imports like "./_nuxt/chunk.js" resolve correctly).
    // Copy it manually so it's served in production/preview.
    "nitro:build:public-assets"(nitro) {
      const src = resolve(nitro.options.buildDir, "dist/client/remoteEntry.js");
      const dest = resolve(nitro.options.output.publicDir, "remoteEntry.js");
      if (existsSync(src)) cpSync(src, dest);
    },
  },

  vite: {
    server: { cors: true },
    plugins: [
      federation({
        dts: false,
        name: "remote",
        filename: "remoteEntry.js",
        exposes: {
          "./remote-app": "./app/app.vue",
        },
        remotes: {},
      }) as any,
    ],
  },
});
