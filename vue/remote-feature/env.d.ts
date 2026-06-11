/// <reference types="vite/client" />

declare module "remoteShared/core/exposedUtils" {
  export function formatPrice(price: number, currency?: string): string;
}
