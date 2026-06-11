<script setup lang="ts">
import { useSessionStore } from "../stores/sessionStore";

const sessionStore = useSessionStore();
</script>

<template>
  <div class="settings" data-e2e="SETTINGS__PAGE">
    <h1>Remote settings page</h1>
    <p data-e2e="SETTINGS__SESSION_LABEL">{{ sessionStore.sessionLabel }}</p>
    <button type="button" data-e2e="SETTINGS__TOUCH" @click="sessionStore.touch()">
      Touch session
    </button>
  </div>
</template>

<style scoped>
.settings {
  background: #2d3748;
  border-radius: 8px;
  color: #fff;
  margin: 16px;
  padding: 16px;
}

h1 {
  font-size: 20px;
  margin: 0 0 12px;
}

button {
  cursor: pointer;
  margin-top: 8px;
}
</style>
