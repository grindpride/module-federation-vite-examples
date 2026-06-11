import { defineAsyncComponent, type Component } from "vue";
import { resolveMfRemoteDefault } from "./mfResolveRemote";

export function mfAsyncComponent(
  label: string,
  loader: () => Promise<{ default: Component }>
) {
  return defineAsyncComponent({
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
}
