import type { Component } from "vue";

export type MfRemoteModule = {
  default?: unknown;
  __moduleExports?: Record<string, unknown> & {
    default?: unknown;
    __esModule?: boolean;
  };
  __mf_remote_pending?: Promise<unknown>;
  __mf_remote_dependency_pending?: Promise<unknown>;
};

const MF_REMOTE_LOAD_HINT =
  "Start all three apps: remoteShared (4174), remoteFeature (4175), host (4173).";

const MF_PENDING_MAX_ATTEMPTS = 50;

function isMfRemoteModule(value: unknown): value is MfRemoteModule {
  return value != null && typeof value === "object";
}

function safeMfProperty<K extends keyof MfRemoteModule>(
  mod: MfRemoteModule,
  key: K
): MfRemoteModule[K] | undefined {
  try {
    return mod[key];
  } catch {
    return undefined;
  }
}

function isVueComponent(value: unknown): value is Component {
  if (value == null) {
    return false;
  }

  if (typeof value === "function") {
    return true;
  }

  if (typeof value === "object") {
    const object = value as Record<string, unknown>;

    return (
      "setup" in object ||
      "render" in object ||
      "__vccOpts" in object ||
      "template" in object
    );
  }

  return false;
}

function extractDefaultExport(mod: unknown): unknown {
  if (!isMfRemoteModule(mod)) {
    return isVueComponent(mod) ? mod : undefined;
  }

  const defaultExport = safeMfProperty(mod, "default");

  if (defaultExport != null) {
    return defaultExport;
  }

  return isVueComponent(mod) ? mod : undefined;
}

export async function resolveMfRemoteModule(mod: unknown, label: string): Promise<unknown> {
  let current = mod;
  let attempt = 0;

  while (attempt < MF_PENDING_MAX_ATTEMPTS) {
    attempt += 1;

    if (!isMfRemoteModule(current)) {
      return current;
    }

    const dependencyPending = safeMfProperty(current, "__mf_remote_dependency_pending");

    if (dependencyPending) {
      await dependencyPending;
    }

    const remotePending = safeMfProperty(current, "__mf_remote_pending");

    if (remotePending) {
      current = await remotePending;
      continue;
    }

    return current;
  }

  throw new Error(`Module Federation remote pending loop (${label}). ${MF_REMOTE_LOAD_HINT}`);
}

export function unwrapNamedExports(mod: unknown): unknown {
  if (!isMfRemoteModule(mod)) {
    return mod;
  }

  const moduleExports = safeMfProperty(mod, "__moduleExports");

  if (moduleExports == null) {
    return mod;
  }

  return moduleExports;
}

export async function resolveMfRemoteDefault(label: string, mod: unknown): Promise<Component> {
  const resolved = await resolveMfRemoteModule(mod, label);

  if (resolved == null) {
    throw new Error(
      `Module Federation remote returned empty module (${label}). ${MF_REMOTE_LOAD_HINT}`
    );
  }

  const unwrapped = unwrapNamedExports(resolved);
  const component = extractDefaultExport(unwrapped);

  if (!isVueComponent(component)) {
    throw new Error(
      `Module Federation remote has no valid default export (${label}). ${MF_REMOTE_LOAD_HINT}`
    );
  }

  return component;
}
