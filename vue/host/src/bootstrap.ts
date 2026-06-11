import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import { mfImport, mfImportDefault } from "./utils/mfImport";

async function preloadMfRemotes() {
  await mfImport(() => import("remoteShared/core/exposedUtils"));
  await mfImport(() => import("remoteFeature/stores/exampleStore"));
  await mfImportDefault(() => import("remoteFeature/pages/HomePage"));
}

async function initApp() {
  const pinia = createPinia();
  const app = createApp(App);

  await preloadMfRemotes();

  const { default: router } = await import("./router");

  app.use(pinia);
  app.use(router);
  await router.isReady();
  app.mount("#app");
}

initApp().catch((error: unknown) => {
  console.error("Application bootstrap failed:", error);
});
