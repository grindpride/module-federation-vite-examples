import { federation } from "@module-federation/vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import { defineConfig } from "vite";
import { dependencies } from "./package.json";

export default defineConfig(({ command }) => ({
  server: {
    fs: {
      allow: [".", "../shared"],
    },
  },
  resolve: {
    alias: {
      vue: path.resolve(__dirname, "./node_modules/vue/dist/vue.runtime.esm-bundler.js"),
      pinia: path.resolve(__dirname, "./node_modules/pinia/dist/pinia.mjs"),
      shared: path.resolve(__dirname, "../shared/shared.ts"),
    },
    dedupe: ["pinia", "vue", "vue-router"],
  },
  optimizeDeps: {
    include: ["pinia", "vue", "vue-router"],
  },
  build: {
    target: "chrome89",
  },
  plugins: [
    federation({
      dts: false,
      dev: {
        remoteHmr: true,
      },
      name: "host",
      shareStrategy: command === "serve" ? "version-first" : "loaded-first",
      remotes: {
        remoteShared: {
          type: "module",
          name: "remoteShared",
          entry: "http://localhost:4174/remoteEntry.js",
          entryGlobalName: "remoteShared",
          shareScope: "default",
        },
        remoteFeature: {
          type: "module",
          name: "remoteFeature",
          entry: "http://localhost:4175/remoteEntry.js",
          entryGlobalName: "remoteFeature",
          shareScope: "default",
        },
      },
      exposes: {},
      filename: "remoteEntry.js",
      shared: {
        pinia: {
          requiredVersion: dependencies.pinia,
          singleton: true,
          eager: true,
        },
        vue: {
          requiredVersion: dependencies.vue,
          singleton: true,
          eager: true,
        },
        "vue-router": {
          requiredVersion: dependencies["vue-router"],
          singleton: true,
          eager: true,
        },
      },
    }),
    vue(),
    vueJsx(),
  ],
}));
