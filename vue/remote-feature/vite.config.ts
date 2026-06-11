import { federation } from "@module-federation/vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import { defineConfig } from "vite";
import { dependencies } from "./package.json";

export default defineConfig({
  server: {
    fs: {
      allow: [".", "../shared"],
    },
  },
  base: "http://localhost:4175",
  plugins: [
    federation({
      dts: false,
      dev: {
        remoteHmr: true,
      },
      filename: "remoteEntry.js",
      name: "remoteFeature",
      shareStrategy: "loaded-first",
      exposes: {
        "./stores/exampleStore": "./src/stores/exampleStore.ts",
        "./pages/HomePage": "./src/pages/HomePage.vue",
        "./components/ExampleWidget": "./src/components/ExampleWidget.vue",
      },
      remotes: {
        remoteShared: {
          type: "module",
          name: "remoteShared",
          entry: "http://localhost:4174/remoteEntry.js",
          entryGlobalName: "remoteShared",
          shareScope: "default",
        },
      },
      shared: {
        pinia: {
          requiredVersion: dependencies.pinia,
          singleton: true,
        },
        vue: {
          requiredVersion: dependencies.vue,
          singleton: true,
        },
      },
    }),
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      vue: path.resolve(__dirname, "./node_modules/vue/dist/vue.runtime.esm-bundler.js"),
      pinia: path.resolve(__dirname, "./node_modules/pinia/dist/pinia.mjs"),
      shared: path.resolve(__dirname, "../shared/shared.ts"),
    },
  },
  build: {
    target: "chrome89",
  },
});
