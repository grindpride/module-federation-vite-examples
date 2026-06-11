/// <reference types="vite/client" />

declare module "remoteShared/format-utils" {
  export function formatPrice(price: number, currency?: string): string;
}

declare module "remoteShared/core/exposedUtils" {
  export function formatPrice(price: number, currency?: string): string;
}

declare module "remoteFeature/stores/exampleStore" {
  import type { Pinia } from "pinia";

  export function useExampleStore(pinia?: Pinia): {
    label: string;
  };
}

declare module "remoteFeature/stores/sessionStore" {
  import type { Pinia } from "pinia";

  export function useSessionStore(pinia?: Pinia): {
    sessionLabel: string;
    touch(): void;
  };
}

declare module "remoteFeature/pages/HomePage" {
  import type { DefineComponent } from "vue";

  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>;
  export default component;
}

declare module "remoteFeature/pages/SettingsPage" {
  import type { DefineComponent } from "vue";

  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>;
  export default component;
}

declare module "remoteFeature/components/ExampleWidget" {
  import type { DefineComponent } from "vue";

  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>;
  export default component;
}

declare module "remoteShared/stores/counter" {
  import type { Pinia } from "pinia";

  export function useRemoteCounterStore(pinia?: Pinia): {
    count: number;
    increment(): void;
  };
}

declare module "remoteShared/remote_assets/logo" {
  const url: string;
  export default url;
}

declare module "remoteShared/components/Counter" {
  import type { DefineComponent } from "vue";

  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>;
  export default component;
}

declare module "remoteShared/remote-app" {
  import type { DefineComponent } from "vue";

  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>;
  export default component;
}
