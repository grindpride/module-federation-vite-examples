<script setup lang="ts">
import remoteLogoUrl from "remoteShared/remote_assets/logo";
import { formatPrice } from "remoteShared/core/exposedUtils";
import { state } from "shared";
import RemoteCounterButton from "./RemoteCounterButton.vue";

console.log("remote got message:", state.message);
</script>

<template>
  <div class="remote-card" data-e2e="REMOTE__APP__CARD">
    <div class="icon">
      <img :src="remoteLogoUrl" alt="" height="100" width="100" />
    </div>
    <div class="title">I'm the remote app</div>
    <p>Price: {{ formatPrice(54321, "USD") }}</p>
    <RemoteCounterButton />
  </div>
</template>

<style scoped>
.remote-card {
  background: #1f2124;
  border-radius: 5px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  color: white;
  padding: 20px;
  text-align: center;
  width: 250px;
}

.title {
  font-size: 25px;
  margin-top: 10px;
}

p {
  margin: 8px 0 0;
}
</style>
