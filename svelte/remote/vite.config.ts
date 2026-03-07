import { federation } from "@module-federation/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    federation({
      dts: true,
      dev: { disableDynamicRemoteTypeHints: true },
      filename: "remoteEntry.js",
      name: "remote",
      exposes: {
        "./remote-app": "./src/lib/mountApp.ts",
      },
      remotes: {},
      shared: ["rxjs"],
    }),
    sveltekit(),
  ],
});
