import { createPinia } from "pinia";
import { createApp } from "vue";
import HomePage from "./pages/HomePage.vue";

const app = createApp(HomePage);

app.use(createPinia());
app.mount("#app");
