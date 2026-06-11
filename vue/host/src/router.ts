import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import { mfImportDefault } from "./utils/mfImport";

const DefaultLayout = () => import("./layouts/DefaultLayout.vue");

const HomePage = () => mfImportDefault(() => import("remoteFeature/pages/HomePage"));

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        component: HomePage,
      },
    ],
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
