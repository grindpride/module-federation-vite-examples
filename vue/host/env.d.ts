/// <reference types="vite/client" />

declare module "remoteShared/format-utils" {
  export function formatPrice(price: number, currency?: string): string;
}

declare module "remoteShared/core/exposedUtils" {
  export function formatPrice(price: number, currency?: string): string;
}

declare module "remoteFeature/stores/exampleStore" {
  export function useExampleStore(): {
    label: string;
  };
}

declare module "remoteFeature/pages/HomePage" {
  import type { DefineComponent } from "vue";

  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>;
  export default component;
}

declare module "remoteFeature/components/ExampleWidget" {
  import type { DefineComponent } from "vue";

  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>;
  export default component;
}
