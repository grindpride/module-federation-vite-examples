import { formatPrice } from "remoteShared/core/exposedUtils";
import { defineStore } from "pinia";

export const useExampleStore = defineStore("example", {
  state: () => ({
    label: formatPrice(1234.56, "EUR"),
  }),
});
