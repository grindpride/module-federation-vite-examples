<script setup lang="ts">
import { useCounterStore } from "../stores/counter";
const { $pinia } = useNuxtApp();
const store = useCounterStore($pinia);
const { count } = storeToRefs(store);
</script>

<template>
  <button
    style="
      border: 0 solid #e2e8f0;
      margin-top: 10px;
      background-color: rgb(246, 179, 82);
      border-radius: 0.25rem;
      font-weight: 700;
      padding: 0.5rem 1rem 0.5rem 1rem;
      color: rgb(24, 24, 24);
    "
    @click="store.increment"
  >
    Remote counter: {{ count }}
  </button>
</template>

<style scoped />
