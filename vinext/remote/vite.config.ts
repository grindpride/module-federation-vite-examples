import { federation } from "@module-federation/vite";
import vinext from "vinext";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    federation({
      dts: true,
      dev: { disableDynamicRemoteTypeHints: true },
      name: "remote",
      filename: "remoteEntry.js",
      exposes: {
        "./remote-app": "./app/page.tsx",
      },
      remotes: {},
      shared: {
        react: { singleton: true },
      },
    }),
    vinext(),
  ],
});
