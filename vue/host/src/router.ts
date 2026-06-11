import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import { mfPage } from "./utils/mfPage";

const DefaultLayout = () => import("./layouts/DefaultLayout.vue");

const HomePage = mfPage("HomePage", () => import("remoteFeature/pages/HomePage"));
const SettingsPage = mfPage("SettingsPage", () => import("remoteFeature/pages/SettingsPage"));

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/workspace",
  },
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "workspace",
        component: HomePage,
      },
      {
        path: "settings",
        component: SettingsPage,
      },
    ],
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
