<script setup lang="ts">
import { useExampleStore } from "remoteFeature/stores/exampleStore";
import { useSessionStore } from "remoteFeature/stores/sessionStore";
import Counter from "../components/Counter.vue";
import RemoteAppCard from "../components/RemoteAppCard.vue";
import { pinia } from "../pinia";
import { mfAsyncComponent } from "../utils/mfAsyncComponent";

const ExampleWidget = mfAsyncComponent("ExampleWidget", () =>
  import("remoteFeature/components/ExampleWidget")
);

const exampleStore = useExampleStore(pinia);
const sessionStore = useSessionStore(pinia);
</script>

<template>
  <div class="layout">
    <header class="header" data-e2e="HOST__HEADER">
      <nav class="nav">
        <router-link to="/workspace">Workspace</router-link>
        <router-link to="/settings">Settings</router-link>
      </nav>
      <span data-e2e="HOST__STORE_LABEL">{{ exampleStore.label }}</span>
      <span data-e2e="HOST__SESSION_LABEL">{{ sessionStore.sessionLabel }}</span>
    </header>

    <section class="cards">
      <div class="host-card" data-e2e="APP__CARD">
        <div class="icon">
          <svg
            enable-background="new 0 0 512 512"
            height="512px"
            viewBox="0 0 512 512"
            width="512px"
            xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            data-e2e="STAR__SYMBOL"
          >
            <path
              d="M316.01,199.02L256.134,14.817L196.239,199.02H1.134l158.102,113.324L98.53,496.487l157.604-114.232  l157.585,114.232l-60.687-184.143L511.134,199.02H316.01z M335.084,318.257l42.407,128.63L267.22,366.963l-11.086-8.033  l-11.086,8.033l-110.291,79.923l42.408-128.63l4.353-13.18l-11.289-8.08L59.903,217.909h136.336h13.724l4.242-13.051l41.929-128.957  l41.91,128.957l4.242,13.051h13.724h136.336l-110.327,79.088l-11.27,8.08L335.084,318.257z"
              fill="#37404D"
            />
          </svg>
        </div>
        <div class="title">I'm the host app</div>
        <Counter />
      </div>

      <RemoteAppCard />
    </section>

    <ExampleWidget />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.layout {
  color: #1f2124;
  font-family: sans-serif;
  padding: 16px;
}

.header {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
}

.nav {
  display: flex;
  gap: 12px;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 16px;
}

.host-card {
  background: #3178c6;
  border-radius: 5px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  color: white;
  float: left;
  padding: 20px;
  text-align: center;
  width: 250px;
}

.title {
  font-size: 25px;
  margin-top: 10px;
}

.icon svg {
  height: 100px;
  width: 100px;
}

.icon path {
  fill: #f6b352;
}

main {
  clear: both;
  margin-top: 16px;
}
</style>
