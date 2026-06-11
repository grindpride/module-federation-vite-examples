import { setActivePinia } from "pinia";
import { PINIA_INJECTION_KEY } from "shared";
import { createApp } from "vue";
import App from "./App.vue";
import { pinia } from "./pinia";
import { mfImport } from "./utils/mfImport";

/** Warm nested remoteShared and remote stores before layout static MF imports. */
async function preloadMfRemotes() {
  await mfImport("remoteShared/core/exposedUtils", () => import("remoteShared/core/exposedUtils"));
  await mfImport("remoteShared/remote_assets/logo", () => import("remoteShared/remote_assets/logo"));
  await mfImport("remoteFeature/stores/exampleStore", () =>
    import("remoteFeature/stores/exampleStore")
  );
  await mfImport("remoteFeature/stores/sessionStore", () =>
    import("remoteFeature/stores/sessionStore")
  );
  await mfImport("remoteShared/stores/counter", () => import("remoteShared/stores/counter"));
}

async function initApp() {
  const app = createApp(App);

  setActivePinia(pinia);
  app.use(pinia);
  app.provide(PINIA_INJECTION_KEY, pinia);

  await preloadMfRemotes();

  const { default: router } = await import("./router");
  app.use(router);
  await router.isReady();
  app.mount("#app");
}

initApp().catch((error: unknown) => {
  console.error("Application bootstrap failed:", error);
});
