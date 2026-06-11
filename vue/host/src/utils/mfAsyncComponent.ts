import { defineAsyncComponent, type Component } from "vue";
import { mfImportDefault } from "./mfImport";

export function mfAsyncComponent(loader: () => Promise<{ default: Component }>) {
  return defineAsyncComponent(() => mfImportDefault(loader));
}
