import angular from "@analogjs/vite-plugin-angular";
import { federation } from "@module-federation/vite";
import { defineConfig } from "vite";
import packageJson from "./package.json";

const { dependencies } = packageJson;
const isVite8 = packageJson.devDependencies.vite.startsWith("8.");
const shared = isVite8
  ? Object.fromEntries(
      [
        "@angular/animations",
        "@angular/common",
        "@angular/compiler",
        "@angular/core",
        "@angular/platform-browser",
        "@angular/platform-browser-dynamic",
        "@angular/platform-server",
        "rxjs",
        "tslib",
      ].map((pkg) => [
        pkg,
        {
          singleton: true,
          requiredVersion: dependencies[pkg as keyof typeof dependencies],
        },
      ])
    )
  : ["@angular/core"];

// https://vitejs.dev/config/
export default defineConfig(() => ({
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
      shared,
    }),
    angular(),
  ],
}));
