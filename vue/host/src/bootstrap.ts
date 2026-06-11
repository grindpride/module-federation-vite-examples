import { setActivePinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import { pinia } from "./pinia";
import { mfImport, mfImportDefault } from "./utils/mfImport";

async function preloadMfRemotes() {
  await mfImport(() => import("remoteShared/core/exposedUtils"));
  await mfImport(() => import("remoteFeature/stores/exampleStore"));
  await mfImportDefault(() => import("remoteFeature/pages/HomePage"));
}

async function initApp() {
  const app = createApp(App);

  setActivePinia(pinia);
  app.use(pinia);

  await preloadMfRemotes();

  const { default: router } = await import("./router");
  app.use(router);
  await router.isReady();
  app.mount("#app");
}

initApp().catch((error: unknown) => {
  console.error("Application bootstrap failed:", error);
});
