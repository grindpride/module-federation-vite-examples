<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRemoteCounterStore } from "../stores/counter";

/** Standalone remoteShared dev app (:4174) — active Pinia from main.ts */
const store = useRemoteCounterStore();
const { count } = storeToRefs(store);
</script>

<template>
  <button
    class="counter"
    data-e2e="REMOTE__COUNTER"
    type="button"
    @click="store.increment"
  >
    Remote counter: {{ count }}
  </button>
</template>

<style scoped>
.counter {
  background-color: rgb(246, 179, 82);
  border: 0 solid #e2e8f0;
  border-radius: 0.25rem;
  color: rgb(24, 24, 24);
  cursor: pointer;
  font-weight: 700;
  margin-top: 10px;
  padding: 0.5rem 1rem;
}
</style>
