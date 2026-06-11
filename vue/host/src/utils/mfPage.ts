import { defineAsyncComponent, defineComponent, h, type Component } from "vue";
import { resolveMfRemoteDefault } from "./mfResolveRemote";

export function mfPage(label: string, loader: () => Promise<{ default: Component }>) {
  const AsyncPage = defineAsyncComponent({
    loader: async () => {
      const mod = await loader();
      return resolveMfRemoteDefault(label, mod);
    },
    onError(_error, retry, fail, attempts) {
      if (attempts <= 5) {
        retry();
        return;
      }

      fail();
    },
  });

  return defineComponent({
    name: `MfPageHost:${label}`,
    setup() {
      return () => h(AsyncPage);
    },
  });
}
