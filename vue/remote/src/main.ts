import { createPinia } from "pinia";
import { PINIA_INJECTION_KEY } from "shared";
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.provide(PINIA_INJECTION_KEY, pinia);
app.mount("#app");
