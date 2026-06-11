import { defineStore } from "pinia";

/** Same id as original vue example (`"store"`) — one counter across host + remote. */
export const useRemoteCounterStore = defineStore("store", {
  state: () => ({ count: 0 }),
  actions: {
    increment() {
      this.count += 1;
    },
  },
});
