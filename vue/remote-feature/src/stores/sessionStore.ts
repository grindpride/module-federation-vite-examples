import { formatPrice } from "remoteShared/core/exposedUtils";
import { defineStore } from "pinia";

export const useSessionStore = defineStore("session", {
  state: () => ({
    sessionLabel: `Session ${formatPrice(0, "USD")}`,
  }),
  actions: {
    touch() {
      this.sessionLabel = `Session ${formatPrice(Date.now() % 10000, "USD")}`;
    },
  },
});
