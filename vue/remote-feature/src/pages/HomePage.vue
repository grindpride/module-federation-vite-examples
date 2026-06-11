<script setup lang="ts">
import { formatPrice } from "remoteShared/core/exposedUtils";
import ExampleWidget from "../components/ExampleWidget.vue";
import { useExampleStore } from "../stores/exampleStore";

const store = useExampleStore();
const formatted = formatPrice(99.5, "USD");
</script>

<template>
  <div class="home" data-e2e="HOME__PAGE">
    <h1>Remote feature page</h1>
    <p data-e2e="HOME__STORE_LABEL">Store: {{ store.label }}</p>
    <p data-e2e="HOME__FORMATTED">Formatted: {{ formatted }}</p>
    <ExampleWidget />
  </div>
</template>

<style scoped>
.home {
  background: #1f2124;
  border-radius: 8px;
  color: #fff;
  margin: 16px;
  padding: 16px;
}

h1 {
  font-size: 20px;
  margin: 0 0 12px;
}
</style>
