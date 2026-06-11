<script setup lang="ts">
import { useExampleStore } from "remoteFeature/stores/exampleStore";
import { pinia } from "../pinia";
import { mfAsyncComponent } from "../utils/mfAsyncComponent";

const ExampleWidget = mfAsyncComponent(() => import("remoteFeature/components/ExampleWidget"));

const store = useExampleStore(pinia);
</script>

<template>
  <div class="layout">
    <header class="header" data-e2e="HOST__HEADER">
      <span>Host layout</span>
      <span data-e2e="HOST__STORE_LABEL">{{ store.label }}</span>
    </header>
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
  gap: 16px;
  margin-bottom: 16px;
}

main {
  margin-top: 16px;
}
</style>
