"use client";

type VinextGlobal<T> = typeof globalThis & {
  __VINEXT_REACT__?: T;
};

export function getVinextReact<T>(reactInstance: T): T {
  (globalThis as VinextGlobal<T>).__VINEXT_REACT__ ||= reactInstance;
  return (globalThis as VinextGlobal<T>).__VINEXT_REACT__ as T;
}
