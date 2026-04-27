import { federation } from "@module-federation/vite";
import preact from "@preact/preset-vite";
import { defineConfig } from "vite";
import { dependencies } from "./package.json";

export default defineConfig(() => ({
  server: { fs: { allow: [".", "..", "../shared"] } },
  build: {
    target: "chrome89",
  },
  plugins: [
    federation({
      dts: false,
      dev: { disableDynamicRemoteTypeHints: true, remoteHmr: true },
      name: "host",
      remotes: {
        remote: {
          type: "module",
          name: "remote",
          entry: "http://localhost:4174/remoteEntry.js",
          entryGlobalName: "remote",
          shareScope: "default",
        },
      },
      exposes: {},
      filename: "remoteEntry.js",
      shared: {
        preact: {
          requiredVersion: dependencies.preact,
          singleton: true,
        },
        "preact/hooks": {
          requiredVersion: dependencies.preact,
          singleton: true,
        },
      },
    }),
    preact(),
  ],
}));
